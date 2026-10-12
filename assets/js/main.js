/* ============================================================
   WAQAS AZIZ - main site script
   Navigation, filters, accordions, forms, consent, reveal.
   No frameworks. Respects prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';
  document.documentElement.classList.replace('no-js', 'js');
  var cfg = window.SITE_CONFIG || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.menu-toggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      mobileMenu.hidden = open;
      document.body.style.overflow = open ? '' : 'hidden';
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        mobileMenu.hidden = true;
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Active nav link ---------- */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a, .mobile-menu a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var panel = item.querySelector('.faq-a');
    if (!btn || !panel) return;
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var open = item.classList.contains('open');
      // close siblings in the same list
      var list = item.closest('.faq-list');
      if (list) list.querySelectorAll('.faq-item.open').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !open);
      btn.setAttribute('aria-expanded', String(!open));
      panel.style.maxHeight = !open ? panel.scrollHeight + 'px' : null;
    });
  });

  /* ---------- Work filters ---------- */
  var pillGroups = document.querySelectorAll('[data-filter-group]');
  pillGroups.forEach(function (group) {
    var pills = group.querySelectorAll('.pill');
    var targetSel = group.getAttribute('data-filter-target');
    var cards = document.querySelectorAll(targetSel + ' [data-category]');
    var empty = document.querySelector(targetSel + '-empty') || document.getElementById('workEmpty');
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.setAttribute('aria-pressed', 'false'); });
        pill.setAttribute('aria-pressed', 'true');
        var f = pill.getAttribute('data-filter');
        var visible = 0;
        cards.forEach(function (card) {
          var cats = (card.getAttribute('data-category') || '').split(' ');
          var show = f === 'all' || cats.indexOf(f) !== -1;
          card.classList.toggle('hide', !show);
          if (show) visible++;
        });
        if (empty) empty.classList.toggle('show', visible === 0);
      });
    });
  });

  /* ---------- Shop search + category filter ---------- */
  var searchInput = document.getElementById('shopSearch');
  var shopGrid = document.getElementById('shopGrid');
  var activeCat = 'all';
  function applyShopFilter() {
    if (!shopGrid) return;
    var q = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var cards = shopGrid.querySelectorAll('[data-category]');
    var visible = 0;
    cards.forEach(function (card) {
      var cats = (card.getAttribute('data-category') || '').split(' ');
      var text = (card.textContent || '').toLowerCase();
      var okCat = activeCat === 'all' || cats.indexOf(activeCat) !== -1;
      var okQ = !q || text.indexOf(q) !== -1;
      var show = okCat && okQ;
      card.classList.toggle('hide', !show);
      if (show) visible++;
    });
    var empty = document.getElementById('shopEmpty');
    if (empty) empty.classList.toggle('show', visible === 0);
  }
  if (searchInput) searchInput.addEventListener('input', applyShopFilter);
  document.querySelectorAll('[data-shop-filter]').forEach(function (pill) {
    pill.addEventListener('click', function () {
      document.querySelectorAll('[data-shop-filter]').forEach(function (p) { p.setAttribute('aria-pressed', 'false'); });
      pill.setAttribute('aria-pressed', 'true');
      activeCat = pill.getAttribute('data-shop-filter');
      applyShopFilter();
    });
  });

  /* ---------- Product gallery thumbs ---------- */
  document.querySelectorAll('.pd-gallery').forEach(function (gal) {
    var main = gal.querySelector('.pd-main-img img');
    gal.querySelectorAll('.pd-thumbs button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var img = btn.querySelector('img');
        if (!img || !main) return;
        gal.querySelectorAll('.pd-thumbs button').forEach(function (b) { b.setAttribute('aria-current', 'false'); });
        btn.setAttribute('aria-current', 'true');
        main.src = img.src.replace('-thumb', '');
        main.srcset = '';
        main.alt = img.alt;
      });
    });
  });

  /* ---------- Contact form ---------- */
  var form = document.getElementById('projectForm');
  if (form) {
    var note = document.getElementById('formNote');
    var dl = document.getElementById('f-deadline');
    if (dl) { var t = new Date(); dl.min = t.toISOString().split('T')[0]; }
    // Brief: allow at most 3 personality picks.
    var pboxes = form.querySelectorAll('input[name="personality"]');
    pboxes.forEach(function (box) {
      box.addEventListener('change', function () {
        var checked = form.querySelectorAll('input[name="personality"]:checked');
        if (checked.length > 3) box.checked = false;
      });
    });
    function setInvalid(input, bad) {
      var field = input.closest('.field');
      if (field) field.classList.toggle('invalid', bad);
      return !bad;
    }
    function showNote(type, title, html) {
      note.className = 'form-note show ' + type;
      note.innerHTML = '<strong>' + title + '</strong><span>' + html + '</span>';
      note.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    }
    // No endpoint configured: never fake a success. Offer real channels.
    if (!cfg.formEndpoint) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = true;
        form.querySelectorAll('[required]').forEach(function (input) {
          var bad = !input.value.trim() ||
            (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()));
          if (bad) ok = false;
          setInvalid(input, bad);
        });
        if (!ok) {
          showNote('error', 'Please review the highlighted fields.',
            'A few required fields need attention before you can send this.');
          return;
        }
        showNote('success', 'Your message is ready. One step left.',
          'Direct form delivery is being connected. For now, send your brief instantly on ' +
          '<a href="' + cfg.whatsapp + '" target="_blank" rel="noopener">WhatsApp</a> or email ' +
          '<a href="mailto:' + cfg.email + '">' + cfg.email + '</a>. ' +
          'Everything you typed above is still on this page, ready to copy.');
      });
      return;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Honeypot: bots fill it, humans never see it.
      if (form.querySelector('.honeypot input').value) return;
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        var bad = !input.value.trim() ||
          (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()));
        if (bad) ok = false;
        setInvalid(input, bad);
      });
      if (!ok) {
        showNote('error', 'Please review the highlighted fields.',
          'A few required fields need attention before you can send this.');
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      var data = {};
      new FormData(form).forEach(function (v, k) {
        data[k] = (data[k] === undefined) ? v : data[k] + ', ' + v;
      });
      fetch(cfg.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) {
        if (!r.ok) throw new Error('send failed');
        form.reset();
        showNote('success', 'Message sent. Thank you.',
          'Your project brief is on its way. Expect a reply within 2 business days. ' +
          'Need it faster? Message on <a href="' + cfg.whatsapp + '" target="_blank" rel="noopener">WhatsApp</a>.');
      }).catch(function () {
        showNote('error', 'Something went wrong sending your message.',
          'Please try again, or reach out directly on <a href="' + cfg.whatsapp + '" target="_blank" rel="noopener">WhatsApp</a> ' +
          'or <a href="mailto:' + cfg.email + '">' + cfg.email + '</a>.');
      }).finally(function () {
        btn.disabled = false;
        btn.textContent = 'Send Project Inquiry';
      });
    });
    form.querySelectorAll('[required]').forEach(function (input) {
      input.addEventListener('input', function () { setInvalid(input, false); });
    });
  }

  /* ---------- Newsletter ---------- */
  document.querySelectorAll('.newsletter-form').forEach(function (nf) {
    var msg = nf.parentElement.querySelector('.newsletter-msg') || nf.querySelector('.newsletter-msg');
    nf.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = nf.querySelector('input[type="email"]');
      var val = email.value.trim();
      function say(cls, text) {
        if (!msg) return;
        msg.className = 'newsletter-msg show ' + cls;
        msg.textContent = text;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { say('err', 'Please enter a valid email address.'); return; }
      if (!cfg.newsletterEndpoint) {
        say('ok', 'Noted. Email signup is being connected, meanwhile product news goes out on Instagram @designbywaqasa.');
        nf.reset();
        return;
      }
      fetch(cfg.newsletterEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: val })
      }).then(function () { say('ok', 'You are on the list. Welcome.'); nf.reset(); })
        .catch(function () { say('err', 'Could not subscribe right now. Please try again later.'); });
    });
  });

  /* ---------- Cookie consent ---------- */
  var banner = document.getElementById('cookieBanner');
  try {
    if (banner && !localStorage.getItem('waqas-cookie-consent')) {
      banner.classList.add('show');
      banner.querySelectorAll('[data-consent]').forEach(function (b) {
        b.addEventListener('click', function () {
          localStorage.setItem('waqas-cookie-consent', b.getAttribute('data-consent'));
          banner.classList.remove('show');
        });
      });
    }
  } catch (err) { /* storage unavailable: keep banner hidden */ }

  /* ---------- Analytics (GA4), loads only after cookie consent ---------- */
  (function () {
    var id = (window.SITE_CONFIG && window.SITE_CONFIG.analyticsId) || '';
    if (!id) return;
    function loadAnalytics() {
      if (window.gtag) return;
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', id, { anonymize_ip: true });
    }
    try {
      if (localStorage.getItem('waqas-cookie-consent') === 'accepted') { loadAnalytics(); return; }
    } catch (err) { /* no storage: wait for explicit accept */ }
    document.addEventListener('click', function handler(e) {
      var b = e.target && e.target.closest ? e.target.closest('[data-consent="accepted"]') : null;
      if (b) { document.removeEventListener('click', handler); loadAnalytics(); }
    });
  })();

  /* ---------- Reveal on scroll ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

/* PWA: register service worker for installable app + offline support */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  });
}
