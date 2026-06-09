/* ============================================================
   SWatch360 — Marketing Site Interactions
   SEPLE NovaEdge Pvt. Ltd.
   ============================================================ */

/* ---------- 1. Navbar scroll state + 8. Back-to-top ---------- */
(function () {
  "use strict";
  var navbar = document.getElementById("navbar");
  var backToTop = document.getElementById("backToTop");

  function onScroll() {
    var y = window.scrollY;
    if (navbar) navbar.classList.toggle("scrolled", y > 60);
    if (backToTop) backToTop.classList.toggle("show", y > 300);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 2. Smooth scroll fallback (older browsers) ---------- */
  if (!("scrollBehavior" in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          e.preventDefault();
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
        }
      });
    });
  }
})();

/* ---------- 3 & 4. Mobile hamburger menu ---------- */
(function () {
  "use strict";
  var btn = document.getElementById("nav-hamburger-btn");
  var menu = document.getElementById("nav-mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    var isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", function (e) {
    if (menu.classList.contains("open") && !btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
})();

/* ---------- 5. Intersection Observer fade-in-up ---------- */
(function () {
  "use strict";
  var revealEls = document.querySelectorAll(
    ".feature-card, .device-card, .gov-card, .value-card, .industry-card, .deploy-card, .pricing-card, .step, .problem-card, .sol-card, .faq-item"
  );
  revealEls.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var siblings = Array.prototype.slice.call(el.parentNode.children);
          el.style.transitionDelay = (siblings.indexOf(el) % 4) * 0.1 + "s";
          el.classList.add("visible");
          o.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { obs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }
})();

/* ---------- 7. Dashboard counter animation ---------- */
(function () {
  "use strict";
  var counters = document.querySelectorAll(".metric-num[data-count]");
  var done = false;

  function animate() {
    if (done) return;
    done = true;
    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      var duration = 1400, start = null;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString("en-IN");
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString("en-IN");
      }
      requestAnimationFrame(step);
    });
  }

  var mockup = document.querySelector(".health-mockup");
  if (mockup && "IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { animate(); o.disconnect(); } });
    }, { threshold: 0.4 });
    co.observe(mockup);
  } else {
    animate();
  }
})();

/* ---------- 9. FAQ accordion (one open at a time) ---------- */
(function () {
  "use strict";
  var items = document.querySelectorAll(".faq-item");

  function toggle(item) {
    var isOpen = item.classList.contains("open");
    items.forEach(function (i) {
      i.classList.remove("open");
      var q = i.querySelector(".faq-question");
      if (q) q.setAttribute("aria-expanded", "false");
    });
    if (!isOpen) {
      item.classList.add("open");
      var q = item.querySelector(".faq-question");
      if (q) q.setAttribute("aria-expanded", "true");
    }
  }

  items.forEach(function (item) {
    var q = item.querySelector(".faq-question");
    if (!q) return;
    q.addEventListener("click", function () { toggle(item); });
    q.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(item); }
    });
  });
})();

/* ---------- 10. Pricing monthly/annual toggle ---------- */
(function () {
  "use strict";
  var opts = document.querySelectorAll(".bt-opt");
  var grid = document.getElementById("pricingGrid");
  if (!grid) return;

  opts.forEach(function (opt) {
    opt.addEventListener("click", function () {
      opts.forEach(function (o) {
        var active = o === opt;
        o.classList.toggle("is-active", active);
        o.setAttribute("aria-pressed", active ? "true" : "false");
      });
      grid.classList.toggle("show-annual", opt.getAttribute("data-billing") === "annual");
    });
  });
})();
