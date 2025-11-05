const API_BASE = "https://drone-backend-uj55.onrender.com";
const DRONE_ID = "65011024";
const DRONE_NAME = "Sasiwimol";
const COUNTRY = "Thailand";

const pages = {
  config: () => import("./config.js").then(m => m.loadConfigPage()),
  temperature: () => import("./temperature.js").then(m => m.loadTempPage()),
  logs: () => import("./logs.js").then(m => m.loadLogsPage())
};

function navigateTo(page, addHistory = true) {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === page);
  });

  if (pages[page]) {
    pages[page]();
  }

  if (addHistory) {
    window.history.pushState({ page }, "", `/${page}`);
  }
}

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const page = btn.dataset.page;
    navigateTo(page);
  });
});

window.addEventListener("popstate", event => {
  const page = event.state?.page || getPageFromPath();
  navigateTo(page, false);
});

function getPageFromPath() {
  const path = window.location.pathname.replace("/", "");
  if (["config", "temperature", "logs"].includes(path)) {
    return path;
  }
  return "config"; 
}

navigateTo(getPageFromPath(), false);
