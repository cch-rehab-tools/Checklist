const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const inlineScripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)]
  .map(match => match[1])
  .filter(Boolean);

for (const script of inlineScripts) new Function(script);

assert.match(html, /id="discipline-ot"[\s\S]*chooseDiscipline\('OT'\)/);
assert.match(html, /id="discipline-pt"[\s\S]*chooseDiscipline\('PT'\)/);
assert.match(html, /OT:\s*\{label:"職能治療",\s*forms:\["minicex","dops","evalDops","attitude"\]\}/);
assert.match(html, /PT:\s*\{label:"物理治療",\s*forms:\["minicex","ptDops"\]\}/);
assert.match(html, /id="pick-attitude"[\s\S]*switchForm\('attitude'\)/);
assert.match(html, /subtitle:\s*"專業態度評量表"/);
assert.match(html, /scoreValues:\s*\[5,4,3,2,1\]/);
assert.doesNotMatch(html, /saveEnabled:\s*false/);
assert.match(html, /\["PGY學員","PGY1","PGY2"\]\.includes\(info\.traineeRole\)/);
assert.match(html, /if\(cur === "attitude"\)\{[\s\S]*phase:[\s\S]*remarks:[\s\S]*totalScore:/);
assert.equal((html.match(/\{c:"(?:專業態度行為|行政管理能力|自我及專業成長能力)",n:"\d+\./g) || []).length, 20);
assert.match(html, /<div class="actionbar" id="actionbar" hidden>/);
assert.match(html, /if\(formType === "minicex"\)\{\s*discipline = activeDiscipline;/);
assert.doesNotMatch(
  html,
  /\{k:"discipline",\s*label:"職類",\s*type:"chips"/
);

console.log("Profession-first Checklist smoke test passed");
