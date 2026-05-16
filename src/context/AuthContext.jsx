import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { getMe } from "../services/auth.js";

const AuthContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { user: action.user, token: action.token };
    case "LOGOUT":
      return { user: null, token: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { user: null, token: null });
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("fb_token");
    if (!token) {
      setBooting(false);
      return;
    }

    getMe()
      .then((data) => {
        dispatch({ type: "LOGIN", user: data.user || data, token });
      })
      .catch(() => {
        localStorage.removeItem("fb_token");
      })
      .finally(() => setBooting(false));
  }, []);

  function login(user, token) {
    localStorage.setItem("fb_token", token);
    dispatch({ type: "LOGIN", user, token });
  }

  function logout() {
    localStorage.removeItem("fb_token");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider value={{ ...state, booting, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
