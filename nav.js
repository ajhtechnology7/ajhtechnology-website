/* AJH Technology · mobile menu
   On screens under 800px the top links are hidden, so this adds a
   tap-to-open menu button that shows the same links. */
(function () {
  'use strict';
  var nav = document.querySelector('.nav');
  var links = nav && nav.querySelector('.nav-links');
  if (!nav || !links) return;

  var css = document.createElement('style');
  css.textContent =
    '.nav-toggle{display:none;align-items:center;justify-content:center;width:44px;height:44px;border-radius:12px;border:1px solid #2a2a2a;background:#141414;color:#FAFAF7;cursor:pointer;margin-left:10px;flex:none}' +
    '.nav-toggle span,.nav-toggle span::before,.nav-toggle span::after{display:block;width:18px;height:2px;background:currentColor;border-radius:2px;position:relative;transition:transform .2s,opacity .2s}' +
    '.nav-toggle span::before,.nav-toggle span::after{content:"";position:absolute;left:0}' +
    '.nav-toggle span::before{top:-6px}.nav-toggle span::after{top:6px}' +
    '.nav.menu-open .nav-toggle span{background:transparent}' +
    '.nav.menu-open .nav-toggle span::before{transform:translateY(6px) rotate(45deg)}' +
    '.nav.menu-open .nav-toggle span::after{transform:translateY(-6px) rotate(-45deg)}' +
    '.nav-mobile{display:none}' +
    '.nav-cta{white-space:nowrap}' +
    '@media (max-width:800px){' +
      '.nav-right{gap:0}.nav-cta{padding:10px 14px}' +
      '.nav-toggle{display:inline-flex}' +
      '.nav-mobile{position:absolute;left:0;right:0;top:100%;background:#0A0A0A;border-bottom:1px solid #222;padding:8px 20px 22px;flex-direction:column}' +
      '.nav.menu-open .nav-mobile{display:flex}' +
      '.nav-mobile a{padding:15px 4px;font-size:18px;font-weight:600;color:#FAFAF7;border-bottom:1px solid #1c1c1c}' +
      '.nav-mobile a.active{color:#C7F100}' +
      '.nav-mobile a.nav-mobile-call{border-bottom:0;color:#C7F100;font-size:16px;margin-top:6px}' +
    '}' +
    '@media (max-width:370px){.nav-cta{display:none}}';
  document.head.appendChild(css);

  var panel = document.createElement('div');
  panel.className = 'nav-mobile';
  panel.id = 'nav-mobile';
  Array.prototype.forEach.call(links.querySelectorAll('a'), function (a) {
    var c = a.cloneNode(true);
    panel.appendChild(c);
  });
  var call = document.createElement('a');
  call.href = 'tel:+447488286207';
  call.className = 'nav-mobile-call';
  call.textContent = 'Call 07488 286207';
  panel.appendChild(call);

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'nav-toggle';
  btn.setAttribute('aria-label', 'Open menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'nav-mobile');
  btn.appendChild(document.createElement('span'));

  var right = nav.querySelector('.nav-right') || nav;
  right.appendChild(btn);
  nav.appendChild(panel);

  function setOpen(open) {
    nav.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  btn.addEventListener('click', function () { setOpen(!nav.classList.contains('menu-open')); });
  panel.addEventListener('click', function (e) { if (e.target.tagName === 'A') setOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
})();
