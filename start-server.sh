#!/bin/bash
# Simple HTTP server to preview the landing page

echo "🚀 Starting ALM Landing Page Preview Server..."
echo "📍 Server will run at: http://localhost:8000"
echo "💡 Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
else
    echo "❌ Error: Python is not installed"
    echo "Please install Python or open index.html directly in your browser"
    exit 1
fi
