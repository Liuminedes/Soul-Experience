/* Club Soul — Pasaporte de Sabores + trivia "Tu café ideal" */
const CK = 'soul_club_v1';
const PROFILES = {
  espresso: { icon: '⚡', name: 'Alma Espresso', text: 'Directo, intenso y sin vueltas. Tú vienes por el café de verdad.', drinks: ['Espresso Doble', 'Americano'] },
  cremoso: { icon: '🫶', name: 'Alma Cremosa', text: 'Suave, cálido y acogedor. Eres de las charlas largas.', drinks: ['Flat White', 'Latte'] },
  dulce: { icon: '🍫', name: 'Alma Dulce', text: 'Vives por el chocolate y los antojos bien hechos.', drinks: ['Mocaccino', 'Frappé Nutella'] },
  explorer: { icon: '🧭', name: 'Alma Exploradora', text: 'Siempre pruebas lo diferente. Lo nuestro es tu terreno.', drinks: ['Café Soul House "Maracuyá"', 'Capuchino Soul Guanábana'] },
  zen: { icon: '🍃', name: 'Alma Zen', text: 'Para ti tomar algo es un ritual. Calma y especias.', drinks: ['Matcha', 'Leche Dorada'] },
  fresh: { icon: '🍋', name: 'Alma Fresca', text: 'Luz, hielo y buena energía. Tú eres el plan de la tarde.', drinks: ['Limonada De Coco', 'Café Soul Frío'] }
};
const QUIZ = [
  { q: '¿Cómo arranca tu día ideal?', a: [['😶 Sin hablar hasta el primer sorbo', 'espresso'], ['🛋️ Con calma y buena charla', 'cremoso'], ['🎲 Probando algo nuevo', 'explorer'], ['🧘 Con un ritual tranquilo', 'zen']] },
  { q: '¿Qué plan te late más?', a: [['📖 Un libro y silencio', 'zen'], ['🍰 Postre para compartir', 'dulce'], ['☀️ Terraza y sol', 'fresh'], ['🗺️ Descubrir un sitio nuevo', 'explorer']] },
  { q: '¿Qué sabor te llama?', a: [['🖤 Intenso y amargo', 'espresso'], ['🍫 Chocolate y dulce', 'dulce'], ['🥭 Frutal y tropical', 'explorer'], ['🌶️ Especiado y cálido', 'zen']] },
  { q: '¿Cómo la prefieres?', a: [['🔥 Bien caliente', 'espresso'], ['🥛 Cremosa y suave', 'cremoso'], ['🧊 Helada y fresca', 'fresh'], ['🍦 Batida y con topping', 'dulce']] },
  { q: 'En tu grupo de amigos eres…', a: [['⏰ El puntual y serio', 'espresso'], ['🤗 El que abraza', 'cremoso'], ['📣 El que propone planes', 'explorer'], ['😂 El que se ríe de todo', 'fresh']] }
];

const club = (() => { try { return JSON.parse(localStorage.getItem(CK)) || {}; } catch (e) { return {}; } })();
const clubSave = () => { try { localStorage.setItem(CK, JSON.stringify(club)); } catch (e) {} };
const clubApi = (API_URL || '') + '/api/club/join';
let qi = 0, score = {};

const _go = go;
go = v => { _go(v); if (v === 'club') renderClub(); if (v !== 'game') stopGame(); if (['landing', 'menu', 'club', 'game'].includes(v)) document.body.style.background = v === 'club' || v === 'game' ? '#2c1e16' : '#1b1410'; };

/* ═══════ Vida: partículas, mascota, confeti ═══════ */
const rnd = (a, b) => a + Math.random() * (b - a);
['fx', 'fx2'].forEach(id => { $(id).innerHTML = Array.from({ length: 16 }, (_, i) =>
  `<span style="--x:${rnd(2, 96)}%;--s:${rnd(14, 30)}px;--d:${rnd(9, 18)}s;--dl:${-rnd(0, 14)}s;--r:${rnd(-200, 200)}deg">${['☕', '✦', '🍪', '🍫', '✦', '🫘'][i % 6]}</span>`).join(''); });

// los ojos de Soulito siguen el dedo/puntero
document.addEventListener('pointermove', e => {
  document.querySelectorAll('.mascot').forEach(m => {
    const r = m.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2), d = Math.hypot(dx, dy) || 1;
    m.style.setProperty('--px', dx / d); m.style.setProperty('--py', dy / d);
  });
});

