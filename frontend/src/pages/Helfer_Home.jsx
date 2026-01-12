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

            <Box sx={{ marginBottom: '1rem' }}>
                <Box sx={{
                    fontSize: {xs: '2rem', sm: '2.7rem'},
                    fontWeight: 600,
                    color: Constants.text_color_dark_grey,
                    textAlign: 'center',
                    marginTop: '2rem',
                }}>
                    Willkommen zurück!
                </Box>
            </Box>

            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            }}>
                {/* <Link to={`/helfer/${user_id}/profile`} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                                    <Button
                                        sx={{
                                            minWidth: '56px',
                                            height: '56px',
                                            borderRadius: '50%',
                                            backgroundColor: Constants.primary_color,
                                            color: Constants.neutral_light,
                                            '&:hover': {
                                                backgroundColor: Constants.primary_color_dark,
                                            },
                                        }}
                                    >
                                        <AccountCircle sx={{ fontSize: '2rem' }} />
                                    </Button>
                                </Link> */}


                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: { xs: '1rem', sm: '2rem' },
                    maxWidth: '1200px',
                    width: {xs:'90%', sm: '100%'},
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
                                    p: { xs: "1rem", sm: "1.5rem" },
                                    fontSize: { xs: '1.5rem', sm: '3rem' },
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    borderRadius: '12px',
                                    transition: 'all 0.3s ease',
                                    height: { xs: '10vh', sm: '30vh' },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        backgroundColor: Constants.primary_color_dark,
                                        boxShadow: '0 12px 24px ' + Constants.shadow_black,
                                        transform: 'translateY(-4px)',
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
