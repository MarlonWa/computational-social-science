import Constants from '../constants/constants.js';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from '../component/Header.jsx';
import { Footer } from '../component/Footer.jsx';
import { Alert, Box } from '@mui/material';
import { Helfer_Back_Home } from '../component/Helfer_Back_Home.jsx';

export function Helfer_Scoreboard() {  // DONE FOR NOW :)
    const { user_id } = useParams();
    const [thisUser, setUser] = useState({ "points": 0 });
    const [top1, setTop1] = useState(0);
    const [top2, setTop2] = useState(0);
    const [top3, setTop3] = useState(0);
    const [rank, setRank] = useState(0);
    const [error, setError] = useState(null);

    const back_links = [
        { name: 'Meine Startseite', path: `/helfer/${user_id}` },
        { name: 'Meine Requests', path: `/helfer/${user_id}/myrequests` },
        { name: 'Meine Chats', path: `/helfer/${user_id}/chats` }
    ]

    useEffect(() => {
        fetch(Constants.API_URL + `/user/${user_id}`)
            .then((res) => {
                if (!res.ok) throw new Error("User nicht gefunden");
                return res.json();
            })
            .then((data) => {
                setUser(data)
            })
            .catch((err) => setError(err.message));
    }, [user_id]);

    useEffect(() => {
        fetch(Constants.API_URL + `/scoreboard/${user_id}`)
            .then((res) => {
                if (!res.ok) throw new Error("User nicht gefunden");
                return res.json();
            })
            .then((data) => {
                setTop1(data.top1);
                setTop2(data.top2);
                setTop3(data.top3);
                setRank(data.user_rank);
            })
            .catch((err) => setError(err.message));
    }, [user_id]);

    if (error) return (
        <>
            <Header header_title={"Scoreboard"} additional_links={back_links} />
            <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Helfer_Back_Home user_id={user_id} />
            </Box>
        </>
    );

    const rankingItemSx = {
        p: 0.5,
        bgcolor: Constants.primary_color_very_light,
        borderRadius: 1,
    };

    const textSx = {
        fontSize: { xs: '1rem', sm: '1.5rem' },
    };

    return (
        <>
            <Box
                height="100vh"
                sx={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    display: 'flex',
                }}
            >
                <Header header_title="Scoreboard" additional_links={back_links} />
                <Box
                    sx={{
                        p: { xs: 1, sm: 1.5 },
                        flex: 1,
                        width: { xs: '90vw', sm: '40vw' },
                        maxWidth: 600,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        margin: '0 auto',
                        overflow: 'auto',
                    }}
                >
                    {/* Top 3 Rankings Section */}
                    <Box
                        sx={{
                            mb: { xs: 2, sm: 3 },
                            p: { xs: 2, sm: 1.5 },
                            bgcolor: Constants.primary_color_light,
                            borderRadius: 2,
                        }}
                    >
                        <Box
                            component="h2"
                            sx={{
                                textAlign: 'center',
                                mb: { xs: 2, sm: 1 },
                                fontSize: { xs: '1rem', sm: '1.3rem' },
                                fontWeight: '600',
                            }}
                        >
                            Top 3 Rankings
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0.75,
                            }}
                        >
                            <Box sx={rankingItemSx}>
                                <Box component="p" sx={textSx}>
                                    <strong>🥇 {top1.name}:</strong> {top1.points} Punkte
                                </Box>
                            </Box>
                            <Box sx={rankingItemSx}>
                                <Box component="p" sx={textSx}>
                                    <strong>🥈 {top2.name}:</strong> {top2.points} Punkte
                                </Box>
                            </Box>
                            <Box sx={rankingItemSx}>
                                <Box component="p" sx={textSx}>
                                    <strong>🥉 {top3.name}  :</strong> {top3.points} Punkte
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* User Stats Section */}
                    <Box
                        sx={{
                            p: { xs: 2, sm: 1.5 },
                            backgroundColor: Constants.primary_color_very_light,
                            borderRadius: 2,
                            mb: 2,
                            textAlign: 'center',
                        }}
                    >
                        <Box
                            component="h2"
                            sx={{
                                fontSize: { xs: '1rem', sm: '1.3rem' },
                                mb: 0.5,
                            }}
                        >
                            Du hast {thisUser?.points} Punkte!
                            <br />
                        </Box>
                        {thisUser?.points !== 0 && (
                        <Box
                            component="h1"
                            sx={{
                                fontSize: { xs: '1.3rem', sm: '1.8rem' },
                                fontWeight: '600',
                                mb: 1,
                            }}
                        >
                            Platz {rank}
                        </Box>
                        )}
                        {rank === 1 && (
                            <Box
                                component="p"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: { xs: '1rem', sm: '1.5rem' },
                                }}
                            >
                                WOW! Du bist der Top User! Weiter so!
                            </Box>
                        )}
                        {(rank === 2 || rank === 3) && (
                            <Box
                                component="p"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: { xs: '1rem', sm: '1.5rem' },
                                }}
                            >
                                Glückwunsch! Du bist unter den Top 3 Usern!
                            </Box>
                        )}
                    </Box>

                    {/* Back Home Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Helfer_Back_Home user_id={user_id} />
                    </Box>
                </Box>
                <Footer />
            </Box>
        </>
    );
}
