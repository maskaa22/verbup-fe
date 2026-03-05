import { speakText } from "../voiseFunction";

let isSpeaking = false;
let timeoutIds: number[] = [];

export const stopSpeech = () => {
  speechSynthesis.cancel();
  timeoutIds.forEach((id) => clearTimeout(id));
  timeoutIds = [];
  isSpeaking = false;
};

export const speakWordsIndividually = (
  wordList: string[],
  pauseMs: number = 300,
): Promise<void> => {
  return new Promise((resolve) => {
    if (isSpeaking) return;

    stopSpeech();
    isSpeaking = true;

    let index = 0;

    const speakNext = () => {
      if (index >= wordList.length) {
        isSpeaking = false;
        resolve();
        return;
      }

      speakText(wordList[index]);

      const id = window.setTimeout(() => {
        index++;
        speakNext();
      }, pauseMs);

      timeoutIds.push(id);
    };

    speakNext();
  });
};
