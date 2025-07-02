import React, { useState } from "react";
import {
  Button,
  TextField,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { useProducts } from "../../shared/hooks/useProducts";

export const ProductAdd = ({ onProductCreated, open, setOpen }) => {
  const [form, setForm] = useState({
    name: "",
    category: "Product",
    description: "",
    img: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const { handleCreateProduct, loading, error, success } = useProducts();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, img: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setForm({
      name: "",
      category: "Product",
      description: "",
      img: null,
    });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("description", form.description);
    if (form.img) {
      formData.append("img", form.img);
    }

    const result = await handleCreateProduct(formData);
    if (result && onProductCreated) {
      onProductCreated(result);
      handleClose();
    }
  };

  const darkGray = "#333";

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1300,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: "90%",
          maxWidth: 600,
          bgcolor: "#f5f5f5",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" sx={{ color: darkGray, mb: 2 }}>
          Crear Producto
        </Typography>

        <form onSubmit={handleSubmit} id="product-add-form">
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "repeat(12, 1fr)",
            }}
          >
            <Box sx={{ gridColumn: "span 12" }}>
              <TextField
                label="Nombre del Producto"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ maxLength: 35 }}
                helperText={`${form.name.length}/35 caracteres`}
              />
            </Box>

            <Box sx={{ gridColumn: "span 12" }}>
              <FormControl fullWidth>
                <InputLabel>Categoría</InputLabel>
                <Select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  label="Categoría"
                  required
                >
                  <MenuItem value="Product">Producto</MenuItem>
                  <MenuItem value="Service">Servicio</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ gridColumn: "span 12" }}>
              <TextField
                label="Descripción"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={4}
                inputProps={{ maxLength: 500 }}
                helperText={`${form.description.length}/500 caracteres`}
              />
            </Box>

            <Box sx={{ gridColumn: "span 12" }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Imagen del Producto (Opcional)
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginBottom: 16 }}
                aria-label="Seleccionar imagen del producto"
              />
              {imagePreview && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={imagePreview}
                    alt="Vista previa del producto"
                    style={{
                      maxWidth: "100%",
                      maxHeight: 200,
                      objectFit: "contain",
                    }}
                  />
                </Box>
              )}
            </Box>

            {error && (
              <Box sx={{ gridColumn: "span 12" }}>
                <Alert severity="error">
                  {Array.isArray(error) ? (
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {error.map((err, idx) => (
                        <li key={idx}>{err.msg}</li>
                      ))}
                    </ul>
                  ) : typeof error === "string" ? (
                    error
                  ) : (
                    "Error al crear producto"
                  )}
                </Alert>
              </Box>
            )}

            {success && (
              <Box sx={{ gridColumn: "span 12" }}>
                <Alert severity="success">{success}</Alert>
              </Box>
            )}

            <Box
              sx={{
                gridColumn: "span 12",
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                onClick={handleClose}
                disabled={loading}
                sx={{
                  backgroundColor: darkGray,
                  color: "#fff",
                  "&:hover": { backgroundColor: "#222" },
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: darkGray,
                  color: "#fff",
                  "&:hover": { backgroundColor: "#222" },
                }}
              >
                {loading ? "Creando..." : "Crear Producto"}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
