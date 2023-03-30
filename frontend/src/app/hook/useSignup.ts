import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

type SignupError = {
  message: string;
};

type SignupRes = {
  pseudo: string;
  email: string;
  password: string;
  error: SignupError;
};

export const useSignup = () => {
  const [error, setError] = useState<SignupError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (pseudo: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const res = await fetch("http://localhost:3001/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudo, email, password }),
    });
    const json: SignupRes = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "SIGNUP", payload: json });
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
