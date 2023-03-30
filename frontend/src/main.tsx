import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ArticlesContextProvider } from "./app/context/ArticleContext";
import { AuthContextProvider } from "./app/context/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ArticlesContextProvider>
          <App />
        </ArticlesContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
