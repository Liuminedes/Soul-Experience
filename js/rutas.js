/* Rutas: cada pantalla tiene su URL (/, /menu, /menu/<categoría>, /redes) y el botón de atrás del celular regresa paso a paso.
   La URL de una categoría sale de su campo "slug" (lo guarda el admin) o, si no lo tiene, de su nombre: "Bebidas Frías" → bebidas-frias.
   Va después de vida.js: envuelve las funciones ya envueltas allí. */
const slugify = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const catSlug = c => c.slug || slugify(c.name);
const BASE_TITLE = document.title;

let routing = true;   // mientras arranca la página nada escribe en el historial
let menuReady = false; // el menú del servidor ya llegó (una categoría recién creada puede no estar en la caché)
const silent = f => { const r = routing; routing = true; try { f(); } finally { routing = r; } };

// avanzar: nueva entrada en el historial
function nav(path, state = {}) {
  if (routing) return;
  if (location.pathname !== path || state.modal) history.pushState({ prev: location.pathname, ...state }, '', path);
  setTitle();
}
// volver a la pantalla padre: si venimos de ella es un "atrás" de verdad; si se entró directo por link, se reemplaza
function up(path) {
  if (routing) return;
  if (history.state && history.state.prev === path) history.back();
  else { history.replaceState(null, '', path); route(); }
}

function setTitle() {
  const p = location.pathname.replace(/\/+$/, '') || '/', s = p.split('/')[2];
  const c = s && D.find(x => catSlug(x) === decodeURIComponent(s));
  document.title = c ? `${c.name} · Soul Experience` : p === '/menu' ? 'Menú · Soul Experience' : p === '/redes' ? 'Redes · Soul Experience' : BASE_TITLE;
}

function route() {
  const p = location.pathname.replace(/\/+$/, '') || '/';
  const on = id => $(id).classList.contains('active') || $(id).classList.contains('open');
  silent(() => {
    if (!(history.state && history.state.modal) && on('product-modal')) closeProduct();
    if (p !== '/redes' && on('social-modal')) closeSocials();
    if (p === '/' || p === '/redes') {
      if (!on('view-landing')) go('landing');
      if (p === '/redes' && !on('social-modal')) openSocials();
    } else if (p === '/menu' || p.startsWith('/menu/')) {
      if (!on('view-menu')) go('menu');
      const s = p.split('/')[2];
      const c = s && D.find(x => catSlug(x) === decodeURIComponent(s));
      if (c) { if (curCat !== c.id) openCat(c.id); }
      else if (s && menuReady) { history.replaceState(history.state, '', '/menu'); if (curCat) backToHome(); } // categoría que no existe → menú
      else if (!s && curCat) backToHome();
      // si s no está aún y el menú no ha llegado, se reintenta al llegar (ver syncMenuFromApi)
    } else { history.replaceState(null, '', '/'); if (!on('view-landing')) go('landing'); }
  });
  setTitle();
}
addEventListener('popstate', route);

const _goR = go;
go = v => { _goR(v); if (v === 'menu') nav('/menu'); else if (v === 'landing') up('/'); };
const _ocR = openCat;
openCat = id => { _ocR(id); const c = D.find(x => x.id === id); if (c) nav('/menu/' + catSlug(c)); };
const _bhR = backToHome;
backToHome = () => { _bhR(); up('/menu'); };
const _osR = openSocials;
openSocials = () => { _osR(); nav('/redes'); };
const _csR = closeSocials;
closeSocials = () => { const was = $('social-modal').classList.contains('open'); _csR(); if (was) up('/'); };
// el producto no tiene URL propia, pero sí una entrada en el historial: atrás lo cierra y te deja en la categoría
const _opR = openProduct;
openProduct = (c, i) => { _opR(c, i); nav(location.pathname, { modal: 1 }); };
const _cpR = closeProduct;
closeProduct = () => { const was = $('product-modal').classList.contains('open'); _cpR(); if (was && !routing && history.state && history.state.modal) history.back(); };

const _syncR = syncMenuFromApi;
syncMenuFromApi = async () => { await _syncR(); menuReady = true; route(); };

// corre después del arranque de app.js (que muestra el inicio): ahora se abre la pantalla que pide la URL
document.addEventListener('DOMContentLoaded', () => { routing = false; if (history.state && history.state.modal) history.replaceState({ prev: history.state.prev }, '', location.pathname); route(); });
