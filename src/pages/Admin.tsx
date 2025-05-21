
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import AdminPanel from "@/components/AdminPanel";

const Admin = () => {
  const { isAdmin } = useAuth();
  
  // Redirect non-admin users
  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <AdminPanel />
      </div>
    </Layout>
  );
};

export default Admin;
