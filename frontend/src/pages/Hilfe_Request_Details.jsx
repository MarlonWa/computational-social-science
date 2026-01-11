import { Link, useParams } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { Box, Paper, Stack, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { Footer } from '../component/Footer.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatIcon from '@mui/icons-material/Chat';
import { useState, useEffect } from 'react';
import { Hilfe_Back_Home } from '../component/Hilfe_Back_Home.jsx';
const accentColor = '#9759d1ff';

export function Hilfe_Request_Details() {
    
    const { user_id, request_id } = useParams();

    const back_links = [
        { name: 'Meine Startseite', path: `/hilfe/${user_id}` },
    ];

    const [request, setRequest] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8000/request/${request_id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Anfrage nicht gefunden");
                }
                return res.json();
            })
            .then((data) => {
                setRequest(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [request_id]);
    
    if (loading) return (
        <>
            <Header header_title={"Anfragedetails"} additional_links={back_links} />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
                <br />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Hilfe_Back_Home user_id={user_id} />
                </Box>
            </Box>
        </>
    );
    
    if (error) return (
        <>
            <Header header_title={"Anfragedetails: Fehler"} additional_links={back_links} />
            <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Hilfe_Back_Home user_id={user_id} />
            </Box>
        </>
    );

    return (
        <>
            <Box sx={{
                height: "100vh",
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Header header_title={"Anfragedetails"} additional_links={back_links} />

                <Box sx={{
                    flex: 1,
                    px: { xs: 1, sm: 3 },
                    pt: { xs: 1, sm: 3 },
                    display: 'flex',
                    justifyContent: 'center',
                    overflow: 'auto'
                }}>
                    <Stack sx={{
                        width: '100%',
                        maxWidth: '900px',
                        gap: { xs: 2, sm: 3 }
                    }}>
                        {/* Title Section */}
                        <Paper sx={{
                            p: { xs: 2, sm: 3 },
                            backgroundColor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                        }}>
                            <Typography variant="h3" sx={{ fontWeight: 600, color: '#333', mb: 1, fontSize: { xs: '2.4rem', sm: '2.8rem' } }}>
                                {request.title}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ color: '#666' }}>
                                Von: {requestData.user} • {requestData.createdAt}
                            </Typography> */}
                        </Paper>

                        {/* Description Section */}
                        <Paper sx={{
                            p: { xs: 2, sm: 3 },
                            backgroundColor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                        }}>
                            {/* <Typography variant="h5" sx={{ fontWeight: 600, color: '#333', mb: 2, fontSize: { xs: '1.4rem', sm: '1.8rem' } }}>
                                Beschreibung
                            </Typography> */}
                            <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, fontSize: { xs: '1.8rem', sm: '2.5rem' } }}>
                                {request.text}
                            </Typography>
                        </Paper>

                        {/* Action Buttons */}
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                            <Button
                                component={Link}
                                to={`/hilfe/${user_id}`}
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                                sx={{
                                    flex: 1,
                                    py: { xs: 2, sm: 2.5 },
                                    fontSize: { xs: '1.5rem', sm: '1.9rem' },
                                    borderColor: '#999',
                                    color: '#333',
                                    '&:hover': {
                                        borderColor: '#666',
                                        backgroundColor: '#f5f5f5'
                                    }
                                }}
                            >
                                Zurück
                            </Button>
                            <Button
                                component={Link}
                                to={`/hilfe/${user_id}/request/${request_id}/chat`}
                                variant="contained"
                                startIcon={<ChatIcon />}
                                sx={{
                                    flex: 1,
                                    py: { xs: 2, sm: 2.5 },
                                    fontSize: { xs: '1.5rem', sm: '1.9rem' },
                                    backgroundColor: accentColor,
                                    '&:hover': {
                                        backgroundColor: '#7f19d2'
                                    }
                                }}
                            >
                                zum Chat
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
                <Footer />
            </Box>
        </>
    );
}
