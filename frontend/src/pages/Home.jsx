import Constants from '../constants/constants.js';
import { Link } from 'react-router-dom'
import { Button, Box } from "@mui/material";
import { Header } from '../component/Header.jsx'
import { Footer } from '../component/Footer.jsx';

const pages = [
  { name: 'ICH WILL HELFEN', path: '/helfer/login', color: Constants.primary_color, hoverColor: Constants.primary_color_dark },
  { name: 'ICH SUCHE HILFE', path: '/hilfe/login', color: Constants.secondary_color, hoverColor: Constants.secondary_color_dark },
]

export function Home() { //DONE FOR NOW :)

  return (
    <>
      <Box
        maxWidth="100%"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}>

        <Header />

        <Box sx = {{ textAlign: "center", my: 0.5, mx:1, borderRadius: 2, backgroundColor: Constants.primary_color_very_light, boxShadow: `0 4px 8px 0 ${Constants.shadow_black}`, fontSize: { xs: '1rem ', sm:'1.2rem'}}}>
          <p style={{ }}> help@M - Verbindung zwischen Hilfesuchenden und freiwilligen Helfern, um allen den Zugang zu digitalen Medien zu ermöglichen. </p>
          {/* <p style={{ }}>  </p> */}
        </Box>

        <Box
          sx={{
            //width: "100vw",
            height: "100%",
            inset: 0,
            p: 2,
            boxSizing: "border-box",
            display: "flex",
            gap: 2, //zwischen buttons
            flexDirection: { xs: "column", md: "row" },
            flex: 1,
            minHeight: 0
          }}>

          {pages.map((page) => (
            <Button
              key={page.name}
              variant="contained"
              sx={{
                backgroundColor: page.color,
                flex: 1,
                borderRadius: "40px",
                fontSize: { xs: "2rem", md: "4rem" },
                //opacity: 0.85,
                "&:hover": {
                  color: Constants.text_color_white, // keep same text color on hover
                  //opacity: 1,
                  backgroundColor: page.hoverColor
                },
              }}
              component={Link}
              to={page.path}
            >
              {page.name}
            </Button>
          ))}
        </Box>

        <Footer />
      </Box>
    </>
  );
}