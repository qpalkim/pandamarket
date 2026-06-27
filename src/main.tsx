import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "@/providers/AuthProvider.tsx";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.scss";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToastContainer />
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
