import Constants from '../constants/constants.js';
import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from "react-router-dom";
import { Box, Paper, Stack, Typography } from '@mui/material';
import { Footer } from "../component/Footer.jsx";
import { Hilfe_Back_Home } from '../component/Hilfe_Back_Home.jsx';

//TODO HARDCODED - rm
const chats = [
    { id: 1, request_id: 1, title: 'Laptopinternet Einrichtug', user: 'Maria Schmidt', lastMessage: 'Mein Laptpp verbindet sicnicht mit dem Intrrnet',lastTime: '14:22'},
    { id: 3, request_id: 3, title: 'Email Einrivhtung', user: 'Anna Weber', lastMessage: 'Kannstdu mir morgen hrlfen?',  lastTime: '10:33'},
    { id: 2, request_id: 2, title: 'Smartphone Bedienung', user: 'Hans Müller', lastMessage: 'Vielen Dank für deine Hilfe!', lastTime: 'Gestern' },
]; //added some typos so we can have a laugh :>

export function Hilfe_Chats_All() {
    const { user_id } = useParams();

    const back_links = [
        { name: 'Meine Startseite', path: `/hilfe/${user_id}` },
    ];

    return (
        <Box sx={{ height: "100vh", display: 'flex', flexDirection: 'column' }}>
            <Header header_title={"Meine Chats"} additional_links={back_links} />

            <Box sx={{ flex: 1, px: { xs: 2, sm: 3 }, pt: { xs: 2, sm: 3 }, pb: 2, overflow: 'auto' }}>
                <Stack sx={{ maxWidth: '900px', width: '100%', gap: { xs: 3, sm: 2 }, mx: 'auto' }}>
                <Hilfe_Back_Home user_id={user_id} />
                    {chats.map((chat) => (
                        <Paper
                            key={chat.id}
                            component={Link}
                            to={`/hilfe/${user_id}/request/${chat.request_id}/chat`}
                            sx={{
                                p: { xs: 3, sm: 3 },
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 8px 16px ' + Constants.shadow_black,
                                    transform: 'translateY(-2px)',
                                    backgroundColor: Constants.neutral_light_darker
                                },
                                boxShadow: '0 4px 12px ' + Constants.shadow_black,
                                borderRadius: 2,
                                minHeight: { xs: '120px', sm: '100px' }
                            }}
                        >
                            <Box sx={{
                                display: 'grid',
                                gap: { xs: 1.5, sm: 2 },
                                alignItems: 'center',
                                gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr' },
                            }}>
                                <Box sx={{ display: { xs: 'none', sm: 'block' }}}/>
                                <Box sx={{ minWidth: 0}}>
                                    <Typography variant="h5" sx={{ fontWeight: 600, color: Constants.text_color_black, mb: 1, fontSize: { xs: '1.8rem', sm: '2.0rem' }}}>
                                        {chat.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: Constants.text_color_dark_grey, mb: 1, fontSize: { xs: '1.4rem', sm: '1.6rem' } }}>
                                        {chat.user}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: Constants.neutral_medium, whiteSpace: { xs: 'normal', sm: 'nowrap' }, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: { xs: '1.3rem', sm: '1.5rem' } }}>
                                        {chat.lastMessage}
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: { xs: 'left', sm: 'right'}, mt: { xs: 1, sm: 0 }}}>
                                    <Typography variant="body2" sx={{ color: Constants.neutral_medium, display: 'block', fontSize: { xs: '1.0rem', sm: '1.1rem' } }}>
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