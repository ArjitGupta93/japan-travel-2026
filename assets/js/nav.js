// Shared header and footer, defined once.
// To add a page, add one line to PAGES below.
// Links to our own pages open in the same tab on purpose.
const PAGES = [
  { href: "index.html", label: "Home" },
  { href: "visa.html", label: "Visa" },
  { href: "stay-travel.html", label: "Stay & Travel" },
  { href: "explore.html", label: "Explore" },
];

// Cookieless analytics (GoatCounter), loaded on every page from here.
(function loadAnalytics() {
  const script = document.createElement("script");
  script.async = true;
  script.dataset.goatcounter = "https://japan-travel-2026.goatcounter.com/count";
  script.src = "https://gc.zgo.at/count.js";
  document.head.appendChild(script);
})();

// Count clicks on downloads (anything linked from assets/docs/) as events.
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href*='assets/docs/']");
  if (!link || !window.goatcounter || !window.goatcounter.count) return;
  const file = link.getAttribute("href").split("/").pop();
  window.goatcounter.count({ path: `download/${file}`, title: `Download: ${file}`, event: true });
});

function currentPage() {
  const file = window.location.pathname.split("/").pop();
  return file === "" ? "index.html" : file;
}

function buildHeader() {
  const current = currentPage();
  const links = PAGES.map(({ href, label }) => {
    const active = href === current ? ' aria-current="page"' : "";
    return `<li><a href="${href}"${active}>${label}</a></li>`;
  }).join("");

  return `
    <div class="site-header__inner">
      <a class="nav-brand" href="index.html">Japan Travel <span>Journal</span></a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav class="site-nav" id="site-nav" aria-label="Main">
        <ul>${links}</ul>
      </nav>
    </div>`;
}

function buildFooter() {
  return `
    <div class="site-footer__inner">
      <p>A personal travel journal, written from my own experience. Not official advice: always check official sources.</p>
      <p>Anonymous visit counts via GoatCounter. No cookies, no personal data.</p>
      <p>&copy; ${new Date().getFullYear()}</p>
    </div>`;
}

function setupMenu(header) {
  const toggle = header.querySelector(".nav-toggle");
  const nav = header.querySelector(".site-nav");
  const mobile = window.matchMedia("(max-width: 52rem)");

  // Collapsed only on small screens; always visible on desktop.
  function sync() {
    nav.hidden = mobile.matches && toggle.getAttribute("aria-expanded") !== "true";
  }

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    sync();
  });
  mobile.addEventListener("change", sync);
  sync();
}

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) {
    header.innerHTML = buildHeader();
    setupMenu(header);
  }
  if (footer) footer.innerHTML = buildFooter();
});
