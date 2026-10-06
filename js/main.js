/* =========================================================================
   EKAIVA — SITE SCRIPT
   You normally don't need to edit this file. Change js/site-config.js and
   js/products-data.js instead.
   ========================================================================= */
(function () {
  "use strict";

  var C = window.EKAIVA_CONFIG || {};
  var P = window.EKAIVA_PRODUCTS || [];
  var USES = window.EKAIVA_USES || [];
  var COOK = window.EKAIVA_COOK || [];
  var page = document.body.getAttribute("data-page") || "";

  /* ---------------------------------------------------------- helpers */
  function $(s, ctx) { return (ctx || document).querySelector(s); }
  function $$(s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]; }); }
  function get(obj, path) { return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, obj); }
  function find(slug) { for (var i = 0; i < P.length; i++) { if (P[i].slug === slug) return P[i]; } return null; }
  function img(p, i, thumb) { return "images/products/" + p.folder + "/" + i + (thumb ? "-thumb" : "") + ".webp"; }
  function digits(s) { return String(s || "").replace(/\D/g, ""); }
  function waLink(msg) { return "https://wa.me/" + digits(C.contact && C.contact.whatsapp) + "?text=" + encodeURIComponent(msg); }
  function hasWA() { return digits(C.contact && C.contact.whatsapp).length >= 10; }
  function ord() { return C.ordering || {}; }
  function orderingOn() { return hasWA() && ord().enabled !== false; }
  function priceOf(p) { var v = (p.price != null ? p.price : p.mrp); return (typeof v === "number" && v > 0) ? v : null; }
  function canOrder(p) { return orderingOn() && p.orderable !== false; }
  function abs(path) { return (C.siteUrl ? C.siteUrl.replace(/\/$/, "") + "/" : "") + path; }
  function money(n) { return "\u20b9" + n; }

  var ICON = {
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.6 6.2L21 10l-5 4.2L17.2 21 12 17.6 6.8 21 8 14.2 3 10l6.4-1.8z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5L15.5 10"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19c3-4 6-6 10-8"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3L5 14h6l-1 7 8-11h-6z"/></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4"/><path d="M5 5c5-2 8 2 14 0v9c-6 2-9-2-14 0"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3 1.8.8 2.5.8 3.4.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5A4.5 4.5 0 1112 16.5 4.5 4.5 0 0112 7.5zm0 2A2.5 2.5 0 1012 14.5 2.5 2.5 0 0012 9.5zM17.2 5.8a1 1 0 110 2 1 1 0 010-2z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.5V14h2.9v8h3.1z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.3-8.3L2 3h6.3l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5z"/></svg>'
  };

  /* ------------------------------------------------------ buy buttons */
  function buyButtons(p, small) {
    var cls = small ? " btn-sm" : "";
    var out = "";
    var buy = p.buy || {};
    if (buy.instamart) {
      out += '<a class="btn btn-primary' + cls + '" href="' + esc(buy.instamart) + '" target="_blank" rel="noopener">Buy on Swiggy Instamart</a>';
    } else if (p.onInstamart && C.buy && C.buy.instamartHome) {
      out += '<a class="btn btn-primary' + cls + '" href="' + esc(C.buy.instamartHome) + '" target="_blank" rel="noopener" title="Open Instamart and search \u2018Ekaiva\u2019">Find on Swiggy Instamart</a>';
    }
    if (buy.amazon) {
      out += '<a class="btn btn-gold' + cls + '" href="' + esc(buy.amazon) + '" target="_blank" rel="noopener">Buy on Amazon</a>';
    }
    if (canOrder(p)) {
      out += '<button type="button" class="btn btn-wa' + cls + '" data-add="' + esc(p.slug) + '">+ Add to order</button>';
    }
    if (!out) {
      if (hasWA()) {
        out += '<a class="btn btn-wa' + cls + '" href="' + esc(waLink("Hi Ekaiva, I'd like to know where to buy " + p.name + ".")) + '" target="_blank" rel="noopener">Ask on WhatsApp</a>';
      } else {
        out += '<a class="btn btn-primary' + cls + '" href="contact.html?product=' + encodeURIComponent(p.slug) + '">Enquire about this</a>';
      }
    }
    return out;
  }

  function cardHTML(p, idx) {
    var delay = (idx % 6) * 60;
    return '<article class="card reveal" style="transition-delay:' + delay + 'ms">' +
      '<a class="pic" href="product.html?p=' + encodeURIComponent(p.slug) + '" aria-label="' + esc(p.name) + '">' +
      (p.onInstamart ? '<span class="chip">On Instamart</span>' : '') +
      '<img src="' + img(p, 1, true) + '" alt="' + esc(p.name) + ' - Ekaiva ' + esc(p.weight) + ' pack" loading="lazy" width="300" height="400"></a>' +
      '<div class="body"><h3><a href="product.html?p=' + encodeURIComponent(p.slug) + '">' + esc(p.name) + '</a></h3>' +
      '<div class="hi">' + esc(p.hindi) + '</div>' +
      '<div class="tag">' + esc(p.tagline) + '</div>' +
      '<p class="meta">' + esc(p.weight) + (p.mrp ? ' &middot; <span class="price">MRP ' + money(p.mrp) + '</span>' : '') + '</p>' +
      '<div class="acts">' + buyButtons(p, true) +
      '<a class="btn btn-ghost btn-sm" href="product.html?p=' + encodeURIComponent(p.slug) + '">Details</a></div></div></article>';
  }

  /* ------------------------------------------------ header and footer */
  function renderHeader() {
    var host = $("#site-header"); if (!host) return;
    var links = [["index.html", "Home", "home"], ["products.html", "Products", "products"], ["about.html", "About", "about"], ["faq.html", "FAQ", "faq"], ["contact.html", "Contact", "contact"]];
    var nav = links.map(function (l) {
      return '<a href="' + l[0] + '"' + ((page === l[2] || (page === "product" && l[2] === "products")) ? ' aria-current="page"' : "") + ">" + l[1] + "</a>";
    }).join("");
    var cta = C.buy && C.buy.instamartHome ? '<a class="btn btn-primary" href="' + esc(C.buy.instamartHome) + '" target="_blank" rel="noopener">Shop on Instamart</a>' : "";
    host.outerHTML = '<header class="site-header"><nav class="nav" aria-label="Main">' +
      '<a class="brand" href="index.html" aria-label="Ekaiva home"><img src="images/site/logo-square.png" alt="" width="44" height="44"><span>' + esc(C.brand.name) + '</span></a>' +
      '<button class="nav-toggle" aria-label="Open menu" aria-expanded="false">&#9776;</button>' +
      '<div class="nav-links" id="navlinks">' + nav + cta + '</div></nav></header>';
    var t = $(".nav-toggle"), l = $("#navlinks");
    t.addEventListener("click", function () { var o = l.classList.toggle("open"); t.setAttribute("aria-expanded", o ? "true" : "false"); });
  }

  function renderFooter() {
    var host = $("#site-footer"); if (!host) return;
    var c = C.contact || {}, s = C.social || {};
    var soc = "";
    ["instagram", "facebook", "youtube", "x"].forEach(function (k) {
      if (s[k]) soc += '<a href="' + esc(s[k]) + '" target="_blank" rel="noopener" aria-label="' + k + '">' + ICON[k] + "</a>";
    });
    var contactLines = "";
    if (c.addressLines && c.addressLines.length) contactLines += "<li>" + c.addressLines.map(esc).join("<br>") + "</li>";
    if (c.phone) contactLines += '<li><a href="tel:' + esc(digits(c.phone)) + '">' + esc(c.phone) + "</a></li>";
    if (c.email) contactLines += '<li><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></li>";
    if (hasWA()) contactLines += '<li><a href="' + esc(waLink("Hi Ekaiva!")) + '" target="_blank" rel="noopener">Chat on WhatsApp</a></li>';
    host.outerHTML = '<footer class="site-footer"><div class="container"><div class="f-grid">' +
      '<div><div class="f-brand"><img src="images/site/logo-square.png" alt="" width="44" height="44"><span>' + esc(C.brand.name) + "</span></div>" +
      "<p>" + esc(C.brand.tagline) + "<br>FSSAI Reg. No. " + esc(C.fssai.number) + "</p>" + (soc ? '<div class="social">' + soc + "</div>" : "") + "</div>" +
      '<div><h4>Explore</h4><ul><li><a href="index.html">Home</a></li><li><a href="products.html">All products</a></li><li><a href="about.html">About us</a></li><li><a href="faq.html">FAQ</a></li><li><a href="contact.html">Contact</a></li></ul></div>' +
      '<div><h4>Buy</h4><ul>' + (C.buy && C.buy.instamartHome ? '<li><a href="' + esc(C.buy.instamartHome) + '" target="_blank" rel="noopener">Swiggy Instamart</a></li>' : "") +
      (C.buy && C.buy.amazonStore ? '<li><a href="' + esc(C.buy.amazonStore) + '" target="_blank" rel="noopener">Amazon</a></li>' : "") +
      '<li><a href="contact.html">Bulk &amp; wholesale enquiry</a></li></ul></div>' +
      '<div><h4>Contact</h4><ul>' + contactLines + "</ul></div></div>" +
      '<div class="f-bottom"><span>&copy; ' + new Date().getFullYear() + " " + esc(C.brand.name) + '. All rights reserved. Product images are for illustration.</span>' +
      '<span><a href="privacy.html">Privacy</a> &middot; <a href="terms.html">Terms</a></span></div></div></footer>';
    if (hasWA() && !orderingOn()) {
      var w = document.createElement("a");
      w.className = "wa-float"; w.href = waLink("Hi Ekaiva!"); w.target = "_blank"; w.rel = "noopener";
      w.setAttribute("aria-label", "Chat on WhatsApp"); w.innerHTML = ICON.wa;
      document.body.appendChild(w);
    }
  }

  /* ------------------------------------------------------- preloader */
  function initPreloader() {
    var pre = $("#preloader"); if (!pre) return;
    var seen = false, reduce = false;
    try { seen = sessionStorage.getItem("ekPre") === "1"; } catch (e) {}
    try { reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    if (C.preloader === false || seen || reduce) { pre.parentNode.removeChild(pre); return; }
    try { sessionStorage.setItem("ekPre", "1"); } catch (e) {}
    var colors = ["#c89116", "#b7261f", "#e3b23c", "#7a1c14", "#d13a28", "#f3dfa4", "#2f6b3a"];
    for (var i = 0; i < 34; i++) {
      var s = document.createElement("span");
      var a = Math.random() * Math.PI * 2, d = 110 + Math.random() * 230;
      s.className = "burst" + (i % 3 === 0 ? " flake" : "");
      s.style.setProperty("--tx", Math.cos(a) * d + "px");
      s.style.setProperty("--ty", Math.sin(a) * d + "px");
      s.style.setProperty("--s", (5 + Math.random() * 10) + "px");
      s.style.setProperty("--c", colors[i % colors.length]);
      s.style.setProperty("--d", (Math.random() * 0.45) + "s");
      s.style.setProperty("--rot", (Math.random() * 500 - 250) + "deg");
      pre.appendChild(s);
    }
    if (Math.random() < 0.6 && P.length) {
      var pick = P[Math.floor(Math.random() * P.length)];
      var r = document.createElement("img");
      r.className = "pre-roll"; r.alt = ""; r.src = img(pick, 1, true);
      pre.appendChild(r);
    }
    var start = Date.now(), closed = false;
    function close() {
      if (closed) return; closed = true;
      var wait = Math.max(0, 1500 - (Date.now() - start));
      setTimeout(function () { pre.classList.add("done"); setTimeout(function () { if (pre.parentNode) pre.parentNode.removeChild(pre); }, 700); }, wait);
    }
    if (document.readyState === "complete") close(); else window.addEventListener("load", close);
    setTimeout(close, 3200);
  }

  /* --------------------------------------------------------- reveals */
  function initReveal() {
    var els = $$(".reveal:not(.in)");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
    setTimeout(function () { els.forEach(function (e) { e.classList.add("in"); }); }, 4500);
  }

  /* ------------------------------------------------------------- SEO */
  function jsonLD(obj) {
    var s = document.createElement("script"); s.type = "application/ld+json"; s.text = JSON.stringify(obj); document.head.appendChild(s);
  }
  function setMeta(sel, attr, val) { var m = $(sel); if (m) m.setAttribute(attr, val); }
  function initSEO() {
    var c = C.contact || {}, same = [];
    ["instagram", "facebook", "youtube", "x"].forEach(function (k) { if (C.social && C.social[k]) same.push(C.social[k]); });
    var org = { "@context": "https://schema.org", "@type": "Organization", name: C.brand.name, slogan: C.brand.tagline, description: C.brand.shortDescription,
      logo: abs("images/site/logo-square.png"), address: { "@type": "PostalAddress", streetAddress: (c.addressLines || []).slice(0, 2).join(" "), addressLocality: "Mira Bhayander", addressRegion: "Maharashtra", postalCode: "401101", addressCountry: "IN" } };
    if (C.siteUrl) org.url = C.siteUrl;
    if (c.email) org.email = c.email;
    if (c.phone) org.telephone = c.phone;
    if (same.length) org.sameAs = same;
    jsonLD(org);
    if (C.siteUrl) {
      var path = location.pathname.split("/").pop() || "index.html";
      var link = $('link[rel="canonical"]') || (function () { var l = document.createElement("link"); l.rel = "canonical"; document.head.appendChild(l); return l; })();
      link.href = C.siteUrl.replace(/\/$/, "") + "/" + (path === "index.html" ? "" : path + (page === "product" ? location.search : ""));
      setMeta('meta[property="og:image"]', "content", abs("images/site/og-image.jpg"));
      setMeta('meta[property="og:url"]', "content", link.href);
    }
  }

  /* ------------------------------------------------ binders / config */
  function bindConfig() {
    $$("[data-cfg]").forEach(function (el) { var v = get(C, el.getAttribute("data-cfg")); if (v != null) el.textContent = v; });
    $$("[data-if]").forEach(function (el) { var v = get(C, el.getAttribute("data-if")); if (!v || (v.length === 0)) el.classList.add("hide"); });
    $$("[data-mail]").forEach(function (el) { var v = get(C, "contact.email"); if (v) { el.href = "mailto:" + v; el.textContent = v; } else { el.classList.add("hide"); } });
    $$("[data-wa]").forEach(function (el) { if (hasWA()) { el.href = waLink(el.getAttribute("data-wa") || "Hi Ekaiva!"); el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); } else { el.classList.add("hide"); } });
    $$("[data-instamart]").forEach(function (el) { if (C.buy && C.buy.instamartHome) { el.href = C.buy.instamartHome; el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); } else { el.classList.add("hide"); } });
    $$("[data-tel]").forEach(function (el) { var v = C.contact && C.contact.phone; if (v) { el.href = "tel:" + digits(v); el.textContent = v; } else { el.classList.add("hide"); } });
    $$("[data-order-only]").forEach(function (el) { if (!orderingOn()) el.classList.add("hide"); });
    $$("[data-order-off]").forEach(function (el) { if (orderingOn()) el.classList.add("hide"); });
    $$("[data-address]").forEach(function (el) { el.innerHTML = (C.contact.addressLines || []).map(esc).join("<br>"); });
  }

  function initAnalytics() {
    if (!C.analyticsId) return;
    var s = document.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(C.analyticsId); document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date()); window.gtag("config", C.analyticsId);
  }

  /* ------------------------------------------------------------ HOME */
  function initHome() {
    var featured = P.filter(function (p) { return p.featured; });
    if (!featured.length) featured = P.slice(0, 4);
    var stage = $("#slides"), dotsHost = $("#dots");
    if (stage) {
      stage.innerHTML = featured.map(function (p, i) {
        return '<a class="slide' + (i === 0 ? " on" : "") + '" href="product.html?p=' + encodeURIComponent(p.slug) + '" aria-label="' + esc(p.name) + '"><img src="' + img(p, 1, false) + '" alt="' + esc(p.name) + ' pack"' + (i === 0 ? "" : ' loading="lazy"') + "></a>";
      }).join("");
      dotsHost.innerHTML = featured.map(function (p, i) { return '<button type="button" aria-label="Show ' + esc(p.name) + '" class="' + (i === 0 ? "on" : "") + '"></button>'; }).join("");
      var slides = $$(".slide", stage), dots = $$("button", dotsHost), cur = 0, timer;
      var show = function (n) { slides[cur].classList.remove("on"); dots[cur].classList.remove("on"); cur = (n + slides.length) % slides.length; slides[cur].classList.add("on"); dots[cur].classList.add("on"); };
      var start = function () { clearInterval(timer); timer = setInterval(function () { show(cur + 1); }, 3600); };
      dots.forEach(function (d, i) { d.addEventListener("click", function () { show(i); start(); }); });
      start();
    }
    var dust = $("#dust");
    if (dust) {
      var cols = ["#e3b23c", "#d13a28", "#f3dfa4", "#c89116"];
      for (var i = 0; i < 16; i++) {
        var d = document.createElement("span"); d.className = "dust";
        var sz = 4 + Math.random() * 7;
        d.style.cssText = "left:" + (Math.random() * 100) + "%;bottom:0;width:" + sz + "px;height:" + sz + "px;background:" + cols[i % 4] + ";--t:" + (9 + Math.random() * 9) + "s;--dl:" + (Math.random() * 8) + "s;--dx:" + (Math.random() * 120 - 60) + "px";
        dust.appendChild(d);
      }
    }
    var fh = $("#featured"); if (fh) fh.innerHTML = featured.map(cardHTML).join("");
    var th = $("#uses");
    if (th) th.innerHTML = USES.map(function (u) { return '<a class="tile reveal" href="products.html?use=' + u.id + '"><span class="hi">' + esc(u.hindi) + "</span><h3>" + esc(u.title) + "</h3><p>" + esc(u.text) + "</p></a>"; }).join("");
    var ih = $("#ideas");
    if (ih) {
      if (!COOK.length) { var box = ih.closest("section"); if (box) box.classList.add("hide"); }
      else ih.innerHTML = COOK.map(function (c) {
        var p = find(c.slug);
        return '<div class="idea reveal"><h3>' + esc(c.title) + "</h3><p>" + esc(c.text) + "</p>" + (p ? '<p style="margin-top:10px"><a href="product.html?p=' + encodeURIComponent(p.slug) + '">Made with ' + esc(p.name) + " &rarr;</a></p>" : "") + "</div>";
      }).join("");
    }
    var vh = $("#videos");
    if (vh) {
      var vids = C.videos || [];
      if (!vids.length) { var vs = vh.closest("section"); if (vs) vs.classList.add("hide"); }
      else vh.innerHTML = vids.map(function (v) {
        var body = v.youtube ? '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.youtube) + '" title="' + esc(v.title || "Video") + '" loading="lazy" allowfullscreen></iframe>'
          : '<video controls preload="metadata" playsinline src="' + esc(v.file) + '"></video>';
        return "<figure>" + body + (v.title ? "<figcaption>" + esc(v.title) + "</figcaption>" : "") + "</figure>";
      }).join("");
    }
    if (C.heroVideo) {
      var hero = $(".hero");
      if (hero) { var v = document.createElement("video"); v.className = "bg"; v.src = C.heroVideo; v.muted = true; v.loop = true; v.autoplay = true; v.setAttribute("playsinline", ""); v.setAttribute("aria-hidden", "true"); hero.insertBefore(v, hero.firstChild); v.play && v.play().catch(function () {}); }
    }
  }

  /* -------------------------------------------------------- PRODUCTS */
  function initProducts() {
    var grid = $("#grid"); if (!grid) return;
    var params = new URLSearchParams(location.search);
    var state = { cat: params.get("cat") || "all", use: params.get("use") || "", q: (params.get("q") || "").toLowerCase() };
    var search = $("#q"); if (search) search.value = params.get("q") || "";
    function draw() {
      var list = P.filter(function (p) {
        if (state.cat !== "all" && p.category !== state.cat) return false;
        if (state.use && (p.uses || []).indexOf(state.use) < 0) return false;
        if (state.q && (p.name + " " + p.hindi + " " + p.tagline + " " + p.description).toLowerCase().indexOf(state.q) < 0) return false;
        return true;
      });
      grid.innerHTML = list.length ? list.map(cardHTML).join("") : '<p class="empty" style="grid-column:1/-1">No products match that search. <a href="products.html"><b>Show all</b></a></p>';
      $("#count").textContent = list.length + (list.length === 1 ? " product" : " products");
      $$(".pill").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-cat") === state.cat); });
      var bar = $("#usebar");
      if (state.use) {
        var u = USES.filter(function (x) { return x.id === state.use; })[0];
        bar.classList.remove("hide"); bar.querySelector("span").textContent = "Showing: " + (u ? u.title : state.use);
      } else bar.classList.add("hide");
      initReveal();
    }
    $$(".pill").forEach(function (b) { b.addEventListener("click", function () { state.cat = b.getAttribute("data-cat"); draw(); }); });
    if (search) search.addEventListener("input", function () { state.q = search.value.toLowerCase(); draw(); });
    var clear = $("#clearuse"); if (clear) clear.addEventListener("click", function (e) { e.preventDefault(); state.use = ""; draw(); });
    draw();
  }

  /* ---------------------------------------------------------- PRODUCT */
  function initProduct() {
    var host = $("#pd"); if (!host) return;
    var slug = new URLSearchParams(location.search).get("p");
    var p = find(slug);
    if (!p) {
      host.innerHTML = '<div class="empty"><h1>We couldn\u2019t find that product</h1><p><a class="btn btn-primary" href="products.html">See all products</a></p></div>';
      document.title = "Product not found - Ekaiva"; return;
    }
    document.title = p.name + " " + p.weight + " - " + C.brand.name;
    var desc = p.name + " (" + p.hindi + ") - " + p.tagline + ". " + p.description;
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[property="og:title"]', "content", document.title);
    setMeta('meta[property="og:description"]', "content", desc);
    var thumbs = "", n = p.images || 1;
    for (var i = 1; i <= n; i++) thumbs += '<button type="button" data-i="' + i + '" class="' + (i === 1 ? "on" : "") + '" aria-label="Photo ' + i + '"><img src="' + img(p, i, true) + '" alt="" loading="lazy"></button>';
    var facts = '<div class="fact"><span>Pack size</span><b>' + esc(p.weight) + "</b></div>" +
      (p.mrp ? '<div class="fact"><span>MRP</span><b>' + money(p.mrp) + "</b></div>" : "") +
      '<div class="fact"><span>Type</span><b>' + (p.category === "pure" ? "Pure spice powder" : "Masala blend") + "</b></div>";
    var ideas = (p.ideas || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    var wa = hasWA() ? '<a class="btn btn-wa" href="' + esc(waLink("Hi Ekaiva, I have a question about " + p.name + ".")) + '" target="_blank" rel="noopener">Ask on WhatsApp</a>' : "";
    host.innerHTML =
      '<div class="crumbs"><a href="index.html">Home</a> / <a href="products.html">Products</a> / ' + esc(p.name) + "</div>" +
      '<div class="pd"><div><div class="gal-main" id="galmain" title="Click to enlarge"><img id="mainimg" src="' + img(p, 1, false) + '" alt="' + esc(p.name) + ' - front of pack"></div><div class="thumbs" id="thumbs">' + thumbs + "</div></div>" +
      "<div><h1>" + esc(p.name) + '</h1><div class="hi">' + esc(p.hindi) + '</div><div class="tag">' + esc(p.tagline) + "</div><p>" + esc(p.description) + "</p>" +
      '<div class="facts">' + facts + "</div>" +
      (ideas ? "<h3>Ways to use it</h3><ul class=\"list\">" + ideas + "</ul>" : "") +
      '<div class="btn-row">' + buyButtons(p, false) + wa + "</div>" +
      '<p class="fine">' + (p.mrp ? "MRP as listed on Swiggy Instamart; the price you pay can vary by location and offers. " : "") + "Photos are for illustration. Check the pack for ingredients and nutrition details.</p></div></div>";
    var main = $("#mainimg");
    $$("#thumbs button").forEach(function (b) {
      b.addEventListener("click", function () {
        var i = parseInt(b.getAttribute("data-i"), 10);
        main.src = img(p, i, false); main.className = i === 1 ? "" : "photo";
        $$("#thumbs button").forEach(function (x) { x.classList.toggle("on", x === b); });
      });
    });
    var lb = document.createElement("div"); lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-label", "Enlarged photo");
    document.body.appendChild(lb);
    function closeLb() { lb.classList.remove("open"); lb.innerHTML = ""; }
    $("#galmain").addEventListener("click", function () {
      lb.innerHTML = '<button type="button" aria-label="Close">&times;</button><img alt="' + esc(p.name) + '" src="' + main.src + '">';
      lb.classList.add("open");
    });
    lb.addEventListener("click", closeLb);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
    var rel = P.filter(function (x) { return x.slug !== p.slug && x.category === p.category; });
    if (rel.length < 3) rel = rel.concat(P.filter(function (x) { return x.slug !== p.slug && x.category !== p.category; }));
    var rh = $("#related"); if (rh) rh.innerHTML = rel.slice(0, 3).map(cardHTML).join("");
    var ld = { "@context": "https://schema.org", "@type": "Product", name: p.name, alternateName: p.hindi, description: p.description, image: [abs(img(p, 1, false))], brand: { "@type": "Brand", name: C.brand.name }, category: "Spices and seasonings" };
    if (C.siteUrl) ld.url = C.siteUrl + "/product.html?p=" + p.slug;
    jsonLD(ld);
  }

  /* ---------------------------------------------------------- CONTACT */
  function initContact() {
    var form = $("#contact-form"); if (!form) return;
    var email = C.contact && C.contact.email;
    var warn = $("#form-off");
    var mf0 = $("#mapframe"); if (mf0 && C.contact && C.contact.mapQuery) mf0.src = "https://www.google.com/maps?q=" + encodeURIComponent(C.contact.mapQuery) + "&output=embed";
    var ml0 = $("#maplink"); if (ml0 && C.contact && C.contact.mapQuery) ml0.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(C.contact.mapQuery);
    if (!email) { form.classList.add("hide"); if (warn) warn.classList.remove("hide"); return; }
    var mf = $("#mapframe"); if (mf && C.contact && C.contact.mapQuery) mf.src = "https://www.google.com/maps?q=" + encodeURIComponent(C.contact.mapQuery) + "&output=embed";
    form.action = "https://formsubmit.co/" + String(email).replace(/[^A-Za-z0-9@._+\-]/g, "");
    try { $("#next").value = new URL("thank-you.html", location.href).href; } catch (e) {}
    var pre = new URLSearchParams(location.search).get("product"), p = pre && find(pre);
    if (p) { $("#message").value = "Hi, I'd like to know about " + p.name + " (" + p.weight + ")."; $("#topic").value = "Where to buy / product question"; }
  }


  /* ------------------------------------------------- WhatsApp ordering */
  var CART_KEY = "ekCart", CUST_KEY = "ekCust";
  var cart = {};          // slug -> quantity
  var cartUI = {};
  var lastFocus = null;

  function loadCart() {
    cart = {};
    try {
      var o = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
      Object.keys(o).forEach(function (k) { var q = parseInt(o[k], 10); if (find(k) && q > 0) cart[k] = q; });
    } catch (e) {}
  }
  function saveCart() { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} }
  function maxQty() { return Math.max(1, parseInt(ord().maxQty, 10) || 20); }
  function cartCount() { return Object.keys(cart).reduce(function (n, k) { return n + cart[k]; }, 0); }
  function cartItems() { return Object.keys(cart).map(function (k) { return { p: find(k), q: cart[k] }; }).filter(function (x) { return x.p; }); }
  function cartTotal() {
    var items = cartItems(), total = 0, allPriced = items.length > 0;
    items.forEach(function (it) { var pr = priceOf(it.p); if (pr == null) allPriced = false; else total += pr * it.q; });
    return { total: total, allPriced: allPriced };
  }
  function setQty(slug, q) {
    q = Math.max(0, Math.min(maxQty(), q));
    if (q === 0) delete cart[slug]; else cart[slug] = q;
    saveCart(); renderCart();
  }

  function orderMessage(cust) {
    var items = cartItems(), t = cartTotal(), lines = [];
    lines.push("Hi " + C.brand.name + "! I'd like to order:");
    lines.push("");
    items.forEach(function (it, i) {
      var pr = priceOf(it.p);
      lines.push((i + 1) + ". " + it.p.name + " (" + it.p.weight + ") x " + it.q + " - " + (pr != null ? money(pr * it.q) : "price to be confirmed"));
    });
    lines.push("");
    lines.push(t.allPriced ? "Total: " + money(t.total) + " (delivery, if any, to be confirmed)" : "Total: to be confirmed");
    lines.push("");
    lines.push("Name: " + cust.name);
    if (cust.phone) lines.push("Phone: " + cust.phone);
    lines.push("Address: " + cust.address);
    if (cust.note) lines.push("Note: " + cust.note);
    lines.push("");
    lines.push("Sent from the " + C.brand.name + " website.");
    return lines.join("\n");
  }

  function renderCart() {
    if (!cartUI.fab) return;
    var n = cartCount();
    cartUI.badge.textContent = n;
    cartUI.fabLabel.textContent = n ? "Your order" : "Order on WhatsApp";
    cartUI.fab.setAttribute("aria-label", n ? "Open your order, " + n + (n === 1 ? " item" : " items") : "Order on WhatsApp");
    cartUI.badge.classList.toggle("hide", n === 0);
    var items = cartItems();
    if (!items.length) {
      cartUI.lines.innerHTML = '<p class="cart-empty">Your order is empty. Add products with the <b>+ Add to order</b> buttons, then send the order to us on WhatsApp.</p><p><a class="btn btn-ghost btn-sm" href="products.html">Browse products</a></p>';
      cartUI.total.innerHTML = ""; cartUI.form.classList.add("hide"); cartUI.send.classList.add("hide"); cartUI.clear.classList.add("hide");
      return;
    }
    cartUI.form.classList.remove("hide"); cartUI.send.classList.remove("hide"); cartUI.clear.classList.remove("hide");
    cartUI.lines.innerHTML = items.map(function (it) {
      var pr = priceOf(it.p);
      return '<div class="cart-line"><img src="' + img(it.p, 1, true) + '" alt="" width="56" height="74">' +
        '<div class="cl-main"><b>' + esc(it.p.name) + '</b><span>' + esc(it.p.weight) + (pr != null ? ' &middot; ' + money(pr) + ' each' : ' &middot; price to be confirmed') + '</span>' +
        '<div class="qty" role="group" aria-label="Quantity of ' + esc(it.p.name) + '"><button type="button" data-q="-1" data-slug="' + esc(it.p.slug) + '" aria-label="Fewer">&minus;</button><span aria-live="polite">' + it.q + '</span><button type="button" data-q="1" data-slug="' + esc(it.p.slug) + '" aria-label="More">+</button>' +
        '<button type="button" class="rm" data-q="rm" data-slug="' + esc(it.p.slug) + '">Remove</button></div></div>' +
        '<div class="cl-price">' + (pr != null ? money(pr * it.q) : "&ndash;") + '</div></div>';
    }).join("");
    var t = cartTotal(), min = parseInt(ord().minOrder, 10) || 0, html = "";
    if (t.allPriced) html = '<div class="cart-sum"><span>Total</span><b>' + money(t.total) + '</b></div><p class="fine">Prices are MRP. Delivery charges, if any, are confirmed on WhatsApp.</p>';
    else html = '<p class="fine">Some items have no price listed here &mdash; we\u2019ll confirm the total on WhatsApp.</p>';
    if (min && t.allPriced && t.total < min) html += '<p class="cart-warn">Minimum order is ' + money(min) + '. Please add ' + money(min - t.total) + ' more.</p>';
    cartUI.total.innerHTML = html;
    cartUI.send.disabled = !!(min && t.allPriced && t.total < min);
  }

  function openCart(opener) {
    lastFocus = opener || document.activeElement;
    cartUI.toast.classList.remove("show"); cartUI.toast.hidden = true;
    cartUI.overlay.hidden = false; cartUI.panel.hidden = false;
    document.body.style.overflow = "hidden";
    renderCart();
    var c = cartUI.panel.querySelector(".cart-x"); if (c) c.focus();
  }
  function closeCart() {
    if (cartUI.panel.hidden) return;
    cartUI.overlay.hidden = true; cartUI.panel.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
  }
  function toast(msg) {
    var t = cartUI.toast;
    t.innerHTML = '<span>' + esc(msg) + '</span><button type="button" data-open-cart>View order</button>';
    t.hidden = false; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove("show"); t.hidden = true; }, 3800);
  }

  function initOrdering() {
    if (!orderingOn()) return;
    loadCart();
    var d = document.createElement("div");
    d.innerHTML =
      '<button type="button" class="cart-fab" id="cartfab">' + ICON.wa + '<span id="cartlabel">Order on WhatsApp</span><span class="n hide" id="cartbadge">0</span></button>' +
      '<div class="cart-overlay" hidden></div>' +
      '<aside class="cart-panel" role="dialog" aria-modal="true" aria-label="Your WhatsApp order" hidden>' +
      '<div class="cart-head"><h2>Your order</h2><button type="button" class="cart-x" aria-label="Close">&times;</button></div>' +
      '<div class="cart-body"><div id="cartlines"></div><div id="carttotal"></div>' +
      '<form id="cartform" class="hide" novalidate>' +
      '<div class="field"><label for="c-name">Your name</label><input id="c-name" type="text" autocomplete="name"></div>' +
      '<div class="field"><label for="c-phone">Phone (optional)</label><input id="c-phone" type="tel" autocomplete="tel"></div>' +
      '<div class="field"><label for="c-addr">Delivery address</label><textarea id="c-addr" rows="3" autocomplete="street-address"></textarea></div>' +
      '<div class="field"><label for="c-note">Note (optional)</label><input id="c-note" type="text"></div>' +
      '<p class="cart-warn hide" id="carterr" role="alert"></p></form>' +
      '<p class="fine" id="cartnotes"></p></div>' +
      '<div class="cart-foot"><button type="button" class="btn btn-wa" id="cartsend">Send order on WhatsApp</button><button type="button" class="btn btn-ghost btn-sm" id="cartclear">Clear</button></div></aside>' +
      '<div class="toast" hidden></div>';
    while (d.firstChild) document.body.appendChild(d.firstChild);
    cartUI = {
      fab: $("#cartfab"), fabLabel: $("#cartlabel"), badge: $("#cartbadge"), overlay: $(".cart-overlay"), panel: $(".cart-panel"),
      lines: $("#cartlines"), total: $("#carttotal"), form: $("#cartform"), send: $("#cartsend"), clear: $("#cartclear"), err: $("#carterr"), toast: $(".toast")
    };
    var notes = [];
    if (ord().deliveryNote) notes.push(ord().deliveryNote);
    if (ord().paymentNote) notes.push(ord().paymentNote);
    notes.push("This is an order request. It is confirmed only when we reply on WhatsApp.");
    $("#cartnotes").innerHTML = notes.map(esc).join("<br>");
    try { var cu = JSON.parse(localStorage.getItem(CUST_KEY) || "{}"); $("#c-name").value = cu.name || ""; $("#c-phone").value = cu.phone || ""; $("#c-addr").value = cu.address || ""; } catch (e) {}

    cartUI.fab.addEventListener("click", function () { openCart(cartUI.fab); });
    cartUI.overlay.addEventListener("click", closeCart);
    $(".cart-x").addEventListener("click", closeCart);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeCart(); });
    cartUI.clear.addEventListener("click", function () { cart = {}; saveCart(); renderCart(); });
    cartUI.lines.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("button[data-q]") : null; if (!b) return;
      var slug = b.getAttribute("data-slug"), a = b.getAttribute("data-q");
      if (a === "rm") setQty(slug, 0); else setQty(slug, (cart[slug] || 0) + parseInt(a, 10));
    });
    cartUI.send.addEventListener("click", function () {
      var cust = { name: $("#c-name").value.trim(), phone: $("#c-phone").value.trim(), address: $("#c-addr").value.trim(), note: $("#c-note").value.trim() };
      var err = !cust.name ? "Please enter your name." : (!cust.address ? "Please enter your delivery address." : "");
      cartUI.err.textContent = err; cartUI.err.classList.toggle("hide", !err);
      if (err) { (cust.name ? $("#c-addr") : $("#c-name")).focus(); return; }
      try { localStorage.setItem(CUST_KEY, JSON.stringify({ name: cust.name, phone: cust.phone, address: cust.address })); } catch (e) {}
      var url = waLink(orderMessage(cust));
      var w = window.open(url, "_blank");
      if (w) { try { w.opener = null; } catch (e) {} } else { window.location.href = url; }
    });
    document.addEventListener("click", function (e) {
      var add = e.target.closest ? e.target.closest("[data-add]") : null;
      if (add) {
        var slug = add.getAttribute("data-add"), p = find(slug); if (!p) return;
        setQty(slug, (cart[slug] || 0) + 1);
        toast(p.name + " added to your order");
        return;
      }
      var op = e.target.closest ? e.target.closest("[data-open-cart]") : null;
      if (op) { e.preventDefault(); openCart(op); }
    });
    renderCart();
  }

  /* ------------------------------------------------------------- boot */
  function boot() {
    renderHeader(); renderFooter(); bindConfig();
    if (page === "home") initHome();
    if (page === "products") initProducts();
    if (page === "product") initProduct();
    if (page === "contact") initContact();
    initOrdering(); initSEO(); initAnalytics(); initPreloader(); initReveal();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
