import React from "react";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";

export const DashboardPage = () => {
  return (
    <>
      <ResponsiveAppBar />
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "fixed",
          top: "64px", // ajusta según la altura de tu navbar
          left: 0,
          width: "100%",
          height: `calc(100vh - 64px)`, // ocupa el alto total menos el navbar
          objectFit: "cover",
          zIndex: -1, // para que no tape el navbar ni otros contenidos
        }}
      >
        <source
          src="https://res.cloudinary.com/daherc5uz/video/upload/v1753313889/Informe_de_proyecto_1_san5sn.mp4"
          type="video/mp4"
        />
        Tu navegador no soporta la etiqueta de video.
      </video>
    </>
  );
};
