import Constants from '../constants/constants.js';
import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { Footer } from '../component/Footer.jsx';
<<<<<<< HEAD
import { Helfer_Home } from '../component/Helfer_Home.jsx';
=======
import { Helfer_Back_Home } from '../component/Helfer_Back_Home.jsx';
>>>>>>> 565f5e6c4af7c83215e1646a9588f9f4d74ec0ef
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Card, CircularProgress, Alert, ButtonBase } from '@mui/material';

<<<<<<< HEAD
// Placeholder hardcoded TODO rm
const placeholderRequests = [
    {
        request_id: 1,
        title: "Internet Einrichtung",
        text: "Mein Laptop verbindet sich nicht mit dem Internet. Ich brauche Hilfe bei der Einrichtung der WLAN-Verbindung."
    },
    {
        request_id: 2,
        title: "Technik-Unterstützung",
        text: "Ich brauche Hilfe beim Einrichten eines Druckers und WLAN-Verbindung."
    },
    {
        request_id: 3,
        title: "Online Banking Hilfe",
        text: "Ich habe Schwierigkeiten, mich in mein Online-Banking-Konto einzuloggen und benötige Unterstützung. Bitte helfen Sie mir dabei.  BlablablaBlablablaBlablablaBlablablaBlablabla BlablablaBlablablaBlablabla BlablablaBlablabla BlablablaBlablabla BlablablaBlablablaBlablabla Blablabla BlablablaBlablablaBlabl BlablablaBl ablablaBlablablaBlabl BlablablaBl ablablaBlablabl aBlablablaB lablablaablaBlablabla ablaBlablabla BlablablaBlablablaBlablablaBlablablaBlablabla"
    }
];
=======
>>>>>>> 565f5e6c4af7c83215e1646a9588f9f4d74ec0ef

export function Helfer_Requests_Assigned() {
    const { user_id } = useParams();

<<<<<<< HEAD
    const [requests, setRequests] = useState(placeholderRequests);
=======
    const [requests, setRequests] = useState([]);
>>>>>>> 565f5e6c4af7c83215e1646a9588f9f4d74ec0ef
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const back_links = [
        { name: 'Meine Startseite', path: `/helfer/${user_id}` },
        { name: 'Meine Requests', path: `/helfer/${user_id}/myrequests` },
        { name: 'Meine Chats', path: `/helfer/${user_id}/chats` }
    ]

    useEffect(() => {
<<<<<<< HEAD
        fetch(`http://localhost:8000/helper/${user_id}/requests`)
=======
        fetch(Constants.API_URL + `/helper/${user_id}/requests`)
>>>>>>> 565f5e6c4af7c83215e1646a9588f9f4d74ec0ef
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
<<<<<<< HEAD
                <Helfer_Home user_id={user_id} />
=======
                <Helfer_Back_Home user_id={user_id} />
>>>>>>> 565f5e6c4af7c83215e1646a9588f9f4d74ec0ef
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
<<<<<<< HEAD
            <Helfer_Home user_id={user_id} />
=======
            <Helfer_Back_Home user_id={user_id} />
>>>>>>> 565f5e6c4af7c83215e1646a9588f9f4d74ec0ef
        </Box>
    </>
    );

    return (
        <Box sx={{ height: "100vh", display: 'flex', flexDirection: 'column' }}>

            <Header header_title={"Deine aktuellen Anfragen"} additional_links={back_links} />
            <Box sx={{ flex: 1, p: 3, maxWidth: 900, mx: 'auto' }}>

<<<<<<< HEAD
=======
            <Link to={`/helfer/${user_id}/myrequest/1`}> DEV: Link zu Anfrage 1 </Link>

>>>>>>> 565f5e6c4af7c83215e1646a9588f9f4d74ec0ef
                {requests.length === 0 ? (
                    <>
                        <Alert severity="info">Keine aktiven Anfragen vorhanden.</Alert>
                        <br />
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
<<<<<<< HEAD
                            <Helfer_Home user_id={user_id} />
=======
                            <Helfer_Back_Home user_id={user_id} />
>>>>>>> 565f5e6c4af7c83215e1646a9588f9f4d74ec0ef
                        </Box>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
<<<<<<< HEAD
                        <Helfer_Home user_id={user_id} />
=======
                        <Helfer_Back_Home user_id={user_id} />
>>>>>>> 565f5e6c4af7c83215e1646a9588f9f4d74ec0ef

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
<<<<<<< HEAD
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                        transform: 'translateY(-2px)',
                                        backgroundColor: '#fafafa'
                                    },
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                                    textDecoration: 'none'
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 0.5 }}>
=======
                                        boxShadow: '0 8px 16px ' + Constants.shadow_black,
                                        transform: 'translateY(-2px)',
                                        backgroundColor: Constants.neutral_light_darker
                                    },
                                    boxShadow: '0 4px 12px ' + Constants.shadow_black,
                                    textDecoration: 'none'
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600, color: Constants.text_color_black, mb: 0.5 }}>
>>>>>>> 565f5e6c4af7c83215e1646a9588f9f4d74ec0ef
                                    {request.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
<<<<<<< HEAD
                                        color: '#666',
=======
                                        color: Constants.text_color_dark_grey,
>>>>>>> 565f5e6c4af7c83215e1646a9588f9f4d74ec0ef
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
<<<<<<< HEAD



//<>
//    <Header header_title={"Deine aktuellen Anfragen"}/>
//
//    <h3> Deine aktuellen Anfragen </h3>
//    {requests.map((request) => (
//        <>
//        <Link key={request.request_id} to={`/helfer/${user_id}/myrequest/${request.request_id}`}> Anfrage {request.request_id}, Titel: {request.title} </Link>
//        <br />
//        </>
//    ))}{
//    /*<Link to="/helfer/:user_id/myrequest/1"> Anfrage 1 </Link>
//    <br />
//    <Link to="/helfer/:user_id/myrequest/2"> Anfrage 2 </Link> */}
//    <br />
//    <Link to={`/helfer/${user_id}`}> Zurück zu meiner Startseite </Link>
//    <br />
//    <p> Hier sollen Helfer auf ihre Anfragen zugreifen können, die sie aktuell bearbeiten.</p>
//</>
=======
>>>>>>> 565f5e6c4af7c83215e1646a9588f9f4d74ec0ef
