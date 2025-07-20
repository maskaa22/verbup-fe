import { speakText } from "../voiseFunction";

export const speakWordsIndividually = (wordList: string[], soundEnabled = true, pauseMs = 500) => {
  if(!soundEnabled) return;
  let index = 0;

  const speakNext = () => {
    if(index >= wordList.length) return;
    speakText(wordList[index], soundEnabled);
    index++;
    setTimeout(speakNext, pauseMs);
  };

  speakNext();
};