import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'

export function Home_Helfer() {
    return (
        <>
            <Header />
            <h3> Startseite eines Helfers</h3>
            <Link to="/helfer/:user_id/scoreboard"> Scoreboard </Link>
            <br />
            <Link to="/helfer/:user_id/myrequests"> Meine Anfragen in Arbeit </Link>
            <br />
            <Link to="/helfer/:user_id/requests"> Alle Anfragen </Link>
            <br />
            <Link to="/helfer/:user_id/chats"> Meine Chats </Link>
            <br /> 
            <p> Hier kommen Helfer nach dem Login hin. Hier vielleicht das Profil eines Helfers? </p>
            <p> Außerdem sollen hier Links zu scoreboard etc hin</p>
        </>
    );
}