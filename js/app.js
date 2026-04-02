/* ═══════════════════════════════════════════════════════
   Soul Experience — Digital Menu
   Main JavaScript
   ═══════════════════════════════════════════════════════ */

/* ─── Config ─── */
const PW = 'soul2024';
const SK = 'soul_menu_v4';

/* ─── Default Data ─── */
const DEFS = [
  { id:'cafe', name:'Café & Infusiones', icon:'☕', items:[
    { id:'c1', name:'Espresso', price:4500, desc:'Shot clásico de café colombiano', tags:[] },
    { id:'c2', name:'Americano', price:5000, desc:'Espresso con agua caliente', tags:[] },
    { id:'c3', name:'Cappuccino', price:7500, desc:'Espresso, leche vaporizada y espuma', tags:[] },
    { id:'c4', name:'Latte', price:7500, desc:'Espresso con leche cremosa', tags:[] },
    { id:'c5', name:'Mocaccino', price:8500, desc:'Espresso, chocolate y leche', tags:[] },
    { id:'c6', name:'Infusión de hierbas', price:5500, desc:'Selección de infusiones naturales', tags:['vegano','sin gluten'] },
    { id:'c7', name:'Chai Latte', price:8000, desc:'Té chai especiado con leche', tags:[] },
    { id:'c8', name:'Chocolate de mesa', price:6500, desc:'Chocolate tradicional colombiano', tags:[] },
  ]},
  { id:'cacao', name:'Cacao & Bebidas Especiales', icon:'🍫', items:[
    { id:'ca1', name:'Cacao ceremonial', price:12000, desc:'Cacao 100% orgánico de origen', tags:['vegano','sin gluten','sin azúcar'] },
    { id:'ca2', name:'Cacao con especias', price:10000, desc:'Cacao con canela y cardamomo', tags:['vegano'] },
    { id:'ca3', name:'Smoothie de cacao', price:11000, desc:'Cacao, banana y leche vegetal', tags:['vegano','sin gluten'] },
    { id:'ca4', name:'Malteada especial', price:12000, desc:'Malteada artesanal de la casa', tags:[] },
  ]},
  { id:'pizza', name:'Pizzas Artesanales', icon:'🍕', items:[
    { id:'p1', name:'Margarita', price:18000, desc:'Tomate, mozzarella y albahaca', tags:[] },
    { id:'p2', name:'Hawaiana', price:20000, desc:'Jamón, piña y mozzarella', tags:[] },
    { id:'p3', name:'Vegetariana', price:20000, desc:'Champiñones, pimentón, cebolla y aceitunas', tags:['vegano'] },
    { id:'p4', name:'BBQ Chicken', price:22000, desc:'Pollo, salsa BBQ y cebolla caramelizada', tags:[] },
    { id:'p5', name:'Pizza sin gluten', price:22000, desc:'Masa especial sin gluten, toppings a elección', tags:['sin gluten'] },
  ]},
  { id:'cervezas', name:'Cervezas', icon:'🍺', items:[
    { id:'b1', name:'Cerveza artesanal local', price:9000, desc:'Selección rotativa de cervecerías locales', tags:[] },
    { id:'b2', name:'IPA artesanal', price:12000, desc:'India Pale Ale de cuerpo intenso', tags:[] },
    { id:'b3', name:'Cerveza importada', price:14000, desc:'Selección premium importada', tags:[] },
    { id:'b4', name:'Cerveza sin gluten', price:12000, desc:'Opción artesanal libre de gluten', tags:['sin gluten'] },
  ]},
  { id:'postres', name:'Postres & Snacks', icon:'🍰', items:[
    { id:'d1', name:'Brownie de cacao', price:7000, desc:'Brownie artesanal con cacao de origen', tags:[] },
    { id:'d2', name:'Cheesecake vegano', price:9000, desc:'Base de frutos secos, topping de frutos rojos', tags:['vegano','sin gluten','sin azúcar'] },
    { id:'d3', name:'Galletas artesanales', price:4000, desc:'Variedad de galletas horneadas del día', tags:[] },
    { id:'d4', name:'Torta del día', price:8000, desc:'Pregunta por la opción del día', tags:[] },
  ]},
];

/* ─── State ─── */
let D = [];
let curCat = null;
let dTag = null;

