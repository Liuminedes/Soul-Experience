/* Mascota Soul: gata carey (dibujo aprobado por la clienta). <i class="mascot" data-mood="…"></i>
   Gestos (data-mood) = imágenes en assets/mascota/<gesto>.webp, generadas con tools/gen-mascota.mjs:
   feliz, saluda, celebra, curiosa, lentes, traviesa, sorprendida, enojadita, dormilona. */
const MOODS = ['feliz', 'saluda', 'celebra', 'curiosa', 'lentes', 'traviesa', 'sorprendida', 'enojadita', 'dormilona'];

// precarga para que el cambio de gesto no parpadee
addEventListener('load', () => MOODS.forEach(m => { new Image().src = new URL(`assets/mascota/${m}.webp`, location.href).href; }));

// gesto temporal en todas las mascotas; cada una vuelve a su gesto base (data-base) pasados ms
function mood(m, ms = 1400) {
  document.querySelectorAll('.mascot').forEach(el => {
    if (!el.dataset.base) el.dataset.base = el.dataset.mood || 'feliz';
    el.dataset.mood = m; clearTimeout(el._t); el._t = setTimeout(() => el.dataset.mood = el.dataset.base, ms);
  });
}

// tocarla: reacción al azar
document.addEventListener('click', e => {
  if (e.target.closest('.mascot')) mood(['sorprendida', 'saluda', 'traviesa', 'celebra'][Math.floor(Math.random() * 4)], 1600);
});
