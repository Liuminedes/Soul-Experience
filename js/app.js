/* ═══════════════════════════════════════════════════════
   Soul Experience — Digital Menu v5
   Real menu data + English + Product detail modal
   ═══════════════════════════════════════════════════════ */
const PW='soul2026',SK='soul_menu_v5';
const DEFS=[
{id:'hot',name:'Bebidas Calientes',nameEn:'Hot Drinks',icon:'☕',items:[
{id:'h1',name:'Espresso Sencillo',nameEn:'Single Espresso Shot',price:4000,desc:'Shot de café intenso',descEn:'Intense coffee shot',tags:[]},
{id:'h2',name:'Espresso Doble',nameEn:'Double Espresso Shot',price:6000,desc:'Doble carga de café intenso',descEn:'Double intense coffee shot',tags:[]},
{id:'h3',name:'Americano',nameEn:'Americano',price:5000,desc:'Café suave y equilibrado',descEn:'Smooth and balanced coffee',tags:[]},
{id:'h4',name:'Tinto Soul De Campo "Guayaba"',nameEn:'Guava Americano',price:5500,desc:'Café campesino con notas dulces de guayaba',descEn:'Country-style coffee with sweet guava notes',tags:[]},
{id:'h5',name:'Café Soul House "Maracuyá"',nameEn:'Passion Fruit Coffee',price:6500,desc:'Café con notas de maracuyá, panela y jengibre',descEn:'Coffee with passion fruit, panela and ginger notes',tags:[]},
{id:'h6',name:'Capuchino Soul Guanábana',nameEn:'Soursop Cappuccino',price:8000,desc:'Endulzado artesanalmente con panela, manzanilla y guanábana',descEn:'Artisan-sweetened with panela, chamomile and soursop',tags:[]},
{id:'h7',name:'Latte',nameEn:'Latte',price:7500,desc:'Café suave con leche cremosa',descEn:'Smooth coffee with creamy milk',tags:[]},
{id:'h8',name:'Flat White',nameEn:'Flat White',price:6500,desc:'Café mediano intenso con leche texturizada',descEn:'Medium-intense coffee with textured milk',tags:[]},
{id:'h9',name:'Capuchino',nameEn:'Cappuccino',price:7000,desc:'Equilibrio entre café, leche y espuma',descEn:'Balance of coffee, milk and foam',tags:[]},
{id:'h10',name:'Macchiato',nameEn:'Macchiato',price:5500,desc:'Espresso con un toque de leche espumada',descEn:'Espresso with a touch of foamed milk',tags:[]},
{id:'h11',name:'Espresso Bombón',nameEn:'Bonbon Coffee',price:5500,desc:'Café con leche condensada, dulce y cremoso',descEn:'Coffee with condensed milk, sweet and creamy',tags:[]},
{id:'h12',name:'Mocaccino',nameEn:'Mocha (sweet or dark)',price:8000,desc:'Café con leche y chocolate a elección (dulce o amargo)',descEn:'Coffee with milk and chocolate of your choice',tags:[]},
{id:'h13',name:'Affogato',nameEn:'Affogato',price:8500,desc:'Helado con espresso. Pídelo en leche o agua',descEn:'Ice cream with espresso. Order in milk or water',tags:[]},
{id:'h14',name:'Experiencia Cocoa',nameEn:'Hot Cocoa Experience',price:9000,desc:'Esfera de chocolate al 75%',descEn:'75% chocolate sphere experience',tags:[]},
{id:'h15',name:'Chai',nameEn:'Chai',price:10500,desc:'Té negro especiado',descEn:'Spiced black tea',tags:[]},
{id:'h16',name:'Matcha',nameEn:'Matcha',price:11000,desc:'Té verde japonés',descEn:'Japanese green tea',tags:[]},
{id:'h17',name:'Leche Dorada',nameEn:'Golden Milk',price:9800,desc:'Bebida a base de cúrcuma, jengibre y pimienta negra',descEn:'Turmeric, ginger and black pepper drink',tags:[]},
{id:'h18',name:'Taro',nameEn:'Taro',price:11000,desc:'A base de raíz taiwanesa lila, suave y dulce',descEn:'Taiwanese purple root, smooth and sweet',tags:[]},
{id:'h19',name:'Infusiones',nameEn:'Infusions',price:13500,desc:'Mezclas de té, frutales o herbales, opción para compartir. Pregunta por nuestro catálogo sensorial',descEn:'Tea blends, fruit or herbal, sharing option. Ask for our sensory catalog',tags:[]},
]},
{id:'cold',name:'Bebidas Frías',nameEn:'Cold Drinks',icon:'🧊',items:[
{id:'co1',name:'Milo Frío',nameEn:'Iced Milo',price:10000,desc:'',descEn:'',tags:[]},
{id:'co2',name:'Americano Frío',nameEn:'Iced Americano',price:9500,desc:'',descEn:'',tags:[]},
{id:'co3',name:'Café Soul Frío',nameEn:'Iced House Coffee',price:8000,desc:'Endulzado con maracuyá y jengibre',descEn:'Sweetened with passion fruit and ginger',tags:[]},
{id:'co4',name:'Capuchino Soul Frío',nameEn:'Iced Cappuccino',price:11200,desc:'Endulzado con guanábana y manzanilla',descEn:'Sweetened with soursop and chamomile',tags:[]},
{id:'co5',name:'Cocoa Fría',nameEn:'Iced Cocoa',price:13000,desc:'Chocolate frío',descEn:'Iced chocolate',tags:[]},
{id:'co6',name:'Chai Frío',nameEn:'Iced Chai Latte',price:12800,desc:'Té especiado frío',descEn:'Iced spiced tea',tags:[]},
{id:'co7',name:'Jugos Naturales',nameEn:'Natural Juices',price:11500,desc:'Pídelo en leche o agua',descEn:'Order in milk or water',tags:[]},
]},
{id:'frappe',name:'Frappé',nameEn:'Frappé',icon:'🧋',items:[
{id:'fr1',name:'Frappé de Café',nameEn:'Coffee Frappé',price:17500,desc:'Mezcla de hielo granizado y café',descEn:'Crushed ice and coffee blend',tags:[]},
{id:'fr2',name:'Frappé Nutella',nameEn:'Nutella Frappé',price:19500,desc:'Mezcla de hielo granizado y nutella',descEn:'Crushed ice and Nutella blend',tags:[]},
{id:'fr3',name:'Frappé Arequipe',nameEn:'Dulce de Leche Frappé',price:15500,desc:'Mezcla de hielo granizado y arequipe',descEn:'Crushed ice and dulce de leche blend',tags:[]},
{id:'fr4',name:'Frappé Chocolate',nameEn:'Chocolate Frappé',price:14500,desc:'Mezcla de hielo granizado y cacao',descEn:'Crushed ice and cacao blend',tags:[]},
]},
{id:'lemon',name:'Limonadas',nameEn:'Lemonades',icon:'🍋',items:[
{id:'l1',name:'Limonada Natural',nameEn:'Classic Lemonade',price:7000,desc:'',descEn:'',tags:[]},
{id:'l2',name:'Limonada Hierbabuena',nameEn:'Mint Lemonade',price:8000,desc:'',descEn:'',tags:[]},
{id:'l3',name:'Limonada Cerezada',nameEn:'Cherry Lemonade',price:8500,desc:'',descEn:'',tags:[]},
{id:'l4',name:'Limonada De Coco',nameEn:'Coconut Lemonade',price:10000,desc:'',descEn:'',tags:[]},
]},
{id:'shakes',name:'Malteadas',nameEn:'Milkshakes',icon:'🥤',items:[
{id:'m1',name:'Malteada De Frutos Rojos',nameEn:'Berry Milkshake',price:16500,desc:'',descEn:'',tags:[]},
{id:'m2',name:'Malteada De Vainilla',nameEn:'Vanilla Milkshake',price:15500,desc:'',descEn:'',tags:[]},
{id:'m3',name:'Malteada De Chocolate',nameEn:'Chocolate Milkshake',price:16000,desc:'',descEn:'',tags:[]},
{id:'m4',name:'Malteada De Nutella',nameEn:'Nutella Milkshake',price:19500,desc:'',descEn:'',tags:[]},
]},
{id:'spirit',name:'Espirituosos',nameEn:'Spiritual Coffee',icon:'🥃',items:[
{id:'s1',name:'Café Espirituoso',nameEn:'Spiritual Coffee',price:18000,desc:'Café caliente con licor a elección',descEn:'Hot coffee with your choice of liquor',tags:[]},
{id:'s2',name:'Capuchino Espirituoso',nameEn:'Spiritual Cappuccino',price:22000,desc:'Café, leche cremosa y licor a elección',descEn:'Coffee, creamy milk and your choice of liquor',tags:[]},
{id:'s3',name:'Soul Coffee Cocktail',nameEn:'Soul Coffee Cocktail',price:18000,desc:'Whisky con espresso doble y endulzante de panela, maracuyá y jengibre',descEn:'Whisky with double espresso, panela, passion fruit and ginger sweetener',tags:[]},
{id:'s4',name:'Espresso Martini',nameEn:'Espresso Martini',price:20000,desc:'Espresso doble, vodka y licor de café',descEn:'Double espresso, vodka and coffee liqueur',tags:[]},
{id:'s5',name:'Orgasmo',nameEn:'Orgasm',price:20500,desc:'Doble espresso con leche condensada, crema de whisky y amaretto',descEn:'Double espresso with condensed milk, whisky cream and amaretto',tags:[]},
{id:'s6',name:'Affogato Con Licor',nameEn:'Affogato with Liqueur',price:21500,desc:'Espresso vertido sobre helado con licor a elección',descEn:'Espresso poured over ice cream with your choice of liquor',tags:[]},
{id:'s7',name:'Cóctel Del Mes',nameEn:'Cocktail of the Month',price:35000,desc:'Pregunta por la creación del mes',descEn:'Ask about this month\'s creation',tags:[]},
]},
{id:'filter',name:'Filtrados',nameEn:'Filtering Coffee Methods',icon:'⏳',items:[
{id:'f1',name:'Chemex — 1 Taza',nameEn:'Chemex — 1 Cup',price:13000,desc:'Método de filtrado Chemex',descEn:'Chemex filtering method',tags:[]},
{id:'f2',name:'Chemex — 2 Tazas',nameEn:'Chemex — 2 Cups',price:24000,desc:'Para compartir',descEn:'To share',tags:[]},
{id:'f3',name:'V60 — 1 Taza',nameEn:'V60 — 1 Cup',price:12000,desc:'Método de filtrado V60',descEn:'V60 filtering method',tags:[]},
{id:'f4',name:'V60 — 2 Tazas',nameEn:'V60 — 2 Cups',price:22000,desc:'Para compartir',descEn:'To share',tags:[]},
{id:'f5',name:'Sifón — 1 Taza',nameEn:'Siphon — 1 Cup',price:14000,desc:'Método de filtrado por sifón',descEn:'Siphon filtering method',tags:[]},
{id:'f6',name:'Sifón — 2 Tazas',nameEn:'Siphon — 2 Cups',price:26000,desc:'Para compartir',descEn:'To share',tags:[]},
{id:'f7',name:'Prensa Francesa — 1 Taza',nameEn:'French Press — 1 Cup',price:10000,desc:'Método de prensa francesa',descEn:'French press method',tags:[]},
{id:'f8',name:'Prensa Francesa — 2 Tazas',nameEn:'French Press — 2 Cups',price:18000,desc:'Para compartir',descEn:'To share',tags:[]},
]},
{id:'wine',name:'Vino',nameEn:'Wine',icon:'🍷',items:[
{id:'w1',name:'Vino Caliente',nameEn:'Mulled Wine',price:18000,desc:'',descEn:'',tags:[]},
{id:'w2',name:'Copa De Vino',nameEn:'Glass of Wine',price:16000,desc:'Blanco o tinto',descEn:'White or red',tags:[]},
{id:'w3',name:'Mini Botellita De Vino',nameEn:'Mini Wine Bottle',price:35000,desc:'',descEn:'',tags:[]},
]},
{id:'sodas',name:'Sodas',nameEn:'Soda Waters',icon:'🫧',items:[
{id:'sd1',name:'Soda Soul Coffee',nameEn:'Craft Soda',price:12900,desc:'De café o fruta',descEn:'Coffee or fruit flavor',tags:[]},
{id:'sd2',name:'Hatsu Soda',nameEn:'Hatsu Soda',price:6500,desc:'',descEn:'',tags:[]},
{id:'sd3',name:'Gaseosas',nameEn:'Soft Drinks',price:5500,desc:'',descEn:'',tags:[]},
]},
{id:'beer',name:'Cervezas',nameEn:'Beer',icon:'🍺',items:[
{id:'be1',name:'Cerveza Importada',nameEn:'Imported Beer',price:21000,desc:'Desde $21.000 hasta $30.000',descEn:'From $21,000 to $30,000',tags:[]},
{id:'be2',name:'Cerveza Artesanal',nameEn:'Craft Beer',price:19500,desc:'',descEn:'',tags:[]},
]},
{id:'sweet',name:'Dulce',nameEn:'Sweet Food',icon:'🍰',items:[
{id:'du1',name:'Galletas Artesanales',nameEn:'Artisan Cookies',price:5000,desc:'Desde $5.000 hasta $6.500',descEn:'From $5,000 to $6,500',tags:[]},
{id:'du2',name:'Porción De Torta Artesanal',nameEn:'Artisan Cake Slice',price:12000,desc:'Desde $12.000 hasta $14.000. Opciones sin gluten y sin azúcar',descEn:'From $12,000 to $14,000. Gluten-free and sugar-free options available',tags:['sin gluten','sin azúcar']},
{id:'du3',name:'Brownie',nameEn:'Brownie',price:8000,desc:'Cacao colombiano con capa de avellanas tostadas',descEn:'Colombian cacao with a layer of toasted hazelnuts',tags:[]},
{id:'du4',name:'Bombones',nameEn:'Chocolate Bonbons',price:5000,desc:'Bocaditos de cacao 65% rellenos de crema',descEn:'65% cacao bites filled with cream',tags:[]},
]},
{id:'salty',name:'Salado',nameEn:'Salty Food',icon:'🥙',items:[
{id:'sa1',name:'Huevos Rellenos',nameEn:'Deviled Eggs',price:11300,desc:'Escoge 3 ingredientes',descEn:'Choose 3 ingredients',tags:[],options:'Jamón|Pollo|Atún|Champiñón|Queso|Cebolla|Pimentón|Maíz|Aguacate|Tocineta'},
{id:'sa2',name:'Palito De Queso',nameEn:'Cheese Stick',price:7000,desc:'',descEn:'',tags:[]},
{id:'sa3',name:'Empanadas Argentinas',nameEn:'Argentinian Baked Empanadas',price:7500,desc:'Pregunta por los sabores disponibles',descEn:'Ask about available flavors',tags:[]},
{id:'sa4',name:'Choripán Artesanal',nameEn:'Artisan Choripán',price:20000,desc:'Chorizos artesanales en pan de la casa',descEn:'Artisan sausages on house-baked bread',tags:[]},
{id:'sa5',name:'¡Arma Tu Ensalada!',nameEn:'Build Your Own Salad!',price:21500,desc:'Elige 5 ingredientes',descEn:'Choose 5 ingredients',tags:[],options:'Pollo|Atún|Tomate|Lechuga|Cebolla Morada|Maíz|Aguacate|Champiñón|Zanahoria|Pepino|Aceitunas|Queso Parmesano|Tocineta|Huevo'},
]},
{id:'pizza',name:'Pizza',nameEn:'Pizza',icon:'🍕',isPizza:true,items:[
{id:'pz1',name:'¡Arma Tu Pizza!',nameEn:'Build Your Own Pizza!',price:22000,desc:'Elige 1 salsa y 4 ingredientes',descEn:'Choose 1 sauce & 4 ingredients',tags:[]},
],toppings:{
salsas:{title:'Salsas',titleEn:'Sauces',icon:'🫗',note:'Elige 1',noteEn:'Choose 1',items:['Miel Mostaza|Honey Mustard','Pasta De Tomate|Tomato Paste','Pesto|Pesto']},
carnes:{title:'Carnes',titleEn:'Meats',icon:'🥩',note:'',noteEn:'',items:['Pepperoni|Pepperoni','Salami|Salami','Tocineta|Bacon','Jamón De Pollo|Chicken Ham','Jamón De Cerdo|Pork Ham','Jamón De Pavo|Turkey Ham']},
vegetales:{title:'Vegetales',titleEn:'Vegetables',icon:'🥬',note:'',noteEn:'',items:['Tomate Chonto|Tomato','Tomate Cherry|Cherry Tomato','Tomate Seco|Dried Tomato','Cebolla Morada|Red Onion','Champiñón|Mushroom','Maíz Tierno|Sweet Corn','Rúgula|Arugula','Albahaca|Basil','Aceituna Negra o Verde|Black or Green Olive','Jalapeños|Jalapeños','Berenjena|Eggplant']},
frutas:{title:'Frutas',titleEn:'Fruits',icon:'🍓',note:'',noteEn:'',items:['Piña|Pineapple','Ciruela|Plum','Fresa|Strawberry','Banano|Banana','Durazno|Peach']},
adiciones:{title:'Adiciones',titleEn:'Premium Add-ons',icon:'✨',note:'$3.000 c/u',noteEn:'$3,000 each',items:['Jamón Serrano|Serrano Ham','Burrata|Burrata','Nutella|Nutella','Guacamole|Guacamole']},
}},
{id:'extras',name:'Adicionales',nameEn:'Extras',icon:'➕',items:[
{id:'ex1',name:'Leche Vegetal',nameEn:'Plant-Based Milk',price:3000,desc:'',descEn:'',tags:['vegano']},
{id:'ex2',name:'Michelada',nameEn:'Beer Mix',price:2000,desc:'',descEn:'',tags:[]},
{id:'ex3',name:'Zumo de Limón',nameEn:'Lemon Juice',price:1500,desc:'',descEn:'',tags:[]},
{id:'ex4',name:'Bola de Helado',nameEn:'Ice Cream Scoop',price:2500,desc:'',descEn:'',tags:[]},
{id:'ex5',name:'Salsa Chocolate o Caramelo',nameEn:'Chocolate or Caramel Syrup',price:4000,desc:'',descEn:'',tags:[]},
{id:'ex6',name:'Shot Sencillo',nameEn:'Single Shot',price:15000,desc:'',descEn:'',tags:[]},
{id:'ex7',name:'Shot Doble',nameEn:'Double Shot',price:20000,desc:'',descEn:'',tags:[]},
{id:'ex8',name:'Endulzante de la Casa',nameEn:'House Sweetener',price:2000,desc:'',descEn:'',tags:[]},
]},
];

