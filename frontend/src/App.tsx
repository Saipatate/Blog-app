import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { styled, globalStyles } from "../stitches.config";
import { Home, Login, Navbar, Signup } from "./app/index";

function App() {
  const token = window.localStorage.getItem("user");

  useEffect(() => {
    globalStyles();
  }, []);

  return (
    <Container>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            token ? <Home /> : <Title>Log in to access the blog :)</Title>
          }
        />
        <Route
          path="login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/" />}
        />
      </Routes>
    </Container>
  );
}

const Container = styled("main", {
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
});

const Title = styled("h1", {
  textAlign: "center",
  marginTop: "120px",
  color: "$darkGray",
});

export default App;
