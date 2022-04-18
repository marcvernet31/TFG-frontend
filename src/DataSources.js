import { useParams } from "react-router-dom";
//import {useEffect, useState, useCallback} from "react";


import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from "@material-ui/core/styles";

import LocationOnIcon from '@mui/icons-material/LocationOn';
import ResponsiveAppBar from './components/ResponsiveAppBar'; 
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const openDataBarcelona = {
    title: 'OpenData Barcelona',
    description: [
      "Open data o obertura d'informació del sector públic és un moviment impulsat per les administracions públiques amb el principal objectiu d'aprofitar al màxim els recursos públics disponibles, exposant la informació generada o custodiada per organismes públics, permetent el seu accés i reutilització per al bé comú i per al benefici de persones i entitats interessades. ",
      "Open Data BCN, projecte que va néixer a l'any 2010 implantant el portal a l'any 2011, ha anat evolucionant i s'emmarca ara dins de l'estratègia de Barcelona Ciutat Digital, fomentant una economia digital plural i desenvolupant un nou model d'innovació urbana basat en la transformació i la innovació digital del sector públic i la implicació entre les empreses, les administracions, el món acadèmic, les organitzacions, les comunitats i les persones, amb un clar lideratge públic i ciutadà. El servei Open Data BCN, gestionat des del Departament d'Estadística i Difusió de Dades de l'Oficina Municipal de Dades, és transversal a diversos dels pilars de l'estratègia de la ciutat, es basa en els principals estàndards i recomanacions internacionals, adoptant certes característiques que resumeixen els principis d'aquest moviment."
    ],
    image: './assets/barcelona.jpg',
    imageText: 'main image description',
    linkText: 'Continue reading…',
  };

const openDataHospitalet = {
    title: 'DadesObertes Hospitalet',
    description: [
      " Et mostrem dades en temps real perquè coneguis què passa ara mateix a la ciutat i què fa l'Ajuntament per millorar el dia a dia de la gent que viu, treballa, estudia, gaudeix de L'Hospitalet o utilitza els seus serveis públics.",
      "L’Hospitalet és una ciutat dinàmica, activa i participativa. En aquest nou espai hi podràs trobar totes les activitats que es fan a L’Hospitalet, programar-te el cap de setmana o conèixer quantes activitats per a infants es fan avui a la ciutat. Entra i descobreix la ciutat com mai no ho hauries imaginat."
    ],
    image: 'https://images.pexels.com/photos/6984989/pexels-photo-6984989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    imageText: 'main image description',
    linkText: 'Continue reading…',
  };

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
    <Container sx={{ m:3, border: '1px dashed grey' }}>
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

  

const InformationCardBarcelona = () => {
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
                  525 datasets
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} >
            <Card className={classes.custom}
              sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
            >
              <CardContent sx={{ flexGrow: 1}}>
                <Grid container justifyContent="center" sx={{p:2}}>            
                  <CheckIcon/>
                </Grid>
                <Typography gutterBottom variant="h8" component="h5" align='center'>
                  API disponible
                </Typography>
              </CardContent>
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
                  Barcelona
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Container sx={{p: 2, border: '1px dashed grey' }}   alignItems="center">
          <img width='150' src={require('./assets/ajuntament_barcelona.jpg')}></img>
      </Container>
      </>
      )
    
  }

  const InformationCardHospitalet = () => {
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
                  98 datasets
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} >
            <Card className={classes.custom}
              sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
            >
              <CardContent sx={{ flexGrow: 1}}>
                <Grid container justifyContent="center" sx={{p:2}}>            
                  <CheckIcon/>
                </Grid>
                <Typography gutterBottom variant="h8" component="h5" align='center'>
                  API disponible
                </Typography>
              </CardContent>
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
                  L'Hopitalet de Llobregat
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Container sx={{p: 2, border: '1px dashed grey' }}   alignItems="center">
          <img width='150' src={require('./assets/ajuntament_hospitalet.png')}></img>
      </Container>
      </>
      )
    
  }
    
  
  function Description({post, image}) {

  
    return (
      <Grid item xs={12} md={6}>
          <Card sx={{ display: 'flex' }} >
            <CardContent sx={{ flex: 1 }}>
              <Container sx={{p: 2, border: '1px dashed grey' }}>
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


    return(
        <>            
            <ResponsiveAppBar/>
            <Container maxWidth={"lg"} sx={{ p: 2, border: '1px dashed grey' }}>
                <main>
                    {sourceId == 'barcelona' ? (
                        <div>
                            <Description post={openDataBarcelona} image={require('./assets/barcelona.jpg')}/>
                            <Container sx={{ p: 2}} maxWidth="md">
                              <InformationCardBarcelona/>
                            </Container>    
                        </div>
                    ) : (<></>)}
                    {sourceId == 'hospitalet' ? (
                        <div>
                            <Description post={openDataHospitalet} image={require('./assets/hospitalet.jpg')}/>
                            <Container sx={{ p: 2}} maxWidth="md">
                              <InformationCardHospitalet/>
                            </Container>        
                        </div>
                    ) : (<></>)}
                <CatalogCard/>
                </main>
            </Container>        
        </>
    )
}

export default DataSources
