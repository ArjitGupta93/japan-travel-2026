// Explore page: draws the galleries, filters them, and opens the lightbox.
// Data comes from explore-data.js (loaded first). Captions are set with
// textContent, never innerHTML, so they can't inject markup.

(function () {
  const sections = document.querySelectorAll(".city");
  const status = document.getElementById("gallery-status");
  const lightbox = document.getElementById("lightbox");
  if (!sections.length || !lightbox || typeof EXPLORE_ITEMS === "undefined") return;

  const media = lightbox.querySelector(".lightbox__media");
  const caption = lightbox.querySelector(".lightbox__caption");
  const count = lightbox.querySelector(".lightbox__count");
  const state = { city: "all", type: "all" };

  // ---- Gallery ----------------------------------------------------------

  function makeTile(item, index) {
    const li = document.createElement("li");
    li.className = "gallery__item";
    li.dataset.type = item.type;
    li.dataset.index = index;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "tile" + (item.kind === "video" ? " tile--video" : "");

    if (item.kind === "photo") {
      const img = new Image();
      img.src = item.src;
      img.alt = item.caption;
      img.width = 900;
      img.height = 1600;
      img.loading = "lazy";
      img.decoding = "async";
      button.append(img);
    } else {
      const play = document.createElement("span");
      play.className = "tile__play";
      play.setAttribute("aria-hidden", "true");
      const label = document.createElement("span");
      label.className = "sr-only";
      label.textContent = "Play video: " + item.caption;
      button.append(play, label);
    }

    const tag = document.createElement("span");
    tag.className = "tile__tag tile__tag--" + (item.kind === "video" ? "video" : item.type);
    tag.textContent = item.kind === "video" ? "Video" : item.type === "food" ? "Food" : "Sight";
    button.append(tag);

    if (item.badge) {
      const badge = document.createElement("span");
      badge.className = "tile__badge";
      badge.textContent = item.badge;
      button.append(badge);
    }

    button.addEventListener("click", () => openLightbox(index));

    const cap = document.createElement("span");
    cap.className = "tile__cap";
    cap.textContent = item.caption;

    li.append(button, cap);
    return li;
  }

  EXPLORE_ITEMS.forEach((item, index) => {
    const gallery = document.querySelector('.gallery[data-city="' + item.city + '"]');
    if (gallery) gallery.append(makeTile(item, index));
  });

  sections.forEach((section) => {
    const own = EXPLORE_ITEMS.filter((item) => item.city === section.dataset.city);
    const photos = own.filter((item) => item.kind === "photo").length;
    const clips = own.length - photos;
    const label = section.querySelector(".city__count");
    if (label) {
      label.textContent = photos + (photos === 1 ? " photo" : " photos") +
        (clips ? " and " + clips + (clips === 1 ? " clip" : " clips") : "");
    }
  });

  // ---- Filters ----------------------------------------------------------

  function applyFilters() {
    let shown = 0;
    sections.forEach((section) => {
      const cityOk = state.city === "all" || section.dataset.city === state.city;
      let visible = 0;
      section.querySelectorAll(".gallery__item").forEach((li) => {
        const ok = cityOk && (state.type === "all" || li.dataset.type === state.type);
        li.hidden = !ok;
        if (ok) visible += 1;
      });
      section.hidden = !cityOk || visible === 0;
      shown += visible;
    });
    status.textContent = "Showing " + shown + (shown === 1 ? " item" : " items");
  }

  document.querySelectorAll(".filter").forEach((chip) => {
    chip.addEventListener("click", () => {
      const group = chip.dataset.group; // "city" or "type"
      state[group] = chip.dataset.value;
      document
        .querySelectorAll('.filter[data-group="' + group + '"]')
        .forEach((other) => other.setAttribute("aria-pressed", String(other === chip)));
      applyFilters();
    });
  });

  applyFilters();

  // ---- Lightbox ---------------------------------------------------------

  let list = [];
  let position = 0;

  function visibleIndexes() {
    return Array.from(document.querySelectorAll(".gallery__item:not([hidden])")).map((li) =>
      Number(li.dataset.index)
    );
  }

  function show() {
    const item = EXPLORE_ITEMS[list[position]];
    let element;
    if (item.kind === "video") {
      element = document.createElement("video");
      element.controls = true;
      element.muted = true; // sound stays off until the viewer turns it on
      element.playsInline = true;
      element.preload = "metadata";
      element.src = item.src;
      element.setAttribute("aria-label", item.caption);
    } else {
      element = new Image();
      element.src = item.src;
      element.alt = item.caption;
    }
    media.replaceChildren(element);
    if (item.kind === "video") element.play().catch(() => {});
    caption.textContent = item.caption;
    count.textContent = position + 1 + " / " + list.length;
  }

  function step(direction) {
    position = (position + direction + list.length) % list.length;
    show();
  }

  function openLightbox(index) {
    list = visibleIndexes();
    position = Math.max(0, list.indexOf(index));
    show();
    lightbox.showModal();
  }

  lightbox.querySelector(".lightbox__prev").addEventListener("click", () => step(-1));
  lightbox.querySelector(".lightbox__next").addEventListener("click", () => step(1));
  lightbox.querySelector(".lightbox__close").addEventListener("click", () => lightbox.close());

  // Esc is handled by <dialog>. Arrow keys and clicks outside the picture are ours.
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  });
  lightbox.addEventListener("click", (event) => {
    if (!event.target.closest(".lightbox__figure, .lightbox__nav, .lightbox__close")) {
      lightbox.close();
    }
  });
  lightbox.addEventListener("close", () => media.replaceChildren()); // also stops any video

  let startX = null;
  lightbox.addEventListener("touchstart", (event) => { startX = event.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener("touchend", (event) => {
    if (startX === null) return;
    const dx = event.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    startX = null;
  }, { passive: true });
})();