/* ─── Helpers ─── */
const $ = s => document.getElementById(s);
const uid = () => Math.random().toString(36).slice(2, 8);
const fmt = n => new Intl.NumberFormat('es-CO', { style:'currency', currency:'COP', minimumFractionDigits:0 }).format(n);
const save = () => { try { localStorage.setItem(SK, JSON.stringify(D)); } catch(e) {} };
const load = () => {
  try {
    const r = localStorage.getItem(SK);
    if (r) { const p = JSON.parse(r); if (Array.isArray(p) && p.length) return p; }
  } catch(e) {}
  return JSON.parse(JSON.stringify(DEFS));
};

function toast(m) {
  const t = $('toast');
  t.textContent = m;
  t.style.display = 'block';
  setTimeout(() => t.style.display = 'none', 2600);
}


/* ═══════════════════════════════════════════════════════
   VIEW MANAGEMENT
   ═══════════════════════════════════════════════════════ */
function go(v) {
  document.querySelectorAll('.view').forEach(e => e.classList.remove('active'));
  $('view-' + v).classList.add('active');
  window.scrollTo(0, 0);

  if (v === 'landing') {
    document.body.style.background = '#2c1e16';
  } else if (v === 'menu') {
    document.body.style.background = '#f7f2eb';
    curCat = null; dTag = null;
    showHome();
  } else if (v === 'login') {
    document.body.style.background = '#2c1e16';
    $('lp').value = '';
    $('le').style.display = 'none';
    $('lp').classList.remove('err', 'shk');
  } else if (v === 'admin') {
    document.body.style.background = '#2c1e16';
    renderAdmin();
  }
}


/* ═══════════════════════════════════════════════════════
   SOCIAL MODAL
   ═══════════════════════════════════════════════════════ */
function openSocials() {
  $('social-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSocials() {
  $('social-modal').classList.remove('open');
  document.body.style.overflow = '';
}
// Close on overlay click
document.addEventListener('click', e => {
  if (e.target.id === 'social-modal') closeSocials();
});
// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSocials();
});


/* ═══════════════════════════════════════════════════════
   LOGIN
   ═══════════════════════════════════════════════════════ */
function tryLogin() {
  const i = $('lp');
  if (i.value === PW) { go('admin'); }
  else {
    $('le').style.display = 'block';
    i.classList.add('err', 'shk');
    setTimeout(() => i.classList.remove('shk'), 500);
  }
}
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && $('view-login').classList.contains('active')) tryLogin();
});


/* ═══════════════════════════════════════════════════════
   MENU — HOME (category cards)
   ═══════════════════════════════════════════════════════ */
function showHome() {
  $('home-screen').style.display = 'block';
  $('detail-screen').style.display = 'none';
  renderCatCards();
}

function renderCatCards() {
  let h = '';
  D.forEach((c, i) => {
    const ci = i % 8;
    const parts = c.name.includes('&') ? c.name.split('&') : c.name.includes(' y ') ? c.name.split(/ y (.+)/) : [c.name];
    const main = parts[0].trim().toUpperCase();
    const sub = parts[1] ? parts[1].trim().toUpperCase() : '';
    h += `<div class="cat-card cat-card--${ci}" onclick="openCat('${c.id}')" style="animation:rise 0.5s var(--ease) ${i * 0.07}s both">
      <div class="cat-card__bg"></div>
      <span class="cat-card__emoji">${c.icon}</span>
      <div class="cat-card__text">
        <div class="cat-card__title">${main}</div>
        ${sub ? `<div class="cat-card__sub">${sub}</div>` : ''}
        <div class="cat-card__count">${c.items.length} producto${c.items.length !== 1 ? 's' : ''}</div>
      </div>
    </div>`;
  });
  $('cat-cards').innerHTML = h;
}


/* ═══════════════════════════════════════════════════════
   MENU — DETAIL (items)
   ═══════════════════════════════════════════════════════ */
function openCat(id) {
  curCat = id; dTag = null;
  $('home-screen').style.display = 'none';
  $('detail-screen').style.display = 'block';
  window.scrollTo(0, 0);
  renderDetail();
}
function backToHome() { curCat = null; dTag = null; showHome(); window.scrollTo(0, 0); }

