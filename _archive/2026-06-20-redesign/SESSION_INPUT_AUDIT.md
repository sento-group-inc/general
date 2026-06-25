# Grill-me / UI改善 — 入力監査表

> **正本**: `talk-script.md` / `plan.md` / トランスクリプト `4db79cda-0e88-48b0-831c-21927c613ee7.jsonl`  
> **実装プラン**: [`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md)（TDD手順・ファイル別AC）  
> **検証**: `cd site && pnpm verify`（自動） + `pnpm build`（ビルド）  
> **UXジャーニー監査**: [`UX_JOURNEY_AUDIT.md`](UX_JOURNEY_AUDIT.md)（感情設計・演習順序・画像・P0-P2チェックリスト）  
> **更新**: 2026-06-20（Grill-me体験反映完了 + UX監査文書追加）

## 現状スナップショット（verify ベースライン）

`pnpm verify` → **23/23 PASS** ✅

| 以前 FAIL → 現在 |
|------------------|
| `ipoa-after-experience` → PASS（mermaid-flow: 進め方→IPOA→軽いマインド） |
| `mermaid-mind-guide` → PASS |
| `codex-voice-exercise` → PASS（2分演習ハンズオン） |
| `codex-business-docs` → PASS（業務資料演習） |
| `codex-handwritten-photo` → PASS（手書き写真演習） |
| `security-agents-fallback` → PASS（AGENTS.md fallback） |
| `showcase-is-prep` → PASS（仕込みのみ） |
| `reflection-zadankai` → PASS（座談会バッファ） |

`package.json` に `"verify"` 登録済み。

## 凡例

| 記号 | 意味 |
|------|------|
| ✅ | 要求どおり実装済み |
| △ | 一部のみ / 浅い |
| ❌ | 未実装 or 設計と逆 |

---

## A. Grill-me 感情・マインド（Q1〜Q3）

| ID | 要求 | 正本 | サイト | 検証 |
|----|------|------|--------|------|
| A1 | 基準は沈黙する大多数の不安層 | talk-script L1付近 | purpose / ground-rules | 目視 |
| A2 | アンカー反転：完璧→改善起点 | purpose ③ | `day-1/purpose.mdx` | verify: purpose-no-ipoa-name ✅ |
| A3 | IPOA初出は**体験→命名**（⑩v1→v2直後） | talk-script ⑨⑩ | `mermaid-flow.mdx` | verify: ipoa-after-experience ✅ |
| A4 | purpose③でIPOAを**先出ししない** | plan / Q4 | `purpose.mdx` | verify: purpose-no-ipoa-name ✅ |
| A5 | 合言葉「IPOA回そう = Input足してもう1回」 | talk-script | `mermaid-flow.mdx`（⑩のみ） | verify: ipoa-slogan-location ✅ |
| A6 | 受講者向け資料に「3か月」を書かない | Q3 | site全体 | verify: no-three-months ✅ |
| A7 | 100選=埋め続ける器・未完で終える | talk-script ⑰ | reflection / showcase | verify: showcase-100-words ✅ |
| A8 | 明日試すInput1個を全員宣言 | talk-script ⑯ | reflection | verify: reflection-tomorrow-input ✅ |
| A9 | 座談会バッファ（伸びたら削る） | talk-script ⑯ | reflection | verify: reflection-zadankai ✅ |

---

## B. Day1 AM（Q4〜Q5）

| ID | 要求 | サイト | 検証 |
|----|------|--------|------|
| B1 | ⑥s 学習OFF確認 | security.mdx | verify: security-learning-off ✅ |
| B2 | ガードレール**コピペ枠** | security.mdx | verify: security-guardrail-block ✅ |
| B3 | ダミー違反で警告体験 | security.mdx | verify: security-dummy-violation ✅ |
| B4 | hookなければ **AGENTS.md** fallback | security.mdx | verify: security-agents-fallback ✅ |
| B5 | 自由探索30分（⑥b） | free-explore.mdx | 目視 |
| B6 | 性格診断は本流外し → extra | extra/personality-html | verify: personality-extra-only ✅ |

---

## C. Day1 PM — ⑨ Codex習熟（Q5）

| ID | 要求 | サイト | 検証 |
|----|------|--------|------|
| C1 | **音声2分演習**（手順+演習） | codex-mastery.mdx | verify: codex-voice-exercise ✅ |
| C2 | 固有名詞・単語登録 | codex-mastery.mdx | verify: codex-dictionary ✅ |
| C3 | **業務資料追加**演習 | codex-mastery.mdx | verify: codex-business-docs ✅ |
| C4 | **手書きメモ写真**→⑩へ | codex-mastery.mdx | verify: codex-handwritten-photo ✅ |
| C5 | ToDoアプリ廃止（⑩はMermaid） | mermaid-flow | verify: no-todo-app ✅ |

---

## D. Day1 PM — ⑩ Mermaid改善ループ（Q5）

| ID | 要求 | サイト | 検証 |
|----|------|--------|------|
| D1 | ゼロInputで恥のv1 | mermaid-flow.mdx | verify: mermaid-v1-prompt ✅ |
| D2 | Input追加→v2激変 | mermaid-flow.mdx | verify: mermaid-v2-prompt ✅ |
| D3 | IPOAセクションはStepFlow**より後** | mermaid-flow.mdx | verify: ipoa-after-experience ✅ |
| D4 | ⑩直後 軽いマインド1画面 | mermaid-flow.mdx | verify: mermaid-mind-guide ✅ |
| D5 | 手書き→写真→Mermaid手順 | mermaid-flow + codex | verify: handwritten-flow ✅ |

---

## E. Day2（Q6）

| ID | 要求 | サイト | 検証 |
|----|------|--------|------|
| E1 | ⑮=振り返りskill・100選**仕込み**（内覧はまだ） | showcase.mdx | verify: showcase-is-prep ✅ |
| E2 | ⑯=全員発表+座談会 | reflection.mdx | verify: reflection-zadankai ✅ |
| E3 | ⑰=100選**ラスト一望**（発表の後） | reflection.mdx | verify: reflection-100-peak ✅ |
| E4 | work-inventory grill-me深掘り | work-inventory.mdx | 目視 ✅ |

---

## G. 門限⑧ UX分割（UX-01 答え先出し禁止）

| ID | 要求 | サイト | 検証 | 状態 |
|----|------|--------|------|------|
| G1 | 演習ページに完成Mermaid・UML・正解を**出さない** | `day-1/modeling.mdx` | verify: modeling-exercise-no-mermaid / modeling-exercise-no-uml | ✅ |
| G2 | 振り返りページで構造図・概念名 | `day-1/modeling-debrief.mdx` | verify: modeling-debrief-has-mermaid / modeling-debrief-has-concepts | ✅ |
| G3 | sidebar / schedule / リンク整合 | astro.config, schedule | verify: sidebar-modeling-debrief + 目視 | ✅ |
| G4 | Codexプロンプト4本（娘/父/フロー/解案） | modeling.mdx | 目視 | ✅ |

詳細チェックリスト → [`UX_JOURNEY_AUDIT.md` §4 P0](UX_JOURNEY_AUDIT.md)

---

## H. UX-06 薄いページ（演習不足）

| ページ | 状態 | 優先 |
|--------|------|------|
| free-explore | 箇条書き中心 | P1 |
| reflect | 記録項目のみ | P1 |
| assign / production | 方針のみ | P2 |

詳細 → [`UX_JOURNEY_AUDIT.md` §3.2](UX_JOURNEY_AUDIT.md)

---

## F. UI/UX 10項目（IMPROVEMENTS_PLAN.md）

| # | 要求 | 状態 | メモ |
|---|------|------|------|
| 1 | タイトル巨大化解消 | △ | global.css済、要目視 |
| 2 | Codex設定→Day1統合 | ✅ | setup/security/codex-mastery |
| 3 | スクショ左・やること右 | ✅ | ImageText |
| 4 | 和島自己紹介.png | △ | IMAGE_TODO.md 参照 |
| 5 | 図解を都度 | ✅ | Mermaid各所 |
| 6 | grill-me型深掘り | ✅ | work-inventory |
| 7 | Aigassyuku06密度 | ✅ | ⑨⑩体験順序反映で改善 |
| 8 | repos一覧 | ✅ | reference/repos |
| 9 | TOPハブ | △ | index.mdx（前セッション済） |
| 10 | prep画像リッチ | △ | prework + IMAGE_TODO |

---

## 実行コマンド

```bash
cd /Users/wajimayuki/Cursor/general/site
pnpm verify    # 23/23 PASS（2026-06-20）
pnpm build     # Astroビルド
```

## デプロイ

```bash
cd /Users/wajimayuki/Cursor/general
vercel deploy --prod --yes --scope sento-group
```

本番: https://general-ai-seminar.vercel.app
