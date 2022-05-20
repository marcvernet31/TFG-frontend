import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Accordion from '@mui/material/Accordion';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import SendIcon from '@mui/icons-material/Send';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';



// utilities for generating the demo table
function createData(title, description, category, date_published, source, web_url, download_url, status, origin) {
    return { title, description, category, date_published, source, web_url, download_url, status, origin };
  }
const rows = [
    createData("Unitats administratives  de la ciutat de Barcelona", 
      "Detall de les unitats administratives  de la ciutat de Barcelona:  districtes, barris, àrea interès, àrees estadístiques bàsiques (AEB) i seccions censals", 
      "Administració", 
      "2017-07-06", 
      "Ajuntament de Barcelona", 
      "https://opendata-ajuntament.barcelona.cat/data/ca/dataset?q=&name=20170706-districtes-barris", 
      "https://opendata-ajuntament.barcelona.cat/data/dataset/808daafa-d9ce-48c0-925a-fa5afdb1ed41/resource/4cc59b76-a977-40ac-8748-61217c8ff367/download",	
      "-", 
      "barcelona"),
]

/*
'index': 0,
  'title': 'Unitats administratives  de la ciutat de Barcelona',
  'description': 'Detall de les unitats administratives  de la ciutat de Barcelona:  districtes, barris, àrea interès, àrees estadístiques bàsiques (AEB) i seccions censals  ',
  'category': 'Administració',
  'date_published': '2017-07-06',
  'source': 'Ajuntament de Barcelona',
  'web_url': 'https://opendata-ajuntament.barcelona.cat/data/ca/dataset?q=&name=20170706-districtes-barris',
  'download_url': 'https://opendata-ajuntament.barcelona.cat/data/dataset/808daafa-d9ce-48c0-925a-fa5afdb1ed41/resource/4cc59b76-a977-40ac-8748-61217c8ff367/download',
  'status': '-',
  'origin': 'Barcelona'

*/

// Descriptions for each column
const ColumnDescriptions = [
  {
    'name': 'title',
    'value': 'Title of the dataset'
  },
  {
    'name': 'description',
    'value': 'Text describing the dataset content'
  },
  {
    'name': 'category',
    'value': 'Category in which the dataset pertains inside the original dataset collection'
  },
  {
    'name': 'date_published',
    'value': 'Publishing date of the dataset. Can be empty'
  },
  {
    'name': 'source',
    'value': 'Creator of the dataset'
  },
  {
    'name': 'web_url',
    'value': 'URL that redirects to the website where the original dataset is hosted.'
  },
  {
    'name': 'download_url',
    'value': 'URL to download file. Important to be able to identify similar columns'
  },
  {
    'name': 'status',
    'value': 'Identify the http status of the download url. Optional variable'
  },
  {
    'name': 'origin',
    'value': 'Dataset collection identifier'
  },
]


const IndividualDescription = ({title, description}) => {
  return(
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography> {title} </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography> {description} </Typography>
      </AccordionDetails>
    </Accordion>
  )
}


const Description = () => {
  return(
    <>
      <Box display="flex">
        <Stack spacing={1}>
          {ColumnDescriptions.map((column, index) => (
            <IndividualDescription title={column.name} description={column.value}/>
          ))}
        </Stack>
      </Box>
    </>
  )
}


const SendMessage = () => {
  return(
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Icon sx={{ m: 1 }}>
            <SendIcon />
          </Icon>
          <Typography component="h1" variant="h5">
            Envia
          </Typography>
          <Typography component="p" variant="p">
            Accedeix al formulari per col·laborar
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              href="https://docs.google.com/forms/d/e/1FAIpQLSegiDfv8yPIqVqhu56vZHQ4_KTGBTMgFjMll5EdOaTECEsr5g/viewform?usp=sf_link"
              target="_blank"
            >
              Col·labora
            </Button>

          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}


const BasicTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell ></TableCell>

              <TableCell align="right">title</TableCell>
              <TableCell align="right">description</TableCell>
              <TableCell align="right">category</TableCell>
              <TableCell align="right">date_published</TableCell>
              <TableCell align="right">source</TableCell>
              <TableCell align="right">web_url</TableCell>
              <TableCell align="right">download_url</TableCell>
              <TableCell align="right">status</TableCell>
              <TableCell align="right">origin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">title</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.date_published}</TableCell>
                <TableCell align="right">{row.source}</TableCell>
                <TableCell align="right">{row.web_url}</TableCell>
                <TableCell align="right">{row.download_url}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.origin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}


const Contribute = () => {
  return(
    <>
      <ResponsiveAppBar/>
      <main>
        <Box
          sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
            >
              Contribueix
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                El cataleg de datasets està format a partir d'un recull de fonts obertes.
                Qualsevol persona pot col·laborar amb el projecte proposant la incorporació de 
                nous datasets.
            </Typography>
          </Container>
          <Container maxWidth="sm" sx={{p:2, /*border: '1px dashed grey' */}}>
          </Container>
          <Container maxWidth="sm" sx={{p:2, /*border: '1px dashed grey' */}}>
            <Typography
              component="h1"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Taula d'exemple
            </Typography>
            <BasicTable/>
          </Container>
          <Container maxWidth="sm" sx={{p:2, /*border: '1px dashed grey'*/ }}>
          </Container>
          <Container maxWidth="sm" sx={{p:2, /*border: '1px dashed grey' */}}>
          <Typography
              component="h1"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Descripció de les variables
            </Typography>
              <Description />
          </Container>
          <Container maxWidth="sm" sx={{p:2, /*border: '1px dashed grey'*/ }}>
            <SendMessage/>
          </Container>
        </Box>
      </main>
    </>
    )
}

export default Contribute