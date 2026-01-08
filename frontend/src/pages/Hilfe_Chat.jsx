import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'

export function Hilfe_Chat() {
    return (
        <>
            <Header />
            <h1> Chat (Hilfe) </h1>
            <p> blib blub, bla bla :D </p>
            <Link to="/hilfe/3/request/3"> Zurück zur Anfrage </Link>
            <br />
            <Link to="/hilfe/3/chats"> Zurück zur Chatübersicht </Link>
            <br />  
            <Link to="/hilfe/3"> Zurück zu meiner Startseite </Link>
        </>
    );
}