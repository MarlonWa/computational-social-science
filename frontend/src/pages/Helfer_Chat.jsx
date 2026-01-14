import Constants from '../constants/constants.js';
import { Link, useParams } from "react-router-dom";
import { Box, Paper, TextField, IconButton, Stack, Chip, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState, useRef, useEffect } from 'react';
import { Header } from '../component/Header.jsx'
import { Footer } from "../component/Footer.jsx";
import * as ChatServices from '../service/ChatServics.js';
import Alert from '@mui/material/Alert';

export function Helfer_Chat() {
    const { user_id, request_id } = useParams();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [chat_title, setChatTitle] = useState('');
    const [alert, setAlert] = useState('');
    const [info, setInfo] = useState('');
    const [partner, setPartner] = useState('');
    const [latestMsgId, setLatestMsgId] = useState(null);
    const messagesEndRef = useRef(null);

    const back_links = [
        { name: 'Meine Startseite', path: `/helfer/${user_id}` },
        { name: 'Meine Requests', path: `/helfer/${user_id}/myrequests` },
    ]

    const handleSendMessage = async () => {
        if (input.trim()) {
            const status = await ChatServices.postMessage(request_id, user_id, input);
            if (status !== 201) {
                if (status === 404) {
                    setAlert('Die zum Chat zugehörige Anfrage wurde nicht gefunden. Bitte laden Sie die Seite neu.');
                    return;
                }
                else {
                    setAlert('Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.');
                    return;
                }
            }
            else {
                setInput('');
                await reload();
            }
        }
    };

    const load_msgs = async () => {
        const fetched_messages = await ChatServices.getMessages(request_id);

        if (fetched_messages.length > 0) {
            setMessages(fetched_messages);
            setLatestMsgId(fetched_messages[fetched_messages.length - 1].message_id);
            return 0;
        }
        else if (fetched_messages === 204) {
            setMessages([]);
            setInfo('Es sind noch keine Nachrichten in diesem Chat vorhanden. Senden Sie die erste Nachricht, um zu beginnen.');
            return 1;
        }
        else if (fetched_messages === 404) {
            setMessages([]);
            setAlert('Die zum Chat zugehörige Anfrage wurde nicht gefunden. Bitte laden Sie die Seite neu.');
            return 2;
        }
        else if (fetched_messages === 408) {
            setInfo('');
            setAlert('Die Antwort des Servers hat zu lange gedauert. Bitte versuchen Sie es erneut.');
            return 2;
        }
        else {
            setInfo('');
            setAlert('Fehler beim Laden der Nachrichten. Bitte versuchen Sie es erneut.');
            return 2;
        }
    }

    const reload = async () => {
        const code = await load_msgs();

        const fetched_title = await ChatServices.getTitle(request_id);

        if (typeof fetched_title === 'string' && fetched_title.trim() !== '') {
            setChatTitle(fetched_title);
            if (code === 0 && partner !== '') {
                setInfo('');
                setAlert('');
            }
        }
        else if (fetched_messages === 408) {
            setInfo('');
            setAlert('Die Antwort des Servers hat zu lange gedauert. Bitte versuchen Sie es erneut.');
        }
        else {
            setInfo('');
            setAlert('Fehler beim Laden der Anfrage. Bitte versuchen Sie es erneut.');
        }
    };

    const getPartnerName = async () => {
        const fetched_name = await ChatServices.getPartner(request_id, user_id);

        if (typeof fetched_name === 'string' && fetched_name.trim() !== '') {
            setPartner(fetched_name);
        }
        else if (fetched_name === 408) {
            setInfo('');
            setAlert('Die Antwort des Servers hat zu lange gedauert. Bitte versuchen Sie es erneut.');
        }
        else {
            setInfo('');
            setAlert('Fehler beim Laden des Chat-Partners. Bitte versuchen Sie es erneut.');
        }
    };

    useEffect(() => {
        getPartnerName();
        reload();
    }, [user_id, request_id]);

    useEffect(() => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 500);
    }, [latestMsgId, user_id, request_id]);

    useEffect(() => {
        const interval = setInterval(() => {
            reload();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{
            height: "100vh",
            display: 'flex',
            flexDirection: 'column',
        }}>

            <Header header_title={"Chat"} additional_links={back_links} />
            <Alert severity="error" sx={{ display: alert == '' ? 'none' : 'flex' }}>
                {alert}
            </Alert>
            <Alert severity="info" sx={{ display: info == '' ? 'none' : 'flex' }}>
                {info}
            </Alert>

            <Box sx={{
                flex: 1,
                px: { xs: 1, sm: 3 },
                pt: { xs: 1, sm: 3 },
                display: 'flex',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <Stack sx={{
                    width: '100%',
                    maxWidth: '900px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: 1, sm: 2 }
                }}>

                    {/* Chat Titel */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        backgroundColor: Constants.neutral_light,
                        borderRadius: 2,
                        p: { xs: 1.5, sm: 2 },
                        boxShadow: '0 4px 12px ' + Constants.shadow_black,
                        flexShrink: 0,
                        gap: { xs: 1, sm: 0 }
                    }}>
                        <Box sx={{
                            flexDirection: 'row',
                            display: 'flex',
                            alignItems: 'center',

                        }}>
                            <Box sx={{ flexDirection: "column" }}>
                                <h2 style={{ margin: 0, color: Constants.text_color_black, fontSize: 'clamp(1.2rem, 5vw, 1.5rem)' }}>{chat_title}</h2>

                                <Box sx={{ flexDirection: "row", display: "flex", justifyContent: "space-between", gap: 2 }}>
                                    <Typography variant="p" color={Constants.text_color_light_grey} sx={{ margin: '4px 0 0 0', fontSize: '0.8rem' }}>
                                        RequestID #{request_id}
                                    </Typography>
                                    <Typography variant="p" color={Constants.text_color_dark_grey} component={Link} to={`/helfer/${user_id}/myrequest/${request_id}`} sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                                        Zur Anfrage ↗
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Typography variant="p" color={Constants.text_color_dark_grey} component={Link} to={`/helfer/${user_id}/chats`} sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                            Zu meinen Chats →
                        </Typography>
                    </Box>

                    {/* Messages Container */}
                    <Paper sx={{
                        flex: 1,
                        overflow: 'auto',
                        p: 3,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        boxShadow: '0 4px 12px ' + Constants.shadow_black,
                        minHeight: 0,
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: Constants.neutral_light_darker,
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: Constants.neutral_light_darker,
                            borderRadius: '10px',
                        }
                    }}>
                        <Stack spacing={2}>
                            {messages.map((msg) => (
                                <Box key={msg.message_id} sx={{
                                    display: 'flex',
                                    justifyContent: msg.user_id == user_id ? 'flex-end' : 'flex-start',
                                    alignItems: 'flex-end',
                                    gap: 0.5
                                }}>
                                    <Paper
                                        sx={{
                                            p: { xs: 1.5, sm: 2 },
                                            maxWidth: { xs: '85%', sm: '60%' },
                                            background: msg.user_id == user_id
                                                ? Constants.primary_color
                                                : Constants.neutral_light,
                                            color: msg.user_id == user_id ? Constants.neutral_light : Constants.text_color_dark_grey,
                                            borderRadius: msg.user_id == user_id ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                            boxShadow: '0 3px 9px ' + Constants.shadow_black
                                        }}
                                    >
                                        <Box sx={{ fontWeight: '500', mb: 0.5, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                                            {msg.user_id == user_id ? 'Du' : partner}
                                        </Box>
                                        <Box sx={{ fontSize: { xs: '0.95rem', sm: '1rem' }, lineHeight: 1.5 }}>
                                            {msg.message_text}
                                        </Box>
                                        <Chip
                                            label={msg.date_time}
                                            size="small"
                                            sx={{
                                                mt: 1,
                                                fontSize: '0.7rem',
                                                backgroundColor: msg.user_id == user_id ? Constants.primary_color_light : Constants.neutral_light_darker,
                                                color: msg.user_id == user_id ? Constants.neutral_light : Constants.neutral_medium,
                                                height: 'auto'
                                            }}
                                        />
                                    </Paper>
                                </Box>
                            ))}
                            <div ref={messagesEndRef} />
                        </Stack>
                    </Paper>

                    {/* Input Area */}
                    <Paper sx={{
                        p: { xs: 1, sm: 2 },
                        backgroundColor: 'white',
                        borderRadius: 2,
                        boxShadow: '0 4px 12px ' + Constants.shadow_black,
                        flexShrink: 0
                    }}>
                        <Stack direction="row" spacing={0.5} alignItems="flex-end">
                            <TextField
                                fullWidth
                                placeholder="Nachricht..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                multiline
                                minRows={1}
                                maxRows={4}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '20px',
                                        fontSize: { xs: '0.9rem', sm: '1rem' },
                                        '&:hover fieldset': {
                                            borderColor: Constants.primary_color,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: Constants.primary_color,
                                        }
                                    }
                                }}
                            />
                            <IconButton
                                onClick={() => handleSendMessage()}
                                sx={{
                                    background: Constants.primary_color,
                                    color: 'white',
                                    '&:hover': {
                                        background: Constants.primary_color_dark
                                    }
                                }}
                            >
                                <SendIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                            </IconButton>
                        </Stack>
                    </Paper>‚
                </Stack>
            </Box>

            <Footer />
        </Box>
    );
}
