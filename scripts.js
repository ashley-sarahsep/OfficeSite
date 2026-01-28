// ============================================
// ASHLEY SEPERS - RETRO PORTFOLIO SCRIPTS
// ============================================

// State management
const state = {
  currentScene: 'boot', // 'boot', 'room', 'desktop'
  currentDialog: null,
  currentConversation: null,
  windows: [],
  activeWindow: null,
  windowZIndex: 10,
  draggedWindow: null,
  dragOffset: { x: 0, y: 0 },
  // Gertrude state
  gertrude: {
    isVisible: false,
    lastShown: 0,
    lastActivity: Date.now(),
    shownWelcome: false,
    dismissedAt: 0,
    currentContext: 'room',
    timer: null
  },
  // Easter egg tracking
  catClicks: {
    gertrude: { count: 0, lastClick: 0 },
    gherkin: { count: 0, lastClick: 0 }
  }
};

// ============================================
// BOOT SEQUENCE
// ============================================

function initBoot() {
  const bootScreen = document.getElementById('boot-screen');
  const bootText = document.getElementById('boot-text');

  // Use boot sequence from data.js - classic DOS style
  const bootMessages = SITE_DATA.bootSequence || [
    "BIOS Version 1.0.94 - Ashley Industries",
    "Memory Test: 640K OK",
    "Detecting IDE drives...",
    "Primary Master: PERSONALITY.SYS",
    "Primary Slave: EXPERIENCE.DAT",
    "Secondary Master: CREATIVITY.DRV",
    "Loading CONFIG.SYS...",
    "Loading AUTOEXEC.BAT...",
    "HIMEM.SYS loaded",
    "EMM386.EXE loaded",
    "Loading MOUSE.COM...",
    "Loading SOUND.DRV...",
    "Starting HireMeOS 98...",
    "",
    "Welcome to Ashley's Office"
  ];

  let currentLine = 0;
  let bootContent = '';

  function typeBootLine() {
    if (currentLine >= bootMessages.length) {
      // Show options after boot sequence
      setTimeout(showBootOptions, 500);
      return;
    }

    const msg = bootMessages[currentLine];
    let lineHtml = '';

    if (msg === '') {
      lineHtml = '\n';
    } else {
      // Style the text with the warm color scheme
      lineHtml = `<span class="message">${msg}</span>\n`;
    }

    bootContent += lineHtml;
    bootText.innerHTML = bootContent;

    currentLine++;
    setTimeout(typeBootLine, 80 + Math.random() * 60);
  }

  function showBootOptions() {
    const bootContentDiv = document.querySelector('.boot-content');

    // Add progress bar
    const progressHtml = `
      <div class="boot-progress">
        <div class="boot-progress-bar" id="boot-progress-bar"></div>
      </div>
    `;

    // Add options
    const optionsHtml = `
      <p class="boot-select-text">Select Your Experience</p>
      <div class="boot-options">
        <button class="boot-option" data-mode="explore">
          <span class="boot-option-key">[*]</span>
          <span class="boot-option-title">EXPLORE MODE</span>
          <span class="boot-option-desc">Full interactive OS experience<br>Best on: Desktop, 10+ minutes</span>
        </button>
        <button class="boot-option" data-mode="quick">
          <span class="boot-option-key">[>]</span>
          <span class="boot-option-title">QUICK ACCESS</span>
          <span class="boot-option-desc">Resume & contact, no frills<br>Best for: Recruiters, mobile, time-sensitive</span>
        </button>
      </div>
      <p class="boot-accessibility" id="accessibility-toggle">[+] Accessibility Settings</p>
    `;

    bootContentDiv.innerHTML += progressHtml + optionsHtml;

    // Animate progress bar
    const progressBar = document.getElementById('boot-progress-bar');
    setTimeout(() => {
      progressBar.style.width = '100%';
    }, 100);

    // Add event listeners to options
    document.querySelectorAll('.boot-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.dataset.mode;
        selectBootOption(mode);
      });
    });
  }

  function selectBootOption(mode) {
    // Mark selected
    document.querySelectorAll('.boot-option').forEach(btn => {
      btn.classList.remove('selected');
      if (btn.dataset.mode === mode) {
        btn.classList.add('selected');
      }
    });

    setTimeout(() => {
      if (mode === 'explore') {
        transitionToRoom();
      } else {
        transitionToDesktop();
      }
    }, 500);
  }

  // Allow skipping with any key
  document.addEventListener('keydown', function skipBoot(e) {
    if (state.currentScene === 'boot') {
      document.removeEventListener('keydown', skipBoot);
      showBootOptions();
      currentLine = bootMessages.length; // Stop typing
    }
  });

  // Start boot sequence
  setTimeout(typeBootLine, 500);
}

