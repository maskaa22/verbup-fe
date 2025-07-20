import { speakText } from "../voiseFunction";

export const speakTextWithPauses = (words: string[]) => {
  let index = 0;

  const speakNext = () => {
    if (index < words.length) {
      const utterance = speakText(words[index], true);
      utterance.onend = () => {
        index++;
        setTimeout(speakNext, 400); // pause between words
      };
    }
  };

  speakNext();
};