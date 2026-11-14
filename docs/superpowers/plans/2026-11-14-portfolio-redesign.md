# analizza.ai portfolio redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the real-estate due-diligence landing page with a single-page portfolio of Analizza's equity apps and consulting cases, in Portuguese with an EN toggle.

**Architecture:** `index.html` stays a single static page with no build. A small classic script `assets/i18n.js` holds the PT/EN dictionary and the toggle logic; it exports its functions through `module.exports` when loaded by Node so it can be tested with `node --test`, and attaches to `window` in the browser. The page's static text is the PT copy, so it reads fully without JS.

**Tech Stack:** HTML5, CSS with existing `styles/tokens.css`, vanilla JS (classic script, works over `file://`), Node 26 built-in test runner (`node --test`, no packages).

**Spec:** `docs/superpowers/specs/2026-11-14-portfolio-redesign-design.md`

**Plan decision (deviation from spec wording):** the spec says the dictionary lives in an inline script; this plan puts it in `assets/i18n.js` so it can be unit-tested. It is still a plain file with no build or dependency, which is what the spec's constraint protects.

## Global Constraints

- No build step and no new dependency; opening `index.html` directly in a browser keeps working (so no `type="module"` scripts).
- Default language `pt-BR`; toggle `PT | EN` in the nav; `?lang=en` forces English; choice stored in `localStorage` key `analizza.lang`, every access wrapped in try/catch.
- Equity cards carry only the badge "Equity" — no percentage, no role.
- Keep the visual identity: `styles/tokens.css`, Az logo, Source Serif 4 / Geist / Geist Mono, automatic dark mode.
- Responsive down to 375px wide with no horizontal scroll.
- Only Yeroon links out, to `https://yeroon.video` (`target="_blank" rel="noopener"`); other cards have no link.
- Tab title: PT `Analizza — portfólio`, EN `Analizza — portfolio`.
- Deploy (`.github/workflows/deploy.yml`, `make deploy`) is unchanged.

## Review Focus

1. `?lang=xx` (unknown value) or garbage query → page shows Portuguese, no error. (Task 1 test)
2. `localStorage` throws (private window, blocked storage) → toggle still works for the visit, defaults to PT. (Task 1 test)
3. A key missing from the EN dictionary → element keeps PT text, never blank or `undefined`. (Task 1 test)
4. JS disabled or failing → full Portuguese page; static HTML text equals `DICT.pt`. (Task 2 test)
5. Phone width / dark mode → no horizontal scroll, readable badges and toggle. (Task 3 manual check)

---

### Task 1: i18n engine

**Files:**
- Create: `assets/i18n.js`
- Test: `tests/i18n.test.js`

**Interfaces:**
- Produces (on `module.exports` in Node, `window.AnalizzaI18n` in browser):
  - `DICT: { pt: Record<string,string>, en: Record<string,string> }`
  - `STORAGE_KEY = 'analizza.lang'`
  - `resolveLang(search: string, stored: string|null): 'pt'|'en'` — `?lang=pt|en` wins; else `stored` if `'pt'|'en'`; else `'pt'`.
  - `translate(lang: 'pt'|'en', key: string): string|undefined` — EN falls back to PT; unknown key → `undefined`.
  - `applyLang(doc, lang): void` — for each `[data-i18n]` sets `textContent`, for each `[data-i18n-html]` sets `innerHTML` (only when `translate` returns a string); sets `doc.documentElement.lang` to `'pt-BR'`/`'en'`; sets `doc.title` from key `meta.title`; sets `aria-pressed` on `[data-lang]` buttons (`"true"` for the active one).
  - `readStored(storage): string|null` and `writeStored(storage, lang): void` — swallow exceptions.
  - `init(win): void` — resolves lang from `win.location.search` + stored, applies it, wires click on `[data-lang]` buttons to apply + store. Called automatically only when `typeof window !== 'undefined'`, on `DOMContentLoaded`.
- File shape: one IIFE; at the end `if (typeof module !== 'undefined' && module.exports) module.exports = api; else window.AnalizzaI18n = api;`.
- In this task `DICT` holds only `meta.title` (both languages, values from Global Constraints); Task 2 fills the rest.

- [ ] **Step 1: Write the failing tests** in `tests/i18n.test.js` (CommonJS, `node:test`, `node:assert/strict`, `require('../assets/i18n.js')`). Use a fake document: `{ documentElement: {lang:''}, title:'', querySelectorAll(sel) }` returning arrays of `{ dataset:{i18n|i18nHtml|lang}, textContent, innerHTML, setAttribute(k,v) }`.

