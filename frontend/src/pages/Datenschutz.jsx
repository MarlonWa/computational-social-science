import Constants from '../constants/constants.js';
import { Header } from "../component/Header.jsx";
import { Footer } from "../component/Footer.jsx";
import { Box } from "@mui/material";

export function Datenschutz() {
    return (
        <>
            <Box flex={1} height="100vh" display="flex" flexDirection="column" >
                <Header title="Datenschutz" />
                <Box flex={1} display="flex" flexDirection="column" justifyContent="top" alignItems="center" padding={4}>
                    <h1>Datenschutz</h1>
                    <Box maxWidth={600} textAlign="center" padding={3} borderRadius={2} sx ={{backgroundColor: Constants.primary_color_very_light, boxShadow: `0 4px 8px 0 ${Constants.shadow_black}`, fontSize: '1.4rem'}}>
                        <p>Wir haben leider keinen Datenschutz. 🤷‍♂️</p>
                        <p>Deine Daten sind bei uns so sicher wie ein Auto ohne Bremsen auf der Autobahn. Aber hey, zumindest sind sie nicht langweilig!</p>
                        <p>Wir kümmern uns um die Privatsphäre, soweit das möglich ist. Wenn du weitere Fragen hast, schreib uns einfach eine Anfrage. Oder nicht. Wir haben ja eh keine Ahnung. 😎</p>
                    </Box>
                </Box>
                <Footer />
            </Box>
        </>
    );
}

