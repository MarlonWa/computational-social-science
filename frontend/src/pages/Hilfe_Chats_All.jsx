import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'

export function Hilfe_Chats_All() {
    return (
        <>
            <Header />
            <h1> Meine aktuellen Chats und ungelesene Nachrichten (Hilfe) </h1>
            <Link to="/hilfe/3/myrequest/3/chat"> Zum Chat mit Helfer in Anfrage 3 </Link>
            <br />
            <Link to="/hilfe/3"> Zurück zu meiner Startseite </Link>
            <br />
            <p> Hier sehen Hilfesuchende alle ihre Chats. </p>
        </>
    );
}