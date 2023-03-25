import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ArticlesContextProvider } from "./app/context/ArticleContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <ArticlesContextProvider>
        <App />
        </ArticlesContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
