# General AI研修 — 改善プラン（依頼意図ログ）

**正本**: このファイル。和島からの依頼意図をここに追記していく。

| 項目 | 内容 |
|---|---|
| **対象** | 株式会社ゼネラル向け Codex 研修サイト（`site/`） |
| **旧 Handoff プラン** | 2026-06-18 版（Claude→Codex）は **git 履歴**に残る。2日間設計の詳細が必要なら `git log -p -- plan.md` で参照 |
| **生メモ** | `詳細改善.md` / `追加修正2.md` |
| **検証** | `site/scripts/verify-training-content.mjs` |

---

## エージェント向け原則

### 1. 指示と成果物の境界

[`shared-conventions.md`](/Users/wajimayuki/Cursor/wajima/Claude/rules/shared-conventions.md) §指示と成果物の境界に従う。

- **plan.md / talk-script.md** → 進行設計・講師意図・裏の狙い
- **site/** → 受講者が読む「やること・成果物・次の一歩」だけ

進行設計用語（渇望、アンカー反転、背骨、オー！、精神論で滑る 等）を受講者向け本文・見出し・subtitle に書かない。

### 2. General 研修で使わないもの

- Git / GitHub（アカウント新規作成不可・教える時間なし）
- Vercel / ngrok（公開デプロイ系）
- Composio
- NotebookLM（Google 系不可）
- agent-browser（Windows Defender 等で当日詰まるリスク — plan 旧版 §6 参照）

### 3. 確定前提（短縮）

- ツール: **Codex デスクトップアプリ**（Cursor 等 IDE は入れない）
- 提出: **SharePoint** にユーザー別フォルダ
- 記録: `learning-log/` + 振り返り skill。AGENTS.md は活動ログにしない
- 体制: 2人体制 + バディ制

---

## 依頼ログ

新しい順。実装したら **状態** を更新する。

### 2026-06-23 — 13+5スパインへ全面整合＋新オープニング＋本番デプロイ

| | |
|---|---|
| **依頼** | talk-day1/day2 を正本に、TOP・左サイドバー・各ページを通し番号13+5へ整合し、内容を充実させてデプロイまで |
| **判断（和島確認済）** | ①13+5通し番号に統一（Plan/Goal/Skill手順/crawl4ai/input/modeling-debriefはREFERENCEへ）②門限はtalk-day1最新順＝スキルの後・Mermaid直前 ③全ページtalk-script準拠で書き直し＋矛盾解消 |
| **新オープニング** | session1＝ゴール「明日から業務で使い倒す」→必要な2つ（スキル取得・AIへの理解）→デモ3点（スプレッドシート分析／話すだけ企画書HTML／Skill）→アジェンダ（発散→収束）→2チーム→自己紹介軽め。ベトナム原体験は冒頭から除外 |
| **実装** | astro.config sidebar（13+5＋REFERENCE集約）、index.mdx TOP全面再構成、day-1/intro 新オープニング、why-ai にチャット対比追加、全ページのSectionHead番号・ProgressMap・Next導線を新順へ、schedule 1〜18表を新順へ、verify-training-content.mjs を新構造契約へ全面書き直し（69/69 PASS）、`pnpm build` 51ページ成功 |
| **デプロイ** | repo root から `vercel deploy --prod --yes --scope sento-group` → READY。本番 https://general-ai-seminar.vercel.app に反映確認済 |
| **状態** | ✅ 完了 |
| **未了（TODO）** | 2日間一枚絵の画像 `image/2day-overview.png` は和島が配置（中身は grill-notes に正本化済）。デモ3点の素材（静止画/録画）は `site/IMAGE_TODO.md` |

### 2026-06-22 — TOPをtalk-script 1〜18に整合

| | |
|---|---|
| **依頼** | index.mdx の番号ズレ・Day2番号衝突・固定進捗（6/14・43%）を解消 |
| **実装** | `index.mdx` 全面再構成、`day-1/ipoa.mdx` 新設、`start/schedule.mdx` 1〜18表、sidebarにIPOA追加、verify追加 |
| **状態** | ✅ 完了 |

### 2026-06-22 — handoff vs site ギャップ実装（T2〜T7）

| | |
|---|---|
| **依頼** | handoff/計画で採用済みだが site に欠落していた配布物・導線を実装 |
| **実装** | reflect skill、100選HTML、TOC TSV、成果物テンプレ4種、guardrail、軽量Web取得、session-maps、各Day1/Day2/prework 導線、verify 拡張 |
### 2026-06-22 — crawl4ai講義パート追加

| | |
|---|---|
| **依頼** | crawl4aiについての使用の講義パートが見当たらないため作成 |
| **意図** | WebページをInputとして扱う体験を、Mermaid改善ループ前の材料追加に接続する |
| **実装** | `site/src/content/docs/day-1/crawl4ai.mdx`、`site/public/downloads/crawl_web_input.py`、メニュー・ハブ・スケジュール・検証へ反映 |
| **状態** | ✅ 完了 |

### 2026-06-22 — ゼロベースで2日間の流れを再設計（grill）

| | |
|---|---|
| **依頼** | talk-script / menu / TOP の整合崩れを解消。受講者が「もっとやりたい」と思う体験へ再構成 |
| **グリル** | `grill-notes/2026-06-22-training-flow-zero-base.md`（Q1〜Q7合意） |
| **状態** | ⬜ 設計合意済 / TOP・schedule・ipoa・Day1 PM導線 ✅ / サイドバー全面再構築は未着手 |

**確定した設計（正本スパイン）**:
- **背骨**: 「Inputを増やし、Processを改善する。Outputは自然とついてくる。」＝IPOA。**IPOAはDay1 AMで独立解説ページとして教える**（参照用の正典・前半配置）。
- **冒頭(オー!)**: 到達像デモ→動機(軽め)→期待一言→2日間地図＋2チーム発表。重い原体験は後半。
- **グループ**: Day1冒頭で2部署＝2チーム固定（二層：チーム内バディ）。Day2 TOCは同じ2チームが2島。
- **通し番号で統一**（menu/TOP/talk-script）: Day1=1オープニング/2なぜAI/3IPOA解説/4グランドルール/5セットアップ/6セキュリティ/7自由探索/8門限モデリング/9Codexを操る/10プラグイン(Input独立)/11Skill・skill-improver(Process独立)/12Mermaid改善ループ(IPOA体感)/13ふりかえり。Day2=14TOC棚卸し/15分担/16本制作/17仕込み/18発表。
- **門限の前→スキルの後ろ問題**: モデリングはスキルの**前**（talk-script順採用）。
- **hello.md廃止**: 驚きは実体験（自由探索・プラグインBox/Spreadsheet）に移す。
- **Plan/Goalモード**は session9 に畳む。**プラグイン・Skillは独立セッション**（振り返りやすさ）。
- **TOC**: 軽い資料化＋**ザ・ゴール書影**。ポストイット＝ワークショップと分かればOK。
- **時間**: 目安表記（当日調整可）。TOPの固定進捗値（6/14・43%）は廃止。
- **内容は削らない**（Day1長尺可）。

**実装順（合意後）**: talk-script.md更新 → plan反映 → astro.config(menu) → index.mdx(TOP) → 各mdx（IPOA解説新規・プラグイン独立・Skill独立・門限順序・冒頭） → verify改修（IPOA前半提示と矛盾する旧テスト作り直し） → build。
**要・和島共有**: 受講者人数と2部署内訳／実際の時間割／挿絵（[`site/IMAGE_TODO.md`](site/IMAGE_TODO.md) 2026-06-22節）。

### 2026-06-22 — 便利リポジトリ一覧の充実

| | |
|---|---|
| **依頼** | `Aigassyuku06/repos.html` を参考に `site/src/content/docs/reference/repos.mdx` を充実 |
| **除外** | Vercel / ngrok / Composio |
| **意図** | カテゴリ表 + 導入判断プロンプトで「演習台」にする |
| **状態** | ✅ 完了 |

### 2026-06-22 — 「キモい」表現の排除

| | |
|---|---|
| **依頼** | 進行設計用語を受講者向けページに書かない。テスト追加（実行タイミングは和島判断） |
| **問題例** | `2) 開いて終わる（渇望）` — 渇望は講師側の設計目標。ラベルにすると不快 |
| **言い換え** | NG `渇望（開いて終わる）` → OK `100選は開いたまま終わる` / `使い続ければもっと良くなる` |
| **テスト** | `verify-training-content.mjs` — `no-facilitator-jargon` 等 |
| **状態** | ⬜ テスト追加済 / 本文修正未着手 |

---

## バックログ（未着手）

`詳細改善.md` 由来。着手したら依頼ログへ移す。

### サイト構成・導線

- [ ] `/start/` に目的・事前準備・スケジュールを集約（purpose 独立ページは不要）
- [ ] スケジュールの「ポイント」類は `/start/stuck/` へ。前半で周知
- [ ] intro と purpose の内容被りを排除（テストで検出したい）

### prework / セットアップ

- [ ] Git 導入なし
- [ ] SharePoint に自分の名前で研修フォルダを事前作成、と明記
- [ ] 左メニュー確認画像 → `image/image.png` に差し替え
- [ ] 一般設定・作業モード・権限の各項目に意味を記載（Web 調査）
- [ ] 作業モードはコーディング向けで OK

### カスタム指示・プラグイン

- [ ] カスタム指示 = システムプロンプト、とライトに解説（[参考 note](https://note.com/aiskillacademy/n/n5686c2f10973)）
- [ ] プラグインは後半で独立ページ化。Box / SharePoint 設定手順 + プラグイン概念の解説

### Day1 コンテンツ

- [ ] **purpose / intro**: 最重要メッセージの視認性を上げる（サイト全体の原則）
- [ ] **modeling**: 実演は和島が口頭。資料に書かない。振り返りに UML 画像（`umlstakeholder.png` / `gyomuflow.png`）
- [ ] **mermaid-flow ↔ codex-mastery**: 順序修正（先に体験 → 後で命名）。メタ文で説明しない
- [ ] **codex-mastery**: 業務を選ぶ → やってみる → 改善、の流れに。単体ページ感を解消

### learning-log 伏線回収

- [ ] 初期（prework / AGENTS.md）から常時記録を仕込む
- [ ] 振り返り時に `learning-log/` を開いたら既に記載がある状態にする

### 文体・品質

- [ ] `reflection.mdx` 等から `渇望` を除去（テスト PASS させる）
- [ ] `mermaid-flow.mdx` から `精神論` 参照を除去
- [ ] 内容被り検出テストの追加検討

---

## アーカイブ済み設計資産（エッセンス）

2026-06-20 の再設計セッションで作った実行計画8本は実装・デプロイ済み。`_archive/2026-06-20-redesign/` へ退避（redesign-alignment / IMPROVEMENTS_PLAN / TOP_UIUX_FIX_PLAN / DETAIL_IMPROVEMENT_INTEGRATION_PLAN / IMPLEMENTATION_PLAN / SESSION_INPUT_AUDIT / UX_JOURNEY_AUDIT / overview）。正本は **talk-script.md（進行）/ plan.md（依頼ログ・制約）/ DESIGN.md（見た目）** の3本に絞る。失わないための要点だけ以下に残す。

### 設計の背骨

- **サイト＝talk-scriptの授業進行ミラー**。情報設計の軸は「ファイル種別」でなく「授業の時間（①〜⑰）」。上から進めばそのまま授業になる面にする。
- **UX契約 UX-01〜08**: ①答え・完成図・概念名を演習前に出さない ②命名は体験の直後だけ ③クライマックスは1箇所に集中 ④仕込みと内覧を同ページに混ぜない ⑤画像左＝その節の操作対象 ⑥薄いページ（箇条書きだけ）は講義にしない ⑦Windows受講者前提 ⑧講師口頭依存はサイトで明示。
- **TOC業務棚卸し（和島リードの現場手法）**: 5分書き出し→分類→時系列→IPOA→State分解。資料は流れだけ、進行は和島。
- **100選＝改善習慣の器**。記録でなく、未完で開いたまま終える。

### 運用・検証

- **デプロイ**: リポジトリroot `/Users/wajimayuki/Cursor/general` から `vercel deploy --prod --yes --scope sento-group`（`site/` から打つと `site/site` を探して失敗）。本番 alias `https://general-ai-seminar.vercel.app`、Vercel project `sento-group/general`。
- **検証**: `cd site && pnpm verify`（`scripts/verify-training-content.mjs`）→ `pnpm build`。
- **画像**: 概念図は Mermaid/SVG/HTML をブランド色（#486b3b / #c58b17 / 罫線#d9ddd8）で生成。ラスター挿絵は最小限。不足は `site/IMAGE_TODO.md` に和島TODOとして列挙。参照UIの密度見本＝`Aigassyuku06/index.html` `prep.html` `repos`。

---

## 更新ルール

1. 和島が依頼したら **依頼ログ** に追記（意図・除外・状態）
2. 未着手の断片は **バックログ** に置く
3. 完了したら ⬜ → ✅、バックログから削除
4. 旧 Handoff の設計詳細を plan に戻さない（必要なら git / `_archive/` 参照）