let D=[],curCat=null,dTag=null;
const $=s=>document.getElementById(s);
const uid=()=>Math.random().toString(36).slice(2,8);
const fmt=n=>new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',minimumFractionDigits:0}).format(n);
const save=()=>{try{localStorage.setItem(SK,JSON.stringify(D))}catch(e){}};
const load=()=>{try{const r=localStorage.getItem(SK);if(r){const p=JSON.parse(r);if(Array.isArray(p)&&p.length)return p}}catch(e){}return JSON.parse(JSON.stringify(DEFS))};
function toast(m){const t=$('toast');t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',2600)}

/* ═══════ VIEWS ═══════ */
function go(v){
  document.querySelectorAll('.view').forEach(e=>e.classList.remove('active'));
  $('view-'+v).classList.add('active');window.scrollTo(0,0);
  if(v==='landing')document.body.style.background='#c1a58d';
  else if(v==='menu'){document.body.style.background='#f7f2eb';curCat=null;dTag=null;showHome()}
  else if(v==='login'){document.body.style.background='#2c1e16';$('lp').value='';$('le').style.display='none';$('lp').classList.remove('err','shk')}
  else if(v==='admin'){document.body.style.background='#c1a58d';renderAdmin()}
}

/* ═══════ MODALS ═══════ */
function openSocials(){$('social-modal').classList.add('open');document.body.style.overflow='hidden'}
function closeSocials(){$('social-modal').classList.remove('open');document.body.style.overflow=''}

function openProduct(catId,itemId){
  const c=D.find(x=>x.id===catId),i=c?.items.find(x=>x.id===itemId);
  if(!i)return;
  const tgs=(i.tags||[]).map(t=>`<span class="pm__tag" data-t="${t}">${t}</span>`).join('');
  const optsHtml=i.options?`<div class="pm__divider"></div><p class="pm__opts-label">Opciones disponibles</p><div class="pm__opts">${i.options.split('|').map(o=>`<span class="pm__opt">${o.trim()}</span>`).join('')}</div>`:'';
  $('product-modal-content').innerHTML=`
    <button class="modal__close" onclick="closeProduct()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    <div class="pm__cat">${c.icon} ${c.name}</div>
    <h2 class="pm__name">${i.name}</h2>
    ${i.nameEn?`<p class="pm__name-en">${i.nameEn}</p>`:''}
    <div class="pm__price">${fmt(i.price)}</div>
    ${i.desc?`<div class="pm__divider"></div><p class="pm__desc">${i.desc}</p>`:''}
    ${i.descEn?`<p class="pm__desc-en">${i.descEn}</p>`:''}
    ${tgs?`<div class="pm__tags">${tgs}</div>`:''}
    ${optsHtml}
    <a class="pm__wa" href="https://wa.me/573203678524?text=${encodeURIComponent('Hola! Me interesa: '+i.name)}" target="_blank">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      Preguntar por WhatsApp</a>`;
  $('product-modal').classList.add('open');document.body.style.overflow='hidden';
}
function closeProduct(){$('product-modal').classList.remove('open');document.body.style.overflow=''}

document.addEventListener('click',e=>{if(e.target.id==='social-modal')closeSocials();if(e.target.id==='product-modal')closeProduct()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeSocials();closeProduct()}});

