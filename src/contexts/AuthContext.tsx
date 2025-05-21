
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  email: string;
  name?: string;
  isAdmin: boolean;
  profilePicture?: string;
  bio?: string;
  position?: string;
};

type AuthContextType = {
  currentUser: User | null;
  login: (email: string, password: string, rememberMe: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  updateUserProfile: (data: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check localStorage on component mount for persistent login
  useEffect(() => {
    const savedUser = localStorage.getItem("footballRatingUser");
    const persistentToken = localStorage.getItem("persistentToken");
    
    // If we have a persistent token or a saved user session
    if (persistentToken || savedUser) {
      try {
        // In a real app with Supabase/Firebase, we'd validate the token here
        const parsedUser = savedUser ? JSON.parse(savedUser) : null;
        if (parsedUser) {
          setCurrentUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("footballRatingUser");
        localStorage.removeItem("persistentToken");
      }
    }
  }, []);

  const login = (email: string, password: string, rememberMe: boolean) => {
    // In a real app with Supabase/Firebase, we'd verify credentials here
    // For demo purposes, we're simulating the authentication process
    // In production, NEVER store passwords in the frontend
    
    // Simulate login for demo (in real app, this would validate with backend)
    const isAdmin = email.includes("admin");
    
    const mockedUser = {
      id: `user-${Date.now()}`,
      email,
      isAdmin,
      name: email.split("@")[0],
    };
    
    setCurrentUser(mockedUser);
    setIsAuthenticated(true);
    
    // Store in session storage by default
    sessionStorage.setItem("footballRatingUser", JSON.stringify(mockedUser));
    
    // If "remember me" is checked, also store in localStorage for persistence
    if (rememberMe) {
      localStorage.setItem("footballRatingUser", JSON.stringify(mockedUser));
      // In a real app, we would store a refresh token instead of the full user object
      localStorage.setItem("persistentToken", `token-${Date.now()}`);
    }
    
    toast.success("Logged in successfully!");
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    
    // Clear both session and local storage
    sessionStorage.removeItem("footballRatingUser");
    localStorage.removeItem("footballRatingUser");
    localStorage.removeItem("persistentToken");
    
    toast.info("Logged out");
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    
    const updatedUser = { ...currentUser, ...data };
    setCurrentUser(updatedUser);
    
    // Update in storage
    if (localStorage.getItem("footballRatingUser")) {
      localStorage.setItem("footballRatingUser", JSON.stringify(updatedUser));
    }
    if (sessionStorage.getItem("footballRatingUser")) {
      sessionStorage.setItem("footballRatingUser", JSON.stringify(updatedUser));
    }
    
    toast.success("Profile updated successfully!");
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated,
    isAdmin: currentUser?.isAdmin || false,
    updateUserProfile,
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
