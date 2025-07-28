export function switchTheme() {
  const switchTheme = document.getElementById("themeSwitch");
  switchTheme.addEventListener("change", toggleTheme);
  let userHasChosenTheme = false;

  // определение текущей темы и новой темы
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    userHasChosenTheme = true;
    setTheme(newTheme);
  }

  // установка новой темы
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (userHasChosenTheme) {
      localStorage.setItem("theme", theme);
    }
  }

  // установка сохраненной темы из local storage
  // или тема браузера
  // или по времени суток (getThemeByTime)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const browserTheme = getBrowserTheme();
    if (browserTheme === "dark") {
      setTheme("dark");
    } else {
      const themeByTime = getThemeByTime();
      setTheme(themeByTime);
    }
  }

  // установка темы по времени суток
  function getThemeByTime() {
    const now = new Date().getHours();
    return now >= 7 && now <= 21 ? "light" : "dark";
  }

  // установки ос пользователя
  function getBrowserTheme() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    } else {
      return "light";
    }
  }
}
