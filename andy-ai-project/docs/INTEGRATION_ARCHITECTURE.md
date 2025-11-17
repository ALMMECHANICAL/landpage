# Andy AI - Integration Architecture

## Overview

This document outlines the technical architecture for integrating all third-party services and APIs required for Andy AI.

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     ANDY AI DESKTOP APP                      │
│                         (Electron)                           │
│  ┌────────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │    Chat    │  │  Email   │  │ Calendar │  │  Tasks   │ │
│  │ Interface  │  │   View   │  │   View   │  │   View   │ │
│  └─────┬──────┘  └─────┬────┘  └─────┬────┘  └─────┬────┘ │
└────────┼────────────────┼─────────────┼─────────────┼──────┘
         │                │             │             │
         │          WebSocket/HTTPS     │             │
         │                │             │             │
┌────────┴────────────────┴─────────────┴─────────────┴──────┐
│                     BACKEND API SERVER                      │
│                    (Node.js/Express)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   Auth   │  │   Chat   │  │  Email   │  │ Calendar │  │
│  │ Service  │  │ Service  │  │ Service  │  │ Service  │  │
│  └─────┬────┘  └─────┬────┘  └─────┬────┘  └─────┬────┘  │
│        │             │             │             │         │
│  ┌─────┴─────────────┴─────────────┴─────────────┴─────┐  │
│  │              Database Layer (PostgreSQL)             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────┬────────┬────────┬────────┬────────┬────────┬────────┘
      │        │        │        │        │        │
      │        │        │        │        │        │
┌─────┴────┐ ┌┴──────┐ ┌┴──────┐ ┌┴──────┐ ┌┴──────┐ ┌───────┐
│ OpenAI   │ │ Gmail │ │Outlook│ │Google │ │Twilio │ │Others │
│   API    │ │  API  │ │  API  │ │  Cal  │ │  API  │ │  ...  │
└──────────┘ └───────┘ └───────┘ └───────┘ └───────┘ └───────┘
```

## Core Integrations

### 1. OpenAI API (AI Engine)

**Purpose:** Natural language processing, chat, content generation

**Integration Type:** REST API

**Authentication:** API Key

**Key Endpoints:**
- `/v1/chat/completions` - Chat conversations
- `/v1/completions` - Text completion
- `/v1/embeddings` - Text embeddings for search

**Implementation:**
```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function chatWithAI(messages) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: messages,
    temperature: 0.7,
    max_tokens: 500,
    stream: true // For real-time responses
  });
  return response;
}
```

**Rate Limits:**
- GPT-4: 10,000 tokens/min (Tier 1)
- GPT-3.5: 60,000 tokens/min (Tier 1)

**Cost Estimates:**
- GPT-4: $0.03/1K input tokens, $0.06/1K output tokens
- Average conversation: $0.01 - $0.05

**Best Practices:**
- Cache common responses
- Use GPT-3.5 for simple queries
- Implement token counting to prevent overuse
- Stream responses for better UX

---

### 2. Gmail API

**Purpose:** Email reading, sending, management

**Integration Type:** REST API

**Authentication:** OAuth 2.0

**Scopes Required:**
- `gmail.readonly` - Read emails
- `gmail.send` - Send emails
- `gmail.modify` - Modify labels, mark as read

**OAuth Flow:**
```javascript
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'http://localhost:3000/auth/gmail/callback'
);

// Generate auth URL
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.readonly']
});

// Exchange code for tokens
const { tokens } = await oauth2Client.getToken(code);
oauth2Client.setCredentials(tokens);
```

**Key Operations:**
```javascript
const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

// List emails
const res = await gmail.users.messages.list({
  userId: 'me',
  maxResults: 50,
  q: 'is:unread'
});

// Get email details
const email = await gmail.users.messages.get({
  userId: 'me',
  id: messageId,
  format: 'full'
});

// Send email
await gmail.users.messages.send({
  userId: 'me',
  requestBody: {
    raw: createMessage(to, subject, body)
  }
});
```

**Rate Limits:**
- 250 quota units per user per second
- Most operations: 5-25 units

**Best Practices:**
- Use batch requests for multiple operations
- Cache email metadata
- Use push notifications instead of polling
- Store only email IDs, not content

---

### 3. Microsoft Graph API (Outlook)

**Purpose:** Outlook email and calendar access

**Integration Type:** REST API

**Authentication:** OAuth 2.0 (Microsoft Identity Platform)

**Scopes Required:**
- `Mail.Read` - Read emails
- `Mail.Send` - Send emails
- `Calendars.Read` - Read calendar
- `Calendars.ReadWrite` - Modify calendar

**OAuth Flow:**
```javascript
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

