import React from "react";
import { useNavigate } from "react-router-dom";

const CreditCard = ({
  cardNumber = "8050 5040 2030 3020",
  cardHolder = "Prem Kumar Shahi",
  validThru = "XX/XX",
  brandLogo = "/logo.png",
  chipImg = "/chip.png",
  bgColor = "#1e1e1e"
}) => {
  return (
    <div
      className="creditcard-container"
      style={{
        backgroundColor: bgColor,
        maxWidth: 400,
        minHeight: 220,
        padding: 28,
        borderRadius: 24,
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "Poppins, sans-serif",
        color: "#fff",
      }}
    >
      <header
        className="creditcard-header"
        style={{
          marginBottom: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          className="creditcard-logo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <img
            src={brandLogo}
            alt="logo"
            style={{
              width: 48,
              height: 48,
              objectFit: "contain",
              borderRadius: 12,
              padding: 4,
            }}
          />
          <h5 style={{ fontSize: 16, margin: 0 }}>Master Card</h5>
        </span>
        <img
          src={chipImg}
          alt="chip"
          className="creditcard-chip"
          style={{
            width: 48,
            height: 32,
            objectFit: "contain",
            borderRadius: 6,
          }}
        />
      </header>

      <div
        className="creditcard-details-row"
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div className="creditcard-name-number">
          <h6 style={{ fontSize: 10, margin: 0 }}>Card Number</h6>
          <h5
            className="creditcard-number"
            style={{
              fontSize: 20,
              margin: "6px 0 0 0",
              letterSpacing: 1,
              wordBreak: "break-word",
            }}
          >
            {"0000 0000 0000 0000"}
          </h5>
          <h5
            className="creditcard-name"
            style={{
              fontSize: 16,
              margin: "16px 0 0 0",
            }}
          >
            {cardHolder}
          </h5>
        </div>

        <div
          className="creditcard-valid-date"
          style={{
            minWidth: 70,
            textAlign: "right",
          }}
        >
          <h6 style={{ fontSize: 10, margin: 0 }}>Valid Thru</h6>
          <h5 style={{ fontSize: 15, margin: "6px 0 0 0" }}>{validThru}</h5>
        </div>
      </div>
    </div>
  );
};

const CreditCardList = ({ accounts = [], userName = "" }) => {
  const navigate = useNavigate();
  if (!accounts || accounts.length === 0) return null;
  return (
    <div
      className="creditcard-list-wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 0,
        padding: 40,
        minHeight: "100vh",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {accounts.map((acc, idx) => {
        const blueShades = [
          "#1e293b", 
          "#223a5f",
          "#2541b2",
          "#1a237e",
          "#283593",
          "#0d1b2a",
          "#274472",
          "#102542",
          "#1b263b",
          "#22223b"
        ];
        const cardColor = blueShades[idx % blueShades.length];
        return (
          <div
            key={acc.accountNumber + idx}
            className="creditcard-stack-item"
            style={{
              position: "relative",
              zIndex: accounts.length - idx,
              marginTop: idx === 0 ? 0 : -60,
              transition: "transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s cubic-bezier(.4,2,.6,1)",
              cursor: "pointer",
            }}
          >
            <CreditCard
              cardNumber={acc.accountNumber}
              cardHolder={userName}
              validThru={"XX/XX"}
              brandLogo="/logo.png"
              chipImg="/chip.png"
              bgColor={cardColor}
            />
          </div>
        );
      })}
    </div>
  );
};

export { CreditCardList };
export default CreditCard;