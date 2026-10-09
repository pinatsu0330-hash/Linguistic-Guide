(()=>{
  document.querySelectorAll(".nav-toggle").forEach(button=>{
    button.addEventListener("click",()=>button.closest(".nav-section").classList.toggle("open"));
  });

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

  // Mobile navigation drawer. This is injected so the same behavior works on every page.
  const header = document.querySelector(".site-header");
  const sidebar = document.querySelector(".sidebar");
  if (header && sidebar) {
    if (!sidebar.id) sidebar.id = "site-navigation";
    const menuButton = document.createElement("button");
    menuButton.type = "button";
    menuButton.className = "mobile-menu-toggle";
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.setAttribute("aria-controls", sidebar.id);
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.innerHTML = "<span></span><span></span><span></span>";
    const logo = header.querySelector(".logo");
    if (logo) header.insertBefore(menuButton, logo);
    else header.insertBefore(menuButton, header.firstChild);

    const backdrop = document.createElement("div");
    backdrop.className = "sidebar-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(backdrop);

    const setMenuOpen = (open) => {
      const isOpen = Boolean(open) && window.matchMedia("(max-width: 760px)").matches;
      document.body.classList.toggle("sidebar-open", isOpen);
      menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    };

    menuButton.addEventListener("click",()=>{
      setMenuOpen(!document.body.classList.contains("sidebar-open"));
    });
    backdrop.addEventListener("click",()=>setMenuOpen(false));
    sidebar.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>setMenuOpen(false)));
    document.addEventListener("keydown",event=>{
      if(event.key === "Escape") setMenuOpen(false);
    });
    window.addEventListener("resize",()=>{
      if(!window.matchMedia("(max-width: 760px)").matches) setMenuOpen(false);
    });
  }
})();
