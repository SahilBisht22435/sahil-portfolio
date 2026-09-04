const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const topButton = document.getElementById("topButton");
const header = document.getElementById("header");
const progressBar = document.getElementById("progressBar");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

// Theme
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const dark = body.classList.contains("dark");
  themeToggle.textContent = dark ? "☀️" : "🌛";
  localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
});

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Typing effect
const roles = ["web applications", "full-stack solutions", "responsive interfaces", "practical projects", "Mobile Applications"];
const typingText = document.getElementById("typingText");
let roleIndex = 0, charIndex = 0, deleting = false;

function typeRole() {
  const current = roles[roleIndex];
  typingText.textContent = deleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  if (!deleting && charIndex > current.length) {
    deleting = true;
    setTimeout(typeRole, 1200);
    return;
  }

  if (deleting && charIndex < 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;
  }

  setTimeout(typeRole, deleting ? 45 : 80);
}
typeRole();

// Scroll UI
function updateScrollUI() {
  const scrollTop = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${total > 0 ? (scrollTop / total) * 100 : 0}%`;
  header.classList.toggle("scrolled", scrollTop > 20);
  topButton.classList.toggle("show", scrollTop > 500);
}
window.addEventListener("scroll", updateScrollUI);
updateScrollUI();

topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Project filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      const categories = card.dataset.category.split(" ");
      const show = filter === "all" || categories.includes(filter);
      card.classList.toggle("hidden", !show);
    });
  });
});

// Active navigation link
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => {
        item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => activeObserver.observe(section));
