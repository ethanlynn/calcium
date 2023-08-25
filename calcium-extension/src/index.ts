import "./index.css";
import App from "./App.svelte";
import { greet } from "calcium-search";

greet("Svelte");

const app = new App({
  target: document.getElementById("app"),
});

export default app;
