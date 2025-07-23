document.addEventListener("DOMContentLoaded", function () {
  // Contact page: always allow copying, no tooltip or feedback
  if (window.location.pathname.includes('contact.html')) {
    window.copyEmail = function () {
      const email = "ranjbar.alireza73@gmail.com";
      navigator.clipboard.writeText(email);
    };
    var copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(function (btn) {
      btn.onclick = window.copyEmail;
    });
  }
  document.body.setAttribute("lang", "en");
  document.body.setAttribute("dir", "ltr");

  // Contact modal open/close logic for all pages
  var openBtn = document.getElementById("openContactModal");
  var modal = document.getElementById("contactModal");
  var closeBtn = document.getElementById("closeContactModal");
  if (openBtn && modal && closeBtn) {
    openBtn.onclick = function (e) {
      e.preventDefault();
      modal.style.display = "flex";
    };
    closeBtn.onclick = function () {
      modal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }

  // Language switch logic for all pages
  window.switchLang = function (lang) {
    const body = document.body;
    window.currentLang = lang;
    if (lang === "fa") {
      body.setAttribute("dir", "rtl");
      body.setAttribute("lang", "fa");
      // Update navigation
      const navLinks = document.querySelectorAll(".navigation a");
      if (navLinks.length >= 4) {
        navLinks[0].textContent = "خانه";
        navLinks[1].textContent = "درباره من";
        navLinks[2].textContent = "تماس";
        navLinks[3].textContent = "نمونه‌کارها";
      }
      updateLanguageVisibility('fa');
      // Update language button states
      const btnEn = document.querySelector(".lang-btn.en");
      const btnFa = document.querySelector(".lang-btn.fa");
      if (btnEn) btnEn.classList.remove("active");
      if (btnFa) btnFa.classList.add("active");
    } else {
      body.setAttribute("dir", "ltr");
      body.setAttribute("lang", "en");
      // Update navigation
      const navLinks = document.querySelectorAll(".navigation a");
      if (navLinks.length >= 4) {
        navLinks[0].textContent = "Home";
        navLinks[1].textContent = "About";
        navLinks[2].textContent = "Contact";
        navLinks[3].textContent = "Portfolio";
      }
      updateLanguageVisibility('en');
      // Update language button states
      const btnEn = document.querySelector(".lang-btn.en");
      const btnFa = document.querySelector(".lang-btn.fa");
      if (btnFa) btnFa.classList.remove("active");
      if (btnEn) btnEn.classList.add("active");
    }
  };

  // Intercept navigation clicks to switch language on target page
  function updateNavLinks() {
    const navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(function (link) {
      link.onclick = function(e) {
        var href = link.getAttribute('href');
        var lang = window.currentLang || document.body.getAttribute('lang') || 'en';
        // Always go to correct language version and correct page
        if (href && (href.endsWith('.html') || href.endsWith('.htm'))) {
          e.preventDefault();
          // Fix About/Portfolio/Contact capitalization issues
          var page = href.toLowerCase();
          // If in Farsi mode, use nav label to determine correct page
          if (lang === 'fa') {
            var label = link.textContent.trim().replace(/\s/g, '');
            if (label === 'خانه') page = 'index.html';
            else if (label === 'دربارهمن') page = 'about.html';
            else if (label === 'تماس') page = 'contact.html';
            else if (label === 'نمونه‌کارها' || label === 'نمونهکارها') page = 'portfolio.html';
          } else {
            var label = link.textContent.trim().toLowerCase();
            if (label === 'home') page = 'index.html';
            else if (label === 'about') page = 'about.html';
            else if (label === 'contact') page = 'contact.html';
            else if (label === 'portfolio') page = 'portfolio.html';
          }
          window.location.href = page + '#' + lang;
        }
      };
    });
  }

  function updateLanguageVisibility(lang) {
    var enEls = document.querySelectorAll('.lang-en');
    var faEls = document.querySelectorAll('.lang-fa');
    function show(el) {
      if (["H2","H4","P","DIV","UL"].includes(el.tagName)) {
        el.style.display = 'block';
      } else {
        el.style.display = 'inline';
      }
    }
    function hide(el) {
      el.style.display = 'none';
    }
    if (lang === 'fa') {
      enEls.forEach(hide);
      faEls.forEach(show);
    } else {
      faEls.forEach(hide);
      enEls.forEach(show);
    }
  }

  updateNavLinks();
  // If page loaded with hash, set language
  var hashLang = window.location.hash.replace('#', '');
  if (hashLang === 'fa' || hashLang === 'en') {
    window.switchLang(hashLang);
  }
});

// --- EmailJS Integration for All Contact Forms ---
(function () {
  // Load EmailJS if not already loaded
  if (typeof emailjs === 'undefined') {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
    script.onload = initEmailJS;
    document.head.appendChild(script);
  } else {
    initEmailJS();
  }

  function initEmailJS() {
    emailjs.init('BbW3Bb4Nxm31dJ6JG');
    var forms = document.querySelectorAll('.contact-modal-form');
    forms.forEach(function(form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        emailjs.sendForm('service_qvhy88s', 'template_raerb7f', form)
          .then(function () {
            alert('Your message was sent successfully!');
            form.reset();
          }, function (error) {
            alert('Failed to send message. Please try again.');
          });
      });
    });
  }
})();
// --- End EmailJS Integration ---
