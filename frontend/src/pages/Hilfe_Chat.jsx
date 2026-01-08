import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from "react-router-dom";

export function Hilfe_Chat() {
    const { user_id, request_id } = useParams();
    return (
        <>
            <Header />
            <h1> Chat (Hilfe) </h1>
            <p> blib blub, bla bla :D </p>
            <Link to={`/hilfe/${user_id}/request/${request_id}`}> Zurück zur Anfrage </Link>
            <br />
            <Link to={`/hilfe/${user_id}/chats`}> Zurück zur Chatübersicht </Link>
            <br />  
            <Link to={`/hilfe/${user_id}`}> Zurück zu meiner Startseite </Link>
        </>
    );
}