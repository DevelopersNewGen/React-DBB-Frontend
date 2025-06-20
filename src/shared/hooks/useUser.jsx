import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getUser as fetchUser,
} from "../../services";

export const useUser = () => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchUser();
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

  const updatePassword = async ({ oldPassword, newPassword }) => {
    setIsLoading(true);
    try {
      const response = await updateUserPassword({ oldPassword, newPassword });
      toast.success(response.data.message || "Contraseña actualizada");
    } catch (err) {
      toast.error("La contraseña anterior no coincide");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (data) => {
    setIsLoading(true);
    try {
      const response = await updateUserService(data);
      if (response?.error) throw response.e;

      const localUser = JSON.parse(localStorage.getItem("user"));
      if (response?.data?.user) {
        localUser.name = response.data.user.name;
        localUser.email = response.data.user.email;
        localStorage.setItem("user", JSON.stringify(localUser));
        window.location.reload(); 
      }

      toast.success(response?.data?.msg || "Usuario actualizado correctamente");
    } catch (e) {
      toast.error(
        "Error al actualizar usuario: " +
          (e?.response?.data?.msg ||
            e?.response?.data?.message ||
            e?.message ||
            "Error desconocido")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfilePicture = async (file) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("img", file);

      const response = await updateUserProfilePicture(formData);
      if (response?.error) throw response.e;

      const newImgUrl = response?.data?.img;
      const localUser = JSON.parse(localStorage.getItem("user"));

      if (newImgUrl) {
        localUser.img = newImgUrl;
        localStorage.setItem("user", JSON.stringify(localUser));
        window.location.reload();
      }

      toast.success(response?.data?.msg || "Imagen de perfil actualizada");
    } catch (e) {
      toast.error(
        "Error al actualizar la imagen: " +
          (e?.response?.data?.msg ||
            e?.response?.data?.message ||
            e?.message ||
            "Error desconocido")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async () => {
    setIsLoading(true);
    try {
      const response = await deleteUserService();
      if (response?.error) throw response.e;

      localStorage.setItem("user", JSON.stringify(""));
      toast.success(response?.data?.msg || "Cuenta eliminada");
      navigate("/auth");
    } catch (e) {
      toast.error(
        "Error al eliminar cuenta: " +
          (e?.response?.data?.msg ||
            e?.response?.data?.message ||
            e?.message ||
            "Error desconocido")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return {
    role,
    user,
    isLoading,
    error,
    getUser,
  };
};