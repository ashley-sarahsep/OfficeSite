// ============================================
// ASHLEY SARAH - RETRO PORTFOLIO SCRIPTS
// ============================================

// High Score Functions
function getHighScore(gameId) {
  try {
    const scores = JSON.parse(localStorage.getItem('hiremeos-highscores') || '{}');
    return scores[gameId] || null;
  } catch (e) {
    return null;
  }
}

function setHighScore(gameId, score, type = 'high') {
  // type: 'high' = higher is better, 'low' = lower is better
  try {
    const scores = JSON.parse(localStorage.getItem('hiremeos-highscores') || '{}');
    const current = scores[gameId];

    let isNewBest = false;
    if (current === undefined || current === null) {
      isNewBest = true;
    } else if (type === 'high' && score > current) {
      isNewBest = true;
    } else if (type === 'low' && score < current) {
      isNewBest = true;
    }

    if (isNewBest) {
      scores[gameId] = score;
      localStorage.setItem('hiremeos-highscores', JSON.stringify(scores));
    }
    return isNewBest;
  } catch (e) {
    return false;
  }
}

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
  // Gertrude state (simplified - now click-based)
  gertrudeBubbleOpen: false,
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

function transitionToDesktop(callback) {
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
      // Call the callback after transition completes
      if (callback && typeof callback === 'function') {
        setTimeout(callback, 100);
      }
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

  // Quick links - go directly to desktop and open window
  const quickLinks = document.querySelectorAll('.navbar-link[data-window]');
  quickLinks.forEach(link => {
    link.addEventListener('click', () => {
      const windowType = link.dataset.window;
      inspectMenu.classList.add('hidden');

      // Transition to desktop and open the requested window
      transitionToDesktop(() => {
        switch (windowType) {
          case 'resume':
            openApp('wordpad', 'resume');
            break;
          case 'myspace':
            openApp('myspace', 'about');
            break;
          case 'chat':
            openApp('messenger', 'chat');
            break;
        }
      });
    });
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
  const portraitContainer = document.getElementById('dialog-portrait');
  const portraitImg = document.getElementById('dialog-portrait-img');
  const textEl = document.getElementById('dialog-text');
  const responsesEl = document.getElementById('dialog-responses');

  // Set dialog title
  titleEl.textContent = catId === 'gertrude' ? '✨ Gertrude Approves ✨' : '🧡 Gherkin Happy 🧡';

  // Show cat image in portrait container
  const catData = SITE_DATA.hotspots[catId];
  if (catData?.image) {
    portraitImg.src = catData.image;
    portraitImg.alt = catData.name;
    portraitImg.style.display = 'block';
    portraitContainer.classList.add('cat-pettable');
  }

  // Show the message
  textEl.textContent = message;

  // Simple close button
  responsesEl.innerHTML = `
    <button class="dialog-response" data-next="null">[Continue petting]</button>
  `;

  responsesEl.querySelector('button').addEventListener('click', () => {
    overlay.classList.add('hidden');
    // Reopen normal cat dialog
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
  const portraitContainer = document.getElementById('dialog-portrait');
  const portraitImg = document.getElementById('dialog-portrait-img');
  const textEl = document.getElementById('dialog-text');
  const responsesEl = document.getElementById('dialog-responses');

  // Clear previous dialog content immediately
  textEl.textContent = '';
  responsesEl.innerHTML = '';

  // Set dialog title
  titleEl.textContent = hotspotData.name;

  // Determine what image to show:
  // - If hotspot has an image (items/cats), show that image
  // - Otherwise (conversations with Ashley like welcome, coffeeChair), show Ashley's portrait
  const isAshleyConversation = !hotspotData.image || hotspotId === 'welcome' || hotspotId === 'coffeeChair';

  // Store what type of dialog this is for portrait updates
  state.isAshleyDialog = isAshleyConversation;

  if (isAshleyConversation) {
    // Show Ashley's portrait with expressions
    const firstConversation = hotspotData.conversations?.[0];
    const initialPortrait = firstConversation?.portrait || 'default';
    portraitImg.src = getPortraitPath(initialPortrait);
    portraitImg.alt = 'Ashley';
    portraitContainer.classList.remove('cat-pettable');
  } else {
    // Show the item/cat image
    portraitImg.src = hotspotData.image;
    portraitImg.alt = hotspotData.name;

    // Add cat-pettable class for cats (hand cursor for petting)
    if (hotspotId === 'gertrude' || hotspotId === 'gherkin') {
      portraitContainer.classList.add('cat-pettable');
    } else {
      portraitContainer.classList.remove('cat-pettable');
    }
  }

  portraitImg.style.display = 'block';
  portraitImg.onerror = () => {
    // Fallback to Ashley portrait if item image fails
    portraitImg.src = getPortraitPath('default');
  };

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

  // Update portrait based on conversation mood (only for Ashley conversations)
  if (state.isAshleyDialog && conversation.portrait) {
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

let desktopInitialized = false;
let clockInterval = null;

function initDesktop() {
  // Only initialize once to prevent duplicate event listeners
  if (!desktopInitialized) {
    initDesktopIcons();
    initTaskbar();
    initStartMenu();
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
    desktopInitialized = true;
  }
}

function initDesktopIcons() {
  const icons = document.querySelectorAll('.desktop-icon');
  const desktopArea = document.getElementById('desktop-area');

  // Load saved positions
  loadIconPositions();

  // Track dragging state
  let draggedIcon = null;
  let dragOffset = { x: 0, y: 0 };
  let isDragging = false;
  let dragStartPos = { x: 0, y: 0 };

  icons.forEach(icon => {
    // Add keyboard accessibility
    icon.setAttribute('tabindex', '0');
    icon.setAttribute('role', 'button');

    // Mouse down - start potential drag
    icon.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Left click only

      draggedIcon = icon;
      isDragging = false;
      dragStartPos = { x: e.clientX, y: e.clientY };

      const rect = icon.getBoundingClientRect();
      dragOffset = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };

      // Select the icon
      icons.forEach(i => i.classList.remove('selected'));
      icon.classList.add('selected');

      e.preventDefault();
    });

    // Double click to open
    icon.addEventListener('dblclick', (e) => {
      if (isDragging) return;
      const app = e.currentTarget.dataset.app;
      const file = e.currentTarget.dataset.file;
      openApp(app, file);
    });

    // Keyboard support - Enter or Space to open
    icon.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const app = e.currentTarget.dataset.app;
        const file = e.currentTarget.dataset.file;
        openApp(app, file);
      }
    });
  });

  // Mouse move - handle dragging
  const iconsContainer = document.querySelector('.desktop-icons');

  document.addEventListener('mousemove', (e) => {
    if (!draggedIcon) return;

    // Check if we've moved enough to consider it a drag
    const dx = Math.abs(e.clientX - dragStartPos.x);
    const dy = Math.abs(e.clientY - dragStartPos.y);

    if (dx > 5 || dy > 5) {
      isDragging = true;
      draggedIcon.classList.add('dragging');

      const containerRect = iconsContainer.getBoundingClientRect();
      let newX = e.clientX - containerRect.left - dragOffset.x;
      let newY = e.clientY - containerRect.top - dragOffset.y;

      // Constrain to container area
      newX = Math.max(0, Math.min(newX, containerRect.width - 70));
      newY = Math.max(0, Math.min(newY, containerRect.height - 70));

      draggedIcon.style.position = 'absolute';
      draggedIcon.style.left = `${newX}px`;
      draggedIcon.style.top = `${newY}px`;
    }
  });

  // Mouse up - end drag
  document.addEventListener('mouseup', () => {
    if (draggedIcon) {
      draggedIcon.classList.remove('dragging');

      if (isDragging) {
        saveIconPositions();
      }

      draggedIcon = null;
      isDragging = false;
    }
  });

  // Click desktop to deselect
  desktopArea?.addEventListener('click', (e) => {
    if (e.target.id === 'desktop-area') {
      icons.forEach(i => i.classList.remove('selected'));
    }
  });
}