// ============================================
// SCENE TRANSITIONS
// ============================================

function transitionToRoom() {
  const bootScreen = document.getElementById('boot-screen');
  const roomScene = document.getElementById('room-scene');

  bootScreen.style.opacity = '0';
  bootScreen.style.transition = 'opacity 0.5s ease';

  setTimeout(() => {
    bootScreen.classList.add('hidden');
    roomScene.classList.remove('hidden');
    roomScene.style.opacity = '0';
    setTimeout(() => {
      roomScene.style.opacity = '1';
      roomScene.style.transition = 'opacity 0.5s ease';
    }, 50);
    state.currentScene = 'room';
    initRoomMenu();
  }, 500);
}

function transitionToDesktop() {
  const bootScreen = document.getElementById('boot-screen');
  const roomScene = document.getElementById('room-scene');
  const desktopScene = document.getElementById('desktop-scene');

  // Hide boot if visible
  if (!bootScreen.classList.contains('hidden')) {
    bootScreen.style.opacity = '0';
    bootScreen.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      bootScreen.classList.add('hidden');
    }, 500);
  }

  // Hide room if visible
  if (!roomScene.classList.contains('hidden')) {
    roomScene.style.opacity = '0';
    roomScene.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      roomScene.classList.add('hidden');
    }, 500);
  }

  setTimeout(() => {
    desktopScene.classList.remove('hidden');
    desktopScene.style.opacity = '0';
    setTimeout(() => {
      desktopScene.style.opacity = '1';
      desktopScene.style.transition = 'opacity 0.5s ease';
    }, 50);
    state.currentScene = 'desktop';
    initDesktop();
  }, 600);
}

function transitionToRoomFromDesktop() {
  const desktopScene = document.getElementById('desktop-scene');
  const roomScene = document.getElementById('room-scene');

  desktopScene.style.opacity = '0';
  desktopScene.style.transition = 'opacity 0.5s ease';

  setTimeout(() => {
    desktopScene.classList.add('hidden');
    // Close all windows
    state.windows = [];
    document.getElementById('windows-container').innerHTML = '';
    document.getElementById('taskbar-items').innerHTML = '';

    roomScene.classList.remove('hidden');
    roomScene.style.opacity = '0';
    setTimeout(() => {
      roomScene.style.opacity = '1';
      roomScene.style.transition = 'opacity 0.5s ease';
    }, 50);
    state.currentScene = 'room';
  }, 500);
}

// ============================================
// ROOM SCENE & MENU
// ============================================

function initRoomMenu() {
  const inspectBtn = document.getElementById('inspect-btn');
  const computerBtn = document.getElementById('computer-btn');
  const inspectMenu = document.getElementById('inspect-menu');
  const inspectItems = document.querySelectorAll('.inspect-item');

  // Toggle inspect menu
  inspectBtn.addEventListener('click', () => {
    inspectMenu.classList.toggle('hidden');
  });

  // Computer button goes directly to desktop
  computerBtn.addEventListener('click', () => {
    inspectMenu.classList.add('hidden');
    handleRoomAction('monitor');
  });

  // Inspect menu items
  inspectItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      inspectMenu.classList.add('hidden');
      handleRoomAction(action);
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!inspectMenu.classList.contains('hidden') &&
        !inspectMenu.contains(e.target) &&
        e.target !== inspectBtn &&
        !inspectBtn.contains(e.target)) {
      inspectMenu.classList.add('hidden');
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !inspectMenu.classList.contains('hidden')) {
      inspectMenu.classList.add('hidden');
    }
  });
}

function handleRoomAction(actionId) {
  const itemData = SITE_DATA.hotspots[actionId];

  if (!itemData) return;

  // Monitor opens desktop
  if (itemData.action === 'openDesktop') {
    transitionToDesktop();
    return;
  }

  // Check for cat petting easter egg
  if (actionId === 'gertrude' || actionId === 'gherkin') {
    const catPetResponse = handleCatPet(actionId);
    if (catPetResponse) {
      // Show special response instead of normal dialog
      showCatPetResponse(actionId, catPetResponse);
      return;
    }
  }

  // Everything else opens dialog
  openDialog(actionId, itemData);
}

