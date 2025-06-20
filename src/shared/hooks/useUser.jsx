import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getUserById } from "../../services";

export const useUser = () => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const listUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Obtener el uid del usuario logueado
      const userDetails = localStorage.getItem("user");
      let uid = null;
      if (userDetails) {
        const parsedUser = JSON.parse(userDetails);
        uid = parsedUser?.uid || parsedUser?._id || parsedUser?.id;
      }

      if (!uid) {
        setError("No hay usuario logueado o falta el uid");
        setIsLoading(false);
        return;
      }

      const data = await getUserById(uid);
      const userData = data?.data?.user || data?.user || data;

      if (userData && userData.role) {
        setUser(userData);
        setRole(userData.role);
      } else {
        setError("No autorizado o usuario no encontrado");
      }
    } catch (err) {
      setError("Error de autenticación o backend");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    listUsers();
  }, []);

  return {
    role,
    user,
    isLoading,
    error,
    listUsers,
  };
};