#!/usr/bin/env node
/**
 * 研修サイト 内容契約テスト（13+5 通し番号スパイン版）
 * 失敗時 exit 1。
 * - 構造: Day1=1〜13 / Day2=14〜18 の順序、サイドバー、TOP、スケジュール、IPOA前半配置
 * - 品質: 受講者向け文体（進行設計用語・GitHub/Vercel・3か月の排除）
 * - 配布物: ダウンロード資産の存在
 * - 画像: import 名 ↔ タイトル整合
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS = join(__dirname, '../src/content/docs');
const MANIFEST = join(__dirname, 'image-text-manifest.json');
const ASTRO_CONFIG = join(__dirname, '../astro.config.mjs');

function read(rel) {
  const p = join(DOCS, rel);
  if (!existsSync(p)) throw new Error(`missing file: ${rel}`);
  return readFileSync(p, 'utf8');
}

function collectDocFiles(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) collectDocFiles(p, acc);
    else if (/\.(mdx?|md)$/.test(entry.name)) acc.push(p);
  }
  return acc;
}

function readAllDocsText() {
  return collectDocFiles(DOCS)
    .map((p) => readFileSync(p, 'utf8'))
    .join('\n');
}

const checks = [];
function check(id, ok, detail) {
  checks.push({ id, ok, detail: ok ? 'OK' : detail });
}

const astroConfig = readFileSync(ASTRO_CONFIG, 'utf8');
const allDocsText = readAllDocsText();

const learnerFacingFiles = [
  'index.mdx',
  'start/index.mdx',
  'start/prework.mdx',
  'start/schedule.mdx',
  'day-1/intro.mdx',
  'day-1/why-ai.mdx',
  'day-1/ipoa.mdx',
  'day-1/codex-mastery.mdx',
  'day-1/plugins.mdx',
  'day-1/modeling.mdx',
  'day-1/mermaid-flow.mdx',
  'day-1/reflect.mdx',
  'day-2/work-inventory.mdx',
  'day-2/reflection.mdx',
  'reference/session-exercises.md',
  'reference/learning-log.md',
];
const siteText = learnerFacingFiles.map((f) => read(f)).join('\n');

// ---------- 1. 13+5 スパインの順序（サイドバー） ----------
const day1Order = [
  "day-1/intro",
  "day-1/why-ai",
  "day-1/ipoa",
  "day-1/ground-rules",
  "start/prework",
  "day-1/security",
  "day-1/free-explore",
  "day-1/codex-mastery",
  "day-1/plugins",
  "day-1/skills",
  "day-1/modeling",
  "day-1/mermaid-flow",
  "day-1/reflect",
];
const day2Order = [
  "day-2/work-inventory",
  "day-2/assign",
  "day-2/production",
  "day-2/showcase",
  "day-2/reflection",
];
function inOrder(haystack, slugs) {
  let last = -1;
  for (const s of slugs) {
    const i = haystack.indexOf(`slug: '${s}'`);
    if (i === -1 || i < last) return { ok: false, at: s };
    last = i;
  }
  return { ok: true };
}
const d1 = inOrder(astroConfig, day1Order);
check('sidebar-day1-order', d1.ok, `Day1 sidebar order broke at ${d1.at}`);
const d2 = inOrder(astroConfig, day2Order);
check('sidebar-day2-order', d2.ok, `Day2 sidebar order broke at ${d2.at}`);
check(
  'sidebar-day1-before-day2',
  astroConfig.indexOf("slug: 'day-1/reflect'") < astroConfig.indexOf("slug: 'day-2/work-inventory'"),
  'Day1 must come before Day2 in sidebar'
);
check(
  'sidebar-reference-section',
  astroConfig.includes("label: 'REFERENCE｜あとで引ける地図'") &&
    /slug:\s*['"]day-1\/plan-mode['"]/.test(astroConfig) &&
    /slug:\s*['"]day-1\/goal-mode['"]/.test(astroConfig) &&
    /slug:\s*['"]day-1\/input-methods['"]/.test(astroConfig) &&
    /slug:\s*['"]day-1\/crawl4ai['"]/.test(astroConfig) &&
    /slug:\s*['"]day-1\/modeling-debrief['"]/.test(astroConfig) &&
    /slug:\s*['"]day-1\/skills\/grill-me['"]/.test(astroConfig),
  'detail pages (Plan/Goal/input/crawl4ai/modeling-debrief/skill how-tos) must live in REFERENCE'
);

// ---------- 2. TOP は 1〜18・偽の進捗なし ----------
check(
  'top-1-18-no-fake-progress',
  (() => {
    const index = read('index.mdx');
    const nums = [...index.matchAll(/top-session-no">(\d+)</g)].map((m) => m[1]);
    return (
      nums.length === 18 &&
      nums[0] === '1' &&
      nums[13] === '14' &&
      nums[17] === '18' &&
      !index.includes('6 / 14') &&
      !index.includes('43%') &&
      !index.includes('is-current')
    );
  })(),
  'TOP must list sessions 1-18 in order with no fake progress bar'
);
check(
  'top-goal-framing',
  (() => {
    const index = read('index.mdx');
    return (
      index.includes('業務で使い倒す') &&
      index.includes('スキルの取得') &&
      index.includes('AIへの理解')
    );
  })(),
  'TOP must present the goal (使い倒す) and the two needs (スキル/理解)'
);

// ---------- 3. IPOA 前半配置 ----------
check(
  'ipoa-page-front-and-linked',
  /slug:\s*['"]day-1\/ipoa['"]/.test(astroConfig) &&
    read('day-1/ipoa.mdx').includes('Inputを増やし') &&
    read('day-1/ipoa.mdx').includes('Action') &&
    (read('start/schedule.mdx').includes('/day-1/ipoa/') ||
      read('start/index.mdx').includes('/day-1/ipoa/')),
  'IPOA explainer must exist (I/P/O/A), be in Day1 front, and linked from start flow'
);
check(
  'schedule-1-18',
  read('start/schedule.mdx').includes('1〜18') &&
    read('start/schedule.mdx').includes('| 18 |') &&
    read('start/schedule.mdx').includes('/day-1/ipoa/'),
  'schedule must document sessions 1-18 with IPOA'
);

// ---------- 4. オープニング（session1）新設計 ----------
const intro = read('day-1/intro.mdx');
check(
  'intro-opening-design',
  intro.includes('業務で使い倒す') &&
    intro.includes('スキルの取得') &&
    intro.includes('AIへの理解') &&
    intro.includes('スプレッドシート') &&
    intro.includes('企画書') &&
    intro.includes('Skill'),
  'opening must cover goal, two needs, and the 3 demo capabilities'
);

// ---------- 5. なぜAI：チャット対比 ----------
const whyAi = read('day-1/why-ai.mdx');
check(
  'why-ai-chat-contrast',
  whyAi.includes('拡張感覚') && whyAi.includes('チャット') && whyAi.includes('手も動く'),
  'why-ai must contrast chat (口だけ) vs agent (手も動く)'
);

// ---------- 6. セキュリティ（内容） ----------
const security = read('day-1/security.mdx');
check('security-learning-off', security.includes('学習に使用しない') || security.includes('学習OFF'), 'learning-off check required');
check('security-guardrail-block', security.includes('ガードレール文') && /```/.test(security), 'guardrail paste block required');
check('security-dummy-violation', security.includes('ダミー') && security.includes('警告'), 'dummy violation exercise required');
check('security-agents-fallback', security.includes('AGENTS.md'), 'AGENTS.md fallback required');
check('security-restore-impossible', security.includes('復元') && security.includes('学習に使用しない'), 'no-restore + learning-off');
check('security-two-directions', security.includes('人が') && security.includes('警告'), 'human + mechanism');
check('security-hook-delivery', security.includes('別途') && security.includes('hook'), 'hook delivery documented');
check('security-future-task', security.includes('完全') && security.includes('未来'), 'honest limit + future task');
check(
  'security-guardrail-download',
  security.includes('/downloads/guardrail-sample.txt') &&
    existsSync(join(__dirname, '../public/downloads/guardrail-sample.txt')),
  'guardrail sample download required'
);

// ---------- 7. prework（Windows前提・配布物） ----------
const prework = read('start/prework.mdx');
const agentsLogging = read('day-1/agents-logging.mdx');
check(
  'prework-windows',
  (prework.includes('Windows') || prework.includes('winget')) && !/Homebrew.*必須|brew install/i.test(prework),
  'prework must be Windows-friendly without Homebrew-only'
);
check('prework-no-asana', !/Asana/i.test(prework), 'no Asana in prework');
check(
  'prework-no-git-github-vercel',
  !/GitHub|Vercel|git --version|Git を入れる|Gitを入れる/i.test(prework),
  'no Git/GitHub/Vercel in prework'
);
check('prework-winget-codex', prework.includes('winget install Codex') && prework.includes('Microsoft Store'), 'Microsoft Store / winget install documented');
check(
  'prework-sharepoint-folder',
  prework.includes('SharePoint') && /AI研修_氏名/.test(prework),
  'named SharePoint folder must be documented'
);
check(
  'agents-logging-practical',
  agentsLogging.includes('learning-log/') && agentsLogging.includes('AGENTS.md') && agentsLogging.includes('SharePoint'),
  'AGENTS.md page must be a practical logging setup'
);

// ---------- 8. mermaid-flow（体感の山・⑫） ----------
const mermaid = read('day-1/mermaid-flow.mdx');
const stepIdx = mermaid.indexOf('## 進め方');
const ipoaIdx = mermaid.indexOf('## IPOA');
check('mermaid-step-before-ipoa', stepIdx !== -1 && stepIdx < ipoaIdx, '進め方 section must come before IPOA naming');
check('mermaid-ipoa-slogan', mermaid.includes('IPOA回そう'), 'IPOA合言葉 required');
check('mermaid-v1-prompt', /入力ゼロ|ゼロInput|v1/.test(mermaid) && /```text/.test(mermaid), 'v1 prompt required');
check('mermaid-v2-prompt', /v2/.test(mermaid) && mermaid.includes('追加'), 'v2 after Input required');
check('mermaid-mind-guide', mermaid.includes('## 軽いマインド'), '軽いマインド section required');
check('mermaid-handwritten', mermaid.includes('手書き') && mermaid.includes('写真'), 'handwritten photo flow required');

// ---------- 9. modeling 演習/振り返り分離 ----------
const modeling = read('day-1/modeling.mdx');
const modelingDebrief = read('day-1/modeling-debrief.mdx');
check('modeling-exercise-no-mermaid', !/```mermaid/.test(modeling), 'exercise page must not include Mermaid answer');
check('modeling-debrief-has-mermaid', /```mermaid[\s\S]*flowchart/.test(modelingDebrief), 'debrief must include Mermaid flowchart');
check('modeling-debrief-has-concepts', /UML|共感マップ/.test(modelingDebrief), 'debrief must include modeling concepts');

// ---------- 10. プラグイン独立（⑨） ----------
const pluginsPage = read('day-1/plugins.mdx');
check(
  'plugins-page-independent',
  pluginsPage.includes('SharePoint') && pluginsPage.includes('Box') && pluginsPage.includes('Excel') &&
    pluginsPage.includes('Outlook') && pluginsPage.includes('Teams'),
  'Box/SharePoint/Excel/Outlook/Teams plugin page required'
);

// ---------- 11. Skill 概要（⑩） ----------
const skillsIndex = read('day-1/skills/index.mdx');
check(
  'skills-overview',
  skillsIndex.includes('grill-me') && skillsIndex.includes('handoff') && skillsIndex.includes('teach') &&
    skillsIndex.includes('writing-great-skills') && skillsIndex.includes('reflect'),
  'skill overview must introduce all skills'
);

// ---------- 12. Day2 流れ ----------
const showcase = read('day-2/showcase.mdx');
const reflection = read('day-2/reflection.mdx');
const workInventory = read('day-2/work-inventory.mdx');
check('showcase-is-prep', showcase.includes('仕込み') || showcase.includes('振り返りskill'), 'showcase must be prep');
check('showcase-100-words', /100選|埋め続ける/.test(showcase + reflection), '100選 framing required');
check('reflection-zadankai', reflection.includes('座談会'), '座談会 buffer required');
check('reflection-tomorrow-input', reflection.includes('明日試すInput'), 'tomorrow Input declaration required');
check('reflection-100-peak', reflection.includes('量の一望') || reflection.includes('100選'), '100選 peak required');
check(
  'toc-inventory-flow',
  workInventory.includes('TOC') && workInventory.includes('5分') && workInventory.includes('時系列') &&
    workInventory.includes('IPOA') && workInventory.includes('State'),
  'Day2 inventory must include TOC flow'
);
check(
  'downloads-ai100-and-tsv',
  existsSync(join(__dirname, '../public/downloads/ai-100-list-template.html')) &&
    existsSync(join(__dirname, '../public/downloads/toc-roadmap-template.tsv')) &&
    showcase.includes('ai-100-list-template.html') &&
    workInventory.includes('toc-roadmap-template.tsv'),
  '100選HTML and TOC TSV downloads must exist and be linked'
);

// ---------- 13. 配布物（Skill / Web取得） ----------
check(
  'reflect-skill-download',
  read('day-1/skills/reflect.mdx').includes('/downloads/reflect-skill/SKILL.md') &&
    existsSync(join(__dirname, '../public/downloads/reflect-skill/SKILL.md')),
  'reflect skill download required'
);
check(
  'web-input-page',
  read('reference/web-input.mdx').includes('fetch_web_light.py') &&
    read('day-1/crawl4ai.mdx').includes('/downloads/crawl_web_input.py'),
  'web fetch references required'
);

// ---------- 14. 画像 import ↔ タイトル整合 ----------
const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
for (const [rel, pairs] of Object.entries(manifest)) {
  const content = read(rel);
  for (const { import: importName, titleKeywords } of pairs) {
    const blockRe = new RegExp(`imageSrc=\\{${importName}\\.src\\}[\\s\\S]*?title="([^"]+)"`, 'm');
    const m = content.match(blockRe);
    const title = m?.[1] ?? '';
    const ok = titleKeywords.some((kw) => title.includes(kw));
    check(`image-align:${rel}:${importName}`, ok, `title "${title}" must include one of [${titleKeywords.join(', ')}]`);
  }
}

// ---------- 15. 受講者向け文体（恒久ガード） ----------
const facilitatorJargon =
  /渇望|アンカー反転|裏の背骨|精神論で滑る|先に体験、後で命名|講義資料にそもそも書かなくてOK|口頭で扱う|本筋から外す|キモい|オー！/;
check('no-facilitator-jargon', !facilitatorJargon.test(allDocsText), 'no facilitator design jargon in learner docs');
check('no-kawaku', !/渇望/.test(allDocsText), '渇望 must not appear');
check('no-spiritualism-meta', !/精神論/.test(allDocsText), 'avoid 精神論');
check(
  'no-production-meta',
  !/精神論で滑る|先に体験、後で命名|講義資料にそもそも書かなくてOK|資料では結論|ここは口頭|作り方の指示/.test(allDocsText),
  'no production meta-instructions'
);
check('site-no-github-vercel', !/GitHub|Vercel/.test(siteText + read('reference/session-exercises.md')), 'no GitHub/Vercel in learner docs');
check('no-three-months', !/3か月|3ヶ月|三か月/.test(siteText), 'no 3-month timeline');
check(
  'no-reference-troubleshooting',
  !existsSync(join(DOCS, 'reference/troubleshooting.md')),
  'troubleshooting must not exist separately'
);

// ---------- report ----------
const failed = checks.filter((c) => !c.ok);
for (const c of checks) {
  console.log(`${c.ok ? 'PASS' : 'FAIL'}  ${c.id}${c.ok ? '' : ` — ${c.detail}`}`);
}
console.log(`\n${checks.length - failed.length}/${checks.length} passed`);
if (failed.length) process.exit(1);