function handleCatPet(catId) {
  const now = Date.now();
  const catState = state.catClicks[catId];
  const catConfig = SITE_DATA.easterEggs?.catPets?.[catId];

  if (!catConfig) return null;

  // Reset count if too much time has passed (5 seconds)
  if (now - catState.lastClick > 5000) {
    catState.count = 0;
  }

  catState.count++;
  catState.lastClick = now;

  // Check if threshold reached
  if (catState.count >= catConfig.threshold) {
    catState.count = 0; // Reset for next time
    const responses = catConfig.responses;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  return null;
}

function showCatPetResponse(catId, message) {
  const overlay = document.getElementById('dialog-overlay');
  const titleEl = document.getElementById('dialog-title');
  const portraitImg = document.getElementById('dialog-portrait-img');
  const itemImageContainer = document.getElementById('dialog-item-image');
  const textEl = document.getElementById('dialog-text');
  const responsesEl = document.getElementById('dialog-responses');

  // Set dialog title
  titleEl.textContent = catId === 'gertrude' ? '✨ Gertrude Approves ✨' : '🧡 Gherkin Happy 🧡';

  // Hide portrait, we're showing cat reaction
  portraitImg.style.display = 'none';
  itemImageContainer.classList.remove('visible');

  // Show the message
  textEl.textContent = message;

  // Simple close button
  responsesEl.innerHTML = `
    <button class="dialog-response" data-next="null">[Continue petting]</button>
  `;

  responsesEl.querySelector('button').addEventListener('click', () => {
    overlay.classList.add('hidden');
    // Reopen normal cat dialog
    const catData = SITE_DATA.hotspots[catId];
    if (catData) {
      openDialog(catId, catData);
    }
  });

  overlay.classList.remove('hidden');
}

// ============================================
// DIALOG SYSTEM
// ============================================

function getPortraitPath(portraitKey) {
  // Get portrait path from the portraits object, fallback to default
  if (SITE_DATA.portraits && SITE_DATA.portraits[portraitKey]) {
    return SITE_DATA.portraits[portraitKey];
  }
  return SITE_DATA.portraits?.default || 'assets/images/ashley-default.jpg';
}

function openDialog(hotspotId, hotspotData) {
  const overlay = document.getElementById('dialog-overlay');
  const titleEl = document.getElementById('dialog-title');
  const portraitImg = document.getElementById('dialog-portrait-img');
  const itemImageContainer = document.getElementById('dialog-item-image');
  const itemImg = document.getElementById('dialog-item-img');
  const textEl = document.getElementById('dialog-text');
  const responsesEl = document.getElementById('dialog-responses');

  // Set dialog title
  titleEl.textContent = hotspotData.name;

  // Set initial portrait from first conversation
  const firstConversation = hotspotData.conversations?.[0];
  const initialPortrait = firstConversation?.portrait || 'default';
  portraitImg.src = getPortraitPath(initialPortrait);
  portraitImg.style.display = 'block';
  portraitImg.onerror = () => {
    // Try default if specific portrait fails
    portraitImg.src = getPortraitPath('default');
  };

  // Set item image if available
  if (hotspotData.image) {
    itemImg.src = hotspotData.image;
    itemImg.onerror = () => {
      itemImageContainer.classList.remove('visible');
    };
    itemImageContainer.classList.add('visible');
  } else {
    itemImageContainer.classList.remove('visible');
  }

  // Start conversation at intro
  state.currentDialog = hotspotId;
  state.currentConversation = hotspotData.conversations;

  showConversation(hotspotData.conversations[0].id);

  overlay.classList.remove('hidden');
}

function showConversation(conversationId) {
  if (!state.currentConversation) return;

  const conversation = state.currentConversation.find(c => c.id === conversationId);
  if (!conversation) return;

  const textEl = document.getElementById('dialog-text');
  const responsesEl = document.getElementById('dialog-responses');
  const portraitImg = document.getElementById('dialog-portrait-img');

  // Update portrait based on conversation mood
  if (conversation.portrait) {
    portraitImg.src = getPortraitPath(conversation.portrait);
  }

  // Type out the text
  typeText(textEl, conversation.text, () => {
    // Show responses after text is done
    responsesEl.innerHTML = '';

    conversation.responses.forEach(response => {
      const btn = document.createElement('button');
      btn.className = 'dialog-response';
      btn.textContent = response.text;
      btn.addEventListener('click', () => {
        if (response.next === null) {
          closeDialog();
        } else {
          showConversation(response.next);
        }
      });
      responsesEl.appendChild(btn);
    });
  });
}

function typeText(element, text, callback) {
  element.textContent = '';
  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
      setTimeout(type, 20);
    } else {
      if (callback) callback();
    }
  }

  type();
}

function closeDialog() {
  const overlay = document.getElementById('dialog-overlay');
  overlay.classList.add('hidden');
  state.currentDialog = null;
  state.currentConversation = null;
}

// Dialog close button
document.getElementById('dialog-close')?.addEventListener('click', closeDialog);

// Close dialog on overlay click
document.getElementById('dialog-overlay')?.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeDialog();
  }
});

// ============================================
// HIREMEOS DESKTOP
// ============================================

