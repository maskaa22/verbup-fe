import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";

createRoot(document.getElementById("root")!).render(
 
  <StrictMode> 
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter></Provider>
  </StrictMode>
);

// ✅ А це реєстрація service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.ts") // або service-worker.ts (якщо з Webpack/Vite loader)
      .then((reg) => console.log("✅ Service Worker зареєстровано", reg))
      .catch((err) => console.error("❌ Помилка Service Worker:", err));
  });
}