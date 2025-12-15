import { createContext, useContext, useState, ReactNode, FC } from "react";

type UserRole = "admin" | "user";

type LoginPayload = {
  role: UserRole;
  name: string;
  email: string;
};

interface AuthContextType {
  isAuthenticated: boolean;
  role: UserRole | null;
  userName: string | null;
  userEmail: string | null;
  login: (payload: LoginPayload) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const readPersistedAuth = () => {
    if (typeof window === "undefined") {
      return null;
    }
    try {
      const raw = localStorage.getItem("auth");
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.error("Failed to parse persisted auth state", error);
      return null;
    }
  };

  const persistedAuth = readPersistedAuth();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => persistedAuth?.isAuthenticated ?? false
  );
  const [role, setRole] = useState<UserRole | null>(() => persistedAuth?.role ?? null);
  const [userName, setUserName] = useState<string | null>(() => persistedAuth?.userName ?? null);
  const [userEmail, setUserEmail] = useState<string | null>(() => persistedAuth?.userEmail ?? null);

  const login = ({ role: userRole, name, email }: LoginPayload) => {
    setIsAuthenticated(true);
    setRole(userRole);
    setUserName(name);
    setUserEmail(email);

    localStorage.setItem(
      "auth",
      JSON.stringify({ isAuthenticated: true, role: userRole, userName: name, userEmail: email })
    );
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    setUserName(null);
    setUserEmail(null);

    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, userName, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
