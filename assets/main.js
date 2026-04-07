document.addEventListener('DOMContentLoaded', function() {
  // --- Navbar scroll effect ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // --- Mobile menu toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function() {
      links.classList.toggle('open');
      this.classList.toggle('active');
    });
    // Close menu on link click
    links.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        links.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // --- Hero parallax ---
  var heroBgImg = document.querySelector('.hero-bg-img');
  if (heroBgImg) {
    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          var scrollY = window.scrollY;
          // 视差：背景慢于页面滚动，系数0.35（越小越慢）
          heroBgImg.style.transform = heroBgImg.style.transform.replace(/translateY\([^)]*\)/, '') ||
            heroBgImg.style.cssText; // 不覆盖 Ken Burns，用独立 wrapper
          var heroBg = document.querySelector('.hero-bg');
          if (heroBg) {
            heroBg.style.transform = 'translateY(' + (scrollY * 0.35) + 'px)';
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- Scroll animations ---
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .product-card, .process-item, .about-grid, .contact-grid').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // --- Contact form (demo) ---
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = this.querySelector('button[type="submit"]');
      btn.textContent = '已提交';
      btn.disabled = true;
      btn.style.opacity = '0.6';
      setTimeout(function() {
        btn.textContent = '提交咨询';
        btn.disabled = false;
        btn.style.opacity = '1';
        form.reset();
      }, 2000);
    });
  }
});
