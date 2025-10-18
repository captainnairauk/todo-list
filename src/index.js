import "./style.css";
import { AppManager } from "./app-manager.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = new AppManager();
  app.init();
});
