import Constants from '../constants/constants.js';
import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from "react-router-dom";
import { Box, Paper, Stack, Typography, Badge, Chip } from '@mui/material';
import { Footer } from "../component/Footer.jsx";
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import { Helfer_Home } from '../component/Helfer_Home.jsx';


const accentColor = '#9759d1ff';

//TODO HARDCODED - rm
const chats = [
    { id: 1, request_id: 1, title: 'Laptop Internet-Einrichtung', user: 'Maria Schmidt', lastMessage: 'Mein Laptop verbindet sich nicht mit dem Internet',lastTime: '14:22'},
    { id: 3, request_id: 3, title: 'Email-Einrichtung', user: 'Anna Weber', lastMessage: 'Kannst du mir morgen helfen?',  lastTime: '10:33'},
    { id: 2, request_id: 2, title: 'Smartphone Bedienung', user: 'Hans Müller', lastMessage: 'Vielen Dank für deine Hilfe!', lastTime: 'Gestern' },
];
=======
import { Helfer_Back_Home } from '../component/Helfer_Back_Home.jsx';

//TODO HARDCODED - rm
const chats = [
    { id: 1, request_id: 1, title: 'Laptopinternet Einrichtug', user: 'Maria Schmidt', lastMessage: 'Mein Laptpp verbindet sicnicht mit dem Intrrnet',lastTime: '14:22'},
    { id: 3, request_id: 3, title: 'Email Einrivhtung', user: 'Anna Weber', lastMessage: 'Kannstdu mir morgen hrlfen?',  lastTime: '10:33'},
    { id: 2, request_id: 2, title: 'Smartphone Bedienung', user: 'Hans Müller', lastMessage: 'Vielen Dank für deine Hilfe!', lastTime: 'Gestern' },
]; //added some typos so we can have a laugh :>
>>>>>>> 565f5e6c4af7c83215e1646a9588f9f4d74ec0ef

export function Helfer_Chats_All() {
    const { user_id } = useParams();

    const back_links = [
        { name: 'Meine Startseite', path: `/helfer/${user_id}` },
        { name: 'Meine Requests', path: `/helfer/${user_id}/myrequests` },
        { name: 'Meine Chats', path: `/helfer/${user_id}/chats` },
    ];

    return (
        <Box sx={{ height: "100vh", display: 'flex', flexDirection: 'column' }}>
            <Header header_title={"Meine Chats"} additional_links={back_links} />

            <Box sx={{ flex: 1, px: { xs: 1, sm: 3 }, pt: { xs: 1, sm: 3 }, pb: 2, overflow: 'auto' }}>
                <Stack sx={{ maxWidth: '900px', width: '100%', gap: 2, mx: 'auto' }}>
<<<<<<< HEAD
                <Helfer_Home user_id={user_id} />
=======
                <Helfer_Back_Home user_id={user_id} />
>>>>>>> 565f5e6c4af7c83215e1646a9588f9f4d74ec0ef
                    {chats.map((chat) => (
                        <Paper
                            key={chat.id}
                            component={Link}
                            to={`/helfer/${user_id}/myrequest/${chat.request_id}/chat`}
                            sx={{
                                p: { xs: 1.5, sm: 2 },
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 8px 16px ' + Constants.shadow_black,
                                    transform: 'translateY(-2px)',
                                    backgroundColor: Constants.neutral_light_darker
                                },
                                boxShadow: '0 4px 12px ' + Constants.shadow_black,
                                borderRadius: 2
                            }}
                        >
                            <Box sx={{
                                display: 'grid',
                                gap: { xs: 1, sm: 2 },
                                alignItems: 'center',
                                gridTemplateColumns: '1fr auto 1fr',
                            }}>
                                <Box/>
                                <Box sx={{ minWidth: 0}}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: Constants.text_color_black, mb: 0.5}}>
                                        {chat.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: Constants.text_color_dark_grey, mb: 0.5 }}>
                                        {chat.user}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: Constants.neutral_medium, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {chat.lastMessage}
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right'}}>
                                    <Typography variant="caption" sx={{ color: Constants.neutral_medium, display: 'block', mb: 1 }}>
                                        {chat.lastTime}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </Stack>
            </Box>

            <Footer />
        </Box>
    );
}