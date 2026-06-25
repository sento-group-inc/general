// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
	site: 'https://general-ai-seminar.vercel.app',
	integrations: [
		mermaid({
			theme: 'neutral',
			autoTheme: true,
			enableLog: false,
		}),
		starlight({
			title: 'AI研修',
			description: 'Codexを仕事と日常で使いこなすための2日間実践研修',
			locales: { root: { label: '日本語', lang: 'ja' } },
			defaultLocale: 'root',
			favicon: '/favicon.svg',
			customCss: ['./src/styles/global.css'],
			lastUpdated: false,
			components: {
				Header: './src/components/Header.astro',
				TableOfContents: './src/components/TableOfContents.astro',
			},
			sidebar: [
				{
					label: 'START',
					items: [
						{ label: 'トップ', link: '/' },
						{ label: 'はじめに', slug: 'start' },
						{ label: '2日間スケジュール', slug: 'start/schedule' },
					],
				},
				{
					label: 'DAY 1｜触って広げる',
					items: [
						{ label: '1 オープニング', slug: 'day-1/intro' },
						{ label: '2 なぜAIを使うか', slug: 'day-1/why-ai' },
						{ label: '3 IPOA：進め方の地図', slug: 'day-1/ipoa' },
						{ label: '4 グランドルール・詰まったら', slug: 'day-1/ground-rules' },
						{ label: '5 事前準備・セットアップ', slug: 'start/prework' },
						{ label: '6 セキュリティ設定', slug: 'day-1/security' },
						{ label: '7 自由探索', slug: 'day-1/free-explore' },
						{
							label: '8 Codexを操る',
							items: [
								{ label: '概要', slug: 'day-1/codex-mastery' },
								{ label: 'AGENTS.md・learning-log', slug: 'day-1/agents-logging' },
								{ label: 'Planモード', slug: 'day-1/plan-mode' },
								{ label: 'Goalモード', slug: 'day-1/goal-mode' },
							],
						},
						{
							label: '9 Input：プラグイン・音声・写真・資料',
							items: [
								{ label: 'プラグイン', slug: 'day-1/plugins' },
								{ label: '入力方法（音声・写真・資料）', slug: 'day-1/input-methods' },
								{ label: 'crawl4aiでWebをInputにする', slug: 'day-1/crawl4ai' },
							],
						},
						{
							label: '10 Skill：段取りを部品化',
							items: [
								{ label: '概要', slug: 'day-1/skills' },
								{ label: 'grill-me', slug: 'day-1/skills/grill-me' },
								{ label: 'handoff', slug: 'day-1/skills/handoff' },
								{ label: 'teach', slug: 'day-1/skills/teach' },
								{ label: 'reflect（振り返り）', slug: 'day-1/skills/reflect' },
								{ label: 'writing-great-skills', slug: 'day-1/skills/writing-great-skills' },
							],
						},
						{
							label: '11 門限の話＝モデリング',
							items: [
								{ label: '演習', slug: 'day-1/modeling' },
								{ label: '振り返り（UML）', slug: 'day-1/modeling-debrief' },
							],
						},
						{ label: '12 Mermaid業務フロー改善ループ', slug: 'day-1/mermaid-flow' },
						{ label: '13 Day1ふりかえり', slug: 'day-1/reflect' },
					],
				},
				{
					label: 'DAY 2｜自分の業務に落とす',
					items: [
						{ label: '今日の流れ', slug: 'day-2/today' },
						{ label: '14 業務棚卸し（TOC）', slug: 'day-2/work-inventory' },
						{ label: '15 作業分担・着手', slug: 'day-2/assign' },
						{ label: '16 本制作 v1→v2', slug: 'day-2/production' },
						{ label: '17 振り返りskill・仕込み', slug: 'day-2/showcase' },
						{ label: '18 全員発表・クローズ', slug: 'day-2/reflection' },
					],
				},
				{
					label: 'REFERENCE｜あとで引ける地図',
					items: [
						{ label: 'おすすめカスタム指示', slug: 'reference/custom-instructions' },
						{ label: '便利リポジトリ一覧', slug: 'reference/repos' },
						{ label: 'スラッシュコマンド早見表', slug: 'reference/slash-commands' },
					],
				},
				{
					label: 'EXTRA',
					items: [{ label: '性格診断HTML（任意）', slug: 'extra/personality-html' }],
				},
			],
		}),
	],
});
