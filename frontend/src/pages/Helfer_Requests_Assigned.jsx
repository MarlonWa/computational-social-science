import Constants from '../constants/constants.js';
import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { Footer } from '../component/Footer.jsx';
import { Helfer_Back_Home } from '../component/Helfer_Back_Home.jsx';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Container, List, ListItem, ListItemButton, Typography, CircularProgress, Alert } from '@mui/material';


export function Helfer_Requests_Assigned() {
    const { user_id } = useParams();

    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const back_links = [
        { name: 'Meine Startseite', path: `/helfer/${user_id}` },
        { name: 'Meine Requests', path: `/helfer/${user_id}/myrequests` },
        { name: 'Meine Chats', path: `/helfer/${user_id}/chats` }
    ]

    useEffect(() => {
        fetch(Constants.API_URL + `/helper/${user_id}/requests`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Keine Anfragen gefunden.");
                }
                return res.json();
            })
            .then((data) => {
                setRequests(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [user_id]);

    if (loading) return (
    <>
        <Header header_title={"Aktive Anfragen"} additional_links={back_links} />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Helfer_Back_Home user_id={user_id} />
            </Box>
        </Box>
    </>
    );

    if (error) return (
    <>
        <Header header_title={"Aktive Anfragen: Fehler"} additional_links={back_links} />
        <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
        <br />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Helfer_Back_Home user_id={user_id} />
        </Box>
    </>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', }}>
            <Header header_title={"Deine aktuellen Anfragen"} additional_links={back_links} />

            <Container maxWidth="md" sx={{ flex: 1, py: 2 }}>
                <Helfer_Back_Home user_id={user_id} />

                <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {requests.map((request) => (
                        <ListItem key={request.request_id} disablePadding>
                            <Link
                                to={`/helfer/${user_id}/myrequest/${request.request_id}`}
                                style={{ textDecoration: 'none', width: '100%' }}
                            >
                                <ListItemButton
                                    sx={{
                                        p: 2.5,
                                        backgroundColor: Constants.neutral_light,
                                        borderRadius: 2,
                                        borderLeft: '4px solid ' + Constants.primary_color,
                                        boxShadow: '0 2px 8px ' + Constants.shadow_black,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            boxShadow: '0 8px 16px ' + Constants.shadow_black,
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: '700', color: Constants.text_color_black }}>
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
