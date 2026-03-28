// animation on life of developer
const phrase = "Life of Developer";
const wrapper = document.getElementById("text-wrapper");

if (wrapper) {
  const charElements = phrase.split("").map((letter) => {
    const span = document.createElement("span");
    span.classList.add("char");
    span.textContent = letter === " " ? "\u00A0" : letter;
    wrapper.appendChild(span);
    return span;
  });

  const effectRadius = 300;
  const maxWeight = 900;
  const minWeight = 100;
  const maxSkew = 25;

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    charElements.forEach((span) => {
      const rect = span.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2;
      const letterCenterY = rect.top + rect.height / 2;
      const distX = mouseX - letterCenterX;
      const distY = mouseY - letterCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < effectRadius) {
        const intensity = 1 - distance / effectRadius;
        const weight = minWeight + (maxWeight - minWeight) * intensity;
        const skewX = (distX / effectRadius) * maxSkew;
        span.style.fontWeight = weight;
        span.style.transform = `skewX(${skewX}deg) scale(${1 + intensity * 0.1})`;
      } else {
        span.style.fontWeight = minWeight;
        span.style.transform = "skewX(0deg) scale(1)";
      }
    });
  });

  document.addEventListener("mouseleave", () => {
    charElements.forEach((span) => {
      span.style.fontWeight = minWeight;
      span.style.transform = "skewX(0deg) scale(1)";
    });
  });
}

// transition on line below life of developer
const textElement = document.getElementById("interactive-text");
if (textElement) {
  const text = textElement.textContent.replace(/\|/g, "").trim();
  const words = text.split(/\s+/).filter(Boolean);
  textElement.innerHTML = "";
  words.forEach((word) => {
    const span = document.createElement("span");
    span.classList.add("word");
    span.textContent = word + " ";
    textElement.appendChild(span);
  });
  const cursor = document.createElement("span");
  cursor.classList.add("pipe");
  cursor.textContent = "|";
  textElement.appendChild(cursor);
}

// ===== CODE BG =====
const codeLines = [
  'const dream = new Developer();',
  "while (true) {",
  "  dream.drinkCoffee();",
  "  dream.debug();",
  "  dream.stackoverflow();",
  "  if (itWorks) break; // never",
  "}",
  "function fixBug(bug) {",
  "  // TODO: fix this later",
  "  return newBug(bug * 10);",
  "}",
  'git commit -m "fix"',
  "git push origin panic",
  "npm install hope",
  "ERROR: hope not found",
  'console.log("why");',
  'console.log("WHY");',
  'console.log("W H Y");',
  'import { coffee } from "life";',
  "const solution = stackoverflow.search();",
  "copy(solution); // works, idk why",
  "// Day 1: I will build the next big app",
  "// Day 30: What is CSS again",
  "// Day 365: Still googling forEach",
];
const cb = document.getElementById("codeBg");
if (cb) {
  const repeated = [...codeLines, ...codeLines, ...codeLines].join("\n");
  cb.textContent = repeated;
}

// ----- Scene 2: button chaos + scroll “everything falls” -----
const mainLayout = document.getElementById("mainLayout");
const errorMsg = document.getElementById("errorMsg");
const scene2 = document.getElementById("scene2");
const breakBtn = document.getElementById("breakBtn");

function setChaosActive(on) {
  if (!mainLayout) return;
  if (mainLayout.classList.contains("layout-fallen")) return;
  if (on) {
    mainLayout.classList.add("layout-broken");
    if (errorMsg) errorMsg.style.display = "block";
    if (scene2) scene2.classList.add("is-melting");
  } else {
    mainLayout.classList.remove("layout-broken");
    if (errorMsg) errorMsg.style.display = "none";
    if (scene2) scene2.classList.remove("is-melting");
  }
}

if (breakBtn && mainLayout) {
  breakBtn.addEventListener("mouseenter", () => {
    setChaosActive(true);
    console.error("Critical Failure: Button is blue, but reality is melting.");
  });
  breakBtn.addEventListener("mouseleave", () => setChaosActive(false));
  breakBtn.addEventListener("focus", () => setChaosActive(true));
  breakBtn.addEventListener("blur", () => setChaosActive(false));
}

(function setupScrollFall() {
  if (!mainLayout || !scene2) return;

  let triggered = false;
  const maybeFall = () => {
    if (triggered) return;
    const rect = scene2.getBoundingClientRect();
    if (rect.top < -100) {
      triggered = true;
      setChaosActive(false);
      mainLayout.classList.add("layout-fallen");
      window.removeEventListener("scroll", maybeFall);
    }
  };

  window.addEventListener("scroll", maybeFall, { passive: true });
  maybeFall();
})();

