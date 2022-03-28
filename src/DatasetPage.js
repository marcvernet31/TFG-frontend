import { useParams } from "react-router-dom";
import Container from '@mui/material/Container';

import ResponsiveAppBar from './components/ResponsiveAppBar'; 


const DatasetPage = () => {

    const { datasetId } = useParams();

    return(
        <>
            <ResponsiveAppBar/>
            <Container maxWidth={"lg"} sx={{ p: 2, border: '1px dashed grey' }}>
                <main>
                    <p> Rendering the datasetId: {datasetId} </p>
                </main>
            </Container>
        </>
    )
}

export default DatasetPage