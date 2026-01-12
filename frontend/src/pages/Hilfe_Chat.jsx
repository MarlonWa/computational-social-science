import Constants from '../constants/constants.js';
import { Link, useParams } from "react-router-dom";
import { Box, Paper, TextField, IconButton, Stack, Chip, Typography, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { Header } from '../component/Header.jsx'
import { Footer } from "../component/Footer.jsx";

// Hardcoded - incase no Chat DB gonna get setup anymore
const chat_title = "Facebook gelöscht";

const messages = [
    { id: 1, sender: 'Du', text: 'Hallo,. ich bruche Hilfe mit meinem Interrnt', timestamp: '10:31' },
    { id: 2, sender: 'Helfer', text: 'Gerne! Lass mich dir helfen. Was ist das Problem?', timestamp: '10:32' },
    { id: 3, sender: 'Du', text: 'Meinlaptop verbindet sich  nicgt mit dem Internet', timestamp: '10:33' },
]; //added some typos, because elderly people sometimes dont type perfectly

export function Hilfe_Chat() {
    const { user_id, request_id } = useParams();
    const [input, setInput] = useState('');
    const [chat, setChat] = useState(messages);

    const back_links = [
        { name: 'Meine Startseite', path: `/hilfe/${user_id}` },
    ]

    const handleSendMessage = () => {
        if (input.trim()) {
            const newMessage = {
                id: chat.length + 1,
                sender: 'Du',
                text: input,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setChat([...chat, newMessage]);
            setInput('');
        }
    };

    return (
        <Box sx={{
            height: "100vh",
            display: 'flex',
            flexDirection: 'column',
        }}>

            <Header header_title={"Chat"} additional_links={back_links} />

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

                    {/* Chat Titel - big*/}
                    <Box sx={{
                        display: { xs: "none", md: 'flex' },
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        alignItems: "center",
                        backgroundColor: Constants.neutral_light,
                        borderRadius: 2,
                        p: 2,
                        boxShadow: '0 4px 12px ' + Constants.shadow_black,
                        flexShrink: 0,
                        gap: 0
                    }}>
                        <Button
                            component={Link}
                            to={`/hilfe/${user_id}/chats`}
                            variant="outlined"
                            size="large"

                            sx={{
                                alignSelf: 'center',
                                fontSize: "1rem",
                                fontWeight: '600',
                                color: Constants.secondary_color_text,
                                backgroundColor: Constants.secondary_color_very_light,
                                border: 'none',
                                ":hover": {
                                    backgroundColor: Constants.secondary_color_light,
                                    transform: 'translateX(-4px)',
                                    color: Constants.secondary_color_text,
                                }
                            }}
                        >
                            ← Zu meinen Chats
                        </Button>

                        <Typography alignSelf='center' variant="h2" color={Constants.text_color_dark_grey} sx={{ fontSize: '1.5rem', fontWeight: '600' }}>
                            - {chat_title} -
                        </Typography>

                        <Button
                            component={Link}
                            to={`/hilfe/${user_id}/request/${request_id}`}
                            variant="outlined"
                            size="large"

                            sx={{
                                alignSelf: 'center',
                                fontSize: "1rem",
                                fontWeight: '600',
                                color: Constants.secondary_color_text,
                                backgroundColor: Constants.secondary_color_very_light,
                                border: 'none',
                                ":hover": {
                                    backgroundColor: Constants.secondary_color_light,
                                    transform: 'translateX(4px)',
                                    color: Constants.secondary_color_text,
                                }
                            }}
                        >
                            Zur Anfrage →
                        </Button>

                    </Box>

                    {/* Chat Titel - xs*/}
                    <Box sx={{
                        display: { xs: "flex", md: 'none' },
                        flexDirection: "column",
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        backgroundColor: Constants.neutral_light,
                        borderRadius: 2,
                        p: 1.5,
                        boxShadow: '0 4px 12px ' + Constants.shadow_black,
                        flexShrink: 0,
                        gap: 1
                    }}>
                        <Typography alignSelf='center' variant="h2" color={Constants.text_color_dark_grey} sx={{ py:1, fontSize: '1.5rem', fontWeight: '600' }}>
                            - {chat_title} -
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>

                            <Button
                                component={Link}
                                to={`/hilfe/${user_id}/chats`}
                                variant="outlined"
                                size="small"

                                sx={{
                                    alignSelf: 'center',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    color: Constants.secondary_color_text,
                                    backgroundColor: Constants.secondary_color_very_light,
                                    border: 'none',
                                    ":hover": {
                                        backgroundColor: Constants.secondary_color_light,
                                        color: Constants.secondary_color_text,
                                    }
                                }}
                            >
                                ← Zu meinen Chats
                            </Button>


                            <Button
                                component={Link}
                                to={`/hilfe/${user_id}/request/${request_id}`}
                                variant="outlined"
                                size="small"

                                sx={{
                                    alignSelf: 'center',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    color: Constants.secondary_color_text,
                                    backgroundColor: Constants.secondary_color_very_light,
                                    border: 'none',
                                    ":hover": {
                                        backgroundColor: Constants.secondary_color_light,
                                        color: Constants.secondary_color_text,
                                    }
                                }}
                            >
                                Zur Anfrage →
                            </Button>
                        </Box>

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
                            {chat.map((msg) => (
                                <Box key={msg.id} sx={{
                                    display: 'flex',
                                    justifyContent: msg.sender === 'Du' ? 'flex-end' : 'flex-start',
                                    alignItems: 'flex-end',
                                    gap: 0.5
                                }}>
                                    <Paper
                                        sx={{
                                            p: { xs: 1.5, sm: 2 },
                                            maxWidth: { xs: '85%', sm: '60%' },
                                            background: msg.sender === 'Du'
                                                ? Constants.primary_color
                                                : Constants.neutral_light,
                                            color: msg.sender === 'Du' ? Constants.neutral_light : Constants.text_color_dark_grey,
                                            borderRadius: msg.sender === 'Du' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                            boxShadow: '0 3px 9px ' + Constants.shadow_black
                                        }}
                                    >
                                        <Box sx={{ fontWeight: '500', mb: 0.5, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                                            {msg.sender}
                                        </Box>
                                        <Box sx={{ fontSize: { xs: '0.95rem', sm: '1rem' }, lineHeight: 1.5 }}>
                                            {msg.text}
                                        </Box>
                                        <Chip
                                            label={msg.timestamp}
                                            size="small"
                                            sx={{
                                                mt: 1,
                                                fontSize: '0.7rem',
                                                backgroundColor: msg.sender === 'Du' ? Constants.primary_color_light : Constants.neutral_light_darker,
                                                color: msg.sender === 'Du' ? Constants.neutral_light : Constants.neutral_medium,
                                                height: 'auto'
                                            }}
                                        />
                                    </Paper>
                                </Box>
                            ))}
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
                            <Button
                                onClick={() => handleSendMessage()}
                                variant="contained"
                                sx={{
                                    borderRadius: '20px',
                                    background: Constants.primary_color,
                                    color: 'white',
                                    px: 3,
                                    py: 1,
                                    minWidth: 'auto',
                                    '&:hover': {
                                        background: Constants.primary_color_dark
                                    }
                                }}
                            >
                                Senden
                            </Button>
                        </Stack>
                    </Paper>‚
                </Stack>
            </Box>

            <Footer />
        </Box>
    );
}

/* <>
            <Header header_title={"Chat"}/>
            <h1> Chat (Hilfe) </h1>
            <p> blib blub, bla bla :D </p>
            <Link to={`/hilfe/${user_id}/request/${request_id}`}> Zurück zur Anfrage </Link>
            <br />
            <Link to={`/hilfe/${user_id}/chats`}> Zurück zur Chatübersicht </Link>
            <br />  
            <Link to={`/hilfe/${user_id}`}> Zurück zu meiner Startseite </Link>
        </> */