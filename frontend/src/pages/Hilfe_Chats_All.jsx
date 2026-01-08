import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from 'react-router-dom';

export function Hilfe_Chats_All() {
    const { user_id } = useParams();
    return (
        <>
            <Header header_title={"Deine Chats"}/>
            <h1> Meine aktuellen Chats und ungelesene Nachrichten (Hilfe) </h1>
            <Link to={`/hilfe/${user_id}/myrequest/3/chat`}> Zum Chat mit Helfer in Anfrage 3 </Link>
            <br />
            <Link to={`/hilfe/${user_id}`}> Zurück zu meiner Startseite </Link>
            <br />
            <p> Hier sehen Hilfesuchende alle ihre Chats. </p>
        </>
    );
}