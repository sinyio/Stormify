import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
  FC,
} from "react";
import { AuthResponse, User } from "@/entities/user";
import axios from "axios";

interface AuthContextProps {
  token: string | null;
  user: User | null;
  login: (authData: AuthResponse) => void;
  logout: () => void;
  isLoggedIn: boolean;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
  refreshToken: async () => {},
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [refreshTokenValue, setRefreshTokenValue] = useState<string | null>(
    null
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");
    const storedRefreshToken = localStorage.getItem("authRefreshToken");
    if (storedToken && storedUser && storedRefreshToken) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setRefreshTokenValue(storedRefreshToken);
    }
  }, []);

  const login = useCallback((authData: AuthResponse) => {
    setToken(authData.token);
    setUser(authData.user);
    localStorage.setItem("authToken", authData.token);
    localStorage.setItem("authUser", JSON.stringify(authData.user));
    if (authData.refresh_token) {
      localStorage.setItem("authRefreshToken", authData.refresh_token);
      setRefreshTokenValue(authData.refresh_token);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setRefreshTokenValue(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    localStorage.removeItem("authRefreshToken");
  }, []);

  const refreshToken = useCallback(async () => {
    if (!refreshTokenValue) {
      console.log("No refresh token available");
      logout();
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/refresh`,
        {
          refresh_token: refreshTokenValue,
        }
      );
      const {
        token: newToken,
        user: newUser,
        refresh_token: newRefreshToken,
      } = response.data;
      setToken(newToken);
      setUser(newUser);
      setRefreshTokenValue(newRefreshToken);
      localStorage.setItem("authToken", newToken);
      localStorage.setItem("authUser", JSON.stringify(newUser));
      localStorage.setItem("authRefreshToken", newRefreshToken);
    } catch (error) {
      console.error("Error during token refresh:", error);
      logout();
    }
  }, [refreshTokenValue, logout]);

  const isLoggedIn = !!token;
  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isLoggedIn, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
