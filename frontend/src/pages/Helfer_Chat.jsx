import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from "react-router-dom";

export function Helfer_Chat() {
    const { user_id, request_id } = useParams();
    return (
        <>
            <Header />
            <h3> Chat (Helfer) </h3>
            <p> blib blub, bla bla :D </p>
            <Link to={`/helfer/${user_id}/myrequest/${request_id}`}> Zurück zur Anfrage </Link>
            <br />
            <Link to="/helfer/1/chats"> Zurück zur Chatübersicht </Link>
            <br />
            <Link to="/helfer/1/requests"> Zurück zu meinen Requests </Link>
        </>
    );
}