function saveIconPositions() {
  const icons = document.querySelectorAll('.desktop-icon');
  const positions = {};

  icons.forEach(icon => {
    const id = icon.dataset.app + (icon.dataset.file ? `-${icon.dataset.file}` : '');
    if (icon.style.left && icon.style.top) {
      positions[id] = {
        left: icon.style.left,
        top: icon.style.top
      };
    }
  });

  try {
    localStorage.setItem('desktop-icon-positions', JSON.stringify(positions));
  } catch (e) {
    console.warn('Could not save icon positions:', e);
  }
}

function loadIconPositions() {
  try {
    const saved = localStorage.getItem('desktop-icon-positions');
    if (!saved) return;

    const positions = JSON.parse(saved);
    const icons = document.querySelectorAll('.desktop-icon');

    icons.forEach(icon => {
      const id = icon.dataset.app + (icon.dataset.file ? `-${icon.dataset.file}` : '');
      if (positions[id]) {
        icon.style.position = 'absolute';
        icon.style.left = positions[id].left;
        icon.style.top = positions[id].top;
      }
    });
  } catch (e) {
    console.warn('Could not load icon positions:', e);
  }
}

function initTaskbar() {
  // Taskbar items are updated dynamically

  // Exit to room button
  const exitBtn = document.getElementById('exit-to-room-btn');
  exitBtn?.addEventListener('click', () => {
    transitionToRoomFromDesktop();
  });
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
        case 'about-computer':
          openApp('about-computer', 'specs');
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
    'work-detail': { width: '500px', height: '400px' },
    portfolio: { width: '550px', height: '450px' },
    'portfolio-viewer': { width: '600px', height: '500px' },
    game: { width: '650px', height: '500px' },
    accessibility: { width: '450px', height: '520px' },
    'about-computer': { width: '420px', height: '380px' },
    raiders: { width: '550px', height: '480px' },
    memory: { width: '420px', height: '500px' },
    minesweeper: { width: '340px', height: '440px' },
    casestudy: { width: '600px', height: '550px' },
    presentation: { width: '700px', height: '520px' }
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
    'work-detail': 'Project Details',
    portfolio: 'AI Portfolio - Explorer',
    'portfolio-viewer': 'Document Viewer',
    game: 'Project Trail - A Business Adventure',
    accessibility: 'Accessibility Options',
    'about-computer': 'About This Computer',
    raiders: 'Raiders of the Lost Doc',
    memory: 'Memory Match',
    minesweeper: 'Meeting Minesweeper',
    casestudy: 'Case Study',
    presentation: 'Presentation'
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
    case 'misc-folder':
      initMiscFolder(windowEl, fileId);
      windowEl.dataset.windowType = 'misc-folder';
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
    case 'portfolio':
      initPortfolio(windowEl);
      windowEl.dataset.windowType = 'workExamples';
      break;
    case 'portfolio-viewer':
      initPortfolioViewer(windowEl, fileId);
      windowEl.dataset.windowType = 'workExamples';
      break;
    case 'casestudy':
      initCaseStudy(windowEl, fileId);
      windowEl.dataset.windowType = 'workExamples';
      break;
    case 'presentation':
      initPresentation(windowEl, fileId);
      windowEl.dataset.windowType = 'workExamples';
      break;
    case 'game':
      initProjectTrail(windowEl);
      break;
    case 'catpong':
      initCatPong(windowEl);
      break;
    case 'raiders':
      initRaiders(windowEl);
      break;
    case 'memory':
      initMemory(windowEl);
      break;
    case 'minesweeper':
      initMinesweeper(windowEl);
      break;
    case 'accessibility':
      initAccessibilityWindow(windowEl);
      break;
    case 'about-computer':
      initAboutComputer(windowEl);
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

  // Download PDF button
  const downloadBtn = windowEl.querySelector('#resume-download');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      // Try to download the PDF file
      const link = document.createElement('a');
      link.href = 'assets/Ashley_Sarah_Resume.pdf';
      link.download = 'Ashley_Sarah_Resume.pdf';
      link.click();
    });
  }

  // Print button - opens print dialog for the resume content
  const printBtn = windowEl.querySelector('#resume-print');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const printContent = windowEl.querySelector('.wordpad-content').innerHTML;
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Ashley Sarah - Resume</title>
          <style>
            body { font-family: Georgia, serif; max-width: 800px; margin: 40px auto; padding: 20px; color: #333; line-height: 1.6; }
            h1 { font-size: 28px; margin-bottom: 5px; }
            h2 { font-size: 18px; border-bottom: 2px solid #333; padding-bottom: 5px; margin-top: 25px; }
            h3 { font-size: 15px; margin-bottom: 5px; }
            p { margin: 8px 0; }
            ul { margin: 10px 0; padding-left: 25px; }
            li { margin: 5px 0; }
            .resume-header { text-align: center; margin-bottom: 20px; }
            .resume-contact { font-size: 14px; color: #555; }
            @media print { body { margin: 0; padding: 20px; } }
          </style>
        </head>
        <body>${printContent}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    });
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

  const chatData = SITE_DATA.chat;

  // Add welcome message
  addChatMessage(chatArea, chatData.welcomeMessage, 'bot');

  // Add quick questions as the primary interaction method
  chatData.quickQuestions.forEach(q => {
    const btn = document.createElement('button');
    btn.className = 'quick-question';
    btn.textContent = q;
    btn.addEventListener('click', () => {
      sendChatMessage(chatArea, q, quickQuestions);
    });
    quickQuestions.appendChild(btn);
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

function sendChatMessage(chatArea, message, quickQuestionsEl) {
  // Add user message
  addChatMessage(chatArea, message, 'user');

  // Find response
  const chatData = SITE_DATA.chat;
  let responseData = chatData.responses[message];

  if (!responseData) {
    // Check for partial matches
    for (const [key, value] of Object.entries(chatData.responses)) {
      if (message.toLowerCase().includes(key.toLowerCase().split(' ')[0])) {
        responseData = value;
        break;
      }
    }
  }

  // Handle response - can be object with text/followUp or plain string (fallback)
  let responseText;
  let followUpQuestion = null;

  if (!responseData) {
    responseText = chatData.fallbackResponse;
  } else if (typeof responseData === 'object') {
    responseText = responseData.text;
    followUpQuestion = responseData.followUp;
  } else {
    responseText = responseData;
  }

  // Get quickQuestions element if not passed
  if (!quickQuestionsEl) {
    quickQuestionsEl = chatArea.closest('.messenger-content')?.querySelector('.messenger-quick-questions');
  }

  // Add bot response after delay
  setTimeout(() => {
    addChatMessage(chatArea, responseText, 'bot');

    // Update the quick questions area with follow-up or reset to main questions
    if (quickQuestionsEl) {
      setTimeout(() => {
        quickQuestionsEl.innerHTML = '';

        if (followUpQuestion) {
          // Show follow-up question and back button
          const followUpBtn = document.createElement('button');
          followUpBtn.className = 'quick-question';
          followUpBtn.textContent = followUpQuestion;
          followUpBtn.addEventListener('click', () => {
            sendChatMessage(chatArea, followUpQuestion, quickQuestionsEl);
          });
          quickQuestionsEl.appendChild(followUpBtn);

          const backBtn = document.createElement('button');
          backBtn.className = 'quick-question';
          backBtn.textContent = '← Back to questions';
          backBtn.style.background = '#f0f0f0';
          backBtn.style.color = '#666';
          backBtn.style.borderColor = '#ccc';
          backBtn.addEventListener('click', () => {
            resetQuickQuestions(quickQuestionsEl, chatArea);
          });
          quickQuestionsEl.appendChild(backBtn);
        } else {
          // Reset to main questions
          resetQuickQuestions(quickQuestionsEl, chatArea);
        }

        chatArea.scrollTop = chatArea.scrollHeight;
      }, 300);
    }
  }, 500 + Math.random() * 500);
}

function resetQuickQuestions(quickQuestionsEl, chatArea) {
  const chatData = SITE_DATA.chat;
  quickQuestionsEl.innerHTML = '';

  chatData.quickQuestions.forEach(q => {
    const btn = document.createElement('button');
    btn.className = 'quick-question';
    btn.textContent = q;
    btn.addEventListener('click', () => {
      sendChatMessage(chatArea, q, quickQuestionsEl);
    });
    quickQuestionsEl.appendChild(btn);
  });
}

function initFolder(windowEl) {
  const content = windowEl.querySelector('.folder-content');
  if (!content) return;

  content.innerHTML = SITE_DATA.workExamples.map(work => `
    <div class="folder-item" data-work-id="${work.id}" data-work-type="${work.type}" data-file-type="${work.fileType || ''}">
      <div class="folder-item-icon ${work.type === 'textfile' ? 'icon-txt' : ''}"></div>
      <span class="folder-item-name">${work.name}</span>
    </div>
  `).join('');

  // Add click handlers
  content.querySelectorAll('.folder-item').forEach(item => {
    item.addEventListener('dblclick', () => {
      const workId = item.dataset.workId;
      const workType = item.dataset.workType;
      const fileType = item.dataset.fileType;

      if (workType === 'textfile' && fileType) {
        // Open as notepad with easter egg content
        openApp('notepad', fileType);
      } else {
        openApp('work-detail', workId);
      }
    });
  });
}

function initMiscFolder(windowEl, folderId) {
  const content = windowEl.querySelector('.folder-content');
  const folderData = SITE_DATA.desktop.folders?.[folderId];

  if (!content || !folderData) return;

  // Update window title
  const titleEl = windowEl.querySelector('.window-title');
  if (titleEl) {
    titleEl.textContent = folderData.title;
  }

  content.innerHTML = folderData.items.map(item => `
    <div class="folder-item" data-item-id="${item.id}" data-item-type="${item.type}" data-item-app="${item.app || ''}" data-note-id="${item.noteId || ''}">
      <div class="folder-item-icon icon-${item.icon}"></div>
      <span class="folder-item-name">${item.name}</span>
    </div>
  `).join('');

  // Add click handlers
  content.querySelectorAll('.folder-item').forEach(item => {
    item.addEventListener('dblclick', () => {
      const itemId = item.dataset.itemId;
      const itemType = item.dataset.itemType;
      const itemApp = item.dataset.itemApp;
      const noteId = item.dataset.noteId;

      if (itemType === 'easter-egg') {
        // Open as notepad with easter egg content
        openApp('notepad', itemId);
      } else if (itemType === 'notepad' && noteId) {
        // Open notepad with specific content
        openApp('notepad', noteId);
      } else if (itemType === 'app' && itemApp) {
        // Open specified app
        openApp(itemApp, itemId);
      } else if (itemType === 'game' && itemApp) {
        // Open as game
        openApp(itemApp, itemId);
      }
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
// ABOUT THIS COMPUTER
// ============================================

function initAboutComputer(windowEl) {
  const content = windowEl.querySelector('.about-computer-content');
  if (!content) return;

  // Calculate some dynamic "specs"
  const yearsExp = new Date().getFullYear() - 2011;
  const remoteYears = new Date().getFullYear() - 2014;

  content.innerHTML = `
    <div class="about-computer-wrapper">
      <div class="about-computer-header">
        <div class="about-computer-logo">
          <span class="about-logo-icon">👩‍💻</span>
        </div>
        <div class="about-computer-title">
          <h2>HireMeOS 98</h2>
          <p class="about-subtitle">Ashley Edition</p>
        </div>
      </div>

      <div class="about-computer-specs">
        <div class="about-spec-group">
          <div class="about-spec">
            <span class="spec-label">Processor:</span>
            <span class="spec-value">Pattern Recognition Engine™ (${yearsExp} years optimized)</span>
          </div>
          <div class="about-spec">
            <span class="spec-label">Memory:</span>
            <span class="spec-value">"I have a doc for that" - 2TB indexed</span>
          </div>
          <div class="about-spec">
            <span class="spec-label">Remote Mode:</span>
            <span class="spec-value">Native since 2014 (${remoteYears} years)</span>
          </div>
        </div>

        <div class="about-divider"></div>

        <div class="about-spec-group">
          <div class="about-spec">
            <span class="spec-label">Gap Detection:</span>
            <span class="spec-value">Real-time, high-precision</span>
          </div>
          <div class="about-spec">
            <span class="spec-label">Translation Layer:</span>
            <span class="spec-value">Complex → Simple v3.0</span>
          </div>
          <div class="about-spec">
            <span class="spec-label">Async Support:</span>
            <span class="spec-value">Multi-timezone enabled</span>
          </div>
        </div>

        <div class="about-divider"></div>

        <div class="about-spec-group">
          <div class="about-spec">
            <span class="spec-label">Preferred Input:</span>
            <span class="spec-value">Context & clear goals</span>
          </div>
          <div class="about-spec">
            <span class="spec-label">Output Format:</span>
            <span class="spec-value">Actionable, documented, shipped</span>
          </div>
        </div>
      </div>

      <div class="about-computer-footer">
        <p>Serial No: ASHLEY-${new Date().getFullYear()}-OPS</p>
        <button class="about-ok-btn" id="about-ok-btn">OK</button>
      </div>
    </div>
  `;

  // OK button closes the window
  const okBtn = content.querySelector('#about-ok-btn');
  okBtn?.addEventListener('click', () => {
    const windowId = windowEl.id;
    closeWindow(windowId);
  });
}

// ============================================
// AI PORTFOLIO
// ============================================

function initPortfolio(windowEl) {
  const content = windowEl.querySelector('.portfolio-content');
  if (!content) return;

  const portfolio = SITE_DATA.portfolio;

  content.innerHTML = `
    <div class="portfolio-wrapper">
      <div class="portfolio-header">
        <h2>${portfolio.title}</h2>
        <p>${portfolio.description}</p>
      </div>
      <div class="portfolio-projects">
        ${portfolio.projects.map(project => `
          <div class="portfolio-project" data-project-id="${project.id}">
            <div class="portfolio-project-header">
              <span class="portfolio-project-icon">${project.icon}</span>
              <div class="portfolio-project-info">
                <span class="portfolio-project-title">${project.title}</span>
                <span class="portfolio-project-category">${project.category}</span>
              </div>
            </div>
            <p class="portfolio-project-summary">${project.summary}</p>
            <div class="portfolio-project-actions">
              <button class="portfolio-action" data-action="casestudy" data-project="${project.id}">
                📋 Case Study
              </button>
              <button class="portfolio-action" data-action="presentation" data-project="${project.id}">
                📊 Presentation
              </button>
              <button class="portfolio-action" data-action="document" data-project="${project.id}">
                📄 Full Document
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Add click handlers for action buttons
  content.querySelectorAll('.portfolio-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const projectId = btn.dataset.project;
      const project = portfolio.projects.find(p => p.id === projectId);

      if (!project) return;

      if (action === 'casestudy') {
        openApp('casestudy', projectId);
      } else if (action === 'presentation') {
        openApp('presentation', projectId);
      } else if (action === 'document') {
        // Open the HTML document in a new window/tab
        window.open(project.documentUrl, '_blank');
      }
    });
  });
}

function initCaseStudy(windowEl, projectId) {
  const content = windowEl.querySelector('.casestudy-content');
  if (!content || !projectId) return;

  const project = SITE_DATA.portfolio.projects.find(p => p.id === projectId);

  if (!project) {
    content.innerHTML = '<p>Project not found.</p>';
    return;
  }

  const cs = project.caseStudy;

  // Update window title
  const titleEl = windowEl.querySelector('.window-title');
  if (titleEl) {
    titleEl.textContent = project.title + ' - Case Study';
  }

  content.innerHTML = `
    <div class="casestudy-wrapper">
      <div class="casestudy-header">
        <span class="casestudy-icon">${project.icon}</span>
        <div class="casestudy-title-area">
          <h2>${project.title}</h2>
          <span class="casestudy-category">${project.category}</span>
        </div>
      </div>

      <div class="casestudy-section">
        <h3>🎯 The Challenge</h3>
        <p>${cs.challenge}</p>
      </div>

      <div class="casestudy-section">
        <h3>💡 My Approach</h3>
        <p>${cs.approach}</p>
      </div>

      <div class="casestudy-section">
        <h3>📦 Key Deliverables</h3>
        <ul class="casestudy-deliverables">
          ${cs.deliverables.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>

      <div class="casestudy-section">
        <h3>📈 The Impact</h3>
        <p>${cs.impact}</p>
      </div>

      <div class="casestudy-section">
        <h3>🛠️ Skills Applied</h3>
        <div class="casestudy-skills">
          ${cs.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>
      </div>

      <div class="casestudy-footer">
        <button class="casestudy-btn" id="view-presentation" data-project="${projectId}">
          📊 View Presentation
        </button>
        <button class="casestudy-btn secondary" id="view-document" data-url="${project.documentUrl}">
          📄 View Full Document
        </button>
      </div>
    </div>
  `;

  // Add button handlers
  content.querySelector('#view-presentation')?.addEventListener('click', () => {
    openApp('presentation', projectId);
  });

  content.querySelector('#view-document')?.addEventListener('click', () => {
    window.open(project.documentUrl, '_blank');
  });
}

function initPresentation(windowEl, projectId) {
  const content = windowEl.querySelector('.presentation-content');
  if (!content || !projectId) return;

  const project = SITE_DATA.portfolio.projects.find(p => p.id === projectId);

  if (!project || !project.presentation) {
    content.innerHTML = '<p>Presentation not found.</p>';
    return;
  }

  const pres = project.presentation;
  let currentSlide = 0;

  // Update window title
  const titleEl = windowEl.querySelector('.window-title');
  if (titleEl) {
    titleEl.textContent = pres.title + ' - Presentation';
  }

  function renderSlide() {
    const slide = pres.slides[currentSlide];
    const totalSlides = pres.slides.length;

    content.innerHTML = `
      <div class="presentation-wrapper">
        <div class="presentation-slide">
          ${currentSlide === 0 ? `
            <div class="presentation-title-slide">
              <span class="presentation-icon">${project.icon}</span>
              <h1>${pres.title}</h1>
              <p class="presentation-subtitle">${pres.subtitle}</p>
              <p class="presentation-author">Ashley Sarah</p>
            </div>
          ` : `
            <div class="presentation-content-slide">
              <h2>${slide.title}</h2>
              <div class="presentation-body">
                ${slide.content.split('\n').map(line =>
                  line.startsWith('•') ?
                    `<p class="presentation-bullet">${line}</p>` :
                    `<p>${line}</p>`
                ).join('')}
              </div>
            </div>
          `}
        </div>

        <div class="presentation-controls">
          <button class="pres-nav-btn" id="pres-prev" ${currentSlide === 0 ? 'disabled' : ''}>
            ◀ Prev
          </button>
          <span class="pres-counter">${currentSlide + 1} / ${totalSlides}</span>
          <button class="pres-nav-btn" id="pres-next" ${currentSlide === totalSlides - 1 ? 'disabled' : ''}>
            Next ▶
          </button>
        </div>

        <div class="presentation-progress">
          <div class="presentation-progress-bar" style="width: ${((currentSlide + 1) / totalSlides) * 100}%"></div>
        </div>
      </div>
    `;

    // Add navigation handlers
    content.querySelector('#pres-prev')?.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        renderSlide();
      }
    });

    content.querySelector('#pres-next')?.addEventListener('click', () => {
      if (currentSlide < pres.slides.length - 1) {
        currentSlide++;
        renderSlide();
      }
    });
  }

  renderSlide();

  // Add keyboard navigation
  const keyHandler = (e) => {
    if (!document.contains(windowEl)) {
      document.removeEventListener('keydown', keyHandler);
      return;
    }

    // Only handle if this window is focused
    const isActive = windowEl.style.zIndex === String(state.windowZIndex);
    if (!isActive) return;

    if (e.key === 'ArrowRight' || e.key === ' ') {
      if (currentSlide < pres.slides.length - 1) {
        currentSlide++;
        renderSlide();
      }
    } else if (e.key === 'ArrowLeft') {
      if (currentSlide > 0) {
        currentSlide--;
        renderSlide();
      }
    }
  };

  document.addEventListener('keydown', keyHandler);
}

function initPortfolioViewer(windowEl, fileId) {
  const content = windowEl.querySelector('.portfolio-viewer-content');
  if (!content || !fileId) return;

  // Legacy support - redirect to case study
  const project = SITE_DATA.portfolio.projects.find(p => p.id === fileId);
  if (project) {
    initCaseStudy(windowEl, fileId);
    return;
  }

  content.innerHTML = '<p>Document not found.</p>';
}

// ============================================
// PROJECT TRAIL GAME
// ============================================

let gameState = {
  stats: {},
  currentEvent: null,
  history: []
};

function initProjectTrail(windowEl) {
  const content = windowEl.querySelector('.game-content');
  if (!content) return;

  // Reset game state
  gameState = {
    stats: { ...SITE_DATA.projectTrail.startingStats },
    currentEvent: 'start',
    history: []
  };

  showGameIntro(content);
}

function showGameIntro(container) {
  const game = SITE_DATA.projectTrail;

  container.innerHTML = `
    <div class="game-intro">
      <div class="game-title-art">
        <pre class="game-ascii">
   ____            _           _     _____         _ _
  |  _ \\ _ __ ___ (_) ___  ___| |_  |_   _| __ __ _(_) |
  | |_) | '__/ _ \\| |/ _ \\/ __| __|   | || '__/ _\` | | |
  |  __/| | | (_) | |  __/ (__| |_    | || | | (_| | | |
  |_|   |_|  \\___// |\\___|\\___|\\__|   |_||_|  \\__,_|_|_|
                |__/
        </pre>
        <p class="game-subtitle">${game.subtitle}</p>
      </div>
      <div class="game-intro-text">
        ${game.intro.split('\n\n').map(p => `<p>${p}</p>`).join('')}
      </div>
      <button class="game-start-btn" id="game-start-btn">Begin Your Journey</button>
      <p class="game-hint">Tip: Your choices affect Sanity, Trust, Project Health, Documentation, and Morale</p>
    </div>
  `;

  container.querySelector('#game-start-btn').addEventListener('click', () => {
    showGameEvent(container);
  });
}

function showGameEvent(container) {
  const event = SITE_DATA.projectTrail.events.find(e => e.id === gameState.currentEvent);

  if (!event) {
    showGameEnding(container);
    return;
  }

  if (event.text === 'CALCULATING_RESULTS') {
    showGameEnding(container);
    return;
  }

  container.innerHTML = `
    <div class="game-event">
      <div class="game-stats-bar">
        <div class="game-stat" title="Sanity">🧠 ${gameState.stats.sanity}</div>
        <div class="game-stat" title="Stakeholder Trust">🤝 ${gameState.stats.stakeholderTrust}</div>
        <div class="game-stat" title="Project Health">📊 ${gameState.stats.projectHealth}</div>
        <div class="game-stat" title="Documentation">📝 ${gameState.stats.documentation}</div>
        <div class="game-stat" title="Team Morale">💪 ${gameState.stats.teamMorale}</div>
      </div>
      <div class="game-event-content">
        <h3 class="game-event-title">${event.title}</h3>
        <div class="game-event-text">
          ${event.text.split('\n').map(p => `<p>${p}</p>`).join('')}
        </div>
        <div class="game-choices">
          ${event.choices.map((choice, index) => `
            <button class="game-choice" data-index="${index}">
              ${choice.text}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Add click handlers
  container.querySelectorAll('.game-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      const choiceIndex = parseInt(btn.dataset.index);
      handleGameChoice(container, event, choiceIndex);
    });
  });
}

