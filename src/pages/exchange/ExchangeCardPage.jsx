import React from "react";
import { ResponsiveAppBar } from "../../components/Navbar";
import { ExchangeCalculator } from "../../components/exchange/ExchangeCard.jsx";

export const ExchangePage = () => {
  return (
    <>
      <ResponsiveAppBar />
      <main style={{ marginTop: 70, padding: '1rem' }}>
        <ExchangeCalculator />
      </main>
    </>
  );
};

export default ExchangePage;