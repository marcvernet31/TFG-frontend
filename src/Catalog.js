import {useEffect, useState, useCallback} from "react";

import Container from '@mui/material/Container';
import ResponsiveAppBar from './components/ResponsiveAppBar'; 
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

// https://devtrium.com/posts/async-functions-useeffect

const CustomizedInputBase = () => {
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Catalog"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }


  const MediaCard = ({title, category, date, description, origin, web_url, datasetId}) => {
  
    const handleClick = () => {
      console.log("clicked")
    }
  
    return (
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Chip label={origin} />
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={(() => handleClick())}> Visita </Button>
        </CardActions>
      </Card>
    );
  }

const CatalogDispaly = ({catalog}) => {
  return(
    <div>
    {catalog.map((dataset, index) =>                                         
      <MediaCard key={index} 
        title={dataset.title}
        category={dataset.category}
        date={dataset.date}
        description={dataset.description}
        origin={dataset.origin}
        web_url={dataset.web_url}
        datasetId={index}
      />
      )}
    </div>
  )
}


const DatasetSearch = () => {

  const [catalog, setCatalog] = useState([])  
  
  const fetchData = useCallback(async () => {
    const response = await fetch("http://localhost:8000/catalog")
    const retrievedCatalog = await response.json()
    setCatalog(retrievedCatalog.message);
  }, [])
  
  useEffect(() => {
    fetchData()
      .catch(console.error);;

    console.log(catalog)
  }, [])

    return(
        <>
            <ResponsiveAppBar/>
            <Container maxWidth={"lg"} sx={{ p: 2, border: '1px dashed grey' }}>
                <main>
                    <Typography variant="h5" align="center">
                        CATALEG
                    </Typography>
                    <Box display="flex" justifyContent="center">
                        <CustomizedInputBase/>
                    </Box>
                    <CatalogDispaly catalog={catalog}/>
                </main>
            </Container>
        </>
    )
}

export default DatasetSearch