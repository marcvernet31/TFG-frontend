import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Footer from './components/Footer';
import MainFeaturedPost from './components/MainFeaturedPost';
import ResponsiveAppBar from './components/ResponsiveAppBar'; 


// Header on main page
const mainFeaturedPost = {
  title: 'OpenData Barcelona',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'gradient.jpg',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

// Information for cards about dataset origins (Barcelona, Hospitalet, ...)
const originDatasets = [
  {
    title: 'OpenData Barcelona',
    amount: '558',
    description:
      "Datasets de l'ajuntament de Barcelona",
    image: 'barcelona.jpg',
    imageLabel: 'Image Text',
  },
  {
    title: "Open Data L'Hospitalet",
    amount: '98',
    description:
      "Datasets de l'ajuntament de L'Hospitalet",
    image: 'hosp.jpg',
    imageLabel: 'Image Text',
  },

];

// Information about dataset information
const categoryDatasets = [
  {
    name: 'Territori',
    amount: "86",
    icon: ''
  },
  {
    name: 'Població',
    amount: "103",
    icon: ''
  },
  {
    name: 'Ciutat i Serveis',
    amount: "24",
    icon: ''
  },
  {
    name: 'Societat',
    amount: "86",
    icon: ''
  },
  {
    name: 'Administració',
    amount: "134",
    icon: ''
  },
  {
    name: 'Economia i Empresa',
    amount: "102",
    icon: ''
  },
]



// Card for dataset origin
function OriginCard({post}) {

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.amount}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            <Button variant="contained"> Explora </Button>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

// Card for catalog dataset button
const CatalogCard = () => {
  return(
    <Card> 
    <Container sx={{ p: 2, border: '1px dashed grey' }}>
      <Typography variant="h5" align="center">
        Catàleg de datasets
      </Typography>
      <Typography variant="body1" align="center">
        Explora el cataleg conmplet de datasets disponibles
      </Typography>
      <Box display="flex" justifyContent="center">
        <Button href="/catalog" variant="contained"> Explora </Button>
      </Box>
    </Container>
  </Card>
  )
}

// Card for categories (to be changed)
const CategoryCard = ({category}) => {
  return(
    <Grid item xs={10} md={3} sm={3}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {category.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {category.amount}
            </Typography>
            <Button variant="contained"> Explora </Button>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  )
} 


const MainPage = () => {
  return (
    <>
      <ResponsiveAppBar/>
      <Container maxWidth={"lg"} sx={{ p: 2, border: '1px dashed grey' }}>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <CatalogCard/>
          <Container sx={{ p: 3, border: '1px dashed grey' }}>
          </Container>
          <Container sx={{ p: 3, border: '1px dashed grey' }}>
            <Typography variant="h5" align="center">
              Datasets per origen
            </Typography>
          </Container>
          <Grid container spacing={4}>
            {originDatasets.map((post) => (
              <OriginCard key={post.title} post={post} />
            ))}
          </Grid>
          <Container sx={{ p: 3, border: '1px dashed grey' }}>
          </Container>
          <Container sx={{ p: 3, border: '1px dashed grey' }}>
            <Typography variant="h5" align="center">
              Datasets per categoria
            </Typography>
          </Container>
          <Grid container spacing={4}>
            {categoryDatasets.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </>
  );
}

export default MainPage;