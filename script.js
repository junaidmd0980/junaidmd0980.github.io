/* ==========================================================
   script.js
   1. CONTENT  <- edit this part to add projects or skills
   2. Render the lists
   3. Typing effect
   4. Scroll reveal
   5. Nav highlight and status bar
   ========================================================== */


/* 1. CONTENT ---------------------------------------------- */

// To add a project, copy one line and change it. Order here = order on the page.
const projects = [
  { name: "chirpy",                lang: "Go",         url: "https://github.com/junaidmd0980/chirpy",                desc: "A Twitter-style HTTP server with a Postgres database and user auth." },
  { name: "gator",                 lang: "Go",         url: "https://github.com/junaidmd0980/Gator",                 desc: "Blog aggregator CLI. Follow feeds and read posts in the terminal." },
  { name: "student-db",            lang: "JavaScript", url: "https://github.com/junaidmd0980/Student-DB",            desc: "React app for attendance, filtering and lab-session management." },
  { name: "ai-agent",              lang: "Python",     url: "https://github.com/junaidmd0980/AI-agent",              desc: "A coding agent that reads, writes and runs code using tool calls." },
  { name: "pokedexcli",            lang: "Go",         url: "https://github.com/junaidmd0980/pokedexcli",            desc: "A terminal Pokédex that fetches and caches API data." },
  { name: "static-site-generator", lang: "Python",     url: "https://github.com/junaidmd0980/Static-Site-Generator", desc: "Converts Markdown into a static HTML site." },
  { name: "asteroids",             lang: "Python",     url: "https://github.com/junaidmd0980/Asteroids",             desc: "The arcade game, built with Pygame." },
];

// Add or remove skills here.
const skills = [
  "Go", "Python", "JavaScript", "React", "Node.js", "Express", "REST APIs",
  "SQL", "PostgreSQL", "MongoDB", "Docker", "Git", "HTML/CSS", "C",
];

// The first command that gets "typed" in the hero.
const heroCommand = "whoami";


/* 2. RENDER THE LISTS ------------------------------------- */

// Small helper: make an element with a class and some text.
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

const projectList = document.getElementById("project-list");
projects.forEach(function (p) {
  const row = el("div", "proj");
  row.appendChild(el("span", "perm", "drwxr-xr-x"));
  row.appendChild(el("span", "lang", p.lang));

  const name = el("div", "name");
  const link = el("a", "", p.name + "/");
  link.href = p.url;
  name.appendChild(link);

  row.appendChild(name);
  row.appendChild(el("div", "desc", p.desc));
  projectList.appendChild(row);
});

const skillList = document.getElementById("skill-list");
skills.forEach(function (s) {
  skillList.appendChild(el("span", "", s));
});


/* 3. TYPING EFFECT ---------------------------------------- */

(function () {
  const target = document.getElementById("typed");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    target.textContent = heroCommand;
    return;
  }

  let i = 0;
  setTimeout(function type() {
    target.textContent = heroCommand.slice(0, ++i);
    if (i < heroCommand.length) setTimeout(type, 110);
  }, 1200);   // wait for the boot lines first (ms)
})();


/* 4. SCROLL REVEAL ---------------------------------------- */

const revealer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(function (section) {
  revealer.observe(section);
});


/* 5. NAV HIGHLIGHT AND STATUS BAR ------------------------- */

const navLinks = document.querySelectorAll("nav ul a");
const sectionLabel = document.getElementById("sec");

const spy = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach(function (a) {
      a.classList.toggle("on", a.getAttribute("href") === "#" + id);
    });
    sectionLabel.textContent = id;
  });
}, { rootMargin: "-40% 0px -55% 0px" });

document.querySelectorAll("section").forEach(function (section) {
  spy.observe(section);
});

// Clock in the status bar
function updateClock() {
  document.getElementById("clock").textContent =
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
updateClock();
setInterval(updateClock, 30000);
