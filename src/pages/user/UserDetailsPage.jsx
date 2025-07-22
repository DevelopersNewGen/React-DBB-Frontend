import React from "react";
import { ResponsiveAppBar } from "../../components/Navbar";
import { UserDetails } from "../../components/user/UserDetails";

export const UserDetailsPage = () => (
  <>
    <ResponsiveAppBar />
    <div style={{ marginTop: 70 }}>
      <UserDetails />
    </div>
  </>
);