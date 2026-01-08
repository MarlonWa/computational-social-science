import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'

export function Aktive_Anfragen_Helfer() {
    return (
        <>
            <Header />
            <h3> Deine aktuellen Anfragen </h3>
            <Link to="/helfer/:user_id/myrequest/1"> Anfrage 1 </Link>
            <br />
            <Link to="/helfer/:user_id/myrequest/2"> Anfrage 2 </Link>
            <br />
            <Link to="/helfer/1/"> Zurück zu meiner Startseite </Link>
            <br />
            <p> Hier sollen Helfer auf ihre Anfragen zugreifen können, die sie aktuell bearbeiten.</p>
        </>
    );
}