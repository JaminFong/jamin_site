function initNewsSections() {
  document.querySelectorAll(".news-section[data-news-visible]").forEach((section) => {
    const visible = parseInt(section.dataset.newsVisible, 10);
    if (!visible || Number.isNaN(visible)) return;

    const checkbox = section.querySelector(".news-expand-input");
    const toggleWrap = section.querySelector(".news-toggle")?.closest("p");

    function items() {
      return section.querySelectorAll(":scope > ul > li");
    }

    if (items().length <= visible) {
      if (toggleWrap) toggleWrap.style.display = "none";
      return;
    }

    if (toggleWrap) toggleWrap.style.display = "";

    function update() {
      const expanded = checkbox?.checked;
      items().forEach((item, index) => {
        item.style.display = !expanded && index >= visible ? "none" : "";
      });
    }

    if (checkbox && !checkbox.dataset.newsBound) {
      checkbox.dataset.newsBound = "true";
      checkbox.addEventListener("change", update);
    }

    update();
  });
}

function bootNewsSections() {
  initNewsSections();
}

if (typeof document$ !== "undefined") {
  document$.subscribe(bootNewsSections);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootNewsSections);
} else {
  bootNewsSections();
}
