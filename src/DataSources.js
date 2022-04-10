import { useParams } from "react-router-dom";
//import {useEffect, useState, useCallback} from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from './components/ResponsiveAppBar'; 
import MainFeaturedPost from './components/MainFeaturedPost';

const openDataBarcelona = {
    title: 'OpenData Barcelona',
    description:
      "El Ayuntamiento de Barcelona dispone de un repositorio de datos abiertos, el portal Open Data BCN, que actualmente incluye más de 450 conjuntos de datos ...",
    image: 'https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?cs=srgb&dl=pexels-gradienta-7130555.jpg&fm=jpg',
    imageText: 'main image description',
    linkText: 'Continue reading…',
  };

const openDataHospitalet = {
    title: 'OpenData Hospitalet',
    description:
     "Coneix la informació més destacada dels equipaments de la ciutat, el seu transport públic, Serveis i equipaments. Mira les dades fàcilment. La informació ha de ...",
    image: 'https://images.pexels.com/photos/6984989/pexels-photo-6984989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    imageText: 'main image description',
    linkText: 'Continue reading…',
  };

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

const DataSources = () => {
    const { sourceId } = useParams();

    return(
        <>            
            <ResponsiveAppBar/>
            <Container maxWidth={"lg"} sx={{ p: 2, border: '1px dashed grey' }}>
                <main>
                    {sourceId == 'barcelona' ? (
                        <div>
                            <MainFeaturedPost post={openDataBarcelona} />
                            <Container maxWidth={"lg"} sx={{ p: 2, border: '1px dashed grey' }}>
                                <p> info sobre origen + algunes estadistiques</p>
                            </Container>        
                        </div>
                    ) : (<></>)}
                    {sourceId == 'hospitalet' ? (
                        <div>
                            <MainFeaturedPost post={openDataHospitalet} />
                            <Container maxWidth={"lg"} sx={{ p: 2, border: '1px dashed grey' }}>
                                <p> info sobre origen + algunes estadistiques</p>
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
