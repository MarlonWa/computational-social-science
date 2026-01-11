import { Link } from 'react-router-dom'
import { Button, Box } from "@mui/material";
import { Header } from '../component/Header.jsx'
import { Footer } from '../component/Footer.jsx';

const pages = [
  { name: 'ICH WILL HELFEN', path: '/helfer/login', color: "#9759d1ff", hoverColor: "#7f19d2" },
  { name: 'ICH SUCHE HILFE', path: '/hilfe/login', color: "#d159c7ff", hoverColor: "#d1199e" },
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
                borderRadius: 0,
                fontSize: { xs: "2rem", md: "4rem" },
                //opacity: 0.85,
                "&:hover": {
                  color: "white", // keep same text color on hover
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