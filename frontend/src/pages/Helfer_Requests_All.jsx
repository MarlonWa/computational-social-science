import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

export function Helfer_Requests_All() {
    const { user_id } = useParams();
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/requests/open`)
        .then((res) => {
            if (!res.ok) {
            throw new Error("Keine Anfragen gefunden");
            }
            return res.json();
        })
        .then((data) => {
            setRequests(data);
        })
        .catch((err) => {
            setError(err.message);
        });
    }, [user_id]);


    if (error) return <><Header header_title={"STARTSEITE: FEHLER"}/> <p> Error: {error} </p> </>;
    
    
    return (
        <>
            <Header header_title={"Offene Anfragen"}/>
            <h3> Alle Anfragen </h3>
            {requests.map((request) => (
                <> key={request.request_id}
                    <p>{request.title}</p> 
                    </>))}
            <br />
            <Link to={`/helfer/${user_id}/`}> Zurück zu meiner Startseite </Link>
            <br />
            <p> Hier sind alle offenen Anfragen, Helfer können da draufdrücken und eine annehmen. </p>
        </>
    );
}