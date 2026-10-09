(()=>{
  document.querySelectorAll(".nav-toggle").forEach(button=>{
    button.addEventListener("click",()=>button.closest(".nav-section").classList.toggle("open"));
  });

  // Mobile sidebar drawer. The desktop sidebar remains permanently visible.
  const menuButton = document.querySelector(".mobile-menu-button");
  const sidebar = document.querySelector(".sidebar");
  if (menuButton && sidebar) {
    const backdrop = document.createElement("div");
    backdrop.className = "sidebar-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(backdrop);

    const setMenuOpen = (open) => {
      document.body.classList.toggle("sidebar-open", open);
      menuButton.setAttribute("aria-expanded", open ? "true" : "false");
      menuButton.setAttribute("aria-label", open ? "收起目录" : "打开目录");
    };

    menuButton.addEventListener("click", () => {
      setMenuOpen(!document.body.classList.contains("sidebar-open"));
    });
    backdrop.addEventListener("click", () => setMenuOpen(false));
    sidebar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => setMenuOpen(false));
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") setMenuOpen(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) setMenuOpen(false);
    });
  }

  const applyLanguage = (language) => {
    const lang = language === "en" ? "en" : "zh";
    document.body.dataset.language = lang;
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    document.querySelectorAll("[data-set-language]").forEach(button=>{
      const active = button.dataset.setLanguage === lang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    try { localStorage.setItem("linguisticsGuideLanguage", lang); } catch (e) {}
  };
  document.querySelectorAll("[data-set-language]").forEach(button=>{
    button.addEventListener("click",()=>applyLanguage(button.dataset.setLanguage));
  });
  let saved = "zh";
  try { saved = localStorage.getItem("linguisticsGuideLanguage") || "zh"; } catch (e) {}
  applyLanguage(saved);
})();
