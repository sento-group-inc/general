# 講義サイト 全改善点 実行計画（新規セッション用ハンドオフ）

> このファイル単体で実行できる。新規セッションで開き、上から順に実行する。
> **このmdは編集対象ではない。指示書として読む。**
> TOPのファーストビュー特化の詳細は別ファイル `TOP_UIUX_FIX_PLAN.md` も併読。

---

## 0. 前提・対象

- 対象リポ: `/Users/wajimayuki/Cursor/general/site`（Astro + Starlight + astro-mermaid）
- 本番URL（alias）: https://general-ai-seminar.vercel.app
- Vercelプロジェクト: `sento-group/general`。デプロイは**リポジトリroot** `/Users/wajimayuki/Cursor/general` から `vercel deploy --prod --yes --scope sento-group`（`site/` から打つと `site/site` を探して失敗する）
- 参照UI（密度・画像の入れ方の見本）:
  - `/Users/wajimayuki/Cursor/Aigassyuku06/prep.html`（特に `prep.html:512` 付近の画像挿入）
  - `/Users/wajimayuki/Cursor/Aigassyuku06/index.html`（特に `index.html:886` 付近の grill-me セクション）
  - 本番: https://aigassyuku06.vercel.app/repos

---

## 1. 和島が挙げた改善点（原文・端折らず転記）

> 出典: 和島のフィードバック（番号は本人の付番どおり）

**1.** 添付のようにタイトルがでかすぎるのをチェックしていない

**2.** https://site-kappa-ten-51.vercel.app/reference/codex-settings/ の内容はDay1に詳細に説明と設定を一緒にやる必要があるだろ。各項目の解説とかもちゃんと丁寧にしろ

**3.** 貼り付けたスクショはその設定を推奨しているわけではないので、OOで設定しましょうって例えば左に画像があって、右にやることとかが書いてあるとか1画面の中で見やすくなってないと見にくい。何していいかわからない。

**4.** `image/和島自己紹介.png` とかは適宜使って。というか、全体的に文字だけ過ぎてわかりにくい

**5.** 図解とかを都度入れるっていっていたのに全然入ってないのはなぜなのか？

**6.** `Aigassyuku06/index.html:886` grill-me型プロンプトで業務を深掘りする のセクションも入れてほしいって書いてあったはず。

**7.** 以前に作ったやつがこれなんだけど、構成とかはいまのでもいいけど、内容が文字だけでわかりにくいし、貧弱すぎるので `Aigassyuku06/index.html` を参考にして中身を充実させてほしい。

**8.** https://aigassyuku06.vercel.app/repos この便利リポジトリの一覧ページも作っておいて

**9.** TOPのページ（ https://site-5t30cb3un-sento-group.vercel.app/ ）が全体へのアクセスのページになっててほしい。なにも書いてなくてわかりにくい。

**10.** あと事前準備ページどこだよ。全然守ってねーじゃん。 `Aigassyuku06/prep.html` の `prep.html:512` みたいな感じで画像が色々挿入されてるようにって依頼したじゃん。どういう画像を挿入するか？がWEB検索してわからないのであれば、探してくるからそれは私のTODOとして残しておいて

### 追加で前段から確定している要件（端折らず併記）
- **A. セキュリティ共通体験（Day1 AM）**: ①AIに個人情報/秘匿情報を渡しても復元できない＋学習に使用しないのチェックを付ける、というセクションを入れる。②人が気をつける＋違反時に警告する機構の2方向で説明。セキュリティページのリンク・解説を図解でわかりやすく。挿絵はAI生成で挿入。「これなら安心して進める」という共通体験で安心感を与える。hookが無ければ AGENTS.md に書く（AGENTS.mdの学びにもなる）。完全シャットアウトは不可能なので、精度を上げるのは社内で作る未来タスクに回し、一旦の解決策として流す。
- **B. IPOA徹底**: 完璧/計画精度ではなく「改善起点」。恥を早く出して高速改善＝AIの醍醐味。IPOA（Input/Process/Output/Action）を合言葉=ゼネラル共通語に。精神論を長文化せず、和島が口頭補足できる「パートの枠」を用意。読んで腹落ちできる人にはできる程度に。
- **C. 手書き業務メモ→写真→Mermaid化** を講義に取り入れる（Inputを増やす実践）。
- **D. 性格診断など**は「時間が余った人がやる」ページに寄せる。
- **E. 成果物リンク集**: 特定フォルダに集約→一覧HTMLを生成（講師側でやる）。
- **F. 100選は「埋め続ける器」=未完で開いたまま終える**。明日試す1つを各自宣言。締めは全員発言＋座談会を後半に置き、個人発表が伸びたら座談会を削る設計。

---

## 2. 各項目の「やること」（実装指示）

### 項目1 — タイトル巨大問題
- `site/src/styles/global.css` の `--sl-text-5xl` と `.session-title` のフォントサイズを再点検。全ページの先頭 `#` 巨大h1の二重表示が無いか確認（frontmatter title と本文h1の重複を排除）。
- 1366×768で各ページのタイトルが画面の1/3を食わないこと。

### 項目2 — reference/codex-settings をDay1へ統合・各項目丁寧に
- `reference/codex-settings.md` は**早見表（quick links）に圧縮**し、詳細はDay1へ。
- `day-1/setup.mdx`・`day-1/security.mdx`・`day-1/codex-mastery.mdx` に、各設定項目の**目的・手順・なぜそうするか**を丁寧に記述。

