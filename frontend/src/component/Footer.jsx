import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import '@fontsource-variable/roboto-mono';
import { Link } from 'react-router-dom'

const pages = [
  {name: 'FAQ', path: '/faq'},
  {name: 'Datenschutzerklärung', path: '/dev'},
  {name: 'Impressum', path: '/dev'},
]


export function Footer() {
    const FOOTER_BACKGROUND_COLOR = '#b2c2d2ff'; // Change this to customize the footer color

    return (
        <>
            <Box sx={{ pt: 2, height: {xs: '40px', md: '50px'}}}>
                <AppBar position="static" sx={{ backgroundColor: FOOTER_BACKGROUND_COLOR }}>
                    <Toolbar 
                        sx={{
                            minHeight: { xs: '40px', md: '50px' },
                            height: '100%',
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                            {pages.map((page) => (
                                <Box sx={{ flex: 1}} key={page.name}>
                                    <Button
                                        sx={{ color: 'white', "&:hover": { color: "white" } }}
                                        component={Link}
                                        to={page.path}
                        >
                            {page.name}
                        </Button>
                        </Box>
                    ))}
                    </Box>

                </Toolbar>
            </AppBar>
        </Box>
        </>
  );
}
