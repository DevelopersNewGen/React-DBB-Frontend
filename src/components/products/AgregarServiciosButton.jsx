import React, { useState } from 'react';

export const AgregarServiciosButton = ({ role, onClick }) => {
  const [hovered, setHovered] = useState(false);

  if (!role || (role !== 'ADMIN_ROLE' && role !== 'admin' && role !== 'ADMIN')) {
    return null;
  }

  return (
    <div
      className="agregar-servicios-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {hovered && (
        <span className="agregar-servicios-text">
          AGREGAR SERVICIOS
        </span>
      )}
      <button className="agregar-servicios-button">
        <span className="agregar-servicios-icon">+</span>
      </button>
    </div>
  );
};