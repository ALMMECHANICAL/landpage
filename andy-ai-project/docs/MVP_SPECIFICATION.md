# Andy AI - MVP Specification

## Overview

This document outlines the Minimum Viable Product (MVP) for Andy AI, designed to be built in 3-6 months with a small team.

## Product Vision

A desktop AI assistant that lives in the bottom-right corner of the user's screen, providing AI-powered help with email, calendar, tasks, and general assistance.

## MVP Scope

### IN SCOPE (MVP)
1. Desktop application (Windows, macOS, Linux)
2. AI-powered chat interface
3. Email integration (read, summarize, suggest replies)
4. Calendar viewing and event creation
5. Task list management
6. Note-taking
7. File/folder creation
8. Basic automation

### OUT OF SCOPE (Post-MVP)
- Voice activation and voice cloning
- Phone/SMS integration
- Video content creation
- Mobile applications
- Avatar/clone features
- Shopping features
- Enterprise features
- Advanced analytics

## Core Features

### 1. Desktop Application

**Window Behavior:**
- Always-on-top option
- Positioned in bottom-right corner by default
- Draggable to any position
- Minimize to system tray
- Keyboard shortcut to show/hide (Ctrl+Shift+A / Cmd+Shift+A)

**Window Appearance:**
- 400px width × 600px height (default)
- Resizable (300-800px width, 400-1000px height)
- Rounded corners
- Semi-transparent background option
- Modern, clean UI with lime green accent color

**System Integration:**
- Launch on startup (optional)
- System tray icon
- Desktop notifications
- Global keyboard shortcuts

### 2. AI Chat Interface

**Chat Features:**
- Text input field with auto-focus
- Message history (persistent across sessions)
- Typing indicators
- Markdown support in messages
- Code syntax highlighting
- Copy message functionality
- Clear history option

**AI Capabilities:**
- Natural language understanding
- Context retention (last 10 messages)
- Task extraction from conversation
- Email drafting
- Information lookup
- Code assistance
- General Q&A

**OpenAI Integration:**
- GPT-4 API for responses
- Streaming responses for better UX
- Token usage tracking
- Rate limiting
- Error handling

### 3. Email Integration

**Supported Providers:**
- Gmail (via Gmail API)
- Outlook/Microsoft 365 (via Microsoft Graph API)

**Email Features:**
- OAuth 2.0 authentication
- Read emails (last 50 messages)
- Display unread count
- Email summaries
- Priority inbox (AI-classified)
- Search emails
- Draft responses (AI-generated)
- Send emails (with user confirmation)

**Email UI:**
- Inbox view with unread badge
- Email list with preview
- Email detail view
- Compose/Reply interface
- Priority labels (High/Medium/Low)

**AI Email Features:**
- Auto-categorize (Work/Personal/Spam)
- Summarize long emails
- Suggest 3 reply options (short/medium/detailed)
- Extract action items from emails
- Smart notifications (only important emails)

### 4. Calendar Integration

**Supported Providers:**
- Google Calendar
- Microsoft Outlook Calendar

**Calendar Features:**
- OAuth 2.0 authentication
- View upcoming events (next 7 days)
- Create events from natural language
- Edit existing events
- Delete events
- Event reminders
- Availability checking

**Calendar UI:**
- List view of upcoming events
- Today's schedule at a glance
- Quick event creation
- Event details panel

**AI Calendar Features:**
- Parse natural language event creation
  - "Schedule meeting with John tomorrow at 2pm"
  - "Block 2 hours Friday afternoon for project work"
- Detect scheduling conflicts
- Suggest meeting times
- Meeting prep summaries

### 5. Task Management

**Task Features:**
- Create tasks
- Mark tasks complete
- Edit tasks
- Delete tasks
- Set due dates
- Set priority (High/Medium/Low)
- Add notes to tasks
- Subtasks support
- Task categories/tags

**Task UI:**
- Today's tasks at the top
- Upcoming tasks list
- Completed tasks (collapsible)
- Quick add task input
- Task detail panel
- Drag-and-drop reordering

**AI Task Features:**
- Extract tasks from conversation
- Extract tasks from emails
- Suggest task priorities
- Break down large tasks
- Estimate task duration
- Smart task scheduling