### 項目3 — スクショは「左=画像 / 右=やること」1画面レイアウト
- `ImageText.astro`（画像左・テキスト右）で各設定を1ブロック1画面完結に。
- スクショは**推奨設定の例示**であって強制でない旨を `Callout` で明記（「○○で設定しましょう」の語調）。

### 項目4 — 和島自己紹介.png 活用＋文字だけ解消
- `day-1/intro.mdx` で `image/和島自己紹介.png`（assets配置名: `wajima-profile.png`）を `ImageText` で使用。
- 全ページで「文字の壁」を作らない。画像/図解/カードで分割。

### 項目5 — 図解を都度入れる
- 各章に最低1つ Mermaid もしくは SVG 図を入れる（why-ai / modeling / security / work-inventory / index など）。
- 概念図はコード生成（Mermaid）優先でデザイン統一。

### 項目6 — grill-me型プロンプトで業務深掘りセクション
- 見本: `Aigassyuku06/index.html:886` 付近。
- `day-2/work-inventory.mdx` に grill-me セクション（IntroPunch＋BenefitCards＋Mermaidフロー＋grill-meプロンプト2本＋辞書登録手順）を入れる。

### 項目7 — 内容が貧弱→Aigassyuku06基準で充実
- 構成は現状でよいが、中身を `Aigassyuku06/index.html` の密度に引き上げる。
- 文字だけのページをゼロに。各セクションに視覚要素。

### 項目8 — 便利リポジトリ一覧ページ
- 見本: https://aigassyuku06.vercel.app/repos
- `reference/repos.mdx` を作成（gogcli / notebooklm-py 等を CardGrid＋表で）。`astro.config.mjs` の sidebar に追加。

### 項目9 — TOPを全体導線ハブに
- 詳細は `TOP_UIUX_FIX_PLAN.md`。要点: ファーストビュー1画面で「主CTA＋今日やること3つ＋各セクション導線」。進捗UIはTOPではミニ1行。

### 項目10 — 事前準備ページを prep.html 基準で画像リッチ化
- 見本: `Aigassyuku06/prep.html`（特に `prep.html:512` の画像挿入の仕方）。
- `start/prework.mdx` を StepFlow＋ImageGrid＋ImageText＋Callout で再構成。
- **不足画像はプレースホルダ＋ `site/IMAGE_TODO.md` に「和島が撮影/収集するTODO」として列挙**（勝手に低品質画像を入れない）。

---

## 3. 再利用コンポーネント（既存/必要）
`site/src/components/training/` に以下を用意（無ければ作る）:
- `SectionHead.astro` 番号付き見出し
- `IntroPunch.astro` あるある→だから→おわり 枠
- `Callout.astro` note/warn/check/tip
- `StepFlow.astro` + `Step.astro` 手順
- `ImageText.astro` 画像左+テキスト右
- `ImageGrid.astro` 2カラム画像
- `BenefitCards.astro` ベネフィットカード
- `ProgressMap.astro` 進捗（TOP用に `variant="mini"` を追加）

---

## 4. 画像アセット
- 配置: `site/src/assets/training/`
- 既存: `wajima-profile.png` ＋ 提供スクショ10枚（ASCII名にリネーム済み）
- 不足分: プレースホルダ表示＋ `site/IMAGE_TODO.md` に列挙（どの画面のスクショが必要か具体的に）

---

## 5. 検証（完了の定義）

### A. ビルド/lint
```bash
cd /Users/wajimayuki/Cursor/general/site && pnpm build
```
- エラー0、`ReadLints` でlint0

### B. UI実機（agent-browser）
```bash
agent-browser skills get agent-browser --full   # 構文を必ず先にロード
```
- 1366×768 と 390×844 でスクショ取得
- チェック:
  - 全ページでタイトルが過大でない（項目1）
  - 設定ページが「左画像/右やること」で1画面完結（項目2,3）
  - 文字だけのページが無い・図解が各章にある（項目4,5,7）
  - grill-meセクションが存在（項目6）
  - /reference/repos が表示（項目8）
  - TOPがファーストビューで導線完結（項目9）
  - /start/prework が画像リッチ（項目10）

### C. デプロイ
```bash
cd /Users/wajimayuki/Cursor/general && vercel deploy --prod --yes --scope sento-group
```
- Aliased が `https://general-ai-seminar.vercel.app` になることを確認→本番を agent-browser で再確認

---

## 6. やらないこと
- デザインテーマ（配色/フォント）の全面刷新はしない（既存トーン維持）
- 低品質な拾い画像の埋め込み（不足は必ずTODO化）
- セキュリティの完全シャットアウト機構の作り込み（社内向け未来タスク）

---

## 7. 新規セッション開始時の一言（コピペ用）
```
/Users/wajimayuki/Cursor/general/IMPROVEMENTS_PLAN.md と TOP_UIUX_FIX_PLAN.md を読んで、計画どおり全項目（1〜10＋A〜F）を最後まで実行して。途中で止まらず、build→agent-browserで全ページUI確認→general-ai-seminar.vercel.appへ再デプロイまで通して。不可逆操作以外は確認不要。不足画像はIMAGE_TODO.mdに残す。
```
