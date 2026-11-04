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

const STYLE = `Semi-realistic painted digital illustration in a warm, cozy café storybook style: soft brush shading,
rich warm colors, gentle highlights, clean defined edges, appetizing. Not photographic and not cartoon-flat.
A single centered subject in 3/4 view, whole object visible with margin around it, on a fully transparent background.
No table, no background scenery, no text, no logo, no people.`;
const ITEMS = {
  hot: 'A white ceramic cup of cappuccino with a heart latte art on a saucer, with soft steam rising.',
  cold: 'A tall glass of iced coffee with ice cubes, milk swirling into the coffee and a paper straw.',
  frappe: 'A tall frappé in a clear cup with a dome of whipped cream, caramel drizzle and a straw.',
  lemon: 'A glass of fresh lemonade with ice, lemon slices and a mint sprig, a lemon half beside it.',
  shakes: 'A strawberry milkshake in a tall glass with whipped cream, a cherry on top and a striped straw.',
  spirit: 'An Irish coffee in a stemmed glass mug: dark coffee with a thick layer of cream on top and a few coffee beans beside it.',
  filter: 'A Chemex pour-over coffee maker with a paper filter, half full of brewed coffee.',
  wine: 'A glass of red wine, elegant stemmed glass, deep ruby color.',
  sodas: 'A highball glass of sparkling soda water with bubbles, ice and a lime wheel.',
  beer: 'A pint glass of golden craft beer with a creamy foam head and condensation drops.',
  sweet: 'A slice of chocolate cake with layers of ganache and a strawberry on top, on a small plate.',
  salty: 'A toasted savory sandwich wrap cut in half showing fresh filling of chicken, lettuce and tomato.',
  pizza: 'An artisan pizza with melted mozzarella, tomato, basil and pepperoni, one slice slightly pulled with a cheese stretch.',
  extras: 'A small wooden board with little ramekins of whipped cream, caramel sauce and chocolate chips.',
};

const want = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(ITEMS).filter(n => !existsSync(new URL(n + '.webp', HD)));
for (let i = 0; i < want.length; i += 5) await Promise.all(want.slice(i, i + 5).map(async n => {
  const r = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST', headers: { Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'gpt-image-1.5', prompt: STYLE + '\nSubject: ' + ITEMS[n], size: '1024x1024', quality: 'high', background: 'transparent', output_format: 'webp', output_compression: 85 }),
  });
  const j = await r.json();
  if (!r.ok) return console.error(n, 'error:', j.error?.message || r.status);
  writeFileSync(new URL(n + '.webp', HD), Buffer.from(j.data[0].b64_json, 'base64'));
  console.log(n, 'ok');
}));
