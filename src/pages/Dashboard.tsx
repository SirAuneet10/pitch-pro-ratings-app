
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Trophy, User } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { currentUser } = useAuth();
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {currentUser?.email}</h1>
            <p className="text-muted-foreground">
              Rate your teammates and check the leaderboards
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="bg-secondary rounded-full p-4">
                  <User size={24} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{currentUser?.email}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentUser?.isAdmin ? "Admin User" : "Player"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Rate Players</CardTitle>
              <CardDescription>Submit your ratings for other players</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <Button className="w-full" asChild>
                <Link to="/ratings" className="flex items-center gap-2">
                  <LineChart size={18} />
                  <span>Rate Players Now</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Leaderboard</CardTitle>
              <CardDescription>See player rankings and stats</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/leaderboard" className="flex items-center gap-2">
                  <Trophy size={18} />
                  <span>View Leaderboard</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">About Player Ratings</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <p>
              Player Ratings is a platform that allows team members to rate each other's football skills. 
              Each rating contributes to a player's overall score, helping everyone understand their strengths and areas for improvement.
            </p>
            
            <h3>How Ratings Work:</h3>
            <ul>
              <li>Rate players on attributes like Pace, Shooting, Passing, and more</li>
              <li>Ratings are weighted based on player positions</li>
              <li>Your ratings will immediately update the leaderboard</li>
              <li>You can only rate each player once</li>
            </ul>
            
            <div className="bg-secondary rounded-lg p-4 mt-4">
              <h4 className="font-medium">Rating Guidelines</h4>
              <div className="flex items-center gap-3 mt-2">
                <div className="rating-value rating-red">65</div>
                <span>Below average</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="rating-value rating-yellow">75</div>
                <span>Average player</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="rating-value rating-green">85</div>
                <span>Excellent player</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