### 6. Note-Taking

**Note Features:**
- Create notes
- Edit notes
- Delete notes
- Rich text formatting
- Code blocks
- Markdown support
- Search notes
- Organize into folders

**Note UI:**
- Note list sidebar
- Note editor (markdown)
- Preview mode
- Quick note creation
- Search functionality

**AI Note Features:**
- Summarize long notes
- Generate outlines
- Format notes automatically
- Extract action items
- Meeting notes templates

### 7. File & Folder Operations

**File Operations:**
- Create new files
- Create new folders
- List files in directory
- Search for files
- Open files in default app
- Move/rename files (with confirmation)

**Supported Commands:**
- "Create a folder called ProjectX"
- "Create a new text file notes.txt"
- "Show me all PDF files in Documents"
- "Open the latest screenshot"

### 8. Settings & Configuration

**User Settings:**
- OpenAI API key input
- Email account connections
- Calendar account connections
- Appearance (theme, transparency)
- Notification preferences
- Keyboard shortcuts
- Startup behavior
- Data privacy settings

**Settings UI:**
- Settings panel/modal
- Account connections status
- Usage statistics
- About section
- Help/Documentation link

## Technical Architecture

### Frontend (Electron + React)

**Tech Stack:**
- Electron 28+
- React 18+
- TypeScript
- TailwindCSS
- Socket.io-client
- Markdown renderer (react-markdown)
- Code highlighter (prism.js)

**Key Libraries:**
- Zustand (state management)
- React Query (API calls)
- React Router (navigation)
- date-fns (date handling)
- electron-store (local storage)

**File Structure:**
```
frontend/
├── src/
│   ├── main/           # Electron main process
│   │   ├── index.ts    # Main entry
│   │   └── ipc.ts      # IPC handlers
│   ├── renderer/       # Electron renderer process
│   │   ├── App.tsx     # Main component
│   │   ├── components/ # React components
│   │   ├── hooks/      # Custom hooks
│   │   ├── services/   # API services
│   │   ├── store/      # State management
│   │   └── utils/      # Utilities
│   └── shared/         # Shared types/utils
├── public/             # Static assets
└── package.json
```

### Backend (Node.js + Express)

**Tech Stack:**
- Node.js 18+
- Express.js
- TypeScript
- PostgreSQL
- Redis
- Socket.io
- JWT authentication

**Key Libraries:**
- googleapis (Google APIs)
- @microsoft/microsoft-graph-client (Outlook)
- openai (OpenAI API)
- prisma (ORM)
- bcrypt (password hashing)
- joi (validation)

**File Structure:**
```
backend/
├── src/
│   ├── index.ts        # Server entry
│   ├── routes/         # API routes
│   │   ├── auth.ts
│   │   ├── chat.ts
│   │   ├── email.ts
│   │   ├── calendar.ts
│   │   └── tasks.ts
│   ├── controllers/    # Route controllers
│   ├── services/       # Business logic
│   │   ├── ai.ts       # OpenAI integration
│   │   ├── email.ts    # Email service
│   │   └── calendar.ts # Calendar service
│   ├── models/         # Database models
│   ├── middleware/     # Express middleware
│   ├── utils/          # Utilities
│   └── types/          # TypeScript types
├── prisma/
│   └── schema.prisma   # Database schema
└── package.json
```

### Database Schema (PostgreSQL)

**Users Table:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255),
  openai_api_key TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Email Accounts Table:**
```sql
CREATE TABLE email_accounts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  provider VARCHAR(50), -- 'gmail' or 'outlook'
  email VARCHAR(255),
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Calendar Accounts Table:**
```sql
CREATE TABLE calendar_accounts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  provider VARCHAR(50),
  account_email VARCHAR(255),
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Tasks Table:**
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, in_progress, completed
  priority VARCHAR(50) DEFAULT 'medium', -- high, medium, low
  due_date TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Notes Table:**
```sql
CREATE TABLE notes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR(500),
  content TEXT,
  folder VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Chat History Table:**
```sql
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  role VARCHAR(50), -- 'user' or 'assistant'
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Chat
- `POST /api/chat/message` - Send message to AI
- `GET /api/chat/history` - Get chat history
- `DELETE /api/chat/history` - Clear chat history

