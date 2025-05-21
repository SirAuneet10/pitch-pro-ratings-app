
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { User, Trophy, LineChart, LogOut } from "lucide-react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, logout, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-full p-1.5">
              <Trophy size={20} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Player Ratings</span>
          </Link>
          
          {isAuthenticated && (
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-sm text-muted-foreground">
                {currentUser?.email}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut size={18} />
                <span className="sr-only md:not-sr-only md:ml-2">Logout</span>
              </Button>
            </div>
          )}
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Navigation at bottom for mobile */}
      {isAuthenticated && (
        <nav className="bg-card border-t border-border py-2 md:py-3 sticky bottom-0">
          <div className="container mx-auto flex justify-around">
            <Link 
              to="/dashboard" 
              className={`flex flex-col items-center p-1 ${
                isActive("/dashboard") 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User size={20} />
              <span className="text-xs mt-1">Dashboard</span>
            </Link>
            
            <Link 
              to="/ratings" 
              className={`flex flex-col items-center p-1 ${
                isActive("/ratings") 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LineChart size={20} />
              <span className="text-xs mt-1">Rate Players</span>
            </Link>
            
            <Link 
              to="/leaderboard" 
              className={`flex flex-col items-center p-1 ${
                isActive("/leaderboard") 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Trophy size={20} />
              <span className="text-xs mt-1">Leaderboard</span>
            </Link>
            
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`flex flex-col items-center p-1 ${
                  isActive("/admin") 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User size={20} />
                <span className="text-xs mt-1">Admin</span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