function handleGameChoice(container, event, choiceIndex) {
  const choice = event.choices[choiceIndex];

  // Apply effects
  if (choice.effects) {
    for (const [stat, change] of Object.entries(choice.effects)) {
      gameState.stats[stat] = Math.max(0, Math.min(100, gameState.stats[stat] + change));
    }
  }

  // Record history
  gameState.history.push({
    event: event.id,
    choice: choice.text
  });

  // Move to next event
  gameState.currentEvent = choice.nextEvent;

  // Show effects animation briefly
  showEffectsAnimation(container, choice.effects, () => {
    showGameEvent(container);
  });
}

function showEffectsAnimation(container, effects, callback) {
  if (!effects) {
    callback();
    return;
  }

  const effectsHtml = Object.entries(effects)
    .map(([stat, change]) => {
      const statNames = {
        sanity: '🧠 Sanity',
        stakeholderTrust: '🤝 Trust',
        projectHealth: '📊 Project',
        documentation: '📝 Docs',
        teamMorale: '💪 Morale'
      };
      const color = change > 0 ? 'green' : 'red';
      const sign = change > 0 ? '+' : '';
      return `<div class="effect-item ${color}">${statNames[stat]}: ${sign}${change}</div>`;
    })
    .join('');

  const overlay = document.createElement('div');
  overlay.className = 'game-effects-overlay';
  overlay.innerHTML = `<div class="game-effects">${effectsHtml}</div>`;
  container.appendChild(overlay);

  setTimeout(() => {
    overlay.remove();
    callback();
  }, 1000);
}

