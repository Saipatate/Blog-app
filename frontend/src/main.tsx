import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ArticlesContextProvider } from "./app/context/ArticleContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
      <ArticlesContextProvider>
        <App />
        </ArticlesContextProvider>
      </BrowserRouter>
  </React.StrictMode>
);
