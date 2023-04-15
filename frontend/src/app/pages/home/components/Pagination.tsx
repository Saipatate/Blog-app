import { styled } from "@stitches/react";

type PaginationProps = {
  totalArticles: number | undefined;
  postsPerPage: number;
  setCurrentPage: (pageNumber: number) => void;
  currentPage: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  totalArticles,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil((totalArticles || 0) / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <Container>
      {pages.map((page, i) => {
        return (
          <Button
            key={i}
            onClick={() => setCurrentPage(page)}
            className={page == currentPage ? "active" : ""}
          >
            {page}
          </Button>
        );
      })}
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

const Button = styled("button", {
  padding: "4px",
  backgroundColor: "$green",
  color: "$white",
  border: "none",
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  cursor: "pointer",

  "&.active": {
    backgroundColor: "transparent",
    border: "2px solid $green",
    color: "$darkGray",
  },
});
