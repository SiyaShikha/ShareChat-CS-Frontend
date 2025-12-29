import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

console.log("ENV CHECK:", import.meta.env);
console.log("API URL CHECK:", import.meta.env.VITE_API_URL);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