const credential = new ClientSecretCredential(
  tenantId,
  clientId,
  clientSecret
);

const client = Client.initWithMiddleware({
  authProvider: {
    getAccessToken: async () => {
      const token = await credential.getToken(
        'https://graph.microsoft.com/.default'
      );
      return token.token;
    }
  }
});
```

**Key Operations:**
```javascript
// List emails
const messages = await client
  .api('/me/messages')
  .top(50)
  .filter("isRead eq false")
  .get();

// Send email
await client
  .api('/me/sendMail')
  .post({
    message: {
      subject: 'Test',
      body: { contentType: 'Text', content: 'Hello' },
      toRecipients: [{ emailAddress: { address: 'user@example.com' } }]
    }
  });

// Get calendar events
const events = await client
  .api('/me/calendar/events')
  .top(50)
  .select('subject,start,end')
  .get();
```

**Rate Limits:**
- 10,000 requests per 10 minutes per app per user

**Best Practices:**
- Use delta queries for syncing
- Batch requests when possible
- Subscribe to webhooks for real-time updates

---

### 4. Google Calendar API

**Purpose:** Calendar event management

**Integration Type:** REST API

**Authentication:** OAuth 2.0

**Scopes Required:**
- `calendar.readonly` - Read events
- `calendar.events` - Create/modify events

**Implementation:**
```javascript
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// List events
const events = await calendar.events.list({
  calendarId: 'primary',
  timeMin: new Date().toISOString(),
  maxResults: 10,
  singleEvents: true,
  orderBy: 'startTime'
});

// Create event
await calendar.events.insert({
  calendarId: 'primary',
  requestBody: {
    summary: 'Team Meeting',
    start: { dateTime: '2025-01-20T10:00:00-07:00' },
    end: { dateTime: '2025-01-20T11:00:00-07:00' },
    attendees: [
      { email: 'user@example.com' }
    ]
  }
});

// Parse natural language (using AI)
const eventDetails = await extractEventFromText(
  "Schedule meeting with John tomorrow at 2pm"
);
```

**Rate Limits:**
- 1,000,000 queries/day
- 10 queries/second per user

**Best Practices:**
- Use sync tokens for incremental sync
- Batch operations when possible
- Cache calendar data locally

---

### 5. Twilio API (SMS & Voice)

**Purpose:** Phone calls, SMS messaging

**Integration Type:** REST API

**Authentication:** Account SID + Auth Token

**Implementation:**
```javascript
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Send SMS
await client.messages.create({
  body: 'Message from Andy AI',
  from: '+1234567890',
  to: '+0987654321'
});

// Make call
await client.calls.create({
  url: 'http://demo.twilio.com/docs/voice.xml',
  to: '+0987654321',
  from: '+1234567890'
});

// Handle incoming call webhook
app.post('/voice/incoming', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say('Hello, this is Andy AI. The user is unavailable...');
  res.type('text/xml');
  res.send(twiml.toString());
});
```

**Pricing:**
- SMS: $0.0075 per message (US)
- Voice: $0.013 per minute (US)

**Rate Limits:**
- API: 8,000 requests/second

**Best Practices:**
- Use webhooks for real-time call/SMS events
- Implement retry logic for failed messages
- Store conversation history

---

### 6. ElevenLabs API (Voice Cloning)

**Purpose:** Voice synthesis and cloning

**Integration Type:** REST API

**Authentication:** API Key

**Implementation:**
```javascript
import axios from 'axios';

// Create voice clone
const createVoice = async (name, audioFiles) => {
  const formData = new FormData();
  formData.append('name', name);
  audioFiles.forEach(file => formData.append('files', file));

  const response = await axios.post(
    'https://api.elevenlabs.io/v1/voices/add',
    formData,
    {
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY
      }
    }
  );
  return response.data.voice_id;
};

