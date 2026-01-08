import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'

export function Anfrageansicht_Helfer() {
    return (
        <>
            <h3> eine bestimmte Anfrage hier, noch nicht in Bearbeitung</h3>
            <Link to="/helfer/:user_id/requests">zurück zu allen Anfragen</Link>
            <br />
            <p> Hier ist die Detailansicht einer Anfrage, die noch nicht in Bearbeitung von diesem Helfer ist. Auf diese kommt man von der Suchen/Filter Seite. </p>
        </>
    );
}