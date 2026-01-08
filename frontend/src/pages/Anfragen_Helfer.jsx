import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'

export function Anfragen_Helfer() {
    return (
        <>
            <Header />
            <h3> Alle Anfragen </h3>
            <Link to="/helfer/1/request/1"> Anfrage 1 </Link>
            <br />
            <Link to="/helfer/2/request/2"> Anfrage 2 </Link>
            <br />
            <Link to="/helfer/1/"> Zurück zu meiner Startseite </Link>
            <br />
            <p> Hier sind alle offenen Anfragen, Helfer können da draufdrücken und eine annehmen. </p>
        </>
    );
}