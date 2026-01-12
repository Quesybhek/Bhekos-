BhekOS 6.0

BhekOS is a modern web-based operating system interface with a hybrid Windows 11 + macOS Sonoma UI design. It runs entirely in your browser and provides a feature-rich desktop-like experience.

🚀 Features

· Hybrid UI: Combines the best of Windows 11 and macOS Sonoma design elements
· Full PMA Support: Advanced application management
· Multi-User System: Support for multiple user accounts
· Virtual Desktops: Organize your workspace across multiple desktops
· Built-in Apps & Games: Pre-installed applications and entertainment
· Voice Assistant: Built-in voice control and assistance
· Screen Recording & Screenshots: Capture your screen easily
· Parental Controls: Manage access and usage
· Security Center: System security monitoring
· Performance Monitoring: Real-time system performance tracking

⚡ Quick Start

Prerequisites

· A modern web browser (Chrome, Firefox, Edge, Safari)
· Basic command line knowledge (for local server setup)

Installation & Running

Important: BhekOS uses Service Workers for advanced features, which require running from a web server (not file:// protocol).

Choose one of these methods:

Method 1: Using Python (Simplest)

```bash
# Navigate to the project folder
cd /path/to/bhekos

# Start a local web server
python -m http.server 8000

# Open browser and go to:
# http://localhost:8000
```

Method 2: Using Node.js

```bash
# Install http-server if needed
npm install -g http-server

# Navigate to project folder and run
http-server
```

Method 3: Using PHP

```bash
# Navigate to project folder
php -S localhost:8000
```

Method 4: Using VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on index.html
3. Select "Open with Live Server"

🔧 Troubleshooting

Service Worker Error

If you see this error:

```
Service Worker registration failed: TypeError: Failed to register a ServiceWorker: The URL protocol of the current origin ("null") is not supported.
```

Solution: You're trying to open the HTML file directly. Use one of the web server methods above instead.

Browser Compatibility Issues

· Clear browser cache if experiencing strange behavior
· Ensure JavaScript is enabled
· Try disabling browser extensions temporarily

🗂️ Project Structure

```
bhekos/
├── index.html          # Main entry point
├── assets/             # Images, icons, fonts
├── css/                # Stylesheets
├── js/                 # JavaScript files
│   ├── core/           # Core OS functionality
│   ├── apps/           # Application scripts
│   └── services/       # Service workers, APIs
├── apps/               # Application data
└── system/             # System files and configurations
```

📁 Development

To modify or extend BhekOS:

1. Clone or download the repository
2. Make changes to the source files
3. Test using a local web server
4. The system uses modular JavaScript architecture

⚠️ Important Notes

· Local Storage: User data is stored in your browser's local storage
· Security: Running locally is safe; all data stays on your machine
· Updates: Check for updates periodically for new features

🤝 Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style patterns
2. Test changes thoroughly
3. Document new features

📄 License
 MIT

---

BhekOS 6.0 - A browser-based operating system experience. If you encounter any issues, please ensure you're running it through a local web server as described above.
