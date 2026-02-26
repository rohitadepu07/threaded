import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Index from "./pages/Index.tsx";

createRoot(document.getElementById("root")!).render(<App />);

// Ensure this is the ONLY default export in the file
export default Index;