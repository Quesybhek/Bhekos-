// ==================== BHEKOS 6.0 - COMPLETE OPERATING SYSTEM ====================
// Core System, Login, and Desktop Initialization

class BhekOS {
    constructor() {
        this.apps = [];
        this.windows = [];
        this.activeWindow = null;
        this.desktops = [1];
        this.currentDesktop = 1;
        this.users = [
            { id: 'admin', name: 'Administrator', avatar: '👑', online: true },
            { id: 'user1', name: 'User 1', avatar: '👤', online: true },
            { id: 'user2', name: 'User 2', avatar: '👤', online: false }
        ];
        this.currentUser = null;
        this.clipboard = [];
        this.settings = {
            darkMode: true,
            volume: 50,
            brightness: 75,
            wifi: true,
            bluetooth: false,
            airplaneMode: false,
            battery: 85,
            notifications: true
        };
        this.performance = {
            cpu: 45,
            ram: 60,
            gpu: 30,
            disk: 25
        };
        this.desktopIcons = [];
        this.isLocked = false;
        this.isSleeping = false;
        this.isRecording = false;
        this.recordingStart = null;
        this.voiceListening = false;
        this.biometricEnabled = true;
        this.gamepadConnected = false;
        this.securityStatus = 'good';
        this.cloudSyncProgress = 45;
        this.diskUsed = 75;
        this.parentalTimeRemaining = 120 * 60; // 2 hours in seconds
        this.parentalTimePaused = false;
        this.installPromptShown = false;
        this.devtoolsActive = false;
        this.devtoolsTab = 'console';
        
        // Power animation settings
        this.powerAnimationSettings = {
            logoImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMDBGRjlEIiByeD0iMjAiLz4KPHBhdGggZD0iTTUwIDgwTDEwMCAxMzBMMTUwIDgwIiBzdHJva2U9IiMwMEE2NjYiIHN0cm9rZS13aWR0aD0iOCIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI1MCIgcj0iMTUiIGZpbGw9IiMwMEE2NjYiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTUwIiByPSIxNSIgZmlsbD0iIzAwQTY2NiIvPgo8L3N2Zz4K',
            logoSize: 200,
            startupDuration: 3000,
            shutdownDuration: 2500,
            restartDuration: 3500,
            animationType: 'scale',
            enableSound: true,
            enableParticles: true,
        };
        
        this.initApps();
        this.initEventListeners();
        this.updateClock();
        this.checkInstallPrompt();
        this.startPerformanceMonitoring();
        this.initSensors();
        this.checkGamepad();
        this.initVoiceAssistant();
        
        console.log('🚀 BhekOS 6.0 initialized!');
    }

    // ==================== CORE SYSTEM METHODS ====================

    initApps() {
        this.apps = [
            // System Apps
            { id: 'explorer', name: '📁 File Explorer', icon: '📁', category: 'system', description: 'Browse files and folders' },
            { id: 'terminal', name: '💻 Terminal', icon: '💻', category: 'system', description: 'Command line interface' },
            { id: 'settings', name: '⚙️ Settings', icon: '⚙️', category: 'system', description: 'System configuration' },
            { id: 'browser', name: '🌐 Browser', icon: '🌐', category: 'internet', description: 'Web browser' },
            { id: 'calculator', name: '🧮 Calculator', icon: '🧮', category: 'utilities', description: 'Scientific calculator' },
            { id: 'notepad', name: '📝 Notepad', icon: '📝', category: 'utilities', description: 'Text editor' },
            { id: 'paint', name: '🎨 Paint', icon: '🎨', category: 'utilities', description: 'Drawing application' },
            { id: 'media-player', name: '🎵 Media Player', icon: '🎵', category: 'multimedia', description: 'Audio and video player' },
            { id: 'ai-assistant', name: '🤖 AI Assistant', icon: '🤖', category: 'ai', description: 'AI-powered assistant' },
            { id: 'power-demo', name: '⚡ Power Demo', icon: '⚡', category: 'system', description: 'Power animation demonstration' },
            
            // Games
            { id: 'snake', name: '🐍 Snake', icon: '🐍', category: 'games', description: 'Classic snake game' },
            { id: 'flappy', name: '🐦 Flappy Bird', icon: '🐦', category: 'games', description: 'Flappy bird game' },
            { id: 'memory', name: '🧠 Memory Match', icon: '🧠', category: 'games', description: 'Memory card game' },
            { id: '2048', name: '🧩 2048', icon: '🧩', category: 'games', description: 'Number puzzle game' },
            { id: 'puzzle', name: '🧩 Puzzle', icon: '🧩', category: 'games', description: 'Slide puzzle game' },
            { id: 'tic-tac-toe', name: '⭕ Tic Tac Toe', icon: '⭕', category: 'games', description: 'Classic Tic Tac Toe' },
            
            // Productivity
            { id: 'calendar', name: '📅 Calendar', icon: '📅', category: 'productivity', description: 'Calendar and scheduling' },
            { id: 'contacts', name: '👥 Contacts', icon: '👥', category: 'productivity', description: 'Contact management' },
            { id: 'email', name: '📧 Email', icon: '📧', category: 'productivity', description: 'Email application' },
            { id: 'office', name: '📄 Office', icon: '📄', category: 'productivity', description: 'Document editor' },
            { id: 'pdf', name: '📚 PDF Reader', icon: '📚', category: 'productivity', description: 'PDF document viewer' },
            
            // Multimedia
            { id: 'camera', name: '📷 Camera', icon: '📷', category: 'multimedia', description: 'Camera and photo capture' },
            { id: 'gallery', name: '🖼️ Gallery', icon: '🖼️', category: 'multimedia', description: 'Photo and image viewer' },
            { id: 'video-editor', name: '🎬 Video Editor', icon: '🎬', category: 'multimedia', description: 'Video editing tool' },
            { id: 'music-library', name: '🎶 Music Library', icon: '🎶', category: 'multimedia', description: 'Music collection' },
            { id: 'video-library', name: '🎥 Video Library', icon: '🎥', category: 'multimedia', description: 'Video collection' },
            
            // Tools
            { id: 'maps', name: '🗺️ Maps', icon: '🗺️', category: 'tools', description: 'Navigation and maps' },
            { id: 'weather', name: '☀️ Weather', icon: '☀️', category: 'tools', description: 'Weather forecast' },
            { id: 'news', name: '📰 News', icon: '📰', category: 'tools', description: 'News reader' },
            { id: 'voice-assistant', name: '🎤 Voice Assistant', icon: '🎤', category: 'tools', description: 'Voice commands' }
        ];
        
        this.initLaunchpad();
        this.initDesktopIcons();
    }

    initEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.altKey && e.key === 'Delete') {
                this.showSecurityOptions();
                e.preventDefault();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                this.minimizeAllWindows();
                e.preventDefault();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                this.lockScreen();
                e.preventDefault();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'q') {
                if (this.activeWindow) this.closeWindow(this.activeWindow);
                e.preventDefault();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'Tab') {
                this.showAppSwitcher();
                e.preventDefault();
            }
            if (e.key === 'F5') {
                this.showNotification('🔄', 'Refreshing...');
                setTimeout(() => location.reload(), 1000);
                e.preventDefault();
            }
            if (e.key === 'PrintScreen') {
                this.takeScreenshot();
                e.preventDefault();
            }
            if (e.altKey && e.key === 'F4') {
                if (this.activeWindow) this.closeWindow(this.activeWindow);
                e.preventDefault();
            }
        });

        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showContextMenu(e.clientX, e.clientY);
        });

        document.addEventListener('click', () => this.hideContextMenu());

        // Brightness slider
        const brightnessSlider = document.getElementById('brightness-slider');
        if (brightnessSlider) {
            brightnessSlider.addEventListener('input', (e) => {
                this.settings.brightness = e.target.value;
                const valSpan = document.getElementById('brightness-value');
                if (valSpan) valSpan.textContent = `${e.target.value}%`;
                document.body.style.filter = `brightness(${e.target.value / 100})`;
            });
        }

        // Volume slider
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.settings.volume = e.target.value;
                const valSpan = document.getElementById('volume-value');
                if (valSpan) valSpan.textContent = `${e.target.value}%`;
            });
        }

        // Launchpad search
        const launchpadSearch = document.getElementById('launchpad-search');
        if (launchpadSearch) {
            launchpadSearch.addEventListener('input', (e) => this.searchApps(e.target.value));
        }

        // Global search
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.performSearch(e.target.value));
        }

        // Touch gestures
        let touchStartX = 0, touchStartY = 0;
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        document.addEventListener('touchend', (e) => {
            const diffX = e.changedTouches[0].clientX - touchStartX;
            if (e.touches.length === 3 && Math.abs(diffX) > 100) {
                if (diffX > 0) this.switchToNextDesktop();
                else this.switchToPreviousDesktop();
                this.showTouchHint();
            }
        });

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('serviceworker.js').catch(console.error);
        }
    }

    // ==================== LOGIN SYSTEM ====================

    login() {
        const password = document.getElementById('login-password').value;
        if (password === '' || password === 'bhekos') {
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('desktop').classList.remove('hidden');
            document.getElementById('menu-bar').classList.remove('hidden');
            document.getElementById('dock').classList.remove('hidden');
            this.currentUser = this.users[0];
            this.showNotification('🎉', `Welcome to BhekOS 6.0, ${this.currentUser.name}!`);
            this.startParentalTimer();
            setTimeout(() => {
                const va = document.getElementById('voice-assistant');
                if (va) va.classList.remove('hidden');
            }, 3000);
        } else {
            this.showNotification('❌', 'Incorrect password! Try "bhekos"');
            document.getElementById('login-password').value = '';
            document.getElementById('login-password').focus();
        }
    }

    logout() {
        this.showNotification('👋', 'Logging out...');
        setTimeout(() => {
            document.getElementById('desktop').classList.add('hidden');
            document.getElementById('menu-bar').classList.add('hidden');
            document.getElementById('dock').classList.add('hidden');
            document.getElementById('login-screen').classList.remove('hidden');
            document.getElementById('login-password').value = '';
            document.getElementById('login-password').focus();
            this.windows.forEach(w => this.closeWindow(w));
            this.windows = [];
        }, 1000);
    }

    lockScreen() {
        this.isLocked = true;
        document.getElementById('desktop').classList.add('hidden');
        document.getElementById('menu-bar').classList.add('hidden');
        document.getElementById('dock').classList.add('hidden');

        const lockScreen = document.createElement('div');
        lockScreen.id = 'lock-screen';
        lockScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        lockScreen.innerHTML = `
            <div class="login-container">
                <div class="login-avatar">${this.currentUser.avatar}</div>
                <div class="login-name">${this.currentUser.name}</div>
                <div class="login-status">Locked - ${new Date().toLocaleTimeString()}</div>
                <input type="password" class="login-input" placeholder="Enter password to unlock" id="unlock-password" autofocus>
                <button class="btn btn-primary" onclick="os.unlockScreen()">🔓 Unlock</button>
            </div>
        `;
        document.body.appendChild(lockScreen);
        this.showNotification('🔒', 'Screen locked');
    }

    unlockScreen() {
        const password = document.getElementById('unlock-password').value;
        if (password === '' || password === 'bhekos') {
            document.getElementById('lock-screen').remove();
            document.getElementById('desktop').classList.remove('hidden');
            document.getElementById('menu-bar').classList.remove('hidden');
            document.getElementById('dock').classList.remove('hidden');
            this.isLocked = false;
            this.showNotification('🔓', 'Screen unlocked');
        } else {
            this.showNotification('❌', 'Incorrect password!');
            document.getElementById('unlock-password').value = '';
            document.getElementById('unlock-password').focus();
        }
    }

    // ==================== WINDOW SYSTEM ====================

    spawnApp(appName) {
        const app = this.apps.find(a => a.name === appName);
        if (!app) {
            this.showNotification('❌', `App "${appName}" not found!`);
            return;
        }

        // Games use dedicated containers (from HTML)
        if (app.category === 'games') {
            const gameId = app.id;
            const container = document.getElementById(`${gameId}-game`);
            if (container) {
                document.querySelectorAll('.game-container').forEach(c => c.classList.add('hidden'));
                container.classList.remove('hidden');
                // Initialize game logic if needed
                if (gameId === 'snake') this.initSnakeGame();
                else if (gameId === 'memory') this.initMemoryGame();
                else if (gameId === '2048') this.init2048Game();
                else if (gameId === 'puzzle') this.initPuzzleGame();
                else if (gameId === 'tic-tac-toe') this.initTicTacToe();
                else if (gameId === 'flappy') this.initFlappyGame();
                return;
            }
        }

        // Non-game apps: create a window
        const windowId = `window-${Date.now()}`;
        const template = document.getElementById('window-template').content.cloneNode(true);
        const win = template.querySelector('.window');
        win.id = windowId;
        win.style.left = `${100 + (this.windows.length * 30)}px`;
        win.style.top = `${100 + (this.windows.length * 30)}px`;
        win.style.width = '600px';
        win.style.height = '400px';

        win.querySelector('.window-title').textContent = app.name;
        win.querySelector('.window-icon').innerHTML = app.icon;

        const content = win.querySelector('.window-content');
        this.setWindowContent(content, app);

        document.getElementById('windows-container').appendChild(win);

        const windowObj = {
            id: windowId,
            element: win,
            app: app,
            minimized: false,
            maximized: false,
            zIndex: 100 + this.windows.length
        };
        this.windows.push(windowObj);
        this.bringToFront(windowObj);
        this.setupWindowControls(win, windowObj);
        this.showNotification(app.icon, `${app.name} opened`);
    }

    setWindowContent(content, app) {
        content.innerHTML = '';
        switch (app.id) {
            case 'explorer':
                this.createFileExplorer(content);
                break;
            case 'terminal':
                this.createTerminal(content);
                break;
            case 'settings':
                this.createSettings(content);
                break;
            case 'browser':
                this.createBrowser(content);
                break;
            case 'calculator':
                this.createCalculator(content);
                break;
            case 'notepad':
                this.createNotepad(content);
                break;
            case 'paint':
                this.createPaint(content);
                break;
            case 'media-player':
                this.createMediaPlayer(content);
                break;
            case 'ai-assistant':
                this.createAIAssistant(content);
                break;
            default:
                content.innerHTML = `
                    <div style="padding:40px; text-align:center;">
                        <div style="font-size:64px;">${app.icon}</div>
                        <h2>${app.name}</h2>
                        <p>${app.description}</p>
                        <p style="font-size:13px; opacity:0.6;">Coming soon!</p>
                    </div>
                `;
        }
    }

    setupWindowControls(win, obj) {
        const titleBar = win.querySelector('.title-bar');
        const minimize = win.querySelector('.window-minimize');
        const maximize = win.querySelector('.window-maximize');
        const close = win.querySelector('.window-close');

        let isDragging = false, offsetX, offsetY;
        titleBar.addEventListener('mousedown', (e) => {
            if (obj.maximized) return;
            isDragging = true;
            offsetX = e.clientX - win.offsetLeft;
            offsetY = e.clientY - win.offsetTop;
            this.bringToFront(obj);
        });
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            win.style.left = `${e.clientX - offsetX}px`;
            win.style.top = `${e.clientY - offsetY}px`;
        });
        document.addEventListener('mouseup', () => isDragging = false);

        minimize.addEventListener('click', () => {
            win.classList.add('minimized');
            obj.minimized = true;
        });
        maximize.addEventListener('click', () => {
            if (obj.maximized) {
                win.classList.remove('maximized');
                obj.maximized = false;
            } else {
                win.classList.add('maximized');
                obj.maximized = true;
            }
        });
        close.addEventListener('click', () => this.closeWindow(obj));
    }

    bringToFront(obj) {
        this.windows.forEach(w => {
            w.zIndex = 100;
            w.element.style.zIndex = '100';
        });
        obj.zIndex = 200;
        obj.element.style.zIndex = '200';
        this.activeWindow = obj;
    }

    closeWindow(obj) {
        obj.element.remove();
        this.windows = this.windows.filter(w => w.id !== obj.id);
        if (this.activeWindow === obj) this.activeWindow = this.windows[this.windows.length-1] || null;
    }

    minimizeAllWindows() {
        this.windows.forEach(w => {
            w.element.classList.add('minimized');
            w.minimized = true;
        });
        this.showNotification('🗕', 'All windows minimized');
    }

    // ==================== DOCK & LAUNCHPAD ====================

    toggleLaunchpad() {
        const lp = document.getElementById('launchpad');
        if (lp.classList.contains('hidden')) {
            lp.classList.remove('hidden');
            const search = document.getElementById('launchpad-search');
            if (search) search.focus();
        } else {
            lp.classList.add('hidden');
        }
    }

    initLaunchpad() {
        const grid = document.getElementById('launchpad-grid');
        if (!grid) return;
        grid.innerHTML = '';
        this.apps.forEach(app => {
            const el = document.createElement('div');
            el.className = 'launchpad-app';
            el.innerHTML = `<div class="launchpad-app-icon">${app.icon}</div><div class="launchpad-app-name">${app.name.replace(/[^a-zA-Z0-9 ]/g, '')}</div>`;
            el.addEventListener('click', () => {
                this.spawnApp(app.name);
                this.toggleLaunchpad();
            });
            grid.appendChild(el);
        });
    }

    searchApps(query) {
        const apps = document.querySelectorAll('.launchpad-app');
        apps.forEach(app => {
            const name = app.querySelector('.launchpad-app-name').textContent.toLowerCase();
            if (name.includes(query.toLowerCase())) app.style.display = 'flex';
            else app.style.display = 'none';
        });
    }

    // ==================== CONTROL CENTER ====================

    toggleControlCenter() {
        const cc = document.getElementById('control-center');
        if (cc.classList.contains('hidden')) cc.classList.remove('hidden');
        else cc.classList.add('hidden');
    }

    toggleWiFi() {
        this.settings.wifi = !this.settings.wifi;
        this.showNotification('📶', `Wi-Fi ${this.settings.wifi ? 'enabled' : 'disabled'}`);
    }
    toggleBluetooth() {
        this.settings.bluetooth = !this.settings.bluetooth;
        this.showNotification('📱', `Bluetooth ${this.settings.bluetooth ? 'enabled' : 'disabled'}`);
    }
    toggleAirplaneMode() {
        this.settings.airplaneMode = !this.settings.airplaneMode;
        this.settings.wifi = !this.settings.airplaneMode;
        this.settings.bluetooth = !this.settings.airplaneMode;
        this.showNotification('✈️', `Airplane mode ${this.settings.airplaneMode ? 'enabled' : 'disabled'}`);
    }
    toggleDarkMode() {
        this.settings.darkMode = !this.settings.darkMode;
        if (this.settings.darkMode) {
            document.documentElement.style.setProperty('--system-bg', '#0A0A0A');
            document.documentElement.style.setProperty('--system-surface', '#1A1A1A');
        } else {
            document.documentElement.style.setProperty('--system-bg', '#F0F0F0');
            document.documentElement.style.setProperty('--system-surface', '#FFFFFF');
        }
        this.showNotification('🌙', `Dark mode ${this.settings.darkMode ? 'enabled' : 'disabled'}`);
    }
    toggleVolume() {
        this.settings.volume = (this.settings.volume + 10) % 110;
        this.showNotification('🔊', `Volume ${this.settings.volume}%`);
        const volSlider = document.getElementById('volume-slider');
        if (volSlider) volSlider.value = this.settings.volume;
        const valSpan = document.getElementById('volume-value');
        if (valSpan) valSpan.textContent = `${this.settings.volume}%`;
    }
    toggleBattery() {
        this.showNotification('🔋', `Battery: ${Math.floor(Math.random()*100)}%`);
    }

    // ==================== NOTIFICATION SYSTEM ====================

    showNotification(icon, message) {
        if (!this.settings.notifications) return;
        const container = document.getElementById('notification-container');
        if (!container) return;
        const notif = document.createElement('div');
        notif.className = 'notification';
        notif.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">${icon} BhekOS</div>
                <div class="notification-time">${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
            </div>
            <div class="notification-message">${message}</div>
        `;
        container.appendChild(notif);
        setTimeout(() => {
            if (notif.parentNode) {
                notif.style.animation = 'slide-in-right 0.3s ease reverse';
                setTimeout(() => notif.remove(), 300);
            }
        }, 5000);
    }

    // ==================== POWER ANIMATION SYSTEM ====================

    setPowerLogo(imageUrl, settings = {}) {
        this.powerAnimationSettings.logoImage = imageUrl;
        Object.assign(this.powerAnimationSettings, settings);
        const logoImg = document.getElementById('favicon-32.png');
        if (logoImg) {
            logoImg.src = imageUrl;
            logoImg.style.maxWidth = `${this.powerAnimationSettings.logoSize}px`;
            logoImg.style.maxHeight = `${this.powerAnimationSettings.logoSize}px`;
        }
    }

    showPowerOnAnimation() {
        return new Promise((resolve) => {
            const overlay = document.getElementById('power-animation-overlay');
            if (!overlay) return resolve();
            const logo = document.getElementById('favicon-32.png');
            const text = document.getElementById('power-animation-text');
            const progressBar = document.getElementById('power-animation-progress-bar');
            const statusText = document.getElementById('power-status-text');

            if (logo) {
                logo.src = this.powerAnimationSettings.logoImage;
                logo.style.maxWidth = `${this.powerAnimationSettings.logoSize}px`;
                logo.style.maxHeight = `${this.powerAnimationSettings.logoSize}px`;
            }

            overlay.classList.remove('shutting-down', 'restarting');
            overlay.classList.add('active');

            if (logo) {
                logo.style.transform = 'translate(-50%, -50%) scale(0)';
                logo.style.opacity = '0';
            }
            if (text) {
                text.style.opacity = '0';
                text.style.transform = 'translateY(20px)';
            }
            if (progressBar) progressBar.style.width = '0%';

            if (this.powerAnimationSettings.enableSound) this.playSound('startup');

            setTimeout(() => {
                if (logo) {
                    logo.style.transform = 'translate(-50%, -50%) scale(0.1)';
                    logo.style.opacity = '0.3';
                }
                if (statusText) statusText.textContent = 'Loading core system';
                if (progressBar) progressBar.style.width = '20%';
            }, 300);
            setTimeout(() => {
                if (logo) {
                    logo.style.transform = 'translate(-50%, -50%) scale(0.3)';
                    logo.style.opacity = '0.6';
                }
                if (statusText) statusText.textContent = 'Initializing modules';
                if (progressBar) progressBar.style.width = '40%';
            }, 800);
            setTimeout(() => {
                if (logo) {
                    logo.style.transform = 'translate(-50%, -50%) scale(0.7)';
                    logo.style.opacity = '0.9';
                }
                if (statusText) statusText.textContent = 'Starting services';
                if (progressBar) progressBar.style.width = '70%';
                if (logo) logo.classList.add('power-on-pulse');
            }, 1500);
            setTimeout(() => {
                if (logo) {
                    logo.style.transform = 'translate(-50%, -50%) scale(1)';
                    logo.style.opacity = '1';
                }
                if (text) {
                    text.style.opacity = '1';
                    text.style.transform = 'translateY(0)';
                }
                if (statusText) statusText.textContent = 'Starting desktop';
                if (progressBar) progressBar.style.width = '90%';
                if (logo) logo.style.animation = 'floatLogo 3s ease-in-out infinite';
            }, 2200);
            setTimeout(() => {
                if (progressBar) progressBar.style.width = '100%';
                if (statusText) statusText.textContent = 'Ready';
                setTimeout(() => {
                    overlay.classList.remove('active');
                    if (logo) logo.classList.remove('power-on-pulse');
                    resolve();
                }, 500);
            }, 2800);
        });
    }

    showPowerOffAnimation() {
        return new Promise((resolve) => {
            const overlay = document.getElementById('power-animation-overlay');
            if (!overlay) return resolve();
            const logo = document.getElementById('favicon-32.png');
            const text = document.getElementById('power-animation-text');
            const progressBar = document.getElementById('power-animation-progress-bar');
            const statusText = document.getElementById('power-status-text');

            if (logo) {
                logo.src = this.powerAnimationSettings.logoImage;
                logo.style.maxWidth = `${this.powerAnimationSettings.logoSize}px`;
                logo.style.maxHeight = `${this.powerAnimationSettings.logoSize}px`;
            }

            overlay.classList.add('active', 'shutting-down');
            overlay.classList.remove('restarting');

            if (logo) {
                logo.style.transform = 'translate(-50%, -50%) scale(1)';
                logo.style.opacity = '1';
                logo.style.animation = 'none';
            }
            if (text) {
                text.style.opacity = '1';
                text.style.transform = 'translateY(0)';
            }
            if (progressBar) progressBar.style.width = '100%';

            if (this.powerAnimationSettings.enableSound) this.playSound('shutdown');

            setTimeout(() => {
                if (statusText) statusText.textContent = 'Saving work';
                if (progressBar) progressBar.style.width = '80%';
            }, 300);
            setTimeout(() => {
                if (statusText) statusText.textContent = 'Closing applications';
                if (progressBar) progressBar.style.width = '60%';
            }, 800);
            setTimeout(() => {
                if (statusText) statusText.textContent = 'Stopping services';
                if (progressBar) progressBar.style.width = '40%';
                if (logo) {
                    logo.style.transform = 'translate(-50%, -50%) scale(0.7)';
                    logo.style.opacity = '0.8';
                }
            }, 1300);
            setTimeout(() => {
                if (statusText) statusText.textContent = 'Powering down';
                if (progressBar) progressBar.style.width = '20%';
                if (logo) {
                    logo.style.transform = 'translate(-50%, -50%) scale(0.3)';
                    logo.style.opacity = '0.4';
                }
                if (text) {
                    text.style.opacity = '0.5';
                    text.style.transform = 'translateY(10px)';
                }
            }, 1800);
            setTimeout(() => {
                if (statusText) statusText.textContent = 'Goodbye';
                if (progressBar) progressBar.style.width = '0%';
                if (logo) {
                    logo.style.transform = 'translate(-50%, -50%) scale(0)';
                    logo.style.opacity = '0';
                }
                if (text) {
                    text.style.opacity = '0';
                    text.style.transform = 'translateY(20px)';
                }
                resolve();
            }, 2300);
        });
    }

    showRestartAnimation() {
        return new Promise((resolve) => {
            const overlay = document.getElementById('power-animation-overlay');
            if (!overlay) return resolve();
            const logo = document.getElementById('favicon-32.png');
            const text = document.getElementById('power-animation-text');
            const progressBar = document.getElementById('power-animation-progress-bar');
            const statusText = document.getElementById('power-status-text');

            if (logo) {
                logo.src = this.powerAnimationSettings.logoImage;
                logo.style.maxWidth = `${this.powerAnimationSettings.logoSize}px`;
                logo.style.maxHeight = `${this.powerAnimationSettings.logoSize}px`;
            }

            overlay.classList.add('active', 'restarting');
            overlay.classList.remove('shutting-down');

            if (logo) {
                logo.style.transform = 'translate(-50%, -50%) scale(1)';
                logo.style.opacity = '1';
            }
            if (text) {
                text.style.opacity = '1';
                text.style.transform = 'translateY(0)';
            }
            if (progressBar) progressBar.style.width = '100%';

            if (this.powerAnimationSettings.enableSound) this.playSound('restart');

            setTimeout(() => {
                if (statusText) statusText.textContent = 'Preparing to restart';
                if (progressBar) progressBar.style.width = '80%';
            }, 300);
            setTimeout(() => {
                if (statusText) statusText.textContent = 'Closing applications';
                if (progressBar) progressBar.style.width = '60%';
            }, 800);
            setTimeout(() => {
                if (statusText) statusText.textContent = 'Saving state';
                if (progressBar) progressBar.style.width = '40%';
                if (logo) {
                    logo.style.transform = 'translate(-50%, -50%) scale(0.5)';
                    logo.style.opacity = '0.6';
                }
            }, 1300);
            setTimeout(() => {
                if (statusText) statusText.textContent = 'Restarting';
                if (progressBar) progressBar.style.width = '20%';
                if (logo) {
                    logo.style.transform = 'translate(-50%, -50%) scale(0)';
                    logo.style.opacity = '0';
                }
                if (text) {
                    text.style.opacity = '0';
                    text.style.transform = 'translateY(20px)';
                }
            }, 2000);
            setTimeout(() => {
                if (statusText) statusText.textContent = 'Booting';
                if (progressBar) progressBar.style.width = '10%';
                if (logo) {
                    logo.style.transform = 'translate(-50%, -50%) scale(0.1)';
                    logo.style.opacity = '0.3';
                }
            }, 2500);
            setTimeout(() => {
                if (statusText) statusText.textContent = 'Loading system';
                if (progressBar) progressBar.style.width = '40%';
                if (logo) {
                    logo.style.transform = 'translate(-50%, -50%) scale(0.4)';
                    logo.style.opacity = '0.6';
                }
            }, 2800);
            setTimeout(() => {
                if (statusText) statusText.textContent = 'Almost ready';
                if (progressBar) progressBar.style.width = '70%';
                if (logo) {
                    logo.style.transform = 'translate(-50%, -50%) scale(0.8)';
                    logo.style.opacity = '0.9';
                }
                if (text) text.style.opacity = '0.5';
            }, 3200);
            setTimeout(() => {
                if (statusText) statusText.textContent = 'Complete';
                if (progressBar) progressBar.style.width = '100%';
                if (logo) {
                    logo.style.transform = 'translate(-50%, -50%) scale(1)';
                    logo.style.opacity = '1';
                }
                if (text) {
                    text.style.opacity = '1';
                    text.style.transform = 'translateY(0)';
                }
                setTimeout(() => {
                    overlay.classList.remove('active');
                    resolve();
                }, 500);
            }, 3500);
        });
    }

    playSound(type) {
        if (!this.powerAnimationSettings.enableSound) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            if (type === 'startup') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.setValueAtTime(200, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.5);
                gain.gain.setValueAtTime(0, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
                osc.start();
                osc.stop(ctx.currentTime + 2);
            } else if (type === 'shutdown') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.setValueAtTime(800, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 1.5);
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
                osc.start();
                osc.stop(ctx.currentTime + 2);
            } else if (type === 'restart') {
                const osc1 = ctx.createOscillator();
                const gain1 = ctx.createGain();
                osc1.connect(gain1);
                gain1.connect(ctx.destination);
                osc1.frequency.setValueAtTime(600, ctx.currentTime);
                osc1.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.8);
                gain1.gain.setValueAtTime(0.3, ctx.currentTime);
                gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
                osc1.start();
                osc1.stop(ctx.currentTime + 1);
                setTimeout(() => {
                    const osc2 = ctx.createOscillator();
                    const gain2 = ctx.createGain();
                    osc2.connect(gain2);
                    gain2.connect(ctx.destination);
                    osc2.frequency.setValueAtTime(200, ctx.currentTime);
                    osc2.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.8);
                    gain2.gain.setValueAtTime(0, ctx.currentTime);
                    gain2.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
                    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
                    osc2.start();
                    osc2.stop(ctx.currentTime + 1);
                }, 1200);
            }
        } catch (e) {}
    }

    // ==================== POWER MANAGEMENT ====================

    showPowerMenu() {
        const menu = document.getElementById('power-menu');
        if (menu) menu.classList.remove('hidden');
    }
    hidePowerMenu() {
        const menu = document.getElementById('power-menu');
        if (menu) menu.classList.add('hidden');
    }
    async sleep() {
        this.isSleeping = true;
        const overlay = document.getElementById('power-animation-overlay');
        const logo = document.getElementById('favicon-32.png');
        const text = document.getElementById('power-animation-text');
        const statusText = document.getElementById('power-status-text');
        if (overlay) overlay.classList.add('active');
        if (logo) {
            logo.style.transform = 'translate(-50%, -50%) scale(0.5)';
            logo.style.opacity = '0.5';
        }
        if (text) text.style.opacity = '0.5';
        if (statusText) statusText.textContent = 'Entering sleep mode';
        setTimeout(() => {
            if (overlay) overlay.classList.remove('active');
            document.body.style.filter = 'brightness(0.1)';
            this.showNotification('🌙', 'Entering sleep mode...');
            this.hidePowerMenu();
        }, 1500);
        document.addEventListener('click', () => this.wake(), { once: true });
        document.addEventListener('keydown', () => this.wake(), { once: true });
    }
    async wake() {
        if (this.isSleeping) {
            this.isSleeping = false;
            const overlay = document.getElementById('power-animation-overlay');
            const logo = document.getElementById('favicon-32.png');
            const text = document.getElementById('power-animation-text');
            const statusText = document.getElementById('power-status-text');
            if (overlay) overlay.classList.add('active');
            if (logo) {
                logo.style.transform = 'translate(-50%, -50%) scale(0.3)';
                logo.style.opacity = '0.3';
            }
            if (text) text.style.opacity = '0.3';
            if (statusText) statusText.textContent = 'Waking up';
            setTimeout(() => {
                if (logo) {
                    logo.style.transform = 'translate(-50%, -50%) scale(1)';
                    logo.style.opacity = '1';
                }
                if (text) text.style.opacity = '1';
                if (statusText) statusText.textContent = 'Ready';
                setTimeout(() => {
                    if (overlay) overlay.classList.remove('active');
                    document.body.style.filter = '';
                    this.showNotification('☀️', 'Waking up...');
                }, 1000);
            }, 500);
        }
    }
    async restart() {
        await this.showRestartAnimation();
        this.showNotification('🔄', 'Restarting system...');
        setTimeout(() => location.reload(), 500);
    }
    async shutdown() {
        await this.showPowerOffAnimation();
        this.showNotification('⏻', 'Shutting down...');
        setTimeout(() => {
            document.body.innerHTML = `
                <div style="position:fixed; inset:0; background:black; display:flex; flex-direction:column; align-items:center; justify-content:center; color:white; font-family:system-ui; font-size:24px;">
                    <div style="margin-bottom:30px; font-size:72px;">⏻</div>
                    <div>System shutdown complete</div>
                    <div style="font-size:16px; opacity:0.7; margin:20px 0;">You can now close this tab</div>
                    <div style="position:absolute; bottom:30px; font-size:12px; opacity:0.5;">BhekOS 6.0</div>
                </div>
            `;
        }, 500);
    }

    // ==================== UTILITIES ====================

    updateClock() {
        const update = () => {
            const now = new Date();
            const time = now.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
            const date = now.toLocaleDateString([], { weekday:'short', month:'short', day:'numeric' });
            const clock = document.getElementById('system-clock');
            const center = document.getElementById('menu-center-text');
            if (clock) clock.textContent = `🕛 ${time}`;
            if (center) center.textContent = `🚀 BhekOS 6.0 • ${date}`;
        };
        update();
        setInterval(update, 60000);
    }

    showContextMenu(x, y) {
        const menu = document.getElementById('context-menu');
        if (!menu) return;
        menu.innerHTML = '';
        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;
        menu.classList.remove('hidden');
        const items = [
            { icon: '🆕', text: 'New Folder', action: () => this.createNewFolder() },
            { icon: '📄', text: 'New File', action: () => this.createNewFile() },
            { icon: '📋', text: 'Paste', action: () => this.pasteFromClipboard() },
            { separator: true },
            { icon: '⚙️', text: 'Display Settings', action: () => this.openDisplaySettings() },
            { icon: '🔧', text: 'Developer Tools', action: () => this.toggleDevTools() },
            { separator: true },
            { icon: '🔄', text: 'Refresh', action: () => location.reload() },
            { icon: '❓', text: 'About BhekOS', action: () => this.showAbout() }
        ];
        items.forEach(item => {
            if (item.separator) {
                const div = document.createElement('div');
                div.style.height = '1px';
                div.style.background = 'rgba(255,255,255,0.1)';
                div.style.margin = '4px 0';
                menu.appendChild(div);
            } else {
                const el = document.createElement('div');
                el.className = 'sidebar-item';
                el.innerHTML = `<span style="margin-right:8px;">${item.icon}</span> ${item.text}`;
                el.addEventListener('click', () => { item.action(); this.hideContextMenu(); });
                menu.appendChild(el);
            }
        });
    }
    hideContextMenu() {
        const menu = document.getElementById('context-menu');
        if (menu) menu.classList.add('hidden');
    }

    // ==================== APPS IMPLEMENTATION ====================

    createFileExplorer(content) {
        content.innerHTML = `
            <div class="file-explorer-toolbar">
                <button class="btn btn-secondary"><i class="fas fa-arrow-left"></i></button>
                <button class="btn btn-secondary"><i class="fas fa-arrow-right"></i></button>
                <button class="btn btn-secondary"><i class="fas fa-arrow-up"></i></button>
                <div style="flex:1"></div>
                <button class="btn btn-secondary"><i class="fas fa-search"></i></button>
                <button class="btn btn-primary" onclick="os.createNewFolder()"><i class="fas fa-folder-plus"></i> New Folder</button>
            </div>
            <div class="file-grid">
                <div class="file-item" onclick="os.showNotification('📁', 'Documents opened')"><div class="file-icon">📁</div><div class="file-name">Documents</div></div>
                <div class="file-item" onclick="os.showNotification('📁', 'Downloads opened')"><div class="file-icon">📁</div><div class="file-name">Downloads</div></div>
                <div class="file-item" onclick="os.showNotification('📁', 'Pictures opened')"><div class="file-icon">📁</div><div class="file-name">Pictures</div></div>
                <div class="file-item" onclick="os.showNotification('📁', 'Music opened')"><div class="file-icon">📁</div><div class="file-name">Music</div></div>
                <div class="file-item" onclick="os.showNotification('📁', 'Videos opened')"><div class="file-icon">📁</div><div class="file-name">Videos</div></div>
                <div class="file-item" onclick="os.showNotification('💾', 'System opened')"><div class="file-icon">💾</div><div class="file-name">System</div></div>
            </div>
        `;
    }

    createTerminal(content) {
        content.innerHTML = `
            <div class="terminal">
                <div class="terminal-header"><span class="terminal-prompt">bhekos@desktop:~$</span> Welcome to BhekOS Terminal</div>
                <div><span class="terminal-prompt">bhekos@desktop:~$</span> <span id="terminal-output"></span><span class="terminal-cursor"></span></div>
            </div>
        `;
        const cmds = ['help', 'date', 'system', 'clear', 'neofetch'];
        let i = 0;
        const out = document.getElementById('terminal-output');
        const type = () => {
            if (i < cmds.length) {
                out.textContent = cmds[i];
                i++;
                setTimeout(type, 2000);
            }
        };
        setTimeout(type, 1000);
    }

    createSettings(content) {
        content.innerHTML = `
            <div class="settings-container">
                <div class="sidebar">
                    <div class="sidebar-section"><div class="sidebar-title">System</div><div class="sidebar-item active"><div class="sidebar-icon">⚙️</div><span>General</span></div><div class="sidebar-item"><div class="sidebar-icon">🖥️</div><span>Display</span></div><div class="sidebar-item"><div class="sidebar-icon">🔊</div><span>Sound</span></div></div>
                    <div class="sidebar-section"><div class="sidebar-title">Network</div><div class="sidebar-item"><div class="sidebar-icon">📶</div><span>Wi-Fi</span></div><div class="sidebar-item"><div class="sidebar-icon">📱</div><span>Bluetooth</span></div></div>
                    <div class="sidebar-section"><div class="sidebar-title">Privacy</div><div class="sidebar-item"><div class="sidebar-icon">🔒</div><span>Security</span></div><div class="sidebar-item"><div class="sidebar-icon">👁️</div><span>Accessibility</span></div></div>
                </div>
                <div class="settings-content">
                    <div class="settings-section"><h2 class="settings-title">⚙️ System Settings</h2><div class="settings-grid"><div class="settings-card"><div class="settings-card-title">🖥️ Display</div><div class="settings-card-desc">Adjust brightness, resolution</div><button class="btn btn-secondary" onclick="os.openDisplaySettings()">Configure</button></div><div class="settings-card"><div class="settings-card-title">🔊 Sound</div><div class="settings-card-desc">Volume, output device</div><button class="btn btn-secondary" onclick="os.openSoundSettings()">Configure</button></div><div class="settings-card"><div class="settings-card-title">⌨️ Keyboard</div><div class="settings-card-desc">Shortcuts, typing</div><button class="btn btn-secondary" onclick="os.openKeyboardSettings()">Configure</button></div><div class="settings-card"><div class="settings-card-title">🔋 Power & Battery</div><div class="settings-card-desc">Power saving, sleep</div><button class="btn btn-secondary">Configure</button></div><div class="settings-card"><div class="settings-card-title">🗄️ Storage</div><div class="settings-card-desc">Disk usage, cleanup</div><button class="btn btn-secondary" onclick="os.showDiskCleanup()">Configure</button></div></div></div>
                </div>
            </div>
        `;
    }

    createBrowser(content) {
        content.innerHTML = `
            <div style="display:flex; flex-direction:column; height:100%;">
                <div class="browser-toolbar"><button class="btn btn-secondary"><i class="fas fa-arrow-left"></i></button><button class="btn btn-secondary"><i class="fas fa-arrow-right"></i></button><button class="btn btn-secondary"><i class="fas fa-redo"></i></button><input type="text" class="browser-url-bar" value="https://bhekos.com" readonly><button class="btn btn-primary"><i class="fas fa-search"></i></button></div>
                <div class="browser-content"><div style="padding:40px; text-align:center;"><div style="font-size:64px;">🌐</div><h2>BhekOS Browser</h2><p>Fast, secure, private</p><div style="display:flex; gap:20px; justify-content:center;"><button class="btn btn-primary" onclick="os.showNotification('🌐','Opening BhekOS.com')">Visit BhekOS.com</button><button class="btn btn-secondary" onclick="os.showNotification('🆕','New tab')">New Tab</button></div></div></div>
            </div>
        `;
    }

    createCalculator(content) {
        content.innerHTML = `
            <div class="calculator"><div class="calculator-display" id="calc-display">0</div><div class="calculator-buttons"><button class="calc-btn" onclick="os.calcInput('C')">C</button><button class="calc-btn" onclick="os.calcInput('±')">±</button><button class="calc-btn" onclick="os.calcInput('%')">%</button><button class="calc-btn operator" onclick="os.calcInput('/')">÷</button><button class="calc-btn" onclick="os.calcInput('7')">7</button><button class="calc-btn" onclick="os.calcInput('8')">8</button><button class="calc-btn" onclick="os.calcInput('9')">9</button><button class="calc-btn operator" onclick="os.calcInput('*')">×</button><button class="calc-btn" onclick="os.calcInput('4')">4</button><button class="calc-btn" onclick="os.calcInput('5')">5</button><button class="calc-btn" onclick="os.calcInput('6')">6</button><button class="calc-btn operator" onclick="os.calcInput('-')">−</button><button class="calc-btn" onclick="os.calcInput('1')">1</button><button class="calc-btn" onclick="os.calcInput('2')">2</button><button class="calc-btn" onclick="os.calcInput('3')">3</button><button class="calc-btn operator" onclick="os.calcInput('+')">+</button><button class="calc-btn" onclick="os.calcInput('0')">0</button><button class="calc-btn" onclick="os.calcInput('.')">.</button><button class="calc-btn equals" onclick="os.calcInput('=')">=</button></div></div>
        `;
        this.calcValue = '0';
        this.calcWaiting = false;
        this.calcOperator = '';
    }

    calcInput(key) {
        const disp = document.getElementById('calc-display');
        if (!disp) return;
        if ('0123456789.'.includes(key)) {
            if (this.calcWaiting) {
                disp.textContent = key;
                this.calcWaiting = false;
            } else {
                disp.textContent = disp.textContent === '0' ? key : disp.textContent + key;
            }
            this.calcValue = disp.textContent;
        } else if ('+-*/'.includes(key)) {
            this.calcWaiting = true;
            this.calcOperator = key;
            this.calcPrevious = this.calcValue;
        } else if (key === '=') {
            if (this.calcOperator && this.calcPrevious !== undefined) {
                const prev = parseFloat(this.calcPrevious);
                const cur = parseFloat(this.calcValue);
                let res = 0;
                switch(this.calcOperator) {
                    case '+': res = prev + cur; break;
                    case '-': res = prev - cur; break;
                    case '*': res = prev * cur; break;
                    case '/': res = prev / cur; break;
                }
                disp.textContent = res.toString();
                this.calcValue = res.toString();
                this.calcWaiting = true;
            }
        } else if (key === 'C') {
            disp.textContent = '0';
            this.calcValue = '0';
            this.calcWaiting = false;
            this.calcOperator = '';
        }
    }

    createNotepad(content) {
        content.innerHTML = `
            <div style="display:flex; flex-direction:column; height:100%;">
                <div class="notepad-toolbar"><button class="btn btn-secondary" onclick="os.showNotification('📄','New document')"><i class="fas fa-file"></i></button><button class="btn btn-secondary" onclick="os.showNotification('💾','Document saved')"><i class="fas fa-save"></i></button><button class="btn btn-secondary" onclick="os.showNotification('🖨️','Print document')"><i class="fas fa-print"></i></button><div style="flex:1"></div><button class="btn btn-primary" onclick="os.showNotification('📋','Text copied')"><i class="fas fa-copy"></i> Copy</button></div>
                <textarea class="notepad-textarea" placeholder="Start typing..." id="notepad-text">Welcome to BhekOS Notepad!\n\nYou can use this text editor to:\n• Take notes\n• Write documents\n• Edit code\n• Save important information\n\nTry typing something...</textarea>
            </div>
        `;
    }

    createPaint(content) {
        content.innerHTML = `
            <div style="display:flex; flex-direction:column; height:100%;">
                <div class="paint-toolbar"><div class="paint-tools"><button class="paint-tool active" title="Brush"><i class="fas fa-paint-brush"></i></button><button class="paint-tool" title="Eraser"><i class="fas fa-eraser"></i></button><button class="paint-tool" title="Line"><i class="fas fa-slash"></i></button><button class="paint-tool" title="Rectangle"><i class="fas fa-square"></i></button><button class="paint-tool" title="Circle"><i class="fas fa-circle"></i></button><input type="color" class="paint-color" value="#FF4757"><input type="range" class="paint-slider" min="1" max="50" value="5"></div><div class="paint-actions"><button class="btn btn-secondary" onclick="os.showNotification('🗑️','Canvas cleared')"><i class="fas fa-trash"></i></button><button class="btn btn-primary" onclick="os.showNotification('💾','Drawing saved')"><i class="fas fa-save"></i> Save</button></div></div>
                <canvas class="paint-canvas" id="paint-canvas" width="800" height="500"></canvas>
            </div>
        `;
        const canvas = document.getElementById('paint-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            let drawing = false, lastX, lastY;
            canvas.addEventListener('mousedown', (e) => {
                drawing = true;
                [lastX, lastY] = [e.offsetX, e.offsetY];
            });
            canvas.addEventListener('mousemove', (e) => {
                if (!drawing) return;
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.strokeStyle = '#FF4757';
                ctx.lineWidth = 5;
                ctx.stroke();
                [lastX, lastY] = [e.offsetX, e.offsetY];
            });
            canvas.addEventListener('mouseup', () => drawing = false);
            canvas.addEventListener('mouseout', () => drawing = false);
        }
    }

    createMediaPlayer(content) {
        content.innerHTML = `
            <div class="media-player">
                <div class="media-player-cover">🎵</div>
                <div class="media-player-info"><div class="media-player-title">BhekOS Anthem</div><div class="media-player-artist">System Music</div></div>
                <div class="media-player-controls"><button class="media-player-btn"><i class="fas fa-backward"></i></button><button class="media-player-btn play"><i class="fas fa-play"></i></button><button class="media-player-btn"><i class="fas fa-forward"></i></button></div>
                <div class="media-player-progress"><input type="range" style="width:100%;"></div>
            </div>
        `;
    }

    createAIAssistant(content) {
        content.innerHTML = `
            <div style="padding:20px;">
                <h3>🤖 AI Assistant</h3>
                <p>Ask me anything!</p>
                <input type="text" id="ai-input" placeholder="Type your question..." style="width:100%; margin:10px 0;">
                <button class="btn btn-primary" onclick="os.showNotification('🤖','AI is thinking...')">Ask</button>
                <div id="ai-response" style="margin-top:20px;"></div>
            </div>
        `;
    }

    // ==================== GAMES ====================

    initSnakeGame() {
        const canvas = document.getElementById('snake-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let snake = [{x:200,y:200}];
        let dx = 20, dy = 0;
        let food = {x:300,y:300};
        let score = 0;
        let gameRunning = false;
        let interval;

        function draw() {
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.fillStyle = '#00FF9D';
            snake.forEach(s => ctx.fillRect(s.x,s.y,20,20));
            ctx.fillStyle = '#FF4757';
            ctx.fillRect(food.x,food.y,20,20);
        }

        function update() {
            if (!gameRunning) return;
            const head = {x:snake[0].x+dx, y:snake[0].y+dy};
            snake.unshift(head);
            if (head.x===food.x && head.y===food.y) {
                score += 10;
                const scoreSpan = document.getElementById('snake-score');
                if (scoreSpan) scoreSpan.textContent = score;
                let high = localStorage.getItem('snakeHigh') || 0;
                if (score > high) {
                    high = score;
                    localStorage.setItem('snakeHigh', high);
                    const highSpan = document.getElementById('snake-high-score');
                    if (highSpan) highSpan.textContent = high;
                }
                food = {x:Math.floor(Math.random()*30)*20, y:Math.floor(Math.random()*20)*20};
            } else snake.pop();

            if (head.x<0 || head.x>=canvas.width || head.y<0 || head.y>=canvas.height || snake.slice(1).some(s=>s.x===head.x && s.y===head.y)) {
                gameRunning = false;
                clearInterval(interval);
                this.showNotification('💀', `Game Over! Score: ${score}`);
                return;
            }
            draw();
        }

        window.os.startSnakeGame = () => {
            if (interval) clearInterval(interval);
            snake = [{x:200,y:200}];
            dx = 20; dy = 0;
            score = 0;
            document.getElementById('snake-score').textContent = '0';
            const high = localStorage.getItem('snakeHigh') || 0;
            document.getElementById('snake-high-score').textContent = high;
            food = {x:Math.floor(Math.random()*30)*20, y:Math.floor(Math.random()*20)*20};
            gameRunning = true;
            draw();
            interval = setInterval(() => update(), 150);
        };
        window.os.pauseSnakeGame = () => {
            gameRunning = false;
            if (interval) clearInterval(interval);
        };
        window.os.resetSnakeGame = () => window.os.startSnakeGame();

        document.addEventListener('keydown', (e) => {
            if (!gameRunning) return;
            if (e.key === 'ArrowUp' && dy !== 20) { dx=0; dy=-20; }
            else if (e.key === 'ArrowDown' && dy !== -20) { dx=0; dy=20; }
            else if (e.key === 'ArrowLeft' && dx !== 20) { dx=-20; dy=0; }
            else if (e.key === 'ArrowRight' && dx !== -20) { dx=20; dy=0; }
        });
        window.os.startSnakeGame();
    }

    initMemoryGame() {
        const grid = document.getElementById('memory-grid');
        if (!grid) return;
        const cards = ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼'];
        const pairs = [...cards, ...cards];
        let flipped = [], matched = 0, moves = 0;

        function shuffle(arr) {
            for (let i=arr.length-1; i>0; i--) {
                const j = Math.floor(Math.random()*(i+1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }

        window.os.startMemoryGame = () => {
            grid.innerHTML = '';
            flipped = [];
            matched = 0;
            moves = 0;
            document.getElementById('memory-moves').textContent = '0';
            document.getElementById('memory-pairs').textContent = '0/8';
            const shuffled = shuffle([...pairs]);
            shuffled.forEach((emoji, idx) => {
                const card = document.createElement('div');
                card.className = 'memory-card';
                card.dataset.emoji = emoji;
                card.innerHTML = `<div class="memory-card-front">❓</div><div class="memory-card-back">${emoji}</div>`;
                card.addEventListener('click', () => {
                    if (flipped.length >= 2 || card.classList.contains('flipped')) return;
                    card.classList.add('flipped');
                    flipped.push(card);
                    if (flipped.length === 2) {
                        moves++;
                        document.getElementById('memory-moves').textContent = moves;
                        const [a,b] = flipped;
                        if (a.dataset.emoji === b.dataset.emoji) {
                            matched++;
                            document.getElementById('memory-pairs').textContent = `${matched}/8`;
                            flipped = [];
                            if (matched === 8) this.showNotification('🎉', `Memory Game Complete! Moves: ${moves}`);
                        } else {
                            setTimeout(() => {
                                a.classList.remove('flipped');
                                b.classList.remove('flipped');
                                flipped = [];
                            }, 1000);
                        }
                    }
                });
                grid.appendChild(card);
            });
        };
        window.os.resetMemoryGame = () => window.os.startMemoryGame();
        window.os.startMemoryGame();
    }

    init2048Game() {
        const grid = document.getElementById('game-2048-grid');
        if (!grid) return;
        let board = Array(16).fill(0);
        let score = 0;
        let best = localStorage.getItem('2048best') || 0;

        function render() {
            grid.innerHTML = '';
            board.forEach((val,i) => {
                const tile = document.createElement('div');
                tile.className = 'tile';
                tile.textContent = val || '';
                if (val) tile.style.background = `rgba(0,120,255,${0.2+Math.log2(val)/10})`;
                grid.appendChild(tile);
            });
            document.getElementById('score-2048').textContent = score;
            document.getElementById('high-score-2048').textContent = best;
        }

        function addNewTile() {
            const empty = board.reduce((acc,val,idx)=>val===0?[...acc,idx]:acc, []);
            if (empty.length) {
                const pos = empty[Math.floor(Math.random()*empty.length)];
                board[pos] = Math.random()<0.9 ? 2 : 4;
            }
        }

        function move(dx, dy) {
            let changed = false;
            const size = 4;
            for (let i=0; i<size; i++) {
                for (let j=0; j<size; j++) {
                    // simplified: just add a random tile for demo
                }
            }
            // For full 2048, implement proper logic; here we keep it simple for brevity
        }

        window.os.start2048Game = () => {
            board = Array(16).fill(0);
            score = 0;
            addNewTile();
            addNewTile();
            render();
        };
        window.os.reset2048Game = () => window.os.start2048Game();
        window.os.start2048Game();
    }

    initFlappyGame() { /* stub */ }
    initPuzzleGame() { /* stub */ }
    initTicTacToe() { /* stub */ }

    // ==================== PERFORMANCE MONITORING ====================

    startPerformanceMonitoring() {
        setInterval(() => {
            this.performance.cpu = 30 + Math.random()*40;
            this.performance.ram = 40 + Math.random()*40;
            this.performance.gpu = 20 + Math.random()*30;
            this.performance.disk = 10 + Math.random()*30;
            if (!document.getElementById('performance-monitor').classList.contains('hidden')) {
                document.getElementById('cpu-usage').textContent = `${Math.round(this.performance.cpu)}%`;
                document.getElementById('ram-usage').textContent = `${Math.round(this.performance.ram)}%`;
                document.getElementById('gpu-usage').textContent = `${Math.round(this.performance.gpu)}%`;
                document.getElementById('disk-usage').textContent = `${Math.round(this.performance.disk)}%`;
                this.updatePerformanceGraph();
            }
        }, 2000);
    }

    updatePerformanceGraph() {
        const graph = document.getElementById('performance-graph');
        if (!graph) return;
        graph.innerHTML = '';
        for (let i=0; i<20; i++) {
            const bar = document.createElement('div');
            bar.className = 'performance-bar';
            bar.style.left = `${i*15}px`;
            bar.style.height = `${20+Math.random()*80}px`;
            graph.appendChild(bar);
        }
    }

    // ==================== SENSORS ====================

    initSensors() {
        if ('DeviceOrientationEvent' in window) {
            window.addEventListener('deviceorientation', (e) => {
                const ax = document.getElementById('accel-x');
                const ay = document.getElementById('accel-y');
                const az = document.getElementById('accel-z');
                if (ax) ax.textContent = e.beta ? e.beta.toFixed(2) : '0.00';
                if (ay) ay.textContent = e.gamma ? e.gamma.toFixed(2) : '0.00';
                if (az) az.textContent = e.alpha ? e.alpha.toFixed(2) : '0.00';
            });
        }
        if ('DeviceMotionEvent' in window) {
            window.addEventListener('devicemotion', (e) => {
                const gx = document.getElementById('gyro-x');
                const gy = document.getElementById('gyro-y');
                const gz = document.getElementById('gyro-z');
                if (gx) gx.textContent = e.rotationRate?.beta?.toFixed(2) || '0.00';
                if (gy) gy.textContent = e.rotationRate?.gamma?.toFixed(2) || '0.00';
                if (gz) gz.textContent = e.rotationRate?.alpha?.toFixed(2) || '0.00';
            });
        }
    }

    // ==================== VOICE ASSISTANT ====================

    initVoiceAssistant() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.onresult = (event) => this.processVoiceCommand(event.results[0][0].transcript.toLowerCase());
            this.recognition.onend = () => { if (this.voiceListening) this.recognition.start(); };
        }
    }

    toggleVoiceAssistant() {
        const popup = document.getElementById('voice-assistant-popup');
        if (popup.classList.contains('hidden')) {
            popup.classList.remove('hidden');
            this.startVoiceListening();
        } else {
            popup.classList.add('hidden');
            this.stopVoiceListening();
        }
    }

    startVoiceListening() {
        if (this.recognition) {
            this.voiceListening = true;
            this.recognition.start();
            document.getElementById('voice-command-text').textContent = 'Listening... Speak now!';
            const va = document.getElementById('voice-assistant');
            if (va) va.classList.add('voice-assistant-listening');
        } else {
            document.getElementById('voice-command-text').textContent = 'Voice recognition not supported';
        }
    }

    stopVoiceListening() {
        if (this.recognition) {
            this.voiceListening = false;
            this.recognition.stop();
            document.getElementById('voice-command-text').textContent = 'Say "Hey Bhek" to start...';
            const va = document.getElementById('voice-assistant');
            if (va) va.classList.remove('voice-assistant-listening');
        }
    }

    stopVoiceAssistant() {
        this.stopVoiceListening();
        document.getElementById('voice-assistant-popup').classList.add('hidden');
    }

    processVoiceCommand(cmd) {
        document.getElementById('voice-command-text').textContent = `Heard: "${cmd}"`;
        if (cmd.includes('open') || cmd.includes('launch')) {
            if (cmd.includes('explorer') || cmd.includes('file')) this.spawnApp('📁 File Explorer');
            else if (cmd.includes('browser')) this.spawnApp('🌐 Browser');
            else if (cmd.includes('settings')) this.spawnApp('⚙️ Settings');
            else if (cmd.includes('calculator')) this.spawnApp('🧮 Calculator');
        } else if (cmd.includes('time')) {
            this.showNotification('🕐', `Current time is ${new Date().toLocaleTimeString()}`);
        } else if (cmd.includes('date')) {
            this.showNotification('📅', `Today is ${new Date().toLocaleDateString()}`);
        } else if (cmd.includes('weather')) {
            this.showNotification('☀️', 'Weather: Sunny, 72°F');
        } else if (cmd.includes('screenshot')) {
            this.takeScreenshot();
        } else if (cmd.includes('lock')) {
            this.lockScreen();
        } else {
            this.showNotification('🤖', `Command: "${cmd}"`);
        }
    }

    // ==================== SCREENSHOT TOOL ====================

    takeScreenshot() {
        const overlay = document.getElementById('screenshot-overlay');
        if (!overlay) return;
        overlay.classList.remove('hidden');
        let startX, startY, selection;
        overlay.onmousedown = (e) => {
            startX = e.clientX;
            startY = e.clientY;
            selection = document.createElement('div');
            selection.className = 'screenshot-selection';
            overlay.appendChild(selection);
        };
        overlay.onmousemove = (e) => {
            if (!selection) return;
            const w = Math.abs(e.clientX - startX);
            const h = Math.abs(e.clientY - startY);
            selection.style.width = `${w}px`;
            selection.style.height = `${h}px`;
            selection.style.left = `${Math.min(e.clientX, startX)}px`;
            selection.style.top = `${Math.min(e.clientY, startY)}px`;
        };
        overlay.onmouseup = () => {
            if (selection) {
                setTimeout(() => {
                    overlay.classList.add('hidden');
                    overlay.innerHTML = '';
                    this.showNotification('📸', 'Screenshot captured!');
                }, 500);
            }
        };
        const cancel = (e) => {
            if (e.key === 'Escape') {
                overlay.classList.add('hidden');
                overlay.innerHTML = '';
                document.removeEventListener('keydown', cancel);
            }
        };
        document.addEventListener('keydown', cancel);
    }

    // ==================== INSTALL PROMPT ====================

    checkInstallPrompt() {
        if (!this.installPromptShown && (window.matchMedia('(display-mode: browser)').matches || window.matchMedia('(display-mode: minimal-ui)').matches)) {
            setTimeout(() => this.showInstallPrompt(), 5000);
        }
    }

    showInstallPrompt() {
        if (this.deferredPrompt) {
            document.getElementById('install-prompt').classList.remove('hidden');
            this.installPromptShown = true;
        }
    }

    hideInstallPrompt() {
        document.getElementById('install-prompt').classList.add('hidden');
    }

    installApp() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            this.deferredPrompt.userChoice.then((choice) => {
                if (choice.outcome === 'accepted') this.showNotification('✅', 'BhekOS installed!');
                this.deferredPrompt = null;
                this.hideInstallPrompt();
            });
        }
    }

    // ==================== PARENTAL CONTROLS ====================

    startParentalTimer() {
        setInterval(() => {
            if (!this.parentalTimePaused && this.parentalTimeRemaining > 0) {
                this.parentalTimeRemaining--;
                const h = Math.floor(this.parentalTimeRemaining / 3600);
                const m = Math.floor((this.parentalTimeRemaining % 3600) / 60);
                const s = this.parentalTimeRemaining % 60;
                const timeEl = document.getElementById('time-remaining');
                if (timeEl) timeEl.textContent = `⏰ ${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
                if (this.parentalTimeRemaining <= 300) this.showNotification('⚠️', `Only ${m} minutes remaining!`);
                if (this.parentalTimeRemaining === 0) this.lockScreen();
            }
        }, 1000);
    }

    addTime(minutes) {
        this.parentalTimeRemaining += minutes * 60;
        this.showNotification('➕', `Added ${minutes} minutes`);
    }

    pauseTime() {
        this.parentalTimePaused = !this.parentalTimePaused;
        this.showNotification('⏸️', `Time ${this.parentalTimePaused ? 'paused' : 'resumed'}`);
    }

    // ==================== SECURITY ====================

    runSecurityScan() {
        this.showNotification('🔍', 'Running security scan...');
        setTimeout(() => this.showNotification('✅', 'Security scan complete! No threats found.'), 3000);
    }

    // ==================== FILE OPERATIONS ====================

    createNewFolder() { this.showNotification('📁', 'New folder created'); }
    createNewFile() { this.showNotification('📄', 'New file created'); }
    pasteFromClipboard() { this.showNotification('📋', 'Pasted from clipboard'); }

    // ==================== SYSTEM UTILITIES ====================

    showDiskCleanup() { document.getElementById('disk-cleanup').classList.remove('hidden'); }
    closeDiskCleanup() { document.getElementById('disk-cleanup').classList.add('hidden'); }
    cleanupDisk() {
        this.showNotification('🧹', 'Cleaning up disk space...');
        setTimeout(() => {
            this.diskUsed = 40;
            const storageSpan = document.getElementById('storage-used');
            const bar = document.getElementById('disk-used-bar');
            if (storageSpan) storageSpan.textContent = '40%';
            if (bar) bar.style.width = '40%';
            this.showNotification('✅', 'Freed up 2.5 GB of disk space!');
        }, 2000);
    }
    showPerformanceMonitor() {
        document.getElementById('performance-monitor').classList.remove('hidden');
        this.updatePerformanceGraph();
    }
    closePerformanceMonitor() { document.getElementById('performance-monitor').classList.add('hidden'); }
    toggleDevTools() {
        const dt = document.getElementById('devtools');
        if (dt.classList.contains('hidden')) {
            dt.classList.remove('hidden');
            this.devtoolsActive = true;
        } else {
            dt.classList.add('hidden');
            this.devtoolsActive = false;
        }
    }
    switchDevToolsTab(tab) {
        this.devtoolsTab = tab;
        document.querySelectorAll('.devtools-tab').forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
        const content = document.getElementById('devtools-content');
        if (!content) return;
        switch(tab) {
            case 'console': content.innerHTML = '<div style="color:#00FF9D;">> BhekOS Console [Version 6.0.0.1]</div>'; break;
            case 'elements': content.innerHTML = '<div style="color:#4D9EFF;">&lt;html&gt;<br>&nbsp;&nbsp;&lt;head&gt;...&lt;/head&gt;<br>&nbsp;&nbsp;&lt;body&gt;...&lt;/body&gt;<br>&lt;/html&gt;</div>'; break;
            case 'network': content.innerHTML = '<div style="color:#FFA502;">GET /api/system-status 200 OK<br>GET /api/performance 200 OK</div>'; break;
            case 'performance': content.innerHTML = `<div>CPU: ${this.performance.cpu.toFixed(1)}%<br>RAM: ${this.performance.ram.toFixed(1)}%</div>`; break;
        }
    }

    // ==================== NETWORK UTILITIES ====================

    showCloudSync() { document.getElementById('cloud-sync').classList.remove('hidden'); }
    closeCloudSync() { document.getElementById('cloud-sync').classList.add('hidden'); }
    showRemoteDesktop() { document.getElementById('remote-desktop').classList.remove('hidden'); }
    closeRemoteDesktop() { document.getElementById('remote-desktop').classList.add('hidden'); }
    disconnectRemote() { this.showNotification('🔌', 'Disconnected'); this.closeRemoteDesktop(); }

    // ==================== FILE SHARING ====================

    showFileSharing() { document.getElementById('file-sharing').classList.remove('hidden'); }
    closeFileSharing() { document.getElementById('file-sharing').classList.add('hidden'); }
    copyShareLink() {
        navigator.clipboard.writeText('https://bhekos.com/share/file-12345');
        this.showNotification('🔗', 'Share link copied!');
    }

    // ==================== PRINT & SCAN ====================

    showPrinterDialog() { document.getElementById('printer-dialog').classList.remove('hidden'); }
    closePrinterDialog() { document.getElementById('printer-dialog').classList.add('hidden'); }
    printDocument() { this.showNotification('🖨️', 'Printing...'); this.closePrinterDialog(); }
    showScannerDialog() { document.getElementById('scanner-dialog').classList.remove('hidden'); }
    closeScannerDialog() { document.getElementById('scanner-dialog').classList.add('hidden'); }
    scanDocument() {
        this.showNotification('📷', 'Scanning...');
        setTimeout(() => {
            this.showNotification('✅', 'Document scanned!');
            this.closeScannerDialog();
        }, 2000);
    }

    // ==================== TOUCH & GESTURES ====================

    showTouchHint() { document.getElementById('touch-gesture-hint').classList.remove('hidden'); }
    closeTouchHint() { document.getElementById('touch-gesture-hint').classList.add('hidden'); }

    // ==================== BIOMETRIC AUTH ====================

    showBiometricAuth() { document.getElementById('biometric-auth').classList.remove('hidden'); }
    closeBiometricAuth() { document.getElementById('biometric-auth').classList.add('hidden'); }

    // ==================== SENSORS PANEL ====================

    showSensorsPanel() { document.getElementById('sensors-panel').classList.remove('hidden'); }
    closeSensorsPanel() { document.getElementById('sensors-panel').classList.add('hidden'); }

    // ==================== ACCESSIBILITY ====================

    showAccessibilityMenu() { document.getElementById('accessibility-menu').classList.remove('hidden'); }
    closeAccessibilityMenu() { document.getElementById('accessibility-menu').classList.add('hidden'); }

    // ==================== PARENTAL CONTROLS UI ====================

    showParentalControls() { document.getElementById('parental-controls').classList.remove('hidden'); }
    closeParentalControls() { document.getElementById('parental-controls').classList.add('hidden'); }

    // ==================== SECURITY CENTER ====================

    showSecurityCenter() { document.getElementById('security-center').classList.remove('hidden'); }
    closeSecurityCenter() { document.getElementById('security-center').classList.add('hidden'); }

    // ==================== DESKTOP ICONS ====================

    initDesktopIcons() {
        const icons = [
            { name: '📁 Documents', x: 50, y: 50 },
            { name: '📁 Downloads', x: 50, y: 150 },
            { name: '🖼️ Pictures', x: 50, y: 250 },
            { name: '🎵 Music', x: 50, y: 350 },
            { name: '💾 System', x: 50, y: 450 }
        ];
        const container = document.getElementById('desktop-icons');
        if (!container) return;
        icons.forEach(icon => {
            const el = document.createElement('div');
            el.className = 'file-item';
            el.style.position = 'absolute';
            el.style.left = `${icon.x}px`;
            el.style.top = `${icon.y}px`;
            el.innerHTML = `<div class="file-icon">${icon.name.split(' ')[0]}</div><div class="file-name">${icon.name.split(' ')[1]}</div>`;
            el.addEventListener('dblclick', () => this.showNotification(icon.name.split(' ')[0], `${icon.name} opened`));
            container.appendChild(el);
        });
    }

    // ==================== SEARCH ====================

    showSearch() {
        document.getElementById('search-overlay').classList.remove('hidden');
        document.getElementById('search-input').focus();
    }
    hideSearch() { document.getElementById('search-overlay').classList.add('hidden'); }
    performSearch(query) {
        const results = document.getElementById('search-results');
        if (!results) return;
        results.innerHTML = '';
        if (!query) return;
        const filtered = this.apps.filter(a => a.name.toLowerCase().includes(query.toLowerCase()) || a.description.toLowerCase().includes(query.toLowerCase()));
        filtered.forEach(app => {
            const res = document.createElement('div');
            res.className = 'search-result-item';
            res.innerHTML = `<div style="font-weight:500;">${app.icon} ${app.name}</div><div style="font-size:12px;">${app.description}</div>`;
            res.addEventListener('click', () => { this.spawnApp(app.name); this.hideSearch(); });
            results.appendChild(res);
        });
    }

    // ==================== CLIPBOARD ====================

    showClipboardManager() {
        document.getElementById('clipboard-manager').classList.remove('hidden');
        this.updateClipboardDisplay();
    }
    updateClipboardDisplay() {
        const container = document.getElementById('clipboard-items');
        if (!container) return;
        container.innerHTML = '';
        this.clipboard.forEach((item, idx) => {
            const it = document.createElement('div');
            it.className = 'clipboard-item';
            it.textContent = item.length > 50 ? item.substring(0,50)+'...' : item;
            it.addEventListener('click', () => { navigator.clipboard.writeText(item); this.showNotification('📋', 'Copied!'); });
            container.appendChild(it);
        });
    }
    clearClipboard() {
        this.clipboard = [];
        this.updateClipboardDisplay();
        this.showNotification('🗑️', 'Clipboard cleared');
    }

    // ==================== SCREEN RECORDING ====================

    startRecording() {
        this.isRecording = true;
        this.recordingStart = Date.now();
        document.getElementById('screen-recorder').classList.remove('hidden');
        this.updateRecordingTime();
        this.showNotification('⏺️', 'Screen recording started');
    }
    stopRecording() {
        this.isRecording = false;
        document.getElementById('screen-recorder').classList.add('hidden');
        this.showNotification('⏹️', 'Screen recording saved');
    }
    updateRecordingTime() {
        if (!this.isRecording) return;
        const elapsed = Math.floor((Date.now() - this.recordingStart) / 1000);
        const m = Math.floor(elapsed / 60);
        const s = elapsed % 60;
        const timeSpan = document.getElementById('recording-time');
        if (timeSpan) timeSpan.textContent = `⏺️ ${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
        setTimeout(() => this.updateRecordingTime(), 1000);
    }

    // ==================== USER MANAGEMENT ====================

    showUserSwitcher() { document.getElementById('user-switcher').classList.remove('hidden'); }
    hideUserSwitcher() { document.getElementById('user-switcher').classList.add('hidden'); }
    switchUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            this.currentUser = user;
            this.showNotification('👤', `Switched to ${user.name}`);
            this.hideUserSwitcher();
        }
    }
    addUser() {
        const newUser = { id: `user${this.users.length+1}`, name: `User ${this.users.length+1}`, avatar: '👤', online: true };
        this.users.push(newUser);
        this.showNotification('➕', `User ${newUser.name} added`);
        this.updateUserSwitcher();
    }
    updateUserSwitcher() { /* refresh UI */ }

    // ==================== VIRTUAL DESKTOPS ====================

    showDesktopSwitcher() { document.getElementById('desktop-switcher').classList.remove('hidden'); }
    hideDesktopSwitcher() { document.getElementById('desktop-switcher').classList.add('hidden'); }
    switchDesktop(number) {
        this.currentDesktop = number;
        document.querySelectorAll('.desktop-item').forEach(item => item.classList.remove('active'));
        event.target.closest('.desktop-item').classList.add('active');
        this.showNotification('🖥️', `Switched to Desktop ${number}`);
        this.hideDesktopSwitcher();
    }
    addDesktop() {
        this.desktops.push(this.desktops.length+1);
        this.showNotification('➕', `Desktop ${this.desktops.length} added`);
        this.updateDesktopSwitcher();
    }
    switchToNextDesktop() {
        const idx = this.desktops.indexOf(this.currentDesktop);
        this.switchDesktop(this.desktops[(idx+1)%this.desktops.length]);
    }
    switchToPreviousDesktop() {
        const idx = this.desktops.indexOf(this.currentDesktop);
        this.switchDesktop(this.desktops[(idx-1+this.desktops.length)%this.desktops.length]);
    }
    updateDesktopSwitcher() { /* refresh */ }

    // ==================== GAMEPAD SUPPORT ====================

    checkGamepad() {
        setInterval(() => {
            const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            const connected = gamepads.some(gp => gp);
            if (connected && !this.gamepadConnected) {
                this.gamepadConnected = true;
                document.getElementById('gamepad-status').classList.remove('hidden');
            } else if (!connected && this.gamepadConnected) {
                this.gamepadConnected = false;
                document.getElementById('gamepad-status').classList.add('hidden');
            }
        }, 1000);
    }

    // ==================== SETTINGS DIALOGS ====================

    openDisplaySettings() { this.showNotification('🖥️', 'Opening display settings...'); }
    openSoundSettings() { this.showNotification('🔊', 'Opening sound settings...'); }
    openKeyboardSettings() { this.showNotification('⌨️', 'Opening keyboard settings...'); }
    openNetworkSettings() { this.showNotification('🌐', 'Opening network settings...'); }

    // ==================== MISCELLANEOUS ====================

    adjustWindowPositions() {
        this.windows.forEach(w => {
            const rect = w.element.getBoundingClientRect();
            if (rect.right > window.innerWidth) w.element.style.left = `${window.innerWidth - rect.width - 50}px`;
            if (rect.bottom > window.innerHeight) w.element.style.top = `${window.innerHeight - rect.height - 50}px`;
        });
    }
    showAbout() { this.showNotification('🚀', 'BhekOS 6.0 - Hybrid UI'); }
    showSecurityOptions() { this.showNotification('🔒', 'Security options would appear here'); }
    showAppSwitcher() { this.showNotification('🔄', 'App switcher would appear here'); }
    showWindowMenu() { this.showNotification('🪟', 'Window menu would appear here'); }

    // ==================== LOGO CUSTOMIZATION ====================

    setCustomLogo(url, settings = {}) {
        this.setPowerLogo(url, settings);
        this.showNotification('🖼️', 'Logo updated');
    }
    applyLogoPreset(preset) {
        const presets = {
            'windows': 'https://upload.wikimedia.org/wikipedia/commons/8/87/Windows_logo_-_2021.svg',
            'apple': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
            'linux': 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg',
            'android': 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg',
            'bhekos': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMDBGRjlEIiByeD0iMjAiLz4KPHBhdGggZD0iTTUwIDgwTDEwMCAxMzBMMTUwIDgwIiBzdHJva2U9IiMwMEE2NjYiIHN0cm9rZS13aWR0aD0iOCIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI1MCIgcj0iMTUiIGZpbGw9IiMwMEE2NjYiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTUwIiByPSIxNSIgZmlsbD0iIzAwQTY2NiIvPgo8L3N2Zz4K'
        };
        if (presets[preset]) this.setPowerLogo(presets[preset]);
        this.showNotification('✅', `Applied ${preset} logo`);
    }

    // ==================== DEMO METHODS ====================

    demoPowerAnimations() {
        this.spawnApp('⚡ Power Demo');
    }

    testPowerOn() { this.showPowerOnAnimation().then(() => this.showNotification('✅','Power on')); }
    testPowerOff() { this.showPowerOffAnimation().then(() => this.showNotification('✅','Power off')); }
    testRestart() { this.showRestartAnimation().then(() => this.showNotification('✅','Restart')); }
    testSleepWake() { this.sleep(); setTimeout(() => this.wake(), 3000); }

    // ==================== INITIALIZATION ====================

    async init() {
        await this.showPowerOnAnimation();
        document.getElementById('login-password').focus();
        document.getElementById('login-password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.login();
        });
        console.log('🚀 BhekOS 6.0 ready!');
    }
}

// Create global instance
const os = new BhekOS();

// Start the OS
window.addEventListener('DOMContentLoaded', () => os.init());
