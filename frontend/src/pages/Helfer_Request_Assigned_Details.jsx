import Constants from '../constants/constants.js';
import { Link, useParams } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { Box, Paper, Stack, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { Footer } from '../component/Footer.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatIcon from '@mui/icons-material/Chat';
import { useState, useEffect } from 'react';
import { Helfer_Back_Home } from '../component/Helfer_Back_Home.jsx';

export function Helfer_Request_Assigned_Details() {

    const { user_id, request_id } = useParams();

    const back_links = [
        { name: 'Meine Startseite', path: `/helfer/${user_id}` },
        { name: 'Meine Anfragen', path: `/helfer/${user_id}/myrequests` },
    ];

    const [request, setRequest] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            fetch(Constants.API_URL + `/request/${request_id}`)
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
            <Header header_title={"zugewiesene Anfrage"} additional_links={back_links} />
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
            <Header header_title={"zugewiesene Anfrage: Fehler"} additional_links={back_links} />
            <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Helfer_Back_Home user_id={user_id} />
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
                <Header header_title={"zugewiesene Anfrage"} additional_links={back_links} />

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
                            boxShadow: '0 4px 12px ' + Constants.shadow_black,
                        }}>
                            <Typography variant="h4" sx={{ fontWeight: 600, color: Constants.text_color_black, mb: 1 }}>
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
                            boxShadow: '0 4px 12px ' + Constants.shadow_black,
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: Constants.text_color_black, mb: 2 }}>
                                Beschreibung
                            </Typography>
                            <Typography variant="body1" sx={{ color: Constants.text_color_dark_grey, lineHeight: 1.8 }}>
                                {request.text}
                            </Typography>
                        </Paper>

                        {/* Action Buttons */}
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                            <Button
                                component={Link}
                                to={`/helfer/${user_id}/myrequests`}
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                                sx={{
                                    flex: 1,
                                    p: 1,
                                    borderColor: Constants.neutral_medium,
                                    color: Constants.text_color_black,
                                    '&:hover': {
                                        backgroundColor: Constants.neutral_light_darker,
                                        color: Constants.text_color_black
                                    }
                                }}
                            >
                                Zurück zu meinen Anfragen
                            </Button>
                            <Button
                                component={Link}
                                to={`/helfer/${user_id}/myrequest/${request_id}/chat`}
                                variant="contained"
                                startIcon={<ChatIcon />}
                                sx={{
                                    flex: 1,
                                    p: 1,
                                    backgroundColor: Constants.primary_color,
                                    '&:hover': {
                                        backgroundColor: Constants.primary_color_dark,
                                        color : Constants.neutral_light
                                    }
                                }}
                            >
                                zum  Chat
                            </Button>
                        </Stack>

                        {/* Additional Action Buttons */}
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    fetch(Constants.API_URL + `/helper/${user_id}/remove/${request_id}`, { method: 'PUT' })
                                        .then(() => window.location.href = `/${Constants.PAGES_PREFIX}/#/helfer/${user_id}/myrequests`)
                                        .catch((err) => setError(err.message));
                                }}
                                sx={{
                                    flex: 1,
                                    p: 1,
                                    backgroundColor: Constants.primary_color,
                                    '&:hover': {
                                        backgroundColor: Constants.primary_color_dark,
                                        color : Constants.neutral_light
                                    }
                                }}
                            >
                                Anfrage nicht mehr bearbeiten
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    fetch(Constants.API_URL + `/request/status/${request_id}/closed`, { method: 'PUT' })
                                        .then(() => fetch(Constants.API_URL + `/user/point/${user_id}`, {method: 'PUT'}))
                                        .then(() => window.location.href = `/${Constants.PAGES_PREFIX}/#/helfer/${user_id}/myrequests`)
                                        .catch((err) => setError(err.message));
                                }}
                                sx={{
                                    flex: 1,
                                    p: 1,
                                    backgroundColor: Constants.primary_color,
                                    '&:hover': {
                                        backgroundColor: Constants.primary_color_dark,
                                        color : Constants.neutral_light
                                    }
                                }}
                            >
                                Anfrage abschließen
                            </Button>
                        </Stack>
                    </Stack>
                </Box>

                <Footer />
            </Box>
        </>
    );
}