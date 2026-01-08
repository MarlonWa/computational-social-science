import { Link } from 'react-router-dom'
import { Header } from '../component/Header';
import { useParams } from "react-router-dom";

export function Helfer_Request_Assigned_Details() {
    const { user_id, request_id } = useParams();
    return (
        <>
            <Header header_title={"Detailansicht: Anfrage in Bearbeitung"}/>
            <h3> Details zur Anfrage x, aktuell in Bearbeitung von diesem Helfer </h3>
            <Link to={`/helfer/${user_id}/myrequest/${request_id}/chat`}> zugehöriger Chat </Link>
            <br />
            <Link to={`/helfer/${user_id}/myrequests`}> Zurück zu meinen aktiven Anfragen </Link>
            <br />
            <p> Das ist die Detailansicht einer Anfrage, die gerade in Bearbeitung von diesem Helfer ist. Man kann auf den Chat zugreifen. </p>
        </>
    );
}