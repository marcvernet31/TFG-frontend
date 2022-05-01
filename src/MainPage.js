import * as React from 'react';

import {useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import CardContent from '@mui/material/CardContent';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';

import Footer from './components/Footer';
import MainFeaturedPost from './components/MainFeaturedPost';
import ResponsiveAppBar from './components/ResponsiveAppBar'; 


// Header on main page
const mainFeaturedPost = [
  {
    title: 'Header 1',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'gradient.jpg',
    imageText: 'main image description',
    linkText: 'Continue reading…',
  },
  {
    title: 'Header 2',
    description:
      "Multiple liciently about what's most interesting in this post's contents. interesting in this post's co",
    image: 'grad.jpg',
    imageText: 'main image description',
    linkText: 'Continue reading…',
  },
  {
    title: 'Header 3',
    description:
      "Multiple liciently about what's most interesting in this post's contents. interesting Information for cards about dataset origins (Barcelona, Hospitalet, ...)in this post's co",
    image: 'grad.jpg',
    imageText: 'main image description',
    linkText: 'Continue reading…',
  }
]

// Information for cards about dataset origins (Barcelona, Hospitalet, ...)
const originDatasets = [
  {
    title: 'OpenData Barcelona',
    sourceId: 'barcelona',
    amount: '558',
    description:
      "Datasets de l'ajuntament de Barcelona",
    image: 'barcelona.jpg',
    imageLabel: 'Image Text',
  },
  {
    title: "Open Data L'Hospitalet",
    sourceId: 'hospitalet',
    amount: '98',
    description:
      "Datasets de l'ajuntament de L'Hospitalet",
    image: 'hosp.jpg',
    imageLabel: 'Image Text',
  }
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



const cards = [
{
  title: 'Estalvi i eficiència',
  description: 'Reduïu els costos dels processos administratius al vostre organisme públic',
},
{
  title: 'Major satisfacció ciutadana',
  description: 'Reduïu els costos dels processos administratius al vostre organisme públic'
},
{
  title: 'Transparència i confiança',
  description: 'Oferiu una administració més transparent a ciutadans i empreses'
}
]



const InformationCard = ({card, icon}) => {
  const useStyles = makeStyles({
    custom: {
      border: "none",
      boxShadow: "none",
      backgroundColor: "#f5e6ff"
    }
  });
  const classes = useStyles();

  return(
    <Grid item xs={12} sm={6} md={4} >
      <Card className={classes.custom}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
      >
        <CardContent sx={{ flexGrow: 1}}>
          <Grid container justifyContent="center" sx={{p:2}}>            
            {icon}
          </Grid>
          <Typography gutterBottom variant="h8" component="h5" align='center'>
            {card.title}
          </Typography>
          <Typography  variant="p" component="p" align='center'>
           {card.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}



// Card for dataset origin
function OriginCard({post}) {
  const useStyles = makeStyles({
    custom: {
      boxShadow: 8,
    }
  });
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
        <Card sx={{ display: 'flex' }} className={classes.custom}>
          <CardContent sx={{ flex: 1 }}>
            <Typography gutterBottom variant="h6" component="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.amount}
            </Typography>
            <Typography variant="p" component="p" paragraph>
              {post.description}
            </Typography>
            <Button variant="contained" href={`/fonts/${post.sourceId}`}> 
              Explora 
            </Button>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
    </Grid>
  );
}

// Card for catalog dataset button
const CatalogCard = () => {
  const useStyles = makeStyles({
    custom: {
      boxShadow: 8,
    }
  });
  const classes = useStyles();

  return(
    <Card className={classes.custom}> 
      <Container sx={{ m:3, /*border: '1px dashed grey' */}}>
        <Stack spacing={4}>
          <Stack spacing={0}>
            <Typography variant="h4" component="h5" align="center">
              Catàleg de datasets
            </Typography>
            <Typography variant="body1" align="center">
              Explora el cataleg complet de datasets disponibles
            </Typography>
          </Stack>
          <Box display="flex" justifyContent="center">
            <Button href="/catalog" variant="contained"> 
              Explora   
            </Button>
          </Box>
        </Stack>
      </Container>
    </Card>
  )
}


const MainPage = () => {
  // Index for Fetaured Post
  const [mainPageIndex, setMainPageIndex] = useState(0)
  return (
    <>
      <ResponsiveAppBar/>
      <Container maxWidth={"lg"} sx={{ p: 2, /*border: '1px dashed grey' */}}>
        <main>
          <Box sx={{ boxShadow: 8 }}>
            <MainFeaturedPost 
              post={mainFeaturedPost[mainPageIndex]} 
              mainPageIndex={mainPageIndex} 
              setMainPageIndex={setMainPageIndex} 
              maxIndex={mainFeaturedPost.length-1} 
            />
          </Box>
          <Container sx={{ p: 2}} maxWidth="md">
            <Grid container spacing={4}>
              <InformationCard card={cards[0]} icon={<EnergySavingsLeafIcon fontSize='large'/>}/>
              <InformationCard card={cards[1]} icon={<AccessibilityIcon fontSize='large'/>}/>
              <InformationCard card={cards[2]} icon={<SearchIcon fontSize='large'/>}/>
            </Grid>
          </Container>
          <Container sx={{ p: 3, /*border: '1px dashed grey' */}}>
            <CatalogCard/>
          </Container>
                  
          <Container sx={{ p: 10, /*border: '1px dashed grey' */}}>
            <Container sx={{ p: 3, /*border: '1px dashed grey' */}}>
              <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
                Datasets per origen
              </Typography>
            </Container>
            <Grid container spacing={4}>
              {originDatasets.map((post) => (
                <OriginCard key={post.title} post={post} />
              ))}
            </Grid>
          </Container>
          <Container sx={{ p: 3, /*border: '1px dashed grey' */}}>
          </Container>
          <Container sx={{ p: 3, /*border: '1px dashed grey' */}}>
            <Typography variant="h5" align="center">
              Datasets per categoria
            </Typography>
          </Container>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Categories
              </ListSubheader>
            }
          >
            {categoryDatasets.map((category) => (
              <ListItemButton>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItemButton>
            ))}
          </List>
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