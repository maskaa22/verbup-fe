import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { VibrationProvider } from "./hooks/VibrationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <VibrationProvider>
        <App />
      </VibrationProvider>
    </BrowserRouter>
  </Provider>,
);
