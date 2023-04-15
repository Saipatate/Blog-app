import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

type SignupRes = {
  email: string;
  password: string;
  token: string;
  error: null;
};

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const res = await fetch(import.meta.env.VITE_APP + "user/signup", {
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
      dispatch({ type: "SIGNUP", payload: json });
      setIsLoading(false);
      window.location.href = "/";
    }
  };

  return { signup, isLoading, error };
};
