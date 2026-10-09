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
})();
