import type { APIRoute } from 'astro';

// 研修ライブ用「研修はいまこちら！」の共有現在地を読み書きする API。
// GET  -> { path: string | null }  現在地のパスを返す
// POST -> { path }                 現在地をセット（全員更新可）
//
// 保存先は Vercel KV(Upstash Redis) の REST API。トークンはサーバ側のみで使い、
// クライアントには一切露出しない。環境変数が未設定の場合（ローカル等）は
// プロセス内メモリにフォールバックする（単一プロセス内でのみ有効）。

export const prerender = false;

const KEY = 'training:current-path';

function env(name: string): string | undefined {
	return (typeof process !== 'undefined' ? process.env[name] : undefined) ?? (import.meta.env as any)[name];
}

// Vercel KV / Upstash いずれの命名でも拾えるようにする
const REST_URL = env('KV_REST_API_URL') ?? env('UPSTASH_REDIS_REST_URL');
const REST_TOKEN = env('KV_REST_API_TOKEN') ?? env('UPSTASH_REDIS_REST_TOKEN');
const hasKV = Boolean(REST_URL && REST_TOKEN);

// KV 未設定時のフォールバック（プロセス内メモリ）
let memory: string | null = null;

async function redis(cmd: string[]): Promise<unknown> {
	const res = await fetch(REST_URL!, {
		method: 'POST',
		headers: { Authorization: `Bearer ${REST_TOKEN}` },
		body: JSON.stringify(cmd),
	});
	if (!res.ok) throw new Error(`KV request failed: ${res.status}`);
	const data = (await res.json()) as { result?: unknown };
	return data.result ?? null;
}

function json(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			'Content-Type': 'application/json',
			// CDN/ブラウザにキャッシュさせない（現在地は常に最新を返す）
			'Cache-Control': 'no-store, max-age=0',
		},
	});
}

export const GET: APIRoute = async () => {
	try {
		const path = hasKV ? ((await redis(['GET', KEY])) as string | null) : memory;
		return json({ path: path ?? null });
	} catch {
		return json({ path: null, error: 'read failed' }, 502);
	}
};

export const POST: APIRoute = async ({ request }) => {
	const body = (await request.json().catch(() => ({}))) as { path?: unknown };
	const path = typeof body.path === 'string' && body.path.startsWith('/') ? body.path : null;
	if (!path) return json({ error: 'valid path required' }, 400);
	try {
		if (hasKV) await redis(['SET', KEY, path]);
		else memory = path;
		return json({ path });
	} catch {
		return json({ error: 'write failed' }, 502);
	}
};
