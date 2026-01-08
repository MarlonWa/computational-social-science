import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'

export function Hilfe_Request_Details() {
    return (
        <>
            <Header />
            <h1> Anfrage x: Detailansicht</h1>
            <p> blib blub, Anfrage hier (groooooßer Text) </p>
            <Link to="/hilfe/3/chat/3"> Zum Chat </Link>
            <p> Hier kommen Suchende hin, wenn sie auf eine Anfrage gedrückt haben. Hier kommen sie außerdem auf den Chat.</p>
        </>
    );
}