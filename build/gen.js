// Génère le contenu statique de index.html à partir des données de script.js
const fs = require('fs');
const path = require('path');
const dir = path.resolve(process.argv[2] || '.');
const BASE = 'https://josaphatngoma.netlify.app/';

const js = fs.readFileSync(path.join(dir, 'script.js'), 'utf8');
const cut = js.indexOf('// ---- rendu depuis CONTENT / WORKS / SERVICES ----');
const fakeDoc = { getElementById: () => null, querySelectorAll: () => [] };
const data = new Function('document', js.slice(0, cut) +
  '; return {CONTENT,ABOUT,CATEGORIES,WORKS,SERVICES,CV,REAL_POSTS,REAL_TESTI,PRODUCTS,photoPath,altWork,SHOP_IMAGES_DIR};')(fakeDoc);
const { CONTENT, ABOUT, CATEGORIES, WORKS, SERVICES, CV, REAL_POSTS, REAL_TESTI, PRODUCTS, photoPath, altWork, SHOP_IMAGES_DIR } = data;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
let h = fs.readFileSync(path.join(dir, 'build', 'index.template.html'), 'utf8');

function setInner(id, html) {
  const re = new RegExp('(<(\\w+)[^>]*\\bid="' + id + '"[^>]*>)(.*?)(</\\2>)', 's');
  if (!re.test(h)) throw new Error('id introuvable: ' + id);
  h = h.replace(re, (m, a, t, old, z) => a + html + z);
}
function setHref(id, url) {
  const re = new RegExp('(<a\\b[^>]*\\bid="' + id + '"[^>]*?href=")#(")');
  if (!re.test(h)) throw new Error('lien introuvable: ' + id);
  h = h.replace(re, (m, a, z) => a + esc(url) + z);
}

// --- textes simples ---
setInner('navName', esc(CONTENT.name));
setInner('heroName', esc(CONTENT.name));
setInner('heroRole', esc(CONTENT.role));
setInner('heroAiTitle', esc(CONTENT.aiTitle));
setInner('heroTagline', esc(CONTENT.tagline));
setInner('aboutName', esc(ABOUT.name));
setInner('bioText', ABOUT.paragraphs.map((t, i) => `<p${i === 0 ? ' class="lead"' : i === 3 ? ' class="key"' : ''}>${esc(t)}</p>`).join(''));
setInner('footName', '© ' + new Date().getFullYear() + ' ' + esc(CONTENT.name));

// --- liens de contact ---
setHref('emailBtn', 'mailto:' + CONTENT.email);
setHref('waBtn', CONTENT.whatsapp + '?text=' + encodeURIComponent('Bonjour, je souhaiterais discuter avec vous'));
[['igBtn', 'instagram'], ['liBtn', 'linkedin'], ['beBtn', 'behance'], ['fbBtn', 'facebook'], ['ttBtn', 'tiktok'],
 ['footIg', 'instagram'], ['footLi', 'linkedin'], ['footBe', 'behance'], ['footFb', 'facebook'], ['footTt', 'tiktok']]
  .forEach(([id, k]) => setHref(id, CONTENT[k]));

// --- filtres + grille "Tout" (même rendu que le JS) ---
setInner('filters', '<button class="active" data-c="all">Tout</button>' + CATEGORIES.map(c => `<button data-c="${esc(c)}">${esc(c)}</button>`).join(''));
const first = CATEGORIES.map(c => WORKS.find(w => w.category === c)).filter(Boolean);
setInner('grid', first.map(w => `
      <div class="card reveal" data-title="${esc(w.title)}" data-cat="${esc(w.category)}" data-year="${w.year}" data-img="${esc(w.img)}">
        <div class="ph">${w.img ? `<img src="${esc(encodeURI(photoPath(w.category, w.img)))}" alt="${esc(altWork(w.title, w.category))}" loading="lazy" decoding="async">` : 'Image à venir'}</div>
        <div class="info"><h3>${esc(w.title)}</h3><span>${esc(w.category)} — ${w.year}</span></div>
      </div>`).join(''));

// --- services / CV / blog / boutique / témoignages ---
setInner('svcGrid', SERVICES.map(s => `
  <div class="svc"><div class="n">${s.n}</div><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></div>
`).join(''));
setInner('cvGrid', Object.entries(CV).map(([label, items]) => `
  <div class="glass"><h3>${esc(label)}</h3><ul>${items.map(i => typeof i === 'string' ? `<li>${esc(i)}</li>` : `<li class="cv-entry"><strong>${esc(i.t)}</strong><span>${esc(i.s)}</span></li>`).join('')}</ul></div>
`).join(''));
setInner('blogGrid', REAL_POSTS.map(p => `
  <article class="post glass"><div class="eyebrow">${esc(p.cat)} — ${esc(p.date)}</div><h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p></article>
`).join(''));
setInner('shopGrid', PRODUCTS.map(pr => `
  <div class="product glass reveal">
    <div class="ph">${pr.img ? `<img src="${esc(encodeURI(SHOP_IMAGES_DIR + pr.img))}" alt="${esc(pr.title)} — boutique Josaphat N. Ngoma" loading="lazy" decoding="async">` : 'Image à venir'}</div>
    <div class="info">
      <h3>${esc(pr.title)}</h3>
      <div class="price">${esc(pr.price)}</div>
      <a href="${esc(CONTENT.whatsapp + '?text=' + encodeURIComponent('Bonjour, je suis intéressé par : *' + pr.title + '*'))}" target="_blank" rel="noopener">Commander</a>
    </div>
  </div>
`).join(''));
if (REAL_TESTI.length) { setInner('tText', esc(REAL_TESTI[0].text)); setInner('tAuthor', esc(REAL_TESTI[0].author)); }

