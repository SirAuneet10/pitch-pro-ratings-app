
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type User = {
  email: string;
  isAdmin?: boolean;
};

type AuthContextType = {
  currentUser: User | null;
  login: (email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("footballRatingUser");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("footballRatingUser");
      }
    }
  }, []);

  const login = (email: string) => {
    // In a real app, this would validate with a backend
    const isAdmin = email.includes("admin");
    const user = { email, isAdmin };
    
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("footballRatingUser", JSON.stringify(user));
    toast.success("Logged in successfully!");
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("footballRatingUser");
    toast.info("Logged out");
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated,
    isAdmin: currentUser?.isAdmin || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