const PHRASES = ['¡Hola! 👋', '¿Un flat white? ☕', 'Juega y gana sellos ✦', '¿Ya probaste la pizza? 🍕', 'Hoy toca algo nuevo 🍋', '¡Eres Soul! 💛'];
let ph = 0;
setInterval(() => { const b = $('bubble'); if (!b) return; ph = (ph + 1) % PHRASES.length; b.textContent = PHRASES[ph]; b.style.animation = 'none'; void b.offsetWidth; b.style.animation = ''; }, 3500);

function confetti() {
  const f = document.createDocumentFragment();
  for (let i = 0; i < 44; i++) {
    const s = document.createElement('i'); s.className = 'confetti';
    s.style.cssText = `--c:${['#ff9a4d', '#ffcf8a', '#c8a87c', '#e0524a', '#4f9d4a'][i % 5]};--dx:${rnd(-170, 170)}px;--dy:${rnd(-260, 120)}px;--r:${rnd(-540, 540)}deg`;
    f.appendChild(s); setTimeout(() => s.remove(), 1400);
  }
  document.body.appendChild(f);
}

/* ═══════ Minijuego: Atrapa los granos (20 s) ═══════ */
let gt = null, gs = 0, gl = 0, gsp = null;
const GOAL = 12, GTIME = 20;
function stopGame() { clearInterval(gt); clearInterval(gsp); gt = gsp = null; }
function renderGameIntro() {
  $('gp-body').innerHTML = `<p class="club__label">Cómo se juega</p>
    <div class="game__rules">
      <span><svg viewBox="0 0 40 52"><use href="#bean"/></svg> +1</span>
      <span><svg viewBox="0 0 40 52"><use href="#bean-gold"/></svg> +3</span>
      <span><svg viewBox="0 0 40 52"><use href="#bean-bad"/></svg> −2</span>
    </div>
    <p class="club__muted">${GTIME} segundos. Llega a ${GOAL} puntos y gana un sello.${club.game ? ' <b>Mejor marca: ' + club.best + '</b>' : ''}</p>
    <button class="club__btn club__btn--play" onclick="startGame()">¡Jugar!</button>`;
}
function startGame() {
  stopGame(); gs = 0; gl = GTIME;
  $('gp-body').innerHTML = `<div class="game__hud"><span class="pill">⏱ <b id="g-t">${GTIME}</b>s</span><span class="pill pill--score"><b id="g-s">0</b> / ${GOAL}</span></div>
    <div class="game__timer"><i id="g-bar"></i></div>
    <div class="game__area" id="g-area"><svg class="game__catch" id="g-cup" viewBox="0 0 80 60"><use href="#cup"/></svg></div>`;
  requestAnimationFrame(() => { $('g-bar').style.transition = `width ${GTIME}s linear`; $('g-bar').style.width = '0%'; });
  const area = $('g-area');
  const spawn = () => {
    const r = Math.random(), kind = r < .18 ? 'bad' : r < .26 ? 'gold' : 'ok', pts = { bad: -2, gold: 3, ok: 1 }[kind];
    const b = document.createElement('span');
    b.className = 'bean bean--' + kind;
    b.innerHTML = `<svg viewBox="0 0 40 52"><use href="#bean${kind === 'ok' ? '' : '-' + kind}"/></svg>`;
    b.style.cssText = `--x:${rnd(2, 80)}%;--d:${rnd(1.7, 2.8)}s;--r:${rnd(-120, 120)}deg;--h:${area.clientHeight}px`;
    b.onpointerdown = e => {
      if (b.classList.contains('hit')) return;
      b.classList.add('hit'); gs = Math.max(0, gs + pts); $('g-s').textContent = gs;
      const p = document.createElement('i'), ar = area.getBoundingClientRect(), br = b.getBoundingClientRect();
      p.className = 'score-pop' + (pts < 0 ? ' neg' : ''); p.textContent = (pts > 0 ? '+' : '−') + Math.abs(pts);
      p.style.cssText = `left:${br.left - ar.left + 6}px;top:${br.top - ar.top}px`;
      area.appendChild(p); setTimeout(() => p.remove(), 700);
      const cup = $('g-cup'); cup.classList.remove('bump'); void cup.getBoundingClientRect(); cup.classList.add('bump');
      if (pts < 0 && navigator.vibrate) navigator.vibrate(60);
      setTimeout(() => b.remove(), 300);
    };
    area.appendChild(b); setTimeout(() => b.remove(), 3000);
  };
  gsp = setInterval(spawn, 480); spawn();
  gt = setInterval(() => { gl--; $('g-t').textContent = gl; if (gl <= 0) endGame(); }, 1000);
}
function endGame() {
  stopGame();
  const won = gs >= GOAL, first = won && !club.game, stars = gs >= 22 ? 3 : gs >= GOAL ? 2 : gs >= 6 ? 1 : 0;
  club.best = Math.max(club.best || 0, gs);
  club.plays = (club.plays || 0) + 1;
  club.hist = [gs, ...(club.hist || [])].slice(0, 20);
  if (won) club.game = true;
  clubSave(); gpStats();
  $('gp-body').innerHTML = `<div class="game__end"><div class="game__stars">${[0, 1, 2].map(i => `<span class="${i < stars ? 'on' : ''}" style="--i:${i}">★</span>`).join('')}</div>
    <div class="game__big">${gs}</div><p class="club__label">puntos</p>
    <p>${won ? (first ? '¡Sello conseguido! ✦' : '¡Gran partida!') : `Casi… necesitas ${GOAL} para el sello.`}</p>
    <button class="club__btn club__btn--play" onclick="startGame()">Jugar otra vez</button></div>`;
  if (first) { confetti(); toast('¡Nuevo sello! ✦'); renderPassport(); }
}

