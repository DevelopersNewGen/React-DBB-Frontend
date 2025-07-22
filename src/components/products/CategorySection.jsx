import React from 'react';
import { Box, Typography, Grid, Card, CardMedia } from "@mui/material";

export const CategorySection = () => {
  const categories = [
    {
      name: "COMIDA",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "SALUD",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "ENTRETENIMIENTO",
      image: "https://static.vecteezy.com/system/resources/thumbnails/015/861/751/small/group-of-happy-friends-sitting-in-cinema-watch-film-and-eating-popcorn-photo.jpg"
    },
    {
      name: "TIENDAS",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2} columns={{ xs: 12, md: 12 }}>
        {categories.map((category, index) => (
          <Grid key={index} span={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
              <Card
                sx={{
                  width: '100%',
                  height: 200,
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={category.image}
                  alt={category.name}
                  sx={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.7)'
                  }}
                />
              </Card>
              
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(21, 101, 192, 0.9), transparent)',
                  color: 'white',
                  padding: 1,
                  textAlign: 'center'
                }}
              >
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                >
                  {category.name}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
