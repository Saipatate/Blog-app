import { createContext, useReducer, ReactNode, FC } from "react";

interface Article {
  _id: string;
  title: string;
  content: string;
}

interface ArticlesState {
  articles: Article[] | null;
}

type Action =
  | { type: "SET_ARTICLES"; payload: Article[] }
  | { type: "CREATE_ARTICLE"; payload: Article }
  | { type: "DELETE_ARTICLE"; payload: Article };

interface ArticlesContextValue extends ArticlesState {
  dispatch: React.Dispatch<Action>;
}

export const ArticlesContext = createContext<ArticlesContextValue>(
  {} as ArticlesContextValue
);

export const articlesReducer = (
  state: ArticlesState,
  action: Action
): ArticlesState => {
  switch (action.type) {
    case "SET_ARTICLES":
      return {
        articles: action.payload,
      };
    case "CREATE_ARTICLE":
      return {
        articles: [action.payload, ...(state.articles ?? [])],
      };
    case "DELETE_ARTICLE":
      return {
        articles: (state.articles ?? []).filter(
          (art) => art._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

interface ArticlesContextProviderProps {
  children: ReactNode;
}

export const ArticlesContextProvider: FC<ArticlesContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(articlesReducer, {
    articles: null,
  });

  return (
    <ArticlesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ArticlesContext.Provider>
  );
};
