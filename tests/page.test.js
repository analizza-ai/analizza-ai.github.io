const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { DICT } = require('../assets/i18n.js');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

function section(id) {
  const start = html.search(new RegExp(`<section[^>]*id="${id}"`));
  assert.ok(start !== -1, `section #${id} not found`);
  const end = html.indexOf('</section>', start);
  return html.slice(start, end);
}

function keysInHtml() {
  return [...html.matchAll(/data-i18n(?:-html)?="([^"]+)"/g)].map((m) => m[1]);
}

// Each element carrying data-i18n / data-i18n-html, with its inner content.
function textNodes() {
  const out = [];
  const re = /<([a-z0-9]+)\b[^>]*\sdata-i18n(-html)?="([^"]+)"[^>]*>/g;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[1];
    const from = m.index + m[0].length;
    // find the matching close tag, accounting for nested same-name tags
    const tagRe = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'g');
    tagRe.lastIndex = from;
    let depth = 1;
    let t;
    while (depth > 0 && (t = tagRe.exec(html))) depth += t[1] ? -1 : 1;
    out.push({ key: m[3], html: Boolean(m[2]), text: html.slice(from, t.index) });
  }
  return out;
}

function normalize(s) {
  return String(s)
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

test('html lang is pt-BR', () => assert.match(html, /<html lang="pt-BR">/));
test('title is the PT title', () => assert.match(html, /<title>Analizza — portfólio<\/title>/));

test('all six projects present', () =>
  ['auction', 'yeroon', 'play', 'ralvin', 'eaf', 'ser'].forEach((p) =>
    assert.match(html, new RegExp(`data-project="${p}"`), p)));

test('equity section has the four apps with Equity badges', () => {
  const s = section('equity');
  assert.equal(s.match(/data-i18n="badge.equity"/g).length, 4);
  ['auction', 'yeroon', 'play', 'ralvin'].forEach((p) => assert.match(s, new RegExp(`data-project="${p}"`), p));
});

test('consulting section has the two cases with Consultoria badges', () => {
  const s = section('consulting');
  assert.equal(s.match(/data-i18n="badge.consulting"/g).length, 2);
  ['eaf', 'ser'].forEach((p) => assert.match(s, new RegExp(`data-project="${p}"`), p));
});

test('only Yeroon links out', () => {
  const ext = html.match(/href="https?:\/\/[^"]+"/g) || [];
  assert.deepEqual(ext, ['href="https://yeroon.video"']);
  assert.match(html, /href="https:\/\/yeroon.video" target="_blank" rel="noopener"/);
});

test('nav links to the three sections and the language toggle', () => {
  ['#equity', '#consulting', '#contact'].forEach((h) => assert.ok(html.includes(`href="${h}"`), h));
  assert.match(html, /<button type="button" data-lang="pt" aria-pressed="true">PT<\/button>/);
  assert.match(html, /<button type="button" data-lang="en" aria-pressed="false">EN<\/button>/);
});

test('old real-estate copy is gone', () =>
  ['Underwrite real estate', 'Legal analysis', 'Valuation &amp; ROI', 'Engagement timeline', 'Construction analysis']
    .forEach((s) => assert.ok(!html.includes(s), s)));

test('no equity percentages on the page', () => assert.doesNotMatch(section('equity'), /\d+\s?%/));

test('pt and en have the same keys', () =>
  assert.deepEqual(Object.keys(DICT.en).sort(), Object.keys(DICT.pt).sort()));

test('no empty translations', () =>
  ['pt', 'en'].forEach((l) => Object.entries(DICT[l]).forEach(([k, v]) =>
    assert.ok(typeof v === 'string' && v.trim(), `${l}:${k}`))));

test('every data-i18n key exists in the dictionary', () =>
  keysInHtml().forEach((k) => assert.ok(k in DICT.pt, k)));

test('static text equals the PT dictionary (no-JS page is complete)', () => {
  const nodes = textNodes();
  assert.ok(nodes.length > 20, `only ${nodes.length} translatable nodes`);
  nodes.forEach(({ key, text }) => assert.equal(normalize(text), normalize(DICT.pt[key]), key));
});

test('i18n script loaded as classic deferred script', () =>
  assert.match(html, /<script src="assets\/i18n.js" defer><\/script>/));
