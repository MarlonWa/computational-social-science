import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from "react-router-dom";

export function Helfer_Chats_All() {
    const { user_id } = useParams();
    return (
        <>
            <Header header_title={"Alle Chats"}/>
            <h3> Meine aktuellen Chats und ungelesene Nachrichten (Helfer) </h3>
            <Link to={`/helfer/${user_id}/myrequest/1/chat`}> DEV: Zum Chat mit Hilfe-Suchendem in Anfrage 1 </Link>
            <br />
            <Link to={`/helfer/${user_id}/myrequests`}> Zurück zu meinen Anfragen </Link>
            <br />
            <Link to={`/helfer/${user_id}`}> Zurück zu meiner Startseite </Link>
            <br />
            <p> Hier sehen Helfer alle ihre Chats. </p>
        </>
    );
}