// @ts-nocheck  (désactive les avertissements de typage de l'éditeur, le code est du JavaScript normal)
const CONTENT = {
  name: "Josaphat N. Ngoma",
  role: "Artiste plasticien · Illustrateur · Designer en communication visuelle",
  aiTitle: "Créatif IA — Design augmenté par l'intelligence artificielle",
  tagline: "Viser loin ou rien",
  email: "josaphatngoma000@gmail.com",
  whatsapp: "https://wa.me/243828181386",
  instagram: "https://www.instagram.com/aimfarthest000/",
  linkedin: "https://www.linkedin.com/in/josaphat-nicolas-ngoma-b5a888350/",
  behance: "https://behance.net/Josaphatngoma",
  facebook: "https://www.facebook.com/profile.php?id=61585333061462",
  tiktok: "https://vm.tiktok.com/ZS9AbhWRhPc2u-WtLIr/"
};

const ABOUT = {
  name: "Josaphat Nicolas Ngoma",
  // 1er paragraphe = accroche (grand), 4e = démarche (mis en avant)
  paragraphs: [
    "Je suis artiste plasticien et designer en communication visuelle, basé à Kinshasa. Mon travail se situe à la rencontre de l’image, de la technologie et de la réflexion.",
    "Formé aux Beaux-Arts, je développe une pratique qui va de l’illustration et du portrait à la peinture digitale, au design graphique et à la création visuelle numérique. Je m’intéresse particulièrement au réalisme, à la lumière, à la composition et à la capacité d’une image à transmettre une idée, une atmosphère ou une identité.",
    "Au-delà de la création artistique, j’explore les technologies qui transforment aujourd’hui les métiers créatifs : intelligence artificielle, outils numériques, automatisation et nouveaux workflows de production. Je cherche moins à opposer art et technologie qu’à comprendre comment les faire travailler ensemble intelligemment.",
    "Ma démarche repose sur une idée simple : une création réussie ne doit pas seulement être esthétique, elle doit avoir une intention. Chaque projet est donc une recherche d’équilibre entre expression personnelle, précision visuelle, efficacité et contexte.",
    "Toujours curieux, je nourris ma pratique par des domaines aussi différents que les sciences, la poésie, la photographie, le cinéma et les nouvelles technologies. Cette diversité influence ma façon de concevoir les images et m’amène à expérimenter constamment de nouvelles manières de créer."
  ]
};

const CATEGORIES = ["Portraits","Illustration","Design graphique","Communication visuelle","Projets numériques"];

// ================= PHOTOS =================
// 1. Mets tes photos dans le dossier "images" (à côté de index.html).
// 2. Écris ci-dessous leur nom EXACT (avec l'extension), entre guillemets, dans l'ordre d'affichage.
//    Exemple : "IMG-20250212-WA0003.jpg"   (majuscules/minuscules comptent !)
// 3. Laisse "" pour garder "Image à venir".
// 6 œuvres par catégorie (3 à gauche, 3 à droite). La 1re de chaque catégorie est celle affichée dans "Tout".
// Chaque catégorie a son propre sous-dossier dans images/portfolio/
// Si le nom du sous-dossier sur ton téléphone diffère du nom de la catégorie,
// corrige-le ci-dessous (clé = nom exact du sous-dossier dans Acode).
const IMAGES_DIR = "images/portfolio/";
const CATEGORY_FOLDER = {
  "Portraits":              "Portraits",
  "Illustration":           "Illustration",
  "Design graphique":       "Design graphique",
  "Communication visuelle": "Communication visuelle",
  "Projets numériques":     "Projet numérique"
};
const PHOTOS = {
  "Portraits": [
    "Portrait au crayon 01.webp",
    "Portrait au crayon 02.webp",
    "Portrait au crayon 03.webp",
    "Portrait numérique.webp",
    "", ""
  ],
  "Illustration": [
    "Afro man.webp",
    "Liberté immuable.webp",
    "Pagani Huayra Codalunga.webp",
    "Portrait numérique.webp",
    "", ""
  ],
  "Design graphique": [
    "B STORE.webp",
    "BESTEPHA Multiservice.webp",
    "ODJO.webp",
    "Renova énergie.webp",
    "", ""
  ],
  "Communication visuelle": [
    "Benda beauté Event.webp",
    "GDC flyer.webp",
    "Visuel maillot rendu 3D.webp",
    "Renova énergie.webp",
    "ODJO sac à main.webp",
    "BESTEPHA Multiservice.webp"
  ],
  "Projets numériques": [
    "Maillot rendu 3D.webp",
    "Visuel rendu 3D.webp",
    "", "", "", ""
  ]
};
function photoPath(cat, filename) {
  return IMAGES_DIR + (CATEGORY_FOLDER[cat] || cat) + "/" + filename;
}