function renderDetail() {
  const c = D.find(x => x.id === curCat);
  if (!c) return backToHome();

  $('detail-head').innerHTML = `
    <div class="detail__head">
      <span class="detail__icon">${c.icon}</span>
      <div>
        <div class="detail__title">${c.name}</div>
        <div class="detail__line"></div>
      </div>
    </div>`;

  const allT = new Set();
  c.items.forEach(i => (i.tags || []).forEach(t => allT.add(t)));
  if (allT.size) {
    $('detail-tags').innerHTML = `<div class="detail__tags">${[...allT].map(t =>
      `<button class="dtag ${dTag === t ? 'on' : ''}" data-t="${t}" onclick="dTag=dTag==='${t}'?null:'${t}';renderDetail()">${t}</button>`
    ).join('')}</div>`;
  } else $('detail-tags').innerHTML = '';

  const items = c.items.filter(i => !dTag || (i.tags || []).includes(dTag));
  if (!items.length) {
    $('detail-items').innerHTML = `<div class="icard__empty"><h3>Sin productos con este filtro</h3><button onclick="dTag=null;renderDetail()">Ver todos</button></div>`;
    return;
  }
  let h = '';
  items.forEach((i, x) => {
    const tgs = (i.tags || []).map(t => `<span class="icard__tag" data-t="${t}">${t}</span>`).join('');
    h += `<div class="icard" style="animation:rise 0.45s var(--ease) ${x * 0.04}s both">
      <div class="icard__left">
        <div class="icard__name">${i.name}</div>
        ${i.desc ? `<p class="icard__desc">${i.desc}</p>` : ''}
        ${tgs ? `<div class="icard__tags">${tgs}</div>` : ''}
      </div>
      <div class="icard__price">${fmt(i.price)}</div>
    </div>`;
  });
  $('detail-items').innerHTML = h;
}


/* ═══════════════════════════════════════════════════════
   ADMIN PANEL
   ═══════════════════════════════════════════════════════ */
