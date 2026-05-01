document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const skillBars = document.querySelectorAll(".skill-progress");
  const contactForm = document.getElementById("contactForm");

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let followerX = 0;
  let followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    const diffX = mouseX - cursorX;
    const diffY = mouseY - cursorY;
    cursorX += diffX * 0.3;
    cursorY += diffY * 0.3;

    const diffFollowerX = mouseX - followerX;
    const diffFollowerY = mouseY - followerY;
    followerX += diffFollowerX * 0.15;
    followerY += diffFollowerY * 0.15;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
    cursorFollower.style.left = followerX + "px";
    cursorFollower.style.top = followerY + "px";

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll("a, button, .project-card").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(2)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
    });
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px",
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    section.classList.add("section-hidden");
    sectionObserver.observe(section);
  });

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.style.width;
        progressBar.style.width = "0";
        setTimeout(() => {
          progressBar.style.width = width;
        }, 100);
      }
    });
  }, observerOptions);

  skillBars.forEach((bar) => {
    skillObserver.observe(bar);
  });

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });

  const parallaxElements = document.querySelectorAll(".hero::before");
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    parallaxElements.forEach((el) => {
      el.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    console.log("Form submitted:", { name, email, message });

    const button = contactForm.querySelector("button");
    const originalText = button.textContent;
    button.textContent = "Sending...";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = "Message Sent!";
      button.style.background =
        "linear-gradient(135deg, #10b981 0%, #059669 100%)";

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.background = "";
        contactForm.reset();
      }, 2000);
    }, 1500);
  });

  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  const codeLines = document.querySelectorAll(".code-line");
  codeLines.forEach((line, index) => {
    line.style.animationDelay = `${index * 0.5}s`;
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  const heroButtons = document.querySelectorAll(".hero-buttons .btn");
  heroButtons.forEach((btn, index) => {
    btn.style.opacity = "0";
    setTimeout(
      () => {
        btn.style.transition = "opacity 0.6s ease";
        btn.style.opacity = "1";
      },
      1000 + index * 200,
    );
  });

  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link, index) => {
    link.style.opacity = "0";
    setTimeout(
      () => {
        link.style.transition = "opacity 0.6s ease";
        link.style.opacity = "1";
      },
      1400 + index * 100,
    );
  });

  let ticking = false;
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  function handleScroll() {
    const navbar = document.querySelector(".navbar");
    if (lastScrollY > 100) {
      navbar.style.background = "rgba(15, 23, 42, 0.95)";
      navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.3)";
    } else {
      navbar.style.background = "rgba(15, 23, 42, 0.8)";
      navbar.style.boxShadow = "none";
    }
  }

  const techTags = document.querySelectorAll(".tech-tag");
  techTags.forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(2deg)";
    });
    tag.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
    });
  });

  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  const addRandomFloat = () => {
    const floatingElements = document.querySelectorAll(".code-line");
    floatingElements.forEach((el) => {
      const randomY = Math.random() * 10 - 5;
      el.style.transform = `translateY(${randomY}px)`;
    });
  };

  setInterval(addRandomFloat, 2000);

  console.log(
    "%c Welcome to Arav Patel's Portfolio! ",
    "background: #667eea; color: white; font-size: 20px; padding: 10px;",
  );
  console.log(
    "%c Feel free to explore the code! ",
    "background: #764ba2; color: white; font-size: 16px; padding: 5px;",
  );
});
