import { useState, useEffect, useCallback } from "react";
import { getAccountsByUser } from "../../services/api";
import { jwtDecode } from "jwt-decode";

export const useUserAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("user");
        if (!storedData) {
            setError("No token found in localStorage");
            setLoading(false);
            return;
        }
        try {
            const parsedData = JSON.parse(storedData);
            const token = parsedData?.token;
            if (!token) throw new Error("Token not found in stored data");

            const decodedToken = jwtDecode(token);
            const uid = decodedToken?.uid;
            const name = decodedToken?.name || decodedToken?.username || "Usuario desconocido";
            setUserName(name);
            setUserId(uid);
            if (!uid) throw new Error("User ID not found in token");
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }, []);

    const refetch = useCallback(() => {
        if (!userId) return;
        setLoading(true);
        setError(null);
        let isMounted = true;
        getAccountsByUser(userId)
            .then((res) => {
                if (!isMounted) return;
                const data = res?.data;
                setAccounts(data?.accounts || []);
            })
            .catch((err) => {
                if (!isMounted) return;
                setAccounts([]);
                setError(err.message || "Error fetching accounts");
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });
        return () => {
            isMounted = false;
        };
    }, [userId]);

    useEffect(() => {
        if (userId) refetch();
    }, [userId, refetch]);

    return { accounts, userName, loading, error, refetch };
};