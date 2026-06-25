# 追加スクショ TODO（和島タスク）

> **2026-06-20 更新**: `training/` 配下のPNGは `screenshots-*` から正しい内容で差し替え済み。
> 左画像・右解説の不一致は **ファイル名と中身の取り違え** が原因だった（verify はキーワードのみで画像中身を見ていなかった）。

## 2026-06-22 ゼロベース再設計で発生したTODO（和島タスク）

> 由来: `grill-notes/2026-06-22-training-flow-zero-base.md`。新スパイン反映に伴う画像・挿絵。

### 挿絵・図（生成 or 提供）

- **IPOAループ図**（Input→Process→Output→Action）— 新規 `day-1` IPOA解説ページ用（Day1 AM）。まずMermaid/SVGで叩き、必要なら挿絵差し替え。**和島が挿絵を入れる場合のTODO**。
- **到達像デモ素材**（オープニング session1）— 「1日目終わり＝業務フローv1→v2」「2日目終わり＝成果物一覧の一望」のビフォーアフター見本。和島の実例スクショ or サンプルがあると強い。
- **ザ・ゴール書影** — 和島提供画像（添付済みのザ・ゴール表紙）。`site/src/assets/training/the-goal.png` 等へ。Day2 TOCページに使用（著作権は和島判断でOK）。

### 体験スクショ（プラグイン独立セッション・Input）

- **Box 情報検索**の実行画面（プラグインで社内ドキュメントを検索）
- **Spreadsheet プラグインでシート解析**の画面
- **skill-improver** 実行画面（Process改善セッション用）

### 廃止・要削除（旧前提のため不要に）

- 優先度A の「Node.js インストーラ」「Git for Windows」「`node --version`」「GitHub/Vercel アカウント作成」系は **Git/GitHub/Vercel を使わない方針**のため不要。prework改稿時に削除。
- hello.md 廃止に伴い、動作確認用の「自己紹介3行」関連スクショは不要。

## 優先度A（事前準備・Windows）

1. **Node.js インストーラ（Windows）** — `/start/prework/` Node.js セクション
2. **Git for Windows セットアップ画面** — 同上
3. Codex App ダウンロードページ — `/start/prework/` Codexセットアップ
4. ChatGPTサインイン画面（Codex内） — 同上
5. Codexでプロジェクト（フォルダ）追加画面 — 同上
6. GitHub / Vercel / Asana のアカウント作成画面（各1枚） — アカウント作成

## 優先度B（セキュリティ・⑥s）

8. **ChatGPT「学習に使用しない」設定画面** — `day-1/security.mdx` 説明①
9. **Codex Image 1.5 生成の挿絵** — 「復元不可＋学習OFF」の2点図解（security 説明①）
10. hook 設定完了画面（講師配布hook適用後） — security 共通体験

## 優先度C（補強）

11. ChatGPTモバイルアプリでCodexを開いた画面
12. Claude `claude rc` のQR表示画面

## 命名規則（追加時）

- 保存先: `site/src/assets/training/`
- 命名: `prep-<topic>-<index>.png` / `security-<topic>-<index>.png`

## 反映先

- `site/src/content/docs/start/prework.mdx`
- `site/src/content/docs/day-1/security.mdx`

## 画像整合チェック

```bash
cd site && pnpm verify   # image-align:* テスト含む
```
