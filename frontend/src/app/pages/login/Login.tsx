import { styled } from "@stitches/react";
import { useState } from "react";
import { useLogin } from './../../hook/useLogin';


export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Log in</Title>
      <Label>Email:</Label>
      <Input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Label>Password:</Label>
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button disabled={isLoading}>Log in</Button>
      {error && <Error>{error.message}</Error>}
    </Form>
  );
};

const Form = styled("form", {
  maxWidth: "400px",
  margin: "40px auto",
  padding: "20px",
  backgroundColor: "$white",
  borderRadius: "4px",
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

  ".error": {
    border: "1px solid #e7195a",
  },
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