// ----- Scene 3: mini browser, bug game, COPY/PASTE stamps -----
(function scene3Init() {
  const scene3 = document.getElementById("scene3");
  const submitBtn = document.getElementById("scene3Submit");
  const dancer = document.getElementById("scene3DancingBug");
  const arena = document.getElementById("bugArena");
  const scoreEl = document.getElementById("bugScore");
  const stampLayer = document.getElementById("scene3StampLayer");

  const BUG_ICONS = ["🐛", "🐝", "🦗", "🕷️", "🐞", "🦋", "🐜"];
  const DANCE_ICONS = ["🐛", "🦗", "🐝", "🕷️"];
  const SPAWN_ON_SQUASH = 10;
  const MAX_BUGS = 48;

  if (submitBtn && dancer) {
    submitBtn.addEventListener("click", () => {
      dancer.textContent = DANCE_ICONS[Math.floor(Math.random() * DANCE_ICONS.length)];
      dancer.classList.add("is-visible");
      dancer.setAttribute("aria-hidden", "false");
    });
  }

  function spawnBug() {
    if (!arena) return;
    const b = document.createElement("button");
    b.type = "button";
    b.className = "bug-target";
    b.textContent = BUG_ICONS[Math.floor(Math.random() * BUG_ICONS.length)];
    b.style.left = `${6 + Math.random() * 82}%`;
    b.style.top = `${6 + Math.random() * 82}%`;
    b.style.animationDelay = `${Math.random() * -2}s`;
    b.addEventListener("click", () => {
      let n = parseInt(scoreEl.textContent, 10) || 0;
      n += 1;
      scoreEl.textContent = String(n);
      b.remove();
      const current = arena.querySelectorAll(".bug-target").length;
      const toSpawn = Math.min(SPAWN_ON_SQUASH, Math.max(0, MAX_BUGS - current));
      for (let i = 0; i < toSpawn; i += 1) spawnBug();
    });
    arena.appendChild(b);
  }

  if (arena && scoreEl) {
    const start = Math.min(8, MAX_BUGS);
    for (let i = 0; i < start; i += 1) spawnBug();
  }

  let stampBusy = false;
  function playStampSlam() {
    if (!stampLayer || stampBusy) return;
    stampBusy = true;
    stampLayer.classList.add("scene3-stamp-layer--slam");
    window.setTimeout(() => {
      stampLayer.classList.remove("scene3-stamp-layer--slam");
      stampBusy = false;
    }, 2000);
  }

  if (scene3 && stampLayer) {
    let stampInterval = null;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            playStampSlam();
            if (!stampInterval) {
              stampInterval = window.setInterval(playStampSlam, 9000);
            }
          } else if (stampInterval) {
            window.clearInterval(stampInterval);
            stampInterval = null;
          }
        });
      },
      { threshold: 0.22 }
    );
    obs.observe(scene3);
  }
})();

// ----- Scene 4: copy Stack Overflow snippet -----
(function scene4Copy() {
  const btn = document.getElementById("soCopyBtn");
  const block = document.getElementById("soCodeBlock");
  if (!btn || !block) return;

  const defaultLabel = `<span class="so-copy-icon">&#128203;</span> Copy`;

  btn.addEventListener("click", async () => {
    const text = block.innerText.replace(/\u00a0/g, " ");
    try {
      await navigator.clipboard.writeText(text);
      btn.classList.add("so-copied");
      btn.innerHTML = "Copied!";
      window.setTimeout(() => {
        btn.classList.remove("so-copied");
        btn.innerHTML = defaultLabel;
      }, 1800);
    } catch {
      btn.textContent = "Copy failed";
      window.setTimeout(() => {
        btn.innerHTML = defaultLabel;
      }, 2000);
    }
  });
})();


// ===== COFFEE (Scene 5) =====
let coffeeLevel = 48;
const coffeeMsgs = [
  "No coffee... sending help SOS 🆘",
  "One sip... still human 🥱",
  "Half cup... brain cells awakening... 🌅",
  "Getting there... 👀",
  "FUNCTIONAL! Can see in 4K now! 💡",
  "⚡⚡ MAXIMUM OVERDRIVE ⚡⚡",
  "🚀 TRANSCENDED MORTAL LIMITS 🚀",
];
const coffeeChars = ["😐", "🥱", "😑", "🤔", "😄", "😤", "🤯"];

function drinkCoffee() {
  if (coffeeLevel >= 100) {
    coffeeLevel = 0;
  } else {
    coffeeLevel = Math.min(100, coffeeLevel + 16);
  }
  updateCoffee();
}

