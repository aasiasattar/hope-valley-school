const nav = document.getElementById("nav");
const toggle = document.getElementById("nav-toggle");
const menu = document.getElementById("nav-menu");

addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 8), { passive: true });

toggle.addEventListener("click", () =>
  toggle.setAttribute("aria-expanded", toggle.getAttribute("aria-expanded") === "false")
);

menu.addEventListener("click", e => {
  if (e.target.tagName === "A") toggle.setAttribute("aria-expanded", "false");
});

const links = [...menu.querySelectorAll("a:not(.pill)")];
const spy = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting)
      links.forEach(l => l.classList.toggle("is-active", l.hash === "#" + entry.target.id));
  }),
  { rootMargin: "-50% 0px" }
);
document.querySelectorAll("main section").forEach(s => spy.observe(s));
