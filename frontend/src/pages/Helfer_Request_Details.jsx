import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from "react-router-dom";

export function Helfer_Request_Details() {
    const { user_id } = useParams();
    //theoretisch gibts hier auch ne request_id in der url
    return (
        <>
            <Header />
            <h3> eine bestimmte Anfrage hier, noch nicht in Bearbeitung</h3>
            <Link to={`/helfer/${user_id}/requests`}>zurück zu allen Anfragen</Link>
            <br />
            <p> Hier ist die Detailansicht einer Anfrage, die noch nicht in Bearbeitung von diesem Helfer ist. Auf diese kommt man von der Suchen/Filter Seite. </p>
        </>
    );
}