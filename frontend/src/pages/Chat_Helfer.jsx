import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'

export function Chat_Helfer() {
    return (
        <>
            <Header />
            <h3> Chat (Helfer) </h3>
            <p> blib blub, bla bla :D </p>
            <Link to="/helfer/1/request/1"> Zurück zur Anfrage </Link>
            <br />
            <Link to="/helfer/1/chats"> Zurück zur Chatübersicht </Link>
            <br />
            <Link to="/helfer/1/requests"> Zurück zu meinen Requests </Link>
        </>
    );
}