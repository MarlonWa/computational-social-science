import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from 'react-router-dom';

export function Hilfe_Request_Details() {
    const { user_id, request_id } = useParams();
    return (
        <>
            <Header header_title={"Detailansicht"}/>
            <h1> Anfrage x: Detailansicht</h1>
            <p> blib blub, Anfrage hier (groooooßer Text) </p>
            <Link to={`/hilfe/${user_id}/chat/${request_id}`}> Zum Chat </Link>
            <p> Hier kommen Suchende hin, wenn sie auf eine Anfrage gedrückt haben. Hier kommen sie außerdem auf den Chat.</p>
        </>
    );
}