// Sets the theme class before first paint, so the page never flashes the wrong theme.
// A file, not an inline script, so the Content-Security-Policy in vercel.json can stay at script-src 'self'.
(function () {
  var root = document.documentElement;
  try {
    var t = localStorage.getItem("theme");
    var isLight = t === "light" || (t !== "dark" && window.matchMedia("(prefers-color-scheme: light)").matches);
    root.classList.toggle("dark", !isLight);
    root.classList.toggle("light", isLight);
    root.style.colorScheme = isLight ? "light" : "dark";
    // The browser chrome follows the chosen theme, not just the OS setting.
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) metas[i].content = isLight ? "#fbf6ec" : "#0c0a09";
  } catch (e) {
    root.classList.add("dark");
  }
})();