// Titres et année : remplace-les par les vrais quand tu veux
const _label = {"Portraits":"Portrait","Illustration":"Illustration","Design graphique":"Design","Communication visuelle":"Communication","Projets numériques":"Projet"};
// Vrais titres (laisse "" pour garder le titre par défaut)
const TITLES = {
  "Portraits": [
    "Portrait au crayon 01",
    "Portrait au crayon 02",
    "Portrait au crayon 03",
    "Portrait numérique"
  ],
  "Illustration": [
    "Afro Man",
    "Liberté immuable",
    "Pagani Huayra Codalunga",
    "Portrait numérique"
  ],
  "Design graphique": [
    "B Store",
    "BESTEPHA Multiservice",
    "ODJO",
    "Renova Énergie"
  ],
  "Communication visuelle": [
    "Benda Beauté Event",
    "GDC — Flyer",
    "Visuel maillot — Rendu 3D",
    "Renova Énergie",
    "ODJO — Sac à main",
    "BESTEPHA Multiservice"
  ],
  "Projets numériques": [
    "Maillot — Rendu 3D",
    "Visuel — Rendu 3D"
  ]
};
const WORKS = CATEGORIES.flatMap(cat =>
  Array.from({length:6}, (_,i)=>({title:(TITLES[cat] && TITLES[cat][i]) || `[${_label[cat]} ${i+1}]`, category:cat, year:"2025", img:(PHOTOS[cat] && PHOTOS[cat][i]) || ""}))
);

const SERVICES = [
  {n:"01", title:"Illustration & Portrait", desc:"Portraits et illustrations digitales réalistes — travail de la lumière, du rendu de peau et de la composition, du croquis au rendu final."},
  {n:"02", title:"Identité visuelle", desc:"Logos, chartes graphiques et systèmes visuels cohérents, pensés pour durer et s'adapter à tous les supports."},
  {n:"03", title:"Direction artistique", desc:"Concepts forts, composition maîtrisée et cohérence visuelle sur l'ensemble d'un projet, de l'idée à l'exécution."},
  {n:"04", title:"Communication visuelle", desc:"Supports visuels, présentations et contenus pensés pour communiquer clairement, à l'écrit comme à l'image."},
  {n:"05", title:"IA appliquée & Automatisation", desc:"Intégration d'outils IA dans le processus créatif : génération d'images, accélération de la production et mise en place de workflows plus efficaces."},
];

const CV = {
  // Chaque entrée : {t: titre, s: sous-titre / précision}  ou simple texte
  "Formation": [
    {t:"Diplôme d’État", s:"Institut des Beaux-Arts — 2023"},
    {t:"Communication visuelle — Projet de poursuite d’études", s:"Académie des Beaux-Arts"}
  ],
  "Expérience professionnelle": [
    {t:"Artiste freelance", s:"Création artistique et prestations graphiques"},
    {t:"Stagiaire en design graphique", s:"IMAGOH sarl — de Mai à Juin 2026"}
  ],
  "Compétences": [
    "Direction artistique",
    "Design graphique & identité visuelle",
    "Illustration réaliste & portraits",
    "Illustration rendu 3D",
    "IA appliquée au design / Workflows IA"
  ],
  "Logiciels": ["Photoshop", "Illustrator", "InDesign", "Ibis Paint X", "Clip Studio Paint", "Blender", "CapCut"],
  "Distinctions": ["[Prix / Exposition — Année]"]
};

