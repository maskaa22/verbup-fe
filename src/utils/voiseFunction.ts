import { getSavedNotifications } from "../hooks/getSavedNotifications";
import type { VoiceKey } from "./gameType";

const FIXED_VOICES = {
  "1": { name: "Google US English", lang: "en-US" },
  "2": { name: "Google UK English", lang: "en-GB" },
  "3": { name: "Google UK English Male", lang: "en-GB" },
} as const;

export const speakText = (text: string, voiceKey?: VoiceKey) => {
  const notifications = getSavedNotifications();
  if (!notifications?.sound) return;

  if (!("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported");
    return;
  }

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;

  // 🔐 гарантуємо валідний ключ
  const key: VoiceKey =
    voiceKey && FIXED_VOICES[voiceKey]
      ? voiceKey
      : (notifications.voice as VoiceKey) in FIXED_VOICES
        ? (notifications.voice as VoiceKey)
        : "1";

  const targetVoice = FIXED_VOICES[key];

  const play = () => {
    const voices = speechSynthesis.getVoices();

    if (!voices.length) {
      console.warn("No voices available");
      return;
    }

    // шукаємо точне співпадіння
    // let selected = voices.find(
    //   (v) => v.name === targetVoice.name && v.lang === targetVoice.lang
    // );
    let selected = voices.find(
      (v) =>
        v.name.includes(targetVoice.name) &&
        v.lang.startsWith(targetVoice.lang),
    );

    // // fallback по lang
    // if (!selected) {
    //   selected = voices.find((v) => v.lang === targetVoice.lang);
    // }

    // // остаточний fallback
    // if (!selected) {
    //   selected = voices[0];
    // }

    if (!selected) {
      selected = voices.find((v) => v.lang.startsWith(targetVoice.lang));
    }

    if (!selected) {
      selected = voices.find((v) => v.default);
    }

    if (!selected) {
      selected = voices[0];
    }

    utterance.voice = selected;
    utterance.lang = selected.lang;

    speechSynthesis.speak(utterance);
  };

  if (speechSynthesis.getVoices().length > 0) {
    play();
  } else {
    speechSynthesis.addEventListener("voiceschanged", play, { once: true });
  }
};
