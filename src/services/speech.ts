import { SupportedLanguage } from "../types";

let isAudioMuted = false;

export function toggleAudioMute(): boolean {
  isAudioMuted = !isAudioMuted;
  if (isAudioMuted && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  return isAudioMuted;
}

export function getAudioMuted(): boolean {
  return isAudioMuted;
}

export function playAlarmChime() {
  if (isAudioMuted) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.35); // A4

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // AudioContext might be blocked until user interaction
  }
}

export function speakAlert(text: string, lang: SupportedLanguage = "en"): Promise<void> {
  return new Promise((resolve) => {
    if (isAudioMuted) {
      resolve();
      return;
    }
    if (!("speechSynthesis" in window)) {
      console.warn("Speech synthesis not supported in this browser.");
      resolve();
      return;
    }

    window.speechSynthesis.cancel();
    playAlarmChime();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    // Pick best voice
    const voices = window.speechSynthesis.getVoices();
    if (lang === "hi" || lang === "bho") {
      utterance.lang = "hi-IN";
      const hindiVoice = voices.find(v => v.lang === "hi-IN" || v.lang.startsWith("hi"));
      if (hindiVoice) utterance.voice = hindiVoice;
    } else {
      utterance.lang = "en-IN";
      const engVoice = voices.find(v => v.lang === "en-IN") || voices.find(v => v.lang.startsWith("en"));
      if (engVoice) utterance.voice = engVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    // Small delay to allow chime
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 150);
  });
}

export function startVoiceRecognition(
  onResult: (text: string) => void,
  onEnd?: () => void,
  lang: SupportedLanguage = "en"
): { stop: () => void } | null {
  const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognitionClass) {
    alert("Speech recognition is not supported in this browser. Please use Chrome/Edge.");
    return null;
  }

  const recognition = new SpeechRecognitionClass();
  recognition.lang = lang === "en" ? "en-IN" : "hi-IN";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  recognition.onerror = (e: any) => {
    console.warn("Speech recognition error:", e);
    if (onEnd) onEnd();
  };

  recognition.start();

  return {
    stop: () => {
      try {
        recognition.stop();
      } catch (err) {}
    }
  };
}
