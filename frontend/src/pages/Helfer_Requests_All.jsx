import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Box, Container, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { Footer } from '../component/Footer.jsx';

export function Helfer_Requests_All() {
    const { user_id } = useParams();
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);

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
        })
        .catch((err) => {
            setError(err.message);
        });
    }, [user_id]);


    if (error) return <><Header header_title={"STARTSEITE: FEHLER"}/> <p> Error: {error} </p> </>;
    
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Header header_title={"Offene Anfragen"}/>
            
            <Container maxWidth="md" sx={{ flex: 1, py: 2 }}>
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                    <Link to={`/helfer/${user_id}`} style={{ textDecoration: 'none' }}>
                        <ListItemButton
                            sx={{
                                p: 1.5,
                                backgroundColor: '#e3f2fd',
                                borderRadius: 1,
                                color: '#1976d2',
                                fontWeight: '600',
                                '&:hover': { 
                                    backgroundColor: '#bbdefb',
                                    transform: 'translateX(-4px)'
                                },
                                transition: 'all 0.2s ease',
                                width: 'auto'
                            }}
                        >
                            ← Zurück zur Startseite
                        </ListItemButton>
                    </Link>
                </Box>

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