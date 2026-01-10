import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { Footer } from '../component/Footer.jsx';
import { Helfer_Home } from '../component/Helfer_Home.jsx';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Card, CircularProgress, Alert, ButtonBase } from '@mui/material';

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

export function Helfer_Requests_Assigned() {
    const { user_id } = useParams();

    const [requests, setRequests] = useState(placeholderRequests);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const back_links = [
        { name: 'Meine Startseite', path: `/helfer/${user_id}` },
        { name: 'Meine Requests', path: `/helfer/${user_id}/myrequests` },
        { name: 'Meine Chats', path: `/helfer/${user_id}/chats` }
    ]

    useEffect(() => {
        fetch(`http://localhost:8000/helper/${user_id}/requests`)
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
                <Helfer_Home user_id={user_id} />
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
            <Helfer_Home user_id={user_id} />
        </Box>
    </>
    );

    return (
        <Box sx={{ height: "100vh", display: 'flex', flexDirection: 'column' }}>

            <Header header_title={"Deine aktuellen Anfragen"} additional_links={back_links} />
            <Box sx={{ flex: 1, p: 3, maxWidth: 900, mx: 'auto' }}>

                {requests.length === 0 ? (
                    <>
                        <Alert severity="info">Keine aktiven Anfragen vorhanden.</Alert>
                        <br />
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Helfer_Home user_id={user_id} />
                        </Box>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Helfer_Home user_id={user_id} />

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
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                        transform: 'translateY(-2px)',
                                        backgroundColor: '#fafafa'
                                    },
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                                    textDecoration: 'none'
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 0.5 }}>
                                    {request.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#666',
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