// Genera las ramas de café realistas para la decoración (fondo transparente).
// Uso: node tools/gen-ramas.mjs [nombre…]   Clave: OPENAI_API_KEY en el entorno o en .env (ignorado por git).
// Salida 1024px en assets/deco/hd/; la web usa: sharp(hd).trim().resize(420, 420, { fit: "inside" }).webp({ quality: 80 }) → assets/deco/<nombre>.webp
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';

const ROOT = new URL('../', import.meta.url);
const HD = new URL('assets/deco/hd/', ROOT);
mkdirSync(HD, { recursive: true });
const env = existsSync(new URL('.env', ROOT)) ? readFileSync(new URL('.env', ROOT), 'utf8') : '';
const KEY = process.env.OPENAI_API_KEY || (env.match(/^OPEN(?:AI)?_API_KEY=(.+)$/m) || [])[1]?.trim();
if (!KEY) { console.error('Falta OPENAI_API_KEY (en el entorno o en .env)'); process.exit(1); }

const BASE = `Realistic botanical illustration, high detail, soft natural lighting with gentle shadows,
isolated on a fully transparent background, no ground, no text, no frame.`;
const ITEMS = {
  'rama-esquina': 'A coffee plant branch growing diagonally from the bottom-left corner toward the top-right: glossy deep green coffee leaves with visible veins, clusters of ripe red and a few orange and green coffee cherries along the stem.',
  'rama-lateral': 'A long horizontal coffee plant branch with glossy green leaves of different sizes and small clusters of ripe red coffee cherries, a few small white coffee blossoms.',
  'granos': 'A small scattered group of five roasted coffee beans and two green coffee leaves, top view.',
};

const want = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(ITEMS).filter(n => !existsSync(new URL(n + '.webp', HD)));
await Promise.all(want.map(async n => {
  const r = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST', headers: { Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'gpt-image-1.5', prompt: BASE + '\n' + ITEMS[n], size: '1024x1024', quality: 'high', background: 'transparent', output_format: 'webp', output_compression: 85 }),
  });
  const j = await r.json();
  if (!r.ok) return console.error(n, 'error:', j.error?.message || r.status);
  writeFileSync(new URL(n + '.webp', HD), Buffer.from(j.data[0].b64_json, 'base64'));
  console.log(n, 'ok');
}));
