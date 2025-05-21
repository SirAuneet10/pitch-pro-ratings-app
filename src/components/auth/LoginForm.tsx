
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginTabContent from "./LoginTabContent";
import RegisterTabContent from "./RegisterTabContent";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = (email: string, password: string, rememberMe: boolean) => {
    setLoading(true);
    login(email, password, rememberMe);
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto bg-primary rounded-full p-3 w-16 h-16 flex items-center justify-center">
          <Trophy size={32} className="text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">Player Ratings</CardTitle>
        <CardDescription>
          Sign in or create an account to rate your teammates and view ratings
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Sign In</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <LoginTabContent 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          loading={loading}
          login={handleLogin}
        />
        
        <RegisterTabContent 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          loading={loading}
          login={handleLogin}
        />
      </Tabs>
      
      <CardFooter className="flex flex-col space-y-2 pt-0">
        <p className="text-xs text-center text-muted-foreground px-6 mt-2">
          *For admin access, include "admin" in your email (demo purposes only)
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
