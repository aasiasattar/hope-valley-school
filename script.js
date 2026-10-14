const nav = document.getElementById("nav");
const toggle = document.getElementById("nav-toggle");
const tabs = document.getElementById("nav-tabs");

addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 8), { passive: true });

toggle.addEventListener("click", () =>
  toggle.setAttribute("aria-expanded", nav.classList.toggle("is-open"))
);

tabs.addEventListener("click", e => {
  if (e.target.closest("a")) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

const links = [...tabs.querySelectorAll(".tabs a")];
const spy = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting)
      links.forEach(l => l.classList.toggle("is-active", l.hash === "#" + entry.target.id));
  }),
  { rootMargin: "-50% 0px" }
);
document.querySelectorAll("main section").forEach(s => spy.observe(s));
