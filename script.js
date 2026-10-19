// Map location — swap this one query to move the pin; the embed and the
// address links (contact card + footer) all derive from it.
const MAP_QUERY = "Haji Chowk Bahria Enclave Islamabad";
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=15&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

// Gallery photos — add a line here and it appears on the page.
const gallery = [
  { file: "cleanliness-drive-1.jpg", title: "Cleanliness Drive" },
  { file: "cleanliness-drive-2.jpg", title: "Small hands, big dreams, one team." },
  { file: "cleanliness-drive-3.jpg", title: "Clearing the roadside" },
  { file: "independence-day.jpg", title: "Independence Day celebration" },
  { file: "convocation-2023-1.jpg", title: "Unlocking creativity on the stage." },
  { file: "convocation-2023-2.jpg", title: "Launching our little solar system into the future — Convocation 2023-24" },
  { file: "convocation-2023-4.jpg", title: "Graduates with their certificates, Convocation 2023-24" },
  { file: "convocation-2016-1.jpg", title: "Convocation 2016-17" },
  { file: "convocation-2016-2.jpg", title: "Convocation 2016-17" },
  { file: "convocation-2016-3.jpg", title: "Convocation 2016-17" },
  { file: "annual-day-2017.jpg", title: "Hope Valley Trust Annual Day 2017-18" },
  { file: "speech-contest-2017.jpg", title: "Speech Contest 2017-18" },
  { file: "arts-science-1.jpg", title: "Arts & Science Exhibition 2025-26" },
  { file: "arts-science-2.jpg", title: "Arts & Science Exhibition 2025-26" },
  { file: "talent-hunt-week.jpg", title: "Talent Hunt Week" },
  { file: "insect-museum-1.jpg", title: "Trip to Insect Museum" },
  { file: "insect-museum-2.jpg", title: "Trip to Insect Museum" },
  { file: "eye-camp.jpg", title: "Free Eye Camp" },
  { file: "computer-lab.jpg", title: "Computer Lab" },
  { file: "bank-trip.jpg", title: "Educational Trip to the Bank" },
  { file: "zoo-trip.jpg", title: "Trip to the Zoo" },
];

const nav = document.getElementById("nav");
const toggle = document.getElementById("nav-toggle");
const tabs = document.getElementById("nav-tabs");
const socials = document.querySelector(".socials");
const wide = matchMedia("(min-width:900px)");
const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;

const place = () => (wide.matches ? document.getElementById("nav-top") : tabs).append(socials);
wide.addEventListener("change", place);
place();

addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 8), { passive: true });

const close = () => {
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
};

toggle.addEventListener("click", () =>
  toggle.setAttribute("aria-expanded", nav.classList.toggle("is-open"))
);

tabs.addEventListener("click", e => { if (e.target.closest("a")) close(); });
document.addEventListener("click", e => { if (!nav.contains(e.target)) close(); });

const links = [...document.querySelectorAll(".tabs a")];
const spy = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting)
      links.forEach(l => l.classList.toggle("is-active", l.hash === "#" + entry.target.id));
  }),
  { rootMargin: "-50% 0px" }
);
document.querySelectorAll("main section").forEach(s => spy.observe(s));

const hero = document.querySelector(".hero");
const slides = [...hero.querySelectorAll(".hero-slides img")];
const dots = [...hero.querySelectorAll(".hero-dots button")];
let at = 0, timer;

const show = n => {
  at = (n + slides.length) % slides.length;
  slides.forEach((img, k) => img.classList.toggle("is-active", k === at));
  dots.forEach((dot, k) => dot.classList.toggle("is-active", k === at));
};
const play = () => calm || (timer = setInterval(() => show(at + 1), 6000));
const stop = () => clearInterval(timer);

hero.addEventListener("mouseenter", stop);
hero.addEventListener("mouseleave", play);
hero.querySelector(".prev").addEventListener("click", () => show(at - 1));
hero.querySelector(".next").addEventListener("click", () => show(at + 1));
dots.forEach((dot, k) => dot.addEventListener("click", () => show(k)));

let swipe = 0;
hero.addEventListener("touchstart", e => (swipe = e.touches[0].clientX), { passive: true });
hero.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - swipe;
  if (Math.abs(dx) > 40) show(at + (dx < 0 ? 1 : -1));
}, { passive: true });

play();

const reveal = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
  const replay = !entry.target.classList.contains("reveal");
  if (entry.isIntersecting) {
    entry.target.classList.add("is-in");
    if (!replay) obs.unobserve(entry.target);
  } else if (replay) {
    entry.target.classList.remove("is-in");
  }
}), { rootMargin: "0px 0px -10%" });
document.querySelectorAll(".reveal,.reveal-right,.reveal-left").forEach(el => reveal.observe(el));

