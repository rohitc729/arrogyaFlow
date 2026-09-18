import "./styles/claymorphism.css";
import "./styles/main.css";

import { renderHeader } from "./components/Header";
import { onLanguageChange, t } from "./i18n/translations";
import { renderLandingView } from "./views/LandingView";
import { renderCommandCentreView } from "./views/CommandCentreView";
import { renderPhcDetailView } from "./views/PhcDetailView";
import { renderForecastView } from "./views/ForecastView";
import { renderAlertCentreView } from "./views/AlertCentreView";
import { renderResourceUpdateView } from "./views/ResourceUpdateView";
import { renderFederatedLearningView } from "./views/FederatedLearningView";
import { FacilityOperationalDataService } from "./services/FacilityOperationalDataService";
import { showCriticalAlarmModal } from "./components/AlarmModal";

// Route state
let currentRoute = "landing";
let routeParams: Record<string, string> = {};

function parseHash() {
  const hash = window.location.hash.replace(/^#/, "") || "landing";
  const [route, queryStr] = hash.split("?");
  currentRoute = route || "landing";
  routeParams = {};

  if (queryStr) {
    const usp = new URLSearchParams(queryStr);
    usp.forEach((val, key) => {
      routeParams[key] = val;
    });
  }
}

function navigateTo(route: string, params?: Record<string, string>) {
  currentRoute = route;
  routeParams = params || {};

  let hash = `#${route}`;
  if (params && Object.keys(params).length > 0) {
    const usp = new URLSearchParams(params);
    hash += `?${usp.toString()}`;
  }
  window.location.hash = hash;
  renderApp();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleVoiceSearch(transcript: string) {
  const q = transcript.toLowerCase();
  if (q.includes("command") || q.includes("dashboard") || q.includes("map")) {
    navigateTo("commandCentre");
  } else if (q.includes("alert") || q.includes("emergency") || q.includes("khatra") || q.includes("aapat")) {
    navigateTo("alerts");
  } else if (q.includes("forecast") || q.includes("bhavishya") || q.includes("ai")) {
    navigateTo("forecast");
  } else if (q.includes("update") || q.includes("login") || q.includes("entry")) {
    navigateTo("resourceUpdate");
  } else if (q.includes("federated") || q.includes("privacy")) {
    navigateTo("federated");
  } else if (q.includes("buxar") || q.includes("phc") || q.includes("ors") || q.includes("medicine")) {
    navigateTo("phcDetail", { phcId: "PHC-BXR-012" });
  } else {
    alert(`Voice Query Heard: "${transcript}". Navigating to Command Centre.`);
    navigateTo("commandCentre");
  }
}

function renderApp() {
  const appContainer = document.getElementById("app");
  if (!appContainer) return;

  appContainer.innerHTML = "";

  // 1. Header
  const header = renderHeader({
    currentRoute,
    onNavigate: (route) => navigateTo(route),
    onVoiceSearch: (transcript) => handleVoiceSearch(transcript)
  });
  appContainer.appendChild(header);

  // 2. Main Content
  const main = document.createElement("main");
  main.className = "main-content";
  main.id = "app-root";

  switch (currentRoute) {
    case "landing":
      main.appendChild(renderLandingView({ onNavigate: navigateTo }));
      break;
    case "commandCentre":
      main.appendChild(renderCommandCentreView({ onNavigate: navigateTo, routeParams }));
      break;
    case "phcDetail":
      main.appendChild(renderPhcDetailView({ initialPhcId: routeParams.phcId, onNavigate: navigateTo }));
      break;
    case "forecast":
      main.appendChild(renderForecastView({ initialPhcId: routeParams.phcId, onNavigate: navigateTo }));
      break;
    case "alerts":
      main.appendChild(renderAlertCentreView({ onNavigate: navigateTo }));
      break;
    case "resourceUpdate":
      main.appendChild(renderResourceUpdateView({ onNavigate: navigateTo }));
      break;
    case "federated":
      main.appendChild(renderFederatedLearningView({ onNavigate: navigateTo }));
      break;
    default:
      main.appendChild(renderLandingView({ onNavigate: navigateTo }));
  }

  appContainer.appendChild(main);

  // 3. Footer
  const footer = document.createElement("footer");
  footer.className = "app-footer";
  footer.innerHTML = `
    <div class="footer-inner">
      <div>
        <strong>AarogyaFlow AI</strong> · India's Federated PHC Health Resource Intelligence
        <div style="font-size:0.75rem; color:var(--text-light); margin-top:0.2rem;">
          Integrated with open datasets from <strong>data.gov.in</strong> (Rural Health Statistics & NLEM) + Local Operational Facility Data
        </div>
      </div>
      <div style="display:flex; gap:1rem; align-items:center;">
        <span class="clay-badge clay-badge-stable" style="font-size:0.75rem;">Status: All 7 PHC Nodes Active</span>
        <span>Emergency Helplines: <strong>108 / 104</strong></span>
      </div>
    </div>
  `;
  appContainer.appendChild(footer);
}

// Initial Setup
window.addEventListener("DOMContentLoaded", () => {
  parseHash();
  renderApp();

  // Listen to hash changes
  window.addEventListener("hashchange", () => {
    parseHash();
    renderApp();
  });

  // Listen to language change
  onLanguageChange(() => {
    renderApp();
  });

  // Check if critical alarm modal should auto-popup once for immediate user awareness
  const dataService = FacilityOperationalDataService.getInstance();
  const criticalAlerts = dataService.getAlerts().filter(a => a.severity === "critical" && a.status === "active");
  if (criticalAlerts.length > 0 && !sessionStorage.getItem("alarm_shown")) {
    sessionStorage.setItem("alarm_shown", "true");
    setTimeout(() => {
      showCriticalAlarmModal(criticalAlerts[0], () => renderApp(), () => renderApp());
    }, 1800);
  }
});
