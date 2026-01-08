import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'

export function Hilfe_Home() {
    return (
        <>
            <Header />
            <h3> Startseite eines Hilfesuchenden </h3>
            <Link to="/hilfe/3/request/3"> Anfrage ID3 </Link>
            <br />
            <Link to="/hilfe/3/new"> NEUE ANFRAGE </Link>
            <br />
            <p> Hier kommen Hilfesuchende nach dem Login hin. Hier sehen sie ihre offenen Anfragen und können draufklicken. </p>
            <p> Außerdem ein großer Knopf um neue Anfragen zu erstellen </p>    
        </>
    );
}   