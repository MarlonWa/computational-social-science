import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from "react-router-dom";
import { Box, Paper, Stack, Typography, Badge, Chip } from '@mui/material';
import { Footer } from "../component/Footer.jsx";
import { useNavigate } from 'react-router-dom';
import { Helfer_Back_Home } from '../component/Helfer_Back_Home.jsx';


const accentColor = '#9759d1ff';

//TODO HARDCODED - rm
const chats = [
    { id: 1, request_id: 1, title: 'Laptop Internet-Einrichtung', user: 'Maria Schmidt', lastMessage: 'Mein Laptop verbindet sich nicht mit dem Internet',lastTime: '14:22'},
    { id: 3, request_id: 3, title: 'Email-Einrichtung', user: 'Anna Weber', lastMessage: 'Kannst du mir morgen helfen?',  lastTime: '10:33'},
    { id: 2, request_id: 2, title: 'Smartphone Bedienung', user: 'Hans Müller', lastMessage: 'Vielen Dank für deine Hilfe!', lastTime: 'Gestern' },
];

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
                <Helfer_Back_Home user_id={user_id} />
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
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                    transform: 'translateY(-2px)',
                                    backgroundColor: '#fafafa'
                                },
                                boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
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
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 0.5}}>
                                        {chat.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                                        {chat.user}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#999', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {chat.lastMessage}
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right'}}>
                                    <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 1 }}>
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