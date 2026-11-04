/* Vida del sitio: partículas, mascota, confeti, sugerencias y enlaces al Club y a opiniones */
const CLUB_URL = 'https://soulexp-geniuslink.pages.dev/#club', OPINIONES_URL = 'https://soulexp-geniuslink.pages.dev/#opiniones';

const _go = go;
go = v => { _go(v); $('buddy').classList.toggle('on', v === 'menu'); if (v === 'menu') { say('¡Hola! Te acompaño 🐾', 'saluda'); invites(); } if (v === 'landing' || v === 'menu') document.body.style.background = '#F5EBDD'; };

/* ═══════ Vida: partículas, mascota, confeti ═══════ */
const rnd = (a, b) => a + Math.random() * (b - a);
['fx', 'fx2'].forEach(id => { $(id).innerHTML = Array.from({ length: 16 }, (_, i) =>
  `<span style="--x:${rnd(2, 96)}%;--s:${rnd(14, 30)}px;--d:${rnd(9, 18)}s;--dl:${-rnd(0, 14)}s;--r:${rnd(-200, 200)}deg">${['☕', '✦', '🍪', '🍫', '✦', '🫘'][i % 6]}</span>`).join('') +
  Array.from({ length: 14 }, () => `<b class="tw" style="left:${rnd(3, 95)}%;top:${rnd(3, 95)}%;--s:${rnd(8, 18)}px;--d:${rnd(1.8, 3.6)}s;--dl:${-rnd(0, 3)}s">✦</b>`).join(''); });

const PHRASES = [['¡Hola! 👋', 'saluda'], ['¿Un flat white? ☕', 'curiosa'], ['Únete al Club Soul ✦', 'traviesa'], ['¿Ya probaste la pizza? 🍕', 'lentes'], ['Hoy toca algo nuevo 🍋', 'sorprendida'], ['¡Eres Soul! 💛', 'celebra']];
let ph = 0;
setInterval(() => {
  const b = $('bubble'); if (!b) return;
  ph = (ph + 1) % PHRASES.length; b.textContent = PHRASES[ph][0]; b.style.animation = 'none'; void b.offsetWidth; b.style.animation = '';
  const m = b.nextElementSibling; m.dataset.base = m.dataset.mood = PHRASES[ph][1];
}, 3500);

function confetti() {
  const f = document.createDocumentFragment();
  for (let i = 0; i < 44; i++) {
    const s = document.createElement('i'); s.className = 'confetti';
    s.style.cssText = `--c:${['#ff9a4d', '#ffcf8a', '#c8a87c', '#e0524a', '#4f9d4a'][i % 5]};--dx:${rnd(-170, 170)}px;--dy:${rnd(-260, 120)}px;--r:${rnd(-540, 540)}deg`;
    f.appendChild(s); setTimeout(() => s.remove(), 1400);
  }
  document.body.appendChild(f);
}

/* menú: "Soul sugiere" (producto al azar) */
const _sh = showHome;
showHome = () => { _sh(); suggest(); };
function suggest() {
  const all = D.flatMap(c => c.items.map(i => [c, i])).filter(([c]) => !c.isPizza);
  if (!all.length) return;
  const [c, i] = all[Math.floor(Math.random() * all.length)];
  $('suggest').innerHTML = `<i class="mascot" data-mood="curiosa"></i>
    <div class="suggest__t"><span class="club__label">Soul sugiere hoy</span>
      <b>${i.name}</b><small>${c.icon} ${c.name} · ${fmt(i.price)}</small></div>
    <div class="suggest__b"><button onclick="openProduct('${c.id}','${i.id}')">Ver</button><button onclick="suggest()" aria-label="Otra sugerencia">🎲</button></div>`;
}

/* ═══════ Compañera del menú: reacciona a lo que haces ═══════ */
// href: la burbuja se vuelve enlace mientras se muestra
function say(t, m, ms = 2600, href) {
  const b = $('buddy-say');
  b.textContent = t; if (href) b.href = href; else b.removeAttribute('href'); b.style.animation = 'none'; void b.offsetWidth; b.style.animation = '';
  clearTimeout(say.t); say.t = setTimeout(() => { b.textContent = ''; b.removeAttribute('href'); }, ms);
  mood(m, ms); wake();
}
const _oc = openCat;
openCat = id => { _oc(id); const c = D.find(x => x.id === id); if (c) say(`¡Mmm, ${c.name.toLowerCase()}! ${c.icon}`, 'curiosa'); };
const _bh = backToHome;
backToHome = () => { _bh(); say('¿Qué más se te antoja?', 'feliz'); };
const _op = openProduct;
openProduct = (c, i) => { _op(c, i); say('Déjame ver de cerca… 🧐', 'lentes', 3000); };
document.addEventListener('click', e => { if (e.target.closest('.pm__wa')) { say('¡Buena elección! 💛', 'celebra', 3000); confetti(); } });

// sin actividad 25 s en el menú: se duerme; al volver, despierta
let idle;
function wake() {
  const m = document.querySelector('#buddy .mascot');
  if (m.dataset.mood === 'dormilona') return say('¡Ya desperté! 😺', 'sorprendida');
  clearTimeout(idle);
  idle = setTimeout(() => { if ($('buddy').classList.contains('on')) { m.dataset.mood = 'dormilona'; $('buddy-say').textContent = ''; } }, 25000);
}
['pointerdown', 'scroll', 'keydown'].forEach(ev => addEventListener(ev, wake, { passive: true }));

// invitaciones de la mascota, una vez por visita: al Club tras explorar un rato y a opinar cuando ya lleva tiempo en la mesa
let invited = false;
function invites() {
  if (invited) return; invited = true;
  setTimeout(() => $('buddy').classList.contains('on') && say('¿Ya eres del Club Soul? ✦ Toca aquí', 'traviesa', 8000, CLUB_URL), 90000);
  setTimeout(() => $('buddy').classList.contains('on') && say('¿Qué tal todo? Cuéntanos 💛', 'curiosa', 10000, OPINIONES_URL), 240000);
}

// al llegar al pie del menú se aparta para no tapar el botón de WhatsApp
new IntersectionObserver(([e]) => $('buddy').classList.toggle('away', e.isIntersecting)).observe(document.querySelector('.contact__wa'));
