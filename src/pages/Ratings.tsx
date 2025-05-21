
import React from "react";
import Layout from "@/components/Layout";
import PlayerRatingForm from "@/components/PlayerRatingForm";

const Ratings = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Rate Players</h1>
        <PlayerRatingForm />
      </div>
    </Layout>
  );
};

export default Ratings;
