document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  menuToggle?.addEventListener("click", () => {
    nav.classList.toggle("open");
    const icon = menuToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
  });

  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      const icon = menuToggle?.querySelector("i");
      icon?.classList.add("fa-bars");
      icon?.classList.remove("fa-xmark");
    });
  });

  // FAQ accordion
  document.querySelectorAll(".faq-item button").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.parentElement;
      document.querySelectorAll(".faq-item").forEach(other => {
        if (other !== item) other.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });

  // Search overlay
  const searchBtn = document.getElementById("searchBtn");
  const searchOverlay = document.getElementById("searchOverlay");
  const closeSearch = document.getElementById("closeSearch");
  const searchInput = document.getElementById("searchInput");

  searchBtn?.addEventListener("click", () => {
    searchOverlay.classList.add("open");
    setTimeout(() => searchInput?.focus(), 100);
  });

  closeSearch?.addEventListener("click", () => {
    searchOverlay.classList.remove("open");
  });

  searchOverlay?.addEventListener("click", e => {
    if (e.target === searchOverlay) searchOverlay.classList.remove("open");
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") searchOverlay?.classList.remove("open");
  });

  // Reveal animations
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(el => observer.observe(el));

  // Counters
  const counters = document.querySelectorAll("[data-counter]");
  let countersStarted = false;

  const counterObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || countersStarted) return;
    countersStarted = true;

    counters.forEach(counter => {
      const target = Number(counter.dataset.counter);
      let current = 0;
      const duration = 1200;
      const step = Math.max(1, Math.ceil(target / (duration / 25)));

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = current;
      }, 25);
    });
  }, { threshold: 0.5 });

  if (counters[0]) counterObserver.observe(counters[0].closest(".about-stats"));

  // Contact form demo
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm?.addEventListener("submit", e => {
    e.preventDefault();
    formStatus.textContent = "Thank you! Your message is ready to be connected to your backend/email service.";
    contactForm.reset();
  });

  // Back to top
  const backTop = document.getElementById("backTop");

  window.addEventListener("scroll", () => {
    backTop.classList.toggle("show", window.scrollY > 500);
  });

  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Current year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Active navigation
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav a");

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        const current = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
        current?.classList.add("active");
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => sectionObserver.observe(section));
});
