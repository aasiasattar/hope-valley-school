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
