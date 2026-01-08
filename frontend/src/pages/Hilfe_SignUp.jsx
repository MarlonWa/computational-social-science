import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'

export function Hilfe_SignUp() {
    return (
        <>
            <Header />
            <h1> Signup für Hilfesuchende </h1>
            <Link to="/hilfe/login"> Zurück zum Login </Link>
            <br />
            <Link to="/"> Zurück zum Home </Link>
            <br />
            <p> Hier können Suchende ein Konto erstellen. Da müssen sie halt alles eingeben was in die Datenbank soll, Passwort und mail und idk</p>
        </>
    );
}