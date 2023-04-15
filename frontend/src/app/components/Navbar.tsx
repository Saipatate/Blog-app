import { styled } from "@stitches/react";
import { useLogout } from "./../hook/useLogout";
import { useAuthContext } from "./../hook/useAuthContext";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <Nav>
      <Title>MyBlog</Title>
      {user && (
        <UserContainer>
          <Name>{user.email}</Name>
          <Pircture src="/img/user-default.jpg" />
          <Button onClick={handleClick}>Log out</Button>
        </UserContainer>
      )}
      {!user && (
        <Links>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </Links>
      )}
    </Nav>
  );
};

const Nav = styled("nav", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "$white",
  padding: "30px 10%",

  "@media screen and (max-width: 640px)": {
    flexDirection: "column",
    gap: "20px",
  },
});

const Title = styled("h1", {
  color: "$darkGray",
  fontSize: "$xl",
});

const UserContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "15px",

  "@media screen and (max-width: 400px)": {
    flexDirection: "column",
    gap: "20px",
  },
});

const Button = styled("button", {
  backgroundColor: "$green",
  border: "none",
  color: "$white",
  padding: "8px 12px",
  borderRadius: "4px",
  cursor: "pointer",
});

const Name = styled("p", {
  fontSize: "$xs",
  fontWeight: "600",
  color: "$green",
});

const Pircture = styled("img", {
  width: "45px",
  borderRadius: "50%",
});

const Links = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "20px",

  a: {
    color: "$green",
    textDecoration: "none",
    position: "relative",

    "&::after": {
      content: "",
      background: "$green",
      height: "4px",
      position: "absolute",
      left: "0",
      bottom: "-5px",
    },

    "&:hover::after": {
      width: "100%",
    },
  },
});
