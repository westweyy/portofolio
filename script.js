/* =====================================================
   DATA — ganti seluruh isi di sini dengan data Anda.
   Gambar: isi `images` (daftar URL/path, mis. "img/poster.jpg")
   dan `workflow.steps[].image`. Bila kosong, dipakai gambar
   sementara berwarna.
   ===================================================== */
const DATA = {
  name: "Muhammad Arif Fuad Safwan",
  initials: "AF",                             // monogram di kartu profil bila foto belum diisi
  photoUrl: "",                               // mis. "img/foto-saya.jpg" untuk foto profil asli
  collabLoop: false,                          // true = animasi Let's Collaborate berulang terus seperti di video contoh
  line: "Graphic Designer · 3D & Motion",
  bio: "Mahasiswa Desain Komunikasi Visual yang tertarik pada desain grafis, visualisasi 3D, branding, dan motion graphics. Senang mengubah ide menjadi pengalaman visual yang bersih, menarik, dan bermakna sambil terus belajar dan menjelajahi kemungkinan kreatif baru.",
  facts: [
    { k: "Based in", v: "Indonesia" },
    { k: "Focus", v: "Graphic Design · 3D · Motion" },
    { k: "Status", v: "Open for collaborations" }
  ],
  cvUrl: "",                                  // mis. "cv.pdf" agar tombol Unduh CV muncul
  contacts: [                                 // urutan: kolom kiri lalu kanan
    { icon: "@",  text: "ariffuadsafwan@gmail.com", href: "mailto:ariffuadsafwan@gmail.com" },
    { icon: "Pin", text: "Indonesia" },
    { icon: "WA", text: "+62 800-0000-0000",  href: "https://wa.me/620000000000" },
    { icon: "IG", text: "ariffuadsafwan",     href: "https://instagram.com/ariffuadsafwan" },
    { icon: "in", text: "Muhammad Arif Fuad Safwan", href: "https://linkedin.com/in/ariffuadsafwan" },
    { icon: "TT", text: "ariffuadsafwan",     href: "https://tiktok.com/@ariffuadsafwan" }
  ],
  education: [
    { title: "Nama Universitas", sub: "Desain Komunikasi Visual", period: "2025 – sekarang" },
    { title: "Nama SMA/SMK",     sub: "Jurusan Anda",            period: "2022 – 2025" }
  ],
  career: [
    { title: "Freelance",       sub: "Graphic Designer", period: "Sekarang" },
    { title: "Nama Perusahaan", sub: "Posisi Anda",      period: "2024 – 2025" }
  ],
  tools: [
    { name: "Photoshop",    abbr: "Ps", color: ["#2f6bff", "#0b2a8f"] },
    { name: "Illustrator",  abbr: "Ai", color: ["#ff9a3d", "#c2410c"] },
    { name: "After Effects", abbr: "Ae", color: ["#7a5cff", "#2b1b8f"] },
    { name: "Blender",      abbr: "Bl", color: ["#ffb02e", "#d97706"] },
    { name: "Figma",        abbr: "Fg", color: ["#3a3f4b", "#12141a"] },
    { name: "Clip Studio",  abbr: "Cs", color: ["#59606e", "#1e222b"] }
  ],
  skills: [
    { name: "Illustration" }, { name: "Motion Design" },
    { name: "3D Modeling", level: "basic" }, { name: "Motion Graphics" },
    { name: "Visual Effect", level: "basic" }, { name: "Color Grading" },
    { name: "Branding" }, { name: "Compositing" }
  ],
  sections: [
    {
      title: "College Work", sub: "Illustration · Poster Design", swap: false,
      items: [
        { layout: "wide", title: "Judul Buku Cerita", kicker: "Book Spread",
          desc: "", tools: ["Cs", "Ps"], colors: ["#2fbf6c", "#1c8f5a"], images: [] },
        { layout: "split", media: "poster", title: "Poster Kampanye", kicker: "Poster Design",
          desc: "Poster edukasi tentang bahaya membagikan informasi pribadi berlebihan di media sosial. Konsep visual memakai pencahayaan dramatis, elemen simbolik, dan palet gelap.",
          tools: ["Cs", "Ps"], colors: ["#2f5bff", "#0e1a5c"], images: [] }
      ]
    },
    {
      title: "Client Project", sub: "Selected Works", swap: true,
      items: [
        { layout: "split", rev: true, media: "phone", title: "Instagram Carousel", kicker: "Social Media Design",
          desc: "Rangkaian konten carousel untuk media sosial klien: seragam, mudah dikenali, dan cepat dipakai ulang.",
          tools: ["Ps"], colors: ["#22c55e", "#0f6b35"], images: [] },
        { layout: "row", media: "poster", title: "Advertising Poster Concepts", kicker: "Personal Project",
          desc: "", tools: ["Ps", "Bl"], colors: ["#6b7280", "#111827"], images: [], labels: ["Konsep A", "Konsep B", "Konsep C"] },
        { layout: "row", media: "phone", title: "Short-Form Video Editing", kicker: "Selected Works",
          desc: "", tools: ["Ae"], colors: ["#7a5cff", "#2b1b8f"], images: [], labels: ["Video 1", "Video 2", "Video 3"] }
      ]
    }
  ],
  workflow: {
    project: "Poster Kampanye",
    steps: [
      { name: "Background" }, { name: "Elemen" }, { name: "Compositing" },
      { name: "Karakter" }, { name: "Final" }
    ],
    colors: ["#2f5bff", "#0e1a5c"]
  }
};

