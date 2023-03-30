import React, { createContext, useReducer, useEffect } from 'react';

type UserLogin = {
  email: string;
  password: string
  token: string
}

type UserSignup = {
  pseudo?: string;
  email: string;
  password: string
  token: string
}

type AuthState = { 
  user: UserSignup | null 
} &  { 
  user:UserLogin | null 
};

type AuthAction = {
  type: "SIGNUP";
  payload: UserSignup;
} | {
  type: "LOGIN";
  payload: UserLogin;
} | {
  type: "LOGOUT";
}

type AuthContextValue = AuthState & {
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SIGNUP":
      return { user: action.payload };
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
}

type AuthContextProviderProps = {
  children: React.ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, [])

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider };