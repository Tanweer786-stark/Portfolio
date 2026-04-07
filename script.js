/* CURSOR */
const cur = document.getElementById("cursor");
const fol = document.getElementById("cursorFollower");
let mx = 0,
  my = 0,
  fx = 0,
  fy = 0;
if (window.matchMedia("(pointer:fine)").matches) {
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
  });
  (function loop() {
    fx += (mx - fx) * 0.1;
    fy += (my - fy) * 0.1;
    fol.style.left = fx + "px";
    fol.style.top = fy + "px";
    requestAnimationFrame(loop);
  })();
  document
    .querySelectorAll("a,button,.project-card,.skill-pill,.contact-card")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cur.style.width = "16px";
        cur.style.height = "16px";
        fol.style.width = "52px";
        fol.style.height = "52px";
      });
      el.addEventListener("mouseleave", () => {
        cur.style.width = "10px";
        cur.style.height = "10px";
        fol.style.width = "36px";
        fol.style.height = "36px";
      });
    });
}

/* HAMBURGER */
const ham = document.getElementById("hamburger");
const nav = document.getElementById("navLinks");
ham.addEventListener("click", () => nav.classList.toggle("open"));
nav
  .querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open")),
  );

/* SCROLL REVEAL */
const ro = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("in");
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => ro.observe(el));

/* SKILL BARS */
function fillBars(panel) {
  panel.querySelectorAll(".skill-fill").forEach((b) => {
    b.style.width = b.dataset.w + "%";
  });
}
const skillsSection = document.getElementById("t-skills");
const so = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) fillBars(e.target);
    });
  },
  { threshold: 0.2 },
);
so.observe(skillsSection);

/* TABS */
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const wrap = btn.closest("div");
    const parent = wrap.parentElement;
    parent
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    parent
      .querySelectorAll(".tab-panel")
      .forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    const panel = document.getElementById(btn.dataset.tab);
    panel.classList.add("active");
    if (btn.dataset.tab === "t-skills") setTimeout(() => fillBars(panel), 80);
  });
});

/* ACTIVE NAV */
const navAs = document.querySelectorAll(".nav-links a");
const secs = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  let active = "";
  secs.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 140) active = s.id;
  });
  navAs.forEach((a) => {
    a.style.color =
      a.getAttribute("href") === "#" + active ? "var(--text)" : "";
  });
});