/* ---------- Util ---------- */
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const toolMap = {}; DATA.tools.forEach((t) => (toolMap[t.abbr] = t));

/* Ikon garis SVG untuk kontak (kunci = nilai `icon` di DATA.contacts) */
const ICONS = {
  "@":  '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/>',
  "Pin": '<path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  "WA": '<path d="M4 20l1.4-4.2A8 8 0 1112 20a8 8 0 01-3.8-1z"/><path d="M9 9c0 3 3 6 6 6"/>',
  "IG": '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r=".6" fill="currentColor"/>',
  "in": '<path d="M7 10v7M7 7v.01M11 17v-4.5a2.5 2.5 0 015 0V17M11 10v7"/>',
  "TT": '<path d="M14 4v10.5a3.5 3.5 0 11-3.5-3.5"/><path d="M14 4c.4 2.4 2 4 4.5 4.2"/>'
};
function icon(k) {
  const p = ICONS[k];
  return p ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + "</svg>" : esc(k);
}
/* Gambar sementara SVG: kind = wide | poster | phone */
function art(kind, colors, label, seedN) {
  const dims = { wide: [800, 450], poster: [600, 800], phone: [420, 860] }[kind] || [800, 450];
  const [w, h] = dims;
  let s = ((seedN * 7919 + label.length * 131) % 2147483646) + 1;
  const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  let sh = "";
  for (let k = 0; k < 6; k++) {
    const op = (0.1 + r() * 0.22).toFixed(2);
    sh += k % 2
      ? '<circle cx="' + Math.round(r() * w) + '" cy="' + Math.round(r() * h) + '" r="' + Math.round(w * (0.08 + r() * 0.2)) + '" fill="#fff" opacity="' + op + '"/>'
      : '<rect x="' + Math.round(r() * w * 0.6) + '" y="' + Math.round(r() * h * 0.6) + '" width="' + Math.round(w * (0.2 + r() * 0.3)) + '" height="' + Math.round(h * (0.12 + r() * 0.25)) + '" rx="26" fill="#fff" opacity="' + op + '"/>';
  }
  const frame = kind === "phone"
    ? '<rect x="3" y="3" width="' + (w - 6) + '" height="' + (h - 6) + '" rx="54" fill="none" stroke="#0b0b0d" stroke-width="12"/><rect x="' + (w / 2 - 50) + '" y="20" width="100" height="24" rx="12" fill="#0b0b0d"/>'
    : "";
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + " " + h + '"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + colors[0] + '"/><stop offset="1" stop-color="' + colors[1] + '"/></linearGradient></defs>' +
    '<rect width="' + w + '" height="' + h + '" fill="url(#g)"/>' + sh + frame +
    '<text x="' + (kind === "phone" ? 40 : 36) + '" y="' + (h - 46) + '" font-family="Segoe UI,Arial,sans-serif" font-size="' + (kind === "wide" ? 30 : 34) + '" font-weight="700" fill="#fff" opacity=".93">' + esc(label) + "</text></svg>";
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
const miniTools = (abbrs) => '<div class="mini">Tools</div><div class="mini-tools">' + abbrs.map((a) => {
  const t = toolMap[a] || { name: a, color: ["#555", "#222"] };
  return '<b title="' + esc(t.name) + '" style="background:linear-gradient(135deg,' + t.color[0] + "," + t.color[1] + ')">' + esc(a) + "</b>";
}).join("") + "</div>";
const img = (src, alt, cls) => '<img class="' + (cls || "img") + '" src="' + esc(src) + '" alt="' + esc(alt) + '" decoding="async">';

/* ---------- Render ---------- */
document.title = DATA.name + " — Portfolio 2026";
$("heroName").textContent = DATA.name;
$("heroLine").textContent = DATA.line;
$("bio").textContent = DATA.bio;
$("footer").textContent = "© " + new Date().getFullYear() + " " + DATA.name;

$("connect").innerHTML = DATA.contacts.map((c) => {
  const inner = c.href ? '<a href="' + esc(c.href) + '" target="_blank" rel="noopener">' + esc(c.text) + "</a>" : esc(c.text);
  return '<li><i class="ico" aria-hidden="true" style="font-style:normal">' + icon(c.icon) + "</i><span>" + inner + "</span></li>";
}).join("");
/* Pil kontak di sekeliling judul "Let's Collaborate" (posisi dalam persen; desktop = x,y; ponsel = mx,my) */
const CHIP_POS = {
  "Pin": { d: [58, 17], m: [70, 9] },  "WA": { d: [22, 30], m: [30, 19] }, "@": { d: [80, 35], m: [68, 30] },
  "in":  { d: [50, 72], m: [32, 70] }, "TT": { d: [28, 84], m: [70, 80] }, "IG": { d: [68, 86], m: [38, 90] }
};
$("chips").innerHTML = DATA.contacts.map((c, i) => {
  const fb = { d: [18 + (i * 64) % 70, 20 + (i * 37) % 64], m: [25 + (i * 40) % 55, 12 + (i * 23) % 78] };   // cadangan untuk ikon di luar daftar
  const pos = CHIP_POS[c.icon] || fb;
  const inner = '<span class="pi" aria-hidden="true">' + icon(c.icon) + "</span><span>" + esc(c.text) + "</span>";
  const pill = c.href ? '<a class="pill" href="' + esc(c.href) + '" target="_blank" rel="noopener">' + inner + "</a>" : '<span class="pill">' + inner + "</span>";
  return '<li class="chip" style="--x:' + pos.d[0] + "%;--y:" + pos.d[1] + "%;--mx:" + pos.m[0] + "%;--my:" + pos.m[1] + "%;--d:" + (1.05 + i * 0.32).toFixed(2) + "s;--od:" + (i * 0.06).toFixed(2) + 's"><div class="pill-wrap" style="--fd:' + (-i * 0.9).toFixed(1) + 's">' + pill + "</div></li>";
}).join("");
$("chips").querySelectorAll(".pill").forEach((el) => el.style.setProperty("--fd", (-Math.random() * 4).toFixed(1) + "s"));

if (DATA.cvUrl) { const cv = $("cv"); cv.hidden = false; cv.href = DATA.cvUrl; }

/* Urutan animasi: muncul saat bagian ini terlihat; hilang saat keluar layar sehingga diputar ulang saat kembali.
   DATA.collabLoop = true membuatnya berulang terus seperti di video contoh. */
(function collabAnim() {
  const sec = $("contact"), stage = $("stage");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { stage.classList.add("on", "static"); return; }
  let timer = 0;
  const play = () => stage.classList.add("on"), stop = () => stage.classList.remove("on");
  function loop() { timer = setTimeout(() => { stop(); timer = setTimeout(() => { play(); loop(); }, 1500); }, 7500); }
  new IntersectionObserver((en) => {
    clearTimeout(timer);
    if (en[0].isIntersecting) { play(); if (DATA.collabLoop) loop(); } else { stop(); }
  }, { threshold: 0.35 }).observe(sec);
})();

const tl = (arr) => arr.map((e) => "<li><strong>" + esc(e.title) + "</strong><small>" + esc(e.sub) + "</small><small>" + esc(e.period) + "</small></li>").join("");
$("education").innerHTML = tl(DATA.education);
$("career").innerHTML = tl(DATA.career);
$("tools").innerHTML = DATA.tools.map((t) =>
  '<div class="tool"><div class="tile" style="background:linear-gradient(145deg,' + t.color[0] + "," + t.color[1] + ')">' + esc(t.abbr) + "</div>" + esc(t.name) + "</div>").join("");
$("skills").innerHTML = DATA.skills.map((s) => "<li>" + esc(s.name) + (s.level ? " <em>(" + esc(s.level) + ")</em>" : "") + "</li>").join("");

let n = 0;
function renderItem(it) {
  const kind = it.media || "wide";
  const imgs = (it.images && it.images.length) ? it.images : null;
  if (it.layout === "wide") {
    const src = imgs ? imgs[0] : art("wide", it.colors, it.title, ++n);
    return '<article class="work wide reveal">' + img(src, it.title) + '<p class="cap">' + esc(it.kicker) + "</p></article>";
  }
  if (it.layout === "split") {
    const src = imgs ? imgs[0] : art(kind, it.colors, it.title, ++n);
    return '<article class="work split' + (it.rev ? " rev" : "") + ' reveal"><div class="media">' + img(src, it.title) + "</div>" +
      '<div class="txt"><div class="kicker">' + esc(it.kicker) + "</div><h3>" + esc(it.title) + "</h3>" +
      (it.desc ? "<p>" + esc(it.desc) + "</p>" : "") + miniTools(it.tools) + "</div></article>";
  }
  const three = [0, 1, 2].map((i) => {
    const src = imgs && imgs[i] ? imgs[i] : art(kind, it.colors, (it.labels && it.labels[i]) || it.title, ++n);
    return img(src, it.title + " " + (i + 1));
  }).join("");
  return '<article class="work row reveal"><div class="head"><h3>' + esc(it.title) + "</h3><span>" + esc(it.kicker) + '</span></div><div class="row3">' + three + "</div></article>";
}
$("works").innerHTML = DATA.sections.map((sec, si) =>
  '<section class="block"><div class="title-wrap reveal"><div class="t"><p class="eyebrow">' + String(si + 1).padStart(2, "0") + '</p><h2 class="title">' + esc(sec.title) + '</h2><p class="sub">' + esc(sec.sub) + "</p></div>" +
  '<div class="orbs' + (sec.swap ? " swap" : "") + '" aria-hidden="true"><span class="orb big"></span><span class="orb small"></span></div></div>' +
  sec.items.map(renderItem).join("") + "</section>").join("");

/* Proses kerja bersifat opsional: hanya dirender bila section #workflow ada di HTML. */
if ($("wfSub") && $("wf") && DATA.workflow) {
  $("wfSub").textContent = DATA.workflow.project;
  $("wf").innerHTML = DATA.workflow.steps.map((s, i) =>
    "<figure>" + img(s.image || art("poster", DATA.workflow.colors, String(i + 1).padStart(2, "0"), 40 + i), s.name + " — " + DATA.workflow.project) + "<figcaption>" + esc(s.name) + "</figcaption></figure>").join("");
}

const io = new IntersectionObserver((en) => {
  en.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- Lightbox: klik gambar karya untuk memperbesar ---------- */
(function lightbox() {
  const lb = $("lb"), lbImg = $("lbImg"), lbCap = $("lbCap"), lbCount = $("lbCount");
  const prevB = $("lbPrev"), nextB = $("lbNext"), closeB = $("lbClose");
  let list = [], idx = 0, opener = null, sx = 0;

  function show() {
    const im = list[idx];
    lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt;
    lbCap.textContent = im.alt;
    lbCount.textContent = list.length > 1 ? (idx + 1) + " / " + list.length : "";
    prevB.hidden = nextB.hidden = list.length < 2;
  }
  function open(el) {
    const g = el.closest(".work, .wf");
    list = Array.from(g.querySelectorAll("img")); idx = Math.max(0, list.indexOf(el)); opener = el;
    lb.hidden = false; document.body.style.overflow = "hidden";
    show(); closeB.focus();
  }
  function close() {
    lb.hidden = true; document.body.style.overflow = ""; lbImg.removeAttribute("src");
    if (opener) opener.focus({ preventScroll: true });
  }
  function step(d) { if (list.length < 2) return; idx = (idx + d + list.length) % list.length; show(); }

  document.querySelectorAll(".work img, .wf img").forEach((im) => {
    im.classList.add("zoomable"); im.tabIndex = 0; im.setAttribute("role", "button");
    im.setAttribute("aria-label", "Perbesar gambar: " + im.alt);
    im.addEventListener("click", () => open(im));
    im.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(im); } });
  });
  prevB.addEventListener("click", () => step(-1));
  nextB.addEventListener("click", () => step(1));
  closeB.addEventListener("click", close);
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  lb.addEventListener("touchstart", (e) => { sx = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); }, { passive: true });
  addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "Tab") {                       // jaga fokus tetap di dalam lightbox
      e.preventDefault();
      const f = [closeB, prevB, nextB].filter((b) => !b.hidden);
      const i = f.indexOf(document.activeElement);
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
})();

