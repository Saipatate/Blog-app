import { styled } from "@stitches/react";
import { ArticleDetails, ArtilceForm } from "./components";

export const Home: React.FC = () => {
  return (
    <Section>
      <ArticleDetails />
      <ArtilceForm />
    </Section>
  );
};

const Section = styled("section", {
  padding: "50px 5%",
  display: "flex",
  alignItems: "start",
  justifyContent: "space-between",
  gap: "40px",
  width: "100%",
  // borderTop: "1px solid $dark"

  // background: "blue"
});
