import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

type SignupRes = {
  email: string;
  password: string;
  error: null;
  token: string;
};

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const res = await fetch(import.meta.env.VITE_APP + "user/login", {
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
      window.location.href = "/";
    }
  };

  return { login, isLoading, error };
};