/* ---------- Hero 3D (Three.js): huruf "Portfolio" dan objek melayang ---------- */
/* ---------- Helper 3D bersama ---------- */
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const easeOutBack = (x) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
const glossy = (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.3, metalness: 0.1 });

// Kubus berujung membulat (seperti ikon aplikasi)
function roundedBox(size, r, seg) {
  const g = new THREE.BoxGeometry(size, size, size, seg, seg, seg);
  const pos = g.attributes.position, nor = g.attributes.normal;
  const h = size / 2 - r, v = new THREE.Vector3(), inner = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    inner.set(clamp(v.x, -h, h), clamp(v.y, -h, h), clamp(v.z, -h, h));
    v.sub(inner).normalize();
    nor.setXYZ(i, v.x, v.y, v.z);
    v.multiplyScalar(r).add(inner);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  return g;
}

function hero3D() {
  if (typeof THREE === "undefined") return;               // halaman tetap berfungsi tanpa 3D
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = $("heroCanvas");
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" }); }
  catch (e) { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 720 ? 1.5 : 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 13);
  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const key = new THREE.DirectionalLight(0xffffff, 0.95); key.position.set(4, 6, 7); scene.add(key);
  const rim = new THREE.PointLight(0xff7a2f, 0.6, 40); rim.position.set(-7, -3, 5); scene.add(rim);
  const glow = new THREE.PointLight(0x2f5bff, 0.55, 40); glow.position.set(7, 4, 4); scene.add(glow);

  const objs = new THREE.Group(), lets = new THREE.Group();
  scene.add(objs, lets);

  const dust = [];
  [0x2f5bff, 0xff7a2f, 0x2fbf6c].forEach((color, ci) => {
    const count = 46, pos = new Float32Array(count * 3), seed = [];
    let s = 97 + ci * 31; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rnd() * 2 - 1) * 11;
      pos[i * 3 + 1] = (rnd() * 2 - 1) * 7;
      pos[i * 3 + 2] = -2 - rnd() * 7;
      seed.push({ ph: rnd() * Math.PI * 2, sp: 0.4 + rnd() * 1.2 });
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos.slice(), 3));
    const mat = new THREE.PointsMaterial({ color, size: 0.055 + ci * 0.012, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
    const cloud = new THREE.Points(geo, mat);
    cloud.userData = { base: pos, seed, dir: ci % 2 ? -1 : 1 };
    dust.push(cloud); scene.add(cloud);
  });

  const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(6.2, 1), new THREE.MeshBasicMaterial({ color: 0x1b1a19, wireframe: true, transparent: true, opacity: 0.05, depthWrite: false }));
  shell.position.z = -5; scene.add(shell);

  const halo = new THREE.Mesh(new THREE.TorusGeometry(5.4, 0.012, 8, 180), new THREE.MeshBasicMaterial({ color: 0x2f5bff, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending }));
  halo.rotation.x = Math.PI / 2.3; halo.position.z = -4; scene.add(halo);
  const halo2 = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.01, 8, 160), new THREE.MeshBasicMaterial({ color: 0xff7a2f, transparent: true, opacity: 0.18, depthWrite: false, blending: THREE.AdditiveBlending }));
  halo2.rotation.x = Math.PI / 1.6; halo2.rotation.y = 0.5; halo2.position.z = -3.5; scene.add(halo2);

  // ---- Objek di sekitar kata (posisi dalam koordinat layar ternormalisasi -1..1) ----
  const pen = new THREE.Group();
  const penBody = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3, 20), glossy(0x1b1a19));
  const penTip = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.55, 20), glossy(0xff7a2f));
  penTip.position.y = -1.77; penTip.rotation.z = Math.PI;
  pen.add(penBody, penTip); pen.rotation.z = 0.75;

  const defs = [
    { m: new THREE.Mesh(roundedBox(1.5, 0.28, 8), glossy(0x2f5bff)), nx: -0.78, ny: 0.60, z: -0.5, s: 1.0,  spin: [0.30, 0.42] },
    { m: new THREE.Mesh(roundedBox(1.2, 0.24, 8), glossy(0x2a2928)), nx:  0.64, ny: 0.70, z: -1.5, s: 0.85, spin: [-0.25, 0.35], hide: true },
    { m: new THREE.Mesh(roundedBox(1.4, 0.26, 8), glossy(0xff7a2f)), nx:  0.74, ny: -0.50, z: 0.4, s: 0.95, spin: [0.28, -0.38] },
    { m: new THREE.Mesh(new THREE.SphereGeometry(0.72, 40, 28), glossy(0xff7a2f)), nx: -0.62, ny: -0.50, z: 0.8, s: 1.0, spin: [0, 0.2] },
    { m: new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 22), glossy(0x2f5bff)), nx: -0.12, ny: 0.78, z: -1, s: 0.9, spin: [0, 0.2] },
    { m: new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.24, 20, 48), glossy(0x1b1a19)), nx: 0.42, ny: -0.52, z: 0, s: 0.9, spin: [0.45, 0.30] },
    { m: new THREE.Mesh(new THREE.OctahedronGeometry(0.72, 0), glossy(0x2fbf6c)), nx: -0.90, ny: 0.02, z: -0.5, s: 0.85, spin: [0.30, 0.50], hide: true },
    { m: pen, nx: 0.75, ny: 0.30, z: 0.2, s: 0.95, spin: [0, 0], hide: true, noSpin: true }
  ];
  defs.forEach((d, i) => {
    d.delay = 0.55 + i * 0.09; d.ph = i * 1.7; d.sp = 0.55 + (i % 3) * 0.15;
    d.orbitA = 0.16 + (i % 4) * 0.08;
    d.orbitS = (0.12 + (i % 5) * 0.03) * (i % 2 ? -1 : 1);
    d.orbitP = i * 1.35;
    d.m.scale.setScalar(0.0001); objs.add(d.m);
  });

  // ---- Kata "Portfolio" sebagai teks 3D sungguhan (extruded) ----
  const WORD = "Portfolio";
  const titleGroup = new THREE.Group();
  lets.add(titleGroup);
  let titleMesh = null, titleWidth = 1;

  try {
    if (THREE.Font && window.PORTFOLIO_FONT) {
      const font = new THREE.Font(window.PORTFOLIO_FONT);
      const geo = new THREE.TextGeometry(WORD, {
        font: font, size: 1.35, height: 0.38, curveSegments: 9,
        bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 4
      });
      geo.computeBoundingBox();
      titleWidth = geo.boundingBox.max.x - geo.boundingBox.min.x;
      geo.center();
      const front = new THREE.MeshStandardMaterial({ color: 0x1b1a19, roughness: 0.22, metalness: 0.42 });
      const side = new THREE.MeshStandardMaterial({ color: 0x2f5bff, roughness: 0.3, metalness: 0.55 });
      titleMesh = new THREE.Mesh(geo, [front, side]);
      titleMesh.position.y = 0.1;
      titleMesh.scale.setScalar(0.0001);
      titleGroup.add(titleMesh);
    }
  } catch (e) { titleMesh = null; }
  if (titleMesh) canvas.dataset.title3d = "on";

  let visW = 1, visH = 1, narrow = false;
  function layout() {
    const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    visH = 2 * Math.tan((camera.fov / 2) * Math.PI / 180) * camera.position.z; visW = visH * camera.aspect;
    narrow = camera.aspect < 0.9;
    const sc = clamp(visW / 12, 0.55, 1);
    defs.forEach((d) => {
      d.m.visible = !(narrow && d.hide);
      d.bx = d.nx * visW / 2; d.by = d.ny * (narrow && d.ny < -0.4 ? 0.78 : 1) * visH / 2; d.bs = d.s * sc;
    });
    if (titleMesh) {
      const fit = (visW * (narrow ? 0.9 : 0.82)) / titleWidth;
      titleGroup.scale.setScalar(Math.min(narrow ? 1.1 : 1.35, fit));
      titleGroup.position.y = narrow ? 0.05 : 0.15;
    }
    dirty = true;
  }

  let mx = 0, my = 0, running = true, dirty = true, t = 0, burst = -10;
  addEventListener("pointermove", (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });
  addEventListener("pointerdown", () => { burst = t; });
  new IntersectionObserver((en) => { running = en[0].isIntersecting; if (running) dirty = true; }, { threshold: 0 }).observe($("hero"));
  addEventListener("resize", layout);
  layout();

  const clock = new THREE.Clock();
  function update(dt) {
    t += dt;
    const k = 1 - Math.exp(-6 * dt);
    objs.rotation.y += (mx * 0.14 - objs.rotation.y) * k;
    objs.rotation.x += (my * 0.09 - objs.rotation.x) * k;
    objs.position.x += (-mx * 0.7 - objs.position.x) * k;
    objs.position.y += (my * 0.4 - objs.position.y) * k;
    lets.position.x += (mx * 0.35 - lets.position.x) * k;
    lets.position.y += (-my * 0.22 - lets.position.y) * k;

    const age = t - burst;
    const pop = reduce || age < 0 || age > 1 ? 0 : Math.sin(age * Math.PI) * (1 - age);

    rim.position.set(Math.sin(t * 0.5) * 7, Math.cos(t * 0.42) * 4 - 1, 5);
    rim.intensity = 0.55 + Math.sin(t * 1.1) * 0.18;
    glow.position.set(Math.cos(t * 0.45) * 7, Math.sin(t * 0.38) * 4 + 1, 4);
    glow.intensity = 0.45 + Math.cos(t * 0.9) * 0.16;

    shell.rotation.x = t * 0.035; shell.rotation.y = t * 0.05;
    halo.rotation.z = t * 0.18; halo.material.opacity = 0.16 + Math.sin(t * 0.8) * 0.06;
    halo2.rotation.z = -t * 0.24; halo2.rotation.y = 0.5 + Math.sin(t * 0.22) * 0.25;
    halo2.material.opacity = 0.14 + Math.cos(t * 0.7) * 0.05;

    dust.forEach((cloud, ci) => {
      const u = cloud.userData, arr = cloud.geometry.attributes.position.array;
      for (let i = 0; i < u.seed.length; i++) {
        const ph = u.seed[i].ph, sp = u.seed[i].sp;
        arr[i * 3] = u.base[i * 3] + Math.cos(t * sp * 0.7 + ph) * 0.2;
        arr[i * 3 + 1] = u.base[i * 3 + 1] + Math.sin(t * sp + ph) * 0.38;
      }
      cloud.geometry.attributes.position.needsUpdate = true;
      cloud.rotation.y = t * 0.02 * u.dir;
      cloud.material.opacity = 0.38 + 0.24 * Math.sin(t * 0.7 + ci);
    });

    defs.forEach((d) => {
      if (!d.m.visible) return;
      const p = reduce ? 1 : clamp((t - d.delay) / 0.9, 0, 1);
      const e = p === 0 ? 0 : easeOutBack(p);
      const fl = reduce ? 0 : Math.sin(t * d.sp + d.ph) * 0.28 * p;
      const orbit = t * d.orbitS + d.orbitP;
      const ox = reduce ? 0 : Math.cos(orbit) * d.orbitA;
      const oy = reduce ? 0 : Math.sin(orbit * 1.25) * d.orbitA * 0.7;
      const oz = reduce ? 0 : Math.sin(orbit * 0.8) * 0.32;
      const breathe = reduce ? 1 : 1 + Math.sin(t * 1.2 + d.ph) * 0.05;
      d.m.position.set(d.bx + ox + d.nx * pop * 0.35, d.by + fl + oy + d.ny * pop * 0.25, d.z + oz);
      d.m.scale.setScalar(Math.max(0.0001, d.bs * e * breathe * (1 + pop * 0.3)));
      if (!reduce && !d.noSpin) {
        d.m.rotation.x += d.spin[0] * dt;
        d.m.rotation.y += d.spin[1] * dt;
        d.m.rotation.z += Math.sin(t * 0.7 + d.ph) * 0.06 * dt;
      }
    });

    if (titleMesh) {
      const p = reduce ? 1 : clamp((t - 0.3) / 1.05, 0, 1);
      const e = easeOutCubic(p);
      const eBack = easeOutBack(p);
      titleMesh.scale.setScalar(Math.max(0.0001, eBack * (1 + pop * 0.05)));
      titleMesh.position.y = 0.1 + (1 - e) * 4.5 + Math.sin(t * 0.8) * 0.08 + pop * 0.15;
      titleMesh.position.z = reduce ? 0 : Math.sin(t * 0.6) * 0.18;
      const ry = mx * 0.6 + (reduce ? 0 : Math.sin(t * 0.5) * 0.32);
      const rx = -my * 0.35 + (reduce ? 0 : Math.sin(t * 0.37) * 0.12);
      titleMesh.rotation.y += (ry - titleMesh.rotation.y) * k;
      titleMesh.rotation.x += (rx - titleMesh.rotation.x) * k;
      titleMesh.rotation.z = (1 - e) * -0.45 + (reduce ? 0 : Math.sin(t * 0.5) * 0.02);
    }
  }

  function frame() {
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!running || document.hidden) return;
    if (reduce) { if (dirty) { update(0); renderer.render(scene, camera); dirty = false; } return; }
    update(dt);
    renderer.render(scene, camera);
  }
  frame();
}

/* Jalankan 3D setelah Poppins siap agar huruf "Portfolio" memakai font yang benar.
   Bila font gagal dimuat (offline/lambat), tetap jalan setelah maksimal 2,5 detik. */
(function startHero() {
  const wait = (document.fonts && document.fonts.load)
    ? Promise.race([document.fonts.load("800 100px Poppins"), new Promise((r) => setTimeout(r, 2500))])
    : Promise.resolve();
  wait.catch(() => {}).then(() => { hero3D(); });
})();