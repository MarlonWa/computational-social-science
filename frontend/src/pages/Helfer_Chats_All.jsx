import Constants from '../constants/constants.js';
import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from "react-router-dom";
import { Box, Paper, Stack, Typography, Badge, Chip } from '@mui/material';
import { Footer } from "../component/Footer.jsx";
import { Helfer_Back_Home } from '../component/Helfer_Back_Home.jsx';
import React, { useEffect, useState } from 'react';
import * as ChatServices from '../service/ChatServics.js';

export function Helfer_Chats_All() {
    const { user_id } = useParams();
    const [chats, setChats] = useState([]);
    const [alert, setAlert] = useState('');

    const back_links = [
        { name: 'Meine Startseite', path: `/helfer/${user_id}` },
        { name: 'Meine Requests', path: `/helfer/${user_id}/myrequests` },
        { name: 'Meine Chats', path: `/helfer/${user_id}/chats` },
    ];

    const reload = async () => {
        const fetched_chats = await ChatServices.getChats(user_id);

        if (fetched_chats.length > 0) {
            setChats(fetched_chats);
            setAlert('');
        }
        else if (fetched_chats === 408) {
            setAlert('Die Antwort des Servers hat zu lange gedauert. Bitte versuchen Sie es erneut.');
        }
        else {
            setAlert('Fehler beim Laden der Chats. Bitte versuchen Sie es erneut.');
        }
    };

    useEffect(() => {
            reload();
        }, [user_id]);

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
                                        Du schreibst mit: {chat.other}
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