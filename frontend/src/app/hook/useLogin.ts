import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

type SignupError = {
  message: string;
};

type SignupRes = {
  email: string;
  password: string;
  error: SignupError;
  token: string
};

export const useLogin = () => {
  const [error, setError] = useState<SignupError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const res = await fetch("http://localhost:3001/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json: SignupRes = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return { login, isLoading, error };
};
