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
          <Name>{user.pseudo}</Name>
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
});

const Title = styled("h1", {
  color: "$darkGray",
  fontSize: "$xl",
});

const UserContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "15px",
});

const Button = styled("button", {});

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
});
