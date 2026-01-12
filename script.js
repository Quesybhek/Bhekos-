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
        
        // Initialize apps
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
            // Ctrl + Alt + Del
            if (e.ctrlKey && e.altKey && e.key === 'Delete') {
                this.showSecurityOptions();
                e.preventDefault();
            }
            
            // Win/Command + D (Show Desktop)
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                this.minimizeAllWindows();
                e.preventDefault();
            }
            
            // Win/Command + L (Lock)
            if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                this.lockScreen();
                e.preventDefault();
            }
            
            // Win/Command + Q (Quit app)
            if ((e.ctrlKey || e.metaKey) && e.key === 'q') {
                if (this.activeWindow) {
                    this.closeWindow(this.activeWindow);
                }
                e.preventDefault();
            }
            
            // Win/Command + Tab (App switcher)
            if ((e.ctrlKey || e.metaKey) && e.key === 'Tab') {
                this.showAppSwitcher();
                e.preventDefault();
            }
            
            // F5 (Refresh)
            if (e.key === 'F5') {
                this.showNotification('🔄', 'Refreshing...');
                setTimeout(() => location.reload(), 1000);
                e.preventDefault();
            }
            
            // Print Screen
            if (e.key === 'PrintScreen') {
                this.takeScreenshot();
                e.preventDefault();
            }
            
            // Alt + F4 (Close window)
            if (e.altKey && e.key === 'F4') {
                if (this.activeWindow) {
                    this.closeWindow(this.activeWindow);
                }
                e.preventDefault();
            }
            
            // Enter in login
            if (e.key === 'Enter' && !document.getElementById('desktop').classList.contains('hidden')) {
                if (document.getElementById('login-password').value) {
                    this.login();
                }
            }
        });

        // Right-click context menu
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showContextMenu(e.clientX, e.clientY);
        });

        // Click to hide context menu
        document.addEventListener('click', () => {
            this.hideContextMenu();
        });

        // Service worker messages
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
                    this.showNotification('🔄', 'Update available! Restart to apply.');
                }
            });
        }

        // Battery status
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                this.updateBatteryStatus(battery);
                battery.addEventListener('levelchange', () => this.updateBatteryStatus(battery));
                battery.addEventListener('chargingchange', () => this.updateBatteryStatus(battery));
            });
        }

        // Online/offline status
        window.addEventListener('online', () => {
            this.showNotification('🌐', 'You are back online!');
            this.settings.wifi = true;
        });

        window.addEventListener('offline', () => {
            this.showNotification('⚠️', 'You are offline!');
            this.settings.wifi = false;
        });

        // Resize handling
        window.addEventListener('resize', () => {
            this.adjustWindowPositions();
        });

        // Brightness slider
        document.getElementById('brightness-slider').addEventListener('input', (e) => {
            this.settings.brightness = e.target.value;
            document.getElementById('brightness-value').textContent = `${e.target.value}%`;
            document.body.style.filter = `brightness(${e.target.value / 100})`;
        });

        // Volume slider
        document.getElementById('volume-slider').addEventListener('input', (e) => {
            this.settings.volume = e.target.value;
            document.getElementById('volume-value').textContent = `${e.target.value}%`;
        });

        // Launchpad search
        document.getElementById('launchpad-search').addEventListener('input', (e) => {
            this.searchApps(e.target.value);
        });

        // Global search
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });

        // Gamepad connection
        window.addEventListener('gamepadconnected', (e) => {
            this.gamepadConnected = true;
            this.showNotification('🎮', `Gamepad ${e.gamepad.id} connected!`);
            document.getElementById('gamepad-status').classList.remove('hidden');
        });

        window.addEventListener('gamepaddisconnected', () => {
            this.gamepadConnected = false;
            this.showNotification('🎮', 'Gamepad disconnected');
            document.getElementById('gamepad-status').classList.add('hidden');
        });

        // Touch gestures
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            
            // Three finger swipe detection
            if (e.touches.length === 3) {
                if (Math.abs(diffX) > 100) {
                    if (diffX > 0) {
                        this.switchToNextDesktop();
                    } else {
                        this.switchToPreviousDesktop();
                    }
                    this.showTouchHint();
                }
            }
        });

        // Install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });

        // Service worker registration
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('serviceworker.js')
                .then(registration => {
                    console.log('✅ Service Worker registered:', registration.scope);
                })
                .catch(error => {
                    console.log('❌ Service Worker registration failed:', error);
                });
        }
    }

    // ==================== LOGIN SYSTEM ====================

    login() {
        const password = document.getElementById('login-password').value;
        if (password === '' || password === 'bhekos') { // Default password
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('desktop').classList.remove('hidden');
            document.getElementById('menu-bar').classList.remove('hidden');
            document.getElementById('dock').classList.remove('hidden');
            this.currentUser = this.users[0];
            this.showNotification('🎉', `Welcome to BhekOS 6.0, ${this.currentUser.name}!`);
            this.startParentalTimer();
            
            // Auto-show voice assistant on first login
            setTimeout(() => {
                document.getElementById('voice-assistant').classList.remove('hidden');
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
            
            // Close all windows
            this.windows.forEach(window => this.closeWindow(window));
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
                <div class="login-avatar">
                    ${this.currentUser.avatar}
                </div>
                <div class="login-name">${this.currentUser.name}</div>
                <div class="login-status">Locked - ${new Date().toLocaleTimeString()}</div>
                <input type="password" class="login-input" placeholder="Enter password to unlock" id="unlock-password" autofocus>
                <button class="btn btn-primary" onclick="os.unlockScreen()">
                    🔓 Unlock
                </button>
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

        const windowId = `window-${Date.now()}`;
        const template = document.getElementById('window-template').content.cloneNode(true);
        const windowEl = template.querySelector('.window');
        windowEl.id = windowId;
        
        // Set window position
        const windowCount = this.windows.length;
        windowEl.style.left = `${100 + (windowCount * 30)}px`;
        windowEl.style.top = `${100 + (windowCount * 30)}px`;
        windowEl.style.width = '600px';
        windowEl.style.height = '400px';
        
        // Set window title and icon
        windowEl.querySelector('.window-title').textContent = app.name;
        windowEl.querySelector('.window-icon').innerHTML = app.icon;
        
        // Set window content based on app
        const content = windowEl.querySelector('.window-content');
        this.setWindowContent(content, app);
        
        // Add to DOM
        document.getElementById('windows-container').appendChild(windowEl);
        
        // Add to windows array
        const windowObj = {
            id: windowId,
            element: windowEl,
            app: app,
            minimized: false,
            maximized: false,
            zIndex: 100 + this.windows.length
        };
        
        this.windows.push(windowObj);
        this.bringToFront(windowObj);
        
        // Add window controls
        this.setupWindowControls(windowEl, windowObj);
        
        // Update dock
        this.updateDockActive(app.id);
        
        this.showNotification(app.icon, `${app.name} opened`);
    }

    setWindowContent(content, app) {
        content.innerHTML = '';
        
        switch(app.id) {
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
            case 'power-demo':
                this.demoPowerAnimations();
                break;
            case 'snake':
                this.createSnakeGame(content);
                break;
            case 'flappy':
                this.createFlappyGame(content);
                break;
            case 'memory':
                this.createMemoryGame(content);
                break;
            case '2048':
                this.create2048Game(content);
                break;
            case 'puzzle':
                this.createPuzzleGame(content);
                break;
            case 'tic-tac-toe':
                this.createTicTacToe(content);
                break;
            default:
                content.innerHTML = `
                    <div style="padding: 40px; text-align: center;">
                        <div style="font-size: 64px; margin-bottom: 20px;">${app.icon}</div>
                        <h2 style="margin-bottom: 16px;">${app.name}</h2>
                        <p style="opacity: 0.8; margin-bottom: 32px;">${app.description}</p>
                        <p style="font-size: 13px; opacity: 0.6;">Coming soon in a future update!</p>
                    </div>
                `;
        }
    }

    setupWindowControls(windowEl, windowObj) {
        const titleBar = windowEl.querySelector('.title-bar');
        const minimizeBtn = windowEl.querySelector('.window-minimize');
        const maximizeBtn = windowEl.querySelector('.window-maximize');
        const closeBtn = windowEl.querySelector('.window-close');
        
        // Make window draggable
        let isDragging = false;
        let offsetX, offsetY;
        
        titleBar.addEventListener('mousedown', (e) => {
            if (windowObj.maximized) return;
            
            isDragging = true;
            offsetX = e.clientX - windowEl.offsetLeft;
            offsetY = e.clientY - windowEl.offsetTop;
            this.bringToFront(windowObj);
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            windowEl.style.left = `${e.clientX - offsetX}px`;
            windowEl.style.top = `${e.clientY - offsetY}px`;
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        // Minimize
        minimizeBtn.addEventListener('click', () => {
            windowEl.classList.add('minimized');
            windowObj.minimized = true;
        });
        
        // Maximize/Restore
        maximizeBtn.addEventListener('click', () => {
            if (windowObj.maximized) {
                windowEl.classList.remove('maximized');
                windowObj.maximized = false;
            } else {
                windowEl.classList.add('maximized');
                windowObj.maximized = true;
            }
        });
        
        // Close
        closeBtn.addEventListener('click', () => {
            this.closeWindow(windowObj);
        });
        
        // Resize
        let isResizing = false;
        let resizeDirection = '';
        
        windowEl.addEventListener('mousedown', (e) => {
            const rect = windowEl.getBoundingClientRect();
            const edgeSize = 10;
            
            if (e.offsetX <= edgeSize && e.offsetY <= edgeSize) {
                resizeDirection = 'nw';
            } else if (e.offsetX >= rect.width - edgeSize && e.offsetY <= edgeSize) {
                resizeDirection = 'ne';
            } else if (e.offsetX <= edgeSize && e.offsetY >= rect.height - edgeSize) {
                resizeDirection = 'sw';
            } else if (e.offsetX >= rect.width - edgeSize && e.offsetY >= rect.height - edgeSize) {
                resizeDirection = 'se';
            } else if (e.offsetX <= edgeSize) {
                resizeDirection = 'w';
            } else if (e.offsetX >= rect.width - edgeSize) {
                resizeDirection = 'e';
            } else if (e.offsetY <= edgeSize) {
                resizeDirection = 'n';
            } else if (e.offsetY >= rect.height - edgeSize) {
                resizeDirection = 's';
            } else {
                return;
            }
            
            isResizing = true;
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isResizing || windowObj.maximized) return;
            
            const rect = windowEl.getBoundingClientRect();
            let newWidth = rect.width;
            let newHeight = rect.height;
            let newLeft = rect.left;
            let newTop = rect.top;
            
            switch(resizeDirection) {
                case 'nw':
                    newWidth = rect.right - e.clientX;
                    newHeight = rect.bottom - e.clientY;
                    newLeft = e.clientX;
                    newTop = e.clientY;
                    break;
                case 'ne':
                    newWidth = e.clientX - rect.left;
                    newHeight = rect.bottom - e.clientY;
                    newTop = e.clientY;
                    break;
                case 'sw':
                    newWidth = rect.right - e.clientX;
                    newHeight = e.clientY - rect.top;
                    newLeft = e.clientX;
                    break;
                case 'se':
                    newWidth = e.clientX - rect.left;
                    newHeight = e.clientY - rect.top;
                    break;
                case 'w':
                    newWidth = rect.right - e.clientX;
                    newLeft = e.clientX;
                    break;
                case 'e':
                    newWidth = e.clientX - rect.left;
                    break;
                case 'n':
                    newHeight = rect.bottom - e.clientY;
                    newTop = e.clientY;
                    break;
                case 's':
                    newHeight = e.clientY - rect.top;
                    break;
            }
            
            // Minimum size
            if (newWidth < 300) newWidth = 300;
            if (newHeight < 200) newHeight = 200;
            
            windowEl.style.width = `${newWidth}px`;
            windowEl.style.height = `${newHeight}px`;
            windowEl.style.left = `${newLeft}px`;
            windowEl.style.top = `${newTop}px`;
        });
        
        document.addEventListener('mouseup', () => {
            isResizing = false;
            resizeDirection = '';
        });
    }

    bringToFront(windowObj) {
        // Update z-index for all windows
        this.windows.forEach(w => {
            w.zIndex = 100;
            w.element.style.zIndex = '100';
        });
        
        windowObj.zIndex = 200;
        windowObj.element.style.zIndex = '200';
        this.activeWindow = windowObj;
    }

    closeWindow(windowObj) {
        windowObj.element.remove();
        this.windows = this.windows.filter(w => w.id !== windowObj.id);
        
        if (this.activeWindow === windowObj) {
            this.activeWindow = this.windows[this.windows.length - 1] || null;
        }
        
        this.showNotification('🗙', `${windowObj.app.name} closed`);
    }

    minimizeAllWindows() {
        this.windows.forEach(window => {
            window.element.classList.add('minimized');
            window.minimized = true;
        });
        this.showNotification('🗕', 'All windows minimized');
    }

    // ==================== DOCK & LAUNCHPAD ====================

    updateDockActive(appId) {
        document.querySelectorAll('.dock-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeApp = this.apps.find(app => app.id === appId);
        if (activeApp) {
            // Find dock item by icon (simplified)
            const dockItems = document.querySelectorAll('.dock-item');
            dockItems.forEach(item => {
                if (item.innerHTML.includes(activeApp.icon)) {
                    item.classList.add('active');
                }
            });
        }
    }

    toggleLaunchpad() {
        const launchpad = document.getElementById('launchpad');
        if (launchpad.classList.contains('hidden')) {
            launchpad.classList.remove('hidden');
            document.getElementById('launchpad-search').focus();
        } else {
            launchpad.classList.add('hidden');
        }
    }

    initLaunchpad() {
        const grid = document.getElementById('launchpad-grid');
        grid.innerHTML = '';
        
        this.apps.forEach(app => {
            const appEl = document.createElement('div');
            appEl.className = 'launchpad-app';
            appEl.innerHTML = `
                <div class="launchpad-app-icon">${app.icon}</div>
                <div class="launchpad-app-name">${app.name.replace(/[^a-zA-Z0-9 ]/g, '')}</div>
            `;
            appEl.addEventListener('click', () => {
                this.spawnApp(app.name);
                this.toggleLaunchpad();
            });
            grid.appendChild(appEl);
        });
    }

    searchApps(query) {
        const apps = document.querySelectorAll('.launchpad-app');
        apps.forEach(app => {
            const name = app.querySelector('.launchpad-app-name').textContent.toLowerCase();
            if (name.includes(query.toLowerCase())) {
                app.style.display = 'flex';
            } else {
                app.style.display = 'none';
            }
        });
    }

    // ==================== CONTROL CENTER ====================

    toggleControlCenter() {
        const cc = document.getElementById('control-center');
        if (cc.classList.contains('hidden')) {
            cc.classList.remove('hidden');
        } else {
            cc.classList.add('hidden');
        }
    }

    toggleWiFi() {
        this.settings.wifi = !this.settings.wifi;
        this.showNotification('📶', `Wi-Fi ${this.settings.wifi ? 'enabled' : 'disabled'}`);
        this.updateControlCenterIcons();
    }

    toggleBluetooth() {
        this.settings.bluetooth = !this.settings.bluetooth;
        this.showNotification('📱', `Bluetooth ${this.settings.bluetooth ? 'enabled' : 'disabled'}`);
        this.updateControlCenterIcons();
    }

    toggleAirplaneMode() {
        this.settings.airplaneMode = !this.settings.airplaneMode;
        this.settings.wifi = !this.settings.airplaneMode;
        this.settings.bluetooth = !this.settings.airplaneMode;
        this.showNotification('✈️', `Airplane mode ${this.settings.airplaneMode ? 'enabled' : 'disabled'}`);
        this.updateControlCenterIcons();
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

    updateControlCenterIcons() {
        // Update Wi-Fi icon
        const wifiIcon = document.querySelector('.control-item:nth-child(1) .control-icon');
        wifiIcon.innerHTML = this.settings.wifi ? '📶' : '📵';
        
        // Update Bluetooth icon
        const btIcon = document.querySelector('.control-item:nth-child(2) .control-icon');
        btIcon.innerHTML = this.settings.bluetooth ? '📱' : '📵';
        
        // Update Airplane mode
        const airplaneItem = document.querySelector('.control-item:nth-child(3)');
        if (this.settings.airplaneMode) {
            airplaneItem.classList.add('active');
        } else {
            airplaneItem.classList.remove('active');
        }
    }

    // ==================== NOTIFICATION SYSTEM ====================

    showNotification(icon, message) {
        if (!this.settings.notifications) return;
        
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">${icon} BhekOS</div>
                <div class="notification-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
            <div class="notification-message">${message}</div>
        `;
        
        container.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slide-in-right 0.3s ease reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ==================== POWER ANIMATION SYSTEM ====================

    // Call this method to set your custom logo image
    setPowerLogo(imageUrl, settings = {}) {
        this.powerAnimationSettings.logoImage = imageUrl;
        Object.assign(this.powerAnimationSettings, settings);
        
        // Update the logo image immediately
        const logoImg = document.getElementById('power-logo-image');
        if (logoImg) {
            logoImg.src = imageUrl;
            logoImg.style.maxWidth = `${this.powerAnimationSettings.logoSize}px`;
            logoImg.style.maxHeight = `${this.powerAnimationSettings.logoSize}px`;
        }
    }

    // Show power animation (for startup)
    showPowerOnAnimation() {
        return new Promise((resolve) => {
            const overlay = document.getElementById('power-animation-overlay');
            const logo = document.getElementById('power-logo-image');
            const text = document.getElementById('power-animation-text');
            const progressBar = document.getElementById('power-animation-progress-bar');
            const statusText = document.getElementById('power-status-text');
            
            // Set the logo image
            logo.src =  this.powerAnimationSettings.logoImage;
            logo.style.maxWidth = `${this.powerAnimationSettings.logoSize}px`;
            logo.style.maxHeight = `${this.powerAnimationSettings.logoSize}px`;
            
            // Reset animation state
            overlay.classList.remove('shutting-down', 'restarting');
            overlay.classList.add('active');
            
            // Start tiny (dot size)
            logo.style.transform = 'translate(-50%, -50%) scale(0)';
            logo.style.opacity = '0';
            text.style.opacity = '0';
            text.style.transform = 'translateY(20px)';
            progressBar.style.width = '0%';
            
            // Play startup sound if enabled
            if (this.powerAnimationSettings.enableSound) {
                this.playSound('startup');
            }
            
            // Animation sequence
            setTimeout(() => {
                // Start scaling up
                logo.style.transform = 'translate(-50%, -50%) scale(0.1)';
                logo.style.opacity = '0.3';
                statusText.textContent = 'Loading core system';
                progressBar.style.width = '20%';
            }, 300);
            
            setTimeout(() => {
                logo.style.transform = 'translate(-50%, -50%) scale(0.3)';
                logo.style.opacity = '0.6';
                statusText.textContent = 'Initializing modules';
                progressBar.style.width = '40%';
            }, 800);
            
            setTimeout(() => {
                logo.style.transform = 'translate(-50%, -50%) scale(0.7)';
                logo.style.opacity = '0.9';
                statusText.textContent = 'Starting services';
                progressBar.style.width = '70%';
                
                // Add pulse effect
                logo.classList.add('power-on-pulse');
            }, 1500);
            
            setTimeout(() => {
                // Final scale and show
                logo.style.transform = 'translate(-50%, -50%) scale(1)';
                logo.style.opacity = '1';
                text.style.opacity = '1';
                text.style.transform = 'translateY(0)';
                statusText.textContent = 'Starting desktop';
                progressBar.style.width = '90%';
                
                // Start floating animation
                logo.style.animation = 'floatLogo 3s ease-in-out infinite';
            }, 2200);
            
            setTimeout(() => {
                progressBar.style.width = '100%';
                statusText.textContent = 'Ready';
                
                // Fade out overlay
                setTimeout(() => {
                    overlay.classList.remove('active');
                    
                    // Stop pulse animation
                    logo.classList.remove('power-on-pulse');
                    
                    // Wait for fade out
                    setTimeout(() => {
                        resolve();
                    }, 500);
                }, 1000);
            }, 2800);
        });
    }

    // Show power off animation
    showPowerOffAnimation() {
        return new Promise((resolve) => {
            const overlay = document.getElementById('power-animation-overlay');
            const logo = document.getElementById('power-logo-image');
            const text = document.getElementById('power-animation-text');
            const progressBar = document.getElementById('power-animation-progress-bar');
            const statusText = document.getElementById('power-status-text');
            
            // Set the logo image
            logo.src = this.powerAnimationSettings.logoImage;
            logo.style.maxWidth = `${this.powerAnimationSettings.logoSize}px`;
            logo.style.maxHeight = `${this.powerAnimationSettings.logoSize}px`;
            
            // Set animation state
            overlay.classList.add('active', 'shutting-down');
            overlay.classList.remove('restarting');
            
            // Start from full size
            logo.style.transform = 'translate(-50%, -50%) scale(1)';
            logo.style.opacity = '1';
            logo.style.animation = 'none';
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
            progressBar.style.width = '100%';
            
            // Play shutdown sound if enabled
            if (this.powerAnimationSettings.enableSound) {
                this.playSound('shutdown');
            }
            
            // Animation sequence
            setTimeout(() => {
                statusText.textContent = 'Saving work';
                progressBar.style.width = '80%';
            }, 300);
            
            setTimeout(() => {
                statusText.textContent = 'Closing applications';
                progressBar.style.width = '60%';
            }, 800);
            
            setTimeout(() => {
                statusText.textContent = 'Stopping services';
                progressBar.style.width = '40%';
                
                // Start shrinking
                logo.style.transform = 'translate(-50%, -50%) scale(0.7)';
                logo.style.opacity = '0.8';
            }, 1300);
            
            setTimeout(() => {
                statusText.textContent = 'Powering down';
                progressBar.style.width = '20%';
                
                // Shrink further
                logo.style.transform = 'translate(-50%, -50%) scale(0.3)';
                logo.style.opacity = '0.4';
                text.style.opacity = '0.5';
                text.style.transform = 'translateY(10px)';
            }, 1800);
            
            setTimeout(() => {
                statusText.textContent = 'Goodbye';
                progressBar.style.width = '0%';
                
                // Shrink to dot and fade out
                logo.style.transform = 'translate(-50%, -50%) scale(0)';
                logo.style.opacity = '0';
                text.style.opacity = '0';
                text.style.transform = 'translateY(20px)';
                
                // Resolve after animation completes
                setTimeout(() => {
                    resolve();
                }, 500);
            }, 2300);
        });
    }

    // Show restart animation
    showRestartAnimation() {
        return new Promise((resolve) => {
            const overlay = document.getElementById('power-animation-overlay');
            const logo = document.getElementById('power-logo-image');
            const text = document.getElementById('power-animation-text');
            const progressBar = document.getElementById('power-animation-progress-bar');
            const statusText = document.getElementById('power-status-text');
            
            // Set the logo image
            logo.src = this.powerAnimationSettings.logoImage;
            logo.style.maxWidth = `${this.powerAnimationSettings.logoSize}px`;
            logo.style.maxHeight = `${this.powerAnimationSettings.logoSize}px`;
            
            // Set animation state
            overlay.classList.add('active', 'restarting');
            overlay.classList.remove('shutting-down');
            
            // Start from full size
            logo.style.transform = 'translate(-50%, -50%) scale(1)';
            logo.style.opacity = '1';
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
            progressBar.style.width = '100%';
            
            // Play restart sound if enabled
            if (this.powerAnimationSettings.enableSound) {
                this.playSound('restart');
            }
            
            // Animation sequence - Shrink phase
            setTimeout(() => {
                statusText.textContent = 'Preparing to restart';
                progressBar.style.width = '80%';
            }, 300);
            
            setTimeout(() => {
                statusText.textContent = 'Closing applications';
                progressBar.style.width = '60%';
            }, 800);
            
            setTimeout(() => {
                statusText.textContent = 'Saving state';
                progressBar.style.width = '40%';
                
                // Shrink
                logo.style.transform = 'translate(-50%, -50%) scale(0.5)';
                logo.style.opacity = '0.6';
            }, 1300);
            
            setTimeout(() => {
                statusText.textContent = 'Restarting';
                progressBar.style.width = '20%';
                
                // Shrink to dot
                logo.style.transform = 'translate(-50%, -50%) scale(0)';
                logo.style.opacity = '0';
                text.style.opacity = '0';
                text.style.transform = 'translateY(20px)';
            }, 2000);
            
            setTimeout(() => {
                // Now expand back (simulating new startup)
                statusText.textContent = 'Booting';
                progressBar.style.width = '10%';
                
                // Start expanding
                logo.style.transform = 'translate(-50%, -50%) scale(0.1)';
                logo.style.opacity = '0.3';
            }, 2500);
            
            setTimeout(() => {
                statusText.textContent = 'Loading system';
                progressBar.style.width = '40%';
                logo.style.transform = 'translate(-50%, -50%) scale(0.4)';
                logo.style.opacity = '0.6';
            }, 2800);
            
            setTimeout(() => {
                statusText.textContent = 'Almost ready';
                progressBar.style.width = '70%';
                logo.style.transform = 'translate(-50%, -50%) scale(0.8)';
                logo.style.opacity = '0.9';
                text.style.opacity = '0.5';
            }, 3200);
            
            setTimeout(() => {
                statusText.textContent = 'Complete';
                progressBar.style.width = '100%';
                logo.style.transform = 'translate(-50%, -50%) scale(1)';
                logo.style.opacity = '1';
                text.style.opacity = '1';
                text.style.transform = 'translateY(0)';
                
                // Fade out
                setTimeout(() => {
                    overlay.classList.remove('active');
                    resolve();
                }, 500);
            }, 3500);
        });
    }

    // Sound effects for animations
    playSound(type) {
        if (!this.powerAnimationSettings.enableSound) return;
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            switch(type) {
                case 'startup':
                    this.playStartupSound(audioContext);
                    break;
                case 'shutdown':
                    this.playShutdownSound(audioContext);
                    break;
                case 'restart':
                    this.playRestartSound(audioContext);
                    break;
            }
        } catch (e) {
            console.log('Audio not supported:', e);
        }
    }

    playStartupSound(audioContext) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.5);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 2);
    }

    playShutdownSound(audioContext) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 1.5);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 2);
    }

    playRestartSound(audioContext) {
        // First tone (shutdown)
        const oscillator1 = audioContext.createOscillator();
        const gainNode1 = audioContext.createGain();
        
        oscillator1.connect(gainNode1);
        gainNode1.connect(audioContext.destination);
        
        oscillator1.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator1.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.8);
        
        gainNode1.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator1.start();
        oscillator1.stop(audioContext.currentTime + 1);
        
        // Second tone (startup) after delay
        setTimeout(() => {
            const oscillator2 = audioContext.createOscillator();
            const gainNode2 = audioContext.createGain();
            
            oscillator2.connect(gainNode2);
            gainNode2.connect(audioContext.destination);
            
            oscillator2.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator2.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.8);
            
            gainNode2.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode2.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
            gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator2.start();
            oscillator2.stop(audioContext.currentTime + 1);
        }, 1200);
    }

    // Particle system for enhanced effects
    createParticles(type, count = 50) {
        if (!this.powerAnimationSettings.enableParticles) return;
        
        const overlay = document.getElementById('power-animation-overlay');
        const logo = document.getElementById('power-logo-image');
        const logoRect = logo.getBoundingClientRect();
        const centerX = logoRect.left + logoRect.width / 2;
        const centerY = logoRect.top + logoRect.height / 2;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: ${type === 'shutdown' ? '#FF4757' : '#00FF9D'};
                border-radius: 50%;
                pointer-events: none;
                z-index: 99998;
                left: ${centerX}px;
                top: ${centerY}px;
            `;
            
            overlay.appendChild(particle);
            
            // Animate particle
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const duration = 0.5 + Math.random() * 1;
            
            particle.animate([
                {
                    transform: `translate(0, 0) scale(1)`,
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => particle.remove();
        }
    }

    // ==================== MODIFIED POWER MANAGEMENT ====================

    showPowerMenu() {
        document.getElementById('power-menu').classList.remove('hidden');
    }

    hidePowerMenu() {
        document.getElementById('power-menu').classList.add('hidden');
    }

    async sleep() {
        this.isSleeping = true;
        
        // Show sleep animation
        const overlay = document.getElementById('power-animation-overlay');
        const logo = document.getElementById('power-logo-image');
        const text = document.getElementById('power-animation-text');
        const statusText = document.getElementById('power-status-text');
        
        overlay.classList.add('active');
        logo.style.transform = 'translate(-50%, -50%) scale(0.5)';
        logo.style.opacity = '0.5';
        text.style.opacity = '0.5';
        statusText.textContent = 'Entering sleep mode';
        
        setTimeout(() => {
            overlay.classList.remove('active');
            document.body.style.filter = 'brightness(0.1)';
            this.showNotification('🌙', 'Entering sleep mode...');
            this.hidePowerMenu();
        }, 1500);
        
        // Wake on click
        document.addEventListener('click', () => this.wake(), { once: true });
        document.addEventListener('keydown', () => this.wake(), { once: true });
    }

    async wake() {
        if (this.isSleeping) {
            this.isSleeping = false;
            
            // Show wake animation
            const overlay = document.getElementById('power-animation-overlay');
            const logo = document.getElementById('power-logo-image');
            const text = document.getElementById('power-animation-text');
            const statusText = document.getElementById('power-status-text');
            
            overlay.classList.add('active');
            logo.style.transform = 'translate(-50%, -50%) scale(0.3)';
            logo.style.opacity = '0.3';
            text.style.opacity = '0.3';
            statusText.textContent = 'Waking up';
            
            setTimeout(() => {
                logo.style.transform = 'translate(-50%, -50%) scale(1)';
                logo.style.opacity = '1';
                text.style.opacity = '1';
                statusText.textContent = 'Ready';
                
                setTimeout(() => {
                    overlay.classList.remove('active');
                    document.body.style.filter = '';
                    this.showNotification('☀️', 'Waking up...');
                }, 1000);
            }, 500);
        }
    }

    async restart() {
        // Show restart animation
        await this.showRestartAnimation();
        
        this.showNotification('🔄', 'Restarting system...');
        
        // Reload after animation completes
        setTimeout(() => {
            location.reload();
        }, 500);
    }

    async shutdown() {
        // Show shutdown animation
        await this.showPowerOffAnimation();
        
        this.showNotification('⏻', 'Shutting down...');
        
        // Show final shutdown screen
        setTimeout(() => {
            document.body.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: black;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-family: 'Segoe UI', system-ui, sans-serif;
                    font-size: 24px;
                ">
                    <div style="margin-bottom: 30px; font-size: 72px;">⏻</div>
                    <div style="margin-bottom: 20px;">System shutdown complete</div>
                    <div style="font-size: 16px; opacity: 0.7; margin-bottom: 50px;">You can now close this tab</div>
                    <div style="
                        position: absolute;
                        bottom: 30px;
                        left: 0;
                        right: 0;
                        text-align: center;
                        font-size: 12px;
                        opacity: 0.5;
                    ">
                        BhekOS 6.0 - Hybrid Windows 11 + macOS Sonoma UI
                    </div>
                </div>
            `;
        }, 500);
    }

    // ==================== UTILITIES ====================

    updateClock() {
        const update = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            const dateString = now.toLocaleDateString([], {weekday: 'short', month: 'short', day: 'numeric'});
            
            document.getElementById('system-clock').textContent = `🕛 ${timeString}`;
            document.getElementById('menu-center-text').textContent = `🚀 BhekOS 6.0 • ${dateString}`;
        };
        
        update();
        setInterval(update, 60000); // Update every minute
    }

    showContextMenu(x, y) {
        const menu = document.getElementById('context-menu');
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
                const divider = document.createElement('div');
                divider.style.height = '1px';
                divider.style.background = 'rgba(255, 255, 255, 0.1)';
                divider.style.margin = '4px 0';
                menu.appendChild(divider);
            } else {
                const itemEl = document.createElement('div');
                itemEl.className = 'sidebar-item';
                itemEl.innerHTML = `<span style="margin-right: 8px;">${item.icon}</span> ${item.text}`;
                itemEl.addEventListener('click', () => {
                    item.action();
                    this.hideContextMenu();
                });
                menu.appendChild(itemEl);
            }
        });
    }

    hideContextMenu() {
        document.getElementById('context-menu').classList.add('hidden');
    }

    // ==================== APPS IMPLEMENTATION ====================

    createFileExplorer(content) {
        content.innerHTML = `
            <div class="file-explorer-toolbar">
                <button class="btn btn-secondary">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <button class="btn btn-secondary">
                    <i class="fas fa-arrow-right"></i>
                </button>
                <button class="btn btn-secondary">
                    <i class="fas fa-arrow-up"></i>
                </button>
                <div style="flex: 1;"></div>
                <button class="btn btn-secondary">
                    <i class="fas fa-search"></i>
                </button>
                <button class="btn btn-primary" onclick="os.createNewFolder()">
                    <i class="fas fa-folder-plus"></i> New Folder
                </button>
            </div>
            <div class="file-grid">
                <div class="file-item" onclick="os.showNotification('📁', 'Documents folder opened')">
                    <div class="file-icon">📁</div>
                    <div class="file-name">Documents</div>
                </div>
                <div class="file-item" onclick="os.showNotification('📁', 'Downloads folder opened')">
                    <div class="file-icon">📁</div>
                    <div class="file-name">Downloads</div>
                </div>
                <div class="file-item" onclick="os.showNotification('📁', 'Pictures folder opened')">
                    <div class="file-icon">📁</div>
                    <div class="file-name">Pictures</div>
                </div>
                <div class="file-item" onclick="os.showNotification('📁', 'Music folder opened')">
                    <div class="file-icon">📁</div>
                    <div class="file-name">Music</div>
                </div>
                <div class="file-item" onclick="os.showNotification('📁', 'Videos folder opened')">
                    <div class="file-icon">📁</div>
                    <div class="file-name">Videos</div>
                </div>
                <div class="file-item" onclick="os.showNotification('💾', 'System folder opened')">
                    <div class="file-icon">💾</div>
                    <div class="file-name">System</div>
                </div>
            </div>
        `;
    }

    createTerminal(content) {
        content.innerHTML = `
            <div class="terminal">
                <div class="terminal-header">
                    <span class="terminal-prompt">bhekos@desktop:~$</span> Welcome to BhekOS Terminal
                </div>
                <div>
                    <span class="terminal-prompt">bhekos@desktop:~$</span> <span id="terminal-output"></span><span class="terminal-cursor"></span>
                </div>
            </div>
        `;
        
        const commands = [
            'help - Show available commands',
            'date - Show current date and time',
            'system - Show system information',
            'clear - Clear terminal',
            'neofetch - Show system specs'
        ];
        
        let index = 0;
        const output = document.getElementById('terminal-output');
        
        const typeWriter = () => {
            if (index < commands.length) {
                output.textContent = commands[index];
                index++;
                setTimeout(typeWriter, 2000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    createSettings(content) {
        content.innerHTML = `
            <div class="settings-container">
                <div class="sidebar">
                    <div class="sidebar-section">
                        <div class="sidebar-title">System</div>
                        <div class="sidebar-item active">
                            <div class="sidebar-icon">⚙️</div>
                            <span>General</span>
                        </div>
                        <div class="sidebar-item">
                            <div class="sidebar-icon">🖥️</div>
                            <span>Display</span>
                        </div>
                        <div class="sidebar-item">
                            <div class="sidebar-icon">🔊</div>
                            <span>Sound</span>
                        </div>
                    </div>
                    <div class="sidebar-section">
                        <div class="sidebar-title">Network</div>
                        <div class="sidebar-item">
                            <div class="sidebar-icon">📶</div>
                            <span>Wi-Fi</span>
                        </div>
                        <div class="sidebar-item">
                            <div class="sidebar-icon">📱</div>
                            <span>Bluetooth</span>
                        </div>
                    </div>
                    <div class="sidebar-section">
                        <div class="sidebar-title">Privacy</div>
                        <div class="sidebar-item">
                            <div class="sidebar-icon">🔒</div>
                            <span>Security</span>
                        </div>
                        <div class="sidebar-item">
                            <div class="sidebar-icon">👁️</div>
                            <span>Accessibility</span>
                        </div>
                    </div>
                </div>
                <div class="settings-content">
                    <div class="settings-section">
                        <h2 class="settings-title">⚙️ System Settings</h2>
                        <div class="settings-grid">
                            <div class="settings-card">
                                <div class="settings-card-title">🖥️ Display</div>
                                <div class="settings-card-desc">Adjust screen brightness, resolution, and night light</div>
                                <button class="btn btn-secondary" onclick="os.openDisplaySettings()">Configure</button>
                            </div>
                            <div class="settings-card">
                                <div class="settings-card-title">🔊 Sound</div>
                                <div class="settings-card-desc">Volume, output device, and sound effects</div>
                                <button class="btn btn-secondary" onclick="os.openSoundSettings()">Configure</button>
                            </div>
                            <div class="settings-card">
                                <div class="settings-card-title">⌨️ Keyboard</div>
                                <div class="settings-card-desc">Language, shortcuts, and typing settings</div>
                                <button class="btn btn-secondary" onclick="os.openKeyboardSettings()">Configure</button>
                            </div>
                            <div class="settings-card">
                                <div class="settings-card-title">🖱️ Mouse</div>
                                <div class="settings-card-desc">Pointer speed, scroll direction, and gestures</div>
                                <button class="btn btn-secondary">Configure</button>
                            </div>
                            <div class="settings-card">
                                <div class="settings-card-title">🔋 Power & Battery</div>
                                <div class="settings-card-desc">Power saving, sleep settings, and battery usage</div>
                                <button class="btn btn-secondary">Configure</button>
                            </div>
                            <div class="settings-card">
                                <div class="settings-card-title">🗄️ Storage</div>
                                <div class="settings-card-desc">Disk usage, cleanup, and storage sense</div>
                                <button class="btn btn-secondary" onclick="os.showDiskCleanup()">Configure</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createBrowser(content) {
        content.innerHTML = `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div class="browser-toolbar">
                    <button class="btn btn-secondary">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-redo"></i>
                    </button>
                    <input type="text" class="browser-url-bar" value="https://bhekos.com" readonly>
                    <button class="btn btn-primary">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                <div class="browser-content">
                    <div style="padding: 40px; text-align: center;">
                        <div style="font-size: 64px; margin-bottom: 20px;">🌐</div>
                        <h2 style="margin-bottom: 16px;">BhekOS Browser</h2>
                        <p style="opacity: 0.8; margin-bottom: 32px;">Fast, secure, and private browsing</p>
                        <div style="display: flex; gap: 20px; justify-content: center;">
                            <button class="btn btn-primary" onclick="os.showNotification('🌐', 'Opening BhekOS homepage')">
                                Visit BhekOS.com
                            </button>
                            <button class="btn btn-secondary" onclick="os.showNotification('🆕', 'Opening new tab')">
                                New Tab
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createCalculator(content) {
        content.innerHTML = `
            <div class="calculator">
                <div class="calculator-display" id="calc-display">0</div>
                <div class="calculator-buttons">
                    <button class="calc-btn" onclick="os.calcInput('C')">C</button>
                    <button class="calc-btn" onclick="os.calcInput('±')">±</button>
                    <button class="calc-btn" onclick="os.calcInput('%')">%</button>
                    <button class="calc-btn operator" onclick="os.calcInput('/')">÷</button>
                    
                    <button class="calc-btn" onclick="os.calcInput('7')">7</button>
                    <button class="calc-btn" onclick="os.calcInput('8')">8</button>
                    <button class="calc-btn" onclick="os.calcInput('9')">9</button>
                    <button class="calc-btn operator" onclick="os.calcInput('*')">×</button>
                    
                    <button class="calc-btn" onclick="os.calcInput('4')">4</button>
                    <button class="calc-btn" onclick="os.calcInput('5')">5</button>
                    <button class="calc-btn" onclick="os.calcInput('6')">6</button>
                    <button class="calc-btn operator" onclick="os.calcInput('-')">−</button>
                    
                    <button class="calc-btn" onclick="os.calcInput('1')">1</button>
                    <button class="calc-btn" onclick="os.calcInput('2')">2</button>
                    <button class="calc-btn" onclick="os.calcInput('3')">3</button>
                    <button class="calc-btn operator" onclick="os.calcInput('+')">+</button>
                    
                    <button class="calc-btn" onclick="os.calcInput('0')">0</button>
                    <button class="calc-btn" onclick="os.calcInput('.')">.</button>
                    <button class="calc-btn equals" onclick="os.calcInput('=')">=</button>
                </div>
            </div>
        `;
        
        this.calcValue = '0';
        this.calcWaiting = false;
        this.calcOperator = '';
    }

    calcInput(key) {
        const display = document.getElementById('calc-display');
        
        if ('0123456789.'.includes(key)) {
            if (this.calcWaiting) {
                display.textContent = key;
                this.calcWaiting = false;
            } else {
                display.textContent = display.textContent === '0' ? key : display.textContent + key;
            }
            this.calcValue = display.textContent;
        } else if ('+-*/'.includes(key)) {
            this.calcWaiting = true;
            this.calcOperator = key;
            this.calcPrevious = this.calcValue;
        } else if (key === '=') {
            if (this.calcOperator && this.calcPrevious !== undefined) {
                const prev = parseFloat(this.calcPrevious);
                const current = parseFloat(this.calcValue);
                let result = 0;
                
                switch(this.calcOperator) {
                    case '+': result = prev + current; break;
                    case '-': result = prev - current; break;
                    case '*': result = prev * current; break;
                    case '/': result = prev / current; break;
                }
                
                display.textContent = result.toString();
                this.calcValue = result.toString();
                this.calcWaiting = true;
            }
        } else if (key === 'C') {
            display.textContent = '0';
            this.calcValue = '0';
            this.calcWaiting = false;
            this.calcOperator = '';
        }
    }

    createNotepad(content) {
        content.innerHTML = `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div class="notepad-toolbar">
                    <button class="btn btn-secondary" onclick="os.showNotification('📄', 'New document')">
                        <i class="fas fa-file"></i>
                    </button>
                    <button class="btn btn-secondary" onclick="os.showNotification('💾', 'Document saved')">
                        <i class="fas fa-save"></i>
                    </button>
                    <button class="btn btn-secondary" onclick="os.showNotification('🖨️', 'Print document')">
                        <i class="fas fa-print"></i>
                    </button>
                    <div style="flex: 1;"></div>
                    <button class="btn btn-primary" onclick="os.showNotification('📋', 'Text copied to clipboard')">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
                <textarea class="notepad-textarea" placeholder="Start typing here..." id="notepad-text">
Welcome to BhekOS Notepad!

You can use this text editor to:
• Take notes
• Write documents
• Edit code
• Save important information

Features:
✓ Auto-save
✓ Copy/Paste
✓ Print support
✓ Dark/Light mode

Try typing something...
                </textarea>
            </div>
        `;
    }

    createPaint(content) {
        content.innerHTML = `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div class="paint-toolbar">
                    <div class="paint-tools">
                        <button class="paint-tool active" title="Brush">
                            <i class="fas fa-paint-brush"></i>
                        </button>
                        <button class="paint-tool" title="Eraser">
                            <i class="fas fa-eraser"></i>
                        </button>
                        <button class="paint-tool" title="Line">
                            <i class="fas fa-slash"></i>
                        </button>
                        <button class="paint-tool" title="Rectangle">
                            <i class="fas fa-square"></i>
                        </button>
                        <button class="paint-tool" title="Circle">
                            <i class="fas fa-circle"></i>
                        </button>
                        <input type="color" class="paint-color" value="#FF4757" title="Color picker">
                        <input type="range" class="paint-slider" min="1" max="50" value="5" title="Brush size">
                    </div>
                    <div class="paint-actions">
                        <button class="btn btn-secondary" onclick="os.showNotification('🗑️', 'Canvas cleared')">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="btn btn-primary" onclick="os.showNotification('💾', 'Drawing saved')">
                            <i class="fas fa-save"></i> Save
                        </button>
                    </div>
                </div>
                <canvas class="paint-canvas" id="paint-canvas" width="800" height="500"></canvas>
            </div>
        `;
        
        // Initialize paint canvas
        const canvas = document.getElementById('paint-canvas');
        const ctx = canvas.getContext('2d');
        
        // Set white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        
        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.strokeStyle = '#FF4757';
            ctx.lineWidth = 5;
            ctx.stroke();
            
            [lastX, lastY] = [e.offsetX, e.offsetY];
        });
        
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseout', () => isDrawing = false);
    }

    // ==================== GAMES ====================

    createSnakeGame(content) {
        content.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h2>🐍 Snake Game</h2>
                <div style="margin: 20px 0;">
                    <div style="display: inline-block; background: rgba(0,0,0,0.3); padding: 10px 20px; border-radius: 10px;">
                        <span style="color: #00FF9D;">Score: </span>
                        <span id="snake-score" style="font-weight: bold;">0</span>
                    </div>
                </div>
                <canvas id="snake-canvas" width="600" height="400" style="background: rgba(0,0,0,0.2); border-radius: 10px;"></canvas>
                <div style="margin-top: 20px;">
                    <button class="btn btn-primary" onclick="os.startSnakeGame()">
                        <i class="fas fa-play"></i> Start Game
                    </button>
                    <button class="btn btn-secondary" onclick="os.showNotification('🔄', 'Game reset')">
                        <i class="fas fa-redo"></i> Reset
                    </button>
                </div>
                <div style="margin-top: 15px; font-size: 14px; opacity: 0.8;">
                    Use arrow keys to control the snake
                </div>
            </div>
        `;
        
        // Snake game implementation
        const canvas = document.getElementById('snake-canvas');
        const ctx = canvas.getContext('2d');
        
        let snake = [{x: 200, y: 200}];
        let food = {x: 300, y: 300};
        let dx = 20;
        let dy = 0;
        let score = 0;
        let gameRunning = false;
        
        function draw() {
            // Clear canvas
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw snake
            ctx.fillStyle = '#00FF9D';
            snake.forEach(segment => {
                ctx.fillRect(segment.x, segment.y, 20, 20);
            });
            
            // Draw food
            ctx.fillStyle = '#FF4757';
            ctx.fillRect(food.x, food.y, 20, 20);
        }
        
        function update() {
            if (!gameRunning) return;
            
            // Move snake
            const head = {x: snake[0].x + dx, y: snake[0].y + dy};
            snake.unshift(head);
            
            // Check food collision
            if (head.x === food.x && head.y === food.y) {
                score += 10;
                document.getElementById('snake-score').textContent = score;
                food = {
                    x: Math.floor(Math.random() * 30) * 20,
                    y: Math.floor(Math.random() * 20) * 20
                };
            } else {
                snake.pop();
            }
            
            // Check wall collision
            if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
                gameRunning = false;
                this.showNotification('💀', `Game Over! Score: ${score}`);
                return;
            }
            
            // Check self collision
            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    gameRunning = false;
                    this.showNotification('💀', `Game Over! Score: ${score}`);
                    return;
                }
            }
            
            draw();
        }
        
        // Export start function
        window.os.startSnakeGame = () => {
            gameRunning = true;
            snake = [{x: 200, y: 200}];
            score = 0;
            dx = 20;
            dy = 0;
            document.getElementById('snake-score').textContent = '0';
            draw();
        };
        
        // Controls
        document.addEventListener('keydown', (e) => {
            if (!gameRunning) return;
            
            switch(e.key) {
                case 'ArrowUp': if (dy !== 20) { dx = 0; dy = -20; } break;
                case 'ArrowDown': if (dy !== -20) { dx = 0; dy = 20; } break;
                case 'ArrowLeft': if (dx !== 20) { dx = -20; dy = 0; } break;
                case 'ArrowRight': if (dx !== -20) { dx = 20; dy = 0; } break;
            }
        });
        
        // Initial draw
        draw();
        setInterval(() => update(), 150);
    }

    createMemoryGame(content) {
        content.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h2>🧠 Memory Match</h2>
                <div style="margin: 20px 0;">
                    <div style="display: inline-block; background: rgba(0,0,0,0.3); padding: 10px 20px; border-radius: 10px; margin: 0 10px;">
                        <span style="color: #4D9EFF;">Moves: </span>
                        <span id="memory-moves" style="font-weight: bold;">0</span>
                    </div>
                    <div style="display: inline-block; background: rgba(0,0,0,0.3); padding: 10px 20px; border-radius: 10px; margin: 0 10px;">
                        <span style="color: #FFA502;">Pairs: </span>
                        <span id="memory-pairs" style="font-weight: bold;">0/8</span>
                    </div>
                </div>
                <div id="memory-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 500px; margin: 0 auto;"></div>
                <div style="margin-top: 20px;">
                    <button class="btn btn-primary" onclick="os.startMemoryGame()">
                        <i class="fas fa-play"></i> New Game
                    </button>
                </div>
            </div>
        `;
        
        // Initialize memory game
        const grid = document.getElementById('memory-grid');
        const cards = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
        const pairs = [...cards, ...cards];
        let flippedCards = [];
        let matchedPairs = 0;
        let moves = 0;
        
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        
        window.os.startMemoryGame = () => {
            grid.innerHTML = '';
            flippedCards = [];
            matchedPairs = 0;
            moves = 0;
            document.getElementById('memory-moves').textContent = '0';
            document.getElementById('memory-pairs').textContent = '0/8';
            
            const shuffled = shuffle([...pairs]);
            
            shuffled.forEach((emoji, index) => {
                const card = document.createElement('div');
                card.className = 'memory-card';
                card.dataset.emoji = emoji;
                card.dataset.index = index;
                card.innerHTML = `
                    <div class="memory-card-front">❓</div>
                    <div class="memory-card-back">${emoji}</div>
                `;
                
                card.addEventListener('click', () => {
                    if (flippedCards.length >= 2 || card.classList.contains('flipped')) return;
                    
                    card.classList.add('flipped');
                    flippedCards.push(card);
                    
                    if (flippedCards.length === 2) {
                        moves++;
                        document.getElementById('memory-moves').textContent = moves;
                        
                        const [card1, card2] = flippedCards;
                        if (card1.dataset.emoji === card2.dataset.emoji) {
                            matchedPairs++;
                            document.getElementById('memory-pairs').textContent = `${matchedPairs}/8`;
                            flippedCards = [];
                            
                            if (matchedPairs === 8) {
                                this.showNotification('🎉', `Memory Game Complete! Moves: ${moves}`);
                            }
                        } else {
                            setTimeout(() => {
                                card1.classList.remove('flipped');
                                card2.classList.remove('flipped');
                                flippedCards = [];
                            }, 1000);
                        }
                    }
                });
                
                grid.appendChild(card);
            });
        };
        
        // Start initial game
        setTimeout(() => window.os.startMemoryGame(), 100);
    }

    create2048Game(content) {
        content.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h2>🧩 2048 Puzzle</h2>
                <div style="margin: 20px 0;">
                    <div style="display: inline-block; background: rgba(0,0,0,0.3); padding: 10px 20px; border-radius: 10px; margin: 0 10px;">
                        <span style="color: #FFA502;">Score: </span>
                        <span id="game2048-score" style="font-weight: bold;">0</span>
                    </div>
                    <div style="display: inline-block; background: rgba(0,0,0,0.3); padding: 10px 20px; border-radius: 10px; margin: 0 10px;">
                        <span style="color: #8A2BE2;">Best: </span>
                        <span id="game2048-best" style="font-weight: bold;">0</span>
                    </div>
                </div>
                <div id="game2048-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 400px; margin: 0 auto; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 10px;"></div>
                <div style="margin-top: 20px;">
                    <button class="btn btn-primary" onclick="os.start2048Game()">
                        <i class="fas fa-play"></i> New Game
                    </button>
                    <button class="btn btn-secondary" onclick="os.showNotification('ℹ️', 'Use arrow keys to move tiles')">
                        <i class="fas fa-info-circle"></i> How to Play
                    </button>
                </div>
                <div style="margin-top: 15px; font-size: 14px; opacity: 0.8;">
                    Use arrow keys to combine tiles and reach 2048!
                </div>
            </div>
        `;
        
        // 2048 game implementation
        const grid = document.getElementById('game2048-grid');
        
        window.os.start2048Game = () => {
            grid.innerHTML = '';
            for (let i = 0; i < 16; i++) {
                const cell = document.createElement('div');
                cell.className = 'game2048-cell';
                cell.style.cssText = `
                    width: 80px;
                    height: 80px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    font-weight: bold;
                `;
                cell.textContent = Math.random() > 0.7 ? '2' : '';
                grid.appendChild(cell);
            }
            
            document.getElementById('game2048-score').textContent = '0';
        };
        
        // Start initial game
        setTimeout(() => window.os.start2048Game(), 100);
    }

    // ==================== PERFORMANCE MONITORING ====================

    startPerformanceMonitoring() {
        setInterval(() => {
            // Simulate performance metrics
            this.performance.cpu = 30 + Math.random() * 40;
            this.performance.ram = 40 + Math.random() * 40;
            this.performance.gpu = 20 + Math.random() * 30;
            this.performance.disk = 10 + Math.random() * 30;
            
            // Update performance monitor if open
            if (!document.getElementById('performance-monitor').classList.contains('hidden')) {
                document.getElementById('cpu-usage').textContent = `${Math.round(this.performance.cpu)}%`;
                document.getElementById('ram-usage').textContent = `${Math.round(this.performance.ram)}%`;
                document.getElementById('gpu-usage').textContent = `${Math.round(this.performance.gpu)}%`;
                document.getElementById('disk-usage').textContent = `${Math.round(this.performance.disk)}%`;
                
                // Update graph
                this.updatePerformanceGraph();
            }
        }, 2000);
    }

    updatePerformanceGraph() {
        const graph = document.getElementById('performance-graph');
        graph.innerHTML = '';
        
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.className = 'performance-bar';
            bar.style.left = `${i * 15}px`;
            bar.style.height = `${20 + Math.random() * 80}px`;
            graph.appendChild(bar);
        }
    }

    // ==================== SENSORS ====================

    initSensors() {
        if ('DeviceOrientationEvent' in window) {
            window.addEventListener('deviceorientation', (e) => {
                document.getElementById('accel-x').textContent = e.beta ? e.beta.toFixed(2) : '0.00';
                document.getElementById('accel-y').textContent = e.gamma ? e.gamma.toFixed(2) : '0.00';
                document.getElementById('accel-z').textContent = e.alpha ? e.alpha.toFixed(2) : '0.00';
            });
        }
        
        if ('DeviceMotionEvent' in window) {
            window.addEventListener('devicemotion', (e) => {
                document.getElementById('gyro-x').textContent = e.rotationRate?.beta?.toFixed(2) || '0.00';
                document.getElementById('gyro-y').textContent = e.rotationRate?.gamma?.toFixed(2) || '0.00';
                document.getElementById('gyro-z').textContent = e.rotationRate?.alpha?.toFixed(2) || '0.00';
            });
        }
    }

    // ==================== VOICE ASSISTANT ====================

    initVoiceAssistant() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            
            this.recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                this.processVoiceCommand(command);
            };
            
            this.recognition.onend = () => {
                if (this.voiceListening) {
                    this.recognition.start();
                }
            };
        }
    }

    toggleVoiceAssistant() {
        const popup = document.getElementById('voice-assistant-popup');
        const assistant = document.getElementById('voice-assistant');
        
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
            document.getElementById('voice-assistant').classList.add('voice-assistant-listening');
        } else {
            document.getElementById('voice-command-text').textContent = 'Voice recognition not supported in this browser';
        }
    }

    stopVoiceAssistant() {
        this.stopVoiceListening();
        document.getElementById('voice-assistant-popup').classList.add('hidden');
    }

    stopVoiceListening() {
        if (this.recognition) {
            this.voiceListening = false;
            this.recognition.stop();
            document.getElementById('voice-command-text').textContent = 'Say "Hey Bhek" to start...';
            document.getElementById('voice-assistant').classList.remove('voice-assistant-listening');
        }
    }

    processVoiceCommand(command) {
        document.getElementById('voice-command-text').textContent = `Heard: "${command}"`;
        
        if (command.includes('open') || command.includes('launch')) {
            if (command.includes('explorer') || command.includes('file')) {
                this.spawnApp('📁 File Explorer');
            } else if (command.includes('browser') || command.includes('web')) {
                this.spawnApp('🌐 Browser');
            } else if (command.includes('settings')) {
                this.spawnApp('⚙️ Settings');
            } else if (command.includes('calculator')) {
                this.spawnApp('🧮 Calculator');
            }
        } else if (command.includes('time')) {
            const time = new Date().toLocaleTimeString();
            this.showNotification('🕐', `Current time is ${time}`);
        } else if (command.includes('date')) {
            const date = new Date().toLocaleDateString();
            this.showNotification('📅', `Today is ${date}`);
        } else if (command.includes('weather')) {
            this.showNotification('☀️', 'Weather: Sunny, 72°F');
        } else if (command.includes('take screenshot')) {
            this.takeScreenshot();
        } else if (command.includes('lock')) {
            this.lockScreen();
        } else {
            this.showNotification('🤖', `Command: "${command}"`);
        }
    }

    // ==================== SCREENSHOT TOOL ====================

    takeScreenshot() {
        const overlay = document.getElementById('screenshot-overlay');
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
            
            const width = Math.abs(e.clientX - startX);
            const height = Math.abs(e.clientY - startY);
            const left = Math.min(e.clientX, startX);
            const top = Math.min(e.clientY, startY);
            
            selection.style.width = `${width}px`;
            selection.style.height = `${height}px`;
            selection.style.left = `${left}px`;
            selection.style.top = `${top}px`;
        };
        
        overlay.onmouseup = () => {
            if (selection) {
                setTimeout(() => {
                    overlay.classList.add('hidden');
                    overlay.innerHTML = '';
                    this.showNotification('📸', 'Screenshot captured to clipboard!');
                }, 500);
            }
        };
        
        // Escape to cancel
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
            setTimeout(() => {
                this.showInstallPrompt();
            }, 5000);
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
            this.deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    this.showNotification('✅', 'BhekOS installed successfully!');
                }
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
                
                const hours = Math.floor(this.parentalTimeRemaining / 3600);
                const minutes = Math.floor((this.parentalTimeRemaining % 3600) / 60);
                const seconds = this.parentalTimeRemaining % 60;
                
                document.getElementById('time-remaining').textContent = 
                    `⏰ ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                if (this.parentalTimeRemaining <= 300) { // 5 minutes warning
                    this.showNotification('⚠️', `Only ${minutes} minutes of computer time remaining!`);
                }
                
                if (this.parentalTimeRemaining === 0) {
                    this.lockScreen();
                    this.showNotification('⏰', 'Computer time limit reached!');
                }
            }
        }, 1000);
    }

    addTime(minutes) {
        this.parentalTimeRemaining += minutes * 60;
        this.showNotification('➕', `Added ${minutes} minutes of computer time`);
    }

    pauseTime() {
        this.parentalTimePaused = !this.parentalTimePaused;
        this.showNotification('⏸️', `Time ${this.parentalTimePaused ? 'paused' : 'resumed'}`);
    }

    // ==================== SECURITY ====================

    runSecurityScan() {
        this.showNotification('🔍', 'Running security scan...');
        setTimeout(() => {
            this.showNotification('✅', 'Security scan complete! No threats found.');
        }, 3000);
    }

    // ==================== FILE OPERATIONS ====================

    createNewFolder() {
        this.showNotification('📁', 'New folder created on desktop');
        // Implementation for creating actual folder would go here
    }

    createNewFile() {
        this.showNotification('📄', 'New file created on desktop');
        // Implementation for creating actual file would go here
    }

    // ==================== SYSTEM UTILITIES ====================

    showDiskCleanup() {
        document.getElementById('disk-cleanup').classList.remove('hidden');
    }

    closeDiskCleanup() {
        document.getElementById('disk-cleanup').classList.add('hidden');
    }

    cleanupDisk() {
        this.showNotification('🧹', 'Cleaning up disk space...');
        setTimeout(() => {
            this.diskUsed = 40;
            document.getElementById('storage-used').textContent = '40%';
            document.getElementById('disk-used-bar').style.width = '40%';
            this.showNotification('✅', 'Freed up 2.5 GB of disk space!');
        }, 2000);
    }

    showPerformanceMonitor() {
        document.getElementById('performance-monitor').classList.remove('hidden');
        this.updatePerformanceGraph();
    }

    closePerformanceMonitor() {
        document.getElementById('performance-monitor').classList.add('hidden');
    }

    toggleDevTools() {
        const devtools = document.getElementById('devtools');
        if (devtools.classList.contains('hidden')) {
            devtools.classList.remove('hidden');
            this.devtoolsActive = true;
        } else {
            devtools.classList.add('hidden');
            this.devtoolsActive = false;
        }
    }

    switchDevToolsTab(tab) {
        this.devtoolsTab = tab;
        document.querySelectorAll('.devtools-tab').forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
        
        const content = document.getElementById('devtools-content');
        switch(tab) {
            case 'console':
                content.innerHTML = `<div style="color: #00FF9D;">> BhekOS Console [Version 6.0.0.1]</div>`;
                break;
            case 'elements':
                content.innerHTML = `<div style="color: #4D9EFF;">&lt;html&gt;<br>&nbsp;&nbsp;&lt;head&gt;...&lt;/head&gt;<br>&nbsp;&nbsp;&lt;body&gt;...&lt;/body&gt;<br>&lt;/html&gt;</div>`;
                break;
            case 'network':
                content.innerHTML = `<div style="color: #FFA502;">GET /api/system-status 200 OK<br>GET /api/performance 200 OK<br>POST /api/log 201 Created</div>`;
                break;
            case 'performance':
                content.innerHTML = `<div style="color: #8A2BE2;">CPU Usage: ${this.performance.cpu.toFixed(1)}%<br>Memory Usage: ${this.performance.ram.toFixed(1)}%<br>GPU Usage: ${this.performance.gpu.toFixed(1)}%</div>`;
                break;
        }
    }

    // ==================== NETWORK UTILITIES ====================

    showCloudSync() {
        document.getElementById('cloud-sync').classList.remove('hidden');
    }

    closeCloudSync() {
        document.getElementById('cloud-sync').classList.add('hidden');
    }

    showRemoteDesktop() {
        document.getElementById('remote-desktop').classList.remove('hidden');
    }

    closeRemoteDesktop() {
        document.getElementById('remote-desktop').classList.add('hidden');
    }

    disconnectRemote() {
        this.showNotification('🔌', 'Disconnected from remote desktop');
        this.closeRemoteDesktop();
    }

    // ==================== FILE SHARING ====================

    showFileSharing() {
        document.getElementById('file-sharing').classList.remove('hidden');
    }

    closeFileSharing() {
        document.getElementById('file-sharing').classList.add('hidden');
    }

    copyShareLink() {
        navigator.clipboard.writeText('https://bhekos.com/share/file-12345');
        this.showNotification('🔗', 'Share link copied to clipboard!');
    }

    // ==================== PRINT & SCAN ====================

    showPrinterDialog() {
        document.getElementById('printer-dialog').classList.remove('hidden');
    }

    closePrinterDialog() {
        document.getElementById('printer-dialog').classList.add('hidden');
    }

    printDocument() {
        this.showNotification('🖨️', 'Printing document...');
        this.closePrinterDialog();
    }

    showScannerDialog() {
        document.getElementById('scanner-dialog').classList.remove('hidden');
    }

    closeScannerDialog() {
        document.getElementById('scanner-dialog').classList.add('hidden');
    }

    scanDocument() {
        this.showNotification('📷', 'Scanning document...');
        setTimeout(() => {
            this.showNotification('✅', 'Document scanned successfully!');
            this.closeScannerDialog();
        }, 2000);
    }

    // ==================== TOUCH & GESTURES ====================

    showTouchHint() {
        document.getElementById('touch-gesture-hint').classList.remove('hidden');
    }

    closeTouchHint() {
        document.getElementById('touch-gesture-hint').classList.add('hidden');
    }

    // ==================== BIOMETRIC AUTH ====================

    showBiometricAuth() {
        document.getElementById('biometric-auth').classList.remove('hidden');
    }

    closeBiometricAuth() {
        document.getElementById('biometric-auth').classList.add('hidden');
    }

    // ==================== SENSORS PANEL ====================

    showSensorsPanel() {
        document.getElementById('sensors-panel').classList.remove('hidden');
    }

    closeSensorsPanel() {
        document.getElementById('sensors-panel').classList.add('hidden');
    }

    // ==================== ACCESSIBILITY ====================

    showAccessibilityMenu() {
        document.getElementById('accessibility-menu').classList.remove('hidden');
    }

    closeAccessibilityMenu() {
        document.getElementById('accessibility-menu').classList.add('hidden');
    }

    // ==================== PARENTAL CONTROLS UI ====================

    showParentalControls() {
        document.getElementById('parental-controls').classList.remove('hidden');
    }

    closeParentalControls() {
        document.getElementById('parental-controls').classList.add('hidden');
    }

    // ==================== SECURITY CENTER ====================

    showSecurityCenter() {
        document.getElementById('security-center').classList.remove('hidden');
    }

    closeSecurityCenter() {
        document.getElementById('security-center').classList.add('hidden');
    }

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
        icons.forEach(icon => {
            const iconEl = document.createElement('div');
            iconEl.className = 'file-item';
            iconEl.style.position = 'absolute';
            iconEl.style.left = `${icon.x}px`;
            iconEl.style.top = `${icon.y}px`;
            iconEl.innerHTML = `
                <div class="file-icon">${icon.name.split(' ')[0]}</div>
                <div class="file-name">${icon.name.split(' ')[1]}</div>
            `;
            iconEl.addEventListener('dblclick', () => {
                this.showNotification(icon.name.split(' ')[0], `${icon.name} opened`);
            });
            container.appendChild(iconEl);
        });
    }

    // ==================== SEARCH ====================

    showSearch() {
        document.getElementById('search-overlay').classList.remove('hidden');
        document.getElementById('search-input').focus();
    }

    hideSearch() {
        document.getElementById('search-overlay').classList.add('hidden');
    }

    performSearch(query) {
        const results = document.getElementById('search-results');
        results.innerHTML = '';
        
        if (!query) return;
        
        const filteredApps = this.apps.filter(app => 
            app.name.toLowerCase().includes(query.toLowerCase()) ||
            app.description.toLowerCase().includes(query.toLowerCase())
        );
        
        filteredApps.forEach(app => {
            const result = document.createElement('div');
            result.className = 'search-result-item';
            result.innerHTML = `
                <div style="font-weight: 500; margin-bottom: 4px;">${app.icon} ${app.name}</div>
                <div style="font-size: 12px; opacity: 0.8;">${app.description}</div>
            `;
            result.addEventListener('click', () => {
                this.spawnApp(app.name);
                this.hideSearch();
            });
            results.appendChild(result);
        });
    }

    // ==================== CLIPBOARD ====================

    showClipboardManager() {
        document.getElementById('clipboard-manager').classList.remove('hidden');
        this.updateClipboardDisplay();
    }

    updateClipboardDisplay() {
        const container = document.getElementById('clipboard-items');
        container.innerHTML = '';
        
        this.clipboard.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'clipboard-item';
            itemEl.textContent = item.length > 50 ? item.substring(0, 50) + '...' : item;
            itemEl.addEventListener('click', () => {
                navigator.clipboard.writeText(item);
                this.showNotification('📋', 'Copied to clipboard!');
            });
            container.appendChild(itemEl);
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
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        document.getElementById('recording-time').textContent = 
            `⏺️ ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        setTimeout(() => this.updateRecordingTime(), 1000);
    }

    // ==================== USER MANAGEMENT ====================

    showUserSwitcher() {
        document.getElementById('user-switcher').classList.remove('hidden');
    }

    hideUserSwitcher() {
        document.getElementById('user-switcher').classList.add('hidden');
    }

    switchUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            this.currentUser = user;
            this.showNotification('👤', `Switched to ${user.name}`);
            this.hideUserSwitcher();
        }
    }

    addUser() {
        const newUser = {
            id: `user${this.users.length + 1}`,
            name: `User ${this.users.length + 1}`,
            avatar: '👤',
            online: true
        };
        
        this.users.push(newUser);
        this.showNotification('➕', `User ${newUser.name} added`);
        this.updateUserSwitcher();
    }

    updateUserSwitcher() {
        // Update user switcher UI
        const switcher = document.getElementById('user-switcher');
        // Implementation would update the user list
    }

    // ==================== VIRTUAL DESKTOPS ====================

    showDesktopSwitcher() {
        document.getElementById('desktop-switcher').classList.remove('hidden');
    }

    hideDesktopSwitcher() {
        document.getElementById('desktop-switcher').classList.add('hidden');
    }

    switchDesktop(number) {
        this.currentDesktop = number;
        document.querySelectorAll('.desktop-item').forEach(item => item.classList.remove('active'));
        event.target.closest('.desktop-item').classList.add('active');
        this.showNotification('🖥️', `Switched to Desktop ${number}`);
        this.hideDesktopSwitcher();
    }

    addDesktop() {
        this.desktops.push(this.desktops.length + 1);
        this.showNotification('➕', `Desktop ${this.desktops.length} added`);
        this.updateDesktopSwitcher();
    }

    switchToNextDesktop() {
        const currentIndex = this.desktops.indexOf(this.currentDesktop);
        const nextIndex = (currentIndex + 1) % this.desktops.length;
        this.switchDesktop(this.desktops[nextIndex]);
    }

    switchToPreviousDesktop() {
        const currentIndex = this.desktops.indexOf(this.currentDesktop);
        const prevIndex = (currentIndex - 1 + this.desktops.length) % this.desktops.length;
        this.switchDesktop(this.desktops[prevIndex]);
    }

    updateDesktopSwitcher() {
        const switcher = document.getElementById('desktop-switcher');
        // Implementation would update the desktop list
    }

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

    openDisplaySettings() {
        this.showNotification('🖥️', 'Opening display settings...');
        // Implementation would open display settings
    }

    openSoundSettings() {
        this.showNotification('🔊', 'Opening sound settings...');
        // Implementation would open sound settings
    }

    openKeyboardSettings() {
        this.showNotification('⌨️', 'Opening keyboard settings...');
        // Implementation would open keyboard settings
    }

    openNetworkSettings() {
        this.showNotification('🌐', 'Opening network settings...');
        // Implementation would open network settings
    }

    // ==================== MISCELLANEOUS ====================

    adjustWindowPositions() {
        // Adjust window positions on resize to keep them visible
        this.windows.forEach(window => {
            const rect = window.element.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                window.element.style.left = `${window.innerWidth - rect.width - 50}px`;
            }
            if (rect.bottom > window.innerHeight) {
                window.element.style.top = `${window.innerHeight - rect.height - 50}px`;
            }
        });
    }

    showAbout() {
        this.showNotification('🚀', 'BhekOS 6.0 - Windows 11 + macOS Sonoma Hybrid');
    }

    showSecurityOptions() {
        this.showNotification('🔒', 'Ctrl+Alt+Del: Security options would open here');
    }

    showAppSwitcher() {
        this.showNotification('🔄', 'Alt+Tab: App switcher would open here');
    }

    updateBatteryStatus(battery) {
        this.settings.battery = Math.round(battery.level * 100);
        const icon = document.querySelector('.status-icon:nth-child(4)');
        
        let batteryIcon = '🔋';
        if (battery.charging) batteryIcon = '⚡';
        if (this.settings.battery < 20) batteryIcon = '🪫';
        
        icon.innerHTML = batteryIcon;
    }

    // ==================== LOGO CUSTOMIZATION ====================

    // Method to change the power animation logo
    setCustomLogo(imageUrl, customSettings = {}) {
        this.setPowerLogo(imageUrl, customSettings);
        this.showNotification('🖼️', 'Logo updated successfully');
    }

    // Quick preset logos
    applyLogoPreset(presetName) {
        const presets = {
            'windows': 'https://upload.wikimedia.org/wikipedia/commons/8/87/Windows_logo_-_2021.svg',
            'apple': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
            'linux': 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg',
            'android': 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg',
            'bhekos': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMDBGRjlEIiByeD0iMjAiLz4KPHBhdGggZD0iTTUwIDgwTDEwMCAxMzBMMTUwIDgwIiBzdHJva2U9IiMwMEE2NjYiIHN0cm9rZS13aWR0aD0iOCIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI1MCIgcj0iMTUiIGZpbGw9IiMwMEE2NjYiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTUwIiByPSIxNSIgZpbGw9IiMwMEE2NjYiLz4KPC9zdmc+'
        };
        
        if (presets[presetName]) {
            this.setPowerLogo(presets[presetName]);
            this.showNotification('✅', `Applied ${presetName} logo preset`);
        }
    }

    // Create logo from emoji
    createLogoFromEmoji(emoji, size = 200, backgroundColor = '#00FF9D') {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Draw background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, size, size);
        
        // Draw emoji
        ctx.font = `${size * 0.6}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, size / 2, size / 2);
        
        // Convert to data URL
        return canvas.toDataURL('image/png');
    }

    // ==================== DEMO METHODS ====================

    // Test the power animation system
    demoPowerAnimations() {
        const demoWindow = this.spawnApp('⚡ Power Animation Demo');
        const content = demoWindow.element.querySelector('.window-content');
        
        content.innerHTML = `
            <div style="padding: 30px; text-align: center;">
                <h2 style="margin-bottom: 20px;">⚡ Power Animation Demo</h2>
                <div style="margin-bottom: 30px; opacity: 0.8;">
                    Test the power on/off animations with different logos
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 30px;">
                    <button class="btn btn-primary" onclick="os.testPowerOn()">
                        🚀 Test Power On
                    </button>
                    <button class="btn btn-secondary" onclick="os.testPowerOff()">
                        ⏻ Test Power Off
                    </button>
                    <button class="btn btn-secondary" onclick="os.testRestart()">
                        🔄 Test Restart
                    </button>
                    <button class="btn btn-secondary" onclick="os.testSleepWake()">
                        🌙 Test Sleep/Wake
                    </button>
                </div>
                
                <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 10px; margin-bottom: 30px;">
                    <h3 style="margin-bottom: 15px;">🎨 Logo Customization</h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 15px;">
                        <button class="btn btn-secondary" onclick="os.applyLogoPreset('windows')">
                            Windows
                        </button>
                        <button class="btn btn-secondary" onclick="os.applyLogoPreset('apple')">
                            Apple
                        </button>
                        <button class="btn btn-secondary" onclick="os.applyLogoPreset('linux')">
                            Linux
                        </button>
                    </div>
                    
                    <input type="text" id="custom-logo-url" placeholder="Enter image URL" style="width: 100%; padding: 10px; margin-bottom: 10px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 5px; color: white;">
                    <button class="btn btn-primary" onclick="os.setCustomLogo(document.getElementById('custom-logo-url').value)">
                        🖼️ Set Custom Logo
                    </button>
                </div>
                
                <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 10px;">
                    <h3 style="margin-bottom: 15px;">⚙️ Animation Settings</h3>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <label style="display: flex; justify-content: space-between; align-items: center;">
                            <span>Animation Duration:</span>
                            <input type="range" min="1000" max="5000" value="3000" style="width: 150px;" onchange="os.powerAnimationSettings.startupDuration = this.value">
                        </label>
                        
                        <label style="display: flex; justify-content: space-between; align-items: center;">
                            <span>Logo Size:</span>
                            <input type="range" min="50" max="400" value="200" style="width: 150px;" onchange="os.powerAnimationSettings.logoSize = parseInt(this.value)">
                        </label>
                        
                        <label style="display: flex; justify-content: space-between; align-items: center;">
                            <span>Sound Effects:</span>
                            <input type="checkbox" checked onchange="os.powerAnimationSettings.enableSound = this.checked">
                        </label>
                        
                        <label style="display: flex; justify-content: space-between; align-items: center;">
                            <span>Particle Effects:</span>
                            <input type="checkbox" checked onchange="os.powerAnimationSettings.enableParticles = this.checked">
                        </label>
                    </div>
                </div>
            </div>
        `;
    }

    // Test methods
    testPowerOn() {
        this.showPowerOnAnimation().then(() => {
            this.showNotification('✅', 'Power on animation completed');
        });
    }

    testPowerOff() {
        this.showPowerOffAnimation().then(() => {
            this.showNotification('✅', 'Power off animation completed');
        });
    }

    testRestart() {
        this.showRestartAnimation().then(() => {
            this.showNotification('✅', 'Restart animation completed');
        });
    }

    testSleepWake() {
        this.sleep();
        setTimeout(() => this.wake(), 3000);
    }

    // ==================== INITIALIZATION ====================

    async init() {
        console.log('🚀 BhekOS 6.0 loading...');
        
        // Show power on animation
        await this.showPowerOnAnimation();
        
        // Auto-focus login password field
        document.getElementById('login-password').focus();
        
        // Add event listener for Enter key in login
        document.getElementById('login-password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                os.login();
            }
        });
        
        // Show welcome message
        console.log('🚀 BhekOS 6.0 ready!');
        console.log('📱 Features:');
        console.log('  • Hybrid Windows 11 + macOS Sonoma UI');
        console.log('  • Full PWA support');
        console.log('  • Multi-user system');
        console.log('  • Virtual desktops');
        console.log('  • Built-in apps & games');
        console.log('  • Voice assistant');
        console.log('  • Screen recording & screenshots');
        console.log('  • Parental controls');
        console.log('  • Security center');
        console.log('  • Performance monitoring');
        console.log('  • Power animation system');
        console.log('  • And much more!');
    }
}

// Create global instance
const os = new BhekOS();

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
    os.init();
});