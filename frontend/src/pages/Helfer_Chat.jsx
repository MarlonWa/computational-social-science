import { Link, useParams } from "react-router-dom";
import { Box, Paper, TextField, IconButton, Stack, Chip, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { Header } from '../component/Header.jsx'
import { Footer } from "../component/Footer.jsx";

const chat_title = "Laptop Internet-Einrichtung";

const messages = [
    { id: 1, sender: 'Anfragende', text: 'Hallo, ich brauche Hilfe mit meinem Internet', timestamp: '10:31'},
    { id: 2, sender: 'Du', text: 'Gerne! Lass mich dir helfen. Was ist das Problem?', timestamp: '10:32'},
    { id: 3, sender: 'Anfragende', text: 'Mein Laptop verbindet sich nicht mit dem Internet :(', timestamp: '10:33'},
];

const accentColor = '#9759d1ff';

export function Helfer_Chat() {
    const { user_id, request_id } = useParams();
    const [input, setInput] = useState('');
    const [chat, setChat] = useState(messages);

    const back_links = [
        { name: 'Meine Startseite', path: `/helfer/${user_id}` },
        { name: 'Meine Requests', path: `/helfer/${user_id}/myrequests` },
        { name: 'Meine Chats', path: `/helfer/${user_id}/chats` }
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

                    {/* Chat Titel */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        backgroundColor: 'white',
                        borderRadius: 2,
                        p: { xs: 1.5, sm: 2 },
                        boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                        flexShrink: 0,
                        gap: { xs: 1, sm: 0 }
                    }}>
                        <Box>
                            <h2 style={{ margin: 0, color: '#333', fontSize: 'clamp(1.2rem, 5vw, 1.5rem)' }}>{chat_title}</h2>
                            <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#888', textAlign: 'left' }}>RequestID #{request_id}</p>
                        </Box>
                        <Typography variant="p" color="#666" component={Link} to={`/helfer/${user_id}/myrequest/${request_id}`} sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                            ← Zur Anfrage
                        </Typography>
                    </Box>

                    {/* Messages Container */}
                    <Paper sx={{
                        flex: 1,
                        overflow: 'auto',
                        p: 3,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                        minHeight: 0,
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f0f0f0',
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#c0c0c0',
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
                                                ? accentColor
                                                : '#f0f0f0',
                                            color: msg.sender === 'Du' ? 'white' : '#333',
                                            borderRadius: msg.sender === 'Du' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                            boxShadow: '0 3px 9px rgba(0,0,0,0.18)'
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
                                                backgroundColor: msg.sender === 'Du' ? 'rgba(255,255,255,0.2)' : '#e0e0e0',
                                                color: msg.sender === 'Du' ? 'white' : '#666',
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
                        boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
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
                                            borderColor: accentColor,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: accentColor,
                                        }
                                    }
                                }}
                            />
                            <IconButton
                                onClick={() => handleSendMessage()}
                                sx={{
                                    background: accentColor,
                                    color: 'white',
                                    '&:hover': {
                                        background: '#4a7ab2'
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