function initDesktop() {
  initDesktopIcons();
  initTaskbar();
  initStartMenu();
  updateClock();
  setInterval(updateClock, 1000);
}

function initDesktopIcons() {
  const icons = document.querySelectorAll('.desktop-icon');

  icons.forEach(icon => {
    // Double click to open
    icon.addEventListener('dblclick', (e) => {
      const app = e.currentTarget.dataset.app;
      const file = e.currentTarget.dataset.file;
      openApp(app, file);
    });

    // Single click to select
    icon.addEventListener('click', (e) => {
      icons.forEach(i => i.classList.remove('selected'));
      e.currentTarget.classList.add('selected');
    });
  });

  // Click desktop to deselect
  document.getElementById('desktop-area')?.addEventListener('click', (e) => {
    if (e.target.id === 'desktop-area') {
      icons.forEach(i => i.classList.remove('selected'));
    }
  });
}

function initTaskbar() {
  // Taskbar items are updated dynamically
}

function initStartMenu() {
  const startButton = document.getElementById('start-button');
  const startMenu = document.getElementById('start-menu');

  startButton?.addEventListener('click', (e) => {
    e.stopPropagation();
    startMenu.classList.toggle('hidden');
  });

  // Close menu when clicking elsewhere
  document.addEventListener('click', () => {
    startMenu?.classList.add('hidden');
  });

  // Start menu items
  document.querySelectorAll('.start-menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const action = e.currentTarget.dataset.action;
      startMenu.classList.add('hidden');

      switch (action) {
        case 'resume':
          openApp('wordpad', 'resume');
          break;
        case 'about':
          openApp('myspace', 'about');
          break;
        case 'chat':
          openApp('messenger', 'chat');
          break;
        case 'email':
          window.location.href = 'mailto:' + SITE_DATA.email;
          break;
        case 'linkedin':
          window.open('https://' + SITE_DATA.linkedin, '_blank');
          break;
        case 'exit':
          transitionToRoomFromDesktop();
          break;
      }
    });
  });
}