```js
test('resolveLang defaults to pt', () => assert.equal(resolveLang('', null), 'pt'));
test('query wins over storage', () => assert.equal(resolveLang('?lang=en', 'pt'), 'en'));
test('query pt wins over stored en', () => assert.equal(resolveLang('?lang=pt', 'en'), 'pt'));
test('stored used without query', () => assert.equal(resolveLang('', 'en'), 'en'));
test('unknown query and stored fall back to pt', () => assert.equal(resolveLang('?lang=xx', 'fr'), 'pt'));
test('translate en falls back to pt', () => { DICT.pt['t.only'] = 'só pt'; assert.equal(translate('en', 't.only'), 'só pt'); });
test('translate unknown key is undefined', () => assert.equal(translate('pt', 'nope'), undefined));
test('readStored swallows throwing storage', () => assert.equal(readStored({ getItem() { throw new Error('denied'); } }), null));
test('writeStored swallows throwing storage', () => assert.doesNotThrow(() => writeStored({ setItem() { throw new Error('denied'); } }, 'en')));
test('applyLang en sets lang, title, aria-pressed', () => { /* fake doc with PT/EN buttons */
  applyLang(doc, 'en');
  assert.equal(doc.documentElement.lang, 'en');
  assert.equal(doc.title, 'Analizza — portfolio');
  assert.equal(enBtn.attrs['aria-pressed'], 'true');
  assert.equal(ptBtn.attrs['aria-pressed'], 'false');
});
test('applyLang keeps text when key unknown', () => { /* element with data-i18n="nope", textContent 'orig' */
  applyLang(doc, 'en');
  assert.equal(el.textContent, 'orig');
});
```

- [ ] **Step 2: Run** `node --test tests/` — Expected: FAIL, `Cannot find module '../assets/i18n.js'`.
- [ ] **Step 3: Implement `assets/i18n.js`** per the Interfaces block. `resolveLang` parses with `new URLSearchParams(search).get('lang')`.
- [ ] **Step 4: Run** `node --test tests/` — Expected: all pass.
- [ ] **Step 5: Add a `test` target to `Makefile`:** `test: ## Run tests` → `node --test tests/`, and add `test` to `.PHONY`. Run `make test`, expect pass.
- [ ] **Step 6: Commit**

```bash
git add assets/i18n.js tests/i18n.test.js Makefile
git commit -m "Add PT/EN i18n engine for the site"
```

---

### Task 2: Rewrite the page and fill the dictionary

**Files:**
- Modify: `index.html` (whole `<body>`, `<title>`, `<html lang>`, and the inline `<style>`)
- Modify: `assets/i18n.js` (`DICT` only)
- Test: `tests/page.test.js`

**Interfaces:**
- Consumes: `DICT`, `translate` from Task 1; `init` runs itself in the browser.
- Produces, in `index.html`:
  - `<html lang="pt-BR">`, `<title>Analizza — portfólio</title>`, `<script src="assets/i18n.js" defer></script>` in `<head>`.
  - Nav: brand, links `#equity` `#consulting` `#contact` (keys `nav.equity`, `nav.consulting`, `nav.contact`), and `<div class="lang-toggle"><button type="button" data-lang="pt" aria-pressed="true">PT</button><button type="button" data-lang="en" aria-pressed="false">EN</button></div>`.
  - Hero `#top`: keep the Az logomark; keys `hero.eyebrow`, `hero.title` (as `data-i18n-html`, keeps the `<em>`), `hero.sub`, `hero.cta.primary` (→ `#equity`), `hero.cta.secondary` (→ `#contact`). Message: a studio that builds and invests in AI products.
  - `<section id="equity">`: keys `equity.num` ("§ 01 / Equity"), `equity.title`, `equity.lede`; four `<article class="product" data-project="…">` with `data-project` values `auction`, `yeroon`, `play`, `ralvin`, names `Analizza Auction`, `Yeroon`, `Yeroon Play`, `Ralvin` (not translated), badge `<span class="product-status status-equity" data-i18n="badge.equity">Equity</span>`, description key `card.<project>.desc`. Yeroon card also has `<a href="https://yeroon.video" target="_blank" rel="noopener" data-i18n="card.visit">`.
  - `<section id="consulting">`: keys `consulting.num` ("§ 02 / Consultoria"), `consulting.title`, `consulting.lede`; two articles `data-project` `eaf` and `ser`, names `EAF Documents System`, `SER`, badge `status-consulting` with key `badge.consulting`, description `card.<project>.desc`.
  - `<section id="contact">`: keys `contact.num`, `contact.title`, `contact.lede`, mailto `contact@analizza.ai`.
  - Footer: column links to the three sections (reuse `nav.*` keys), `footer.copy` ("© 2026 Analizza"), `footer.place` ("São Paulo · Remoto" / "São Paulo · Remote").
