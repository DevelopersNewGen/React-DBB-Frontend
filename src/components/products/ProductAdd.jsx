import React, { useState } from "react";
import { useProducts } from "../../shared/hooks";

export const ProductAdd = ({ onProductCreated, open, setOpen }) => {
  const {
    form,
    imagePreview,
    processingImage,
    loading,
    error,
    success,
    
    handleCreateProduct,
    handleFormChange,
    handleFileChange,
    resetForm,
  } = useProducts();

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await handleCreateProduct();
      
      if (result && onProductCreated) {
        onProductCreated(result);
        handleClose();
      }
    } catch (error) {
      console.error("Error en handleSubmit:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="product-add-overlay">
      <div className="product-add-modal">
        <h2 className="product-add-title">Crear Producto</h2>

        <form onSubmit={handleSubmit} className="product-add-form">
          <div className="form-field">
            <label htmlFor="name">Nombre del Producto</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleFormChange}
              required
              maxLength={35}
              minLength={2}
            />
            <span className="character-count">{form.name.length}/35 caracteres</span>
          </div>

          <div className="form-field">
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleFormChange}
              required
            >
              <option value="Product">Producto</option>
              <option value="Service">Servicio</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleFormChange}
              required
              maxLength={500}
              minLength={10}
              rows={4}
            />
            <span className="character-count">{form.description.length}/500 caracteres</span>
          </div>

          <div className="file-input-container">
            <div className="file-input-label">
              Imagen del Producto (Opcional) - Máximo 5MB
              {processingImage && <span> - Procesando imagen...</span>}
            </div>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              className="file-input"
              aria-label="Seleccionar imagen del producto"
              disabled={processingImage}
            />
            
            {form.img && (
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                Tamaño: {(form.img.size / 1024).toFixed(1)} KB
              </div>
            )}

            {imagePreview && !processingImage && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Vista previa del producto"
                />
              </div>
            )}

            {processingImage && (
              <div className="image-preview" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '200px',
                background: '#f5f5f5',
                borderRadius: '4px'
              }}>
                <div>Optimizando imagen...</div>
              </div>
            )}
          </div>

          {error && (
            <div className="alert-error">
              {Array.isArray(error) ? (
                <ul>
                  {error.map((err, idx) => (
                    <li key={idx}>{err.msg || err.message || err}</li>
                  ))}
                </ul>
              ) : typeof error === "string" ? (
                error
              ) : error?.message ? (
                error.message
              ) : (
                "Error del servidor. Verifica la consola para más detalles."
              )}
            </div>
          )}

          {success && (
            <div className="alert-success">{success}</div>
          )}

          <div className="form-buttons">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading || processingImage}
              className="btn-cancel"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || processingImage || !form.name.trim() || !form.description.trim()}
              className="btn-submit"
            >
              {loading ? "Creando..." : processingImage ? "Procesando..." : "Crear Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};