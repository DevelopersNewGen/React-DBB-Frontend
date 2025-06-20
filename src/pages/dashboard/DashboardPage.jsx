import React from "react";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { useUser } from "../../shared/hooks";

export const DashboardPage = () => {
  const { user, isLoading } = useUser();
  const role = user?.role;


  return (
    <>
      <ResponsiveAppBar role={role} />
      <div>Dashboard</div>
    </>
  );
};