# 株式会社ゼネラル様 AI研修（2日間）

Codexを使った社内AI研修（15名・各部署混在・会議室・2日間）の設計と制作物を置くリポジトリ。

## ドキュメント

| ファイル | 役割 |
|---|---|
| [plan.md](plan.md) | **正本**。構成・確定前提・タイムテーブル・気をつけること（出典つき）・Codex実行タスク・小話素材 |
| [talk-script.md](talk-script.md) | トーク台本（進行キュー）。自己紹介・目的共有から2日通し |
| [overview.md](overview.md) | 営業向け2日間概要（たたき台・トーン参考） |
| [site/](site/) | 公開教材サイトの正本（Astro Starlight／Vercel公開） |
| [DESIGN.md](DESIGN.md) | 公開教材サイトのデザイン正本 |

## 制作タスクの進捗（plan.md §7）

- [ ] T1: 事前セットアップ資料（Codexアプリ・Cursor不要・Node一律導入しない）
- [ ] T2: 振り返りskill（`learning-log/` に保存、AGENTS.mdには昇格ルールのみ）
- [ ] T3: AI活用100選 HTMLテンプレ
- [ ] T4: TOC業務棚卸しワークショップ進行台本（和島の方法・約90分）
- [ ] T5: 第1〜第2のオー！課題設計（性格診断HTML／練習制作＝ToDoアプリ）
- [ ] T6: アウトプット汎用テンプレ群（TOC結果に対応・固定リストではない）
- [ ] T7: 各セッションのコンセプトマップ（縦構成）
- [ ] T8: スクレイピング・ミニデモ素材（repo URL→「使えるように」）
- [ ] T9: Codex/AI習熟ブロック教材（設定・セキュリティ・Planモード・AGENTS.md育て方・スキル自作）
- [ ] T10: スラッシュコマンド早見表ページ（[公開教材](site/src/content/docs/reference/slash-commands.md)）
- [ ] T11: 「うまくいかない時」ガイドページ（[公開教材](site/src/content/docs/reference/troubleshooting.md)）
- [ ] T12: セッション別やってみる＆おかわり課題（[公開教材](site/src/content/docs/reference/session-exercises.md)）
- [ ] T13: AGENTS.md育て方教材（T9内・[設定教材](site/src/content/docs/reference/codex-settings.md) §13b）

## 盲点と方向性（Codexが引き継ぐ前に読む）

- **環境ズレ**：資料スクショは和島のMac、受講者は管理Windows。⌘≠Ctrl/brew≠winget。スクショはWindows実機で撮り直し前提（ただしMacのは些末＝サンプル扱いでOK）。
- **最大の事前リスク**：社内プロキシ/TLSインスペクションでサインインが落ちうる（[codex#6849](https://github.com/openai/codex/issues/6849)）。→ **ゼネラル側で事前にインストール＋サインインまで完了**してもらう（plan §1b）。
- **体制**：講師2人＋バディ制。進度バラつきは おかわり課題で吸収。
- **HTML形式・デザイン決定済み**：Astro Starlightの講義ポータル。白地・深緑・黄土色の「静かなナビゲーション型」で、トップ＋Day1性格診断から展開する。

## 進め方

順次、和島が確認しながら各タスクを制作する。前提・制約は [plan.md](plan.md)、公開デザインは [DESIGN.md](DESIGN.md) を正本とする。
