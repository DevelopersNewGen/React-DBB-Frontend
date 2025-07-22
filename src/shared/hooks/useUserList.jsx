import { useState, useEffect } from "react";
import { getUsers } from "../../services/api";

export const useUserList = (refresh) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getUsers()
      .then((res) => {
        if (!isMounted) return;
    
        if (res?.data?.users && !res.error) {
          setUsers(res.data.users);
          setError(null);
        } else {
          setUsers([]);
          setError("Error al cargar usuarios");
        }
      })
      .catch(() => {
        if (isMounted) {
          setUsers([]);
          setError("Error al cargar usuarios");
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [refresh]);

  return { users, isLoading, error };
};