- Descriptions start from the spec's table ("Conteúdo dos cards"); write final PT and EN copy in the current site's tone, one or two sentences each.
- CSS: reuse `.product`, `.product-head`, `.product-status`, `.section-head`; add `.status-equity`, `.status-consulting`, `.lang-toggle` using tokens; delete rules used only by removed markup (`.product-output`, `.product-icon` if unused, `.consult-*`, `.process*`, `.status-live/.status-beta/.status-soon`). Consulting grid may hold two cards per row.

- [ ] **Step 1: Write the failing tests** in `tests/page.test.js` (read `index.html` with `fs`, require `../assets/i18n.js`; parse with regexes over the file — no DOM library).

```js
test('html lang is pt-BR', () => assert.match(html, /<html lang="pt-BR">/));
test('all six projects present', () => ['auction','yeroon','play','ralvin','eaf','ser']
  .forEach(p => assert.match(html, new RegExp(`data-project="${p}"`))));
test('equity section has four Equity badges', () => assert.equal(section('equity').match(/data-i18n="badge.equity"/g).length, 4));
test('consulting section has two Consultoria badges', () => assert.equal(section('consulting').match(/data-i18n="badge.consulting"/g).length, 2));
test('only Yeroon links out', () => { const ext = html.match(/href="https?:\/\/[^"]+"/g) || [];
  assert.deepEqual(ext, ['href="https://yeroon.video"']); });
test('old real-estate copy is gone', () => ['Underwrite real estate','Legal analysis','Valuation &amp; ROI','Engagement timeline']
  .forEach(s => assert.ok(!html.includes(s), s)));
test('no equity percentages on the page', () => assert.doesNotMatch(section('equity'), /\d+\s?%/));
test('pt and en have the same keys', () => assert.deepEqual(Object.keys(DICT.en).sort(), Object.keys(DICT.pt).sort()));
test('every data-i18n key exists in the dictionary', () => keysInHtml().forEach(k => assert.ok(k in DICT.pt, k)));
test('static text equals the PT dictionary (no-JS page is complete)', () =>
  textNodes().forEach(({ key, text }) => assert.equal(normalize(text), normalize(DICT.pt[key]), key)));
test('i18n script loaded as classic deferred script', () => assert.match(html, /<script src="assets\/i18n.js" defer><\/script>/));
```

Helpers: `section(id)` returns the substring from `<section … id="<id>"` to the next `</section>`; `keysInHtml()` collects `data-i18n(-html)?="…"`; `textNodes()` returns `{key, text}` for each element with `data-i18n`/`data-i18n-html` (inner content up to its closing tag); `normalize` collapses whitespace and decodes `&amp;`.

- [ ] **Step 2: Run** `node --test tests/` — Expected: page tests FAIL (lang, projects, …); Task 1 tests still pass.
- [ ] **Step 3: Rewrite `index.html` and fill `DICT.pt`/`DICT.en`** per the Interfaces block.
- [ ] **Step 4: Run** `node --test tests/` — Expected: all pass.
- [ ] **Step 5: Commit**

```bash
git add index.html assets/i18n.js tests/page.test.js
git commit -m "Rewrite site as Analizza equity and consulting portfolio"
```

---

### Task 3: README and browser check

**Files:**
- Modify: `README.md` (replace "Products" and "Consulting" sections with "Equity" — the four apps — and "Consultoria" — the two cases; tagline becomes the studio positioning; add `make test` under Local development; mention `?lang=en`)

- [ ] **Step 1: Update `README.md`** as above; keep the Stack, CI/CD and Contact sections, adding `assets/i18n.js` to the Stack table.
- [ ] **Step 2: Browser check (built-in browser, open `index.html` via `file://`):**
  - Default load shows Portuguese, tab title `Analizza — portfólio`.
  - Click EN → all text English, title `Analizza — portfolio`, `<html lang="en">`; reload → still English.
  - Open with `?lang=pt` → Portuguese; `?lang=xx` → Portuguese.
  - Resize to 375×812: `document.documentElement.scrollWidth <= innerWidth` is `true`; toggle and badges readable.
  - Dark color scheme: badges and toggle keep contrast.
  - Console has no errors.
- [ ] **Step 3: Run** `make test` — Expected: all pass.
- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "Update README for the portfolio site"
```
