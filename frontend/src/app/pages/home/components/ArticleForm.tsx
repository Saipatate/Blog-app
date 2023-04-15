import { useState } from "react";
import { styled } from "@stitches/react";
import { useArticlesContext } from "./../../../hook/useArticlesContext";

export const ArtilceForm: React.FC = () => {
  const { dispatch } = useArticlesContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields]: any[] = useState([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const article = { title, description, theme };

    const res = await fetch(import.meta.env.VITE_APP + "articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (res.ok) {
      setEmptyFields([]);
      setError(null);
      setTitle("");
      setDescription("");
      setTheme("");
      dispatch({ type: "CREATE_ARTICLE", payload: json });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Add a new Article</Title>
      <Label>Title:</Label>
      <Input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <Label>Description:</Label>
      <Textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      ></Textarea>
      <Label>Theme:</Label>
      <Input
        type="text"
        onChange={(e) => setTheme(e.target.value)}
        value={theme}
      />
      <Button>Add Article</Button>
      {error && <Error>{error}</Error>}
    </Form>
  );
};

const Form = styled("form", {
  width: "350px",

  "@media screen and (max-width: 400px)": {
    width: "100%",
  },
});

const Title = styled("h1", {
  color: "$darkGray",
  marginBottom: "30px",
});

const Label = styled("label", {
  display: "block",
});

const Input = styled("input", {
  padding: "10px",
  marginTop: "10px",
  marginBottom: "20px",
  width: "100%",
  border: "1px solid $lightGray",
  borderRadius: "4px",
  outline: "none",
});

const Textarea = styled("textarea", {
  padding: "10px",
  marginTop: "10px",
  marginBottom: "20px",
  width: "100%",
  height: "150px",
  border: "1px solid $lightGray",
  borderRadius: "4px",
  outline: "none",
  resize: "none",
});

const Button = styled("button", {
  backgroundColor: "$green",
  border: 0,
  color: "$white",
  padding: "10px",
  borderRadius: "4px",
  cursor: "pointer",
});

const Error = styled("div", {
  padding: "10px",
  backgroundColor: "ffefef",
  border: "1px solid #e7195a",
  color: "#e7195a",
  borderRadius: "4px",
  margin: "20px 0",
});