/* menú: "Soulito sugiere" (producto al azar) */
const _sh = showHome;
showHome = () => { _sh(); suggest(); };
function suggest() {
  const all = D.flatMap(c => c.items.map(i => [c, i])).filter(([c]) => !c.isPizza);
  if (!all.length) return;
  const [c, i] = all[Math.floor(Math.random() * all.length)];
  $('suggest').innerHTML = `<svg class="mascot" viewBox="0 0 100 120"><use href="#soulito"/></svg>
    <div class="suggest__t"><span class="club__label">Soulito sugiere hoy</span>
      <b>${i.name}</b><small>${c.icon} ${c.name} · ${fmt(i.price)}</small></div>
    <div class="suggest__b"><button onclick="openProduct('${c.id}','${i.id}')">Ver</button><button onclick="suggest()" aria-label="Otra sugerencia">🎲</button></div>`;
}

function sendMember() {
  if (!club.nick) return;
  fetch(clubApi, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nick: club.nick, whatsapp: club.whatsapp, birthday: club.birthday, profile: club.profile, consent: true })
  }).catch(() => {}); // sin red: queda guardado en el dispositivo
}

function renderClub() { renderPassport(); renderGames(); }

/* ═══════ Selector de minijuegos + página dedicada ═══════ */
const GAMES = [
  { id: 'catch', name: 'Atrapa los granos', tag: 'Reflejos · 20 segundos', c: ['#ff9a4d', '#b8461b'], art: '<svg viewBox="0 0 40 52"><use href="#bean-gold"/></svg>', rec: () => club.best ? `🏆 ${club.best}` : 'Nuevo' },
  { id: 'quiz', name: 'Tu café ideal', tag: 'Trivia · 5 preguntas', c: ['#d78bff', '#6a2fa8'], art: '<span>☕</span>', rec: () => club.profile ? PROFILES[club.profile].icon + ' ' + PROFILES[club.profile].name.replace('Alma ', '') : 'Nuevo' },
  { id: 'soon', name: 'Memoria Soul', tag: 'Cartas · muy pronto', c: ['#4dd6c1', '#13705f'], art: '<span>🃏</span>', soon: true }
];
function renderGames() {
  $('club-games').innerHTML = GAMES.map((g, i) => `<button class="gcard${g.soon ? ' gcard--soon' : ''}" style="--c1:${g.c[0]};--c2:${g.c[1]};--i:${i}" ${g.soon ? 'disabled' : `onclick="openGame('${g.id}')"`}>
    <div class="gcard__art">${g.art}</div><div class="gcard__t"><b>${g.name}</b><small>${g.tag}</small></div>
    <span class="gcard__rec">${g.soon ? '🔒' : g.rec()}</span></button>`).join('');
}
let curGame = null;
function openGame(id) {
  const g = GAMES.find(x => x.id === id); curGame = id;
  go('game');
  $('game-page').style.cssText = `--c1:${g.c[0]};--c2:${g.c[1]}`;
  $('gp-hero').innerHTML = `<div class="gp__art">${g.art}</div><div><p class="club__label" style="color:#fff;opacity:.8">${g.tag}</p><h1>${g.name}</h1></div>`;
  gpStats();
  if (id === 'catch') renderGameIntro(); else restartQuiz();
}
function gpStats() {
  const tile = (n, l) => `<div class="gp__tile"><b>${n}</b><span>${l}</span></div>`;
  let h = '';
  if (curGame === 'catch') {
    const top = [...(club.hist || [])].sort((a, b) => b - a).slice(0, 5);
    h = `<div class="gp__stats">${tile(club.best || '—', 'Récord')}${tile(club.plays || 0, 'Partidas')}${tile(club.game ? '✦' : '—', 'Sello')}</div>` +
      (top.length ? `<div class="club__card gp__rank"><p class="club__label">Tus mejores partidas</p>${top.map((s, i) => `<div><span>${['🥇', '🥈', '🥉', '4', '5'][i]}</span><b>${s} pts</b></div>`).join('')}</div>` : '');
  } else {
    h = `<div class="gp__stats">${tile(club.profile ? PROFILES[club.profile].icon : '—', 'Tu perfil')}${tile(club.qplays || 0, 'Veces jugado')}${tile(club.profile ? '✦' : '—', 'Sello')}</div>`;
  }
  $('gp-stats').innerHTML = h;
}

