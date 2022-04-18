import { useParams } from "react-router-dom";
import {useEffect, useState, useCallback} from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import JoinLeftIcon from '@mui/icons-material/JoinLeft';
import ListItemButton from '@mui/material/ListItemButton';
import JoinInnerIcon from '@mui/icons-material/JoinInner';

import ResponsiveAppBar from './components/ResponsiveAppBar'; 

/*
Page to show the information about an individual dataset
    -- Dataset information (title, description, ...)
    -- Recomended Joins
    -- Similar datasets based on description
*/


// Information card for main dataset
const DatasetInformation = ({dataset, image}) => {
    return(
        <Grid item xs={12} md={6}>
        <Card sx={{ display: 'flex' }} >
          <CardContent sx={{ flex: 1 }}>
            <Stack spacing={2}>
                <Container sx={{p: 2, border: '1px dashed grey' }}>
                    <Typography gutterBottom variant="h3" component="h5">
                        {dataset.title}
                    </Typography>
                    <Typography variant="p" component="p" color="text.secondary">
                        {dataset.description}
                    </Typography>
                    <Container sx={{p: 1, border: '1px dashed grey' }}>
                        <Stack direction="row" spacing={2}>
                            <Chip label="category?" />
                            <Chip label="date?" />
                            <Chip label="filetype?" />
                        </Stack>
                    </Container>
                </Container>

                <Container sx={{p: 2, border: '1px dashed grey' }}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained"> Descarrega </Button>
                        <Button variant="contained"> Visita l'original </Button>
                    </Stack>
                </Container>
            </Stack>
          </CardContent>
        </Card>
    </Grid>     
               
    )
}


// Structure for recomended datasets
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
    const [dataset, setDataset] = useState("")                  // information about current dataset
    const [dataIsReturned, setDataIsReturned] = useState(false) // bool to check if rendering can start
    const [clickedColumn, setClickedColumn] = useState(-1)      // column selected to showcase similars

    const fetchData = useCallback(async () => {
        const response = await fetch(`http://localhost:8000/item/${datasetId}`)
        const retrievedDataset = await response.json()
        setDataset(retrievedDataset.message);
        console.log(retrievedDataset.message)
        setDataIsReturned(true)
        }, [])
        
    useEffect(() => {
        fetchData()
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
                        {dataIsReturned ? (
                            <div>
                                {dataset.columns.length == 0 ? 
                                (<p> Les columnes d'aquest dataset no poden ser explorades</p>) 
                                : 
                                (<p>Selecciona una columna per trobar columnes similars en altres datasets</p>)}

                                {dataset.columns.map((column, index) => (
                                    <ListItemButton key={index} onClick={() => setClickedColumn(index)}>
                                        <ListItemIcon>
                                                <JoinInnerIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={column.name} secondary={column.type}/>
                                    </ListItemButton>
                                ))}
                                {clickedColumn != -1 ? (
                                    <div>
                                        <h4> {dataset.columns[clickedColumn].name} </h4>
                                        <List component="nav" aria-label="mailbox folders">
                                            {
                                                dataset.columns[clickedColumn]['similar'].map((similarDataset, index) => (
                                                    <ListItemButton key={index}>
                                                        <ListItemIcon>
                                                            <JoinLeftIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary={`${similarDataset.datasetId} - ${similarDataset.name}`} 
                                                            secondary={`Value: ${similarDataset.value}`}
                                                        />
                                                    </ListItemButton>
                                                ))
                                            }

                                        </List>

                                    </div>
                                ) : (<></>)}
                            </div>
                        ) : (<p>loading</p>)}
                    </Box>
                    <Box sx={{ p: 2, border: '1px dashed grey' }}>
                        <Typography variant="h5" color="inherit" paragraph>
                            Datasets similars
                        </Typography>
                        <p> Datasets amb una descripció similar</p>
                        {dataIsReturned ? (
                            <div>
                                {
                                    dataset.recomendations.map((recomendedDataset, index) => (
                                        <div key={index}>
                                        <Box sx={{ p: 2, border: '1px dashed grey' }}>
                                            <MediaCard 
                                                title={recomendedDataset.title} 
                                                category={recomendedDataset.category} 
                                                date={recomendedDataset.date} 
                                                description={recomendedDataset.description} 
                                                origin={recomendedDataset.origin} 
                                                web_url={recomendedDataset.web_url} 
                                                datasetId={index}
                                            />
                                        </Box>
                                    </div>
                                    ))
                                }
                                {/*similar.slice(1, 4).map((similarDatasetId, index) => (

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

                                ))*/}
                            </div>
                        ) : (<p>loading</p>)}
                    </Box>
                </main>
            </Container>
        </>
    )
}


export default DatasetPage