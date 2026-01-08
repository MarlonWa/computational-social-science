import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'

export function Chats_Helfer() {
    return (
        <>
            <Header />
            <h3> Meine aktuellen Chats und ungelesene Nachrichten (Helfer) </h3>
            <Link to="/helfer/1/myrequest/1/chat"> Zum Chat mit Hilfe-Suchendem in Anfrage 1 </Link>
            <br />
            <Link to="/helfer/1/myrequests"> Zurück zu meinen Anfragen </Link>
            <br />
            <Link to="/helfer/1"> Zurück zu meiner Startseite </Link>
            <br />
            <p> Hier sehen Helfer alle ihre Chats. </p>
        </>
    );
}