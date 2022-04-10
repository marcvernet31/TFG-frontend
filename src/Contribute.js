import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ResponsiveAppBar from './components/ResponsiveAppBar'

function createData(description, category, organization_name_ca, date_published, fuente, web_url, download_url, status, origin, index) {
    return { description, category, organization_name_ca, date_published, fuente, web_url, download_url, status, origin, index };
  }

const rows = [
    createData("Unitats administratives  de la ciutat de Barcelona", "Detall de les unitats administratives  de la ciutat de Barcelona:  districtes, barris, àrea interès, àrees estadístiques bàsiques (AEB) i seccions censals", "Administració",	"Sector públic", "2017-07-06", "Ajuntament de Barcelona", "https://opendata-ajuntament.barcelona.cat/data/ca/dataset?q=&name=20170706-districtes-barris", "https://opendata-ajuntament.barcelona.cat/data/dataset/808daafa-d9ce-48c0-925a-fa5afdb1ed41/resource/4cc59b76-a977-40ac-8748-61217c8ff367/download",	"-", "barcelona", "0"),
 
]


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
                </Box>

            </main>
        </>

    )
}

export default Contribute