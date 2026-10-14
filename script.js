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
