const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  root.dataset.theme = savedTheme;
}

function updateThemeIcon() {
  themeIcon.textContent = root.dataset.theme === "light" ? "☾" : "☼";
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
  updateThemeIcon();
});

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const resumeLink = document.getElementById("resume-link");
const resumeModal = document.getElementById("resume-modal");
const resumeClose = document.getElementById("resume-close");

function openResume() {
    resumeModal.classList.add("active");
    resumeModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeResume() {
    resumeModal.classList.remove("active");
    resumeModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

resumeLink.addEventListener("click", function (event) {
    event.preventDefault();
    openResume();
});

resumeClose.addEventListener("click", closeResume);

resumeModal.addEventListener("click", function (event) {
    if (event.target === resumeModal) {
        closeResume();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && resumeModal.classList.contains("active")) {
        closeResume();
    }
});