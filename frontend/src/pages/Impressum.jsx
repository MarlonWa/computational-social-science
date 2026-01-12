import Constants from '../constants/constants.js';
import { Header } from '../component/Header.jsx';
import { Footer } from '../component/Footer.jsx';
import { Box } from "@mui/material";

export function Impressum() {
    return (
        <>
            <Box flex={1} height="100vh" display="flex" flexDirection="column" >
                <Header title="Impressum" />
                <Box flex={1} display="flex" flexDirection="column" justifyContent="top" alignItems="center" padding={4}>
                    <h1>Impressum</h1>
                    <Box maxWidth={600} textAlign="center" padding={3} borderRadius={2} sx={{ backgroundColor: Constants.primary_color_very_light, boxShadow: `0 4px 8px 0 ${Constants.shadow_black}`, fontSize: '1.4rem' }}>
                        <p> help@m </p>
                        <p> (hoffentlich irgendwann von it@m)</p>
                        <p> Adresse: München </p>
                    </Box>
                </Box>
                <Footer />
            </Box>
        </>
    );
}

