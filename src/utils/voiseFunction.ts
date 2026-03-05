import { getSavedNotifications } from "../hooks/getSavedNotifications";
import type { VoiceKey } from "./gameType";
import type { MobileOS } from "../utils/utils";

const VOICE_CONFIG = {
  "3": { lang: "en-US", hint: ["us", "america"] },
  "2": { lang: "en-GB", hint: ["uk", "brit", "england"] },
  "1": { lang: "en-AU", hint: ["australia", "au"] },
} as const;

export const speakText = (
  text: string,
  voiceKey?: VoiceKey,
  os?: MobileOS,
  onEnd?: () => void
) => {
  const notifications = getSavedNotifications();
  if (!notifications?.sound) return;

  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;

  if (synth.speaking) {
    synth.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.rate = 0.8;
  utterance.pitch = 1;

  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();

  const key: VoiceKey =
    voiceKey && VOICE_CONFIG[voiceKey]
      ? voiceKey
      : (notifications.voice as VoiceKey) in VOICE_CONFIG
      ? (notifications.voice as VoiceKey)
      : "1";

  const target = VOICE_CONFIG[key];

  const play = () => {
    const voices = synth.getVoices();

    if (!voices.length) return;

    const lowerHints = target.hint.map((h) => h.toLowerCase());

    // 1️⃣ шукаємо по назві голосу
    let selected = voices.find((v) =>
      lowerHints.some((h) => v.name.toLowerCase().includes(h))
    );

    // 2️⃣ шукаємо по мові
    if (!selected) {
      selected = voices.find((v) =>
        v.lang.toLowerCase().startsWith(target.lang.toLowerCase())
      );
    }

    // 3️⃣ будь-який англійський
    if (!selected) {
      selected = voices.find((v) => v.lang.startsWith("en"));
    }

    // 4️⃣ fallback
    if (!selected) {
      selected = voices[0];
    }

    utterance.voice = selected;
    utterance.lang = selected.lang;

    synth.speak(utterance);
  };

  if (synth.getVoices().length) {
    play();
  } else {
    synth.addEventListener("voiceschanged", play, { once: true });
  }
   const isApple = os === "iOS" || os === "Mac";
   console.log(isApple)
};