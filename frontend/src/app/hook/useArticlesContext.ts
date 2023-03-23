import { useContext } from "react";
import { ArticlesContext } from "../context/ArticleContext";

export const useArticlesContext = () => {
    const context = useContext(ArticlesContext)

    if (!context) {
        throw Error("useArticlesContext must be used inside an ArticlesContextProvider")
    }

    return context
}