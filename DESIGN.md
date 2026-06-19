# AI研修ポータル Design System

## Source of truth

- Visual reference: `design/quiet-navigation-reference.png`
- Direction: 静かなナビゲーション。白地、深緑、黄土色、細い罫線で、長時間でも迷わず読める教材画面にする。
- Purpose: 非技術職の受講者が、講義中に「今どこか」「何をするか」「何を作るか」を一目で判断できること。

## Layout

- Desktop: 左ナビ 15% / 本文 66% / 右目次 19% の三列を基本にする。
- Header: 検索、Day進捗、受講者メニューを一列に置く。
- Content: 最大幅を抑えず、本文内は見出し・罫線・余白で構造化する。
- Mobile: 左右ナビはドロワーへ退避し、本文を一列にする。

## Tokens

- Canvas: `#fbfbf8`
- Surface: `#ffffff`
- Ink: `#17202a`
- Muted: `#687079`
- Rule: `#d9ddd8`
- Primary green: `#486b3b`
- Primary green dark: `#2f4d28`
- Current accent: `#c58b17`
- Display font: `Shippori Mincho`
- Body font: `Noto Sans JP`
- Radius: 4px for controls, 8px for large functional panels only

## Components

- Session header: `今ここ`、Day、講義名、目的、所要時間を一つの帯として扱う。
- Concept map: インプットを短いチップで示す。
- Exercise: 丸数字と縦の流れで作業順を示す。
- Prompt block: コピー可能な実用テキストとして表示する。
- Checkpoint: 受講者がその場で完了確認できるチェック項目。
- Deliverable: ファイル名と提出物を明示する。
- Next: 次の講義名と所要時間を横長の導線で示す。

## Motion and interaction

- 初回表示は本文だけを短くフェードインする。常時動く装飾は使わない。
- Hoverは背景色と下線、Focusは2pxの緑アウトラインで明示する。
- `prefers-reduced-motion`ではアニメーションを無効化する。

## Do

- 罫線、タイポグラフィ、余白を優先して情報を分ける。
- 14〜16pxを本文基準にし、日本語のline-heightは1.8前後にする。
- 深緑は現在地と完了、黄土色は「今ここ」だけに使う。
- Windows Chrome / Edgeで読みやすい密度にする。

## Don't

- 紫グラデーション、過剰な角丸、カードの入れ子を使わない。
- すべてをカード化しない。
- 装飾目的のイラスト、絵文字、意味のない影を足さない。
- 講師用メモや裏の設計意図を公開側へ混ぜない。
