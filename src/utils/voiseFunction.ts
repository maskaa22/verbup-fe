import { getSavedNotifications } from "../hooks/getSavedNotifications";
import type { VoiceKey } from "./gameType";
import type { MobileOS } from "../utils/utils";

const FIXED_VOICES_GOOGLE = {
  "1": { name: "Google US English", lang: "en-US" },
  "2": { name: "Google UK English", lang: "en-GB" },
  "3": { name: "Google UK English Male", lang: "en-GB" },
} as const;

const FIXED_VOICES_APPLE = {
  "1": { name: "Samantha", lang: "en-US" }, // 🇺🇸 найприємніший
  "2": { name: "Daniel", lang: "en-GB" },   // 🇬🇧 британський
  "3": { name: "Karen", lang: "en-AU" },    // 🇦🇺 австралійський
} as const;

export const speakText = (
  text: string,
  voiceKey?: VoiceKey,
  os?: MobileOS
) => {
  const notifications = getSavedNotifications();
  if (!notifications?.sound) return;

  if (!("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported");
    return;
  }

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;

  // 🔥 Apple detection
  const isApple = os === "iOS" || os === "Mac";

  const VOICES = isApple
    ? FIXED_VOICES_APPLE
    : FIXED_VOICES_GOOGLE;

  // 🔐 гарантуємо валідний ключ
  const key: VoiceKey =
    voiceKey && VOICES[voiceKey]
      ? voiceKey
      : (notifications.voice as VoiceKey) in VOICES
        ? (notifications.voice as VoiceKey)
        : "1";

  const targetVoice = VOICES[key];

  const play = () => {
    const voices = speechSynthesis.getVoices();

    if (!voices.length) {
      console.warn("No voices available");
      return;
    }

    // 1️⃣ точне співпадіння по імені + мові
    const selected =
      voices.find(
        (v) =>
          v.name.toLowerCase().includes(targetVoice.name.toLowerCase()) &&
          v.lang.startsWith(targetVoice.lang)
      ) ||

      // 2️⃣ fallback по мові
      voices.find((v) =>
        v.lang.startsWith(targetVoice.lang)
      ) ||

      // 3️⃣ системний дефолт
      voices.find((v) => v.default) ||

      // 4️⃣ перший доступний
      voices[0];

    utterance.voice = selected;
    utterance.lang = selected.lang;

    speechSynthesis.speak(utterance);
  };

  // ⚡ Safari fix
  if (speechSynthesis.getVoices().length > 0) {
    play();
  } else {
    speechSynthesis.addEventListener("voiceschanged", play, { once: true });
  }
};