/* ═══════ LOGIN ═══════ */
function tryLogin(){const i=$('lp');if(i.value===PW)go('admin');else{$('le').style.display='block';i.classList.add('err','shk');setTimeout(()=>i.classList.remove('shk'),500)}}
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&$('view-login').classList.contains('active'))tryLogin()});

/* ═══════ MENU HOME ═══════ */
function showHome(){$('home-screen').style.display='block';$('detail-screen').style.display='none';renderCatCards()}
function renderCatCards(){
  let h='';D.forEach((c,i)=>{
    h+=`<div class="cat-card cat-card--${i%8}" onclick="openCat('${c.id}')" style="animation:rise 0.5s var(--ease) ${i*0.06}s both">
      <div class="cat-card__bg"></div><span class="cat-card__emoji">${c.icon}</span>
      <div class="cat-card__text"><div class="cat-card__title">${c.name.toUpperCase()}</div>
      ${c.nameEn?`<div class="cat-card__sub">${c.nameEn}</div>`:''}<div class="cat-card__count">${c.items.length} producto${c.items.length!==1?'s':''}</div></div></div>`;
  });$('cat-cards').innerHTML=h;
}

/* ═══════ MENU DETAIL ═══════ */
function openCat(id){curCat=id;dTag=null;$('home-screen').style.display='none';$('detail-screen').style.display='block';window.scrollTo(0,0);renderDetail()}
function backToHome(){curCat=null;dTag=null;showHome();window.scrollTo(0,0)}
function renderDetail(){
  const c=D.find(x=>x.id===curCat);if(!c)return backToHome();
  $('detail-head').innerHTML=`<div class="detail__head"><span class="detail__icon">${c.icon}</span><div><div class="detail__title">${c.name}</div>${c.nameEn?`<div class="detail__title-en">${c.nameEn}</div>`:''}<div class="detail__line"></div></div></div>`;

  // Pizza special view
  if(c.isPizza && c.toppings){
    $('detail-tags').innerHTML='';
    const pi=c.items[0];
    let h=`<div class="pizza-builder" style="animation:rise 0.5s var(--ease) both">
      <div class="pizza-hero">
        <div class="pizza-hero__emoji">🍕</div>
        <div class="pizza-hero__info">
          <h3 class="pizza-hero__title">${pi.name}</h3>
          <p class="pizza-hero__title-en">${pi.nameEn}</p>
          <div class="pizza-hero__price">${fmt(pi.price)}</div>
          <p class="pizza-hero__rule">${pi.desc}</p>
          <p class="pizza-hero__rule-en">${pi.descEn}</p>
        </div>
      </div>`;
    const keys=Object.keys(c.toppings);
    keys.forEach((key,ki)=>{
      const sec=c.toppings[key];
      h+=`<div class="topping-section" style="animation:rise 0.4s var(--ease) ${0.1+ki*0.08}s both">
        <button class="topping-section__head" onclick="this.parentElement.classList.toggle('open')">
          <div class="topping-section__left">
            <span class="topping-section__icon">${sec.icon}</span>
            <div>
              <span class="topping-section__title">${sec.title}</span>
              <span class="topping-section__title-en">${sec.titleEn}</span>
            </div>
          </div>
          <div class="topping-section__right">
            ${sec.note?`<span class="topping-section__note">${sec.note}</span>`:''}
            <span class="topping-section__count">${sec.items.length}</span>
            <span class="topping-section__arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg></span>
          </div>
        </button>
        <div class="topping-section__body">
          <div class="topping-grid">
            ${sec.items.map(item=>{
              const [es,en]=item.split('|');
              return `<div class="topping-chip"><span class="topping-chip__name">${es}</span><span class="topping-chip__name-en">${en}</span></div>`;
            }).join('')}
          </div>
        </div>
      </div>`;
    });
    h+=`<a class="pizza-wa" href="https://wa.me/573203678524?text=${encodeURIComponent('Hola! Quiero armar mi pizza 🍕')}" target="_blank">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      Pedir por WhatsApp</a></div>`;
    $('detail-items').innerHTML=h;
    return;
  }

  // Normal categories
  const allT=new Set();c.items.forEach(i=>(i.tags||[]).forEach(t=>allT.add(t)));
  $('detail-tags').innerHTML=allT.size?`<div class="detail__tags">${[...allT].map(t=>`<button class="dtag ${dTag===t?'on':''}" data-t="${t}" onclick="dTag=dTag==='${t}'?null:'${t}';renderDetail()">${t}</button>`).join('')}</div>`:'';
  const items=c.items.filter(i=>!dTag||(i.tags||[]).includes(dTag));
  if(!items.length){$('detail-items').innerHTML=`<div class="icard__empty"><h3>Sin productos con este filtro</h3><button onclick="dTag=null;renderDetail()">Ver todos</button></div>`;return}
  let h='';items.forEach((i,x)=>{
    const hasDetail=i.desc||i.descEn||(i.tags&&i.tags.length)||i.options;
    h+=`<div class="icard ${hasDetail?'icard--clickable':''}" onclick="${hasDetail?`openProduct('${c.id}','${i.id}')`:''}" style="animation:rise 0.45s var(--ease) ${x*0.03}s both">
      <div class="icard__left"><div class="icard__name">${i.name}</div>${i.nameEn?`<div class="icard__name-en">${i.nameEn}</div>`:''}</div>
      <div class="icard__right"><div class="icard__price">${fmt(i.price)}</div>
      ${hasDetail?'<div class="icard__chevron"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg></div>':''}</div></div>`;
  });$('detail-items').innerHTML=h;
}

