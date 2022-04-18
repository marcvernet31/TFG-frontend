import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import SendIcon from '@mui/icons-material/Send';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import ResponsiveAppBar from './components/ResponsiveAppBar'

function createData(description, category, organization_name_ca, date_published, fuente, web_url, download_url, status, origin, index) {
    return { description, category, organization_name_ca, date_published, fuente, web_url, download_url, status, origin, index };
  }

const rows = [
    createData("Unitats administratives  de la ciutat de Barcelona", "Detall de les unitats administratives  de la ciutat de Barcelona:  districtes, barris, àrea interès, àrees estadístiques bàsiques (AEB) i seccions censals", "Administració",	"Sector públic", "2017-07-06", "Ajuntament de Barcelona", "https://opendata-ajuntament.barcelona.cat/data/ca/dataset?q=&name=20170706-districtes-barris", "https://opendata-ajuntament.barcelona.cat/data/dataset/808daafa-d9ce-48c0-925a-fa5afdb1ed41/resource/4cc59b76-a977-40ac-8748-61217c8ff367/download",	"-", "barcelona", "0"),
 
]

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
              <TableCell> title </TableCell>
              <TableCell align="right">description</TableCell>
              <TableCell align="right">category</TableCell>
              <TableCell align="right">organization_name_ca</TableCell>
              <TableCell align="right">date_published</TableCell>
              <TableCell align="right">fuente</TableCell>
              <TableCell align="right">web_url</TableCell>
              <TableCell align="right">download_url</TableCell>
              <TableCell align="right">status</TableCell>
              <TableCell align="right">origin</TableCell>
              <TableCell align="right">index</TableCell>
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
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.organization_name_ca}</TableCell>
                <TableCell align="right">{row.date_published}</TableCell>
                <TableCell align="right">{row.fuente}</TableCell>
                <TableCell align="right">{row.web_url}</TableCell>
                <TableCell align="right">{row.download_url}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.origin}</TableCell>
                <TableCell align="right">{row.index}</TableCell>

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
                    <Container maxWidth="sm" sx={{p:2,border: '1px dashed grey' }}>
                    </Container>
                    <Container maxWidth="sm" sx={{p:2,border: '1px dashed grey' }}>
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
                    <Container maxWidth="sm" sx={{p:2,border: '1px dashed grey' }}>
                    </Container>
                    <Container maxWidth="sm" sx={{p:2,border: '1px dashed grey' }}>
                        <p>descripcio de cada variable</p>
                    </Container>
                    <Container maxWidth="sm" sx={{p:2,border: '1px dashed grey' }}>

                    <SendMessage/>
                    </Container>

                </Box>

            </main>
        </>

    )
}

export default Contribute