
import React from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import InputField from "./InputField";
import RememberMeCheckbox from "./RememberMeCheckbox";
import { TabsContent } from "@/components/ui/tabs";

interface RegisterTabContentProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  rememberMe: boolean;
  setRememberMe: (rememberMe: boolean) => void;
  loading: boolean;
  login: (email: string, password: string, rememberMe: boolean) => void;
}

const RegisterTabContent: React.FC<RegisterTabContentProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  rememberMe,
  setRememberMe,
  loading,
  login,
}) => {
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.includes('@') || !password) {
      toast.error("Please enter a valid email and password");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // Simulate registration and login
    setTimeout(() => {
      login(email, password, rememberMe);
    }, 500);
  };

  return (
    <TabsContent value="register">
      <CardContent className="pt-4">
        <form onSubmit={handleSignUp} className="space-y-4">
          <InputField
            id="signup-email"
            label="Email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            Icon={Mail}
          />
          
          <InputField
            id="signup-password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            Icon={Lock}
          />
          
          <InputField
            id="confirm-password"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            Icon={Lock}
          />
          
          <RememberMeCheckbox
            id="remember-signup"
            checked={rememberMe}
            onCheckedChange={setRememberMe}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
    </TabsContent>
  );
};

export default RegisterTabContent;
