import Constants from '../constants/constants.js';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from '../component/Header.jsx';
import { Alert, Box } from '@mui/material';
import { Helfer_Back_Home } from '../component/Helfer_Back_Home.jsx';

export function Helfer_Scoreboard() {  // DONE FOR NOW :)
    const { user_id } = useParams();
    const [points, setPoints] = useState(0);
    const [points1, setPoints1] = useState(0);
    const [points2, setPoints2] = useState(0);
    const [points3, setPoints3] = useState(0);
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
            .then((data) => setPoints(data.points))
            .catch((err) => setError(err.message));
    }, [user_id]);

    useEffect(() => {
        fetch(Constants.API_URL + `/scoreboard/${user_id}`)
            .then((res) => {
                if (!res.ok) throw new Error("User nicht gefunden");
                return res.json();
            })
            .then((data) => {
                setPoints1(data.top1);
                setPoints2(data.top2);
                setPoints3(data.top3);
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

    return (
        <>
            <Header header_title={"Scoreboard"} additional_links={back_links} />
            <Box sx={{ p: { xs: 1, sm: 2 }, maxWidth: 600, mx: 'auto' }}>
                <Box sx={{ mb: 4, p: 2, bgcolor: Constants.primary_color_light, borderRadius: 2 }}>
                    <Box component="h2" sx={{ textAlign: 'center', mb: 2, fontSize: { xs: '1.1rem', sm: '1.9rem' }, fontWeight: '600' }}>Top 3 Rankings</Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ p: 0.5, bgcolor: Constants.primary_color_very_light, borderRadius: 1 }}>
                            <Box component="p" sx={{ fontSize: { xs: '1rem', sm: '1.7rem' } }}><strong>🥇 Top 1:</strong> {points1} Punkte</Box>
                        </Box>
                        <Box sx={{ p: 0.5, bgcolor: Constants.primary_color_very_light, borderRadius: 1 }}>
                            <Box component="p" sx={{ fontSize: { xs: '1rem', sm: '1.7rem' } }}><strong>🥈 Top 2:</strong> {points2} Punkte</Box>
                        </Box>
                        <Box sx={{ p: 0.5, bgcolor: Constants.primary_color_very_light, borderRadius: 1 }}>
                            <Box component="p" sx={{ fontSize: { xs: '1rem', sm: '1.7rem' } }}><strong>🥉 Top 3:</strong> {points3} Punkte</Box>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ p: 2, backgroundColor: Constants.primary_color_very_light, borderRadius: 2, mb: 3, textAlign: 'center' }}>
                    <Box component="h2" sx={{ fontSize: { xs: '1.1rem', sm: '1.8rem' }, mb: 1 }}>Du hast {points} Punkte!</Box>
                    <Box component="h1" sx={{ fontSize: { xs: '1.4rem', sm: '2.1rem' }, fontWeight: '600', mb: 2 }}>Platz {rank}</Box>
                    {rank === 1 && <Box component="p" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1.4rem' } }}>WOW! Du bist der Top User! Weiter so!</Box>}
                    {(rank === 2 || rank === 3) && <Box component="p" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1.4rem' } }}>Glückwunsch! Du bist unter den Top 3 Usern!</Box>}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Helfer_Back_Home user_id={user_id} />
                </Box>
            </Box>
        </>
    );
}