// Generate speech
const generateSpeech = async (text, voiceId) => {
  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      text: text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    },
    {
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY
      },
      responseType: 'arraybuffer'
    }
  );
  return response.data; // Audio buffer
};
```

**Pricing:**
- Free: 10,000 characters/month
- Creator: $5/month - 30,000 characters
- Pro: $22/month - 100,000 characters

**Rate Limits:**
- Depends on plan

**Requirements for Voice Cloning:**
- Minimum 1 minute of clean audio
- Recommended: 3-5 minutes
- Single speaker, clear quality

---

## Data Flow Examples

### Example 1: User Sends Chat Message

```
1. User types message in Electron app
   ↓
2. App sends message via WebSocket to backend
   {
     "type": "chat",
     "message": "Show me my emails from today",
     "userId": "user123"
   }
   ↓
3. Backend receives message, sends to OpenAI
   - Includes conversation context
   - Includes user preferences
   ↓
4. OpenAI returns AI response with function call
   {
     "function": "getEmails",
     "parameters": {
       "since": "2025-01-17T00:00:00Z",
       "unreadOnly": true
     }
   }
   ↓
5. Backend executes function (calls Gmail API)
   - Fetches emails from Gmail
   - Filters by date
   ↓
6. Backend sends results back to OpenAI for formatting
   ↓
7. OpenAI formats response in natural language
   ↓
8. Backend sends formatted response to Electron app
   {
     "type": "chat_response",
     "message": "You have 5 unread emails from today...",
     "data": [email objects]
   }
   ↓
9. App displays response in chat interface
```

### Example 2: Natural Language Event Creation

```
1. User says: "Schedule meeting with Sarah tomorrow at 2pm"
   ↓
2. Backend sends to OpenAI with function schema
   {
     "functions": [
       {
         "name": "createCalendarEvent",
         "parameters": {
           "title": "string",
           "attendees": "array",
           "startTime": "datetime",
           "duration": "number"
         }
       }
     ]
   }
   ↓
3. OpenAI extracts structured data
   {
     "function": "createCalendarEvent",
     "parameters": {
       "title": "Meeting with Sarah",
       "attendees": ["sarah@example.com"],
       "startTime": "2025-01-18T14:00:00Z",
       "duration": 60
     }
   }
   ↓
4. Backend calls Google Calendar API
   - Creates event
   - Sends invites to attendees
   ↓
5. Backend confirms to user
   "I've scheduled a meeting with Sarah for tomorrow at 2pm"
```

---

## Security Considerations

### 1. API Key Management

**Storage:**
- User-provided keys: Encrypted in database
- System keys: Environment variables
- Never store in code or version control

**Encryption:**
```javascript
import crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  return { encrypted, iv: iv.toString('hex'), authTag: authTag.toString('hex') };
}

function decrypt(encrypted, iv, authTag) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, 'hex')
  );
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
```

### 2. OAuth Token Management

**Token Storage:**
```javascript
const tokenSchema = {
  userId: String,
  provider: String, // 'gmail', 'outlook', etc.
  accessToken: String, // Encrypted
  refreshToken: String, // Encrypted
  expiresAt: Date,
  scope: [String]
};

// Auto-refresh tokens before expiry
async function getValidToken(userId, provider) {
  const token = await Token.findOne({ userId, provider });

  if (token.expiresAt < new Date(Date.now() + 5 * 60 * 1000)) {
    // Refresh if expires in < 5 minutes
    const newTokens = await refreshOAuthToken(token.refreshToken, provider);
    token.accessToken = encrypt(newTokens.access_token);
    token.expiresAt = new Date(Date.now() + newTokens.expires_in * 1000);
    await token.save();
  }

  return decrypt(token.accessToken);
}
```

### 3. Data Privacy

**Email Content:**
- Never store full email content
- Store only metadata (from, subject, date)
- Full content only in temporary cache (1 hour max)

**Chat History:**
- Encrypt at rest
- User can delete anytime
- Auto-delete after 30 days (configurable)

**User Preferences:**
- Encrypted sensitive data
- Minimal data collection
- GDPR-compliant data export

---

## Error Handling

### Retry Strategy

```javascript
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      // Check if error is retryable
      if (error.status === 429 || error.status >= 500) {
        const delay = Math.pow(2, i) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error; // Don't retry client errors
      }
    }
  }
}

// Usage
const emails = await retryWithBackoff(() =>
  gmail.users.messages.list({ userId: 'me' })
);
```

### Circuit Breaker

```javascript
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failureCount = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now();
  }

  async execute(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}

