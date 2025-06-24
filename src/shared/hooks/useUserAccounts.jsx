import { useState, useEffect } from "react";
import { getAccountsByUser } from "../../services/api";

export const useUserAccounts = (userId) => {
  const [accounts, setAccounts] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (!userId) return;
    setLoading(true);
    setError(null);
    getAccountsByUser(userId)
      .then((res) => {
        if (!isMounted) return;
        const data = res?.data;
        setAccounts(data?.accounts || []);
        setUserName(data?.name || "");
      })
      .catch((err) => {
        if (!isMounted) return;
        setAccounts([]);
        setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { accounts, userName, loading, error };
};
