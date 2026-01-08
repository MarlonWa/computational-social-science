import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from 'react-router-dom';
import { Footer } from '../component/Footer.jsx';
import { Box, Button, Container, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

export function Hilfe_Home() {
    const { user_id } = useParams();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        setRequests([
            { request_id: 1, name: "Einkaufshilfe" },
            { request_id: 2, name: "Hund Gassi führen" },
            { request_id: 3, name: "Apotheke" },
            { request_id: 3, name: "Apotheke" },
            { request_id: 3, name: "Apotheke" },
            { request_id: 3, name: "Apotheke" },
            { request_id: 3, name: "Apotheke" },
            { request_id: 3, name: "Apotheke" },
            { request_id: 3, name: "Apotheke" },
            { request_id: 3, name: "Apotheke" },
            { request_id: 3, name: "Apotheke" },
            { request_id: 3, name: "Apotheke" },
        ]);
    }, []);
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fafafa' }}>
            <Header header_title={"Startseite"}/>
            
            <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
                <Link to={`/hilfe/${user_id}/new`} style={{ textDecoration: 'none' }}>
                    <Button 
                        variant="contained" 
                        size="large"
                        sx={{ 
                            width: '100%', 
                            py: 3, 
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            mb: 4,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)',
                            '&:hover': { boxShadow: '0 12px 35px rgba(102, 126, 234, 0.8)' }
                        }}
                    >
                        Neue Anfrage
                    </Button>
                </Link>

                <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {requests.map((request) => (
                        <ListItem key={request.request_id} disablePadding>
                            <Link 
                                to={`/helfer/${user_id}/myrequest/${request.request_id}`}
                                style={{ textDecoration: 'none', width: '100%' }}
                            >
                                <ListItemButton
                                    sx={{
                                        p: 3,
                                        backgroundColor: '#fff',
                                        borderRadius: 2,
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                        '&:hover': { 
                                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                                            transform: 'translateY(-2px)',
                                            transition: 'all 0.3s ease'
                                        }
                                    }}
                                >
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                                        {request.name}
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