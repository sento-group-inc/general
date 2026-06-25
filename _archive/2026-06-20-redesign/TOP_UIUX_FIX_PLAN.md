# TOP画面 UI/UX改修 実行計画（新規セッション用ハンドオフ）

> このファイル単体で実行できる。新規セッションで開き、上から順に実行する。
> **このmdは編集対象ではない。指示書として読む。**

---

## 0. 前提・対象

- 対象リポ: `/Users/wajimayuki/Cursor/general/site`（Astro + Starlight + astro-mermaid）
- 本番URL（alias）: https://general-ai-seminar.vercel.app
- Vercelプロジェクト: `sento-group/general`（デプロイは**リポジトリroot** `/Users/wajimayuki/Cursor/general` から実行する。`site/` からだと `site/site` を探して失敗する既知挙動あり）
- 参照UI: `/Users/wajimayuki/Cursor/Aigassyuku06/prep.html`、`/Users/wajimayuki/Cursor/Aigassyuku06/index.html`

### 編集する主ファイル
- `site/src/content/docs/index.mdx`（TOP本体）
- `site/src/styles/global.css`（余白・タイポ・新規ミニProgressMap用CSS）
- 必要なら `site/src/components/ProgressMap.astro`（`variant="mini"` を追加）

---

## 1. 解決する問題（現状のTOPのNG）

現状TOPは「スクロールしないと何をすればいいか分からない」。以下を潰す。

1. ファーストビューの余白過多（ヒーロー上下が広すぎ、重要情報が下に押し出される）
2. 「今すぐ何をするか」が1画面で完結しない（開始導線・今日やること・セクション導線が折り畳まれている）
3. 進捗UIの重複（ヘッダー進捗バー＋本文ProgressMapで縦を圧迫）
4. 主CTAの視認性が弱い
5. 情報順が逆（「このサイトの使い方」より先に「開始」と「今日やること3つ」が要る）

---

## 2. 改修仕様（確定）

### A. ファーストビュー1画面完結（最優先）
デスクトップ1366×768の**初期表示内**に、スクロールなしで以下が収まること:
- サイトタイトル＋短いタグライン（1行）
- 主CTA「事前準備に進む」（大きめ・高コントラスト）＋次CTA「Day1をはじめる」
- 「今日やること3つ」（3カード or 3行、簡潔に）
- START / DAY1 / DAY2 / 便利リポジトリ へのクイックリンク（ピル or 小カード）

### B. ProgressMapはTOPではミニ化
- TOPでは**1行ピル表示**（5ラベルを横1行、現在地ハイライトのみ）
- 既存の詳細版ProgressMapは各下層ページ先頭のまま維持
- 実装案: `ProgressMap.astro` に `variant?: 'full' | 'mini'` を追加し、TOPは `mini` を使う。CSSは `.progress-map.is-mini` で高さ・余白を圧縮し、`.progress-map-text` を非表示にしてラベルだけ横並び

### C. 情報順（上から）
1. ヒーロー（タイトル＋タグライン＋主/次CTA）
2. ミニProgressMap（1行）
3. 今日やること3つ
4. セクション導線カード（START/DAY1/DAY2/REFERENCE/便利リポジトリ）
5. 研修全体地図（Mermaid）※ここは折り返し下でOK
6. 2日間で持ち帰るもの（補足）

### D. 見た目・余白
- `global.css` のヒーロー/見出し周りの縦余白を圧縮
- 既存トーン（白背景 `#fbfbf8`＋ティール系アクセント `#486b3b`）は変えない
- ボタンは高さ・パディング・コントラストを上げる
- カード間 `gap` を詰めて総スクロール量を削減
- 既存の `--sl-text-5xl: clamp(1.9rem, 3vw, 2.6rem)` は維持（必要ならヒーローのみさらに微減）

---

## 3. 実装手順

1. `site/src/content/docs/index.mdx` を改修
   - splashヒーローの `actions` は維持しつつ、本文順序を「2-C」の順に再構成
   - 冒頭の `<ProgressMap current="start" />` を**ミニ版**に差し替え（`variant="mini"`）
   - 「このサイトの使い方（IntroPunch）」は**下方**へ移動（最優先情報ではない）
   - 「今日やること3つ」を新設（CardGrid or 簡易リスト、文言は短く）
2. `site/src/components/ProgressMap.astro` に `variant` propを追加（`mini`時はテキスト省略・1行）
3. `site/src/styles/global.css`
   - `.progress-map.is-mini` 系スタイル追加
   - ヒーロー/セクションの縦余白圧縮（`.session-section`/splashヒーロー周辺）
   - CTAボタン強調（Starlightの `.action` を上書きせず、必要なら独自クラス）
4. レスポンシブ確認用に390幅でも崩れないこと（カード1列化）

---

## 4. 検証（必須・完了の定義）

### A. ビルド
```bash
cd /Users/wajimayuki/Cursor/general/site && pnpm build
```
- エラーなし、`ReadLints` でlintなしを確認

### B. UI実機確認（agent-browser）
> agent-browserのコマンド構文は必ず先にロードする（バージョンで変わる）。
```bash
agent-browser skills get agent-browser --full
```
- ローカルプレビュー（`pnpm preview` 等）または本番URLを開く
- **1366×768** と **390×844** の2サイズでスクショ取得
- 合格条件:
  - 1366×768の初期表示内に「主CTA＋今日やること3つ」が収まる（スクロール不要）
  - 390×844でカードが1列化し破綻しない
  - 進捗UIが重複して見えない（TOPはミニのみ）

### C. デプロイ
```bash
cd /Users/wajimayuki/Cursor/general && vercel deploy --prod --yes --scope sento-group
```
- 出力の Aliased が `https://general-ai-seminar.vercel.app` になることを確認
- 反映後、本番URLを agent-browser で再確認

---

## 5. やらないこと（スコープ外）
- 全体のデザインテーマ変更（配色・フォント刷新）はしない
- 下層ページの内容改修は今回しない（TOPのファーストビュー最適化に集中）
- ProgressMapの詳細版の挙動は変えない（TOPでミニ化するだけ）

---

## 6. 参考
- 現行本番: https://general-ai-seminar.vercel.app/
- 密度参照: https://aigassyuku06.vercel.app/prep
- ローカル参照HTML: `/Users/wajimayuki/Cursor/Aigassyuku06/prep.html`, `/Users/wajimayuki/Cursor/Aigassyuku06/index.html`

---

## 7. 新規セッション開始時の一言（コピペ用）
```
/Users/wajimayuki/Cursor/general/TOP_UIUX_FIX_PLAN.md を読んで、その計画どおりに最後まで実行して。途中で止まらず、build→agent-browserでUI確認→general-ai-seminar.vercel.appへ再デプロイまで通して。不可逆操作以外は確認不要。
```
