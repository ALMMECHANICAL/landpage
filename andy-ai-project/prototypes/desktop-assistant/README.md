# Andy AI Desktop Assistant - Prototype

This is a functional HTML/CSS/JavaScript prototype of the Andy AI desktop assistant interface.

## What This Is

A **working visual prototype** that demonstrates:
- The complete UI design for Andy AI
- Tab navigation between Chat, Email, Calendar, Tasks, Notes, and Settings
- Interactive chat interface
- Sample data for all features
- Responsive design
- Keyboard shortcuts

## What This Is NOT

This is **not a functional application**. It does not:
- Actually connect to OpenAI, Gmail, or any APIs
- Store or retrieve real data
- Use Electron (it's plain HTML/CSS/JS)
- Have backend connectivity

## How to Use

### Option 1: Open Directly
Simply open `andy-assistant.html` in a modern web browser (Chrome, Firefox, Safari, Edge).

### Option 2: Local Server
For best results, serve via a local web server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Then open http://localhost:8000/andy-assistant.html
```

## Features Demo

### Chat Interface
- Type messages in the chat input
- Click "Send" or press Enter
- AI responds with simulated responses
- View conversation history

### Email Tab
- See sample unread emails
- View priority indicators
- Click refresh button
- Click emails to view (shows alert)

### Calendar Tab
- View today's schedule
- See event status (ongoing/upcoming)
- Add new events (shows prompt)

### Tasks Tab
- View tasks by section (Today, Upcoming)
- Check off tasks to complete them
- Add new tasks
- See priority levels

### Notes Tab
- Switch between notes in sidebar
- Edit note title and content
- Create new notes
- Save and delete actions

### Settings Tab
- API configuration
- Connect accounts (simulated OAuth)
- Appearance settings
- Notification preferences

## Keyboard Shortcuts

- `Ctrl/Cmd + K` - Focus chat input
- `Ctrl/Cmd + 1-5` - Switch tabs
- `Enter` - Send chat message

## Customization

You can easily customize the prototype:

### Colors
Edit `andy-assistant.css` and change the color values:
```css
/* Change primary accent color */
#32CD32 → your color

/* Change background gradient */
background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
```

### Content
Edit `andy-assistant.html` to modify:
- Sample emails
- Calendar events
- Tasks
- Notes content
- Settings options

### Functionality
Edit `andy-assistant.js` to change:
- Response behavior
- Simulated data
- Event handlers
- Keyboard shortcuts

## Converting to Electron

To turn this into a real Electron app:

1. **Install Electron:**
   ```bash
   npm install electron
   ```

2. **Create main.js:**
   ```javascript
   const { app, BrowserWindow } = require('electron');

   function createWindow() {
     const win = new BrowserWindow({
       width: 400,
       height: 650,
       webPreferences: {
         nodeIntegration: true
       },
       frame: false,
       transparent: true,
       alwaysOnTop: true
     });

     win.loadFile('andy-assistant.html');
   }

   app.whenReady().then(createWindow);
   ```

3. **Add package.json:**
   ```json
   {
     "name": "andy-ai",
     "version": "0.1.0",
     "main": "main.js",
     "scripts": {
       "start": "electron ."
     }
   }
   ```

4. **Run:**
   ```bash
   npm start
   ```

## Next Steps

This prototype serves as:
1. **Design reference** for the real application
2. **User testing tool** to gather feedback
3. **Demo** for investors or stakeholders
4. **Blueprint** for developers to implement

To build the real Andy AI, see:
- [MVP Specification](../../docs/MVP_SPECIFICATION.md)
- [Roadmap](../../../ANDY_AI_ROADMAP.md)
- [Integration Architecture](../../docs/INTEGRATION_ARCHITECTURE.md)

## Browser Compatibility

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

© 2025 ALM Media and Entertainment - All Rights Reserved
