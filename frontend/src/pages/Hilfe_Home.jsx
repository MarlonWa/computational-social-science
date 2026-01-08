import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { useParams } from 'react-router-dom';

export function Hilfe_Home() {
    const { user_id } = useParams();
    return (
        <>
            <Header />
            <h3> Startseite eines Hilfesuchenden </h3>
            <Link to={`/hilfe/${user_id}/request/3`}> Anfrage ID3 </Link>
            <br />
            <Link to={`/hilfe/${user_id}/new`}> NEUE ANFRAGE </Link>
            <br />
            <p> Hier kommen Hilfesuchende nach dem Login hin. Hier sehen sie ihre offenen Anfragen und können draufklicken. </p>
            <p> Außerdem ein großer Knopf um neue Anfragen zu erstellen </p>    
        </>
    );
}   