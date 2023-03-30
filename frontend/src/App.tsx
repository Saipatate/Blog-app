import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { styled, globalStyles } from "../stitches.config";
import { Home, Login, Navbar, Signup } from "./app/index";

function App() {
  useEffect(() => {
    globalStyles();
  }, []);

  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Container>
  );
}

const Container = styled("main", {
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
});

export default App;
