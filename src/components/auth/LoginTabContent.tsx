
import React from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import InputField from "./InputField";
import RememberMeCheckbox from "./RememberMeCheckbox";
import { TabsContent } from "@/components/ui/tabs";

interface LoginTabContentProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  rememberMe: boolean;
  setRememberMe: (rememberMe: boolean) => void;
  loading: boolean;
  login: (email: string, password: string, rememberMe: boolean) => void;
}

const LoginTabContent: React.FC<LoginTabContentProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  loading,
  login,
}) => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.includes('@') || !password) {
      toast.error("Please enter a valid email and password");
      return;
    }
    
    // Simulate a short delay for login
    setTimeout(() => {
      login(email, password, rememberMe);
    }, 500);
  };

  return (
    <TabsContent value="login">
      <CardContent className="pt-4">
        <form onSubmit={handleLogin} className="space-y-4">
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            Icon={Mail}
          />
          
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            Icon={Lock}
          />
          
          <RememberMeCheckbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={setRememberMe}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </TabsContent>
  );
};

export default LoginTabContent;