// Remplace par tes vrais articles : { date, cat, title, excerpt }
const POSTS = [
  {date:"[Date]", cat:"[Catégorie]", title:"[Titre de l'article]", excerpt:"[Court extrait de l'article]"},
  {date:"[Date]", cat:"[Catégorie]", title:"[Titre de l'article]", excerpt:"[Court extrait de l'article]"},
];

// Remplace par tes vrais produits : { title, price, img }
// Les photos des produits sont dans images/Produits/
const SHOP_IMAGES_DIR = "images/Produits/";
const PRODUCTS = [
  {title:"Flyer personnalisé", price:"20 $", img:"Flyer personnalisé.webp"},
  {title:"Logo & Branding", price:"180 $", img:"Logo & Branding.webp"},
  {title:"Portrait numérique", price:"20 $", img:"Portrait numérique.webp"},
];

const TESTIMONIALS = [
  {text:"[Témoignage à venir]", author:"[Nom, rôle]"},
  {text:"[Témoignage à venir]", author:"[Nom, rôle]"},
];

// ---- contenu réel uniquement : les textes entre [crochets] ne sont ni affichés ni indexés ----
const isPH = s => typeof s==='string' && /^\[.*\]$/.test(s.trim());
const REAL_POSTS = POSTS.filter(p=>!isPH(p.title));
const REAL_TESTI = TESTIMONIALS.filter(t=>!isPH(t.text));
Object.keys(CV).forEach(k=>{ CV[k]=CV[k].filter(i=> typeof i==='string' ? !isPH(i) : !isPH(i.t)); if(!CV[k].length) delete CV[k]; });
function toggleSection(id, show){
  const sec=document.getElementById(id); if(sec) sec.hidden=!show;
  document.querySelectorAll('a[href="#'+id+'"]').forEach(a=>{ const el=a.closest('li')||a; el.hidden=!show; });
}
toggleSection('blog', REAL_POSTS.length>0);
toggleSection('temoignages', REAL_TESTI.length>0);
// texte alternatif descriptif des images (SEO + accessibilité)
const altWork = (title,cat) => `${title} — ${cat}, par Josaphat N. Ngoma, Kinshasa`;

// ---- rendu depuis CONTENT / WORKS / SERVICES ----
navName.textContent = CONTENT.name;
heroName.textContent = CONTENT.name;
heroRole.textContent = CONTENT.role;
heroAiTitle.textContent = CONTENT.aiTitle;
heroTagline.textContent = CONTENT.tagline;
aboutName.textContent = ABOUT.name;
bioText.innerHTML = ABOUT.paragraphs.map((t,i)=>`<p${i===0?' class="lead"':i===3?' class="key"':''}>${t}</p>`).join('');
footName.textContent = "© " + new Date().getFullYear() + " " + CONTENT.name;
emailBtn.href = "mailto:" + CONTENT.email;
waBtn.href = CONTENT.whatsapp + "?text=" + encodeURIComponent("Bonjour, je souhaiterais discuter avec vous");
igBtn.href = CONTENT.instagram;
liBtn.href = CONTENT.linkedin;
beBtn.href = CONTENT.behance;
fbBtn.href = CONTENT.facebook;
ttBtn.href = CONTENT.tiktok;
footIg.href = CONTENT.instagram;
footLi.href = CONTENT.linkedin;
footBe.href = CONTENT.behance;
footFb.href = CONTENT.facebook;
footTt.href = CONTENT.tiktok;

filters.innerHTML = '<button class="active" data-c="all">Tout</button>' +
  CATEGORIES.map(c=>`<button data-c="${c}">${c}</button>`).join('');

// scroll reveal directionnel : vers le bas = gauche→droite, vers le haut = droite→gauche (+ flou)
let lastY = window.scrollY, scrollDir = -1; // -1 = gauche→droite (down), 1 = droite→gauche (up)

