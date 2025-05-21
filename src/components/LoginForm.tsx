
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      alert("Please enter a valid email address");
      return;
    }
    
    setLoading(true);
    // Simulate a short delay for login
    setTimeout(() => {
      login(email);
      setLoading(false);
    }, 500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto bg-primary rounded-full p-3 w-16 h-16 flex items-center justify-center">
          <Trophy size={32} className="text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">Player Ratings</CardTitle>
        <CardDescription>
          Sign in with your email to rate your teammates and view your ratings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-secondary"
            />
            <p className="text-xs text-muted-foreground px-2">
              *Contains "admin" for admin access
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