function updateClock() {
  const timeEl = document.getElementById('tray-time');
  if (timeEl) {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}

// ============================================
// WINDOW MANAGEMENT
// ============================================

function openApp(appType, fileId) {
  // Check if window already exists
  const existingWindow = state.windows.find(w => w.app === appType && w.file === fileId);
  if (existingWindow) {
    focusWindow(existingWindow.id);
    return;
  }

  const template = document.getElementById(`template-${appType}`);
  if (!template) return;

  const windowEl = template.content.cloneNode(true).firstElementChild;
  const windowId = `window-${Date.now()}`;
  windowEl.id = windowId;

  // Position window
  const offset = state.windows.length * 30;
  windowEl.style.left = `${50 + offset}px`;
  windowEl.style.top = `${30 + offset}px`;
  windowEl.style.width = getWindowSize(appType).width;
  windowEl.style.height = getWindowSize(appType).height;
  windowEl.style.zIndex = ++state.windowZIndex;

  document.getElementById('windows-container').appendChild(windowEl);

  // Initialize window content
  initWindowContent(windowEl, appType, fileId);

  // Add window controls
  initWindowControls(windowEl, windowId);

  // Make draggable
  makeWindowDraggable(windowEl);

  // Track window
  state.windows.push({
    id: windowId,
    app: appType,
    file: fileId,
    element: windowEl,
    minimized: false
  });

  // Add to taskbar
  addTaskbarItem(windowId, getWindowTitle(appType, fileId));

  // Focus
  focusWindow(windowId);
}

function getWindowSize(appType) {
  const sizes = {
    wordpad: { width: '600px', height: '500px' },
    myspace: { width: '700px', height: '550px' },
    messenger: { width: '400px', height: '450px' },
    folder: { width: '500px', height: '400px' },
    recycle: { width: '450px', height: '350px' },
    notepad: { width: '500px', height: '400px' },
    'work-detail': { width: '500px', height: '400px' }
  };
  return sizes[appType] || { width: '500px', height: '400px' };
}

function getWindowTitle(appType, fileId) {
  // Dynamic titles for notepad based on file
  if (appType === 'notepad' && SITE_DATA.easterEggs?.[fileId]) {
    return SITE_DATA.easterEggs[fileId].title;
  }

  const titles = {
    wordpad: 'Resume.doc - WordPad',
    myspace: 'AboutMe.html - Internet Explorer',
    messenger: 'AshleyChat',
    folder: 'Work Examples',
    recycle: 'Recycle Bin',
    notepad: 'Notepad',
    'work-detail': 'Project Details'
  };
  return titles[appType] || 'Window';
}

function initWindowContent(windowEl, appType, fileId) {
  // Set window type for Gertrude context awareness
  windowEl.dataset.windowType = appType;

  switch (appType) {
    case 'wordpad':
      initWordpad(windowEl);
      windowEl.dataset.windowType = 'resume';
      break;
    case 'myspace':
      initMyspace(windowEl);
      windowEl.dataset.windowType = 'myspace';
      break;
    case 'messenger':
      initMessenger(windowEl);
      windowEl.dataset.windowType = 'chat';
      break;
    case 'folder':
      initFolder(windowEl);
      windowEl.dataset.windowType = 'folder';
      break;
    case 'recycle':
      initRecycleBin(windowEl);
      break;
    case 'notepad':
      initNotepad(windowEl, fileId);
      break;
    case 'work-detail':
      initWorkDetail(windowEl, fileId);
      windowEl.dataset.windowType = 'workExamples';
      break;
  }
}

function initWindowControls(windowEl, windowId) {
  const closeBtn = windowEl.querySelector('.window-close');
  const minBtn = windowEl.querySelector('.window-minimize');
  const maxBtn = windowEl.querySelector('.window-maximize');

  closeBtn?.addEventListener('click', () => closeWindow(windowId));
  minBtn?.addEventListener('click', () => minimizeWindow(windowId));
  maxBtn?.addEventListener('click', () => maximizeWindow(windowId));

  // Focus on click
  windowEl.addEventListener('mousedown', () => focusWindow(windowId));
}

function makeWindowDraggable(windowEl) {
  const titlebar = windowEl.querySelector('.window-titlebar');

  titlebar?.addEventListener('mousedown', (e) => {
    if (e.target.closest('.window-controls')) return;

    state.draggedWindow = windowEl;
    state.dragOffset = {
      x: e.clientX - windowEl.offsetLeft,
      y: e.clientY - windowEl.offsetTop
    };

    windowEl.style.transition = 'none';
  });
}

document.addEventListener('mousemove', (e) => {
  if (state.draggedWindow) {
    const container = document.getElementById('desktop-area');
    const rect = container.getBoundingClientRect();

    let newX = e.clientX - state.dragOffset.x;
    let newY = e.clientY - state.dragOffset.y;

    // Constrain to container
    newX = Math.max(0, Math.min(newX, rect.width - 100));
    newY = Math.max(0, Math.min(newY, rect.height - 50));

    state.draggedWindow.style.left = `${newX}px`;
    state.draggedWindow.style.top = `${newY}px`;
  }
});

document.addEventListener('mouseup', () => {
  if (state.draggedWindow) {
    state.draggedWindow.style.transition = '';
    state.draggedWindow = null;
  }
});

function focusWindow(windowId) {
  state.windows.forEach(w => {
    const titlebar = w.element.querySelector('.window-titlebar');
    if (w.id === windowId) {
      w.element.style.zIndex = ++state.windowZIndex;
      titlebar?.classList.remove('inactive');
      state.activeWindow = w.element; // Store element reference for Gertrude
    } else {
      titlebar?.classList.add('inactive');
    }
  });

  // Update taskbar
  document.querySelectorAll('.taskbar-item').forEach(item => {
    item.classList.toggle('active', item.dataset.window === windowId);
  });
}

function closeWindow(windowId) {
  const windowData = state.windows.find(w => w.id === windowId);
  if (!windowData) return;

  windowData.element.remove();
  state.windows = state.windows.filter(w => w.id !== windowId);

  // Remove from taskbar
  document.querySelector(`.taskbar-item[data-window="${windowId}"]`)?.remove();

  // Focus next window
  if (state.windows.length > 0) {
    focusWindow(state.windows[state.windows.length - 1].id);
  }
}

function minimizeWindow(windowId) {
  const windowData = state.windows.find(w => w.id === windowId);
  if (!windowData) return;

  windowData.minimized = true;
  windowData.element.style.display = 'none';

  // Update taskbar item
  const taskbarItem = document.querySelector(`.taskbar-item[data-window="${windowId}"]`);
  taskbarItem?.classList.remove('active');
}

function maximizeWindow(windowId) {
  const windowData = state.windows.find(w => w.id === windowId);
  if (!windowData) return;

  windowData.element.classList.toggle('maximized');
}

function addTaskbarItem(windowId, title) {
  const taskbarItems = document.getElementById('taskbar-items');
  const item = document.createElement('button');
  item.className = 'taskbar-item active';
  item.dataset.window = windowId;
  item.textContent = title;

  item.addEventListener('click', () => {
    const windowData = state.windows.find(w => w.id === windowId);
    if (windowData?.minimized) {
      windowData.minimized = false;
      windowData.element.style.display = 'flex';
    }
    focusWindow(windowId);
  });

  taskbarItems.appendChild(item);
}

// ============================================
// APP CONTENT INITIALIZATION
// ============================================

function initWordpad(windowEl) {
  const content = windowEl.querySelector('.wordpad-content');
  if (content) {
    content.innerHTML = SITE_DATA.resume.content;
  }
}

function initMyspace(windowEl) {
  const content = windowEl.querySelector('.myspace-content');
  if (!content) return;

  const data = SITE_DATA.aboutMe;

  content.innerHTML = `
    <div class="myspace-page">
      <div class="myspace-header">
        <h1>${data.displayName}</h1>
        <p class="myspace-mood">"${data.mood}"</p>
      </div>
      <div class="myspace-body">
        <div class="myspace-sidebar">
          <div class="myspace-profile-pic">
            <img src="assets/images/myspace.jpg" alt="Ashley" onerror="this.style.display='none'">
          </div>
          <div class="myspace-stats">
            <p><strong>Status:</strong> ${data.status}</p>
            <p><strong>Last Login:</strong> ${data.lastLogin}</p>
            <p><strong>Profile Views:</strong> <span id="view-counter">${data.profileViews}</span></p>
          </div>
        </div>
        <div class="myspace-main">
          <div class="myspace-section">
            <h3>${data.headline}</h3>
            ${data.aboutText}
          </div>
          <div class="myspace-section">
            <h3>Ashley's Top 8</h3>
            <div class="top-eight">
              ${data.topEight.map(friend => `
                <div class="top-eight-friend">
                  <img src="${friend.image}" alt="${friend.name}" onerror="this.style.background='#ddd'">
                  <p>${friend.name}</p>
                  <span>${friend.role}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="myspace-section">
            <h3>Interests</h3>
            <dl class="myspace-interests">
              <dt>General</dt>
              <dd>${data.interests.general}</dd>
              <dt>Music</dt>
              <dd>${data.interests.music}</dd>
              <dt>Movies</dt>
              <dd>${data.interests.movies}</dd>
              <dt>Books</dt>
              <dd>${data.interests.books}</dd>
            </dl>
          </div>
          ${data.testimonials && data.testimonials.length > 0 ? `
          <div class="myspace-section testimonials-section">
            <h3>What People Say</h3>
            <div class="testimonials-list">
              ${data.testimonials.map(t => `
                <div class="testimonial">
                  <p class="testimonial-title">"${t.title}"</p>
                  <p class="testimonial-text">${t.text}</p>
                  <p class="testimonial-author">— ${t.name}</p>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}
          <div class="visitor-counter">
            VISITORS: ${String(data.profileViews).padStart(6, '0')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Increment view counter
  const counter = content.querySelector('#view-counter');
  if (counter) {
    let count = parseInt(counter.textContent);
    counter.textContent = ++count;
  }
}

function initMessenger(windowEl) {
  const chatArea = windowEl.querySelector('.messenger-chat-area');
  const quickQuestions = windowEl.querySelector('.messenger-quick-questions');
  const input = windowEl.querySelector('.messenger-input');
  const sendBtn = windowEl.querySelector('.messenger-send');

  const chatData = SITE_DATA.chat;

  // Add welcome message
  addChatMessage(chatArea, chatData.welcomeMessage, 'bot');

  // Add quick questions
  chatData.quickQuestions.forEach(q => {
    const btn = document.createElement('button');
    btn.className = 'quick-question';
    btn.textContent = q;
    btn.addEventListener('click', () => {
      sendChatMessage(chatArea, q);
    });
    quickQuestions.appendChild(btn);
  });

  // Send on button click
  sendBtn?.addEventListener('click', () => {
    const message = input.value.trim();
    if (message) {
      sendChatMessage(chatArea, message);
      input.value = '';
    }
  });

  // Send on enter
  input?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const message = input.value.trim();
      if (message) {
        sendChatMessage(chatArea, message);
        input.value = '';
      }
    }
  });
}