const _revealSeen = new WeakSet();
const _revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach((en,idx)=>{
    const el = en.target;
    if(en.isIntersecting){
      el.style.setProperty('--dir', el.dataset.side ? (el.dataset.side==='left' ? -1 : 1) : scrollDir);
      clearTimeout(el._revealTimer);
      el._revealTimer = setTimeout(()=>el.classList.add('visible'), idx*70);
    } else {
      clearTimeout(el._revealTimer);
      el._revealTimer = setTimeout(()=>el.classList.remove('visible'), idx*70);
    }
  });
}, {threshold:0, rootMargin:'-12% 0px -12% 0px'});

function observeReveals(){
  document.querySelectorAll('.reveal').forEach(el=>{
    if(_revealSeen.has(el)) return;
    _revealSeen.add(el);
    _revealObserver.observe(el);
  });
}

function renderGrid(filter){
  const all = filter==='all';
  // "Tout" : uniquement la 1re œuvre de chaque catégorie (même structure qu'avant)
  // Catégorie : 6 œuvres sur 2 colonnes, gauche -> vient de la gauche, droite -> vient de la droite
  const list = all
    ? CATEGORIES.map(c=>WORKS.find(w=>w.category===c)).filter(Boolean)
    : WORKS.filter(w=>w.category===filter);
  grid.classList.toggle('two-col', !all);
  grid.innerHTML = list
    .map((w,i)=>`
      <div class="card reveal"${all ? '' : ` data-side="${i%2===0?'left':'right'}"`} data-title="${w.title}" data-cat="${w.category}" data-year="${w.year}" data-img="${w.img}">
        <div class="ph">${w.img ? `<img src="${encodeURI(photoPath(w.category, w.img))}" alt="${altWork(w.title,w.category)}" loading="lazy" decoding="async">` : 'Image à venir'}</div>
        <div class="info"><h3>${w.title}</h3><span>${w.category} — ${w.year}</span></div>
      </div>`).join('');
  observeReveals();
}
renderGrid('all');

filters.addEventListener('click', e=>{
  if(e.target.tagName!=='BUTTON') return;
  filters.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
  e.target.classList.add('active');
  renderGrid(e.target.dataset.c);
  grid.scrollIntoView({behavior:'smooth', block:'start'});
});

svcGrid.innerHTML = SERVICES.map(s=>`
  <div class="svc"><div class="n">${s.n}</div><h3>${s.title}</h3><p>${s.desc}</p></div>
`).join('');

cvGrid.innerHTML = Object.entries(CV).map(([label,items])=>`
  <div class="glass"><h3>${label}</h3><ul>${items.map(i=> typeof i==='string' ? `<li>${i}</li>` : `<li class="cv-entry"><strong>${i.t}</strong><span>${i.s}</span></li>`).join('')}</ul></div>
`).join('');

blogGrid.innerHTML = REAL_POSTS.map(p=>`
  <article class="post glass"><div class="eyebrow">${p.cat} — ${p.date}</div><h3>${p.title}</h3><p>${p.excerpt}</p></article>
`).join('');

shopGrid.innerHTML = PRODUCTS.map(pr=>`
  <div class="product glass reveal">
    <div class="ph">${pr.img ? `<img src="${encodeURI(SHOP_IMAGES_DIR + pr.img)}" alt="${pr.title} — boutique Josaphat N. Ngoma" loading="lazy" decoding="async">` : 'Image à venir'}</div>
    <div class="info">
      <h3>${pr.title}</h3>
      <div class="price">${pr.price}</div>
      <a href="${CONTENT.whatsapp}?text=${encodeURIComponent('Bonjour, je suis intéressé par : *'+pr.title+'*')}" target="_blank" rel="noopener">Commander</a>
    </div>
  </div>
`).join('');
observeReveals();

let tIdx = 0;
function renderTesti(){ if(!REAL_TESTI.length) return; tText.textContent = REAL_TESTI[tIdx].text; tAuthor.textContent = REAL_TESTI[tIdx].author; }
renderTesti();
tPrev.addEventListener('click', ()=>{ tIdx = (tIdx-1+REAL_TESTI.length)%REAL_TESTI.length; renderTesti(); });
tNext.addEventListener('click', ()=>{ tIdx = (tIdx+1)%REAL_TESTI.length; renderTesti(); });
testi.addEventListener('keydown', e=>{
  if(e.key==='ArrowLeft') tPrev.click();
  if(e.key==='ArrowRight') tNext.click();
});

