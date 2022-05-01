import * as React from 'react';
import {useEffect, useState, useCallback} from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

import ResponsiveAppBar from './components/ResponsiveAppBar'; 



const categories = ["Sector públic", "Salut", "Urbanisme i infraestructures", "Medi ambient", "Cultura i oci", "Transport", "Economia", "Hisenda", "Administració", "Territori", "Altres"]
const origins = ["Barcelona", "L'Hospitalet"]


const CustomizedInputBase = ({setSearchBar}) => {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Cerca al catàleg"
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
        <Typography gutterBottom variant="h6" component="h5">
          {title}
        </Typography>
        <Stack direction="row" spacing={2} >
          <Chip label={origin} />
          <Chip label={category} />
        </Stack>
        <Container sx={{ p:2, /*border: '1px dashed grey'*/}}></Container>
        {(description.length < 200) ? 
          (
            <Typography variant="p" component="p" paragraph color="text.secondary">
              {description}
            </Typography>
          ) 
          : 
          (
            <Typography variant="p" component="p" paragraph color="text.secondary">
            {description.substr(0,200)}...
            </Typography>
          )
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


//  dataset.title.toLowerCase().includes(searchBar)

const CatalogDispaly = ({catalog, searchBar, selectedOrigin}) => {

  // Range of information cards to be displayed
  const [showRange, setShowRange] = useState([0, 10]) 

  const handlePaginationChange = (page) => {
    setShowRange([page*10, page*10+10])
  }

  const filterLogic = (title, description, origin) => {
    const searchBarCondition =  (title.toLowerCase().includes(searchBar)
      || description.toLowerCase().includes(searchBar))

    const originCondition =   (selectedOrigin.includes('Barcelona') && origin == 'barcelona')
    || (selectedOrigin.includes('L\'Hospitalet') && origin == 'hospitalet')

    if(selectedOrigin.length == 0){
      return searchBarCondition
    } 
    else{
      return(
        searchBarCondition && originCondition
      )
    }
  }

  const filteredLength = () => {
    const len = Math.floor(catalog.filter(function(dataset){
      return filterLogic(dataset.title, dataset.description, dataset.origin)
    }).length / 10)
    return len
  }

  return(
    <div>
      {catalog.filter(function(dataset){
        return filterLogic(dataset.title, dataset.description, dataset.origin)
      })
        .slice(showRange[0], showRange[1]).map((dataset, index) =>    
          <div key={index}>  
            <Box key={index} sx={{ m:2, /*border: '1px dashed grey'*/ }} >
              <MediaCard  
                title={dataset.title}
                category={dataset.category}
                date={dataset.date}
                description={dataset.description}
                origin={dataset.origin}
                web_url={dataset.web_url}
                datasetId={dataset.index}
              />
            </Box>
          </div>                                   
      )}
      <Box sx={{ m:2, /*border: '1px dashed grey'*/ }}     
        justifyContent="center" alignItems="center"
      >
        <Pagination 
          count={filteredLength()} 
          color="primary" 
          onClick={event => handlePaginationChange(event.target.textContent)}
        />
      </Box>
    </div>
  )
}

const MultipleSelect = ({names, selectedValue, setSelectedValue, inputLabel}) => {

  // que passa ??
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label"> 
          {inputLabel} 
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedValue}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

const Selection = ({selectedOrigin, setSelectedOrigin, selectedCategories, setSelectedCategories}) => {

  return(
    <div>
      <Typography variant="h5" >
        Dataset Origin
      </Typography>
      <MultipleSelect 
        names={origins}
        selectedValue={selectedOrigin} 
        setSelectedValue={setSelectedOrigin}
        inputLabel='Font'
      />
      <Typography variant="h5" >
        Categoria
      </Typography>
      <MultipleSelect 
        names={categories} 
        selectedValue={selectedCategories} 
        setSelectedValue={setSelectedCategories}
        inputLabel='Categoria'
      />
    </div>
  )
}


const DatasetSearch = () => {

  // Full catalog fetched from api
  const [catalog, setCatalog] = useState([])  
  // Control state to avoid empty rendering
  const [loading, setLoading] = useState(false)
  // Text input on the search bar
  const [searchBar, setSearchBar] = useState("")
  // Selected variable on the origin selector
  const [selectedOrigin, setSelectedOrigin] = useState([]);
  // Selected variable on the category selector
  const [selectedCategories, setSelectedCategories] = useState([]);

  
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
      <Container maxWidth={"lg"} sx={{ p: 2, /*border: '1px dashed grey' */}}>
        <main>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Catàleg
          </Typography>
          <Box display="flex" justifyContent="center" sx={{ p: 2, /* border: '1px dashed grey'*/ }}>
            <CustomizedInputBase setSearchBar={setSearchBar}/>
          </Box>
          <Card display="flex"  sx={{ p: 2, /*border: '1px dashed grey' */}}>
            <Selection 
              selectedOrigin={selectedOrigin}
              setSelectedOrigin={setSelectedOrigin}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </Card>
          {loading ? 
            (<p>loading</p>) 
            : 
            (
              <Box display="flex" justifyContent="center" sx={{ p: 2, /*border: '1px dashed grey' */}}>
                <CatalogDispaly catalog={catalog} searchBar={searchBar} selectedOrigin={selectedOrigin}/>
              </Box>
            )
          }
        </main>
      </Container>
    </>
  )
}

export default DatasetSearch