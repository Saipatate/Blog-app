import { styled } from "@stitches/react";
import { HiOutlineTrash } from "react-icons/hi";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useArticlesContext } from "../../../hook/useArticlesContext";

type Props = {
  article: any;
};

export const ArticleDetails: React.FC<Props> = ({ article }) => {
  const { dispatch } = useArticlesContext();

  const handleClick = async () => {
    const res = await fetch(
      import.meta.env.VITE_APP + "articles/" + article._id,
      {
        method: "DELETE",
      }
    );
    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_ARTICLE", payload: json });
    }
  };

  return (
    <Container>
      <Header>
        <Title>{article.title}</Title>
        <DeleteIcon onClick={handleClick}>
          <HiOutlineTrash style={{ fontSize: "22px", color: "#111" }} />
        </DeleteIcon>
      </Header>
      <Content>{article.description}</Content>
      <Footer>
        <Tag>{article.theme}</Tag>
        <Time>
          {formatDistanceToNow(new Date(article.createdAt), {
            addSuffix: true,
          })}
        </Time>
      </Footer>
    </Container>
  );
};

const Container = styled("div", {
  backgroundColor: "$white",
  width: "700px",
  padding: "15px",
  borderRadius: "8px",

  "@media screen and (max-width: 800px)": {
    width: "100%",
  },
});

const Header = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px",
});

const Title = styled("h1", {
  fontSize: "$l",
  color: "$green",
  fontWeight: "800",
});

const DeleteIcon = styled("button", {
  display: "flex",
  backgroundColor: "$darkWhite",
  padding: "4px",
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
});

const Content = styled("p", {
  fontSize: "$xs",
  color: "$darkGray",
  marginBottom: "20px",
  wordWrap: "break-word",
});

const Footer = styled("footer", {
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

const Tag = styled("p", {
  fontSize: "$xs",
  color: "$darkGray",
  backgroundColor: "$darkWhite",
  padding: "8px 15px",
  borderRadius: "20px",
});

const Time = styled("p", {
  fontSize: "$xs",
  color: "$darkGray",
  fontWeight: "500",
});
