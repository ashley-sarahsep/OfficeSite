// ============================================
// ASHLEY SEPERS - PORTFOLIO CONVERSATION DATA
// ============================================
// Edit this file to update all content easily
// ============================================

const SITE_DATA = {
  // Personal info
  name: "Ashley Sepers",
  title: "Product Operations | Cross-Functional Leadership | Enablement | AI Adoption",
  email: "ashley.sepers@gmail.com",
  phone: "647.574.7721",
  linkedin: "linkedin.com/in/ashley-sarahsep",
  location: "Guelph, Ontario / Remote",

  // Boot sequence messages
  bootSequence: [
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
  ],

  // ============================================
  // ROOM HOTSPOT CONVERSATIONS
  // ============================================

  hotspots: {
    desk: {
      name: "Work Desk",
      image: "assets/images/desk.jpg", // Replace with actual photo
      portrait: "assets/images/ashley-portrait.jpg",
      conversations: [
        {
          id: "desk-intro",
          text: "Oh, hi there! This is my work-from-home setup. I've been remote since 2014 - before it was cool, honestly. This desk has seen everything from startup chaos to Fortune 500 client calls.",
          responses: [
            { text: "What do you love about remote work?", next: "desk-remote-love" },
            { text: "Tell me about your work history", next: "desk-work-history" },
            { text: "That's a lot of stickers on your laptop", next: "desk-stickers" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-remote-love",
          text: "The autonomy, mostly. Give me an ambiguous problem and trust me to figure it out - that's where I thrive. I don't need constant meetings or check-ins. I need interesting problems and the space to solve them. Plus, Huckleberry makes an excellent coworker.",
          responses: [
            { text: "Who's Huckleberry?", next: "desk-huckleberry-tease" },
            { text: "What kind of problems do you solve?", next: "desk-problems" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-huckleberry-tease",
          text: "My cat! He's around here somewhere. Usually on the pink chair. Very opinionated about video call backgrounds.",
          responses: [
            { text: "I should go find him", next: null },
            { text: "What kind of work do you do from here?", next: "desk-work-history" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-work-history",
          text: "I spent 7+ years at MainEvent, a field marketing SaaS platform. Joined when they were about 10 people with zero formal processes. Built the operational infrastructure from scratch - sales ops, enablement programs, QA processes, project management. The stuff that lets small teams do big things.",
          responses: [
            { text: "What's your proudest project?", next: "desk-neptune" },
            { text: "What do you mean by 'operational infrastructure'?", next: "desk-ops-explain" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-neptune",
          text: "Neptune Retail Solutions. Led the whole lifecycle - discovery, requirements, wireframes, QA process, then took over as PM when it went live. Daily scrums with the dev team, Jira board management, the works. Then transitioned to account manager, got it stable, handed it off clean. That's my pattern: see gaps, fill gaps, build systems, hand off.",
          responses: [
            { text: "That's a lot of hats to wear", next: "desk-swiss-army" },
            { text: "Tell me more about your approach", next: "desk-approach" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-swiss-army",
          text: "Swiss Army Knife Operator - that's what I call it. QA lead, project manager, sales enablement owner, strategic advisor, backup account manager. Often simultaneously. I excel at identifying what's missing and taking ownership without needing direction. Some people find ambiguity stressful. I find it interesting.",
          responses: [
            { text: "That sounds exhausting", next: "desk-exhausting" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-exhausting",
          text: "Ha! My brain actually works better this way - context-switching between wildly different problems, seeing patterns across domains. It's how I'm wired. What exhausts me is sitting in meetings that could've been async messages.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-ops-explain",
          text: "The invisible systems that keep organizations from falling apart. Contract workflows, demo preparation processes, documentation standards, client handoff protocols. The stuff nobody thinks about until it's missing. I built all of that from zero.",
          responses: [
            { text: "How do you approach building new systems?", next: "desk-approach" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-approach",
          text: "Ask 'why' constantly. Don't accept surface-level explanations or build solutions just because 'that's what's done.' Identify root causes, not symptoms. Design based on evidence and iteration. And always - always - design for humans as they actually are, not as you wish they'd be.",
          responses: [
            { text: "What do you mean by that last part?", next: "desk-hermeneutics" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-hermeneutics",
          text: "I studied philosophy - hermeneutics specifically. The art of interpretation. How people actually understand information versus how we assume they do. It shapes everything I build. Training programs, documentation, AI prompts. If you don't account for how humans process things under cognitive load, your technically 'correct' solution will fail.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-problems",
          text: "Gaps. I solve gaps. The work that doesn't clearly belong to one team. Communication breakdowns between technical and business stakeholders. New products that need adoption infrastructure. Projects that need someone to just... own them. I spot what's missing and take responsibility.",
          responses: [
            { text: "Give me an example", next: "desk-neptune" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-stickers",
          text: "Every sticker has a story. Conference swag, weird internet finds, a few from products I actually believe in. My laptop is basically a personality test.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        }
      ]
    },

    cat: {
      name: "Huckleberry",
      image: "assets/images/huckleberry.jpg", // Replace with actual photo
      portrait: "assets/images/ashley-portrait.jpg",
      conversations: [
        {
          id: "cat-intro",
          text: "That's Huckleberry! Named after the Doc Holliday line - 'I'll be your Huckleberry.' He's been my work-from-home companion through countless client calls and late-night debugging sessions.",
          responses: [
            { text: "Does he help with work?", next: "cat-help" },
            { text: "He looks very comfortable", next: "cat-comfortable" },
            { text: "I love the name", next: "cat-name" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "cat-help",
          text: "He's excellent at reminding me to take breaks. Also very good at walking across keyboards during important moments. His code reviews are... unconventional.",
          responses: [
            { text: "Has he ever caused any disasters?", next: "cat-disaster" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "cat-disaster",
          text: "Let's just say he's submitted some interesting Slack messages on my behalf. Nothing career-ending. Yet.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "cat-comfortable",
          text: "That's HIS chair now. I bought it for the office aesthetic, he claimed it for napping. Every office needs a cozy seat, right? He just decided it was his cozy seat.",
          responses: [
            { text: "Fair enough", next: null },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "cat-name",
          text: "Tombstone is a perfect movie and I will not be taking questions at this time. But also - when I applied to one job, I ended my cover letter with 'If this sounds good, I'd love to be your Huckleberry.' It felt right.",
          responses: [
            { text: "Did you get the job?", next: "cat-job" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "cat-job",
          text: "That one didn't work out, but the line lives on. Some companies want personality, some want corporate. Huckleberry helps me filter.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        }
      ]
    },

    leftBookshelf: {
      name: "Left Bookshelf",
      image: "assets/images/bookshelf-left.jpg", // Replace with actual photo
      portrait: "assets/images/ashley-portrait.jpg",
      conversations: [
        {
          id: "bookshelf-left-intro",
          text: "I found this wall unit about 10 years ago. It stores a lot of items that are close to my heart. Books, vintage finds, things I've collected over the years. Each shelf tells a different story.",
          responses: [
            { text: "What kind of books do you read?", next: "bookshelf-left-books" },
            { text: "Tell me about some of these objects", next: "bookshelf-left-objects" },
            { text: "You seem to like collecting things", next: "bookshelf-left-collecting" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-left-books",
          text: "Philosophy, mostly. Hermeneutics texts from university that I still reference. Some social work theory. A lot of fiction - I believe stories teach us how to understand people better than any business book. And yes, some business books. I'm not a purist.",
          responses: [
            { text: "What's hermeneutics?", next: "bookshelf-left-hermeneutics" },
            { text: "Any favorites?", next: "bookshelf-left-favorites" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-left-hermeneutics",
          text: "The art and science of interpretation. How people make meaning from texts, conversations, experiences. It sounds academic, but it's incredibly practical. When I design training programs or AI prompts, I'm always thinking about how someone will interpret this. What clarity looks like versus confusion.",
          responses: [
            { text: "How does that apply to your work?", next: "bookshelf-left-apply" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-left-apply",
          text: "Everything. When I built AI adoption programs, I thought about where models might misinterpret context. When I create enablement materials, I think about cognitive load. When I translate between technical and business teams, I'm really doing applied hermeneutics - making sure ideas don't get lost in translation.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-left-favorites",
          text: "I'd have to think about that one. The honest answer is that my favorites change depending on what problem I'm wrestling with. Books are tools for thinking, not trophies.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-left-objects",
          text: "Vintage finds, mostly. Things that caught my eye at estate sales, thrift stores, travels. I like objects with history - they've been somewhere, meant something to someone. That little globe has been with me through three apartments and one international move.",
          responses: [
            { text: "International move?", next: "bookshelf-left-london" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-left-london",
          text: "London, for a while. Worked at some agencies there - GroupM, Robert Walters. Started in accounts payable, ended up implementing timesheet systems. The pattern started early: see a gap, fill it, build something that lasts.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-left-collecting",
          text: "Guilty. It's the eclectic thing - I'm drawn to objects that have character, that feel like they belong together even if they're from completely different places and eras. My aesthetic is basically 'these things shouldn't work together but somehow they do.'",
          responses: [
            { text: "That sounds like your work style too", next: "bookshelf-left-meta" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-left-meta",
          text: "Ha. Yeah, actually. Taking things that shouldn't quite fit - QA and sales enablement, philosophy and AI testing, technical translation and change management - and making them work together. Maybe I am just collecting skills the way I collect vintage teapots.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        }
      ]
    },

    rightBookshelf: {
      name: "Right Bookshelf",
      image: "assets/images/bookshelf-right.jpg", // Replace with actual photo
      portrait: "assets/images/ashley-portrait.jpg",
      conversations: [
        {
          id: "bookshelf-right-intro",
          text: "This side's been with me for 20 years - one of the few pieces of furniture that's survived every move. It holds different things than the wall unit. More personal, I guess.",
          responses: [
            { text: "What makes it special?", next: "bookshelf-right-special" },
            { text: "20 years is a long time for furniture", next: "bookshelf-right-longevity" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-right-special",
          text: "It's the constant through every chapter. Different apartments, different cities, different careers. The stuff on these shelves maps to different versions of me. Some of it I'd choose again, some of it just... stayed.",
          responses: [
            { text: "Different careers?", next: "bookshelf-right-careers" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-right-careers",
          text: "Receptionist to accounts receivable at DDB. Accounts payable in London. Payroll systems. IBM reseller sales ops. Then MainEvent for 7+ years, which became like five different jobs in one. Philosophy student, social work student, self-taught everything else. It's been a winding path.",
          responses: [
            { text: "That's quite a range", next: "bookshelf-right-range" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-right-range",
          text: "I'm a self-taught generalist who figures things out through pattern recognition and asking 'why' constantly. Every role required mastering new systems without formal training. The bookshelf holds artifacts from all of it.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-right-longevity",
          text: "Good furniture should outlast trends. I found it at a thrift store when I was barely out of school and it's moved with me ever since. Guelph to Toronto to London to back again. Some things are worth keeping.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        }
      ]
    },

    radio: {
      name: "Vintage Radio",
      image: "assets/images/radio.jpg", // Replace with actual photo
      portrait: "assets/images/ashley-portrait.jpg",
      conversations: [
        {
          id: "radio-intro",
          text: "This radio doesn't actually work, but I love it anyway. There's something about vintage electronics - they were built to last, designed to be beautiful. Not like modern tech that's meant to be replaced.",
          responses: [
            { text: "Do you listen to music while you work?", next: "radio-music" },
            { text: "You seem drawn to vintage things", next: "radio-vintage" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "radio-music",
          text: "Always. Different genres for different work. Deep focus gets ambient or lo-fi. Creative work gets something with more energy. Debugging gets whatever keeps me from throwing the laptop out the window.",
          responses: [
            { text: "What's your go-to?", next: "radio-goto" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "radio-goto",
          text: "Honestly? It varies so much. My playlists are as eclectic as my bookshelves. Some days it's 90s alternative, some days it's film scores, some days it's whatever algorithm decided to serve me. I don't have a 'brand' when it comes to music.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "radio-vintage",
          text: "Vintage, mid-century modern, things with history. I like when you can see the craftsmanship, feel the intention behind the design. Modern minimalism is fine, but it often feels... soulless? Give me character over perfection.",
          responses: [
            { text: "That's kind of how you describe your work style", next: "radio-work-style" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "radio-work-style",
          text: "Maybe. I'd rather be authentic than polished. Direct communication over corporate speak. Solutions that actually work for humans over technically 'correct' approaches that nobody adopts. Character over perfection.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        }
      ]
    },

    art: {
      name: "Wall Art",
      image: "assets/images/art.jpg", // Replace with actual photo
      portrait: "assets/images/ashley-portrait.jpg",
      conversations: [
        {
          id: "art-intro",
          text: "I've collected these over time. Estate sales, antique shops, the occasional lucky find. I like art that feels lived-in - landscapes, pastoral scenes. Nothing too precious.",
          responses: [
            { text: "They create a nice atmosphere", next: "art-atmosphere" },
            { text: "Do you have a favorite?", next: "art-favorite" },
            { text: "The frames are beautiful", next: "art-frames" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "art-atmosphere",
          text: "That's the goal. I spend a lot of time in this room - remote work means your office is also your space. It should feel like somewhere you want to be, not a sterile workspace.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "art-favorite",
          text: "Honestly, it changes. Some days I notice one more than others. The landscapes especially - there's something about looking at a scene with depth and distance when you're staring at screens all day.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "art-frames",
          text: "Half the appeal, right? Ornate frames, a little worn, gold leaf that's seen better days. They've been somewhere, held something. The imperfections are the point.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        }
      ]
    },

    monitor: {
      name: "Computer Monitor",
      action: "openDesktop",
      hoverText: "Click to enter HireMeOS"
    }
  },

  // ============================================
  // HIREMEOS DESKTOP DATA
  // ============================================

  desktop: {
    osName: "HireMeOS 98",
    welcomeMessage: "Welcome, Visitor",

    // Desktop icons
    icons: [
      { id: "resume", name: "Resume.doc", icon: "doc", app: "wordpad" },
      { id: "about", name: "AboutMe.html", icon: "html", app: "myspace" },
      { id: "chat", name: "AshleyChat.exe", icon: "exe", app: "messenger" },
      { id: "work", name: "Work Examples", icon: "folder", app: "folder" },
      { id: "recycle", name: "Recycle Bin", icon: "recycle", app: "recycle" }
    ],

    // Taskbar quick links
    taskbarLinks: [
      { name: "Email", action: "mailto:ashley.sepers@gmail.com" },
      { name: "LinkedIn", action: "https://linkedin.com/in/ashley-sarahsep" },
      { name: "Exit to Room", action: "exitDesktop" }
    ]
  },

  // ============================================
  // RESUME CONTENT (WordPad style)
  // ============================================

  resume: {
    content: `
<div class="resume-header">
<h1>ASHLEY SEPERS</h1>
<p class="resume-subtitle">Product Operations | Cross-Functional Leadership | Enablement | AI Adoption</p>
<p class="resume-contact">
Email: ashley.sepers@gmail.com | Phone: 647.574.7721<br>
LinkedIn: linkedin.com/in/ashley-sarahsep | Location: Ontario / Remote
</p>
</div>

<div class="resume-section">
<h2>OH, HELLO!</h2>
<p>Nice to meet you - I'm Ashley, a strategic operations leader with 10+ years of experience driving operational and product success through coordination across teams, technical translation, and operational excellence. I navigate ambiguous environments, identify organizational gaps, and build scalable systems that make everyone else's job easier.</p>
<p>I joined MainEvent when the team was ~10 people with no formal processes and built the operational infrastructure from scratch - sales operations, training programs, QA processes, and project management frameworks that enabled the team to support 32M+ visits, 576K+ client staff, and Fortune 500 brands at massive scale.</p>
</div>

<div class="resume-section">
<h2>WHAT MAKES ME DIFFERENT</h2>

<h3>HERMENEUTICS ADVANTAGE IN OPERATIONS & ANALYTICS</h3>
<p>My background in philosophy (hermeneutics) and social work gives me a unique advantage in both operations and data analytics. I don't just create training - I design learning experiences based on how humans actually process, retain, and apply information.</p>

<h3>SWISS ARMY KNIFE OPERATOR</h3>
<p>Comfortable wearing multiple hats and stepping into gaps without being asked. Have served as QA lead, project manager, product operations lead, sales training owner, advisor, and backup account manager - often simultaneously.</p>

<h3>SELF-TAUGHT TECHNOLOGY ADOPTER</h3>
<p>Mastered every system and tool through self-directed learning - from CRM platforms to AI agent development to project management tools. I build technical solutions, implement new technologies, and adapt to new platforms rapidly.</p>

<h3>BRIDGE BUILDER BETWEEN TECHNICAL & BUSINESS</h3>
<p>Translate technical capabilities into business value and user-friendly language. Create shared understanding across groups that typically struggle to communicate.</p>
</div>

<div class="resume-section">
<h2>EXPERIENCE</h2>

<h3>HEAD OF CLIENT ENABLEMENT & AI ADOPTION</h3>
<p class="job-meta">Network Ninja (MainEvent) | Jan 2025 - Dec 2025 | Remote</p>
<p><strong>THE GAP:</strong> New AI agent product launching with no adoption infrastructure, quality assurance framework, or client training materials</p>
<p><strong>THE SYSTEMS I BUILT:</strong></p>
<ul>
<li>Created manual testing framework for AI agent product from scratch</li>
<li>Applied philosophy background (hermeneutics) to understand how AI interprets and generates information</li>
<li>Developed enterprise-level analytical prompt frameworks (Power Prompts)</li>
<li>Designed and implemented 5-phase onboarding methodology for AI agent adoption</li>
<li>Built library of training videos and resources using Google Drive, Loom, and Notion</li>
</ul>

<h3>CHIEF OF STAFF & HEAD OF SALES ENABLEMENT</h3>
<p class="job-meta">Network Ninja (MainEvent) | Dec 2023 - Dec 2025 | Remote</p>
<p><strong>THE GAP:</strong> No QA lead on major projects, inconsistent demo quality across sales team changes, gaps between technical and business teams</p>
<p><strong>THE SYSTEMS I BUILT:</strong></p>
<ul>
<li>Served as sole QA Lead on major client projects including Neptune project</li>
<li>Led complete Neptune project lifecycle: discovery, requirements, QA, PM, account management</li>
<li>Created 30+ customized demo environments annually</li>
<li>Key contributor to 100% of sales wins since 2018</li>
</ul>

<h3>SALES OPERATIONS & ENABLEMENT LEAD</h3>
<p class="job-meta">Network Ninja (MainEvent) | Oct 2018 - Jul 2025 | Remote</p>
<p>Built operational infrastructure from scratch. Reduced new hire ramp time from 90 to 60 days. Enabled small team to support 400,000+ field reps executing 32+ million visits annually.</p>
</div>

<div class="resume-section">
<h2>EDUCATION</h2>
<p><strong>Bachelor of Arts - Philosophy (Hermeneutics)</strong> | University of Guelph</p>
<p><strong>Social Service Worker Program</strong> | George Brown College, Toronto | GPA: 3.9/4.0</p>
</div>
    `
  },

  // ============================================
  // MYSPACE-STYLE ABOUT PAGE
  // ============================================

  aboutMe: {
    displayName: "~*Ashley*~",
    mood: "Filling gaps since 2014",
    status: "Remote & thriving",
    lastLogin: "Today",
    profileViews: 1337,

    headline: "Professional Gap-Filler | Hermeneutics Enthusiast | Cat Mom",

    aboutText: `
<p><strong>Oh, hi there!</strong></p>
<p>I'm Ashley - the person who sees the gaps between teams and builds the systems to fill them. Self-taught generalist. Pattern recognizer. The connective tissue that keeps organizations from falling apart.</p>
<p>My brain works differently than most - neurodivergent in ways that make me excellent at context-switching between wildly different problems and seeing patterns across domains that others miss.</p>
<p>Philosophy background (hermeneutics - how people interpret information) + social work = I design systems that respect how humans actually think, learn, and adopt new behaviors.</p>
<p>Based in Guelph, Ontario. Remote worker since 2014. Pink office walls. One opinionated cat named Huckleberry.</p>
    `,

    interests: {
      general: "Hermeneutics, pattern recognition, vintage finds, pixel art games, MYST, Oregon Trail II, mid-century modern furniture, estate sales",
      music: "Eclectic. 90s alternative, film scores, lo-fi, whatever the algorithm serves",
      movies: "Tombstone (I'll be your Huckleberry)",
      books: "Philosophy texts, fiction that teaches empathy, the occasional business book"
    },

    topEight: [
      { name: "Huckleberry", role: "Chief Napping Officer", image: "assets/images/top8-cat.jpg" },
      { name: "Jira", role: "Frenemy", image: "assets/images/top8-jira.jpg" },
      { name: "Hermeneutics", role: "Secret Weapon", image: "assets/images/top8-philosophy.jpg" },
      { name: "Remote Work", role: "Lifestyle", image: "assets/images/top8-remote.jpg" },
      { name: "The Pink Chair", role: "Aspirational Seat", image: "assets/images/top8-chair.jpg" },
      { name: "Pattern Recognition", role: "Superpower", image: "assets/images/top8-patterns.jpg" },
      { name: "Coffee", role: "Fuel", image: "assets/images/top8-coffee.jpg" },
      { name: "Asking Why", role: "Core Methodology", image: "assets/images/top8-why.jpg" }
    ],

    testimonials: [
      // Testimonials will be added here
      { name: "[TESTIMONIAL PLACEHOLDER]", text: "Add testimonials in data.js" }
    ]
  },

  // ============================================
  // ASHLEY CHAT (Instant Messenger Q&A)
  // ============================================

  chat: {
    botName: "AshleyBot",
    welcomeMessage: "Hey! This is AshleyChat - ask me anything about my work, experience, or approach. I'm an AI trained on everything Ashley could think to share (she's thorough).",

    quickQuestions: [
      "What do you do?",
      "Tell me about your AI work",
      "What's your work style?",
      "Why should I hire you?",
      "What makes you different?"
    ],

    responses: {
      "What do you do?": "I'm a Product Operations / Enablement leader who specializes in finding organizational gaps and building systems to fill them. Most recently, I built the entire adoption infrastructure for an AI agent product - testing framework, onboarding methodology, training curriculum, the works. Before that, I spent 7+ years at MainEvent building operational infrastructure from scratch, running QA, creating sales enablement materials, and being the person who makes sure nothing falls through the cracks.",

      "Tell me about your AI work": "I led product adoption for mAInevent Agents - an AI-powered analytics tool for experiential marketing. Built the entire adoption infrastructure from scratch: manual testing framework for QA (because I'm not a blind AI advocate - I caught quality issues before they reached clients), 5-phase onboarding methodology, 'Power Prompts' library for enterprise analytics, and training materials for different user types. My philosophy background in hermeneutics actually helps here - understanding how LLMs interpret context makes me better at catching where they might go wrong.",

      "What's your work style?": "Give me an ambiguous problem and trust me to figure it out. I don't need constant meetings or hand-holding - I need interesting problems and the space to solve them. I ask 'why' constantly, design for humans as they actually are (not as we wish they'd be), and I'm comfortable wearing multiple hats simultaneously. Swiss Army Knife Operator, basically.",

      "Why should I hire you?": "Because I'm the person who makes everyone else's job easier. I see gaps that others miss or ignore, build systems to address them, and hand them off when they're working. I bridge technical and business teams, create shared understanding, and actually get things done. Plus, I'll tell you what I actually think - no corporate politeness, just honest, clear communication.",

      "What makes you different?": "My philosophy background in hermeneutics (how people interpret information) combined with social work gives me a unique lens. I don't just build systems - I build systems that account for how humans actually think, learn, and adopt new behaviors. That's why my training programs reduce ramp time and my analytics work uncovers insights others miss. Also: I'm pretty funny, if that matters."
    },

    fallbackResponse: "That's a great question! For the detailed answer, you might want to check my Resume.doc or AboutMe.html on this desktop. Or just email me at ashley.sepers@gmail.com - I promise I'm friendlier than this chatbot."
  },

  // ============================================
  // WORK EXAMPLES
  // ============================================

  workExamples: [
    {
      id: "neptune",
      name: "Neptune Retail Solutions",
      type: "Project Leadership",
      description: "Led complete lifecycle of custom platform build: discovery, requirements gathering, workflow/wireframe design, QA process creation, development team leadership (4 people), project management, and account management.",
      skills: ["Project Management", "QA Leadership", "Requirements Gathering", "Jira", "Agile", "Client Relations"],
      image: "assets/images/work-neptune.jpg"
    },
    {
      id: "ai-adoption",
      name: "AI Agent Adoption Program",
      type: "Enablement & Training",
      description: "Built entire adoption infrastructure for AI-powered analytics product from scratch: manual testing framework, 5-phase onboarding methodology, Power Prompts library, training curriculum for multiple user types.",
      skills: ["AI/LLM", "Prompt Engineering", "Training Design", "QA", "Documentation", "Change Management"],
      image: "assets/images/work-ai.jpg"
    },
    {
      id: "sales-enablement",
      name: "Sales Enablement Program",
      type: "Enablement & Operations",
      description: "Created 30+ customized demo environments annually, each specifically researched for prospect's business context. Contributed to 100% of sales wins since 2018. Maintained enablement continuity across multiple team changes.",
      skills: ["Sales Enablement", "Demo Excellence", "CRM", "Competitive Intel", "Training"],
      image: "assets/images/work-sales.jpg"
    },
    {
      id: "ops-infrastructure",
      name: "Operational Infrastructure",
      type: "0-to-1 Building",
      description: "Joined 10-person startup with zero formal processes. Built complete operational infrastructure from scratch: sales operations, contract workflows, documentation standards, QA processes. These systems now support 32M+ visits and Fortune 500 clients.",
      skills: ["Process Design", "Documentation", "Scaling Operations", "Change Management"],
      image: "assets/images/work-ops.jpg"
    }
  ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_DATA;
}
