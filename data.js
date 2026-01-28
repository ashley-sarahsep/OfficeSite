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

  // ============================================
  // PORTRAIT SYSTEM
  // ============================================
  // Different portraits for different conversational moods
  // Place images in assets/images/ with these names
  portraits: {
    default: "assets/images/ashley-default.jpg",
    smiling1: "assets/images/ashley-smiling1.jpg",
    smiling2: "assets/images/ashley-smiling2.jpg",
    thoughtful1: "assets/images/ashley-thoughtful1.jpg",
    thoughtful2: "assets/images/ashley-thoughtful2.jpg",
    funny1: "assets/images/ashley-funny1.jpg",
    funny2: "assets/images/ashley-funny2.jpg",
    excited: "assets/images/ashley-excited.jpg",
    serious: "assets/images/ashley-serious.jpg"
  },

  // ============================================
  // ROOM HOTSPOT CONVERSATIONS
  // ============================================

  hotspots: {
    desk: {
      name: "Work Desk",
      image: "assets/images/desk.jpg",
      conversations: [
        {
          id: "desk-intro",
          portrait: "smiling1",
          text: "Oh, hi there! This is my work-from-home setup. I've been remote since 2014 - before it was cool, honestly. This desk has seen everything from startup chaos to enterprise client calls.",
          responses: [
            { text: "What do you love about remote work?", next: "desk-remote-love" },
            { text: "Tell me about your work history", next: "desk-work-history" },
            { text: "That's a lot of stickers on your laptop", next: "desk-stickers" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-remote-love",
          portrait: "thoughtful1",
          text: "The autonomy, mostly. Give me an ambiguous problem and trust me to figure it out - that's where I thrive. I don't need constant meetings or check-ins. I need interesting problems and the space to solve them. Plus, Gertrude and Gherkin make excellent coworkers.",
          responses: [
            { text: "Who are Gertrude and Gherkin?", next: "desk-cats-tease" },
            { text: "What kind of problems do you solve?", next: "desk-problems" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-cats-tease",
          portrait: "smiling2",
          text: "My cats! Gertrude's the black one - she supervises from the bookshelf. Gherkin's the orange one on the pink chair. They have very strong opinions about video call backgrounds.",
          responses: [
            { text: "I should go meet them", next: null },
            { text: "What kind of work do you do from here?", next: "desk-work-history" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-work-history",
          portrait: "thoughtful1",
          text: "I spent 7+ years at a field marketing SaaS platform. Joined when they were about 10 people with zero formal processes. Built the operational infrastructure from scratch - sales ops, enablement programs, QA processes, project management. The stuff that lets small teams do big things.",
          responses: [
            { text: "What's your proudest project?", next: "desk-neptune" },
            { text: "What do you mean by 'operational infrastructure'?", next: "desk-ops-explain" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-neptune",
          portrait: "excited",
          text: "An enterprise retail client needed a custom platform build. Led the whole lifecycle - discovery, requirements, wireframes, QA process, then took over as PM when it went live. Daily scrums with the dev team, Jira board management, the works. Then transitioned to account manager, got it stable, handed it off clean. That's my pattern: see gaps, fill gaps, build systems, hand off.",
          responses: [
            { text: "That's a lot of hats to wear", next: "desk-swiss-army" },
            { text: "Tell me more about your approach", next: "desk-approach" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-swiss-army",
          portrait: "smiling1",
          text: "Swiss Army Knife Operator - that's what I call it. QA lead, project manager, sales enablement owner, strategic advisor, backup account manager. Often simultaneously. I excel at identifying what's missing and taking ownership without needing direction. Some people find ambiguity stressful. I find it interesting.",
          responses: [
            { text: "That sounds exhausting", next: "desk-exhausting" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-exhausting",
          portrait: "funny1",
          text: "Ha! My brain actually works better this way - context-switching between wildly different problems, seeing patterns across domains. It's how I'm wired. What exhausts me is sitting in meetings that could've been async messages.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-ops-explain",
          portrait: "thoughtful2",
          text: "The invisible systems that keep organizations from falling apart. Contract workflows, demo preparation processes, documentation standards, client handoff protocols. The stuff nobody thinks about until it's missing. I built all of that from zero.",
          responses: [
            { text: "How do you approach building new systems?", next: "desk-approach" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-approach",
          portrait: "serious",
          text: "Ask 'why' constantly. Don't accept surface-level explanations or build solutions just because 'that's what's done.' Identify root causes, not symptoms. Design based on evidence and iteration. And always - always - design for humans as they actually are, not as you wish they'd be.",
          responses: [
            { text: "What do you mean by that last part?", next: "desk-hermeneutics" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-hermeneutics",
          portrait: "thoughtful1",
          text: "I studied philosophy - hermeneutics specifically. The art of interpretation. How people actually understand information versus how we assume they do. It shapes everything I build. Training programs, documentation, AI prompts. If you don't account for how humans process things under cognitive load, your technically 'correct' solution will fail.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-problems",
          portrait: "thoughtful2",
          text: "Gaps. I solve gaps. The work that doesn't clearly belong to one team. Communication breakdowns between technical and business stakeholders. New products that need adoption infrastructure. Projects that need someone to just... own them. I spot what's missing and take responsibility.",
          responses: [
            { text: "Give me an example", next: "desk-neptune" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "desk-stickers",
          portrait: "funny1",
          text: "Every sticker has a story. Conference swag, weird internet finds, a few from products I actually believe in. My laptop is basically a personality test.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        }
      ]
    },

    gertrude: {
      name: "Gertrude",
      image: "assets/images/gertrude.jpg",
      conversations: [
        {
          id: "gertrude-intro",
          portrait: "smiling2",
          text: "That's Gertrude! She's my little void - always watching, judging, supervising. She likes to perch on the bookshelf and observe her domain. Very regal energy.",
          responses: [
            { text: "She looks very serious", next: "gertrude-serious" },
            { text: "Why the name Gertrude?", next: "gertrude-name" },
            { text: "Does she get along with Gherkin?", next: "gertrude-gherkin" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "gertrude-serious",
          portrait: "funny1",
          text: "She takes her job very seriously. Chief Security Officer. Nothing happens in this office without her approval. She's also the primary quality assurance tester for any box that enters the premises.",
          responses: [
            { text: "Important work", next: "gertrude-work" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "gertrude-work",
          portrait: "funny2",
          text: "Critical, really. If a box isn't properly tested, who knows what could happen? She's never found a box she couldn't fit in. Or at least try to fit in.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "gertrude-name",
          portrait: "smiling1",
          text: "I wanted something dignified for a black cat. Gertrude felt right - a bit old-fashioned, a bit witchy, very distinguished. She lives up to it.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "gertrude-gherkin",
          portrait: "thoughtful1",
          text: "They have an understanding. Gertrude rules the high ground - shelves, desks, anywhere elevated. Gherkin claims the soft surfaces. There's minimal territorial dispute. Mostly.",
          responses: [
            { text: "Mostly?", next: "gertrude-mostly" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "gertrude-mostly",
          portrait: "funny1",
          text: "Sometimes there's a 3am disagreement. They sort it out. I just hear the thundering paws and try to go back to sleep.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        }
      ]
    },

    gherkin: {
      name: "Gherkin",
      image: "assets/images/gherkin.jpg",
      conversations: [
        {
          id: "gherkin-intro",
          portrait: "smiling2",
          text: "And that's Gherkin! The orange one. He's claimed that pink chair as his personal throne. I bought it for the office aesthetic, he decided it was actually for napping.",
          responses: [
            { text: "Why Gherkin?", next: "gherkin-name" },
            { text: "He looks very comfortable", next: "gherkin-comfortable" },
            { text: "Does he help with work?", next: "gherkin-help" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "gherkin-name",
          portrait: "excited",
          text: "He's a little pickle! Mischievous, gets into everything, causes chaos and then looks at you like 'what? I'm innocent.' The name just fit his personality perfectly.",
          responses: [
            { text: "What kind of chaos?", next: "gherkin-chaos" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "gherkin-chaos",
          portrait: "funny1",
          text: "He's excellent at walking across keyboards during important moments. He's submitted some interesting Slack messages on my behalf. Nothing career-ending. Yet.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "gherkin-comfortable",
          portrait: "smiling1",
          text: "That's HIS chair now. Every office needs a cozy seat, right? He just decided it was his cozy seat. I've accepted my fate as furniture provider.",
          responses: [
            { text: "Fair enough", next: null },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "gherkin-help",
          portrait: "funny1",
          text: "He's excellent at reminding me to take breaks. By sitting on my laptop. Or my notes. Or whatever I'm actively trying to use. Very persistent feedback.",
          responses: [
            { text: "Sounds helpful", next: "gherkin-helpful" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "gherkin-helpful",
          portrait: "funny2",
          text: "Honestly? Sometimes he's right. If I've been staring at a screen for four hours and a cat plants himself on my keyboard, maybe I should take the hint.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        }
      ]
    },

    leftBookshelf: {
      name: "Left Bookshelf",
      image: "assets/images/bookshelf-left.jpg",
      conversations: [
        {
          id: "bookshelf-left-intro",
          portrait: "smiling1",
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
          portrait: "thoughtful1",
          text: "Philosophy, mostly. Hermeneutics texts from university that I still reference. Some social work theory. A lot of fiction - I believe stories teach us how to understand people better than any business book. And yes, some business books. I'm not a purist.",
          responses: [
            { text: "What's hermeneutics?", next: "bookshelf-left-hermeneutics" },
            { text: "Any favorites?", next: "bookshelf-left-favorites" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-left-hermeneutics",
          portrait: "thoughtful2",
          text: "The art and science of interpretation. How people make meaning from texts, conversations, experiences. It sounds academic, but it's incredibly practical. When I design training programs or AI prompts, I'm always thinking about how someone will interpret this. What clarity looks like versus confusion.",
          responses: [
            { text: "How does that apply to your work?", next: "bookshelf-left-apply" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-left-apply",
          portrait: "excited",
          text: "Everything. When I built AI adoption programs, I thought about where models might misinterpret context. When I create enablement materials, I think about cognitive load. When I translate between technical and business teams, I'm really doing applied hermeneutics - making sure ideas don't get lost in translation.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-left-favorites",
          portrait: "thoughtful1",
          text: "I'd have to think about that one. The honest answer is that my favorites change depending on what problem I'm wrestling with. Books are tools for thinking, not trophies.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-left-objects",
          portrait: "smiling2",
          text: "Vintage finds, mostly. Things that caught my eye at estate sales, thrift stores, travels. I like objects with history - they've been somewhere, meant something to someone. That little globe has been with me through three apartments and one international move.",
          responses: [
            { text: "International move?", next: "bookshelf-left-london" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-left-london",
          portrait: "smiling1",
          text: "London, for a while. Worked at some agencies there. Started in accounts payable, ended up implementing timesheet systems. The pattern started early: see a gap, fill it, build something that lasts.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-left-collecting",
          portrait: "thoughtful1",
          text: "Guilty. It's the eclectic thing - I'm drawn to objects that have character, that feel like they belong together even if they're from completely different places and eras. My aesthetic is basically 'these things shouldn't work together but somehow they do.'",
          responses: [
            { text: "That sounds like your work style too", next: "bookshelf-left-meta" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-left-meta",
          portrait: "funny1",
          text: "Ha. Yeah, actually. Taking things that shouldn't quite fit - QA and sales enablement, philosophy and AI testing, technical translation and change management - and making them work together. Maybe I am just collecting skills the way I collect vintage teapots.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        }
      ]
    },

    rightBookshelf: {
      name: "Right Bookshelf",
      image: "assets/images/bookshelf-right.jpg",
      conversations: [
        {
          id: "bookshelf-right-intro",
          portrait: "thoughtful1",
          text: "This side's been with me for 20 years - one of the few pieces of furniture that's survived every move. It holds different things than the wall unit. More personal, I guess.",
          responses: [
            { text: "What makes it special?", next: "bookshelf-right-special" },
            { text: "20 years is a long time for furniture", next: "bookshelf-right-longevity" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-right-special",
          portrait: "thoughtful2",
          text: "It's the constant through every chapter. Different apartments, different cities, different careers. The stuff on these shelves maps to different versions of me. Some of it I'd choose again, some of it just... stayed.",
          responses: [
            { text: "Different careers?", next: "bookshelf-right-careers" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-right-careers",
          portrait: "smiling1",
          text: "Receptionist to accounts receivable at an ad agency. Accounts payable in London. Payroll systems. IBM reseller sales ops. Then 7+ years at a field marketing platform, which became like five different jobs in one. Philosophy student, social work student, self-taught everything else. It's been a winding path.",
          responses: [
            { text: "That's quite a range", next: "bookshelf-right-range" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-right-range",
          portrait: "thoughtful1",
          text: "I'm a self-taught generalist who figures things out through pattern recognition and asking 'why' constantly. Every role required mastering new systems without formal training. The bookshelf holds artifacts from all of it.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "bookshelf-right-longevity",
          portrait: "smiling2",
          text: "Good furniture should outlast trends. I found it at a thrift store when I was barely out of school and it's moved with me ever since. Guelph to Toronto to London to back again. Some things are worth keeping.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        }
      ]
    },

    radio: {
      name: "Vintage Radio",
      image: "assets/images/radio.jpg",
      conversations: [
        {
          id: "radio-intro",
          portrait: "smiling1",
          text: "This radio doesn't actually work, but I love it anyway. There's something about vintage electronics - they were built to last, designed to be beautiful. Not like modern tech that's meant to be replaced.",
          responses: [
            { text: "Do you listen to music while you work?", next: "radio-music" },
            { text: "You seem drawn to vintage things", next: "radio-vintage" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "radio-music",
          portrait: "excited",
          text: "Always. Different genres for different work. Deep focus gets ambient or lo-fi. Creative work gets something with more energy. Debugging gets whatever keeps me from throwing the laptop out the window.",
          responses: [
            { text: "What's your go-to?", next: "radio-goto" },
            { text: "What artists do you love?", next: "radio-artists" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "radio-goto",
          portrait: "thoughtful1",
          text: "Honestly? It varies so much. My playlists are as eclectic as my bookshelves. Some days it's 90s alternative, some days it's film scores, some days it's whatever algorithm decided to serve me. I don't have a 'brand' when it comes to music.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "radio-artists",
          portrait: "excited",
          text: "John Prine, Emmylou Harris, Talking Heads, Bright Eyes, T. Rex, Stevie Wonder, Leonard Cohen. Storytelling, heart, a little weirdness. Songs that sound simple but hit deep. I spent my youth going to punk and metal shows, so the folk sensibilities came later.",
          responses: [
            { text: "Punk shows to folk music is quite a journey", next: "radio-punk" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "radio-punk",
          portrait: "funny1",
          text: "The through-line is authenticity. Substance over style. Artists who mean what they say, who aren't afraid to be weird or vulnerable. That's what draws me in - in music and everywhere else.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "radio-vintage",
          portrait: "thoughtful2",
          text: "Vintage, mid-century modern, things with history. I like when you can see the craftsmanship, feel the intention behind the design. Modern minimalism is fine, but it often feels... soulless? Give me character over perfection.",
          responses: [
            { text: "That's kind of how you describe your work style", next: "radio-work-style" },
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "radio-work-style",
          portrait: "smiling1",
          text: "Maybe. I'd rather be authentic than polished. Direct communication over corporate speak. Solutions that actually work for humans over technically 'correct' approaches that nobody adopts. Character over perfection.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        }
      ]
    },

    art: {
      name: "Wall Art",
      image: "assets/images/art.jpg",
      conversations: [
        {
          id: "art-intro",
          portrait: "smiling1",
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
          portrait: "thoughtful1",
          text: "That's the goal. I spend a lot of time in this room - remote work means your office is also your space. It should feel like somewhere you want to be, not a sterile workspace.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "art-favorite",
          portrait: "thoughtful2",
          text: "Honestly, it changes. Some days I notice one more than others. The landscapes especially - there's something about looking at a scene with depth and distance when you're staring at screens all day.",
          responses: [
            { text: "[Back to exploring]", next: null }
          ]
        },
        {
          id: "art-frames",
          portrait: "smiling2",
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

    icons: [
      { id: "resume", name: "Resume.doc", icon: "doc", app: "wordpad" },
      { id: "about", name: "AboutMe.html", icon: "html", app: "myspace" },
      { id: "chat", name: "AshleyChat.exe", icon: "exe", app: "messenger" },
      { id: "work", name: "Work Examples", icon: "folder", app: "folder" },
      { id: "recycle", name: "Recycle Bin", icon: "recycle", app: "recycle" }
    ],

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
<p>I joined a field marketing SaaS company when the team was ~10 people with no formal processes and built the operational infrastructure from scratch - sales operations, training programs, QA processes, and project management frameworks that enabled the team to support 32M+ visits, 576K+ client staff, and major CPG brands at massive scale.</p>
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
<p class="job-meta">Field Marketing SaaS Platform | Jan 2025 - Dec 2025 | Remote</p>
<p><strong>THE GAP:</strong> New AI agent product launching with no adoption infrastructure, quality assurance framework, or client training materials</p>
<p><strong>THE SYSTEMS I BUILT:</strong></p>
<ul>
<li>Created manual testing framework for AI agent product from scratch</li>
<li>Applied philosophy background (hermeneutics) to understand how AI interprets and generates information</li>
<li>Developed enterprise-level analytical prompt frameworks (Power Prompts)</li>
<li>Designed and implemented 5-phase onboarding methodology for AI agent adoption</li>
<li>Built library of 50+ training videos and resources</li>
</ul>

<h3>CHIEF OF STAFF & HEAD OF SALES ENABLEMENT</h3>
<p class="job-meta">Field Marketing SaaS Platform | Dec 2023 - Dec 2025 | Remote</p>
<p><strong>THE GAP:</strong> No QA lead on major projects, inconsistent demo quality across sales team changes, gaps between technical and business teams</p>
<p><strong>THE SYSTEMS I BUILT:</strong></p>
<ul>
<li>Served as sole QA Lead on major client projects including enterprise custom platform builds</li>
<li>Led complete project lifecycle: discovery, requirements, QA, PM, account management</li>
<li>Created 30+ customized demo environments annually</li>
<li>Key contributor to 100% of sales wins since 2018</li>
</ul>

<h3>SALES OPERATIONS & ENABLEMENT LEAD</h3>
<p class="job-meta">Field Marketing SaaS Platform | Oct 2018 - Jul 2025 | Remote</p>
<p>Built operational infrastructure from scratch. Reduced new hire ramp time from 90 to 60 days. Enabled small team to support 400,000+ field reps executing 32+ million visits annually serving major CPG brands.</p>
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
<p>Based in Guelph, Ontario. Remote worker since 2014. Pink office walls. Two opinionated cats named Gertrude and Gherkin.</p>
    `,

    interests: {
      general: "Hermeneutics, pattern recognition, vintage finds, pixel art games, MYST, Oregon Trail II, mid-century modern furniture, estate sales",
      music: "John Prine, Emmylou Harris, Talking Heads, Bright Eyes, T. Rex, Stevie Wonder, Leonard Cohen. Spent my youth at punk shows.",
      movies: "Tombstone (I'll be your Huckleberry)",
      books: "Philosophy texts, fiction that teaches empathy, the occasional business book"
    },

    topEight: [
      { name: "Gertrude & Gherkin", role: "Chief Chaos Officers", image: "assets/images/top8-cats.jpg" },
      { name: "Jira", role: "Frenemy", image: "assets/images/top8-jira.jpg" },
      { name: "Hermeneutics", role: "Secret Weapon", image: "assets/images/top8-philosophy.jpg" },
      { name: "Remote Work", role: "Lifestyle", image: "assets/images/top8-remote.jpg" },
      { name: "The Pink Chair", role: "Aspirational Seat", image: "assets/images/top8-chair.jpg" },
      { name: "Pattern Recognition", role: "Superpower", image: "assets/images/top8-patterns.jpg" },
      { name: "Coffee", role: "Fuel", image: "assets/images/top8-coffee.jpg" },
      { name: "Asking Why", role: "Core Methodology", image: "assets/images/top8-why.jpg" }
    ],

    testimonials: [
      {
        name: "Sales Leader",
        title: "Ashley is the reason our demos actually close deals.",
        text: "Every single demo she builds is researched specifically for that prospect—she knows their business, their challenges, their language. I've worked with a lot of sales support people, and most of them give you generic decks. Ashley gives you a customized experience that makes prospects feel understood. She's been involved in every win we've had since 2018, and that's not a coincidence. Plus, she's genuinely fun to work with."
      },
      {
        name: "Engineering Lead",
        title: "She's the only non-technical person I actually enjoy getting bug reports from.",
        text: "Most people file tickets that say 'it's broken' and leave you guessing. Ashley's tickets have clear reproduction steps, expected behavior, actual behavior, and business impact. When she took over QA on a major project, our resolution time dropped significantly because we weren't going back and forth trying to understand the issue. She catches edge cases that our internal testing misses."
      },
      {
        name: "Executive / COO",
        title: "Ashley sees problems before they become problems.",
        text: "What I value most about working with Ashley is that she doesn't just execute—she thinks. She'll come to me and say 'I noticed this gap between how Sales and Product are communicating, and here's what I think we should do about it.' Half the time I didn't even know the gap existed. She's the kind of person who makes the whole organization run smoother just by being present and paying attention."
      },
      {
        name: "Client Success Manager",
        title: "Clients ask for her by name.",
        text: "When I'm swamped and Ashley steps in to cover a client call, I never worry. She knows the platform inside and out, she knows the client's specific setup, and she has this way of making people feel heard and supported. She's also the person I go to when I need a second opinion on how to communicate something tricky—she always knows the right tone."
      },
      {
        name: "New Hire",
        title: "Her training materials are the reason I got up to speed so fast.",
        text: "When I joined, I was nervous about the learning curve. But Ashley had built out this whole library of training videos, documentation, and sandbox environments. It wasn't just 'here's how to click buttons'—it explained why things work the way they do. I went from nervous new hire to confident in about half the time I expected."
      }
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
      "What makes you different?",
      "What are you looking for?"
    ],

    responses: {
      "What do you do?": "I'm a Product Operations / Enablement leader who specializes in finding organizational gaps and building systems to fill them. Most recently, I built the entire adoption infrastructure for an AI agent product - testing framework, onboarding methodology, training curriculum, the works. Before that, I spent 7+ years building operational infrastructure from scratch, running QA, creating sales enablement materials, and being the person who makes sure nothing falls through the cracks.",

      "Tell me about your AI work": "I led product adoption for an AI-powered analytics tool for experiential marketing. Built the entire adoption infrastructure from scratch: manual testing framework for QA (because I'm not a blind AI advocate - I caught quality issues before they reached clients), 5-phase onboarding methodology, 'Power Prompts' library for enterprise analytics, and training materials for different user types. My philosophy background in hermeneutics actually helps here - understanding how LLMs interpret context makes me better at catching where they might go wrong.",

      "What's your work style?": "Give me an ambiguous problem and trust me to figure it out. I don't need constant meetings or hand-holding - I need interesting problems and the space to solve them. I ask 'why' constantly, design for humans as they actually are (not as we wish they'd be), and I'm comfortable wearing multiple hats simultaneously. Swiss Army Knife Operator, basically.",

      "Why should I hire you?": "Because I'm the person who makes everyone else's job easier. I see gaps that others miss or ignore, build systems to address them, and hand them off when they're working. I bridge technical and business teams, create shared understanding, and actually get things done. Plus, I'll tell you what I actually think - no corporate politeness, just honest, clear communication.",

      "What makes you different?": "My philosophy background in hermeneutics (how people interpret information) combined with social work gives me a unique lens. I don't just build systems - I build systems that account for how humans actually think, learn, and adopt new behaviors. That's why my training programs reduce ramp time and my analytics work uncovers insights others miss. Also: I'm pretty funny, if that matters.",

      "What are you looking for?": "Small teams where I know everyone and relationships matter. Advisor and sounding board roles where I can help teams think through problems. Authentic cultures where people say what they mean. Growth-stage companies where one person can have real impact. Remote work (I've been remote since 2014). I don't want highly specialized roles, rigid enterprise environments, or places where asking 'why' is seen as insubordination."
    },

    fallbackResponse: "That's a great question! For the detailed answer, you might want to check my Resume.doc or AboutMe.html on this desktop. Or just email me at ashley.sepers@gmail.com - I promise I'm friendlier than this chatbot."
  },

  // ============================================
  // WORK EXAMPLES / CASE STUDIES
  // ============================================

  workExamples: [
    {
      id: "enterprise-platform",
      name: "Enterprise Custom Platform Build",
      type: "Full Lifecycle Project Leadership",
      description: "A major retail solutions company managing tens of thousands of field installations needed a custom platform to track their operations at scale. They had complex workflows spanning multiple business units, existing systems that needed integration, and high expectations for quality and timeline.",
      challenge: "No existing playbook for a project of this complexity. Someone needed to own it end-to-end.",
      whatIDid: [
        "Led discovery process - mapped existing workflows against platform capabilities, conducted stakeholder interviews, documented gap analysis",
        "Created wireframes and workflows translating business requirements into technical specifications",
        "Built comprehensive QA process from scratch - test plans, quality standards, coordination between internal team and client QA",
        "Took over as PM when platform went live - led daily scrums with dev team (4 people), managed Jira board, triaged bugs",
        "Transitioned to account manager role post-launch, then successfully handed off with complete documentation"
      ],
      outcome: "Platform launched successfully with zero failed deployments. Scaled to track 42,000+ retail installations. QA process became template for subsequent implementations.",
      skills: ["Project Management", "QA Leadership", "Requirements Gathering", "Jira", "Agile", "Client Relations", "Technical Translation"],
      image: "assets/images/work-enterprise.jpg"
    },
    {
      id: "ai-adoption",
      name: "AI Product Adoption Infrastructure",
      type: "End-to-End Enablement Building",
      description: "The company launched an AI-powered analytics agent that let clients query their field marketing data using natural language. The technology was powerful, but there was no existing adoption infrastructure - no onboarding process, no training materials, no quality assurance framework.",
      challenge: "AI products don't sell or adopt themselves. Clients needed to understand capabilities, trust the results, and learn to use it effectively.",
      whatIDid: [
        "Built manual testing framework from scratch - systematic process to test prompts for reliability before client deployment",
        "Designed 5-phase onboarding methodology: Discovery → Implementation → Testing & Validation → Training → Ongoing Support",
        "Created educational curriculum for varying proficiency levels - 50+ training videos and resources",
        "Developed 'Power Prompts' library of enterprise analytical frameworks",
        "Served as internal advocate for AI quality, ethical implementation, and transparency about limitations"
      ],
      outcome: "Successfully onboarded enterprise clients. Featured in client success case studies. Adoption infrastructure became standard for all AI agent deployments. Owned industry trade show booth from concept to execution.",
      skills: ["AI/LLM", "Prompt Engineering", "Training Design", "QA", "Documentation", "Change Management", "Ethics"],
      image: "assets/images/work-ai.jpg"
    },
    {
      id: "sales-enablement",
      name: "Lean Team, Enterprise Results",
      type: "Sales Enablement Program",
      description: "A small sales team (2-4 people) needed to win enterprise deals with major CPG brands. They were competing against larger companies with dedicated sales enablement departments. Team composition changed over time, but demo quality couldn't fluctuate.",
      challenge: "Maintain enterprise-quality sales materials and institutional knowledge across team changes with limited resources.",
      whatIDid: [
        "Created 30+ customized demo environments annually - each specifically researched for that prospect's business, challenges, and use cases",
        "Built discovery frameworks and qualification playbooks for varying sales cycles (same-day SMB to year-long enterprise)",
        "Served as enablement constant across sales team changes - maintained demo quality regardless of who was on the team",
        "Reduced new hire ramp time from 90 to 60 days through structured onboarding and self-service resources"
      ],
      outcome: "Contributed to 100% of sales wins since 2018. Lean team consistently closed enterprise deals competing against much larger competitors.",
      skills: ["Sales Enablement", "Demo Excellence", "CRM", "Competitive Intel", "Training", "Onboarding"],
      image: "assets/images/work-sales.jpg"
    },
    {
      id: "ops-infrastructure",
      name: "Building Operations from Zero",
      type: "0-to-1 Infrastructure Development",
      description: "Joined a field marketing SaaS company when the team was ~10 people with no formal processes, workflows, or documentation. The COO was managing all sales and operations solo.",
      challenge: "Build everything needed to scale from startup chaos to enterprise-ready operations.",
      whatIDid: [
        "Created complete operational infrastructure: sales operations, contract workflows, demo preparation processes, enablement programs",
        "Established account transition processes, documentation standards, and client handoff protocols",
        "Designed training programs, onboarding flows, and process documentation used company-wide",
        "Built systems that maintained consistency across multiple team composition changes over 7+ years"
      ],
      outcome: "Operational systems enabled company to scale from ~10 people to supporting 32M+ visits, 576K+ client staff, and major enterprise clients at massive scale.",
      skills: ["Process Design", "Documentation", "Scaling Operations", "Change Management", "Training Design"],
      image: "assets/images/work-ops.jpg"
    }
  ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_DATA;
}
