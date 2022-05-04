import { useParams } from "react-router-dom";
import {useEffect, useState, useCallback} from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ResponsiveAppBar from './components/ResponsiveAppBar'; 
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';


// Used to avoid error on rendering with fetched data
const emptyFrontend = {
  "identifier": "",
  "title": "",
  "description": ["",""],
  "image": "",
  "imageText": "",
  "linkText": ""
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
            <Button href="/catalog" variant="contained"> Explora </Button>
          </Box>
        </Stack>
      </Container>
    </Card>
  )
}

  

const InformationCardBarcelona = ({content}) => {
  const useStyles = makeStyles({
    custom: {
      border: "none",
      boxShadow: "none",
      backgroundColor: "#f5e6ff"
    }
  });
  const classes = useStyles();

  return(
    <> 
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4} >
          <Card className={classes.custom}
            sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
          >
            <CardContent sx={{ flexGrow: 1}}>
              <Grid container justifyContent="center" sx={{p:2}}>            
                <InsertDriveFileIcon/>
              </Grid>
              <Typography gutterBottom variant="h8" component="h5" align='center'>
                {content.amount} datasets
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} >
          <Card className={classes.custom}
            sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
          >
            {content.api == "yes" ? (
              <CardContent sx={{ flexGrow: 1}}>
                <Grid container justifyContent="center" sx={{p:2}}>            
                  <CheckIcon/>
                </Grid>
                <Typography gutterBottom variant="h8" component="h5" align='center'>
                  API disponible
                </Typography>
              </CardContent>
            ):(
              <CardContent sx={{ flexGrow: 1}}>
                <Grid container justifyContent="center" sx={{p:2}}>            
                  <CloseIcon/>
                </Grid>
                <Typography gutterBottom variant="h8" component="h5" align='center'>
                  sense API disponible
                </Typography>
              </CardContent>
            )}

          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} >
          <Card className={classes.custom}
            sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
          >
            <CardContent sx={{ flexGrow: 1}}>
              <Grid container justifyContent="center" sx={{p:2}}>            
                <LocationOnIcon/>
              </Grid>
              <Typography gutterBottom variant="h8" component="h5" align='center'>
                {content.identifier}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )    
}
  
function Description({post, image}) {
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ display: 'flex' }} >
        <CardContent sx={{ flex: 1 }}>
          <Container sx={{p: 2, /* border: '1px dashed grey' */}}>
            <Typography gutterBottom variant="h3" component="h5">
              {post.title}
            </Typography>
            <Typography variant="p" component="p" color="text.secondary">
              {post.description.map(txt => <p align="justify">{txt}</p>)}
            </Typography>
          </Container>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
          image={image}
          alt={post.imageLabel}
        />
      </Card>
    </Grid>
  );
}

const DataSources = () => {
  const { sourceId } = useParams();

  // Control state to avoid empty rendering
  const [loading, setLoading] = useState(false)
  // Initialized with empty element to avoid undefined error
  const [frontendData, setFrontendData] = useState(emptyFrontend)

  // Fetch data used for frontend
  const fetchData = useCallback(async () => {
    setLoading(true)
    const response = await fetch(`http://localhost:8000/frontend/DataSource/${sourceId}`)
    const retrievedData = await response.json()
    setFrontendData(retrievedData.message);
    console.log(retrievedData.message)
    setLoading(false)
  }, [])
  
  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [])
  //             <Description post={frontendData} image={try {require(`./assets/${sourceId}.jpg`)} catch(e){require(`./assets/${sourceId}.jpg`)}}/>

  const foundImage = () => {
    try{
      const img = require(`./assets/${sourceId}.jpg`)
      return true
    } catch(e){
      return false
    }
  } 
  
  return(
    <>            
      <ResponsiveAppBar/>
      <Container maxWidth={"lg"} sx={{ p: 2, /*border: '1px dashed grey'*/ }}>
        <main>
          <div>
            {foundImage() ? (
              <Description post={frontendData} image={require(`./assets/${sourceId}.jpg`)}/>
            ):(
              <Description post={frontendData} image={require('./assets/gradient.jpg')}/>
            )}
            <Container sx={{ p: 2}} maxWidth="md">
              <InformationCardBarcelona content={frontendData}/>
            </Container>    
          </div>
          <CatalogCard/>
        </main>
      </Container>        
    </>
  )
}

export default DataSources
