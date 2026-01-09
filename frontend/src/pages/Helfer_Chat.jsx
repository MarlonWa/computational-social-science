import { Link, useParams } from "react-router-dom";
import { Box, Paper, TextField, IconButton, Stack, Avatar, Chip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { Header } from '../component/Header.jsx'
import { Footer } from "../component/Footer.jsx";

const chat_title = "Wifi Setup Help";

const messages = [
    { id: 1, sender: 'Person A', text: 'Hey, how are you?', timestamp: '10:30', avatar: '🧑' },
    { id: 2, sender: 'Person B', text: 'I\'m doing great! How about you?', timestamp: '10:31', avatar: '👵' },
    { id: 3, sender: 'Person A', text: 'All good! Working on the project', timestamp: '10:32', avatar: '🧑' },
    { id: 4, sender: 'Person B', text: 'Nice! Let me know if you need help', timestamp: '10:33', avatar: '👵' },
];

const accentColor = '#9759d1ff';
/* const accentColor = '#5b8cc4'; */

export function Helfer_Chat() {
    const { user_id, request_id } = useParams();
    const [input, setInput] = useState('');
    const [chat, setChat] = useState(messages);

    const handleSendMessage = () => {
        if (input.trim()) {
            const newMessage = {
                id: chat.length + 1,
                sender: 'Person A',
                text: input,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                avatar: '🧑'
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

            <Header header_title={"Chat"} />

            <Box sx={{
                flex: 1,
                p: 3,
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
                    gap: 2
                }}>

                    {/* Header */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 2,
                        p: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                        flexShrink: 0
                    }}>
                        <Box>
                            <h2 style={{ margin: 0, color: '#333' }}>{chat_title}</h2>
                            <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#888', textAlign: 'left' }}>RequestID #{request_id}</p>
                        </Box>
                        <IconButton
                            component={Link}
                            to={`/helfer/${user_id}/myrequest/${request_id}`}
                            sx={{ color: '#666' }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
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
                                    justifyContent: msg.sender === 'Person A' ? 'flex-end' : 'flex-start',
                                    alignItems: 'flex-end',
                                    gap: 1
                                }}>
                                    {msg.sender === 'Person B' && (
                                        <Avatar sx={{ bgcolor: '#e0e0e0', color: '#333', fontSize: '1.5rem' }}>
                                            {msg.avatar}
                                        </Avatar>
                                    )}
                                    <Paper
                                        sx={{
                                            p: 2,
                                            maxWidth: '60%',
                                            background: msg.sender === 'Person A'
                                                ? accentColor
                                                : '#f0f0f0',
                                            color: msg.sender === 'Person A' ? 'white' : '#333',
                                            borderRadius: msg.sender === 'Person A' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                            boxShadow: '0 3px 9px rgba(0,0,0,0.18)'
                                        }}
                                    >
                                        <Box sx={{ fontWeight: '500', mb: 0.5 }}>
                                            {msg.sender}
                                        </Box>
                                        <Box sx={{ fontSize: '1rem', lineHeight: 1.5 }}>
                                            {msg.text}
                                        </Box>
                                        <Chip
                                            label={msg.timestamp}
                                            size="small"
                                            sx={{
                                                mt: 1,
                                                fontSize: '0.75rem',
                                                backgroundColor: msg.sender === 'Person A' ? 'rgba(255,255,255,0.2)' : '#e0e0e0',
                                                color: msg.sender === 'Person A' ? 'white' : '#666'
                                            }}
                                        />
                                    </Paper>
                                    {msg.sender === 'Person A' && (
                                        <Avatar sx={{ bgcolor: '#e0e0e0', color: '#333', fontSize: '1.5rem' }}>
                                            {msg.avatar}
                                        </Avatar>
                                    )}
                                </Box>
                            ))}
                        </Stack>
                    </Paper>

                    {/* Input Area */}
                    <Paper sx={{
                        p: 2,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                        flexShrink: 0
                    }}>
                        <Stack direction="row" spacing={1} alignItems="flex-end">
                            <TextField
                                fullWidth
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                multiline
                                minRows={1}
                                maxRows={6}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '20px',
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
                                <SendIcon />
                            </IconButton>
                        </Stack>
                    </Paper>
                </Stack>
            </Box>

            <Footer />
        </Box>
    );
}











/* <Header header_title={"Chat"}/>
<h3> Chat (Helfer) </h3>
<p> blib blub, bla bla :D </p>
<Link to={`/helfer/${user_id}/myrequest/${request_id}`}> Zurück zur Anfrage </Link>
<br />
<Link to={`/helfer/${user_id}/chats`}> Zurück zur Chatübersicht </Link>
<br />
<Link to={`/helfer/${user_id}/requests`}> Zurück zu meinen Requests </Link> */