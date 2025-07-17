export const setVh = () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
  console.log(window.innerHeight)
};