function showGameEnding(container) {
  const totalScore = Object.values(gameState.stats).reduce((a, b) => a + b, 0);
  const endings = SITE_DATA.projectTrail.endings;

  // Track high score
  const isNewBest = setHighScore('projecttrail', totalScore, 'high');
  const bestScore = getHighScore('projecttrail');

  let ending;
  if (totalScore >= endings.excellent.threshold) {
    ending = endings.excellent;
  } else if (totalScore >= endings.good.threshold) {
    ending = endings.good;
  } else if (totalScore >= endings.okay.threshold) {
    ending = endings.okay;
  } else {
    ending = endings.rough;
  }

  container.innerHTML = `
    <div class="game-ending">
      <div class="game-final-stats">
        <h4>Final Stats</h4>
        <div class="game-stats-grid">
          <div class="game-final-stat">🧠 Sanity: ${gameState.stats.sanity}</div>
          <div class="game-final-stat">🤝 Trust: ${gameState.stats.stakeholderTrust}</div>
          <div class="game-final-stat">📊 Project: ${gameState.stats.projectHealth}</div>
          <div class="game-final-stat">📝 Docs: ${gameState.stats.documentation}</div>
          <div class="game-final-stat">💪 Morale: ${gameState.stats.teamMorale}</div>
        </div>
        <div class="game-total-score">Total Score: ${totalScore}</div>
        <div class="game-best-score ${isNewBest ? 'new-best' : ''}">
          ${isNewBest ? '🎉 New Personal Best!' : `Personal Best: ${bestScore}`}
        </div>
      </div>
      <div class="game-ending-content">
        <h2 class="game-ending-title">${ending.title}</h2>
        <div class="game-ending-text">
          ${ending.text.split('\n').map(p => `<p>${p}</p>`).join('')}
        </div>
      </div>
      <div class="game-ending-actions">
        <button class="game-restart-btn" id="game-restart">Play Again</button>
      </div>
      <p class="game-credit">Project Trail - Inspired by the operations life of Ashley Sarah</p>
    </div>
  `;

  container.querySelector('#game-restart').addEventListener('click', () => {
    gameState = {
      stats: { ...SITE_DATA.projectTrail.startingStats },
      currentEvent: 'start',
      history: []
    };
    showGameIntro(container);
  });
}

