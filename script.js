// ==================== BHEKOS 6.0 - REPAIRED & STABILIZED ====================

class BhekOS {
    constructor() {
        this.apps = [];
        this.windows = [];
        this.activeWindow = null;
        this.desktops = [1];
        this.currentDesktop = 1;
        this.users = [
            { id: 'admin', name: 'Administrator', avatar: '👑', online: true }
        ];
        this.currentUser = null;
        this.clipboard = [];
        this.settings = { darkMode: true, volume: 50, brightness: 100, notifications: true };
        this.performance = { cpu: 0, ram: 0 };
        
        this.powerAnimationSettings = {
            logoImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMDBGRjlEIiByeD0iMjAiLz4KPHBhdGggZD0iTTUwIDgwTDEwMCAxMzBMMTUwIDgwIiBzdHJva2U9IiMwMEE2NjYiIHN0cm9rZS13aWR0aD0iOCIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI1MCIgcj0iMTUiIGZpbGw9IiMwMEE2NjYiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTUwIiByPSIxNSIgZmlsbD0iIzAwQTY2NiIvPgo8L3N2Zz4=',
            logoSize: 150,
            enableSound: true
        };

        this.initApps();
        this.initEventListeners();
        this.updateClock();
        this.startPerformanceMonitoring();
    }

    // ==================== CORE SYSTEM ====================
    initApps() {
        this.apps = [
            { id: 'explorer', name: 'File Explorer', icon: '📁', category: 'system' },
            { id: 'terminal', name: 'Terminal', icon: '💻', category: 'system' },
            { id: 'settings', name: 'Settings', icon: '⚙️', category: 'system' },
            { id: 'snake', name: 'Snake', icon: '🐍', category: 'games' },
            { id: 'notepad', name: 'Notepad', icon: '📝', category: 'utilities' },
            { id: 'calculator', name: 'Calculator', icon: '🧮', category: 'utilities' }
        ];
        this.renderLaunchpad();
    }

    renderLaunchpad() {
        const grid = document.getElementById('launchpad-grid');
        if (!grid) return;
        grid.innerHTML = '';
        this.apps.forEach(app => {
            const appEl = document.createElement('div');
            appEl.className = 'launchpad-app';
            appEl.innerHTML = `<div class="launchpad-app-icon">${app.icon}</div><div>${app.name}</div>`;
            appEl.onclick = () => {
                this.spawnApp(app.id);
                this.toggleLaunchpad();
            };
            grid.appendChild(appEl);
        });
    }

    // ==================== WINDOW MANAGEMENT ====================
    spawnApp(appId) {
        const app = this.apps.find(a => a.id === appId);
        if (!app) return;

        const windowId = `win-${Date.now()}`;
        const win = document.createElement('div');
        win.className = 'window';
        win.id = windowId;
        win.style.left = '100px';
        win.style.top = '100px';
        win.style.zIndex = 100 + this.windows.length;

        win.innerHTML = `
            <div class="title-bar">
                <div class="window-info"><span>${app.icon}</span> ${app.name}</div>
                <div class="window-controls">
                    <button class="win-btn min">_</button>
                    <button class="win-btn close">×</button>
                </div>
            </div>
            <div class="window-content" id="content-${windowId}"></div>
        `;

        document.getElementById('windows-container').appendChild(win);
        const winObj = { id: windowId, element: win, app };
        this.windows.push(winObj);
        
        this.makeDraggable(win);
        this.loadAppContent(appId, win.querySelector('.window-content'));

        win.querySelector('.close').onclick = () => this.closeWindow(windowId);
    }

    closeWindow(id) {
        const win = this.windows.find(w => w.id === id);
        if (win) {
            win.element.remove();
            this.windows = this.windows.filter(w => w.id !== id);
        }
    }

    makeDraggable(el) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = el.querySelector('.title-bar');
        header.onmousedown = (e) => {
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = () => {
                document.onmouseup = null;
                document.onmousemove = null;
            };
            document.onmousemove = (e) => {
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                el.style.top = (el.offsetTop - pos2) + "px";
                el.style.left = (el.offsetLeft - pos1) + "px";
            };
        };
    }

    // ==================== APP CONTENT LOADERS ====================
    loadAppContent(id, container) {
        switch(id) {
            case 'terminal':
                container.innerHTML = `<div class="terminal-body"><div id="term-out"></div><span class="prompt">bhekos@sys:~$</span> <span class="cursor">|</span></div>`;
                this.runTerminalDemo(container.querySelector('#term-out'));
                break;
            case 'calculator':
                this.createCalculator(container);
                break;
            case 'snake':
                this.initSnakeGame(container);
                break;
            default:
                container.innerHTML = `<div style="padding:20px">Welcome to ${id}. Logic coming soon!</div>`;
        }
    }

    runTerminalDemo(el) {
        const lines = ["Initializing kernel...", "Loading UI modules...", "System Ready."];
        let i = 0;
        const interval = setInterval(() => {
            if (i >= lines.length) return clearInterval(interval);
            el.innerHTML += `<div>${lines[i]}</div>`;
            i++;
        }, 800);
    }

    // ==================== UTILITIES ====================
    updateClock() {
        setInterval(() => {
            const now = new Date();
            const clockEl = document.getElementById('system-clock');
            if (clockEl) clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }, 1000);
    }

    showNotification(icon, msg) {
        const toast = document.createElement('div');
        toast.className = 'notification-toast';
        toast.innerHTML = `<span>${icon}</span> ${msg}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    toggleLaunchpad() {
        const lp = document.getElementById('launchpad');
        if (lp) lp.classList.toggle('hidden');
    }

    // ==================== SYSTEM ACTIONS ====================
    login() {
        const pass = document.getElementById('login-password').value;
        if (pass === 'bhekos' || pass === '') {
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('desktop').classList.remove('hidden');
            this.showNotification('🚀', 'Welcome Back!');
        } else {
            alert('Wrong Password! (Hint: bhekos)');
        }
    }

    async init() {
        // Initial Startup Simulation
        console.log("BhekOS Booting...");
        const overlay = document.getElementById('power-animation-overlay');
        if (overlay) {
            overlay.classList.add('active');
            setTimeout(() => overlay.classList.remove('active'), 2000);
        }
    }

    initEventListeners() {
        // Global Click listener for Start Menu / Context Menu
        document.addEventListener('click', (e) => {
            if (e.target.id === 'start-btn') this.toggleLaunchpad();
        });
    }

    startPerformanceMonitoring() {
        setInterval(() => {
            this.performance.cpu = Math.floor(Math.random() * 20) + 5;
            // Update UI elements if they exist
            const cpuVal = document.getElementById('cpu-value');
            if (cpuVal) cpuVal.textContent = `${this.performance.cpu}%`;
        }, 3000);
    }
}

// Global initialization
const os = new BhekOS();
window.addEventListener('DOMContentLoaded', () => os.init());
