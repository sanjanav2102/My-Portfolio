/* -------------------------
   MOBILE NAV
--------------------------*/

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

/* -------------------------
   ACTIVE LINK HIGHLIGHT
--------------------------*/

const navItems = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  const pos = window.scrollY + 200;

  document.querySelectorAll("section[id]").forEach(sec => {
    if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
      navItems.forEach(l =>
        l.classList.toggle("active", l.getAttribute("href") === `#${sec.id}`)
      );
    }
  });
}
window.addEventListener("scroll", updateActiveLink);

/* -------------------------
   INTERSECTION OBSERVER 
   (fade, slide, stagger, scale)
--------------------------*/
const animatedElements = document.querySelectorAll(
  ".fade-in, .fade-scroll, .slide-up, .animate-up, .animate-fade, .scale-in, .stagger"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.15 }
);

animatedElements.forEach(el => observer.observe(el));


/* -------------------------
   ANIMATE TECH BARS
--------------------------*/

const techBars = document.querySelectorAll(".tech-bar-fill");

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const percent = entry.target.dataset.progress;
      entry.target.style.transform = `scaleX(${percent})`;
      entry.target.style.transition = "transform 1s ease-out";
    }
  });
}, { threshold: 0.5 });

techBars.forEach(bar => barObserver.observe(bar));

/* -------------------------
   PARALLAX HERO EFFECT
--------------------------*/
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX - window.innerWidth / 2) / 40;
  const y = (e.clientY - window.innerHeight / 2) / 40;

  document.querySelectorAll(".movable-hero").forEach(el => {
    el.style.transform = `translate(${x}px, ${y}px)`;
  });

  document.querySelectorAll(".movable").forEach(el => {
    el.style.transform = `translate(${x / 2}px, ${y / 2}px)`;
  });
});



/* -------------------------
   HERO FLOAT
--------------------------*/

// Add floating class to avatar
document.querySelector(".hero-avatar-main")?.classList.add("float");


/* -------------------------
   CONTACT FORM (demo)
--------------------------*/

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent! (Demo)");
    contactForm.reset();
  });
}

/* -------------------------
   FOOTER YEAR
--------------------------*/
document.getElementById("year").innerText = new Date().getFullYear();

const themeToggle = document.getElementById("themeToggle");

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const applyTheme = (theme) => {
  document.documentElement.classList.remove("dark");
  if (theme === "dark") document.documentElement.classList.add("dark");
};

let savedTheme = localStorage.getItem("theme");

if (!savedTheme) {
  savedTheme = getSystemTheme();
}
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem("theme", next);
  applyTheme(next);
});

/*type writer effect*/
/* -------------------------
   TYPEWRITER EFFECT
--------------------------*/

const roles = [
  "Full Stack Developer",
  "Passionate Data Scientist",
  "Tech Enthusiast"
];

const typingElement = document.getElementById("typing-text");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 90;
const deletingSpeed = 55;
const pauseAfterTyping = 1400;
const pauseAfterDeleting = 500;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      setTimeout(() => (isDeleting = true), pauseAfterTyping);
    }
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(() => {}, pauseAfterDeleting);
    }
  }

  setTimeout(
    typeEffect,
    isDeleting ? deletingSpeed : typingSpeed
  );
}

typeEffect();