const rows = document.getElementById("gallery-rows");
const speeds = ["60s", "48s", "54s"];

const tile = (p, i) =>
  `<button class="gtile" type="button" data-i="${i}" style="--src:url(images/gallery/${p.file})">
     <img src="images/gallery/${p.file}" alt="${p.title}" loading="lazy">
     <span>${p.title}</span>
   </button>`;

rows.innerHTML = speeds.map((t, r) => {
  const strip = gallery.map(tile).filter((_, i) => i % 3 === r).join("");
  const copy = strip.replaceAll("<button", '<button tabindex="-1" aria-hidden="true"');
  return `<div class="grow"><div class="gtrack" style="--t:${t}">${strip}${copy}</div></div>`;
}).join("");

const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector("img");
const lbCap = lb.querySelector(".lb-cap");
let shot = 0, opener;

const openShot = i => {
  shot = (i + gallery.length) % gallery.length;
  lbImg.src = "images/gallery/" + gallery[shot].file;
  lbImg.alt = lbCap.textContent = gallery[shot].title;
  if (lb.hidden) { opener = document.activeElement; lb.hidden = false; lb.querySelector(".lb-close").focus(); }
  lbImg.animate([{ opacity: 0 }, { opacity: 1 }], 250);
};

const closeLb = () => { lb.hidden = true; opener?.focus(); };

rows.addEventListener("click", e => {
  const btn = e.target.closest(".gtile");
  if (btn) openShot(+btn.dataset.i);
});

document.getElementById("gallery-more").addEventListener("click", () => openShot(0));

lb.addEventListener("click", e => {
  if (e.target.closest(".lb-prev")) openShot(shot - 1);
  else if (e.target.closest(".lb-next")) openShot(shot + 1);
  else if (!e.target.closest(".lb-body")) closeLb();
});

addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowLeft") openShot(shot - 1);
  if (e.key === "ArrowRight") openShot(shot + 1);
});

let lbX = 0;
lb.addEventListener("touchstart", e => (lbX = e.touches[0].clientX), { passive: true });
lb.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - lbX;
  if (Math.abs(dx) > 40) openShot(shot + (dx < 0 ? 1 : -1));
}, { passive: true });

/* orbit showcase */
const ring = document.getElementById("orbit-ring");
const picks = gallery.slice(0, 8);

ring.innerHTML = picks.map((p, i) =>
  `<button class="orb" type="button" data-i="${i}" style="--a:${(i / picks.length) * 360}deg" aria-label="${p.title}">
     <img src="images/gallery/${p.file}" alt="" loading="lazy">
   </button>`).join("");

const orbs = [...ring.children];
const shotEl = document.getElementById("featured-shot");
const capEl = document.getElementById("featured-cap");
let orb = 0;

const showOrb = i => {
  orb = (i + picks.length) % picks.length;
  const p = picks[orb];
  shotEl.style.setProperty("--src", `url(images/gallery/${p.file})`);
  shotEl.innerHTML = `<img src="images/gallery/${p.file}" alt="${p.title}">`;
  capEl.textContent = p.title;
  orbs.forEach((o, k) => o.classList.toggle("on", k === orb));
  if (!calm) shotEl.firstElementChild.animate(
    [{ opacity: 0, transform: "translateX(60px)" }, { opacity: 1, transform: "none" }],
    { duration: 1400, easing: "ease-out" });
};

ring.addEventListener("click", e => {
  const btn = e.target.closest(".orb");
  if (btn) showOrb(+btn.dataset.i);
});

showOrb(0);
if (!calm) setInterval(() => showOrb(orb + 1), 6000);

document.getElementById("contact-map").src = MAP_SRC;
document.querySelectorAll("[data-map]").forEach(a => (a.href = MAP_LINK));

const toast = document.getElementById("toast");
new IntersectionObserver(([e], obs) => {
  if (!e.isIntersecting) return;
  obs.disconnect();
  toast.classList.add("is-in");
  setTimeout(() => {
    toast.classList.add("is-out");
    setTimeout(() => toast.remove(), 600);
  }, 4600);
}, { threshold: 0.5 }).observe(toast);

const copyIban = document.getElementById("copy-iban");
copyIban.addEventListener("click", async () => {
  await navigator.clipboard.writeText(copyIban.previousElementSibling.textContent);
  copyIban.textContent = "Copied!";
  copyIban.classList.add("is-done");
  setTimeout(() => { copyIban.textContent = "Copy"; copyIban.classList.remove("is-done"); }, 2000);
});
