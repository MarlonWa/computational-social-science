import { Link } from 'react-router-dom'
import { Button, Box } from "@mui/material";
import Header from '../component/Header.jsx'
import Typography from '@mui/material/Typography'

const pages = [
  {name: 'ICH WILL HELFEN', path: '/login_helfer', color: "red"},
  {name: 'ICH SUCHE HILFE', path: '/login_hilfe', color: "blue"}
]

export function Home() {
    
  return (
    <>
    <Box 
    maxWidth="100%"
    sx={{
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    }}>

    <Box sx={{pt: 2}}>
        <Header />
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
                color={page.color}
                sx={{
                flex: 1,
                borderRadius: 0,
                fontSize: { xs: "2rem", md: "5rem" },
                }}
                component={Link}
                to={page.path}
            >
                {page.name}
            </Button>
        ))}
        </Box>
    </Box>
    </>
  );
}

export default Home