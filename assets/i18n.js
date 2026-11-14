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
      'meta.title': 'Analizza — portfólio',
      'nav.equity': 'Equity',
      'nav.consulting': 'Consultoria',
      'nav.contact': 'Contato',
      'hero.eyebrow': 'Analizza · estúdio de produtos de IA',
      'hero.title': 'Construímos produtos de IA <em>e investimos neles.</em>',
      'hero.sub': 'A Analizza projeta, desenvolve e opera software com IA. Em alguns produtos entramos como sócios; para outras empresas, entregamos sistemas sob medida.',
      'hero.cta.primary': 'Ver portfólio',
      'hero.cta.secondary': 'Fale conosco',
      'equity.num': '§ 01 / Equity',
      'equity.title': 'Produtos em que somos sócios.',
      'equity.lede': 'Apps que ajudamos a construir do zero e nos quais a Analizza tem participação.',
      'badge.equity': 'Equity',
      'badge.consulting': 'Consultoria',
      'card.auction.desc': 'Agente de IA que analisa leilões de imóveis, disponível pela web e como servidor MCP para outros agentes.',
      'card.yeroon.desc': 'Plataforma white-label para lançar um app com a própria marca, mantendo os dados sob seu controle.',
      'card.play.desc': 'Streaming de vídeo próprio: upload direto para object storage e reprodução no navegador, sem depender de um serviço de streaming de mercado.',
      'card.ralvin.desc': 'Plataforma de ensino (Ralvin School) e marketplace de skills para agentes de IA.',
      'card.visit': 'Visitar site',
      'consulting.num': '§ 02 / Consultoria',
      'consulting.title': 'Sistemas que entregamos para clientes.',
      'consulting.lede': 'Projetos de consultoria em que desenhamos e construímos o software de ponta a ponta.',
      'card.eaf.desc': 'Envio, classificação, assinatura e busca de documentos, com um agente de IA (Ólly) e um gateway MCP que conecta os sistemas da instituição.',
      'card.ser.desc': 'Gestão de contas e carga de arquivos de projetos, com fluxo de aprovação.',
      'contact.num': '§ 03 / Contato',
      'contact.title': 'Vamos conversar.',
      'contact.lede': 'Quer uma parceria em um produto ou um sistema sob medida? Mande uma mensagem curta e respondemos em até um dia útil.',
      'footer.copy': '© 2026 Analizza',
      'footer.portfolio': 'Portfólio',
      'footer.company': 'Empresa',
      'footer.place': 'São Paulo · Remoto'
    },
    en: {
      'meta.title': 'Analizza — portfolio',
      'nav.equity': 'Equity',
      'nav.consulting': 'Consulting',
      'nav.contact': 'Contact',
      'hero.eyebrow': 'Analizza · AI product studio',
      'hero.title': 'We build AI products <em>and invest in them.</em>',
      'hero.sub': 'Analizza designs, builds and runs AI-powered software. In some products we come in as partners; for other companies, we deliver custom systems.',
      'hero.cta.primary': 'See portfolio',
      'hero.cta.secondary': 'Talk to us',
      'equity.num': '§ 01 / Equity',
      'equity.title': 'Products we co-own.',
      'equity.lede': 'Apps we helped build from scratch and in which Analizza holds an equity stake.',
      'badge.equity': 'Equity',
      'badge.consulting': 'Consulting',
      'card.auction.desc': 'AI agent that analyzes real estate auctions, available on the web and as an MCP server for other agents.',
      'card.yeroon.desc': 'White-label platform to launch an app under your own brand, keeping your data under your control.',
      'card.play.desc': 'In-house video streaming: direct upload to object storage and in-browser playback, with no third-party streaming service.',
      'card.ralvin.desc': 'Learning platform (Ralvin School) and a skills marketplace for AI agents.',
      'card.visit': 'Visit site',
      'consulting.num': '§ 02 / Consulting',
      'consulting.title': 'Systems we delivered for clients.',
      'consulting.lede': 'Consulting engagements where we designed and built the software end to end.',
      'card.eaf.desc': "Document upload, classification, signing and search, with an AI agent (Ólly) and an MCP gateway connecting the institution's systems.",
      'card.ser.desc': 'Account management and project file intake, with an approval workflow.',
      'contact.num': '§ 03 / Contact',
      'contact.title': "Let's talk.",
      'contact.lede': 'Looking for a product partnership or a custom system? Send a short note and we reply within one business day.',
      'footer.copy': '© 2026 Analizza',
      'footer.portfolio': 'Portfolio',
      'footer.company': 'Company',
      'footer.place': 'São Paulo · Remote'
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