// ============================================
// CAT PONG - HIDDEN MINI GAME
// ============================================

function initCatPong(windowEl) {
  const canvas = windowEl.querySelector('#catpong-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const scoreLeftEl = windowEl.querySelector('#score-left');
  const scoreRightEl = windowEl.querySelector('#score-right');
  const bestEl = windowEl.querySelector('#catpong-best');

  // Load and display high score
  const currentBest = getHighScore('catpong');
  if (currentBest !== null && bestEl) {
    bestEl.textContent = `Best: ${currentBest}`;
  }

  // Game state
  const game = {
    running: false,
    paused: false,
    scoreLeft: 0,
    scoreRight: 0,
    ball: { x: 200, y: 150, vx: 4, vy: 3, radius: 8 },
    paddleLeft: { y: 125, height: 50, width: 10 },
    paddleRight: { y: 125, height: 50, width: 10 },
    paddleSpeed: 6,
    keys: {}
  };

  // Cat faces for paddles
  const catLeft = ">'.'<";  // Gertrude - calm
  const catRight = ">^.^<"; // Gherkin - excited

  function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw center line
    ctx.strokeStyle = '#333';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles as cat faces
    ctx.fillStyle = '#d4a9a0';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';

    // Left paddle (Gertrude)
    ctx.save();
    ctx.translate(15, game.paddleLeft.y + game.paddleLeft.height / 2);
    ctx.fillText(catLeft, 0, 5);
    ctx.restore();

    // Right paddle (Gherkin)
    ctx.save();
    ctx.translate(canvas.width - 15, game.paddleRight.y + game.paddleRight.height / 2);
    ctx.fillText(catRight, 0, 5);
    ctx.restore();

    // Draw ball (yarn ball)
    ctx.beginPath();
    ctx.arc(game.ball.x, game.ball.y, game.ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#c88530';
    ctx.fill();
    ctx.strokeStyle = '#a06820';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw "start" message if not running
    if (!game.running) {
      ctx.fillStyle = '#f5f0e6';
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Press SPACE to start', canvas.width / 2, canvas.height / 2);
      ctx.font = '12px monospace';
      ctx.fillText('W/S or ↑/↓ to move', canvas.width / 2, canvas.height / 2 + 25);
    }
  }

  function update() {
    if (!game.running || game.paused) return;

    // Simple AI for left paddle
    const paddleCenter = game.paddleLeft.y + game.paddleLeft.height / 2;
    if (paddleCenter < game.ball.y - 20) {
      game.paddleLeft.y = Math.min(canvas.height - game.paddleLeft.height, game.paddleLeft.y + game.paddleSpeed * 0.7);
    } else if (paddleCenter > game.ball.y + 20) {
      game.paddleLeft.y = Math.max(0, game.paddleLeft.y - game.paddleSpeed * 0.7);
    }

    // Move player paddle (right) based on keys
    if (game.keys['w'] || game.keys['W'] || game.keys['ArrowUp']) {
      game.paddleRight.y = Math.max(0, game.paddleRight.y - game.paddleSpeed);
    }
    if (game.keys['s'] || game.keys['S'] || game.keys['ArrowDown']) {
      game.paddleRight.y = Math.min(canvas.height - game.paddleRight.height, game.paddleRight.y + game.paddleSpeed);
    }

    // Move ball
    game.ball.x += game.ball.vx;
    game.ball.y += game.ball.vy;

    // Ball collision with top/bottom
    if (game.ball.y - game.ball.radius <= 0 || game.ball.y + game.ball.radius >= canvas.height) {
      game.ball.vy *= -1;
    }

    // Ball collision with paddles
    // Left paddle
    if (game.ball.x - game.ball.radius <= 25 &&
        game.ball.y >= game.paddleLeft.y &&
        game.ball.y <= game.paddleLeft.y + game.paddleLeft.height) {
      game.ball.vx = Math.abs(game.ball.vx) * 1.05;
      game.ball.x = 25 + game.ball.radius;
    }

    // Right paddle
    if (game.ball.x + game.ball.radius >= canvas.width - 25 &&
        game.ball.y >= game.paddleRight.y &&
        game.ball.y <= game.paddleRight.y + game.paddleRight.height) {
      game.ball.vx = -Math.abs(game.ball.vx) * 1.05;
      game.ball.x = canvas.width - 25 - game.ball.radius;
    }

    // Scoring
    if (game.ball.x < 0) {
      // Ball went off left - player (right) scores
      game.scoreRight++;
      scoreRightEl.textContent = game.scoreRight;
      // Track high score for player
      const isNewBest = setHighScore('catpong', game.scoreRight, 'high');
      if (bestEl) {
        bestEl.textContent = `Best: ${getHighScore('catpong')}`;
        if (isNewBest) {
          bestEl.classList.add('new-best');
          setTimeout(() => bestEl.classList.remove('new-best'), 1000);
        }
      }
      resetBall();
    } else if (game.ball.x > canvas.width) {
      // Ball went off right - AI (left) scores
      game.scoreLeft++;
      scoreLeftEl.textContent = game.scoreLeft;
      resetBall();
    }

    // Cap speed
    const maxSpeed = 12;
    game.ball.vx = Math.max(-maxSpeed, Math.min(maxSpeed, game.ball.vx));
  }

  function resetBall() {
    game.ball.x = canvas.width / 2;
    game.ball.y = canvas.height / 2;
    game.ball.vx = (Math.random() > 0.5 ? 1 : -1) * 4;
    game.ball.vy = (Math.random() - 0.5) * 6;
  }

  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  // Key handlers
  function handleKeyDown(e) {
    game.keys[e.key] = true;
    if (e.key === ' ' && !game.running) {
      game.running = true;
      resetBall();
    }
    if (['w', 's', 'W', 'S', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
      e.preventDefault();
    }
  }

  function handleKeyUp(e) {
    game.keys[e.key] = false;
  }

  // Add event listeners
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  // Clean up when window closes
  const observer = new MutationObserver((mutations) => {
    if (!document.contains(windowEl)) {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Start game loop
  draw();
  gameLoop();
}

// ============================================
// RAIDERS OF THE LOST DOC - Adventure Game
// ============================================

function initRaiders(windowEl) {
  const content = windowEl.querySelector('.raiders-content');
  if (!content) return;

  const game = SITE_DATA.raiders;
  showRaidersIntro(content, game);
}

function showRaidersIntro(container, game) {
  container.innerHTML = `
    <div class="raiders-intro">
      <div class="raiders-title">
        <pre class="raiders-ascii">
  ____       _     _
 |  _ \\ __ _(_) __| | ___ _ __ ___
 | |_) / _\` | |/ _\` |/ _ \\ '__/ __|
 |  _ < (_| | | (_| |  __/ |  \\__ \\
 |_| \\_\\__,_|_|\\__,_|\\___|_|  |___/
    of the Lost Doc
        </pre>
        <p class="raiders-subtitle">${game.subtitle}</p>
      </div>
      <div class="raiders-intro-text">
        ${game.intro.split('\n\n').map(p => `<p>${p}</p>`).join('')}
      </div>
      <button class="raiders-start-btn" id="raiders-start">Begin Your Quest</button>
    </div>
  `;

  container.querySelector('#raiders-start').addEventListener('click', () => {
    showRaidersScene(container, game, 'start');
  });
}

function showRaidersScene(container, game, sceneId) {
  const scene = game.scenes[sceneId];
  if (!scene) {
    showRaidersIntro(container, game);
    return;
  }

  const isVictory = sceneId === 'q3-right';

  container.innerHTML = `
    <div class="raiders-scene ${isVictory ? 'raiders-victory' : ''}">
      <div class="raiders-location">
        <span class="raiders-location-icon">📍</span>
        <span class="raiders-location-name">${scene.title}</span>
      </div>
      <div class="raiders-narrative">
        ${scene.text.split('\n\n').map(p => `<p>${p}</p>`).join('')}
      </div>
      <div class="raiders-choices">
        ${scene.choices.map((choice, i) => `
          <button class="raiders-choice ${choice.text.includes('VICTORY') ? 'raiders-choice-victory' : ''}" data-next="${choice.next}">
            ${choice.text}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.raiders-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = btn.dataset.next;
      showRaidersScene(container, game, next);
    });
  });
}

// ============================================
// MEMORY MATCH GAME
// ============================================

function initMemory(windowEl) {
  const content = windowEl.querySelector('.memory-content');
  if (!content) return;

  // Office-themed icons for matching
  const icons = ['📁', '📄', '💾', '🖨️', '📧', '📊', '🗂️', '💼'];
  let cards = [...icons, ...icons]; // Pairs
  let flipped = [];
  let matched = [];
  let moves = 0;
  let canFlip = true;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function render() {
    const isWon = matched.length === cards.length;
    const bestScore = getHighScore('memory');
    let isNewBest = false;

    // Check for new best when won
    if (isWon && moves > 0) {
      isNewBest = setHighScore('memory', moves, 'low');
    }

    content.innerHTML = `
      <div class="memory-wrapper">
        <div class="memory-header">
          <span class="memory-moves">Moves: ${moves}</span>
          <span class="memory-best">${bestScore ? `Best: ${bestScore}` : ''}</span>
          <span class="memory-matched">Matched: ${matched.length / 2}/${icons.length}</span>
        </div>
        <div class="memory-grid">
          ${cards.map((icon, i) => `
            <button class="memory-card ${flipped.includes(i) || matched.includes(i) ? 'flipped' : ''} ${matched.includes(i) ? 'matched' : ''}" data-index="${i}">
              <span class="memory-card-front">?</span>
              <span class="memory-card-back">${icon}</span>
            </button>
          `).join('')}
        </div>
        ${isWon ? `
          <div class="memory-win">
            <p>🎉 You Win!</p>
            <p>Completed in ${moves} moves${isNewBest ? ' - NEW BEST!' : ''}</p>
            <button class="memory-restart" id="memory-restart">Play Again</button>
          </div>
        ` : ''}
      </div>
    `;

    // Add click handlers
    content.querySelectorAll('.memory-card:not(.matched)').forEach(card => {
      card.addEventListener('click', () => {
        if (!canFlip) return;
        const index = parseInt(card.dataset.index);
        if (flipped.includes(index)) return;

        flipCard(index);
      });
    });

    // Restart button
    const restartBtn = content.querySelector('#memory-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        cards = shuffle([...icons, ...icons]);
        flipped = [];
        matched = [];
        moves = 0;
        canFlip = true;
        render();
      });
    }
  }

  function flipCard(index) {
    flipped.push(index);
    render();

    if (flipped.length === 2) {
      moves++;
      canFlip = false;

      const [first, second] = flipped;
      if (cards[first] === cards[second]) {
        // Match found
        matched.push(first, second);
        flipped = [];
        canFlip = true;
        render();
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          flipped = [];
          canFlip = true;
          render();
        }, 1000);
      }
    }
  }

  // Shuffle and start
  cards = shuffle(cards);
  render();
}

