export const handleKeyPress = (
  value: string,
  setText: React.Dispatch<React.SetStateAction<string>>
) => {
  setText((prev) => prev + value);
};

export const handleBackspace = (
  setText: React.Dispatch<React.SetStateAction<string>>
) => {
  setText((prev) => prev.slice(0, -1));
};

// export const handleEnter = (text:string, setText) => {
//     alert("Submitted: " + text);
//     setText("");
//   };
