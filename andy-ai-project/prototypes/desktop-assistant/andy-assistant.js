// Andy AI Desktop Assistant - Prototype JavaScript

// Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.dataset.tab;

        // Remove active class from all tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab
        button.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    });
});

// Window Controls
document.querySelector('.minimize').addEventListener('click', () => {
    alert('In a real Electron app, this would minimize the window');
});

document.querySelector('.maximize').addEventListener('click', () => {
    const window = document.querySelector('.andy-window');
    if (window.style.width === '100%') {
        window.style.width = '400px';
        window.style.height = '650px';
    } else {
        window.style.width = '100%';
        window.style.height = '100vh';
    }
});

document.querySelector('.close').addEventListener('click', () => {
    if (confirm('Close Andy AI?')) {
        alert('In a real Electron app, this would close or hide to system tray');
    }
});

// Chat Input
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    const userMessage = createMessageElement('user', message);
    chatMessages.appendChild(userMessage);

    // Clear input
    chatInput.value = '';

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate AI response
    setTimeout(() => {
        const responses = [
            "I'm processing your request...",
            "Let me help you with that!",
            "I've found some information for you.",
            "That's an interesting question. Here's what I think...",
            "I can definitely help with that!",
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const aiMessage = createMessageElement('assistant', randomResponse);
        chatMessages.appendChild(aiMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

function createMessageElement(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const avatar = document.createElement('div');
    avatar.className = role === 'assistant' ? 'message-avatar' : 'message-avatar user-avatar';
    avatar.textContent = role === 'assistant' ? 'AI' : 'You';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const contentP = document.createElement('p');
    contentP.textContent = content;

    const timeP = document.createElement('p');
    timeP.className = 'message-time';
    timeP.textContent = 'Just now';

    contentDiv.appendChild(contentP);
    contentDiv.appendChild(timeP);

    if (role === 'assistant') {
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);
    } else {
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(avatar);
    }

    return messageDiv;
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Quick Actions
document.querySelectorAll('.quick-action').forEach(btn => {
    btn.addEventListener('click', () => {
        const icon = btn.textContent;
        const actions = {
            '🎤': 'Voice input activated (demo)',
            '📎': 'File attachment (demo)',
            '📸': 'Screenshot taken (demo)'
        };
        alert(actions[icon] || 'Feature coming soon!');
    });
});

// Email Actions
document.querySelector('.refresh-btn').addEventListener('click', () => {
    alert('Refreshing emails... (demo)');
});

document.querySelectorAll('.email-item').forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.type !== 'checkbox') {
            alert('Opening email details... (demo)');
        }
    });
});

// Calendar Actions
document.querySelector('.add-event-btn').addEventListener('click', () => {
    const eventName = prompt('Enter event name:');
    if (eventName) {
        alert(`Event "${eventName}" would be created in the real app`);
    }
});

// Task Actions
document.querySelector('.add-task-btn').addEventListener('click', () => {
    const taskName = prompt('Enter task name:');
    if (taskName) {
        alert(`Task "${taskName}" would be created in the real app`);
    }
});

document.querySelectorAll('.task-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const taskItem = e.target.closest('.task-item');
        if (e.target.checked) {
            taskItem.style.opacity = '0.5';
            taskItem.style.textDecoration = 'line-through';
            setTimeout(() => {
                alert('Task marked as complete!');
            }, 300);
        } else {
            taskItem.style.opacity = '1';
            taskItem.style.textDecoration = 'none';
        }
    });
});

// Notes Actions
document.querySelector('.new-note-btn').addEventListener('click', () => {
    const noteName = prompt('Enter note title:');
    if (noteName) {
        alert(`Note "${noteName}" would be created in the real app`);
    }
});

document.querySelectorAll('.note-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.note-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Settings Actions
document.querySelectorAll('.connect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert(`${btn.textContent} - OAuth flow would start here in the real app`);
    });
});

// Auto-focus chat input on load
window.addEventListener('load', () => {
    chatInput.focus();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus chat input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        chatInput.focus();
    }

    // Ctrl/Cmd + 1-5 to switch tabs
    if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        const tabIndex = parseInt(e.key) - 1;
        tabButtons[tabIndex]?.click();
    }
});

console.log('Andy AI Desktop Assistant Prototype Loaded');
console.log('Keyboard Shortcuts:');
console.log('  Ctrl/Cmd + K: Focus chat input');
console.log('  Ctrl/Cmd + 1-5: Switch between tabs');
