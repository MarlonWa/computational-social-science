import Constants from '../constants/constants.js';
import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from 'react-router-dom';
import { Footer } from '../component/Footer.jsx';
import { Box, Button, Container, Divider, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

export function Hilfe_Home() {
    const { user_id } = useParams();
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(Constants.API_URL + `/user/${user_id}/requests`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Keine Anfragen gefunden");
                }
                return res.json();
            })
            .then((data) => {
                setRequests(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [user_id]);

    const getStatusColor = (status) => {
        // map common status values (english/german) to colors
        switch ((status || '').toString().toLowerCase()) {
            case 'open': return Constants.text_color_black;
            case 'in_progress': return Constants.text_color_black;
            case 'closed': return Constants.neutral_medium_light;
            default:
                return Constants.text_color_black;
        }
    };


    if (error) return <><Header header_title={"STARTSEITE: FEHLER"} /> <p> Error: {error} </p> </>;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: Constants.neutral_light }}>
            <Header header_title={"Startseite"} />
            <Box sx={{ position: 'relative', display: { xs: 'none', sm: 'block' } }}>
                <Link to={`/hilfe/${user_id}/chats`} style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        sx={{
                            position: 'absolute',
                            top: {sm: 32 },
                            right: {sm: 32 },
                            fontSize: {sm: '3rem' },
                            fontWeight: 'bold',
                            padding: { sm: '30px 50px' },
                            borderRadius: 2,    
                            backgroundColor: Constants.primary_color,
                            '&:hover': { backgroundColor: Constants.primary_color_dark }
                        }}
                    >
                        Chats
                    </Button>
                </Link>
            </Box>

            <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
            <Box sx={{display: { xs: 'block', sm: 'none' }}}>
                <Link to={`/hilfe/${user_id}/chats`} style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{   
                            fontSize: { xs: '1.8rem'}, 
                            width: '100%',
                            fontWeight: 'bold',
                            py:2,
                            mb:2,
                            borderRadius: 2,
                            backgroundColor: Constants.primary_color,
                            '&:hover': { backgroundColor: Constants.primary_color_dark }
                        }}
                    >
                        Chats
                    </Button>
                </Link>
            </Box>

                <Link to={`/hilfe/${user_id}/new`} style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            width: '100%',
                            py: 2,
                            fontSize: { xs: '1.8rem', sm: '2.8rem' },
                            fontWeight: 'bold',
                            //mb: 2,
                            borderRadius: 2,
                            //changed this to our default colors, possible to change back
                            /* background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)', */
                            backgroundColor: Constants.primary_color,
                            //boxShadow: Constants.primary_color_dark,
                            //'&:hover': { boxShadow: "0 12px 35px " + hoverAccentColor }
                            '&:hover': { backgroundColor: Constants.primary_color_dark }
                        }}
                    >
                        Neue Anfrage
                    </Button>
                </Link>

                <Divider sx={{ my: 3, fontSize: { xs: '1rem', sm: '1.5rem' }, textAlign: 'center' }}> oder </Divider>

                <Link to="/faq" style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            width: '100%',
                            py: 3,
                            marginBottom: 3,
                            fontSize: { xs: '1.4rem', sm: '2rem' },
                            fontWeight: '400',
                            borderRadius: 2,
                            backgroundColor: Constants.secondary_color,
                            border: 'none',
                            //borderColor: Constants.neutral_medium,
                            color: Constants.neutral_light,
                            '&:hover': { backgroundColor: Constants.secondary_color_dark, color: Constants.neutral_light }
                        }}
                    >
                        Hier geht's zu den häufigsten Fragen
                    </Button>
                </Link>

                <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {requests.map((request) => (
                        <ListItem key={request.request_id} disablePadding>
                            <Link
                                to={`/hilfe/${user_id}/request/${request.request_id}`}
                                style={{ textDecoration: 'none', width: '100%' }}
                            >
                                <ListItemButton
                                    sx={{
                                        p: 3,
                                        backgroundColor: Constants.neutral_light,
                                        borderRadius: 2,
                                        boxShadow: '0 2px 8px' + Constants.shadow_black,
                                        '&:hover': {
                                            boxShadow: '0 8px 20px' + Constants.shadow_black,
                                            //transform: 'translateY(-2px)',
                                            transition: 'all 0.3s ease'
                                        }
                                    }}
                                >
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: getStatusColor(request.status), fontSize: { xs: '1.4rem', sm: '2.5rem' }, textDecoration: request.status?.toLowerCase() === 'closed' ? 'line-through' : 'none' }}>
                                        {request.title}
                                    </Typography>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Container>

            <Footer />
        </Box>
    );
}