import { Link } from 'react-router-dom'
import { Header } from '../component/Header';

export function Anfrage_in_Bearbeitung_Helfer() {
    return (
        <>
            <Header />
            <h3> Details zur Anfrage x, aktuell in Bearbeitung von diesem Helfer </h3>
            <Link to="/helfer/:user_id/myrequest/:request_id/chat"> zugehöriger Chat </Link>
            <br />
            <p> Das ist die Detailansicht einer Anfrage, die gerade in Bearbeitung von diesem Helfer ist. Man kann auf den Chat zugreifen. </p>
        </>
    );
}