import { useState } from 'react';
import {Grid, Container } from '@mui/material';

const images = [
  // Sample image data; replace with your data source
  { src: 'https://via.placeholder.com/150', category: 'Category 1' },
  { src: 'https://via.placeholder.com/150', category: 'Category 1' },
  { src: 'https://via.placeholder.com/150', category: 'Category 1' },
  { src: 'https://via.placeholder.com/150', category: 'Category 1' },
  { src: 'https://via.placeholder.com/150', category: 'Category 1' },
  { src: 'https://via.placeholder.com/150', category: 'Category 1' },
  { src: 'https://via.placeholder.com/150', category: 'Category 1' },

];

function Collection() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderGrid = (category) => (
    <Container sx={{p: 3}}>
      <Grid container spacing={3}>
        {images
          .filter((image) => image.category === category)
          .map((image, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <img src={image.src} alt={`img-${index}`} style={{ width: '100%' }} />
            </Grid>
          ))}
      </Grid>
    </Container>
   
  );

  return ( <> {renderGrid('Category 1')} </> );
}

export default Collection;
