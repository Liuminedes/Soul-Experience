// Genera las ilustraciones de las categorías del menú (fondo transparente), en el estilo pintado de la mascota y las ramas.
// Uso: node tools/gen-menu.mjs [id…]   Clave: OPENAI_API_KEY en el entorno o en .env (ignorado por git).
// Salida 1024px en assets/menu/hd/; la web usa: recorte + 320px webp q80 → assets/menu/<id>.webp
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';

const ROOT = new URL('../', import.meta.url);
const HD = new URL('assets/menu/hd/', ROOT);
mkdirSync(HD, { recursive: true });
const env = existsSync(new URL('.env', ROOT)) ? readFileSync(new URL('.env', ROOT), 'utf8') : '';
const KEY = process.env.OPENAI_API_KEY || (env.match(/^OPEN(?:AI)?_API_KEY=(.+)$/m) || [])[1]?.trim();
if (!KEY) { console.error('Falta OPENAI_API_KEY (en el entorno o en .env)'); process.exit(1); }

// El estilo se toma del dibujo de la mascota (referencia), sin el personaje
const STYLE = `Use ONLY the art style of the reference image: its cute storybook illustration look, fine warm-brown outlines,
soft painted shading, clean shapes. Use rich, saturated, vivid colors with good contrast and clearly defined darker brown outlines (not pale, not washed-out watercolor). Do NOT draw the cat or any character, animal, person, text or logo.
Draw a single appetizing object, centered, slightly cute and simplified but recognizable, whole object visible with margin,
no table, no ground, no cast shadow, no extra props unless described, on a fully transparent background.`;
const ITEMS = {
  hot: 'A white ceramic cup of cappuccino with a heart latte art on a saucer, with soft steam rising.',
  cold: 'A tall glass of iced coffee with ice cubes, milk swirling into the coffee and a paper straw.',
  frappe: 'A tall frappé in a clear cup with a dome of whipped cream, caramel drizzle and a straw.',
  lemon: 'A glass of fresh lemonade with ice, lemon slices and a mint sprig.',
  shakes: 'A strawberry milkshake in a tall glass with whipped cream, a cherry on top and a striped straw.',
  spirit: 'An Irish coffee in a stemmed glass mug: dark coffee with a thick layer of cream on top.',
  filter: 'A Chemex pour-over coffee maker with a paper filter, half full of brewed coffee.',
  wine: 'A glass of red wine, elegant stemmed glass, deep ruby color.',
  sodas: 'A highball glass of sparkling soda water with bubbles, ice and a lime wheel.',
  beer: 'A pint glass of golden craft beer with a creamy foam head and condensation drops.',
  sweet: 'A slice of chocolate cake with layers of ganache and a strawberry on top.',
  salty: 'A toasted savory sandwich wrap cut in half showing fresh filling of chicken, lettuce and tomato.',
  pizza: 'An artisan pizza with melted mozzarella, tomato, basil and pepperoni, one slice slightly pulled with a cheese stretch.',
  extras: 'A small wooden board with little ramekins of whipped cream, caramel sauce and chocolate chips.',
};

const ref = new Blob([readFileSync(new URL('assets/mascota/referencia.webp', ROOT))], { type: 'image/webp' });
const want = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(ITEMS).filter(n => !existsSync(new URL(n + '.webp', HD)));
for (let i = 0; i < want.length; i += 5) await Promise.all(want.slice(i, i + 5).map(async n => {
  const fd = new FormData();
  for (const [k, v] of Object.entries({ model: 'gpt-image-1.5', prompt: STYLE + '\nObject: ' + ITEMS[n], size: '1024x1024', quality: 'high', background: 'transparent', output_format: 'webp', output_compression: '85' })) fd.append(k, v);
  fd.append('image', ref, 'referencia.webp');
  const r = await fetch('https://api.openai.com/v1/images/edits', { method: 'POST', headers: { Authorization: 'Bearer ' + KEY }, body: fd });
  const j = await r.json();
  if (!r.ok) return console.error(n, 'error:', j.error?.message || r.status);
  writeFileSync(new URL(n + '.webp', HD), Buffer.from(j.data[0].b64_json, 'base64'));
  console.log(n, 'ok');
}));
