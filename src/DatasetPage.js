import { useParams } from "react-router-dom";
import {useEffect, useState, useCallback} from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
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

const baseUrl = "http://localhost:3000"

/*
Page to show the information about an individual dataset
    -- Dataset information (title, description, ...)
    -- Recomended Joins
    -- Similar datasets based on description
*/


// Information card for main dataset
const DatasetInformation = ({dataset}) => {
    return(
        <Grid item xs={12} md={6}>
            <Card sx={{ display: 'flex' }} >
                <CardContent sx={{ flex: 1 }}>
                    <Stack spacing={2}>
                        <Container sx={{p: 2, /*border: '1px dashed grey'*/ }}>
                            <Typography gutterBottom variant="h3" component="h5">
                                {dataset.title}
                            </Typography>
                            <Typography variant="p" component="p" color="text.secondary">
                                {dataset.description}
                            </Typography>
                            <Container sx={{p: 1, /*border: '1px dashed grey'*/ }}>
                                <Stack direction="row" spacing={2}>
                                    <Chip label={dataset.source} />
                                    <Chip label={dataset.category} />
                                    <Chip label={dataset.date_published} />
                                </Stack>
                            </Container>
                        </Container>
                        <Container sx={{p: 2, /*border: '1px dashed grey'*/ }}>
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" href={dataset.download_url}> Descarrega </Button>
                                <Button variant="contained" href={dataset.web_url} target="_blank"> Visita l'original </Button>
                            </Stack>
                        </Container>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>              
    )
}



// Structure for recomended datasets
const MediaCard = ({title, description, origin, datasetId}) => {
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


// Structure for recomended datasets
const MediaCardProfile = ({title, description, origin, datasetId, similarColumns}) => {
    const [showColumns, setShowColumns] = useState(false) 
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
            <Tooltip title="Columna original -> columna similar" placement="top-start">
                <Button size="small" onClick={() => setShowColumns(!showColumns)}> 
                    Mostra les columnes 
                </Button> 
            </Tooltip>
            {showColumns ? (
                <div>
                    <Box sx={{ p: 2, border: '1px dashed grey' }}>
                        {similarColumns.map((columnPair, index) => (
                            <Typography variant="body2" color="text.secondary">
                                {`${columnPair[0].originalColumn} -> ${columnPair[0].similarColumn}`}
                            </Typography>
                        ))}
                    </Box>
                </div>
            ) : (<></>)
            } 
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
            <Container maxWidth={"lg"} sx={{ p: 2, /*border: '1px dashed grey'*/ }}>
                <main>
                    <DatasetInformation dataset={dataset} image='gradient.jpg'/>
                    <Box sx={{ p: 2, /*border: '1px dashed grey'*/ }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
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
                                                    <ListItemButton key={index} 
                                                    component="a"
                                                        href={`${baseUrl}/catalog/${datasetId}`}
                                                        target="_blank"
                                                    >
                                                        <ListItemIcon>
                                                            <JoinLeftIcon />
                                                        </ListItemIcon>
                                                        {similarDataset.datasetTitle == null ? (
                                                            <ListItemText 
                                                                primary={`${similarDataset.name} - ${similarDataset.datasetTitle /*.substr(0, 30)*/}...`} 
                                                                secondary={`Value: ${similarDataset.value}`}
                                                            />
                                                        ) : (
                                                            <ListItemText 
                                                                primary={`${similarDataset.name} - ${similarDataset.datasetTitle.substr(0, 30)}...`} 
                                                                secondary={`Value: ${similarDataset.value}`}
                                                            />
                                                        )}

                                                    </ListItemButton>
                                                ))
                                            }

                                        </List>

                                    </div>
                                ) : (<></>)}
                            </div>
                        ) : (<p>loading</p>)}
                    </Box>
                    <Box sx={{ p: 2, /*border: '1px dashed grey'*/ }}>
                        <Typography  variant="h5" sx={{ fontWeight: 'bold' }}>
                            Recomenació per perfils
                        </Typography>
                        <p> Datasets recomenats en funció del nombre de columnes similars</p>
                        {dataIsReturned ? (
                            <div> 
                                {
                                    dataset.profileRecomendations.map((recomendedDataset, index) => (

                                        <div key={index}>
                                            <Box sx={{ p: 2, /*border: '1px dashed grey'*/ }}>
                                                <MediaCardProfile 
                                                    title={recomendedDataset.datasetInformation.title} 
                                                    description={recomendedDataset.datasetInformation.description} 
                                                    origin={recomendedDataset.datasetInformation.origin} 
                                                    datasetId={recomendedDataset.datasetId}
                                                    similarColumns={recomendedDataset.similarColumns} 
                                                />
                                            </Box>
                                        </div>
                                    ))
                                } 
                            </div>
                        ) : (<p>loading</p>)}

                    </Box>
                    <Box sx={{ p: 2, /*border: '1px dashed grey' */}}>
                        <Typography  variant="h5" sx={{ fontWeight: 'bold' }}>
                            Datasets similars
                        </Typography>
                        <p> Datasets amb una descripció similar</p>
                        {dataIsReturned ? (
                            <div>
                                {
                                    dataset.recomendations.slice(1, 5).map((recomendedDataset, index) => (
                                        <div key={index}>
                                            <Box sx={{ p: 2, /*border: '1px dashed grey' */}}>
                                                <MediaCard 
                                                    title={recomendedDataset.title} 
                                                    description={recomendedDataset.description} 
                                                    origin={recomendedDataset.origin} 
                                                    datasetId={index}
                                                />
                                            </Box>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (<p>loading</p>)}
                    </Box>
                </main>
            </Container>
        </>
    )
}


export default DatasetPage