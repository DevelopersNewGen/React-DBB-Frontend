import React, { useEffect, useState } from "react";
import { getAccounts } from "../../services/api";

const AllAccountsTable = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAccounts();
        if (!response.error) {
          setAccounts(response.data.accounts);
        } else {
          console.error("Error fetching accounts:", response.e);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Todas las Cuentas</h1>
      {accounts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>
          Cargando cuentas o no hay datos disponibles.
        </p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Número de Cuenta</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Balance</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tipo de Cuenta</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.accountNumber}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{account.accountNumber}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{account.balance}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{account.accountType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllAccountsTable;
