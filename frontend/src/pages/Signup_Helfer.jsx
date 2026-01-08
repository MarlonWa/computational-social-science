import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'

export function Signup_Helfer() {
    return (
        <>
            <Header />
            <h3> Signup für Helfer </h3>
            <Link to="/helfer/login"> Zurück zum Login </Link>
            <br />
            <Link to="/"> Zurück zum Home </Link>
            <br />
            <p> Hier können Helfer ein Konto erstellen. Da müssen sie halt alles eingeben was in die Datenbank soll, Passwort und mail und idk</p>
        </>
    );
}