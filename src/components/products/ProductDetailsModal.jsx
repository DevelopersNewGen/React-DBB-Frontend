import React from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  IconButton, 
  CircularProgress, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Close, Edit, Delete } from '@mui/icons-material';
import { useProductDetails, useProductActions } from '../../shared/hooks';
import { ProductEditModal } from './ProductEditModal';

export const ProductDetailsModal = ({ open, onClose, productId, onProductDeleted }) => {
  const { productDetails, loading, clearProductDetails, refetch } = useProductDetails(productId, open);
  const {
    loading: updateLoading,
    deleteLoading,
    deleteDialogOpen,
    editModalOpen,
    isAdmin,
    handleEditClick,
    handleDeleteClick,
    confirmDelete,
    closeDeleteDialog,
    closeEditModal,
    saveProductChanges
  } = useProductActions(productId);

  const getImageUrl = (imgPath) => {
    if (!imgPath) return '/placeholder-image.png';
    if (imgPath.startsWith('http')) return imgPath;
    return `${process.env.REACT_APP_CLOUDINARY_BASE_URL || 'https://res.cloudinary.com/your-cloud-name/image/upload/'}${imgPath}`;
  };

  const handleClose = () => {
    clearProductDetails();
    onClose();
  };

  const handleSaveEdit = async (formData) => {
    const result = await saveProductChanges(formData);
    if (result.success) {
      refetch();
    }
    return result;
  };

  const handleCancelDelete = () => {
    closeDeleteDialog();
  };

  const handleConfirmDelete = async () => {
    const result = await confirmDelete();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
            maxWidth: 600,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            maxHeight: '80vh',
            overflow: 'auto',
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {productDetails && !loading && (
            <>
              <Box
                sx={{
                  width: '100%',
                  height: 250,
                  mb: 3,
                  borderRadius: 1,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.100',
                }}
              >
                <img
                  src={getImageUrl(productDetails.productImg)}
                  alt={productDetails.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                  onError={(e) => {
                    e.target.src = '/placeholder-image.png';
                  }}
                />
              </Box>

              <Typography variant="h5" component="h2" gutterBottom>
                {productDetails.name}
              </Typography>

              <Box
                sx={{
                  display: 'inline-block',
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: productDetails.category === 'Product' ? 'primary.main' : 'secondary.main',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 'medium',
                  mb: 2,
                }}
              >
                {productDetails.category}
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ mt: 2, mb: 3 }}>
                {productDetails.description}
              </Typography>

              {isAdmin && (
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={handleEditClick}
                    sx={{ flex: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={handleDeleteClick}
                    sx={{ flex: 1 }}
                    disabled={deleteLoading}
                  >
                    Eliminar
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Modal>

      <ProductEditModal
        open={editModalOpen}
        onClose={closeEditModal}
        productDetails={productDetails}
        onSave={handleSaveEdit}
        loading={updateLoading}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        disableRestoreFocus
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar este {productDetails?.category === 'Product' ? 'producto' : 'servicio'}?
          Esta acción no se puede deshacer.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirmDelete}
            color="error" 
            disabled={deleteLoading}
          >
            {deleteLoading ? <CircularProgress size={20} /> : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};