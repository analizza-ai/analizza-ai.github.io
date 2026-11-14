const test = require('node:test');
const assert = require('node:assert/strict');
const { DICT, STORAGE_KEY, resolveLang, translate, applyLang, readStored, writeStored } = require('../assets/i18n.js');

function el(dataset, text = '') {
  return {
    dataset,
    textContent: text,
    innerHTML: text,
    attrs: {},
    setAttribute(k, v) { this.attrs[k] = v; },
  };
}

function fakeDoc(elements) {
  return {
    documentElement: { lang: '' },
    title: '',
    querySelectorAll(sel) {
      const attr = { '[data-i18n]': 'i18n', '[data-i18n-html]': 'i18nHtml', '[data-lang]': 'lang' }[sel];
      return elements.filter((e) => attr in e.dataset);
    },
  };
}

test('storage key', () => assert.equal(STORAGE_KEY, 'analizza.lang'));
test('resolveLang defaults to pt', () => assert.equal(resolveLang('', null), 'pt'));
test('query wins over storage', () => assert.equal(resolveLang('?lang=en', 'pt'), 'en'));
test('query pt wins over stored en', () => assert.equal(resolveLang('?lang=pt', 'en'), 'pt'));
test('stored used without query', () => assert.equal(resolveLang('', 'en'), 'en'));
test('unknown query and stored fall back to pt', () => assert.equal(resolveLang('?lang=xx', 'fr'), 'pt'));
test('unknown query falls back to valid stored', () => assert.equal(resolveLang('?lang=xx', 'en'), 'en'));

test('translate en falls back to pt', () => {
  DICT.pt['t.only'] = 'só pt';
  try {
    assert.equal(translate('en', 't.only'), 'só pt');
  } finally {
    delete DICT.pt['t.only'];
  }
});
test('translate unknown key is undefined', () => assert.equal(translate('pt', 'nope'), undefined));

test('readStored swallows throwing storage', () =>
  assert.equal(readStored({ getItem() { throw new Error('denied'); } }), null));
test('readStored handles missing storage', () => assert.equal(readStored(undefined), null));
test('writeStored swallows throwing storage', () =>
  assert.doesNotThrow(() => writeStored({ setItem() { throw new Error('denied'); } }, 'en')));
test('writeStored writes under the key', () => {
  const store = {};
  writeStored({ setItem(k, v) { store[k] = v; } }, 'en');
  assert.deepEqual(store, { 'analizza.lang': 'en' });
});

test('applyLang en sets lang, title, aria-pressed', () => {
  const ptBtn = el({ lang: 'pt' });
  const enBtn = el({ lang: 'en' });
  const doc = fakeDoc([ptBtn, enBtn]);
  applyLang(doc, 'en');
  assert.equal(doc.documentElement.lang, 'en');
  assert.equal(doc.title, 'Analizza — portfolio');
  assert.equal(enBtn.attrs['aria-pressed'], 'true');
  assert.equal(ptBtn.attrs['aria-pressed'], 'false');
});

test('applyLang pt sets pt-BR and pt title', () => {
  const doc = fakeDoc([]);
  applyLang(doc, 'pt');
  assert.equal(doc.documentElement.lang, 'pt-BR');
  assert.equal(doc.title, 'Analizza — portfólio');
});

test('applyLang translates text and html elements', () => {
  DICT.pt['t.text'] = 'olá'; DICT.en['t.text'] = 'hello';
  DICT.pt['t.html'] = 'a <em>b</em>'; DICT.en['t.html'] = 'x <em>y</em>';
  try {
    const t = el({ i18n: 't.text' }, 'olá');
    const h = el({ i18nHtml: 't.html' }, 'a <em>b</em>');
    applyLang(fakeDoc([t, h]), 'en');
    assert.equal(t.textContent, 'hello');
    assert.equal(h.innerHTML, 'x <em>y</em>');
  } finally {
    for (const k of ['t.text', 't.html']) { delete DICT.pt[k]; delete DICT.en[k]; }
  }
});

test('applyLang keeps text when key unknown', () => {
  const e = el({ i18n: 'nope' }, 'orig');
  applyLang(fakeDoc([e]), 'en');
  assert.equal(e.textContent, 'orig');
});
