
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import AdminPanel from "@/components/AdminPanel";
import PlayerManagement from "@/components/PlayerManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("ratings");
  
  // Redirect non-admin users
  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="ratings">Rating History</TabsTrigger>
            <TabsTrigger value="players">Player Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ratings">
            <AdminPanel />
          </TabsContent>
          
          <TabsContent value="players">
            <PlayerManagement />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
