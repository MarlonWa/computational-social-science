import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Scoreboard_Helfer() {
    const { user_id } = useParams();
    const [points, setPoints] = useState(0);
    const [error, setError] = useState(null);
    const points1 = 150; //points of top 1 user - hardcoded for now
    const points2 = 120; //points of top 2 user - hardcoded for now
    const points3 = 100; //points of top 3 user - hardcoded for now
    const rank = 5; //hardcoded rank for now

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
        })
        .catch((err) => {
            setError(err.message);
        });
    }, [user_id]);

    if (error) return <p>{error}</p>;


    return (
        <>
            <h1> Scoreboard </h1>
            <Link to="/"> Home </Link>
            <p> Der Top 1 User hat aktuell {points1} Punkte! </p>
            <p> Der Top 2 User hat aktuell {points2} Punkte! </p>
            <p> Der Top 3 User hat aktuell {points3} Punkte! </p>
            <h3> Du hast {points} Punkte und liegst damit auf Platz {rank}. </h3>
        </>
    );
}