# 全ページ UX ジャーニー監査 & 実装チェックリスト

> **目的**: 講義として「体験→振り返り→命名」の順が崩れていないか、受講者感情曲線に沿って全ページを評価する。  
> **正本**: `talk-script.md`（感情設計の背骨）> `plan.md` > 本ファイル  
> **本文修正は別フェーズ** — 本ファイルは計画・チェック観点の正本。実装前にここを読む。  
> **関連**: [`SESSION_INPUT_AUDIT.md`](SESSION_INPUT_AUDIT.md)（内容契約） / [`site/IMAGE_TODO.md`](site/IMAGE_TODO.md)（画像） / [`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md)（TDD手順）

**更新**: 2026-06-20

---

## 1. 受講者カスタマージャーニー（全体）

### 1.1 ペルソナ & 感情の出発点

| 項目 | 内容 |
|------|------|
| 基準ペルソナ | **沈黙する不安層**（ITに弱い自覚・遅れたら恥ずかしい） |
| FROM | 触る前に止まる／完璧を求めて手が止まる |
| TO | ①もっと触りたい ②2日でこんなに作れた ③まずやってみよう |
| 設計原則 | **アンカー反転**（完璧→改善起点）、**恥のv1は設計で出す**、**先に体験・後で命名** |

### 1.2 2日間感情曲線（マクロ）

```mermaid
journey
  title 受講者感情曲線（設計意図）
  section Day1 AM
    自己紹介: 3: 信頼, 期待の可視化
    目的・ルール: 4: 安心, 恥の無害化
    なぜAI: 4: 共感, 拡張のイメージ
    セットアップ: 2: しんどさ, 3: 小さな成功
    セキュリティ⑥s: 5: 安心（AMの山）
    自由探索⑥b: 5: 好奇心, 私的な動いた
  section Day1 PM
    門限⑧: 4: 考える, 構造の手触り
    Codex⑨: 3: 操作習熟, Inputの入口
    Mermaid⑩: 5: 改善の快感（研修最大の山）
    ふりかえり⑪: 4: 記録, Day2への橋
  section Day2
    棚卸し⑫: 4: 自己決定, 何に向けるか
    制作⑭: 4: 達成感, v1→v2
    仕込み⑮: 3: 整える
    発表⑯⑰: 5: 量の一望, 渇望で終わる
```

### 1.3 ページ間の「体験順序」ルール（UX契約）

| ルールID | 内容 | 違反例 |
|----------|------|--------|
| **UX-01** | **答え・完成図・概念名を演習前に出さない** | 門限ページにMermaid完成図＋UML名が同時表示 |
| **UX-02** | **命名は体験の直後だけ** | purpose③でIPOA先出し |
| **UX-03** | **クライマックスは1箇所に集中** | AMにengineered wow、⑩と競合 |
| **UX-04** | **仕込みと内覧を同ページに混ぜない** | ⑮で100選一望 |
| **UX-05** | **画像左＝その節の操作対象と一致** | 作業モードの節に音声入力スクショ |
| **UX-06** | **薄いページは「講義」にならない** | 箇条書きのみ・演習手順なし |
| **UX-07** | **Windows受講者前提** | Homebrew必須、Mac専用手順 |
| **UX-08** | **講師口頭依存をサイトで代替できない部分は明示** | hook正本・100選HTML生成 |

---

## 2. 全ページ評価表（感情設計 × UX問題 × 改善方針）

凡例: 感情=目標感情(1-5) / 体験=演習あり / 順序=UX-01〜08違反 / 優先=P0即 / P1次 / P2余裕

| # | ページ | 感情目標 | 体験 | 現状UX | 順序 | 優先 | 改善方針（実装時） |
|---|--------|----------|------|--------|------|------|-------------------|
| — | `/` index | 迷わず開始 | △ | TOP密度は改善済、要目視 | — | P2 | agent-browser 1366×768 再確認 |
| 0 | `/start/prework` | 詰まらない準備 | △ | Windows化済、画像不足 | UX-07✅ | P1 | IMAGE_TODO A群、ImageGrid→ImageText化 |
| — | `/start/schedule` | 全体像把握 | △ | ⑧分割・⑮ラベル未更新 | — | P1 | ⑧a/⑧b、⑮=仕込み表記 |
| — | `/start` | 入口 | △ | 要目視 | — | P2 | indexへリダイレクト検討 |
| ①② | `/day-1/intro` | 信頼・期待収集 | ✅ | StepFlowあり | — | P2 | wajima-profile.png 差し替え |
| ③ | `/day-1/purpose` | 改善起点合意 | △ | IPOA図は抽象のみでOK | UX-02✅ | — | 維持 |
| ④ | `/day-1/ground-rules` | 恥の無害化 | △ | 要目視（薄い可能性） | UX-06? | P2 | IntroPunch + 記録文化Callout |
| ⑤ | `/day-1/why-ai` | 拡張感覚 | △ | 小話→体験の橋 | UX-06? | P2 | setupへのつなぎ強化 |
| ⑥ | `/day-1/setup` | 小さな成功 | ✅ | ImageText整合 | UX-05✅ | — | 維持 |
| ⑥s | `/day-1/security` | **安心（AM山）** | ✅ | 拡張済、挿絵TODO | UX-05△ | P1 | browser/computer ImageText化、挿絵 |
| ⑥b | `/day-1/free-explore` | 好奇心 | △ | **演習手順薄い** | UX-06 | P1 | StepFlow + 共有テンプレ + 最低10分Callout |
| ⑧a | `/day-1/modeling` | 考える | ✅ | **分割済（演習のみ）** | UX-01✅ | P0 | sidebar・verify・リンク整合 |
| ⑧b | `/day-1/modeling-debrief` | 構造の命名 | ✅ | **新規、sidebar未登録** | UX-01✅ | P0 | sidebar・schedule・ProgressMap |
| ⑨ | `/day-1/codex-mastery` | Input入口 | ✅ | 3手段ハンズオン | UX-05△ | P1 | browser/computer ImageText + manifest |
| ⑩ | `/day-1/mermaid-flow` | **改善の快感** | ✅ | v1→v2→IPOA | UX-02✅ | — | 維持、ミニデモ追記は任意 |
| ⑪ | `/day-1/reflect` | 記録文化 | △ | **箇条書き中心** | UX-06 | P1 | 振り返りskill手順・プロンプト例 |
| ⑫ | `/day-2/work-inventory` | 自己決定 | ✅ | grill-me | — | — | 維持 |
| ⑬ | `/day-2/assign` | 着手 | △ | 薄い可能性 | UX-06 | P2 | 分担テンプレ・タイムボックス |
| ⑭ | `/day-2/production` | 制作 | △ | 方針のみ | UX-06 | P2 | v1提出チェックリスト |
| ⑮ | `/day-2/showcase` | 仕込み | ✅ | 100選内覧なし | UX-04✅ | — | 維持 |
| ⑯⑰ | `/day-2/reflection` | 量の一望→渇望 | ✅ | 座談会・100選 | UX-04✅ | — | 維持 |
| extra | `/extra/personality-html` | おかわり | ✅ | 任意明示 | — | — | 維持 |
| ref | `/reference/*` | 参照 | — | 講義外 | — | P2 | 本文からリンクで十分 |

---

## 3. UX問題パターン別 — 該当ページ一覧

### 3.1 「答え先出し」（UX-01）— **最優先パターン**

| ページ | 状態 | 対応 |
|--------|------|------|
| 門限⑧ | ✅ ⑧a演習 / ⑧b振り返りに分割済 | sidebar・verify・全リンク更新 |
| purpose③ | ✅ IPOA名称なし（抽象ループのみ） | 維持 |
| mermaid⑩ | ✅ IPOAはv1→v2の後 | 維持 |
| showcase⑮ | ✅ 100選内覧なし | 維持 |

**他ページで再発チェック**: ground-rules / why-ai に「正解フロー」がないか目視。

### 3.2 「演習なし・講義にならない」（UX-06）

| ページ | 不足 | 追加すべき要素 |
|--------|------|----------------|
| free-explore | Codexを開く→試す→共有のStep | StepFlow、5分前共有テンプレ |
| reflect | 振り返りskillの実行手順 | コピペプロンプト、`learning-log/` 例 |
| assign | 分担の具体手順 | ロール表テンプレ、15分タイムボックス |
| production | 提出前チェック | v1提出→レビュー→v2の4行サイクル明示 |
| ground-rules / why-ai | 参加型要素 | Callout + 1問振り返り（任意） |

### 3.3 「画像と解説不一致」（UX-05）

| 状態 | 対応 |
|------|------|
| training/*.png | screenshots-* から差し替え済（2026-06-20） |
| image-text-manifest | setup/security/codex-mastery の ImageText のみ |
| 未カバー | prework ImageGrid、security/codex ImageGrid → ImageText化 + manifest拡張 |
| 正本 | `site/scripts/image-catalog.json`（各PNGの画面内容ラベル） |

### 3.4 「verifyが見ていない盲点」

現行 `pnpm verify` は**文字列存在**と**ImageText titleキーワード**のみ。以下は**未自動化**:

| 盲点 | 推奨チェック |
|------|-------------|
| 画像ファイルの中身 | 目視 + image-catalog.json と import 名の対応表 |
| 演習→振り返りの順序 | modeling: ⑧aに ` ```mermaid ` なし / ⑧bにあり |
| sidebarとファイルの一致 | modeling-debrief が sidebar にあるか |
| 受講者OS | prework に winget、Homebrew-only なし |
| 感情設計（答え先出し） | 各ページに `IntroPunch` または `Callout variant="warn"` で「ここでは見ない」 |
| agent-browser 目視 | 1366×768 / 375×812 で主要ページ |

---

## 4. やるべきことチェックリスト（実装フェーズ用）

### P0 — 門限⑧ UX分割の仕上げ（本文は分割済）

- [x] `astro.config.mjs` sidebar: `門限（演習）` + `門限（振り返り）` を DAY1 PM に追加
- [x] `start/schedule.mdx`: ⑧ → ⑧a演習 / ⑧b振り返り
- [x] `free-explore.mdx` / `index.mdx` / 他リンク: ⑧aへ、振り返りは⑧bへ
- [x] `verify`: `modeling-exercise-no-mermaid`（⑧aに完成flowchartなし）
- [x] `verify`: `modeling-debrief-has-structure`（⑧bにmermaid + UML言及）
- [x] `SESSION_INPUT_AUDIT.md`: セクション G（門限UX）追加

### P1 — 薄いページの体験化

- [x] `free-explore.mdx`: StepFlow + 終了5分共有テンプレ
- [x] `reflect.mdx`: 振り返りskillプロンプト + learning-log例
- [x] `assign.mdx` / `production.mdx`: 最低限のStepFlow + チェックリスト

### P1 — 画像整合

- [x] prework / security / codex-mastery の ImageGrid → ImageText
- [x] `image-text-manifest.json` 全ImageTextカバー
- [ ] `IMAGE_TODO.md` 優先度A/B の撮影・生成（和島タスク）
- [ ] hook正本テキスト配布（和島タスク → security にリンク）

### P2 — 検証強化

- [x] verify に modeling-split 2項目追加
- [ ] verify に `no-answer-before-exercise` 汎用ルール（任意: ⑧a, ⑩v1節など）
- [ ] agent-browser: 全主要ページスクショ（2サイズ）
- [ ] `pnpm build` + 本番デプロイ（和島指示後）

### P2 — 目視のみ

- [ ] TOP 1366×768 ファーストビュー
- [ ] ground-rules / why-ai 密度
- [ ] intro wajima-profile 画像

---

## 5. 検証項目一覧（手動 + 自動）

### 5.1 自動（`cd site && pnpm verify`）

**現状 37項目** — 詳細は [`site/scripts/verify-training-content.mjs`](site/scripts/verify-training-content.mjs)

| カテゴリ | verify ID 例 | 意味 |
|----------|--------------|------|
| 命名順序 | purpose-no-ipoa-name, ipoa-after-experience | 先出し禁止 |
| ⑨ Input | codex-voice-exercise, codex-handwritten-photo | ハンズオン必須 |
| ⑥s | security-learning-off, security-hook-delivery | セキュリティ共通体験 |
| 画像 | image-align:setup:workmodeShot | titleと画面の一致 |
| Day2流 | showcase-is-prep, reflection-100-peak | 100選タイミング |
| 環境 | prework-windows | Windows向け |

**追加予定（P0）**:

| verify ID | 条件 |
|-----------|------|
| modeling-exercise-no-mermaid | `day-1/modeling.mdx` に ` ```mermaid ` ブロックなし |
| modeling-exercise-no-uml | ⑧a に UML / 共感マップ / 迎えに来て なし |
| modeling-debrief-has-mermaid | ⑧b に mermaid flowchart あり |
| modeling-debrief-has-concepts | ⑧b に UML または 共感マップ |
| sidebar-modeling-debrief | astro.config に modeling-debrief slug |

### 5.2 手動チェック（講義UX）

各ページを開き、以下を5分で確認:

| # | 質問 | Pass条件 |
|---|------|----------|
| M1 | 受講者が**考える前に答えを見える**か？ | 演習ページに完成図・正解・概念名なし |
| M2 | **Codexを開く指示**があるか？ | ハンズオン節に「全員Codexを開く」相当 |
| M3 | **コピペプロンプト**があるか？ | 演習節に ```text ブロック |
| M4 | **次ページへの感情つなぎ**があるか？ | 末尾に「次は〜（なぜ）」1行以上 |
| M5 | **左画像＝右の操作**か？ | 節タイトルとスクショ内容一致 |
| M6 | **不安層向け**か？ | 専門用語に入口説明 or 口頭代替の注記 |

### 5.3 ビルド & デプロイ

```bash
cd /Users/wajimayuki/Cursor/general/site
pnpm verify    # 37+N PASS 目標
pnpm build
# デプロイは和島指示後
cd .. && vercel deploy --prod --yes --scope sento-group
```

---

## 6. 門限⑧ — 分割設計（正本）

talk-script L107-114 の意図をサイトUXに落とした分割:

| 段階 | ページ | 受講者がやること | **載せないもの** |
|------|--------|------------------|------------------|
| 演習 | ⑧a modeling | シナリオ読む → Codexで娘/父/フロー/リスク | Mermaid完成図、UML名、解「迎え」 |
| 口頭 | （講師） | 気づき共有 | — |
| 振り返り | ⑧b modeling-debrief | 構造の型・概念名・業務接続 | 演習プロンプトの繰り返し |

**感情設計**: ⑧a=「考える」(4) → ⑧b=「なるほど、型がある」(5)

---

## 7. 画像整合 — チェック手順

1. `site/scripts/image-catalog.json` で PNG の**実画面**を確認
2. mdx の `import xxx from '.../codex-*.png'` と ImageText `title` が一致するか
3. `pnpm verify` の `image-align:*` が PASS
4. 未撮影は `site/IMAGE_TODO.md` に残し、`training-placeholder` で明示

**ImageText 推奨ルール**（ImageGridより）:

- 1画像1 ImageText（左画像・右手順）
- title に**画面名**、caption に**操作対象**
- manifest に import 名と titleKeywords を登録

---

## 8. セッション分割の推奨（実装時）

| セッション | スコープ | 完了条件 |
|------------|----------|----------|
| **S1** | P0 門限分割仕上げ + verify追加 | verify全緑、sidebar整合 |
| **S2** | P1 薄いページ4本 | M2-M3手動チェックPass |
| **S3** | P1 画像 ImageText化 + manifest | image-align全Pass |
| **S4** | P2 目視 + agent-browser + deploy | 和島承認 |

---

## 9. 変更ログ

| 日付 | 内容 |
|------|------|
| 2026-06-20 | 初版。門限⑧分割方針、全ページ感情評価、UX-01〜08、verify盲点、P0-P2チェックリスト |
