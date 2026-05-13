/* ===== PAGE ROUTER ===== */
function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Re-trigger fade-up animations
    setTimeout(() => {
      target.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    }, 100);
  }
  // Update nav active
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('data-page') === pageId);
  });
}

// Nav click handlers
document.querySelectorAll('.nav-link[data-page]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    navigateTo(page);
    window.location.hash = page;
    // Close mobile nav
    document.getElementById('headerNav').classList.remove('open');
  });
});

// Logo click → home
document.querySelector('.header-logo').addEventListener('click', (e) => {
  e.preventDefault();
  navigateTo('home');
  window.location.hash = 'home';
});

// Handle initial hash
const initHash = window.location.hash.replace('#', '') || 'home';
navigateTo(initHash);
window.addEventListener('hashchange', () => {
  navigateTo(window.location.hash.replace('#', '') || 'home');
});

/* ===== MOBILE NAV ===== */
document.getElementById('mobileToggle').addEventListener('click', () => {
  document.getElementById('headerNav').classList.toggle('open');
});

/* ===== THEME TOGGLE ===== */
const themeToggle = document.getElementById('themeToggle');
const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function applyTheme(theme) {
  document.documentElement.classList.remove('dark');
  if (theme === 'dark') document.documentElement.classList.add('dark');
  themeToggle.innerHTML = theme === 'dark' ? '&#9788;' : '&#9790;';
}

let savedTheme = localStorage.getItem('theme') || getSystemTheme();
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  const next = isDark ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

/* ===== INTERSECTION OBSERVER ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ===== TECH STACK ACCORDION ===== */
document.querySelectorAll('.tech-category-header').forEach(header => {
  header.addEventListener('click', () => {
    const category = header.parentElement;
    category.classList.toggle('open');
  });
});

/* ===== PROJECT FILTER ===== */
document.querySelectorAll('.filter-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    // Update active
    document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
    tag.classList.add('active');
    
    const filter = tag.getAttribute('data-filter');
    document.querySelectorAll('.project-item').forEach(item => {
      if (filter === 'all') {
        item.classList.remove('hidden');
      } else {
        const tags = item.getAttribute('data-tags') || '';
        item.classList.toggle('hidden', !tags.includes(filter));
      }
    });
  });
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! (Demo)');
    contactForm.reset();
  });
}

/* ===== FOOTER YEAR ===== */
document.getElementById('year').innerText = new Date().getFullYear();

/* ===== TYPEWRITER ===== */
const roles = ['Full Stack Developer', 'Data Scientist', 'Tech Enthusiast'];
const typingEl = document.getElementById('typing-text');
let roleIdx = 0, charIdx = 0, isDeleting = false;

function typeEffect() {
  const role = roles[roleIdx];
  if (!isDeleting) {
    typingEl.textContent = role.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === role.length) {
      setTimeout(() => { isDeleting = true; }, 1400);
    }
  } else {
    typingEl.textContent = role.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 50 : 90);
}
typeEffect();
