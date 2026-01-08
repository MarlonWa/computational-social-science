import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function Helfer_Requests_Assigned() {
    const { user_id } = useParams();
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/helper/${user_id}/requests`)
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



    if (error) return <><Header header_title={"AKTIVE ANFRAGEN: FEHLER"}/> <p> Error: {error} </p> </>;

    return (
        <>
            <Header header_title={"Deine aktuellen Anfragen"}/>
            
            <h3> Deine aktuellen Anfragen </h3>
            {requests.map((request_id) => (
                <>
                <Link key={request_id} to={`/helfer/${user_id}/myrequest/${request_id}`}> Anfrage {request_id} </Link>
                <br />
                </>
            ))}{
            /*<Link to="/helfer/:user_id/myrequest/1"> Anfrage 1 </Link>
            <br />
            <Link to="/helfer/:user_id/myrequest/2"> Anfrage 2 </Link> */}
            <br />
            <Link to={`/helfer/${user_id}`}> Zurück zu meiner Startseite </Link>
            <br />
            <p> Hier sollen Helfer auf ihre Anfragen zugreifen können, die sie aktuell bearbeiten.</p>
        </>
    );
}