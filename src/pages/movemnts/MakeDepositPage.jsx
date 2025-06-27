import React from "react";
import MakeDepositForm from "../../components/movemnts/MakeDepositForm";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";

const MakeDepositPage = () => {
  return (
    <>
      <ResponsiveAppBar />
      <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
        <h1>Depósito</h1>
        <MakeDepositForm />
      </div>
    </>
  );
};

export default MakeDepositPage;