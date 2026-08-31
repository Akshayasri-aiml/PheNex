
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
    // TypeScript declarations for the runtime CSS import are provided by the bundler.
    // @ts-ignore
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(<App />);
  