const nav = document.getElementById("nav");
const toggle = document.getElementById("nav-toggle");

addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 8), { passive: true });

toggle.addEventListener("click", () =>
  toggle.setAttribute("aria-expanded", toggle.getAttribute("aria-expanded") === "false")
);

document.getElementById("nav-menu").addEventListener("click", e => {
  if (e.target.tagName === "A") toggle.setAttribute("aria-expanded", "false");
});
