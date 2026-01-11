import Constants from '../constants/constants.js';
import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { Footer } from '../component/Footer.jsx';
import { Helfer_Back_Home } from '../component/Helfer_Back_Home.jsx';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Card, CircularProgress, Alert, ButtonBase } from '@mui/material';


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
        <Header header_title={"AKTIVE ANFRAGEN"} additional_links={back_links} />
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
        <Header header_title={"AKTIVE ANFRAGEN: FEHLER"} additional_links={back_links} />
        <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
        <br />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Helfer_Back_Home user_id={user_id} />
        </Box>
    </>
    );

    return (
        <Box sx={{ height: "100vh", display: 'flex', flexDirection: 'column' }}>

            <Header header_title={"Deine aktuellen Anfragen"} additional_links={back_links} />
            <Box sx={{ flex: 1, p: 3, maxWidth: 900, mx: 'auto' }}>

            <Link to={`/helfer/${user_id}/myrequest/1`}> DEV: Link zu Anfrage 1 </Link>

                {requests.length === 0 ? (
                    <>
                        <Alert severity="info">Keine aktiven Anfragen vorhanden.</Alert>
                        <br />
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Helfer_Back_Home user_id={user_id} />
                        </Box>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Helfer_Back_Home user_id={user_id} />

                        {requests.map((request) => (
                            <Card
                                key={request.request_id}
                                component={Link}
                                to={`/helfer/${user_id}/myrequest/${request.request_id}`}
                                sx={{
                                    py: 2,
                                    px: 4,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        boxShadow: '0 8px 16px ' + Constants.shadow_black,
                                        transform: 'translateY(-2px)',
                                        backgroundColor: Constants.neutral_light_darker
                                    },
                                    boxShadow: '0 4px 12px ' + Constants.shadow_black,
                                    textDecoration: 'none'
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600, color: Constants.text_color_black, mb: 0.5 }}>
                                    {request.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: Constants.text_color_dark_grey,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    {request.text}
                                </Typography>
                            </Card>
                        ))}
                    </Box>
                )}

            </Box>

            <Footer />
        </Box >
    );
}
