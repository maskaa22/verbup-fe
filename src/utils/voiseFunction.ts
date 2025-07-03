export const speakText = (text: string, soundEnabled = true) => {
  if (!soundEnabled) return;

  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.95;
  speechSynthesis.speak(utterance);
};