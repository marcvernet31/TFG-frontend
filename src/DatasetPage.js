import { useParams } from "react-router-dom";
import {useEffect, useState, useCallback} from "react";
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import ResponsiveAppBar from './components/ResponsiveAppBar'; 

const recomendedJoins = [
    {title: "Dataset 1", quality: 0.3},
    {title: "Dataset 2", quality: 0.27},
    {title: "Dataset 3", quality: 0.14},
    {title: "Dataset 4", quality: 0.11},

]

const DatasetInformation = ({dataset, image}) => {
    return(
        <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(192,192,192)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
                <Stack direction="row"  justifyContent="space-between" spacing={5} >
                    <Box sx={{ border: '1px dashed grey' }}>
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {dataset.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {dataset.description}
                        </Typography>
                    </Box>
                    <Box sx={{ border: '1px dashed grey' }}>
                        <Stack direction="column"  justifyContent="space-between" spacing={5} >
                            <Box sx={{ border: '1px dashed grey' }}>
                                <h2>Categoria: {dataset.category}</h2>
                            </Box>
                            <Box sx={{ border: '1px dashed grey' }}>
                                <h2>Data: {dataset.date}</h2>
                            </Box>
                        </Stack>
                    </Box>
                    <Box sx={{ border: '1px dashed grey' }}>
                        <Box sx={{ p:2, border: '1px dashed grey' }}>
                            <Button href={dataset.download_url} variant="contained"> Descarrega </Button>
                        </Box>
                        <Box sx={{p:2,  border: '1px dashed grey' }}>
                            <Button href={dataset.web_url} target='_blank' variant="contained"> Visita original </Button>
                        </Box>
                    </Box>
                </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    )
}

const MediaCard = ({title, category, date, description, origin, web_url, datasetId}) => {
  
    return (
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Chip label={origin} />
          <Typography variant="body2" color="text.secondary">
            {description.substr(0, Math.min(100, description.length)) } ...
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href={`/catalog/${datasetId}`}> 
            Visita 
          </Button>
        </CardActions>
      </Card>
    );
  }

const DatasetPage = () => {

    const { datasetId } = useParams();
    const [loading, setLoading] = useState(false)
    const [dataset, setDataset] = useState("")
    const [similar, setSimilar] = useState([])
    const [catalog, setCatalog] = useState([])  
    const [dataIsReturned, setDataIsReturned] = useState(false)


    const fetchData = useCallback(async () => {
        setLoading(true)
        const response = await fetch(`http://localhost:8000/item/${datasetId}`)
        const retrievedDataset = await response.json()
        setDataset(retrievedDataset.message);
        console.log(retrievedDataset.message)
        setLoading(false)
        }, [])

    const fetchSimilar = useCallback(async() => {
        const response = await fetch(`http://localhost:8000/similar/${datasetId}`)
        const retrievedSimilar = await response.json()
        console.log(retrievedSimilar.message)
        setSimilar(retrievedSimilar.message)
    }, [])

    const fetchCatalog = useCallback(async () => {
        const response = await fetch("http://localhost:8000/catalog")
        const retrievedCatalog = await response.json()
        setCatalog(retrievedCatalog.message);
        setDataIsReturned(true)
      }, [])
        
    useEffect(() => {
        fetchData()
            .catch(console.error);
        fetchCatalog()
            .catch(console.error);
        fetchSimilar()
            .catch(console.error);


        
        
    }, [])

    return(
        <>
            <ResponsiveAppBar/>
            <Container maxWidth={"lg"} sx={{ p: 2, border: '1px dashed grey' }}>
                <main>
                    <DatasetInformation dataset={dataset} image='gradient.jpg'/>
                    <Box sx={{ p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" color="inherit" paragraph>
                            Joins recomenades
                        </Typography>
                        {recomendedJoins.map((join, index) => (
                            <ListItemButton key={index}>
                                <ListItemIcon>
                                    <JoinInnerIcon />
                                </ListItemIcon>
                                <ListItemText primary={join.title} secondary={join.quality}/>
                            </ListItemButton>
                        ))}
                        <Button variant="contained" > Calcula una join </Button>
                    </Box>
                    <Box sx={{ p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" color="inherit" paragraph>
                            Datasets similars
                        </Typography>
                        {dataIsReturned ? (
                            <div>
                                {similar.slice(1, 4).map((similarDatasetId, index) => (
                                    <div key={index}>
                                        <Box sx={{ p: 2, border: '1px dashed grey' }}>
                                            <MediaCard 
                                                title={catalog[similarDatasetId].title} 
                                                category={catalog[similarDatasetId].category} 
                                                date={catalog[similarDatasetId].date} 
                                                description={catalog[similarDatasetId].description} 
                                                origin={catalog[similarDatasetId].origin} 
                                                web_url={catalog[similarDatasetId].web_url} 
                                                datasetId={index}
                                            />
                                        </Box>
                                    </div>
                                ))}
                            </div>
                        ) : (<p>loading</p>)}
                    </Box>
                </main>
            </Container>
        </>
    )
}

/*
                          <MediaCard 
                                title={similarDataset.title} 
                                category={similarDataset.category} 
                                date={similarDataset.date} 
                                description={similarDataset.description} 
                                origin={similarDataset.origin} 
                                web_url={similarDataset.web_url} 
                                datasetId={index}
                            />

*/

export default DatasetPage