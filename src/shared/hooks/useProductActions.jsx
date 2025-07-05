import { useState, useEffect } from 'react';
import { updateProduct, deleteProduct } from '../../services/api';

export const useProductActions = (productId) => {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = () => {
      try {
        const userDetails = localStorage.getItem("user");
        if (userDetails) {
          const user = JSON.parse(userDetails);
          if (user.role) {
            setIsAdmin(user.role === "ADMIN_ROLE");
          } else {
            setIsAdmin(user.username === "ADMINB");
          }
        }
      } catch (error) {
        setIsAdmin(false);
      }
    };

    checkAdminRole();
  }, []);

  const handleUpdateProduct = async (productData) => {
    setLoading(true);
    try {
      const response = await updateProduct(productId, productData);
      if (!response.error) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.e };
      }
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    setDeleteLoading(true);
    try {
      const response = await deleteProduct(productId);
      if (!response.error) {
        return { success: true };
      } else {
        return { success: false, error: response.e };
      }
    } catch (error) {
      return { success: false, error };
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
  const result = await handleDeleteProduct();
  if (result.success) {
    setDeleteDialogOpen(false);
    window.location.reload();
  }
  return result;
};

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const saveProductChanges = async (formData) => {
    const result = await handleUpdateProduct(formData);
    if (result.success) {
      setEditModalOpen(false);
    }
    return result;
  };

  return {
    loading,
    deleteLoading,
    deleteDialogOpen,
    editModalOpen,
    isAdmin,
    handleUpdateProduct,
    handleDeleteProduct,
    handleEditClick,
    handleDeleteClick,
    confirmDelete,
    closeDeleteDialog,
    closeEditModal,
    saveProductChanges
  };
};