// Usage
const gmailBreaker = new CircuitBreaker();
const emails = await gmailBreaker.execute(() =>
  gmail.users.messages.list({ userId: 'me' })
);
```

---

## Performance Optimization

### 1. Caching Strategy

```javascript
import Redis from 'ioredis';
const redis = new Redis();

// Cache email metadata
async function getEmails(userId) {
  const cacheKey = `emails:${userId}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const emails = await fetchEmailsFromGmail(userId);
  await redis.set(cacheKey, JSON.stringify(emails), 'EX', 300); // 5 min TTL
  return emails;
}

// Cache AI responses for common queries
async function getChatResponse(message) {
  const hash = crypto.createHash('md5').update(message).digest('hex');
  const cacheKey = `chat:${hash}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    return cached;
  }

  const response = await callOpenAI(message);
  await redis.set(cacheKey, response, 'EX', 3600); // 1 hour TTL
  return response;
}
```

### 2. Database Optimization

```sql
-- Indexes for common queries
CREATE INDEX idx_tasks_user_status ON tasks(user_id, status);
CREATE INDEX idx_emails_user_date ON email_metadata(user_id, received_at DESC);
CREATE INDEX idx_events_user_date ON calendar_events(user_id, start_time);

-- Partitioning for large tables
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY,
    user_id UUID,
    created_at TIMESTAMP
) PARTITION BY RANGE (created_at);

CREATE TABLE chat_messages_2025_01 PARTITION OF chat_messages
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
```

### 3. Request Batching

```javascript
// Batch multiple email reads
async function batchGetEmails(messageIds) {
  const batch = gmail.newBatch();

  messageIds.forEach(id => {
    batch.add(gmail.users.messages.get({
      userId: 'me',
      id: id
    }));
  });

  return await batch.execute();
}
```

---

## Monitoring & Logging

### 1. API Usage Tracking

```javascript
// Track API calls for billing/limits
async function trackAPICall(service, endpoint, userId) {
  await db.apiCalls.create({
    service,
    endpoint,
    userId,
    timestamp: new Date(),
    cost: calculateCost(service, endpoint)
  });
}

// Alert on quota limits
async function checkQuotaLimits(userId) {
  const usage = await db.apiCalls.aggregate({
    match: {
      userId,
      timestamp: { $gte: new Date(Date.now() - 86400000) } // 24h
    },
    group: {
      _id: '$service',
      count: { $sum: 1 },
      cost: { $sum: '$cost' }
    }
  });

  for (const service of usage) {
    if (service.cost > DAILY_LIMIT) {
      await alertUser(userId, `${service._id} quota limit reached`);
    }
  }
}
```

### 2. Error Logging

```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Log all API errors
app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    userId: req.user?.id
  });
  res.status(500).json({ error: 'Internal server error' });
});
```

---

## Testing Strategy

### 1. Integration Tests

```javascript
import { jest } from '@jest/globals';

describe('Gmail Integration', () => {
  it('should fetch emails', async () => {
    const mockGmail = {
      users: {
        messages: {
          list: jest.fn().mockResolvedValue({
            data: {
              messages: [{ id: '123', threadId: '456' }]
            }
          })
        }
      }
    };

    const emails = await fetchEmails(mockGmail);
    expect(emails).toHaveLength(1);
    expect(mockGmail.users.messages.list).toHaveBeenCalled();
  });
});
```

### 2. API Mocking

```javascript
import nock from 'nock';

describe('OpenAI Integration', () => {
  it('should get chat response', async () => {
    nock('https://api.openai.com')
      .post('/v1/chat/completions')
      .reply(200, {
        choices: [{
          message: { content: 'Hello!' }
        }]
      });

    const response = await chatWithAI([{ role: 'user', content: 'Hi' }]);
    expect(response).toBe('Hello!');
  });
});
```

---

## Conclusion

This architecture provides:
- **Scalability**: Can handle thousands of users
- **Reliability**: Error handling, retries, circuit breakers
- **Security**: Encryption, OAuth, minimal data storage
- **Performance**: Caching, batching, optimization
- **Maintainability**: Clear separation of concerns

Next steps:
1. Set up development environment
2. Implement authentication system
3. Build one integration at a time
4. Test thoroughly before production
5. Monitor and optimize continuously
