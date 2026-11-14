/* analizza.ai — PT/EN language toggle.
   Classic script (no modules) so index.html keeps working over file://.
   In Node it exports its API for tests; in the browser it runs itself. */
(function () {
  'use strict';

  var STORAGE_KEY = 'analizza.lang';
  var LANGS = ['pt', 'en'];
  var HTML_LANG = { pt: 'pt-BR', en: 'en' };

  var DICT = {
    pt: {
      'meta.title': 'Analizza — portfólio'
    },
    en: {
      'meta.title': 'Analizza — portfolio'
    }
  };

  function isLang(value) {
    return LANGS.indexOf(value) !== -1;
  }

  function resolveLang(search, stored) {
    var fromQuery = null;
    try {
      fromQuery = new URLSearchParams(search || '').get('lang');
    } catch (e) {
      fromQuery = null;
    }
    if (isLang(fromQuery)) return fromQuery;
    if (isLang(stored)) return stored;
    return 'pt';
  }

  function translate(lang, key) {
    var table = DICT[lang] || {};
    if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
    if (Object.prototype.hasOwnProperty.call(DICT.pt, key)) return DICT.pt[key];
    return undefined;
  }

  function each(list, fn) {
    Array.prototype.forEach.call(list, fn);
  }

  function applyLang(doc, lang) {
    each(doc.querySelectorAll('[data-i18n]'), function (el) {
      var value = translate(lang, el.dataset.i18n);
      if (typeof value === 'string') el.textContent = value;
    });
    each(doc.querySelectorAll('[data-i18n-html]'), function (el) {
      var value = translate(lang, el.dataset.i18nHtml);
      if (typeof value === 'string') el.innerHTML = value;
    });
    each(doc.querySelectorAll('[data-lang]'), function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });
    doc.documentElement.lang = HTML_LANG[lang];
    var title = translate(lang, 'meta.title');
    if (typeof title === 'string') doc.title = title;
  }

  function readStored(storage) {
    try {
      return storage ? storage.getItem(STORAGE_KEY) : null;
    } catch (e) {
      return null;
    }
  }

  function writeStored(storage, lang) {
    try {
      if (storage) storage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* storage unavailable: the choice lasts for this visit only */
    }
  }

  function getStorage(win) {
    try {
      return win.localStorage;
    } catch (e) {
      return null;
    }
  }

  function init(win) {
    var doc = win.document;
    var storage = getStorage(win);
    var lang = resolveLang(win.location.search, readStored(storage));
    applyLang(doc, lang);
    each(doc.querySelectorAll('[data-lang]'), function (btn) {
      btn.addEventListener('click', function () {
        var next = btn.dataset.lang;
        if (!isLang(next)) return;
        applyLang(doc, next);
        writeStored(storage, next);
      });
    });
  }

  var api = {
    DICT: DICT,
    STORAGE_KEY: STORAGE_KEY,
    resolveLang: resolveLang,
    translate: translate,
    applyLang: applyLang,
    readStored: readStored,
    writeStored: writeStored,
    init: init
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else if (typeof window !== 'undefined') {
    window.AnalizzaI18n = api;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { init(window); });
    } else {
      init(window);
    }
  }
})();
