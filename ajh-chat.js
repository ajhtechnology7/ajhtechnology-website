/* ===================================================================
   AJH Technology · Conversational FAQ Bot
   -------------------------------------------------------------------
   Self-contained client-side chat widget.
   Knowledge base pulled from site FAQ / services / pricing / case
   studies. Simple keyword-matching retrieval. Static-host friendly.
   Falls back to "I'm just a simple bot — go talk to Harlyn" when
   the site KB doesn't have a confident answer.
=================================================================== */
(function () {
  'use strict';

  // ------- 1. Knowledge base -------
  // Each entry: {q, kw (trigger keywords), a (answer), links (related pages)}
  const KB = [
    {
      q: "What does AJH Technology do?",
      kw: ["what", "do", "about", "agency", "company", "ajh", "business", "service", "services"],
      a: "AJH Technology is a one-person web design, brand and video business in Suffolk, run by Harlyn Palmer. It builds websites for small businesses on monthly plans, makes short-form and studio-style videos, and works as a monthly marketing partner for bigger clients. Registered in 2024, trading since 2026, based at Creeting St Mary.",
      links: [{ text: "About AJH", url: "about.html" }, { text: "Services", url: "services.html" }]
    },
    {
      q: "Who runs AJH Technology?",
      kw: ["who", "runs", "owns", "founder", "founded", "harlyn", "palmer", "boss", "director"],
      a: "Harlyn Palmer runs AJH on his own, so you always speak to the person doing the work. He is also a first-team player at Needham Market FC, after seven years in the Ipswich Town academy.",
      links: [{ text: "Harlyn's story", url: "about.html" }]
    },
    {
      q: "How much does a website cost?",
      kw: ["how", "much", "cost", "price", "pricing", "expensive", "cheap", "budget", "package", "packages"],
      a: "Three packages, all on a 12-month minimum, with the build, hosting and monthly changes included: Starter £250/month (nothing upfront), Business £500/month (nothing upfront), Bookings & Members quoted to your setup. Whole marketing partnerships are priced on what you need.",
      links: [{ text: "Full pricing", url: "pricing.html" }, { text: "Book a call", url: "contact.html" }]
    },
    {
      q: "How long does a website take?",
      kw: ["how", "long", "take", "timeline", "timescale", "when", "delivery", "deadline", "live"],
      a: "It depends on the size of the job. You get a delivery date in writing before anything starts, and if you have a real deadline, tell Harlyn on the first call so the plan works back from it.",
      links: [{ text: "Our approach", url: "work.html" }]
    },
    {
      q: "What is in the Starter package?",
      kw: ["starter", "launch", "small", "basic", "entry", "single", "page", "75"],
      a: "Starter is £250/month with nothing upfront (12-month minimum). A single-page site or up to 5 pages, enquiry form, hosting, SSL, security updates, set-up on Google with visitor stats, and 20 minutes of changes a month. Example: Eastrada Facilities.",
      links: [{ text: "Pricing", url: "pricing.html" }, { text: "Eastrada case study", url: "case-study-eastrada.html" }]
    },
    {
      q: "What is in the Business package?",
      kw: ["business", "grow", "middle", "popular", "growth", "sme", "175"],
      a: "Business is £500/month with nothing upfront (12-month minimum). Everything in Starter plus up to 15 pages, a brand refresh, set-up for Google and AI assistants, Google Business Profile set-up and 45 minutes of changes a month. Example: Wall2Wall Group.",
      links: [{ text: "Pricing", url: "pricing.html" }, { text: "Wall2Wall case study", url: "case-study-wall2wall.html" }]
    },
    {
      q: "What is in the Bookings & Members package?",
      kw: ["bookings", "members", "venue", "club", "platform", "flagship", "full", "premium", "big", "booking", "system", "accounts", "350", "300"],
      a: "Bookings & Members is quoted to your setup (12-month minimum). For venues, clubs and hire businesses: an online booking calendar with live availability, customer accounts, a booking dashboard and links to your ticket or shop provider. Fixed price in writing before anything starts. Example: Needham Market FC.",
      links: [{ text: "Pricing", url: "pricing.html" }, { text: "Needham FC case study", url: "case-study-needham-market-fc.html" }]
    },
    {
      q: "Do you do bigger, ongoing work?",
      kw: ["bespoke", "custom", "partnership", "partner", "marketing", "fractional", "enterprise", "retainer", "ongoing", "upstream", "totalix"],
      a: "Yes. For clients who need a whole marketing function, AJH works as a monthly partner, priced on what's needed. Example: Upstream Works, where that meant a rebuilt website, a refreshed brand and a product launch film, all live on 14 October 2026.",
      links: [{ text: "Upstream Works case study", url: "case-study-upstream-works.html" }, { text: "Get in touch", url: "contact.html" }]
    },
    {
      q: "Do you make videos?",
      kw: ["video", "animation", "film", "shoot", "reel", "social", "linkedin", "campaign", "day", "life", "endava", "promo", "clip", "studio"],
      a: "Yes. Short-form videos from £300, studio-style films from £750, or monthly video from £400/month. Editing and captions are always included. Examples: the Upstream Works × Endava Day in the Life and the Totalix launch film.",
      links: [{ text: "Video & studio", url: "studio.html" }, { text: "Upstream × Endava", url: "case-study-upstream-endava.html" }]
    },
    {
      q: "Where is AJH based?",
      kw: ["where", "based", "location", "address", "office", "suffolk", "needham", "creeting"],
      a: "The Office, Grange Farm, All Saints Road, Creeting St Mary, Suffolk, IP6 8NG — just outside Needham Market. Most clients are in Suffolk, but work can be done remotely too.",
      links: [{ text: "Contact", url: "contact.html" }]
    },
    {
      q: "What areas do you serve?",
      kw: ["areas", "serve", "coverage", "region", "ipswich", "stowmarket", "bury", "sudbury", "woodbridge", "felixstowe", "diss", "norwich", "norfolk", "essex", "east", "anglia"],
      a: "Mainly Suffolk — Ipswich, Stowmarket, Needham Market, Bury St Edmunds and the towns around them — and remote work anywhere in the UK.",
      links: [{ text: "Ipswich", url: "web-design-ipswich.html" }, { text: "Stowmarket", url: "web-design-stowmarket.html" }, { text: "Bury St Edmunds", url: "web-design-bury-st-edmunds.html" }]
    },
    {
      q: "Who have you worked with?",
      kw: ["who", "clients", "worked", "work", "case", "studies", "portfolio", "projects", "customers", "examples", "references"],
      a: "Upstream Works (website rebuild, brand and launch film as a monthly marketing partner), Wall2Wall Group (brand, website and print), Eastrada Facilities (single-page website and ongoing care) and Needham Market FC (brand refresh, club website and booking-request system, built as a volunteer). Plus a Day in the Life video for Upstream Works × Endava.",
      links: [{ text: "All recent work", url: "recent-work.html" }, { text: "Upstream Works", url: "case-study-upstream-works.html" }, { text: "Needham FC", url: "case-study-needham-market-fc.html" }, { text: "Eastrada", url: "case-study-eastrada.html" }, { text: "Wall2Wall", url: "case-study-wall2wall.html" }]
    },
    {
      q: "What tech do you use?",
      kw: ["tech", "technology", "stack", "code", "build", "built", "framework", "wordpress", "html", "css", "javascript", "netlify", "github", "database", "ai"],
      a: "Mostly static, hand-built HTML and CSS sites hosted on Netlify and deployed from GitHub, which keeps them quick and simple to look after. Every site includes structured data for Google and AI assistants.",
      links: [{ text: "Approach", url: "work.html" }]
    },
    {
      q: "How does AJH approach SEO?",
      kw: ["seo", "search", "google", "ranking", "indexing", "organic", "traffic"],
      a: "Every site gets the basics done properly: clean page structure, page titles and descriptions, structured data, an XML sitemap and Google Search Console set up so you can see who's finding you. Business and Bookings & Members also get Google Business Profile set-up.",
      links: [{ text: "AEO explained", url: "insights-aeo-for-suffolk-businesses.html" }]
    },
    {
      q: "What is AEO?",
      kw: ["aeo", "answer", "engine", "chatgpt", "perplexity", "llm", "assistant"],
      a: "AEO (Answer Engine Optimisation) means writing and structuring your site so AI assistants like ChatGPT and Google's AI Overviews can understand your business and are more likely to mention it. Nobody can guarantee an AI will name you, but clear answers and structured data give you the best chance.",
      links: [{ text: "AEO explained", url: "insights-aeo-for-suffolk-businesses.html" }]
    },
    {
      q: "What's included each month?",
      kw: ["ongoing", "management", "managed", "maintenance", "monthly", "after", "care", "included"],
      a: "Every package's monthly fee covers the build, hosting, SSL, security updates and a set amount of changes each month: 20 minutes on Starter, 45 on Business, 1 hour on Bookings & Members. Extra changes are £60/hour, quoted before any work starts.",
      links: [{ text: "Pricing", url: "pricing.html" }]
    },
    {
      q: "What kind of support do you offer?",
      kw: ["support", "help", "response", "urgent", "emergency", "broken", "down"],
      a: "Email or call Harlyn directly on 07488 286207. If something is broken, like the site being down or a form not working, it gets fixed first.",
      links: [{ text: "Contact", url: "contact.html" }]
    },
    {
      q: "Do you offer brand identity work?",
      kw: ["brand", "branding", "identity", "logo", "colours", "colors", "typography", "visual", "design"],
      a: "Yes. A brand refresh is included in the Business package, and a full identity can be quoted on its own. Examples: the Wall2Wall brand and the Upstream Works brand pack.",
      links: [{ text: "Brand service", url: "brand.html" }, { text: "Wall2Wall case study", url: "case-study-wall2wall.html" }]
    },
    {
      q: "Do you work with tradespeople?",
      kw: ["trade", "trades", "tradespeople", "plumber", "plumbers", "electrician", "electricians", "builder", "builders", "plasterer", "plasterers", "chas", "accredited"],
      a: "Yes. Wall2Wall (plasterers) and Eastrada (commercial cleaning and facilities) are both trade businesses. Trade sites usually put accreditations, real job photos and an easy quote form front and centre.",
      links: [{ text: "Wall2Wall case study", url: "case-study-wall2wall.html" }, { text: "Eastrada case study", url: "case-study-eastrada.html" }]
    },
    {
      q: "What is the delivery process?",
      kw: ["process", "delivery", "phases", "stages", "steps", "work", "workflow", "method", "methodology"],
      a: "Plan (a call and a written brief), design, build, then launch with Google set-up — and the ongoing monthly care after that. You see the site working on your phone before it goes live.",
      links: [{ text: "Approach", url: "work.html" }]
    },
    {
      q: "What happens after the 12-month minimum?",
      kw: ["12", "month", "minimum", "contract", "end", "cancel", "termination", "terminate", "notice", "own", "ownership"],
      a: "After 12 months the plan rolls on monthly, and you can cancel with one month's notice. The website is yours once the 12-month term is complete; if you want to leave earlier, you can pay the rest of the term and take it with you.",
      links: [{ text: "Pricing FAQ", url: "pricing.html" }, { text: "Terms", url: "terms.html" }]
    },
    {
      q: "Are you GDPR-compliant?",
      kw: ["gdpr", "privacy", "data", "compliance", "compliant", "legal", "lawful"],
      a: "AJH sites include a privacy notice, cookie information and contact forms that only collect what's needed. If your business has specific data requirements, raise them on the first call so they're built in.",
      links: [{ text: "Privacy notice", url: "privacy.html" }]
    },
    {
      q: "Do you offer a free website check?",
      kw: ["free", "audit", "review", "check", "analysis", "assessment"],
      a: "Yes. Send your website through the free website check form and Harlyn will look it over and come back with the main things worth fixing.",
      links: [{ text: "Free website check", url: "audit.html" }]
    },
    {
      q: "How do I get started?",
      kw: ["start", "started", "begin", "book", "call", "contact", "reach", "talk", "chat", "meet", "first"],
      a: "Book a free 20-minute call on the contact page or ring Harlyn on 07488 286207. You'll talk about your business and what you need, then get the scope and price in writing. No obligation.",
      links: [{ text: "Book a call", url: "contact.html" }, { text: "Call 07488 286207", url: "tel:+447488286207" }]
    },
    {
      q: "Do you build websites for football clubs?",
      kw: ["football", "sport", "club", "sports", "team", "league", "fixtures", "needham"],
      a: "Yes. Harlyn built the Needham Market FC website for his own club as a volunteer: a brand refresh, a club website and an online booking-request system for the pitch and venue, with tickets and the shop linking to the club's ticketing provider.",
      links: [{ text: "Needham FC case study", url: "case-study-needham-market-fc.html" }]
    }
  ];

  // Trivial stopwords to ignore in query tokenisation
  const STOP = new Set(['a','an','the','is','are','was','were','be','been','being','have','has','had','do','does','did','can','could','should','would','will','would','of','to','in','on','at','for','with','by','from','as','and','or','but','if','that','this','these','those','my','your','our','their','me','you','we','they','it','its','i','so','because','than','then']);

  function tokenise(str) {
    return (str || '').toLowerCase()
      .replace(/[^a-z0-9£\s]+/g, ' ')
      .split(/\s+/)
      .filter(t => t && !STOP.has(t));
  }

  // Score each KB entry against query tokens
  function findBestMatch(query) {
    const tokens = tokenise(query);
    if (!tokens.length) return null;
    let best = { entry: null, score: 0 };
    for (const entry of KB) {
      const qtoks = tokenise(entry.q);
      const atoks = tokenise(entry.a);
      let score = 0;
      for (const t of tokens) {
        // Strong: match keyword
        if (entry.kw.includes(t)) score += 6;
        // Medium: match question token
        else if (qtoks.includes(t)) score += 3;
        // Weak: match answer token
        else if (atoks.includes(t)) score += 1;
        // Substring fallback for compound words
        else {
          for (const kw of entry.kw) {
            if (kw.length > 3 && (t.includes(kw) || kw.includes(t))) { score += 2; break; }
          }
        }
      }
      if (score > best.score) best = { entry, score };
    }
    // Require a reasonable confidence
    if (best.score >= 6) return best.entry;
    return null;
  }

  // ------- 2. Widget UI -------
  const STYLES = `
    #ajhchat-toggle {
      position: fixed; bottom: 22px; right: 22px; z-index: 999999;
      background: #C7F100; color: #0A0A0A; border: none; cursor: pointer;
      padding: 14px 20px; border-radius: 100px; font-weight: 800; font-size: 14px;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      letter-spacing: 0.3px; box-shadow: 0 12px 28px rgba(0,0,0,0.35), 0 4px 8px rgba(199,241,0,0.3);
      display: inline-flex; align-items: center; gap: 8px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    #ajhchat-toggle:hover { transform: translateY(-2px); box-shadow: 0 16px 34px rgba(0,0,0,0.4), 0 6px 12px rgba(199,241,0,0.4); }
    #ajhchat-toggle .dot { width: 8px; height: 8px; background: #0A0A0A; border-radius: 50%; animation: ajhchatpulse 2s ease-in-out infinite; }
    @keyframes ajhchatpulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

    #ajhchat-panel {
      position: fixed; bottom: 90px; right: 22px; z-index: 999998;
      width: 380px; max-width: calc(100vw - 44px); height: 560px; max-height: calc(100vh - 130px);
      background: #141414; border: 1px solid #2A2A2A; border-radius: 20px;
      box-shadow: 0 40px 100px rgba(0,0,0,0.55), 0 12px 28px rgba(0,0,0,0.4);
      display: none; flex-direction: column; overflow: hidden;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: #EEE;
    }
    #ajhchat-panel.open { display: flex; }

    #ajhchat-header { padding: 18px 20px; background: linear-gradient(180deg, #1a1a1a 0%, #141414 100%); border-bottom: 1px solid #2A2A2A; display: flex; align-items: center; gap: 12px; }
    #ajhchat-avatar { width: 40px; height: 40px; border-radius: 50%; background: #C7F100; color: #0A0A0A; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; font-size: 15px; flex-shrink: 0; }
    #ajhchat-title { flex: 1; }
    #ajhchat-title .t { font-weight: 800; font-size: 15px; letter-spacing: -0.3px; color: #FFF; }
    #ajhchat-title .s { font-size: 11px; color: #C7F100; letter-spacing: 0.5px; margin-top: 2px; }
    #ajhchat-title .s::before { content: '●'; margin-right: 5px; }
    #ajhchat-close { background: none; border: none; color: #999; font-size: 22px; cursor: pointer; padding: 4px 8px; border-radius: 6px; line-height: 1; }
    #ajhchat-close:hover { background: #2A2A2A; color: #FFF; }

    #ajhchat-messages { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
    #ajhchat-messages::-webkit-scrollbar { width: 6px; }
    #ajhchat-messages::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 3px; }
    .ajhchat-msg { max-width: 84%; padding: 12px 15px; border-radius: 14px; font-size: 14px; line-height: 1.55; }
    .ajhchat-msg.bot { background: #1F1F1F; color: #EEE; border-bottom-left-radius: 4px; align-self: flex-start; }
    .ajhchat-msg.user { background: #C7F100; color: #0A0A0A; border-bottom-right-radius: 4px; align-self: flex-end; font-weight: 500; }
    .ajhchat-msg strong { color: #FFF; font-weight: 700; }
    .ajhchat-msg.bot strong { color: #C7F100; }
    .ajhchat-links { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
    .ajhchat-link { display: inline-block; background: rgba(199,241,0,0.12); border: 1px solid rgba(199,241,0,0.4); color: #C7F100; padding: 5px 11px; border-radius: 100px; font-size: 12px; font-weight: 600; text-decoration: none; transition: background 0.15s ease; }
    .ajhchat-link:hover { background: rgba(199,241,0,0.22); }

    #ajhchat-suggest { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 20px 12px; }
    .ajhchat-chip { background: #1F1F1F; border: 1px solid #2A2A2A; color: #CCC; padding: 7px 12px; border-radius: 100px; font-size: 12px; font-weight: 500; cursor: pointer; transition: border-color 0.15s ease, color 0.15s ease; }
    .ajhchat-chip:hover { border-color: #C7F100; color: #C7F100; }

    #ajhchat-input-row { display: flex; padding: 14px 16px 16px; border-top: 1px solid #2A2A2A; gap: 8px; background: #141414; }
    #ajhchat-input { flex: 1; background: #1A1A1A; border: 1px solid #2A2A2A; color: #EEE; padding: 11px 14px; border-radius: 100px; font-size: 14px; font-family: inherit; outline: none; transition: border-color 0.15s ease; }
    #ajhchat-input:focus { border-color: #C7F100; }
    #ajhchat-send { background: #C7F100; color: #0A0A0A; border: none; padding: 0 18px; border-radius: 100px; font-weight: 800; font-size: 14px; cursor: pointer; transition: background 0.15s ease; }
    #ajhchat-send:hover { background: #d4ff33; }

    #ajhchat-footer { padding: 8px 20px 12px; font-size: 10px; color: #666; text-align: center; letter-spacing: 0.5px; }

    @media (max-width: 500px) {
      #ajhchat-panel { bottom: 80px; right: 12px; left: 12px; width: auto; height: calc(100vh - 100px); }
      #ajhchat-toggle { bottom: 14px; right: 14px; padding: 12px 16px; font-size: 13px; }
    }
  `;

  const FALLBACK = "I'm just a simple site bot, so I don't know the answer to that one — but Harlyn (the human founder) will. Give him a shout for a proper conversation.";

  const GREETING = "Hi — I'm the AJH site bot. Ask me anything about AJH Technology — pricing, packages, video, how sites are built, or recent work. If I don't know, I'll point you to Harlyn.";

  const SUGGESTIONS = [
    'How much does a website cost?',
    'How long does it take?',
    'Who has AJH worked with?',
    'What tech do you use?'
  ];

  const FALLBACK_LINKS = [
    { text: 'Book a call with Harlyn', url: 'contact.html' },
    { text: 'Call 07488 286207', url: 'tel:+447488286207' }
  ];

  // ------- 3. Render -------
  function init() {
    // Inject CSS
    const style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);

    // Toggle button
    const toggle = document.createElement('button');
    toggle.id = 'ajhchat-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Open AJH chat');
    toggle.innerHTML = '<span class="dot"></span> Ask AJH';
    document.body.appendChild(toggle);

    // Panel
    const panel = document.createElement('div');
    panel.id = 'ajhchat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'AJH chat');
    panel.innerHTML = `
      <div id="ajhchat-header">
        <div id="ajhchat-avatar">AJH</div>
        <div id="ajhchat-title">
          <div class="t">AJH site bot</div>
          <div class="s">Not Harlyn — a simple bot</div>
        </div>
        <button id="ajhchat-close" type="button" aria-label="Close chat">×</button>
      </div>
      <div id="ajhchat-messages" role="log"></div>
      <div id="ajhchat-suggest"></div>
      <div id="ajhchat-input-row">
        <input id="ajhchat-input" type="text" placeholder="Ask a question…" aria-label="Type your question">
        <button id="ajhchat-send" type="button">Ask</button>
      </div>
      <div id="ajhchat-footer">Simple client-side bot · No data leaves your device</div>
    `;
    document.body.appendChild(panel);

    const messages = panel.querySelector('#ajhchat-messages');
    const suggest = panel.querySelector('#ajhchat-suggest');
    const input = panel.querySelector('#ajhchat-input');
    const send = panel.querySelector('#ajhchat-send');
    const close = panel.querySelector('#ajhchat-close');

    function renderMessage(who, text, links) {
      const msg = document.createElement('div');
      msg.className = 'ajhchat-msg ' + who;
      msg.textContent = text;
      if (links && links.length) {
        const linkWrap = document.createElement('div');
        linkWrap.className = 'ajhchat-links';
        for (const l of links) {
          const a = document.createElement('a');
          a.className = 'ajhchat-link';
          a.href = l.url;
          a.textContent = l.text;
          if (l.url.startsWith('http') && !l.url.startsWith(window.location.origin)) {
            a.target = '_blank'; a.rel = 'noopener';
          }
          linkWrap.appendChild(a);
        }
        msg.appendChild(linkWrap);
      }
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    }

    function renderSuggestions(list) {
      suggest.innerHTML = '';
      for (const s of list) {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'ajhchat-chip';
        chip.textContent = s;
        chip.addEventListener('click', () => handleQuery(s));
        suggest.appendChild(chip);
      }
    }

    function handleQuery(q) {
      if (!q || !q.trim()) return;
      renderMessage('user', q);
      input.value = '';
      suggest.innerHTML = ''; // hide suggestions after first user turn
      // Small delay so it feels like the bot is thinking
      setTimeout(() => {
        const match = findBestMatch(q);
        if (match) {
          renderMessage('bot', match.a, match.links);
        } else {
          renderMessage('bot', FALLBACK, FALLBACK_LINKS);
        }
      }, 380);
    }

    // Wire events
    toggle.addEventListener('click', () => {
      const wasOpen = panel.classList.contains('open');
      panel.classList.toggle('open');
      if (!wasOpen && messages.children.length === 0) {
        renderMessage('bot', GREETING);
        renderSuggestions(SUGGESTIONS);
      }
      if (!wasOpen) setTimeout(() => input.focus(), 100);
    });
    close.addEventListener('click', () => panel.classList.remove('open'));
    send.addEventListener('click', () => handleQuery(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); handleQuery(input.value); }
    });
  }

  // Init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