// menu mobile
burgerBtn.addEventListener('click', ()=>{
  document.body.classList.add('nav-open');
  burgerBtn.setAttribute('aria-expanded','true');
});
function closeMobileNav(){
  document.body.classList.remove('nav-open');
  burgerBtn.setAttribute('aria-expanded','false');
}
navMobileClose.addEventListener('click', closeMobileNav);
document.querySelectorAll('#navMobile a').forEach(a=>a.addEventListener('click', closeMobileNav));


// nav scroll state + back to top + détection du sens du scroll
const navEl = document.getElementById('nav');
const topBtn = document.getElementById('top');
const footerEl = document.querySelector('footer');
function positionTopBtn(){
  const gap = 16; // marge au-dessus du footer, en px
  const overlap = window.innerHeight - footerEl.getBoundingClientRect().top;
  topBtn.style.bottom = overlap > 0 ? (overlap + gap) + 'px' : '';
}
window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  scrollDir = y > lastY ? -1 : 1;
  lastY = y;
  navEl.classList.toggle('scrolled', y>10);
  topBtn.classList.toggle('show', y>500);
  positionTopBtn();
});
window.addEventListener('resize', positionTopBtn);
positionTopBtn();
topBtn.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));

// theme toggle — clair par défaut, le visiteur choisit s'il veut basculer en sombre
const root = document.documentElement;
try{
  const saved = localStorage.getItem('theme');
  if(saved==='dark') root.setAttribute('data-theme','dark');
  else root.setAttribute('data-theme','light');
}catch(e){}
function isDarkNow(){ return root.getAttribute('data-theme')==='dark'; }
function paintThemeIcon(){ themeBtn.setAttribute('aria-checked', String(isDarkNow())); }
paintThemeIcon();
themeBtn.addEventListener('click', ()=>{
  const next = isDarkNow() ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try{ localStorage.setItem('theme', next); }catch(e){}
  paintThemeIcon();
});

// lightbox
const lb = document.getElementById('lightbox');
grid.addEventListener('click', e=>{
  const card = e.target.closest('.card');
  if(!card) return;
  const img = card.dataset.img;
  lbImg.classList.toggle('has-img', !!img);
  lbImg.innerHTML = img ? `<img src="${encodeURI(photoPath(card.dataset.cat || "", img))}" alt="${altWork(card.dataset.title, card.dataset.cat)}">` : 'Image à venir';
  lbTitle.textContent = card.dataset.title;
  lbMeta.textContent = card.dataset.cat + ' — ' + card.dataset.year;
  lb.classList.add('open');
});
lb.querySelector('.close').addEventListener('click', ()=>lb.classList.remove('open'));
lb.addEventListener('click', e=>{ if(e.target===lb) lb.classList.remove('open'); });


// ===== PRO : menu, cookies, sécurité d'affichage =====
burgerBtn.addEventListener('click', ()=>setTimeout(()=>navMobileClose.focus(),60));
document.addEventListener('keydown', e=>{ if(e.key==='Escape' && document.body.classList.contains('nav-open')){ closeMobileNav(); burgerBtn.focus(); } });
(function(){
  const box=document.getElementById('consent'); let saved=null;
  try{ saved=localStorage.getItem('cookie-consent'); }catch(e){}
  const set=v=>{ box.classList.remove('show'); try{ localStorage.setItem('cookie-consent',v); }catch(e){}
    try{ gtag('consent','update',{analytics_storage:v}); }catch(e){} };
  if(!saved) setTimeout(()=>box.classList.add('show'),1200);
  cookieYes.onclick=()=>set('granted'); cookieNo.onclick=()=>set('denied');
  cookieManage.onclick=()=>box.classList.add('show');
})();
// si l'animation d'apparition ne se déclenche pas (navigateur intégré Instagram), tout afficher
setTimeout(()=>{ const r=document.querySelectorAll('.reveal'); if(r.length && !document.querySelector('.reveal.visible')) r.forEach(el=>el.classList.add('visible')); },2500);
