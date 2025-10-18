import "./style.css";
import { AppManager } from "./app-manager.js";

const app = new AppManager();
document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
