import React from "react";
import MakeWithdrawalForm from "../../components/movemnts/MakeWithdrawalForm";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";

const MakeWithdrawalPage = () => {
  return (
    <>
      <ResponsiveAppBar />
      <div>
        <h2>Realizar Retiro</h2>
        <MakeWithdrawalForm />
      </div>
    </>
  );
};

export default MakeWithdrawalPage;