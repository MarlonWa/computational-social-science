import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from '../component/Header.jsx';

export default function Scoreboard_Helfer() {  // DONE FOR NOW :)
    const { user_id } = useParams();
    const [points, setPoints] = useState(0);
    const [points1, setPoints1] = useState(0);
    const [points2, setPoints2] = useState(0);
    const [points3, setPoints3] = useState(0);
    const [rank, setRank] = useState(0);
    // const [name, setName] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/user/${user_id}`)
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
        fetch(`http://localhost:8000/scoreboard/${user_id}`)
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

    if (error) return <p>{error}</p>;


    return (
        <>
            <p> </p>
            <Header header_title={"SCOREBOARD"}/>
            <p> Der Top 1 User hat aktuell {points1} Punkte! </p>
            <p> Der Top 2 User hat aktuell {points2} Punkte! </p>
            <p> Der Top 3 User hat aktuell {points3} Punkte! </p>
            <h4> Du hast {points} Punkte und liegst damit auf Platz {rank}. </h4>
        </>      
    );
}