// ============================================
// MEETING MINESWEEPER
// ============================================

function initMinesweeper(windowEl) {
  const content = windowEl.querySelector('.minesweeper-content');
  if (!content) return;

  const ROWS = 9;
  const COLS = 9;
  const MINES = 10;

  let board = [];
  let revealed = [];
  let flagged = [];
  let gameOver = false;
  let gameWon = false;
  let firstClick = true;
  let minesLeft = MINES;
  let timer = 0;
  let timerInterval = null;

  // Meeting-themed mine messages
  const meetingTypes = [
    '📅 "Quick sync"',
    '📅 "Touch base"',
    '📅 "All-hands"',
    '📅 "Retro"',
    '📅 "Brainstorm"',
    '📅 "Status update"',
    '📅 "1:1"',
    '📅 "Planning"',
    '📅 "Review"',
    '📅 "Standup"'
  ];

  function initBoard(safeRow, safeCol) {
    // Create empty board
    board = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
    revealed = Array(ROWS).fill(null).map(() => Array(COLS).fill(false));
    flagged = Array(ROWS).fill(null).map(() => Array(COLS).fill(false));

    // Place mines (avoiding first click area)
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);

      // Don't place mine on or adjacent to first click
      const isSafe = Math.abs(r - safeRow) <= 1 && Math.abs(c - safeCol) <= 1;

      if (board[r][c] !== -1 && !isSafe) {
        board[r][c] = -1; // -1 = mine (meeting)
        minesPlaced++;
      }
    }

    // Calculate numbers
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c] === -1) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc] === -1) {
              count++;
            }
          }
        }
        board[r][c] = count;
      }
    }
  }

  function reveal(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (revealed[r][c] || flagged[r][c]) return;

    revealed[r][c] = true;

    if (board[r][c] === -1) {
      gameOver = true;
      revealAll();
      return;
    }

    // Auto-reveal adjacent cells if 0
    if (board[r][c] === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          reveal(r + dr, c + dc);
        }
      }
    }

    checkWin();
  }

  function revealAll() {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        revealed[r][c] = true;
      }
    }
  }

  function toggleFlag(r, c) {
    if (revealed[r][c] || gameOver || gameWon) return;
    flagged[r][c] = !flagged[r][c];
    minesLeft += flagged[r][c] ? -1 : 1;
  }

  function checkWin() {
    let unrevealedSafe = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!revealed[r][c] && board[r][c] !== -1) {
          unrevealedSafe++;
        }
      }
    }
    if (unrevealedSafe === 0) {
      gameWon = true;
      revealAll();
    }
  }

  function getCellContent(r, c) {
    if (!revealed[r][c]) {
      return flagged[r][c] ? '🚩' : '';
    }
    if (board[r][c] === -1) {
      return '📅';
    }
    if (board[r][c] === 0) {
      return '';
    }
    return board[r][c];
  }

  function getCellClass(r, c) {
    let cls = 'ms-cell';
    if (revealed[r][c]) {
      cls += ' revealed';
      if (board[r][c] === -1) {
        cls += ' mine';
      } else if (board[r][c] > 0) {
        cls += ` num-${board[r][c]}`;
      }
    } else if (flagged[r][c]) {
      cls += ' flagged';
    }
    return cls;
  }

  function render() {
    const statusEmoji = gameOver ? '😵' : gameWon ? '😎' : '🙂';
    const bestTime = getHighScore('minesweeper');
    let isNewBest = false;

    // Check for new best when won
    if (gameWon && timer > 0) {
      isNewBest = setHighScore('minesweeper', timer, 'low');
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }

    // Stop timer on game over
    if (gameOver && timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }

    content.innerHTML = `
      <div class="ms-wrapper">
        <div class="ms-header">
          <div class="ms-counter">${String(minesLeft).padStart(3, '0')}</div>
          <button class="ms-face" id="ms-reset">${statusEmoji}</button>
          <div class="ms-counter">${String(Math.min(timer, 999)).padStart(3, '0')}</div>
        </div>
        ${bestTime ? `<div class="ms-best">Best: ${bestTime}s</div>` : ''}
        <div class="ms-board">
          ${board.map((row, r) =>
            row.map((_, c) =>
              `<button class="${getCellClass(r, c)}" data-r="${r}" data-c="${c}">${getCellContent(r, c)}</button>`
            ).join('')
          ).join('')}
        </div>
        ${gameOver ? `<div class="ms-message ms-lose">📅 Meeting ambush! You've been scheduled.</div>` : ''}
        ${gameWon ? `<div class="ms-message ms-win">🎉 Calendar defended!${isNewBest ? ' NEW BEST TIME!' : ''}</div>` : ''}
      </div>
    `;

    // Reset button
    content.querySelector('#ms-reset').addEventListener('click', () => {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      board = [];
      revealed = [];
      flagged = [];
      gameOver = false;
      gameWon = false;
      firstClick = true;
      minesLeft = MINES;
      timer = 0;
      render();
    });

    // Cell clicks
    content.querySelectorAll('.ms-cell').forEach(cell => {
      const r = parseInt(cell.dataset.r);
      const c = parseInt(cell.dataset.c);

      cell.addEventListener('click', () => {
        if (gameOver || gameWon) return;

        if (firstClick) {
          initBoard(r, c);
          firstClick = false;
          // Start timer
          timerInterval = setInterval(() => {
            timer++;
            const timerEl = content.querySelector('.ms-counter:last-child');
            if (timerEl) {
              timerEl.textContent = String(Math.min(timer, 999)).padStart(3, '0');
            }
          }, 1000);
        }

        reveal(r, c);
        render();
      });

      cell.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (gameOver || gameWon || firstClick) return;
        toggleFlag(r, c);
        render();
      });
    });
  }

  // Initial render (empty board until first click)
  board = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
  revealed = Array(ROWS).fill(null).map(() => Array(COLS).fill(false));
  flagged = Array(ROWS).fill(null).map(() => Array(COLS).fill(false));
  render();
}

// ============================================
// GERTRUDE - PHILOSOPHICAL CAT (AUTO + CLICK)
// ============================================

let gertrudeThoughtIndex = 0;
let gertrudeAutoTimer = null;
let gertrudeHideTimer = null;

function initGertrude() {
  const gertrudeIcon = document.getElementById('gertrude-click');
  const bubble = document.getElementById('gertrude-bubble');
  const messageEl = document.getElementById('gertrude-message');

  if (!gertrudeIcon || !bubble || !messageEl) return;

  // Shuffle thoughts on load for variety
  if (SITE_DATA.gertrude?.thoughts) {
    shuffleArray(SITE_DATA.gertrude.thoughts);
  }

  // Click Gertrude to show a thought (and reset auto-timer)
  gertrudeIcon.addEventListener('click', () => {
    if (bubble.classList.contains('hidden')) {
      showGertrudeThought(true); // true = manual trigger
    } else {
      hideGertrudeBubble();
    }
  });

  // Click bubble to dismiss
  bubble.addEventListener('click', () => {
    hideGertrudeBubble();
  });

  // Start the auto-thought timer
  scheduleNextGertrudeThought();
}

function scheduleNextGertrudeThought() {
  // Clear any existing timer
  if (gertrudeAutoTimer) {
    clearTimeout(gertrudeAutoTimer);
  }

  // Schedule next thought in 45-75 seconds (randomized)
  const delay = 45000 + Math.random() * 30000;
  gertrudeAutoTimer = setTimeout(() => {
    // Only auto-show if on desktop scene and bubble is hidden
    const desktopScene = document.getElementById('desktop-scene');
    const bubble = document.getElementById('gertrude-bubble');

    if (desktopScene && !desktopScene.classList.contains('hidden') &&
        bubble && bubble.classList.contains('hidden')) {
      showGertrudeThought(false); // false = auto trigger
    }

    // Schedule the next one
    scheduleNextGertrudeThought();
  }, delay);
}

function showGertrudeThought(isManual = false) {
  const bubble = document.getElementById('gertrude-bubble');
  const messageEl = document.getElementById('gertrude-message');
  const thoughts = SITE_DATA.gertrude?.thoughts || [];

  if (!bubble || !messageEl || thoughts.length === 0) return;

  // Clear any existing hide timer
  if (gertrudeHideTimer) {
    clearTimeout(gertrudeHideTimer);
  }

  // If manually triggered, reset the auto-timer
  if (isManual) {
    scheduleNextGertrudeThought();
  }

  // Get next thought (cycles through all)
  const thought = thoughts[gertrudeThoughtIndex % thoughts.length];
  gertrudeThoughtIndex++;

  // Show the thought
  messageEl.textContent = thought;
  bubble.classList.remove('hidden');

  // Auto-hide after 8 seconds (gives time to read)
  gertrudeHideTimer = setTimeout(() => {
    hideGertrudeBubble();
  }, 8000);
}

function hideGertrudeBubble() {
  const bubble = document.getElementById('gertrude-bubble');
  if (bubble) {
    bubble.classList.add('hidden');
  }
  // Clear hide timer if manually dismissed
  if (gertrudeHideTimer) {
    clearTimeout(gertrudeHideTimer);
    gertrudeHideTimer = null;
  }
}

// Utility: Shuffle array in place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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

  // Initialize accessibility FIRST (before any visual rendering)
  initAccessibility();

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

  // Initialize image lightbox
  initImageLightbox();

  // Show welcome dialog
  showWelcomeDialog();
}

// ============================================
// IMAGE LIGHTBOX
// ============================================

function initImageLightbox() {
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const closeBtn = lightbox?.querySelector('.image-lightbox-close');

  // Close lightbox on background click
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxImg) {
      closeLightbox();
    }
  });

  // Close button
  closeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });

  // Make dialog portrait image clickable to expand
  document.addEventListener('click', (e) => {
    const portraitImg = e.target.closest('#dialog-portrait-img');
    if (portraitImg && portraitImg.src) {
      openLightbox(portraitImg.src);
    }
  });
}

function closeLightbox() {
  const lightbox = document.getElementById('image-lightbox');
  if (lightbox) {
    lightbox.classList.add('hidden');
  }
}

function openLightbox(imageSrc) {
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-image');

  if (lightbox && lightboxImg) {
    lightboxImg.src = imageSrc;
    lightbox.classList.remove('hidden');
  }
}

function showWelcomeDialog() {
  const welcomeData = SITE_DATA.hotspots.welcome;
  if (welcomeData) {
    openDialog('welcome', welcomeData);
  }
}

// ============================================
// ACCESSIBILITY SETTINGS
// ============================================

const accessibilitySettings = {
  highContrast: false,
  largeText: false,
  dyslexiaFont: false,
  focusIndicators: false,
  singleClick: false,
  reducedMotion: false,
  screenReaderMode: false
};

// CSS class mapping for each setting
const settingClasses = {
  highContrast: 'a11y-high-contrast',
  largeText: 'a11y-large-text',
  dyslexiaFont: 'a11y-dyslexia-font',
  focusIndicators: 'a11y-focus-indicators',
  singleClick: 'a11y-single-click',
  reducedMotion: 'a11y-reduced-motion',
  screenReaderMode: 'a11y-screen-reader'
};

function initAccessibility() {
  // Load saved settings from localStorage
  loadAccessibilitySettings();

  // Apply loaded settings
  applyAccessibilitySettings();

  // Initialize room accessibility button
  initRoomAccessibilityButton();

  // Initialize quick panel
  initQuickAccessibilityPanel();

  // Respect prefers-reduced-motion on first load
  if (!localStorage.getItem('a11y-settings')) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      accessibilitySettings.reducedMotion = true;
      applyAccessibilitySettings();
      saveAccessibilitySettings();
    }
  }
}

function loadAccessibilitySettings() {
  try {
    const saved = localStorage.getItem('a11y-settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(accessibilitySettings, parsed);
    }
  } catch (e) {
    console.warn('Could not load accessibility settings:', e);
  }
}

function saveAccessibilitySettings() {
  try {
    localStorage.setItem('a11y-settings', JSON.stringify(accessibilitySettings));
  } catch (e) {
    console.warn('Could not save accessibility settings:', e);
  }
}

function applyAccessibilitySettings() {
  // Apply/remove classes based on settings
  for (const [setting, enabled] of Object.entries(accessibilitySettings)) {
    const className = settingClasses[setting];
    if (className) {
      document.body.classList.toggle(className, enabled);
    }
  }

  // Update single-click mode for desktop icons
  updateSingleClickMode();

  // Update all checkboxes in accessibility windows and quick panel
  updateAccessibilityUI();

  // Announce change for screen readers
  if (accessibilitySettings.screenReaderMode) {
    announceForScreenReader('Accessibility settings updated');
  }
}

function updateSingleClickMode() {
  // This is handled by checking accessibilitySettings.singleClick in click handlers
  // Re-initialize desktop icons if they exist
  const icons = document.querySelectorAll('.desktop-icon');
  icons.forEach(icon => {
    // Remove existing listeners by cloning
    const newIcon = icon.cloneNode(true);
    icon.parentNode.replaceChild(newIcon, icon);

    // Add appropriate listener
    if (accessibilitySettings.singleClick) {
      newIcon.addEventListener('click', (e) => {
        const app = e.currentTarget.dataset.app;
        const file = e.currentTarget.dataset.file;
        openApp(app, file);
      });
    } else {
      newIcon.addEventListener('dblclick', (e) => {
        const app = e.currentTarget.dataset.app;
        const file = e.currentTarget.dataset.file;
        openApp(app, file);
      });
      newIcon.addEventListener('click', (e) => {
        document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
        e.currentTarget.classList.add('selected');
      });
    }

    // Add keyboard support
    newIcon.setAttribute('tabindex', '0');
    newIcon.setAttribute('role', 'button');
    newIcon.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const app = e.currentTarget.dataset.app;
        const file = e.currentTarget.dataset.file;
        openApp(app, file);
      }
    });
  });
}

function updateAccessibilityUI() {
  // Update checkboxes in accessibility window
  for (const [setting, enabled] of Object.entries(accessibilitySettings)) {
    const checkbox = document.querySelector(`[data-setting="${setting}"]`);
    if (checkbox && checkbox.type === 'checkbox') {
      checkbox.checked = enabled;
    }
  }

  // Update quick panel toggles
  document.querySelectorAll('.a11y-quick-toggle').forEach(btn => {
    const setting = btn.dataset.setting;
    if (setting && accessibilitySettings[setting] !== undefined) {
      btn.classList.toggle('active', accessibilitySettings[setting]);
    }
  });
}

function toggleAccessibilitySetting(setting, value = null) {
  if (accessibilitySettings[setting] !== undefined) {
    accessibilitySettings[setting] = value !== null ? value : !accessibilitySettings[setting];
    applyAccessibilitySettings();
    saveAccessibilitySettings();
  }
}

function resetAccessibilitySettings() {
  for (const key of Object.keys(accessibilitySettings)) {
    accessibilitySettings[key] = false;
  }
  applyAccessibilitySettings();
  saveAccessibilitySettings();
}

function initRoomAccessibilityButton() {
  const btn = document.getElementById('room-accessibility-btn');
  const panel = document.getElementById('a11y-quick-panel');

  if (btn && panel) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('visible');

      // Focus first toggle when opening
      if (panel.classList.contains('visible')) {
        const firstToggle = panel.querySelector('.a11y-quick-toggle');
        if (firstToggle) firstToggle.focus();
      }
    });
  }
}

function initQuickAccessibilityPanel() {
  const panel = document.getElementById('a11y-quick-panel');
  const closeBtn = document.getElementById('a11y-quick-close');
  const openFullBtn = document.getElementById('a11y-open-full');

  if (!panel) return;

  // Close button
  closeBtn?.addEventListener('click', () => {
    panel.classList.remove('visible');
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (panel.classList.contains('visible') &&
        !panel.contains(e.target) &&
        e.target.id !== 'room-accessibility-btn') {
      panel.classList.remove('visible');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('visible')) {
      panel.classList.remove('visible');
    }
  });

  // Quick toggles
  panel.querySelectorAll('.a11y-quick-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const setting = btn.dataset.setting;
      toggleAccessibilitySetting(setting);
    });
  });

  // Open full settings
  openFullBtn?.addEventListener('click', () => {
    panel.classList.remove('visible');
    // Go to desktop and open accessibility panel
    if (state.currentScene !== 'desktop') {
      transitionToDesktop(() => {
        openApp('accessibility', 'settings');
      });
    } else {
      openApp('accessibility', 'settings');
    }
  });
}

function initAccessibilityWindow(windowEl) {
  const applyBtn = windowEl.querySelector('#a11y-apply');
  const resetBtn = windowEl.querySelector('#a11y-reset');

  // Set initial checkbox states
  windowEl.querySelectorAll('[data-setting]').forEach(input => {
    const setting = input.dataset.setting;
    if (accessibilitySettings[setting] !== undefined) {
      input.checked = accessibilitySettings[setting];
    }

    // Add change listeners
    input.addEventListener('change', () => {
      toggleAccessibilitySetting(setting, input.checked);
    });
  });

  // Apply & Close button
  applyBtn?.addEventListener('click', () => {
    // Settings are already applied in real-time, just close
    const windowId = windowEl.id;
    closeWindow(windowId);
  });

  // Reset button
  resetBtn?.addEventListener('click', () => {
    resetAccessibilitySettings();
    // Update all checkboxes
    windowEl.querySelectorAll('[data-setting]').forEach(input => {
      input.checked = false;
    });
  });
}

// Screen reader announcement helper
function announceForScreenReader(message) {
  let announcer = document.getElementById('sr-announcer');
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'sr-announcer';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
  }
  announcer.textContent = '';
  setTimeout(() => {
    announcer.textContent = message;
  }, 100);
}
