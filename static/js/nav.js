(function () {
  function closeMenu(nav, menu, toggle) {
    nav.classList.remove("nav--open");
    menu.classList.remove("is-open");
    toggle.classList.remove("is-active");
    toggle.setAttribute("aria-expanded", "false");
  }

  function initNav(nav) {
    const toggle = nav.querySelector(".nav__toggle");
    const menu = nav.querySelector(".nav__mobile");

    if (!toggle || !menu || toggle.dataset.navReady === "true") {
      return;
    }

    toggle.dataset.navReady = "true";

    toggle.addEventListener("click", () => {
      const isOpen = !menu.classList.contains("is-open");
      nav.classList.toggle("nav--open", isOpen);
      menu.classList.toggle("is-open", isOpen);
      toggle.classList.toggle("is-active", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu(nav, menu, toggle);
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && menu.classList.contains("is-open")) {
        closeMenu(nav, menu, toggle);
      }
    });
  }

  function initAllNavs() {
    document.querySelectorAll(".nav").forEach(initNav);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAllNavs);
  } else {
    initAllNavs();
  }
}());