const EJ = ['☕','🍫','🍕','🍺','🍰','🥤','🧁','🥗','🍵','🍷','🥐','🧇','🫖','🧃'];
const IE = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
const IX = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>`;
const IP = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;

function renderAdmin() {
  const tot = D.reduce((a, c) => a + c.items.length, 0);
  let h = `<div class="stats"><div class="stat"><div class="stat__n">${D.length}</div><div class="stat__l">Categorías</div></div><div class="stat"><div class="stat__n">${tot}</div><div class="stat__l">Productos</div></div></div>`;

  D.forEach(c => {
    h += `<div class="ac" id="ac-${c.id}"><div class="ac__h"><div class="ac__hl"><span class="ac__ic">${c.icon}</span><span class="ac__nm">${c.name}</span><span class="ac__ct">${c.items.length}</span></div><div class="ac__btns"><button class="ib" onclick="ecF('${c.id}')">${IE}</button><button class="ib x" onclick="dc('${c.id}')">${IX}</button></div></div>`;
    c.items.forEach(i => {
      const tg = (i.tags || []).map(t => `<span class="ai__tg" data-t="${t}">${t}</span>`).join('');
      h += `<div class="ai" id="ai-${i.id}"><div class="ai__i"><div><span class="ai__n">${i.name}</span>${tg}</div><div class="ai__d">${i.desc || ''}</div></div><div class="ai__r"><span class="ai__p">${fmt(i.price)}</span><button class="ib" onclick="eiF('${c.id}','${i.id}')">${IE}</button><button class="ib x" onclick="di('${c.id}','${i.id}')">${IX}</button></div></div>`;
    });
    h += `<button class="addr" onclick="aiF('${c.id}')">${IP} Agregar producto</button></div>`;
  });
  h += `<button class="addc" onclick="acF()">${IP} Nueva categoría</button>`;
  $('ab').innerHTML = h;
}

/* ─── Category CRUD ─── */
function cfH(n, ic, sA, cA) {
  return `<div class="af"><div class="ejs">${EJ.map(e => `<button class="${e === ic ? 'on' : ''}" onclick="this.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('on'));this.classList.add('on');this.parentElement.dataset.s='${e}'">${e}</button>`).join('')}</div><div class="af__g"><input class="af__in" id="cn" value="${n}" placeholder="Nombre de categoría"/></div><div class="af__a"><button class="bs" onclick="${sA}">Guardar</button><button class="bc" onclick="${cA}">Cancelar</button></div></div>`;
}
function acF() {
  const b = document.querySelector('.addc'), w = document.createElement('div');
  w.className = 'ac'; w.id = 'ncf';
  w.innerHTML = cfH('', '☕', "aC()", "document.getElementById('ncf').remove();document.querySelector('.addc').style.display=''");
  b.before(w); b.style.display = 'none'; $('cn').focus();
}
function aC() {
  const n = $('cn').value.trim(), pk = document.querySelector('#ncf .ejs'), ic = pk.dataset.s || '☕';
  if (!n) return; D.push({ id: uid(), name: n, icon: ic, items: [] }); save(); toast('Categoría creada ✓'); renderAdmin();
}
function ecF(id) {
  const c = D.find(x => x.id === id), el = $('ac-' + id).querySelector('.ac__h');
  el.outerHTML = cfH(c.name, c.icon, `uC('${id}')`, 'renderAdmin()'); $('cn').focus();
}
function uC(id) {
  const n = $('cn').value.trim(), pk = document.querySelector('.ejs'), ic = pk.dataset.s || D.find(x => x.id === id).icon;
  if (!n) return; D = D.map(c => c.id === id ? { ...c, name: n, icon: ic } : c); save(); toast('Actualizada ✓'); renderAdmin();
}
function dc(id) {
  if (!confirm('¿Eliminar categoría y todos sus productos?')) return;
  D = D.filter(c => c.id !== id); save(); toast('Eliminada'); renderAdmin();
}

/* ─── Item CRUD ─── */
function ifH(n, p, d, tg, sA, cA) {
  const A = ['vegano', 'sin gluten', 'sin azúcar'];
  return `<div class="af"><div class="af__g duo"><input class="af__in" id="in" value="${n}" placeholder="Nombre del producto"/><input class="af__in" id="ip" value="${p}" placeholder="Precio" inputmode="numeric" oninput="this.value=this.value.replace(/\\D/g,'')"/></div><div class="af__g"><input class="af__in" id="id" value="${d}" placeholder="Descripción (opcional)"/></div><div class="af__tgs" id="itg">${A.map(t => `<button class="atg ${tg.includes(t) ? 'on' : ''}" data-t="${t}" onclick="this.classList.toggle('on')">${t}</button>`).join('')}</div><div class="af__a"><button class="bs" onclick="${sA}">Guardar</button><button class="bc" onclick="${cA}">Cancelar</button></div></div>`;
}
function gD() {
  const n = $('in').value.trim(), p = parseInt($('ip').value) || 0, d = $('id').value.trim(), tg = [];
  document.querySelectorAll('#itg .on').forEach(b => tg.push(b.dataset.t));
  return { name: n, price: p, desc: d, tags: tg };
}
function aiF(cid) {
  const cat = $('ac-' + cid), btn = cat.querySelector('.addr'), w = document.createElement('div');
  w.id = 'nif'; w.innerHTML = ifH('', '', '', [], "aI('" + cid + "')", "document.getElementById('nif').remove()");
  btn.before(w); $('in').focus();
}
function aI(cid) {
  const d = gD(); if (!d.name || !d.price) return;
  D.find(c => c.id === cid).items.push({ ...d, id: uid() }); save(); toast('Producto agregado ✓'); renderAdmin();
}
function eiF(cid, iid) {
  const c = D.find(x => x.id === cid), i = c.items.find(x => x.id === iid), el = $('ai-' + iid);
  el.outerHTML = `<div id="eif">${ifH(i.name, i.price, i.desc || '', i.tags || [], "uI('" + cid + "','" + iid + "')", 'renderAdmin()')}</div>`;
  $('in').focus();
}
function uI(cid, iid) {
  const d = gD(); if (!d.name || !d.price) return;
  D = D.map(c => c.id === cid ? { ...c, items: c.items.map(i => i.id === iid ? { ...i, ...d } : i) } : c);
  save(); toast('Actualizado ✓'); renderAdmin();
}
function di(cid, iid) {
  D = D.map(c => c.id === cid ? { ...c, items: c.items.filter(i => i.id !== iid) } : c);
  save(); toast('Eliminado'); renderAdmin();
}


/* ═══════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  D = load();
  // Start on landing
  go('landing');
  // Hide splash
  setTimeout(() => {
    const s = $('splash');
    s.classList.add('bye');
    setTimeout(() => s.remove(), 800);
  }, 1000);
});