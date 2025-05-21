
import React from "react";
import Layout from "@/components/Layout";
import LeaderboardComponent from "@/components/Leaderboard";

const LeaderboardPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>
        <LeaderboardComponent />
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
