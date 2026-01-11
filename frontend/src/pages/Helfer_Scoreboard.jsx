import Constants from '../constants/constants.js';
import { Link } from 'react-router-dom'
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
    // const [name, setName] = useState("");
    const [error, setError] = useState(null);

    const back_links = [
        { name: 'Meine Startseite', path: `/helfer/${user_id}` },
        { name: 'Meine Requests', path: `/helfer/${user_id}/myrequests` },
        { name: 'Meine Chats', path: `/helfer/${user_id}/chats` }
    ]

    useEffect(() => {
        fetch(Constants.API_URL + `/user/${user_id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("User nicht gefunden");
                }
                return res.json();
            })
            .then((data) => {
                setPoints(data.points);
                // setName(data.name);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [user_id]);

    useEffect(() => {
        fetch(Constants.API_URL + `/scoreboard/${user_id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("User nicht gefunden");
                }
                return res.json();
            })
            .then((data) => {
                setPoints1(data.first);
                setPoints2(data.second);
                setPoints3(data.third);
                setRank(data.user_rank);
            })
            .catch((err) => {
                setError(err.message);
            });
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
            <Header header_title={"SCOREBOARD"} additional_links={back_links} />
            <p> Der Top 1 User hat aktuell {points1} Punkte! </p>
            <p> Der Top 2 User hat aktuell {points2} Punkte! </p>
            <p> Der Top 3 User hat aktuell {points3} Punkte! </p>
            <h4> Du hast {points} Punkte und liegst damit auf Platz {rank}. </h4>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Helfer_Back_Home user_id={user_id} />
            </Box>
        </>
    );
}