/* ═══════ ADMIN ═══════ */
const EJ=['☕','🧊','🧋','🍋','🥤','🥃','⏳','🍷','🫧','🍺','🍰','🥙','🍕','➕','🧁','🥗','🍵','🍫'];
const IE=`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
const IX=`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>`;
const IP=`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
function renderAdmin(){
  const tot=D.reduce((a,c)=>a+c.items.length,0),avg=tot?Math.round(D.reduce((a,c)=>a+c.items.reduce((s,i)=>s+i.price,0),0)/tot):0;
  let h=`<div class="admin__welcome"><div class="admin__welcome-title">Panel de Administración</div><div class="admin__welcome-sub">Gestiona las categorías y productos de tu menú digital</div></div><div class="stats"><div class="stat"><div class="stat__n">${D.length}</div><div class="stat__l">Categorías</div></div><div class="stat"><div class="stat__n">${tot}</div><div class="stat__l">Productos</div></div><div class="stat"><div class="stat__n">${fmt(avg)}</div><div class="stat__l">Precio Prom.</div></div></div><div class="admin__section-label">Categorías del Menú</div>`;
  D.forEach(c=>{h+=`<div class="ac" id="ac-${c.id}"><div class="ac__h"><div class="ac__hl"><span class="ac__ic">${c.icon}</span><span class="ac__nm">${c.name}</span><span class="ac__ct">${c.items.length}</span></div><div class="ac__btns"><button class="ib" onclick="ecF('${c.id}')">${IE}</button><button class="ib x" onclick="dc('${c.id}')">${IX}</button></div></div>`;c.items.forEach(i=>{const tg=(i.tags||[]).map(t=>`<span class="ai__tg" data-t="${t}">${t}</span>`).join('');const optsBadge=i.options?`<span class="ai__opts">${i.options.split('|').length} opciones</span>`:'';h+=`<div class="ai" id="ai-${i.id}"><div class="ai__i"><div><span class="ai__n">${i.name}</span>${tg}${optsBadge}</div><div class="ai__d">${i.desc||''}</div></div><div class="ai__r"><span class="ai__p">${fmt(i.price)}</span><button class="ib" onclick="eiF('${c.id}','${i.id}')">${IE}</button><button class="ib x" onclick="di('${c.id}','${i.id}')">${IX}</button></div></div>`});h+=`<button class="addr" onclick="aiF('${c.id}')">${IP} Agregar producto</button></div>`});
  h+=`<button class="addc" onclick="acF()">${IP} Nueva categoría</button>`;$('ab').innerHTML=h;
}
function cfH(n,ic,sA,cA){return `<div class="af"><div class="ejs">${EJ.map(e=>`<button class="${e===ic?'on':''}" onclick="this.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('on'));this.classList.add('on');this.parentElement.dataset.s='${e}'">${e}</button>`).join('')}</div><div class="af__g"><input class="af__in" id="cn" value="${n}" placeholder="Nombre de categoría"/></div><div class="af__a"><button class="bs" onclick="${sA}">Guardar</button><button class="bc" onclick="${cA}">Cancelar</button></div></div>`}
function acF(){const b=document.querySelector('.addc'),w=document.createElement('div');w.className='ac';w.id='ncf';w.innerHTML=cfH('','☕',"aC()","document.getElementById('ncf').remove();document.querySelector('.addc').style.display=''");b.before(w);b.style.display='none';$('cn').focus()}
function aC(){const n=$('cn').value.trim(),pk=document.querySelector('#ncf .ejs'),ic=pk.dataset.s||'☕';if(!n)return;D.push({id:uid(),name:n,icon:ic,items:[]});save();toast('Categoría creada ✓');renderAdmin()}
function ecF(id){const c=D.find(x=>x.id===id),el=$('ac-'+id).querySelector('.ac__h');el.outerHTML=cfH(c.name,c.icon,`uC('${id}')`,'renderAdmin()');$('cn').focus()}
function uC(id){const n=$('cn').value.trim(),pk=document.querySelector('.ejs'),ic=pk.dataset.s||D.find(x=>x.id===id).icon;if(!n)return;D=D.map(c=>c.id===id?{...c,name:n,icon:ic}:c);save();toast('Actualizada ✓');renderAdmin()}
function dc(id){if(!confirm('¿Eliminar categoría y productos?'))return;D=D.filter(c=>c.id!==id);save();toast('Eliminada');renderAdmin()}
function ifH(n,p,d,tg,sA,cA){const A=['vegano','sin gluten','sin azúcar'];return `<div class="af"><div class="af__g duo"><input class="af__in" id="in" value="${n}" placeholder="Nombre"/><input class="af__in" id="ip" value="${p}" placeholder="Precio" inputmode="numeric" oninput="this.value=this.value.replace(/\\D/g,'')"/></div><div class="af__g"><input class="af__in" id="id" value="${d}" placeholder="Descripción (opcional)"/></div><div class="af__tgs" id="itg">${A.map(t=>`<button class="atg ${tg.includes(t)?'on':''}" data-t="${t}" onclick="this.classList.toggle('on')">${t}</button>`).join('')}</div><div class="af__a"><button class="bs" onclick="${sA}">Guardar</button><button class="bc" onclick="${cA}">Cancelar</button></div></div>`}
function gD(){const n=$('in').value.trim(),p=parseInt($('ip').value)||0,d=$('id').value.trim(),tg=[];document.querySelectorAll('#itg .on').forEach(b=>tg.push(b.dataset.t));return{name:n,price:p,desc:d,tags:tg}}
function aiF(cid){const cat=$('ac-'+cid),btn=cat.querySelector('.addr'),w=document.createElement('div');w.id='nif';w.innerHTML=ifH('','','',[],"aI('"+cid+"')","document.getElementById('nif').remove()");btn.before(w);$('in').focus()}
function aI(cid){const d=gD();if(!d.name||!d.price)return;D.find(c=>c.id===cid).items.push({...d,id:uid()});save();toast('Agregado ✓');renderAdmin()}
function eiF(cid,iid){const c=D.find(x=>x.id===cid),i=c.items.find(x=>x.id===iid),el=$('ai-'+iid);el.outerHTML=`<div id="eif">${ifH(i.name,i.price,i.desc||'',i.tags||[],"uI('"+cid+"','"+iid+"')",'renderAdmin()')}</div>`;$('in').focus()}
function uI(cid,iid){const d=gD();if(!d.name||!d.price)return;D=D.map(c=>c.id===cid?{...c,items:c.items.map(i=>i.id===iid?{...i,...d}:i)}:c);save();toast('Actualizado ✓');renderAdmin()}
function di(cid,iid){D=D.map(c=>c.id===cid?{...c,items:c.items.filter(i=>i.id!==iid)}:c);save();toast('Eliminado');renderAdmin()}

/* ═══════ INIT ═══════ */
const MAINTENANCE = true; // ← Cambiar a false para reactivar el menú

document.addEventListener('DOMContentLoaded',()=>{
  if(MAINTENANCE){
    // Block everything — only show maintenance modal
    const splash=$('splash');if(splash)splash.remove();
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    return;
  }
  D=load();go('landing');setTimeout(()=>{const s=$('splash');s.classList.add('bye');setTimeout(()=>s.remove(),800)},1000);
});