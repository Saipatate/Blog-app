import { useEffect } from "react";
import { styled } from "@stitches/react";
import { ArticleDetails, ArtilceForm } from "./components";
import { useArticlesContext } from "../../hook/useArticlesContext"
import { z } from "zod";
import { useAuthContext } from './../../hook/useAuthContext';

const ArtilceSchema = z.array(
  z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string(),
    theme: z.string(),
  })
);

export const Home: React.FC = () => {
  const { articles, dispatch } = useArticlesContext();
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch("http://localhost:3001/api/articles", {
        headers: {'Authorization': `Bearer ${user?.token}`},
      });
      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_ARTICLES", payload: json });
      }
      return ArtilceSchema.parse(json);
    };

    fetchArticles();
  }, [dispatch]);

  return (
    <Section>
      <ArticleDetailsContainer>
        {articles &&
          articles.map((article) => {
            return <ArticleDetails article={article} key={article._id} />;
          })}
      </ArticleDetailsContainer>
      <ArtilceForm />
    </Section>
  );
};

const Section = styled("section", {
  padding: "50px 5%",
  display: "flex",
  alignItems: "start",
  justifyContent: "space-between",
  gap: "80px",
  maxWidth: "1400px",
  margin: "0 auto"
  // borderTop: "1px solid $dark"
});

const ArticleDetailsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "30px",
});