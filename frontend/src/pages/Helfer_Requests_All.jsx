import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Box, Container, List, ListItem, ListItemButton, Typography, CircularProgress, Alert } from '@mui/material';
import { Footer } from '../component/Footer.jsx';
import { Helfer_Home } from '../component/Helfer_Home.jsx';

export function Helfer_Requests_All() {
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
        fetch(`http://localhost:8000/requests/open`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Keine Anfragen gefunden");
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
        <Header header_title={"Offene Anfragen"} additional_links={back_links} />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Helfer_Home user_id={user_id} />
            </Box>
        </Box>
    </>
    );

    if (error) return (
    <>
        <Header header_title={"Offene Anfragen: FEHLER"} additional_links={back_links} />
        <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
        <br />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Helfer_Home user_id={user_id} />
        </Box>
    </>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', }}>
            <Header header_title={"Offene Anfragen"} additional_links={back_links} />

            <Container maxWidth="md" sx={{ flex: 1, py: 2 }}>
                <Helfer_Home user_id={user_id} />

                <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {requests.map((request) => (
                        <ListItem key={request.request_id} disablePadding>
                            <Link
                                to={`/helfer/${user_id}/request/${request.request_id}`}
                                style={{ textDecoration: 'none', width: '100%' }}
                            >
                                <ListItemButton
                                    sx={{
                                        p: 2.5,
                                        backgroundColor: '#fff',
                                        borderRadius: 2,
                                        borderLeft: '4px solid #9759d1ff',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: '700', color: '#1a1a1a' }}>
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