import { createContext, useContext, useState, ReactNode, FC } from "react";

type UserRole = "admin" | "user";

interface AuthContextType {
  isAuthenticated: boolean;
  role: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved).isAuthenticated : false;
  });
  const [role, setRole] = useState<UserRole | null>(() => {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved).role : null;
  });

  const login = (userRole: UserRole) => {
    setIsAuthenticated(true);
    setRole(userRole);

    
    localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true, role: userRole }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);

    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
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
