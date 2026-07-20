/* ============================================================
   AI Tool Hub — Global Image Lightbox (P0-8)
   Progressive enhancement. No dependencies. ~1.4KB.
   Activates on:
     - [data-lightbox] containers (any img inside opens overlay)
     - .screenshot-gallery img
     - .prose img[data-lightbox-able] or figure[data-lightbox]
   Keyboard: Esc close, ArrowLeft/Right prev/next.
   ============================================================ */
(function () {
  "use strict";
  if (typeof window === "undefined") return;

  var overlay = null;
  var imgEl = null;
  var capEl = null;
  var gallery = [];
  var index = 0;

  function ensureOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement("div");
    overlay.className = "lb-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Image viewer");
    overlay.hidden = true;
    overlay.innerHTML =
      '<button class="lb-close" type="button" aria-label="Close">&times;</button>' +
      '<button class="lb-prev" type="button" aria-label="Previous">&#8249;</button>' +
      '<img class="lb-img" alt="" />' +
      '<button class="lb-next" type="button" aria-label="Next">&#8250;</button>' +
      '<p class="lb-cap"></p>' +
      '<span class="lb-count"></span>';
    imgEl = overlay.querySelector(".lb-img");
    capEl = overlay.querySelector(".lb-cap");
    document.body.appendChild(overlay);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target.classList.contains("lb-close")) close();
    });
    overlay.querySelector(".lb-prev").addEventListener("click", function (e) { e.stopPropagation(); show(index - 1); });
    overlay.querySelector(".lb-next").addEventListener("click", function (e) { e.stopPropagation(); show(index + 1); });
    document.addEventListener("keydown", function (e) {
      if (!overlay || overlay.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(index - 1);
      else if (e.key === "ArrowRight") show(index + 1);
    });
    return overlay;
  }

  function collectSiblings(img) {
    // Build a gallery from the parent [data-lightbox] container or .screenshot-gallery
    var scope = img.closest("[data-lightbox], .screenshot-gallery, figure[data-lightbox]");
    if (!scope) return [img];
    var imgs = Array.prototype.slice.call(scope.querySelectorAll("img"));
    return imgs.length ? imgs : [img];
  }

  function open(img) {
    gallery = collectSiblings(img);
    index = gallery.indexOf(img);
    if (index < 0) index = 0;
    ensureOverlay();
    show(index);
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function show(i) {
    if (!gallery.length) return;
    var n = gallery.length;
    index = (i % n + n) % n;
    var img = gallery[index];
    var fullSrc = img.getAttribute("data-full") || img.getAttribute("data-src-full") || img.currentSrc || img.src;
    imgEl.src = fullSrc;
    imgEl.alt = img.alt || "";
    var cap = img.getAttribute("data-caption");
    if (!cap) {
      var fig = img.closest("figure");
      if (fig) {
        var fc = fig.querySelector("figcaption");
        if (fc) cap = fc.textContent.trim();
      }
    }
    capEl.textContent = cap || "";
    capEl.hidden = !cap;
    var count = overlay.querySelector(".lb-count");
    count.textContent = n > 1 ? (index + 1) + " / " + n : "";
  }

  function close() {
    if (!overlay) return;
    overlay.hidden = true;
    imgEl.src = "";
    document.body.style.overflow = "";
  }

  function isLightboxTarget(img) {
    if (!img || img.tagName !== "IMG") return false;
    if (img.closest("a")) return false; // don't hijack clickable images
    if (img.closest("[data-lightbox]")) return true;
    if (img.closest(".screenshot-gallery")) return true;
    if (img.hasAttribute("data-lightbox-able")) return true;
    return false;
  }

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t && t.tagName === "IMG" && isLightboxTarget(t)) {
      e.preventDefault();
      open(t);
    }
  });
})();
