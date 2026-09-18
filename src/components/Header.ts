import { getLanguage, setLanguage, t } from "../i18n/translations";
import { SupportedLanguage } from "../types";
import { toggleAudioMute, getAudioMuted, startVoiceRecognition } from "../services/speech";

export interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onVoiceSearch?: (query: string) => void;
}

export function renderHeader(props: HeaderProps): HTMLElement {
  const header = document.createElement("header");
  header.className = "app-header";

  const tr = t();
  const currentLang = getLanguage();
  const isMuted = getAudioMuted();

  header.innerHTML = `
    <div class="header-inner">
      <a href="#landing" class="brand-wrapper" id="brand-link">
        <div class="brand-icon">
          <span>🩺</span>
        </div>
        <div>
          <h1 class="brand-title">${tr.appName}</h1>
          <p class="brand-subtitle">${tr.appTagline}</p>
        </div>
      </a>

      <nav aria-label="Main Navigation">
        <ul class="nav-links">
          <li><button class="nav-link ${props.currentRoute === "landing" ? "active" : ""}" data-route="landing">${tr.nav.landing}</button></li>
          <li><button class="nav-link ${props.currentRoute === "commandCentre" ? "active" : ""}" data-route="commandCentre">${tr.nav.commandCentre}</button></li>
          <li><button class="nav-link ${props.currentRoute === "phcDetail" ? "active" : ""}" data-route="phcDetail">${tr.nav.phcDetail}</button></li>
          <li><button class="nav-link ${props.currentRoute === "forecast" ? "active" : ""}" data-route="forecast">${tr.nav.forecast}</button></li>
          <li><button class="nav-link ${props.currentRoute === "alerts" ? "active" : ""}" data-route="alerts">
            ${tr.nav.alerts} <span class="clay-badge clay-badge-critical" style="font-size:0.7rem; padding:0.15rem 0.45rem;">!</span>
          </button></li>
          <li><button class="nav-link ${props.currentRoute === "resourceUpdate" ? "active" : ""}" data-route="resourceUpdate">${tr.nav.resourceUpdate}</button></li>
          <li><button class="nav-link ${props.currentRoute === "federated" ? "active" : ""}" data-route="federated">${tr.nav.federated}</button></li>
        </ul>
      </nav>

      <div class="header-controls">
        <button class="clay-btn mute-btn" id="voice-search-btn" title="Voice Search (Click and speak)">
          <span id="voice-icon">🎙️</span>
        </button>

        <button class="clay-btn mute-btn" id="audio-mute-btn" title="${isMuted ? tr.voice.unmute : tr.voice.mute}">
          <span>${isMuted ? "🔇" : "🔊"}</span>
        </button>

        <select class="clay-select lang-select" id="lang-select" aria-label="Language Selector">
          <option value="en" ${currentLang === "en" ? "selected" : ""}>English (EN)</option>
          <option value="hi" ${currentLang === "hi" ? "selected" : ""}>हिन्दी (HI)</option>
          <option value="bho" ${currentLang === "bho" ? "selected" : ""}>भोजपुरी (BHO)</option>
        </select>
      </div>
    </div>
  `;

  // Event handlers
  header.querySelectorAll(".nav-link").forEach(btn => {
    btn.addEventListener("click", () => {
      const route = (btn as HTMLElement).dataset.route || "landing";
      props.onNavigate(route);
    });
  });

  header.querySelector("#brand-link")?.addEventListener("click", (e) => {
    e.preventDefault();
    props.onNavigate("landing");
  });

  const langSelect = header.querySelector("#lang-select") as HTMLSelectElement;
  langSelect?.addEventListener("change", () => {
    setLanguage(langSelect.value as SupportedLanguage);
  });

  const muteBtn = header.querySelector("#audio-mute-btn") as HTMLButtonElement;
  muteBtn?.addEventListener("click", () => {
    const muted = toggleAudioMute();
    muteBtn.innerHTML = `<span>${muted ? "🔇" : "🔊"}</span>`;
    muteBtn.title = muted ? tr.voice.unmute : tr.voice.mute;
  });

  const voiceBtn = header.querySelector("#voice-search-btn") as HTMLButtonElement;
  let isListening = false;
  let voiceRecognitionSession: { stop: () => void } | null = null;

  voiceBtn?.addEventListener("click", () => {
    if (isListening) {
      voiceRecognitionSession?.stop();
      isListening = false;
      voiceBtn.classList.remove("alarm-active");
      voiceBtn.innerHTML = `<span>🎙️</span>`;
    } else {
      voiceBtn.classList.add("alarm-active");
      voiceBtn.innerHTML = `<span style="color:#e11d48;">🔴</span>`;
      isListening = true;

      voiceRecognitionSession = startVoiceRecognition(
        (query) => {
          if (props.onVoiceSearch) props.onVoiceSearch(query);
          isListening = false;
          voiceBtn.classList.remove("alarm-active");
          voiceBtn.innerHTML = `<span>🎙️</span>`;
        },
        () => {
          isListening = false;
          voiceBtn.classList.remove("alarm-active");
          voiceBtn.innerHTML = `<span>🎙️</span>`;
        },
        currentLang
      );
    }
  });

  return header;
}
