function initNewsSections() {
  document.querySelectorAll(".news-section[data-news-visible]").forEach((section) => {
    const visible = parseInt(section.dataset.newsVisible, 10);
    if (!visible || Number.isNaN(visible)) return;

    const items = section.querySelectorAll("ul > li");
    const checkbox = section.querySelector(".news-expand-input");
    const toggleWrap = section.querySelector(".news-toggle")?.closest("p");

    if (items.length <= visible) {
      if (toggleWrap) toggleWrap.style.display = "none";
      return;
    }

    function update() {
      const expanded = checkbox?.checked;
      items.forEach((item, index) => {
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

if (typeof document$ !== "undefined") {
  document$.subscribe(initNewsSections);
} else {
  document.addEventListener("DOMContentLoaded", initNewsSections);
}