function addChatMessage(chatArea, text, type) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${type}`;

  msgDiv.innerHTML = `
    <div class="chat-avatar ${type}"></div>
    <div class="chat-bubble">${text}</div>
  `;

  chatArea.appendChild(msgDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function sendChatMessage(chatArea, message) {
  // Add user message
  addChatMessage(chatArea, message, 'user');

  // Find response
  const chatData = SITE_DATA.chat;
  let response = chatData.responses[message];

  if (!response) {
    // Check for partial matches
    for (const [key, value] of Object.entries(chatData.responses)) {
      if (message.toLowerCase().includes(key.toLowerCase().split(' ')[0])) {
        response = value;
        break;
      }
    }
  }

  if (!response) {
    response = chatData.fallbackResponse;
  }

  // Add bot response after delay
  setTimeout(() => {
    addChatMessage(chatArea, response, 'bot');
  }, 500 + Math.random() * 500);
}

function initFolder(windowEl) {
  const content = windowEl.querySelector('.folder-content');
  if (!content) return;

  content.innerHTML = SITE_DATA.workExamples.map(work => `
    <div class="folder-item" data-work-id="${work.id}">
      <div class="folder-item-icon"></div>
      <span class="folder-item-name">${work.name}</span>
    </div>
  `).join('');

  // Add click handlers
  content.querySelectorAll('.folder-item').forEach(item => {
    item.addEventListener('dblclick', () => {
      const workId = item.dataset.workId;
      openApp('work-detail', workId);
    });
  });
}

function initWorkDetail(windowEl, workId) {
  const content = windowEl.querySelector('.work-detail-content');
  const work = SITE_DATA.workExamples.find(w => w.id === workId);

  if (!content || !work) return;

  // Update window title
  const titleEl = windowEl.querySelector('.window-title');
  if (titleEl) {
    titleEl.textContent = work.name;
  }

  content.innerHTML = `
    <div class="work-detail-header">
      <h2>${work.name}</h2>
      <p class="work-detail-type">${work.type}</p>
    </div>
    <div class="work-detail-section">
      <p class="work-detail-description">${work.description}</p>
    </div>
    ${work.challenge ? `
    <div class="work-detail-section">
      <h3>The Challenge</h3>
      <p>${work.challenge}</p>
    </div>
    ` : ''}
    ${work.whatIDid && work.whatIDid.length > 0 ? `
    <div class="work-detail-section">
      <h3>What I Did</h3>
      <ul class="work-detail-list">
        ${work.whatIDid.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
    ` : ''}
    ${work.outcome ? `
    <div class="work-detail-section">
      <h3>The Outcome</h3>
      <p class="work-outcome">${work.outcome}</p>
    </div>
    ` : ''}
    <div class="work-detail-section">
      <h3>Skills</h3>
      <div class="work-detail-skills">
        ${work.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
    </div>
  `;
}

function initNotepad(windowEl, fileId) {
  const content = windowEl.querySelector('.notepad-text');
  if (!content) return;

  const easterEgg = SITE_DATA.easterEggs?.[fileId];
  if (easterEgg) {
    content.textContent = easterEgg.content;

    // Update window title
    const titleEl = windowEl.querySelector('.window-title');
    if (titleEl && easterEgg.title) {
      titleEl.textContent = easterEgg.title;
    }
  }
}

function initRecycleBin(windowEl) {
  const content = windowEl.querySelector('.recycle-items');
  if (!content) return;

  const trash = SITE_DATA.easterEggs?.trash;
  if (trash && trash.items) {
    content.innerHTML = trash.items.map(item => `
      <div class="recycle-item">
        <div class="recycle-item-icon">${getFileIcon(item.name)}</div>
        <span class="recycle-item-name">${item.name}</span>
        <span class="recycle-item-size">${item.size}</span>
        ${item.note ? `<span class="recycle-item-note">${item.note}</span>` : ''}
      </div>
    `).join('');
  }
}

function getFileIcon(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const icons = {
    doc: '📄',
    ppt: '📊',
    ics: '📅',
    jpg: '🖼️',
    txt: '📝'
  };
  return icons[ext] || '📄';
}

// ============================================
// GERTRUDE - PHILOSOPHICAL CAT HELPER
// ============================================

function initGertrude() {
  const dismissBtn = document.getElementById('gertrude-dismiss');

  // Dismiss button handler
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      hideGertrude();
      state.gertrude.dismissedAt = Date.now();
    });
  }

  // Track user activity
  document.addEventListener('click', () => {
    state.gertrude.lastActivity = Date.now();
  });
  document.addEventListener('keydown', () => {
    state.gertrude.lastActivity = Date.now();
  });

  // Start the Gertrude timer after a delay
  setTimeout(() => {
    // Show welcome message first
    if (!state.gertrude.shownWelcome) {
      showGertrudeMessage('welcome');
      state.gertrude.shownWelcome = true;
    }
    // Start periodic appearances
    scheduleGertrude();
  }, 5000); // Wait 5 seconds after page load
}

function scheduleGertrude() {
  const config = SITE_DATA.gertrude?.config || {
    minDelay: 30000,
    maxDelay: 90000
  };

  // Random delay between min and max
  const delay = config.minDelay + Math.random() * (config.maxDelay - config.minDelay);

  state.gertrude.timer = setTimeout(() => {
    tryShowGertrude();
    scheduleGertrude(); // Schedule next appearance
  }, delay);
}

function tryShowGertrude() {
  const config = SITE_DATA.gertrude?.config || {};
  const now = Date.now();

  // Don't show if already visible
  if (state.gertrude.isVisible) return;

  // Don't show if recently dismissed
  if (now - state.gertrude.dismissedAt < (config.dismissCooldown || 45000)) return;

  // Don't show if dialog is open
  const dialogOverlay = document.getElementById('dialog-overlay');
  if (dialogOverlay && !dialogOverlay.classList.contains('hidden')) return;

  // Check if idle
  const idleTime = now - state.gertrude.lastActivity;
  if (idleTime > (config.idleThreshold || 60000)) {
    showGertrudeMessage('idle');
    return;
  }

  // Show context-appropriate message
  showGertrudeMessage(getGertrudeContext());
}

function getGertrudeContext() {
  // Check what's currently active
  if (state.currentScene === 'room') {
    return 'room';
  }

  if (state.currentScene === 'desktop') {
    // Check which window is active
    if (state.activeWindow) {
      const windowType = state.activeWindow.dataset?.windowType;
      if (windowType === 'resume') return 'resume';
      if (windowType === 'myspace') return 'myspace';
      if (windowType === 'chat') return 'chat';
      if (windowType === 'folder') return 'workExamples';
    }
    return 'desktop';
  }

  return 'general';
}

function showGertrudeMessage(context) {
  const helper = document.getElementById('gertrude-helper');
  const messageEl = document.getElementById('gertrude-message');

  if (!helper || !messageEl) return;

  // Get messages for this context
  const messages = SITE_DATA.gertrude?.[context] || SITE_DATA.gertrude?.general || [];
  if (messages.length === 0) return;

  // Pick a random message
  const message = messages[Math.floor(Math.random() * messages.length)];

  // Set message and show
  messageEl.textContent = message;
  helper.classList.remove('hidden');
  helper.classList.add('visible');
  state.gertrude.isVisible = true;
  state.gertrude.lastShown = Date.now();

  // Trigger slow blink animation
  setTimeout(() => {
    helper.classList.add('blinking');
    setTimeout(() => {
      helper.classList.remove('blinking');
    }, 300);
  }, 2000);

  // Auto-hide after duration
  const config = SITE_DATA.gertrude?.config || {};
  setTimeout(() => {
    if (state.gertrude.isVisible) {
      hideGertrude();
    }
  }, config.displayDuration || 15000);
}

function hideGertrude() {
  const helper = document.getElementById('gertrude-helper');
  if (helper) {
    helper.classList.remove('visible');
    helper.classList.add('hidden');
  }
  state.gertrude.isVisible = false;
}

// ============================================
// SCREENSAVER
// ============================================

let screensaverTimeout = null;
const SCREENSAVER_DELAY = 120000; // 2 minutes of inactivity

function initScreensaver() {
  const screensaver = document.getElementById('screensaver');
  if (!screensaver) return;

  // Reset timer on any activity
  const resetScreensaver = () => {
    if (screensaverTimeout) {
      clearTimeout(screensaverTimeout);
    }

    // Hide screensaver if visible
    if (!screensaver.classList.contains('hidden')) {
      screensaver.classList.add('hidden');
    }

    // Set new timeout
    screensaverTimeout = setTimeout(showScreensaver, SCREENSAVER_DELAY);
  };

  // Activity listeners
  document.addEventListener('mousemove', resetScreensaver);
  document.addEventListener('mousedown', resetScreensaver);
  document.addEventListener('keydown', resetScreensaver);
  document.addEventListener('touchstart', resetScreensaver);
  document.addEventListener('scroll', resetScreensaver);

  // Start initial timer
  screensaverTimeout = setTimeout(showScreensaver, SCREENSAVER_DELAY);
}

function showScreensaver() {
  const screensaver = document.getElementById('screensaver');
  const content = document.getElementById('screensaver-content');

  if (!screensaver || !content) return;

  // Random starting position
  const startX = Math.random() * (window.innerWidth - 300);
  const startY = Math.random() * (window.innerHeight - 100);
  content.style.left = `${startX}px`;
  content.style.top = `${startY}px`;

  screensaver.classList.remove('hidden');
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initSite();
});

function initSite() {
  const bootScreen = document.getElementById('boot-screen');
  const roomScene = document.getElementById('room-scene');

  // Hide boot screen, show room directly
  bootScreen.classList.add('hidden');
  roomScene.classList.remove('hidden');
  roomScene.style.opacity = '1';
  state.currentScene = 'room';

  // Initialize the room menu
  initRoomMenu();

  // Initialize Gertrude
  initGertrude();

  // Initialize screensaver
  initScreensaver();

  // Show welcome dialog
  showWelcomeDialog();
}

function showWelcomeDialog() {
  const welcomeData = SITE_DATA.hotspots.welcome;
  if (welcomeData) {
    openDialog('welcome', welcomeData);
  }
}
