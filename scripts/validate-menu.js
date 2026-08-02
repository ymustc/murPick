#!/usr/bin/env node
// murPick menu validator: node validate-menu.js <menu.html>
// Exit code 0 = all checks pass, 1 = failures. Validates machine-checkable hard
// requirements only; judgment calls still need a human / real-browser test.
const fs = require('fs');
const file = process.argv[2];
if (!file) { console.error('Usage: node validate-menu.js <menu.html>'); process.exit(2); }
const html = fs.readFileSync(file, 'utf8');
let fails = 0;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  -- ' + detail : ''}`);
  if (!ok) fails++;
};

// 1. checkboxes exist
const boxes = html.match(/<input[^>]*type="checkbox"[^>]*>/g) || [];
check('checkboxes present', boxes.length > 0, `${boxes.length} found`);

// 2. every checkbox has an id; ids are unique
const ids = boxes.map(b => (b.match(/id="([^"]+)"/) || [])[1]).filter(Boolean);
const dup = ids.filter((v, i) => ids.indexOf(v) !== i);
check('every checkbox has an id', ids.length === boxes.length, `${ids.length}/${boxes.length}`);
check('no duplicate ids', dup.length === 0, dup.length ? 'dupes: ' + [...new Set(dup)].slice(0, 5).join(',') : '');

// 3. burn-and-save mechanism: data-burned marker + download logic
check('data-burned marker', /data-burned/.test(html));
check('save/download logic', /(download|另存|save)/i.test(html) && /(outerHTML|documentElement)/.test(html));

// 4. localStorage auto-save
check('localStorage auto-save', /localStorage/.test(html));

// 5. restore prefers burned state
check('burned state preferred on restore', /data-burned/.test(html) && /(data-burned[\s\S]{0,600}?localStorage|burned)/.test(html));

// 6. selection counter + JSON export + comment box
check('selection counter', /(已选|已点|count|selected)/i.test(html));
check('JSON export', /JSON/.test(html) && /(导出|export)/i.test(html));
check('comment textarea', /<textarea/.test(html));

// 7. per-card select-all
check('per-card select-all', /(全选|select all)/i.test(html));

// 8. v0.2: collapsible sections + show-only-checked filter
check('collapsible sections', /(<details|data-collapsed)/i.test(html));
check('show-only-checked filter', /(data-filter|only-?checked|只看已勾)/i.test(html));

// 9. self-contained: no external script/style dependencies
const extDep = html.match(/<script[^>]+src="https?:|<link[^>]+rel="stylesheet"[^>]+href="https?:/g) || [];
check('self-contained (no external js/css)', extDep.length === 0, extDep.length ? extDep[0] : '');

console.log(fails === 0 ? '\nAll checks passed' : `\n${fails} check(s) failed`);
process.exit(fails === 0 ? 0 : 1);
