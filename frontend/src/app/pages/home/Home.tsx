import { useEffect, useState } from "react";
import { styled } from "@stitches/react";
import { ArticleDetails, ArtilceForm, Pagination } from "./components";
import { useArticlesContext } from "../../hook/useArticlesContext";
import { z } from "zod";

const ArtilceSchema = z.array(
  z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string(),
    theme: z.string(),
  })
);

export const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const { articles, dispatch } = useArticlesContext();

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch(import.meta.env.VITE_APP + "articles", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_ARTICLES", payload: json });
      }
      return ArtilceSchema.parse(json);
    };

    fetchArticles();
  }, [dispatch]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = articles?.slice(firstPostIndex, lastPostIndex);

  return (
    <Section>
      <ArticleDetailsContainer>
        {articles &&
          currentPosts?.map((article) => {
            return <ArticleDetails article={article} key={article._id} />;
          })}
        <Pagination
          totalArticles={articles?.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
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
  margin: "0 auto",

  "@media screen and (max-width: 1270px)": {
    width: "100%",
    flexDirection: "column-reverse",
    alignItems: "center",
  },
});

const ArticleDetailsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "30px",

  "@media screen and (max-width: 800px)": {
    width: "100%",
  },
});
