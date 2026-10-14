// Gallery photos — add a line here and it appears on the page.
const gallery = [
  { file: "cleanliness-drive-1.jpg", title: "14 August Cleanliness Drive" },
  { file: "cleanliness-drive-2.jpg", title: "Whole school with handmade placards" },
  { file: "cleanliness-drive-3.jpg", title: "Clearing the roadside" },
  { file: "convocation-2023-1.jpg", title: "Jungle tableau, Convocation 2023-24" },
  { file: "convocation-2023-2.jpg", title: "Solar system performance, Convocation 2023-24" },
  { file: "convocation-2023-3.jpg", title: "Graduates in cap and gown, Convocation 2023-24" },
  { file: "convocation-2016-1.jpg", title: "Graduates on stage, Convocation 2016-17" },
  { file: "convocation-2016-2.jpg", title: "Welcome performance, Convocation 2016-17" },
  { file: "convocation-2016-3.jpg", title: "Convocation Ceremony 2016-17" },
  { file: "annual-day-2017.jpg", title: "Hope Valley Trust Annual Day 2017-18" },
  { file: "speech-contest-2017.jpg", title: "Speech Contest 2017-18" },
  { file: "arts-science-1.jpg", title: "Prize giving, Arts & Science Exhibition 2025-26" },
  { file: "arts-science-2.jpg", title: "Presenting her model, Arts & Science Exhibition 2025-26" },
  { file: "talent-hunt-week.jpg", title: "Talent Hunt Week" },
  { file: "insect-museum-1.jpg", title: "Insect Museum Trip" },
  { file: "insect-museum-2.jpg", title: "Looking through microscopes, Insect Museum Trip" },
  { file: "eye-camp.jpg", title: "Eye Camp at Hope Valley School" },
  { file: "computer-lab.jpg", title: "The computer lab" },
  { file: "bank-trip.jpg", title: "Educational Trip to the Bank" },
  { file: "zoo-trip.jpg", title: "Trip to the Zoo" },
];

const nav = document.getElementById("nav");
const toggle = document.getElementById("nav-toggle");
const tabs = document.getElementById("nav-tabs");
const socials = document.querySelector(".socials");
const wide = matchMedia("(min-width:900px)");

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
const play = () => (timer = setInterval(() => show(at + 1), 6000));
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

const grid = document.getElementById("gallery-grid");
grid.innerHTML = gallery.map((p, i) =>
  `<button class="shot${i > 8 ? " extra" : ""}" type="button" data-i="${i}">
     <img src="images/gallery/${p.file}" alt="${p.title}" loading="lazy">
     <span>${p.title}</span>
   </button>`).join("");

document.getElementById("gallery-more").addEventListener("click", e => {
  grid.classList.add("show-all");
  e.currentTarget.remove();
});

const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector("img");
const lbCap = lb.querySelector(".lb-cap");
let shot = 0;

const openShot = i => {
  shot = (i + gallery.length) % gallery.length;
  lbImg.src = "images/gallery/" + gallery[shot].file;
  lbImg.alt = lbCap.textContent = gallery[shot].title;
  lb.hidden = false;
};

grid.addEventListener("click", e => {
  const btn = e.target.closest(".shot");
  if (btn) openShot(+btn.dataset.i);
});

lb.addEventListener("click", e => {
  if (e.target.closest(".lb-prev")) openShot(shot - 1);
  else if (e.target.closest(".lb-next")) openShot(shot + 1);
  else if (!e.target.closest(".lb-body")) lb.hidden = true;
});

addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") lb.hidden = true;
  if (e.key === "ArrowLeft") openShot(shot - 1);
  if (e.key === "ArrowRight") openShot(shot + 1);
});

let lbX = 0;
lb.addEventListener("touchstart", e => (lbX = e.touches[0].clientX), { passive: true });
lb.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - lbX;
  if (Math.abs(dx) > 40) openShot(shot + (dx < 0 ? 1 : -1));
}, { passive: true });
