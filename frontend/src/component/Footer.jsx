import Constants from '../constants/constants.js';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import '@fontsource-variable/roboto-mono';
import { Link } from 'react-router-dom'

const pages = [
  {name: 'FAQ', path: '/faq'},
  {name: 'Datenschutzerklärung', path: '/datenschutz'},
  {name: 'Impressum', path: '/impressum'},
]


export function Footer() {
    return (
        <>
            <Box sx={{ pt: 2, height: {xs: '40px', md: '50px'}}}>
                <AppBar position="static" sx={{ backgroundColor: Constants.footer_color }}>
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
                                        sx={{ 
                                            fontSize: { xs: '0.7rem', md: '0.9rem' },
                                            color: Constants.neutral_light, 
                                            "&:hover": { color: Constants.neutral_light } 
                                        }}
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
