import { styled } from "@stitches/react";
import { HiOutlineTrash } from "react-icons/hi";

export const ArticleDetails: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Title</Title>
        <DeleteIcon>
          <HiOutlineTrash style={{ fontSize: "22px", color: "#111" }} />
        </DeleteIcon>
      </Header>
      <Content>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        modi ratione nulla quisquam sint inventore placeat. Neque et vel ab
        laboriosam! Recusandae sit repellendus quas sunt veritatis architecto
        aliquam inventore.
      </Content>
      <Footer>
        <Tag>tags</Tag>
        <Time>2 minutes</Time>
      </Footer>
    </Container>
  );
};

const Container = styled("section", {
  backgroundColor: "$white",
  width: "700px",
  padding: "15px",
  borderRadius: "8px",
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
