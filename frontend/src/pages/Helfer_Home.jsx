import Constants from '../constants/constants.js';
import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { Footer } from '../component/Footer.jsx'
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";

export function Helfer_Home() {
    const { user_id } = useParams();

    const buttonItems = [
        { label: 'Scoreboard', path: 'scoreboard' },
        { label: 'zugewiesene Anfragen', path: 'myrequests' },
        { label: 'Alle Anfragen', path: 'requests' },
        { label: 'Meine Chats', path: 'chats' },
    ];

    return (
        <Box sx={{
            height: "100vh",
            display: 'flex',
            flexDirection: 'column',
        }}> 
            <Header header_title={"Startseite"} />
            
            <Box sx={{ 
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
            }}>  
                <Box sx={{
                    display: 'grid',
                    //gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem',
                    maxWidth: '600px',
                    width: '100%',
                }}>
                    {buttonItems.map((item, index) => (
                        <Link 
                            key={index}
                            to={`/helfer/${user_id}/${item.path}`}
                        >
                            <Button
                                fullWidth
                                sx={{
                                    backgroundColor: Constants.primary_color,
                                    color: Constants.neutral_light,
                                    p: "2rem 1rem",
                                    fontSize: '2.5rem',
                                    fontWeight: 400,
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: Constants.primary_color_dark,
                                        boxShadow: '0 8px 16px ' + Constants.shadow_black,
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        </Link>
                    ))}
                </Box>
            </Box>
            
            <Footer />
        </Box>
    );
}
