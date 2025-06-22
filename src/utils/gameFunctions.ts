
 export const handleKeyPress = (value: string, setText) => {
    setText((prev) => prev + value);
  };
export const handleBackspace = (setText) => {
    setText((prev) => prev.slice(0, -1));
  };

// export const handleEnter = (text:string, setText) => {
//     alert("Submitted: " + text);
//     setText("");
//   };