// --- sections vides : masquées (et leurs liens de menu) ---
function hide(id) {
  h = h.replace(new RegExp('<section id="' + id + '"(?! hidden)'), '<section id="' + id + '" hidden');
  // menu bureau : on masque le <li> ; menu mobile : on masque le lien lui-même
  h = h.replace(new RegExp('<li><a href="#' + id + '">'), '<li hidden><a href="#' + id + '">');
  h = h.replace(new RegExp('<a href="#' + id + '" style='), '<a href="#' + id + '" hidden style=');
}
if (!REAL_POSTS.length) hide('blog');
if (!REAL_TESTI.length) hide('temoignages');

// --- nettoyage ---
h = h.replace(/<!-- =+ CONTENU À REMPLACER =+ -->\s*<!-- =+ FIN CONTENU =+ -->\s*/, '');
h = h.replace('<div class="ph2" id="lbImg">Image</div>', '<div class="ph2" id="lbImg"></div>');

// --- <head> SEO ---
const sameAs = [CONTENT.instagram, CONTENT.linkedin, CONTENT.behance, CONTENT.facebook];
const ld = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person', '@id': BASE + '#josaphat',
      name: 'Josaphat N. Ngoma', alternateName: 'Josaphat Nicolas Ngoma',
      jobTitle: 'Artiste plasticien et designer en communication visuelle',
      description: 'Artiste plasticien, illustrateur et designer en communication visuelle basé à Kinshasa : portraits, illustrations, identité visuelle, logos et flyers.',
      url: BASE, image: BASE + 'images/og-cover.jpg', email: 'mailto:' + CONTENT.email,
      address: { '@type': 'PostalAddress', addressLocality: 'Kinshasa', addressCountry: 'CD' },
      knowsAbout: ['Illustration', 'Portrait', 'Design graphique', 'Identité visuelle', 'Communication visuelle', 'Direction artistique', 'Rendu 3D', 'Intelligence artificielle appliquée au design'],
      sameAs
    },
    { '@type': 'WebSite', '@id': BASE + '#site', url: BASE, name: 'Josaphat N. Ngoma — Portfolio', inLanguage: 'fr', publisher: { '@id': BASE + '#josaphat' } }
  ]
};
const TITLE = 'Josaphat N. Ngoma | Artiste plasticien & designer graphique à Kinshasa';
const DESC = 'Portfolio de Josaphat N. Ngoma, artiste plasticien et designer en communication visuelle à Kinshasa : portraits, illustrations, logos, flyers et identité visuelle.';
const head = `<title>${esc(TITLE)}</title>
<meta name="description" content="${esc(DESC)}">
<meta name="author" content="Josaphat N. Ngoma">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#111113">
<link rel="canonical" href="${BASE}">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="icon" href="favicon-48.png" type="image/png" sizes="48x48">
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Josaphat N. Ngoma">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="${esc(TITLE)}">
<meta property="og:description" content="${esc(DESC)}">
<meta property="og:url" content="${BASE}">
<meta property="og:image" content="${BASE}images/og-cover.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Josaphat N. Ngoma, artiste plasticien et designer graphique à Kinshasa — aperçu de ses œuvres">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(TITLE)}">
<meta name="twitter:description" content="${esc(DESC)}">
<meta name="twitter:image" content="${BASE}images/og-cover.jpg">
<script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
</script>
<link rel="stylesheet" href="style.css">`;
const re = /<title>[\s\S]*?<link rel="stylesheet" href="style\.css">/;
if (!re.test(h)) throw new Error('head introuvable');
h = h.replace(re, () => head);
h = h.replace(/^\s+<!DOCTYPE/, '<!DOCTYPE');

fs.writeFileSync(path.join(dir, 'index.html'), h, 'utf8');
console.log('index.html généré,', h.length, 'octets');

// --- sitemap.xml (images uniques, date du jour) + robots.txt ---
const crypto = require('crypto');
function walk(d) { return fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]); }
const seen = new Set(); const imgs = [];
['images/portfolio', 'images/Produits'].forEach(sub => {
  const root = path.join(dir, sub);
  if (!fs.existsSync(root)) return;
  walk(root).filter(f => /\.(webp|jpe?g|png)$/i.test(f)).sort().forEach(f => {
    const k = crypto.createHash('md5').update(fs.readFileSync(f)).digest('hex');
    if (seen.has(k)) return; seen.add(k); imgs.push(path.relative(dir, f).split(path.sep).join('/'));
  });
});
const today = new Date().toISOString().slice(0, 10);
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n  <url>\n    <loc>' + BASE + '</loc>\n    <lastmod>' + today + '</lastmod>\n' +
  imgs.map(f => '    <image:image><image:loc>' + esc(BASE + encodeURI(f)) + '</image:loc></image:image>\n').join('') + '  </url>\n' + ['confidentialite', 'mentions-legales'].map(p => '  <url>\n    <loc>' + BASE + p + '</loc>\n    <lastmod>' + today + '</lastmod>\n  </url>\n').join('') + '</urlset>\n';
fs.writeFileSync(path.join(dir, 'sitemap.xml'), xml, 'utf8');
fs.writeFileSync(path.join(dir, 'robots.txt'), 'User-agent: *\nAllow: /\nDisallow: /build/\n\nSitemap: ' + BASE + 'sitemap.xml\n', 'utf8');
console.log('sitemap.xml:', imgs.length, 'images');
