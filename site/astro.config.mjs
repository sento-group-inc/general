// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://general-ai-seminar.vercel.app',
	integrations: [
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
					items: [{ label: 'はじめに', slug: 'start' }],
				},
				{
					label: 'DAY 1',
					items: [
						{ label: '自由に触ってみる', slug: 'day-1/free-explore' },
						{ label: '性格診断HTML', slug: 'day-1/personality-html' },
						{ label: 'AIへの指示設計', slug: 'day-1/prompt-design' },
						{ label: '結果の改善', slug: 'day-1/improve' },
					],
				},
				{
					label: 'DAY 2',
					items: [
						{ label: '業務の棚卸し', slug: 'day-2/work-inventory' },
						{ label: '成果物を作る', slug: 'day-2/production' },
						{ label: '発表・ふりかえり', slug: 'day-2/reflection' },
					],
				},
				{
					label: 'TEMPLATES',
					items: [{ label: 'テンプレート一覧', slug: 'templates' }],
				},
				{
					label: 'REFERENCE',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
				{
					label: 'AFTER',
					items: [{ label: '研修後のサポート', slug: 'after' }],
				},
			],
		}),
	],
});