function renderPassport() {
  const stamps = (club.nick ? 1 : 0) + (club.profile ? 1 : 0) + (club.game ? 1 : 0);
  const slots = Array.from({ length: 6 }, (_, i) => `<span class="stamp${i < stamps ? ' on' : ''}">${i < stamps ? '✦' : ''}</span>`).join('');
  $('club-passport').innerHTML = club.nick
    ? `<div class="club__card club__pass">
        <p class="club__label">Pasaporte Soul</p>
        <h3>${esc(club.nick)}</h3>
        <p class="club__muted">${club.profile ? PROFILES[club.profile].icon + ' ' + PROFILES[club.profile].name : 'Aún sin perfil: juega la trivia'}</p>
        <div class="stamps">${slots}</div>
        <p class="club__muted">${stamps} de 6 sellos · pronto: más juegos y premios</p>
      </div>`
    : `<form class="club__card" onsubmit="joinClub(event)">
        <p class="club__label">Crea tu pasaporte y recibe tu primer sello</p>
        <input id="cj-nick" placeholder="Tu nombre o apodo" maxlength="40" required>
        <input id="cj-wa" type="tel" inputmode="numeric" placeholder="WhatsApp (ej. 3203678524)" pattern="(57)?3[0-9]{9}" required>
        <label class="club__muted">Cumpleaños (opcional)<input id="cj-bd" type="date"></label>
        <label class="club__check"><input id="cj-ok" type="checkbox" required> Autorizo a Soul Experience a tratar mis datos para enviarme novedades y beneficios del Club (Ley 1581 de 2012).</label>
        <button class="club__btn">Obtener mi pasaporte</button>
      </form>`;
}

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

function joinClub(e) {
  e.preventDefault();
  club.nick = $('cj-nick').value.trim();
  club.whatsapp = $('cj-wa').value.replace(/\D/g, '');
  club.birthday = $('cj-bd').value;
  clubSave(); sendMember(); confetti(); toast('¡Primer sello conseguido! ✦'); renderPassport(); renderQuiz();
}

function renderQuiz() {
  const box = $('gp-body');
  box.classList.remove('swap'); void box.offsetWidth; box.classList.add('swap');
  if (qi >= QUIZ.length) {
    const key = Object.keys(score).sort((a, b) => score[b] - score[a])[0];
    const p = PROFILES[key];
    const wa = 'https://wa.me/?text=' + encodeURIComponent(`Soy ${p.name} ${p.icon} en Soul Experience. ¿Y tú? Descubre tu café ideal: ${location.origin}`);
    box.innerHTML = `<p class="club__label">Tu café ideal</p>
      <div class="club__result"><span>${p.icon}</span><h3>${p.name}</h3></div>
      <p>${p.text}</p>
      <p class="club__muted">Te recomendamos: <b>${p.drinks.join(' · ')}</b></p>
      ${club.nick ? '' : '<p class="club__muted">Crea tu pasaporte arriba para guardar este sello.</p>'}
      <a class="club__btn" href="${wa}" target="_blank">Compartir mi resultado</a>
      <button class="club__btn club__btn--ghost" onclick="restartQuiz()">Repetir</button>`;
    return;
  }
  const s = QUIZ[qi];
  box.innerHTML = `<p class="club__label">Trivia · Tu café ideal · ${qi + 1} de ${QUIZ.length}</p>
    <div class="club__prog"><i style="width:${qi / QUIZ.length * 100}%"></i></div>
    <h3>${s.q}</h3>
    ${s.a.map(([t, k]) => `<button class="club__opt" onclick="answerQuiz('${k}')">${t}</button>`).join('')}`;
}

function answerQuiz(k) {
  score[k] = (score[k] || 0) + 1;
  qi++;
  if (qi >= QUIZ.length) {
    const first = !club.profile;
    club.profile = Object.keys(score).sort((a, b) => score[b] - score[a])[0];
    club.qplays = (club.qplays || 0) + 1;
    clubSave(); sendMember(); confetti(); gpStats();
    if (club.nick && first) { toast('¡Nuevo sello! ✦'); renderPassport(); }
  }
  renderQuiz();
}

function restartQuiz() { qi = 0; score = {}; renderQuiz(); }
