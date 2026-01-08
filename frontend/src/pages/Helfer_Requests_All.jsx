import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from "react-router-dom";

export function Helfer_Requests_All() {
    const { user_id } = useParams();
    return (
        <>
            <Header />
            <h3> Alle Anfragen </h3>
            <Link to={`/helfer/${user_id}/request/1`}> Anfrage 1 </Link>
            <br />
            <Link to={`/helfer/${user_id}/request/2`}> Anfrage 2 </Link>
            <br />
            <Link to={`/helfer/${user_id}/`}> Zurück zu meiner Startseite </Link>
            <br />
            <p> Hier sind alle offenen Anfragen, Helfer können da draufdrücken und eine annehmen. </p>
        </>
    );
}