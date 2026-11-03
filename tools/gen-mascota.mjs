// Genera las poses de la mascota a partir del dibujo aprobado (assets/mascota/referencia.webp).
// Uso:  node tools/gen-mascota.mjs            → genera las que falten
//       node tools/gen-mascota.mjs lentes feliz → regenera esas
// Clave: OPENAI_API_KEY en el entorno o en .env de la raíz (ignorado por git).
// Originales 1024px en assets/mascota/hd/. La web usa versiones recortadas y livianas:
//   sharp(hd).trim().resize(360, 360, { fit: "inside" }).webp({ quality: 82 }) → assets/mascota/<gesto>.webp
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';

const ROOT = new URL('../', import.meta.url);
const OUT = new URL('assets/mascota/', ROOT), HD = new URL('hd/', OUT);
mkdirSync(HD, { recursive: true });
const env = existsSync(new URL('.env', ROOT)) ? readFileSync(new URL('.env', ROOT), 'utf8') : '';
const KEY = process.env.OPENAI_API_KEY || (env.match(/^OPEN(?:AI)?_API_KEY=(.+)$/m) || [])[1]?.trim();
const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1.5'; // gpt-image-2 no admite fondo transparente
if (!KEY) { console.error('Falta OPENAI_API_KEY (en el entorno o en .env)'); process.exit(1); }

const BASE = `Use EXACTLY the same character from the reference image: the same tortoiseshell kitten (black and orange fur pattern),
same soft painted illustration style, same big amber eyes, same olive green cap with the white hummingbird,
same brown leather apron with straps, white hummingbird and the text "Soul" with "EXPERIENCE" below it
(spelled exactly E-X-P-E-R-I-E-N-C-E; if unsure, write only "Soul"), same olive backpack.
Do not change her design, colors or proportions. Full body, centered, whole character visible with margin around it,
on a fully transparent background. No scenery, no table, no coffee cup, no plants, no text outside the apron.`;

const POSES = {
  feliz: 'Sitting, happy, mouth open with tongue out, exactly like the reference.',
  saluda: 'Sitting and waving hello with one front paw raised high, big happy smile.',
  celebra: 'Jumping with joy, both front paws up, eyes closed in happy arcs, small pink hearts floating around her.',
  curiosa: 'Sitting with head tilted to one side, curious expression, small closed smile, one small question mark above her head.',
  lentes: 'Wearing round golden glasses, adjusting them with one paw, examining something closely with a smart, focused expression.',
  traviesa: 'Mischievous smirk, one eye half closed, tail swishing playfully, crouched as if about to pounce.',
  sorprendida: 'Surprised, eyes wide open, small round open mouth, ears up, small surprise lines above her head.',
  enojadita: 'Cute pouting angry face, frowning eyebrows, cheeks puffed, arms crossed, a small red anger mark near her head.',
  dormilona: 'Curled up sleeping peacefully, eyes closed, small "Zz" above her head, cap slightly tilted.',
};

const ref = new Blob([readFileSync(new URL('referencia.webp', OUT))], { type: 'image/webp' });
const want = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(POSES).filter(m => !existsSync(new URL(m + '.webp', HD)));

for (const m of want) {
  if (!POSES[m]) { console.error('Pose desconocida:', m); continue; }
  const fd = new FormData();
  fd.append('model', MODEL);
  fd.append('image', ref, 'referencia.webp');
  fd.append('prompt', BASE + '\nPose: ' + POSES[m]);
  fd.append('size', '1024x1024');
  fd.append('quality', 'high');
  fd.append('input_fidelity', 'high');
  fd.append('background', 'transparent');
  fd.append('output_format', 'webp');
  fd.append('output_compression', '85');
  process.stdout.write(`${m}… `);
  const r = await fetch('https://api.openai.com/v1/images/edits', { method: 'POST', headers: { Authorization: 'Bearer ' + KEY }, body: fd });
  const j = await r.json();
  if (!r.ok) { console.error('error:', j.error?.message || r.status); continue; }
  writeFileSync(new URL(m + '.webp', HD), Buffer.from(j.data[0].b64_json, 'base64'));
  console.log('ok');
}