function updateCoffee() {
  const fill = document.getElementById("energyFill");
  const pct = document.getElementById("energyPct");
  const txt = document.getElementById("coffeeText");
  const liquid = document.getElementById("coffeeLiquid");
  const steam = document.getElementById("steam");
  const coffeeCharEl = document.getElementById("coffeeChar");

  if (!fill || !pct || !txt || !liquid) return;

  fill.style.width = coffeeLevel + "%";
  pct.textContent = coffeeLevel + "%";

  const n = coffeeMsgs.length;
  const msgIdx = Math.min(n - 1, Math.floor((coffeeLevel / 100) * n));
  txt.textContent = coffeeMsgs[msgIdx];

  const cupH = 108;
  const liquidH = (coffeeLevel / 100) * cupH;
  liquid.setAttribute("y", 148 - liquidH);
  liquid.setAttribute("height", liquidH);

  if (steam) {
    const steamOp = coffeeLevel <= 5 ? 0.15 : Math.min(0.95, 0.35 + (coffeeLevel / 100) * 0.6);
    steam.setAttribute("opacity", String(steamOp));
  }

  if (coffeeCharEl && coffeeChars.length) {
    const charIdx = Math.min(
      coffeeChars.length - 1,
      Math.floor((coffeeLevel / 100) * coffeeChars.length)
    );
    coffeeCharEl.textContent = coffeeChars[charIdx];
  }
}

const coffeeDrinkBtn = document.getElementById("coffeeDrinkBtn");
if (coffeeDrinkBtn) {
  coffeeDrinkBtn.addEventListener("click", drinkCoffee);
}

function bootCoffeeMeter() {
  updateCoffee();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootCoffeeMeter);
} else {
  bootCoffeeMeter();
}


// ===== SCROLL REVEAL (Scene 6–8 + any .reveal) =====
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObs.unobserve(entry.target);
      }
    });
  },

  
  { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

// ===== HERO CHAR =====
const heroChar = document.getElementById("heroChar");
if (heroChar) {
  const expressions = ["🧑‍💻", "😄", "😎", "🤩", "😃"];
  let exprIdx = 0;
  heroChar.addEventListener("click", () => {
    exprIdx = (exprIdx + 1) % expressions.length;
    heroChar.textContent = expressions[exprIdx];
    heroChar.style.transform = "scale(1.3) rotate(-10deg)";
    window.setTimeout(() => {
      heroChar.style.transform = "";
    }, 300);
  });
}

// ===== PARALLAX (hero code rain) =====
window.addEventListener("scroll", () => {
  const codeBg = document.getElementById("codeBg");
  if (codeBg) codeBg.style.transform = `translateY(${-window.scrollY * 0.2}%)`;
});

// ===== DEADLINE COUNTDOWN (Scene 6) =====
(function initDeadlineTimer() {
  const display = document.getElementById("timerDisplay");
  const section = document.getElementById("deadline");
  if (!display || !section) return;

  let totalSeconds = 2 * 3600;
  let tick = null;

  const pad = (n) => String(n).padStart(2, "0");
  const render = () => {
    const h = pad(Math.floor(totalSeconds / 3600));
    const m = pad(Math.floor((totalSeconds % 3600) / 60));
    const s = pad(totalSeconds % 60);
    display.textContent = `${h}:${m}:${s}`;
  };

  const start = () => {
    if (tick != null) return;
    tick = window.setInterval(() => {
      totalSeconds = Math.max(0, totalSeconds - 1);
      render();
      if (totalSeconds <= 300) section.classList.add("shaking");
      else section.classList.remove("shaking");
      if (totalSeconds === 0 && tick != null) {
        window.clearInterval(tick);
        tick = null;
        section.classList.remove("shaking");
      }
    }, 1000);
  };

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) start();
      });
    },
    { threshold: 0.15 }
  );
  obs.observe(section);
})();

// ===== CONFETTI (Scene 7) =====
function celebrate() {
  const container = document.getElementById("confetti-container");
  if (!container) return;
  const colors = ["#34d399", "#38bdf8", "#a78bfa", "#f472b6", "#fbbf24", "#f87171"];
  for (let i = 0; i < 56; i += 1) {
    const p = document.createElement("div");
    p.className = "confetti-piece";
    p.style.left = `${Math.random() * 100}%`;
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = `${2 + Math.random() * 2.2}s`;
    p.style.animationDelay = `${Math.random() * 0.35}s`;
    container.appendChild(p);
    window.setTimeout(() => p.remove(), 5000);
  }
}

const celebrateBtn = document.getElementById("celebrateBtn");
if (celebrateBtn) celebrateBtn.addEventListener("click", celebrate);

document.querySelectorAll(".icon-grid .icon-card").forEach((el, i) => {
  el.style.transitionDelay = `${0.4 + i * 0.1}s`;
  el.classList.add("reveal");
  revealObs.observe(el);
});