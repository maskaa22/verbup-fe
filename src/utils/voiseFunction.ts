import { getSavedNotifications } from "../hooks/getSavedNotifications";
import type { VoiceKey } from "./gameType";
import type { MobileOS } from "../utils/utils";

const VOICE_LANG = {
  "1": "en-US",
  "2": "en-GB",
  "3": "en-AU",
} as const;

export const speakText = (
  text: string,
  voiceKey?: VoiceKey,
  os?: MobileOS,
  onEnd?: () => void
) => {
  const notifications = getSavedNotifications();

  if (!notifications?.sound) return;

  if (!("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported");
    return;
  }

  const synth = window.speechSynthesis;

  // 🔊 якщо щось уже говорить — зупиняємо
  if (synth.speaking) {
    synth.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.rate = 0.75;
  utterance.pitch = 1;

  utterance.onend = () => {
    onEnd?.();
  };

  utterance.onerror = () => {
    onEnd?.();
  };

  // 🔐 визначаємо мову
  const key: VoiceKey =
    voiceKey && VOICE_LANG[voiceKey]
      ? voiceKey
      : (notifications.voice as VoiceKey) in VOICE_LANG
      ? (notifications.voice as VoiceKey)
      : "1";

  const targetLang = VOICE_LANG[key];

  const play = () => {
    const voices = synth.getVoices();

    if (!voices.length) {
      console.warn("No voices available");
      return;
    }

    // 1️⃣ голос потрібної мови
    const selected =
      voices.find((v) => v.lang.startsWith(targetLang)) ||

      // 2️⃣ будь-який англійський
      voices.find((v) => v.lang.startsWith("en")) ||

      // 3️⃣ системний дефолт
      voices.find((v) => v.default) ||

      // 4️⃣ перший доступний
      voices[0];

    utterance.voice = selected;
    utterance.lang = selected.lang;

    synth.speak(utterance);
  };

  // ⚡ Safari / iOS fix
  if (synth.getVoices().length > 0) {
    play();
  } else {
    synth.addEventListener("voiceschanged", play, { once: true });
  }

   const isApple = os === "iOS" || os === "Mac";

   console.log(isApple)
};