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
      swTrack("faq_opened", { question: q ? q.textContent.trim() : null });
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
      swTrack("pricing_toggle_changed", { billing: opt.getAttribute("data-billing") });
    });
  });
})();

/* ============================================================
   ANALYTICS PLACEHOLDERS (no events are sent anywhere yet)
   Future events to wire into your analytics provider:
     - demo_form_submit
     - pricing_estimate_calculated
     - pricing_toggle_changed
     - faq_opened
     - cta_clicked
     - login_clicked
     - datasheet_clicked
   Replace the body of swTrack() to forward events when ready.
   ============================================================ */
function swTrack(eventName, data) {
  /* placeholder — intentionally a no-op. Do not send data until a
     compliant analytics destination is configured. */
  void eventName; void data;
}

/* Delegated CTA tracking via data-track attributes */
(function () {
  "use strict";
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-track]");
    if (el) swTrack(el.getAttribute("data-track"), { href: el.getAttribute("href") || null });
  });
})();

/* ---------- Demo form validation + submit ---------- */
(function () {
  "use strict";
  var form = document.getElementById("demoForm");
  if (!form) return;
  var success = document.getElementById("demoSuccess");

  function setError(id, msg) {
    var input = document.getElementById(id);
    if (!input) return;
    var group = input.closest(".form-group");
    var err = group ? group.querySelector(".form-error") : null;
    if (group) group.classList.add("has-error");
    if (err) err.textContent = msg;
  }
  function clearError(id) {
    var input = document.getElementById(id);
    if (!input) return;
    var group = input.closest(".form-group");
    if (group) group.classList.remove("has-error");
  }
  function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    ["name", "company", "email", "industry", "sites"].forEach(function (k) { clearError("df-" + k); });
    clearError("df-phone");

    if (!val("df-name")) { setError("df-name", "Please enter your full name."); ok = false; }
    if (!val("df-company")) { setError("df-company", "Please enter your company name."); ok = false; }

    var email = val("df-email");
    if (!email) { setError("df-email", "Please enter your work email."); ok = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("df-email", "Please enter a valid email address."); ok = false; }

    var phone = val("df-phone");
    if (phone && !/^[+]?[0-9 ()-]{7,18}$/.test(phone)) { setError("df-phone", "Please enter a valid phone number."); ok = false; }

    if (!val("df-industry")) { setError("df-industry", "Please select an industry."); ok = false; }
    if (!val("df-sites")) { setError("df-sites", "Please select a site range."); ok = false; }

    if (!ok) {
      var firstErr = form.querySelector(".has-error input, .has-error select");
      if (firstErr) firstErr.focus();
      return;
    }

    swTrack("demo_form_submit", { industry: val("df-industry"), sites: val("df-sites") });

    // Static site: no backend. Reveal success guidance + offer a prefilled email.
    if (success) {
      var devices = Array.prototype.slice.call(form.querySelectorAll('input[name="devices"]:checked')).map(function (c) { return c.value; }).join(", ");
      var body = "Name: " + val("df-name") + "\nCompany: " + val("df-company") + "\nEmail: " + val("df-email") +
        "\nPhone: " + (phone || "-") + "\nIndustry: " + val("df-industry") + "\nNumber of Sites: " + val("df-sites") +
        "\nDevice Categories: " + (devices || "-") + "\nDeployment Interest: " + (val("df-deployment") || "-") +
        "\nMessage: " + (val("df-message") || "-");
      var mailto = "mailto:sales@seple.in?subject=" + encodeURIComponent("SWatch360 Demo Request — " + val("df-company")) +
        "&body=" + encodeURIComponent(body);
      var link = success.querySelector("a[href^='mailto']");
      if (link) link.setAttribute("href", mailto);
      success.hidden = false;
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
})();

/* ---------- Pricing rollout estimator ---------- */
(function () {
  "use strict";
  var sitesInput = document.getElementById("est-sites");
  var planSelect = document.getElementById("est-plan");
  var outMonthly = document.getElementById("est-monthly");
  var outAnnual = document.getElementById("est-annual");
  var minNote = document.getElementById("est-min-note");
  if (!sitesInput || !planSelect || !outMonthly || !outAnnual) return;

  var MIN = { "499": 10, "899": 25 }; // Site Monitor min 10, Operations min 25

  function fmt(n) { return "₹" + Math.round(n).toLocaleString("en-IN"); }

  function calc() {
    var rate = parseFloat(planSelect.value) || 499;
    var entered = parseInt(sitesInput.value, 10);
    if (isNaN(entered) || entered < 1) entered = 0;
    var min = MIN[String(rate)] || 1;
    var billable = Math.max(entered, min);

    var belowMin = entered > 0 && entered < min;
    if (minNote) minNote.hidden = !belowMin;

    if (entered === 0) { outMonthly.textContent = "—"; outAnnual.textContent = "—"; return; }

    var monthly = rate * billable;
    var annual = monthly * 12 * 0.85; // 15% saving
    outMonthly.textContent = fmt(monthly) + "/mo";
    outAnnual.textContent = fmt(annual) + "/yr";
    swTrack("pricing_estimate_calculated", { sites: billable, rate: rate });
  }

  sitesInput.addEventListener("input", calc);
  planSelect.addEventListener("change", calc);
  calc();
})();