### Email
- `POST /api/email/connect` - Connect email account (OAuth)
- `GET /api/email/accounts` - List connected accounts
- `GET /api/email/messages` - List emails
- `GET /api/email/messages/:id` - Get email details
- `POST /api/email/send` - Send email
- `POST /api/email/draft` - Generate email draft (AI)

### Calendar
- `POST /api/calendar/connect` - Connect calendar (OAuth)
- `GET /api/calendar/accounts` - List connected calendars
- `GET /api/calendar/events` - List events
- `POST /api/calendar/events` - Create event
- `PUT /api/calendar/events/:id` - Update event
- `DELETE /api/calendar/events/:id` - Delete event

### Tasks
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/:id/complete` - Mark task complete

### Notes
- `GET /api/notes` - List notes
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `GET /api/notes/search` - Search notes

## User Experience Flow

### First Launch
1. Welcome screen
2. Create account or login
3. Enter OpenAI API key
4. Optional: Connect email account
5. Optional: Connect calendar
6. Tutorial/Quick tour
7. Start using Andy

### Daily Usage
1. User opens app (via shortcut or startup)
2. Andy shows summary:
   - Unread email count
   - Today's calendar events
   - Pending tasks
3. User interacts via chat:
   - Ask questions
   - Request email summaries
   - Create tasks/events
   - Take notes
4. Andy provides assistance and learns preferences
5. User receives smart notifications

## Success Metrics (MVP)

### Technical Metrics
- App loads in <2 seconds
- AI response time <5 seconds
- 99% uptime for backend services
- <100ms API response time (non-AI endpoints)
- Email sync within 30 seconds
- Zero data loss

### User Metrics
- 70% weekly active users (WAU)
- 40% daily active users (DAU)
- Average 20 interactions per day
- 60% users connect email
- 50% users connect calendar
- <5% churn rate

### Quality Metrics
- 85% user satisfaction
- <2% crash rate
- <5 critical bugs
- 80% positive reviews

## Security & Privacy

### Data Protection
- All passwords hashed (bcrypt)
- API keys encrypted at rest
- HTTPS only communication
- Token-based authentication (JWT)
- OAuth 2.0 for third-party services

### Privacy
- No email content stored permanently
- Chat history encrypted
- User data never shared
- Clear data deletion process
- Privacy policy and terms

### Compliance
- GDPR considerations
- Data export functionality
- Account deletion option
- Audit logs

## Development Timeline

### Month 1: Infrastructure
- Backend API setup
- Database setup
- Authentication system
- Basic Electron app skeleton

### Month 2: Core Chat
- AI chat interface
- OpenAI integration
- Chat history
- Basic commands

### Month 3: Email Integration
- Gmail OAuth
- Outlook OAuth
- Email reading
- Email AI features

### Month 4: Calendar & Tasks
- Calendar integration
- Task management
- Note-taking
- File operations

### Month 5: Polish & Testing
- UI/UX improvements
- Bug fixes
- Performance optimization
- User testing

### Month 6: Beta Launch
- Private beta release
- Feedback collection
- Iteration
- Documentation

## Next Steps

1. Set up development environment
2. Create backend API skeleton
3. Create Electron app skeleton
4. Implement authentication
5. Build chat interface
6. Integrate OpenAI
7. Test with real users
8. Iterate based on feedback

## Resources Needed

### Team
- 1-2 Full-stack developers
- 1 UI/UX designer (part-time)
- 1 Product manager (you!)

### Budget
- OpenAI API: $500-$2000/month
- Cloud hosting: $100-$500/month
- Development tools: $50/month
- Total: ~$650-$2550/month

### Tools
- GitHub for version control
- Figma for design
- Linear/Jira for project management
- Slack for communication
- AWS/Vercel for hosting

## Conclusion

This MVP focuses on delivering core value:
- AI-powered personal assistant
- Email and calendar management
- Task and note organization
- Clean, simple desktop interface

By keeping scope focused, this can be built in 3-6 months and serve as the foundation for all future features described in the main roadmap.
