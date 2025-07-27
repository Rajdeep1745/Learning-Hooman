// Learning Plans Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Add smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add hover effects for pricing cards
  const pricingCards = document.querySelectorAll(".pricing-card");
  pricingCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      if (this.classList.contains("featured")) {
        this.style.transform = "scale(1.05)";
      } else {
        this.style.transform = "translateY(0) scale(1)";
      }
    });
  });

  // Add click tracking for analytics (optional)
  const ctaButtons = document.querySelectorAll(
    ".btn-primary, .btn-outline-primary"
  );
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // You can add analytics tracking here
      console.log("CTA button clicked:", this.textContent.trim());
    });
  });

  // Add loading animation for page elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".pricing-card, .course-card, .accordion-item"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });
});
