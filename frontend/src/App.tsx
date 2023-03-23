import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { styled, globalStyles } from "../stitches.config";
import { Home } from "./app/index";

function App() {
  useEffect(() => {
    globalStyles();
  }, []);

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  );
}

const Container = styled("main", {
  display: "flex",
  margin: "0 auto",
  maxWidth: "1400px",

  // background: "red"
});

export default App;
