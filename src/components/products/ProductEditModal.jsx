import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Close } from '@mui/icons-material';

export const ProductEditModal = ({ open, onClose, productDetails, onSave, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Product'
  });

  useEffect(() => {
    if (productDetails) {
      setFormData({
        name: productDetails.name || '',
        description: productDetails.description || '',
        category: productDetails.category || 'Product'
      });
    }
  }, [productDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Product'
    });
    onClose();
  };

  return (
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
          maxWidth: 500,
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

        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
          Editar {productDetails?.category === 'Product' ? 'Producto' : 'Servicio'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Descripción"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
            disabled={loading}
          />

          <FormControl fullWidth margin="normal" disabled={loading}>
            <InputLabel>Categoría</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Categoría"
            >
              <MenuItem value="Product">Producto</MenuItem>
              <MenuItem value="Service">Servicio</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ flex: 1 }}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ flex: 1 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : 'Guardar Cambios'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};