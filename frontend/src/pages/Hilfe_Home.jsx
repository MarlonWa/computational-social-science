import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

export function Hilfe_Home() {
    const { user_id } = useParams();
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);

        useEffect(() => {
        fetch(`http://localhost:8000/user/${user_id}/requests`)
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
            <Header header_title={"Startseite"}/>
            <h3> Startseite eines Hilfesuchenden </h3>
            {requests.map((request) => ( <> {request.title} </>))}
            <br />
            <Link to={`/hilfe/${user_id}/request/3`}> Anfrage ID3 </Link>
            <br />
            <Link to={`/hilfe/${user_id}/new`}> NEUE ANFRAGE </Link>
            <br />
            <p> Hier kommen Hilfesuchende nach dem Login hin. Hier sehen sie ihre offenen Anfragen und können draufklicken. </p>
            <p> Außerdem ein großer Knopf um neue Anfragen zu erstellen </p>    
        </>
    );
}   