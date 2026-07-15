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
      q: 'What does AJH Technology do?',
      kw: ['what', 'do', 'about', 'agency', 'company', 'ajh', 'business', 'service', 'services'],
      a: "AJH Technology is a Suffolk web design and digital production agency. We design and build lead-generating websites for small businesses, with three fixed-price packages plus a bespoke option. Every website comes with brand support, SEO/AEO setup and an ongoing managed service. Founded in 2024 by Harlyn Palmer, based at Creeting St Mary, Suffolk.",
      links: [{ text: 'About AJH', url: 'about.html' }, { text: 'Services', url: 'services.html' }]
    },
    {
      q: 'Who runs AJH Technology?',
      kw: ['who', 'runs', 'owns', 'founder', 'founded', 'harlyn', 'palmer', 'boss', 'director'],
      a: "AJH Technology is founded and led by Harlyn Palmer — an aspiring footballer who spent 7 years in the Ipswich Town academy and now plays at Needham Market FC, chasing promotion to Step 2 and a pro contract. Alongside football, Harlyn absolutely loves helping clients with everything web and AI. Every project has one point of contact — you speak to the person doing the work.",
      links: [{ text: "Harlyn's story", url: 'about.html' }]
    },
    {
      q: 'How much does a website cost?',
      kw: ['how', 'much', 'cost', 'price', 'pricing', 'expensive', 'cheap', 'budget', 'package', 'packages'],
      a: "Three fixed-price packages: Launch — £500 setup + £25/month (3-page site, sole traders). Grow — £1,000 setup + £75/month (5–8 pages, most SMEs, most popular). Flagship — £2,000 setup + £125/month (8–14 pages, full brand + managed service). All 12-month minimum. Bespoke platform work (like Needham FC) priced on scope.",
      links: [{ text: 'Full pricing', url: 'pricing.html' }, { text: 'Book a call', url: 'contact.html' }]
    },
    {
      q: 'How long does a website take?',
      kw: ['how', 'long', 'take', 'timeline', 'timescale', 'when', 'delivery', 'deadline', 'live'],
      a: "Most AJH websites go live within three weeks of the kick-off call. When a client has a hard deadline — trade show, funding round, seasonal launch — we've delivered in one week. Larger platform builds take three months. Tell us your deadline and we work backwards.",
      links: [{ text: 'Our approach', url: 'work.html' }]
    },
    {
      q: 'What is included in the Launch package?',
      kw: ['launch', 'starter', 'small', 'basic', 'entry', '500', '25'],
      a: "Launch (£500 setup + £25/month) is for sole traders and micro-businesses. Includes a 3-page mobile-first website, hosting, SSL, lead-capture form, Google indexing, one design revision, on-brand favicon and Open Graph cards, GA4 analytics, and 30 days of post-launch support.",
      links: [{ text: 'Launch details', url: 'pricing.html' }]
    },
    {
      q: 'What is included in the Grow package?',
      kw: ['grow', 'middle', 'popular', 'growth', 'sme', '1000', '75'],
      a: "Grow (£1,000 setup + £75/month) is our most popular package for growing SMEs. Includes a 5–8 page mobile-first site, hosting, SSL, full brand refresh, FAQ/schema/AEO layer, Google Business Profile connection, unlimited copy updates, monthly performance reports, priority support and 90 days of post-launch care.",
      links: [{ text: 'Grow details', url: 'pricing.html' }]
    },
    {
      q: 'What is included in the Flagship package?',
      kw: ['flagship', 'full', 'premium', 'big', 'best', 'top', '2000', '125'],
      a: "Flagship (£2,000 setup + £125/month) is the whole system. 8–14 pages, full brand identity, custom photography direction, SEO + AEO programme, LinkedIn setup, content strategy, custom Open Graph per page, quarterly strategy reviews with Harlyn, continuous improvement worked into the retainer.",
      links: [{ text: 'Flagship details', url: 'pricing.html' }]
    },
    {
      q: 'Do you offer bespoke development?',
      kw: ['bespoke', 'custom', 'platform', 'complex', 'big', 'enterprise', 'ecommerce', 'e-commerce', 'shop', 'store', 'booking', 'api', 'database', 'sql'],
      a: "Yes. Beyond the three packages we deliver bespoke platform work — the Needham Market FC site is a recent example: live FA Full-Time fixture/league API integrations, SQL-powered ticketing and venue booking, supporter portal, club shop and NeedhamFC TV. Bespoke projects are priced on scope.",
      links: [{ text: 'Needham FC case study', url: 'case-study-needham-market-fc.html' }, { text: 'Get in touch', url: 'contact.html' }]
    },
    {
      q: 'Do you produce video or animation?',
      kw: ['video', 'animation', 'film', 'shoot', 'reel', 'social', 'linkedin', 'campaign', 'launch', 'day', 'life', 'upstream', 'endava', 'promo', 'clip'],
      a: "Yes. AJH concepts, directs, edits and delivers short-form video for campaigns and launches. A recent example: a 50-second Day in the Life piece for Upstream Works Software supporting the pre-launch of their strategic partnership with Endava (NYSE: DAVA). Portrait format, tuned for LinkedIn and mobile social. Concept-to-delivery in days.",
      links: [{ text: 'Upstream × Endava case study', url: 'case-study-upstream-endava.html' }, { text: 'Get in touch', url: 'contact.html' }]
    },
    {
      q: 'Where is AJH based?',
      kw: ['where', 'based', 'location', 'address', 'office', 'suffolk', 'needham', 'creeting'],
      a: "AJH Technology is based at The Office, Grange Farm, All Saints Road, Creeting St Mary, Suffolk, IP6 8NG — just outside Needham Market, 15 minutes from Ipswich and Stowmarket. We serve clients across Suffolk, Norfolk, Essex and Cambridgeshire, plus remote UK.",
      links: [{ text: 'Contact', url: 'contact.html' }]
    },
    {
      q: 'What areas do you serve?',
      kw: ['areas', 'serve', 'coverage', 'region', 'ipswich', 'stowmarket', 'bury', 'sudbury', 'woodbridge', 'felixstowe', 'diss', 'norwich', 'norfolk', 'essex', 'east', 'anglia'],
      a: "Primary coverage: Ipswich, Stowmarket, Needham Market, Bury St Edmunds, Sudbury, Woodbridge, Felixstowe, Diss and surrounding Suffolk villages. Extended coverage across Norfolk, Essex and Cambridgeshire. Remote UK clients are also welcome.",
      links: [
        { text: 'Ipswich', url: 'web-design-ipswich.html' },
        { text: 'Stowmarket', url: 'web-design-stowmarket.html' },
        { text: 'Bury St Edmunds', url: 'web-design-bury-st-edmunds.html' }
      ]
    },
    {
      q: 'Who have you worked with?',
      kw: ['who', 'clients', 'worked', 'work', 'case', 'studies', 'portfolio', 'projects', 'customers', 'examples', 'references'],
      a: "Featured case studies: Upstream Works Software × Endava (short-form Day in the Life video supporting a strategic partnership pre-launch with NYSE-listed Endava), Needham Market FC (Southern League football club — brand, one-club website, live fixture/league APIs, SQL ticketing and venue booking, 3-month build), Eastrada Facilities Limited (CHAS/Achilles commercial cleaning contractor in Mendlesham), and Wall2Wall Group (CHAS-accredited plasterers in Stowmarket — full brand pack including vehicle livery).",
      links: [
        { text: 'All recent work', url: 'recent-work.html' },
        { text: 'Upstream × Endava', url: 'case-study-upstream-endava.html' },
        { text: 'Needham FC', url: 'case-study-needham-market-fc.html' },
        { text: 'Eastrada', url: 'case-study-eastrada.html' },
        { text: 'Wall2Wall', url: 'case-study-wall2wall.html' }
      ]
    },
    {
      q: 'What tech do you use?',
      kw: ['tech', 'technology', 'stack', 'code', 'build', 'built', 'framework', 'wordpress', 'html', 'css', 'javascript', 'netlify', 'github', 'sql', 'database'],
      a: "AJH builds mobile-first static HTML and CSS websites hosted on Netlify with GitHub-driven deploys. Sub-2-second load times on 4G, zero attack surface, easy long-term maintenance, no CMS bloat. Larger projects add SQL-backed transactional systems and API integrations. Every site ships with Schema.org structured data for SEO and AEO surfacing.",
      links: [{ text: 'Approach', url: 'work.html' }]
    },
    {
      q: 'How does AJH approach SEO?',
      kw: ['seo', 'search', 'google', 'ranking', 'indexing', 'organic', 'traffic'],
      a: "SEO is a first-class discipline at AJH, not an afterthought. Every site ships with clean semantic HTML, canonical URLs, comprehensive Schema.org markup (LocalBusiness, Service, Article, FAQPage, BreadcrumbList, Product/Offer), a valid XML sitemap, per-page Open Graph images and Search Console verification. Town-specific landing pages support local search. Grow and Flagship get monthly performance reports.",
      links: [{ text: 'AEO insights', url: 'insights-aeo-for-suffolk-businesses.html' }]
    },
    {
      q: 'What is AEO?',
      kw: ['aeo', 'answer', 'engine', 'chatgpt', 'perplexity', 'claude', 'llm', 'ai', 'assistant'],
      a: "AEO — Answer Engine Optimisation — is designed into every AJH project. We build direct-answer sections so ChatGPT, Google AI Overviews, Perplexity and Claude can quote your business as a named answer. FAQPage/Service/LocalBusiness schema, dateModified freshness, plain-English town/service language. Measured by asking the major AI assistants specific customer questions.",
      links: [{ text: 'AEO deep dive', url: 'insights-aeo-for-suffolk-businesses.html' }]
    },
    {
      q: 'Do you offer ongoing management?',
      kw: ['ongoing', 'management', 'managed', 'maintenance', 'support', 'monthly', 'retainer', 'after', 'launch'],
      a: "Yes — every AJH package includes ongoing managed service. The monthly fee covers hosting, SSL, security, uptime monitoring, GDPR-compliant forms, unlimited copy updates, Schema.org maintenance, sitemap refresh, Search Console monitoring and monthly performance reporting. Larger platform clients get weekly content refreshes and quarterly strategy reviews.",
      links: [{ text: 'Services', url: 'services.html' }]
    },
    {
      q: 'What kind of support do you offer?',
      kw: ['support', 'help', 'contact', 'response', 'urgent', 'emergency', 'broken', 'down'],
      a: "Standard: email (typical response within one business day), phone on 07488 286207 (business hours), and unlimited copy update requests. Emergencies (site down, form broken) are prioritised same-day where possible. Grow and Flagship get priority windows and monthly check-ins. Platform clients get a weekly working cadence with the founder.",
      links: [{ text: 'Contact', url: 'contact.html' }]
    },
    {
      q: 'Do you offer brand identity work?',
      kw: ['brand', 'branding', 'identity', 'logo', 'colours', 'colors', 'typography', 'visual', 'design'],
      a: "Yes. Grow and Flagship packages include a brand refresh — palette, type, logo tune-up and Open Graph card set. Full brand builds (like the 8-piece Wall2Wall pack — logo system, vehicle livery, site boards, letterhead, business cards, email signature, workwear, social kit) are quoted separately. The Needham Market FC project included a brand refresh around the historic 1919 crest.",
      links: [{ text: 'Brand service', url: 'brand.html' }, { text: 'Wall2Wall case study', url: 'case-study-wall2wall.html' }]
    },
    {
      q: 'Do you work with tradespeople?',
      kw: ['trade', 'trades', 'tradespeople', 'plumber', 'plumbers', 'electrician', 'electricians', 'builder', 'builders', 'plasterer', 'plasterers', 'chas', 'accredited'],
      a: "Yes — tradespeople are a core AJH audience. Recent trade clients include CHAS-accredited plasterers, commercial cleaning contractors and construction-adjacent businesses across Suffolk. Trade websites typically use Launch or Grow, with an emphasis on accreditation display (CHAS, Achilles, Constructionline, HSE), before/after photography, clear pricing, quote-request forms, and tel:/WhatsApp routes.",
      links: [{ text: 'Wall2Wall case study', url: 'case-study-wall2wall.html' }]
    },
    {
      q: 'What is the delivery process?',
      kw: ['process', 'delivery', 'phases', 'stages', 'steps', 'how', 'work', 'workflow', 'method', 'methodology'],
      a: "Four phases. 1) Discovery: a 20-minute strategy call plus a written brief. 2) Design: mobile-first flat files with one revision round. 3) Build: hand-coded static HTML/CSS, schema, indexing, GA4, form pipelines. 4) Launch: DNS/SSL, sitemap submission, Search Console, 30 days of post-launch care. Larger builds add an Integrate phase (API/SQL) between Build and Launch.",
      links: [{ text: 'Approach', url: 'work.html' }]
    },
    {
      q: 'What happens after the 12-month minimum?',
      kw: ['12', 'month', 'minimum', 'contract', 'end', 'after', 'cancel', 'termination', 'terminate', 'notice'],
      a: "After the 12-month minimum, packages move to a rolling monthly contract, cancellable by either party with one calendar month's written notice. No lock-in — clients stay because they want to. On termination we hand over the domain, DNS and content assets.",
      links: [{ text: 'Full terms', url: 'terms.html' }]
    },
    {
      q: 'Are you GDPR-compliant?',
      kw: ['gdpr', 'privacy', 'data', 'compliance', 'compliant', 'legal', 'lawful'],
      a: "Yes — fully UK GDPR-compliant. Every site ships with a tailored Privacy Notice, cookie transparency, GDPR-compliant contact forms with lawful basis captured, and analytics configured with consent. AJH itself is a UK data controller. Client data is stored in UK/EEA regions only.",
      links: [{ text: 'Privacy notice', url: 'privacy.html' }]
    },
    {
      q: 'Do you offer a free audit?',
      kw: ['free', 'audit', 'review', 'check', 'analysis', 'assessment'],
      a: "Yes. Free 1-page website audit for qualifying Suffolk businesses. Covers technical SEO, mobile page-speed, Schema.org markup, AEO readiness, accessibility (WCAG 2.1 AA), Open Graph, Google Business Profile status and 3 prioritised recommendations. Delivered within five working days.",
      links: [{ text: 'Request the audit', url: 'audit.html' }]
    },
    {
      q: 'How do I get started?',
      kw: ['start', 'started', 'begin', 'book', 'call', 'contact', 'reach', 'talk', 'chat', 'meet', 'first'],
      a: "20-minute strategy call. Book one at the contact page or call 07488 286207 (Harlyn). We'll discuss your business, goals, what a good lead looks like, and which package fits. You get a written scope, fixed price and proposed timeline. No obligation.",
      links: [{ text: 'Book a call', url: 'contact.html' }, { text: 'Call 07488 286207', url: 'tel:+447488286207' }]
    },
    {
      q: 'Do you sell websites for football clubs?',
      kw: ['football', 'sport', 'club', 'sports', 'team', 'league', 'fixtures', 'needham'],
      a: "Yes — Needham Market FC is one of our biggest projects. Southern League Premier Central club, one-club website covering Marketmen, Market Women, Reserves and Academy. Live FA Full-Time integrations for fixtures, league table, results, form and scorers. SQL-powered ticketing and venue booking. Sponsor architecture, club shop, NeedhamFC TV.",
      links: [{ text: 'Needham FC case study', url: 'case-study-needham-market-fc.html' }]
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

  const GREETING = "Hi — I'm the AJH site bot. Ask me anything about AJH Technology — pricing, packages, tech stack, sectors, delivery time, our team, or recent work. If I don't know, I'll point you to Harlyn.";

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
