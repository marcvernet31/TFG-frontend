import {useEffect, useState, useCallback} from "react";

import Container from '@mui/material/Container';
import ResponsiveAppBar from './components/ResponsiveAppBar'; 
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

// https://devtrium.com/posts/async-functions-useeffect

const CustomizedInputBase = ({setSearchBar}) => {
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Catalog"
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={(event) => setSearchBar(event.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    );
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


//  dataset.title.toLowerCase().includes(searchBar)

const CatalogDispaly = ({catalog, searchBar}) => {

  const filterLogic = (title, description, searchBar) => {
    return(title.toLowerCase().includes(searchBar)
    || description.toLowerCase().includes(searchBar)
    )
  }

  return(
    <div>
    {catalog.map((dataset, index) =>    
    <div key={index}>  

        {filterLogic(dataset.title, dataset.description, searchBar) ? 
        (
          <Box key={index} sx={{ m:2, border: '1px dashed grey' }} >
            <MediaCard  
              title={dataset.title}
              category={dataset.category}
              date={dataset.date}
              description={dataset.description}
              origin={dataset.origin}
              web_url={dataset.web_url}
              datasetId={index}
            />
          </Box>
        ) 
        : (<></>)
        }
      </div>                                   
      )}
    </div>
  )
}

const Selection = () => {
  return(
    <div>
      <Typography variant="h5" >
        Dataset Origin
      </Typography>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Barcelona" />
        <FormControlLabel  control={<Checkbox defaultChecked />} label="Hospitalet" />
      </FormGroup>
    </div>

  )
}

const DatasetSearch = () => {

  const [catalog, setCatalog] = useState([])  
  const [loading, setLoading] = useState(false)
  const [searchBar, setSearchBar] = useState("")
  
  
  const fetchData = useCallback(async () => {
    setLoading(true)
    const response = await fetch("http://localhost:8000/catalog")
    const retrievedCatalog = await response.json()
    setCatalog(retrievedCatalog.message);
    setLoading(false)
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
                    <Typography variant="h5" align="center">
                        CATALEG
                    </Typography>
                    <Box display="flex" justifyContent="center" sx={{ p: 2, border: '1px dashed grey' }}>
                        <CustomizedInputBase setSearchBar={setSearchBar}/>
                    </Box>
                    <Selection/>
                    {loading ? 
                      (<p>loading</p>) 
                      : 
                      (
                        <Box display="flex" justifyContent="center" sx={{ p: 2, border: '1px dashed grey' }}>
                          <CatalogDispaly catalog={catalog} searchBar={searchBar}/>
                        </Box>
                    )}

                </main>
            </Container>
        </>
    )
}

export default DatasetSearch