/* ==================================================================
   Hasa / হাসা — site behaviour
   ------------------------------------------------------------------
   Language toggle, theme toggle, mobile nav, sticky header, and a
   light scroll-reveal. No dependencies.

   The language toggle shows/hides duplicated markup rather than
   fetching translations, so switching is instant and works offline.
   Both languages are in every page; CSS hides the inactive one.
   ================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  var LANG_KEY = 'hasa.lang';
  var THEME_KEY = 'hasa.theme';

  /* ---------- storage helpers (private mode can throw) ---------- */

  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* no-op */ }
  }

  /* ---------- language ------------------------------------------ */

  function applyLang(lang) {
    lang = lang === 'en' ? 'en' : 'bn';
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);

    // Swap the document title so bookmarks and tabs match.
    var titles = document.body ? document.body.dataset : null;
    if (titles) {
      var t = lang === 'en' ? titles.titleEn : titles.titleBn;
      if (t) document.title = t;
    }

    document.querySelectorAll('[data-setlang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.setlang === lang));
    });

    // Keep the toggle's own label meaningful to screen readers.
    var group = document.querySelector('.langswitch');
    if (group) {
      group.setAttribute('aria-label', lang === 'en' ? 'Language' : 'ভাষা');
    }
  }

  function initLang() {
    applyLang(read(LANG_KEY) || root.getAttribute('data-lang') || 'bn');

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-setlang]');
      if (!btn) return;
      var lang = btn.dataset.setlang;
      write(LANG_KEY, lang);
      applyLang(lang);
    });
  }

  /* ---------- theme --------------------------------------------- */

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    var btn = document.querySelector('[data-theme-toggle]');
    if (btn) {
      var dark = theme === 'dark';
      btn.setAttribute('aria-pressed', String(dark));
      btn.setAttribute(
        'aria-label',
        root.getAttribute('data-lang') === 'en'
          ? (dark ? 'Switch to light mode' : 'Switch to dark mode')
          : (dark ? 'লাইট মোডে যান' : 'ডার্ক মোডে যান')
      );
    }
  }

  function initTheme() {
    var stored = read(THEME_KEY);
    var prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(stored || (prefersDark ? 'dark' : 'light'));

    var btn = document.querySelector('[data-theme-toggle]');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        write(THEME_KEY, next);
        applyTheme(next);
      });
    }

    // Follow the system only while the visitor hasn't chosen for themselves.
    if (!stored && window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function (e) {
        if (!read(THEME_KEY)) applyTheme(e.matches ? 'dark' : 'light');
      };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  /* ---------- mobile nav ---------------------------------------- */

  function initNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    }

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('open'));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Reset when the layout returns to desktop, so the menu can't get
    // stuck open behind a hidden toggle.
    var mq = window.matchMedia('(min-width: 52.0625rem)');
    var onWide = function (e) { if (e.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener('change', onWide);
    else if (mq.addListener) mq.addListener(onWide);
  }

  /* ---------- sticky header shadow ------------------------------ */

  function initHeader() {
    var header = document.querySelector('.site');
    if (!header) return;
    var ticking = false;

    function update() {
      header.classList.toggle('stuck', window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- scroll reveal ------------------------------------- */

  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    var reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    items.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 60 + 'ms';
      io.observe(el);
    });
  }

  /* ---------- directory filters --------------------------------- */
  /* Entries carry data-district and data-kind. A filter set with no active
     button means "all", so the page starts showing everything and degrades
     to the full list if the script never runs. */

  function initFilters() {
    var root_ = document.querySelector('[data-directory]');
    if (!root_) return;

    var entries = Array.prototype.slice.call(root_.querySelectorAll('[data-kind]'));
    var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
    var countEl = document.querySelector('[data-filter-count]');
    var emptyEl = document.querySelector('[data-filter-empty]');
    var resetEl = document.querySelector('[data-filter-reset]');
    if (!entries.length || !buttons.length) return;

    var active = { kind: null, district: null };

    function matches(el) {
      if (active.kind && el.dataset.kind !== active.kind) return false;
      if (active.district) {
        var list = (el.dataset.district || '').split(/\s+/);
        if (list.indexOf(active.district) === -1) return false;
      }
      return true;
    }

    function apply() {
      var shown = 0;

      entries.forEach(function (el) {
        var ok = matches(el);
        el.hidden = !ok;
        if (ok) shown++;
      });

      // Hide a section heading when everything under it is filtered out.
      root_.querySelectorAll('[data-group]').forEach(function (group) {
        var any = group.querySelector('[data-kind]:not([hidden])');
        group.hidden = !any;
      });

      buttons.forEach(function (btn) {
        var group = btn.dataset.filterGroup;
        var value = btn.dataset.filter;
        var on = value === '' ? !active[group] : active[group] === value;
        btn.setAttribute('aria-pressed', String(on));
      });

      if (countEl) {
        countEl.textContent = String(shown);
        var total = countEl.parentElement &&
          countEl.parentElement.querySelector('[data-filter-total]');
        if (total) total.textContent = String(entries.length);
      }
      if (emptyEl) emptyEl.hidden = shown !== 0;
      if (resetEl) resetEl.hidden = !active.kind && !active.district;
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var group = btn.dataset.filterGroup;
        var value = btn.dataset.filter;
        active[group] = value === '' || active[group] === value ? null : value;
        apply();
      });
    });

    if (resetEl) {
      resetEl.addEventListener('click', function () {
        active.kind = null;
        active.district = null;
        apply();
      });
    }

    apply();
  }

  /* ---------- boot ---------------------------------------------- */

  function init() {
    initLang();
    initTheme();
    initNav();
    initHeader();
    initReveal();
    initFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
