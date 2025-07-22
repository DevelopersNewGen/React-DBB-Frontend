import React from "react";
import MakeDepositForm from "../../components/movemnts/MakeDepositForm";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { useUser } from "../../shared/hooks/useUser"; 

const MakeDepositPage = () => {
  const { role, isLoading } = useUser();

  if (isLoading) {
    return (
      <>
        <ResponsiveAppBar />
        <div style={{ maxWidth: 4000, margin: "0 auto", padding: 24 }}>
          <h1>Cargando...</h1>
        </div>
      </>
    );
  }

  if (role !== "ADMIN_ROLE") {
    return (
      <>
        <ResponsiveAppBar />
        <div style={{ maxWidth: 4000, margin: "0 auto", padding: 24 }}>
        </div>
      </>
    );
  }

  return (
    <>
      <ResponsiveAppBar />
      <div style={{ maxWidth: 4000, margin: "0 auto", padding: 24 }}>
        <h1>Depósito</h1>
        <MakeDepositForm />
      </div>
    </>
  );
};

export default MakeDepositPage;