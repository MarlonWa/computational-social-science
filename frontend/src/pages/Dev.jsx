import { Link } from 'react-router-dom'
import Header from '../component/Header.jsx';

export function Dev() {
    const default_user = 1;
    const default_request = 1;
    const default_chat = 1;
    return (
        <>
            {/*<Header />*/}

            <Link to={`/`}> Home </Link>
            <p></p>

            <Link to={`/faq`}> FAQ</Link>
            <h6>    </h6>
            <p> HELFER </p>

            <Link to={`/helfer/login`}> Login</Link>
            <p></p>

            <Link to={`/helfer/signup`}> Signup</Link>
            <p></p>

            <Link to={`/helfer/${default_user}`}> Home </Link>
            <p></p>

            <Link to={`/helfer/${default_user}/scoreboard`}> Scoreboard</Link>
            <p></p>

            <Link to={`/helfer/${default_user}/myrequests`}> Requests in Arbeit </Link>
            <p></p>

            <Link to={`/helfer/${default_user}/myrequest/${default_request}`}> Anfrageseite </Link>
            <p></p>

            <Link to={`/helfer/${default_user}/myrequest/${default_request}/chat`}> Chat</Link>
            <p></p>

            <Link to={`/helfer/${default_user}/requests`}> alle Requests</Link>
            <p></p>

            <Link to={`/helfer/${default_user}/chats`}> Chats</Link>
            <h6>    </h6>
            <p> HILFE </p>

            <Link to={`/hilfe/login`}> Login</Link>
            <p></p>

            <Link to={`/hilfe/signup`}> Signup</Link>
            <p></p>
            
            <Link to={`/hilfe/${default_user}`}> Home</Link>
            <p></p>

            <Link to={`/hilfe/${default_user}/new`}> Neue Anfrage</Link>
            <p></p>

            <Link to={`/hilfe/${default_user}/chats`}> alle Chats</Link>
            <p></p>

            <Link to={`/hilfe/${default_user}/chat/${default_chat}`}> Chat</Link>
        </>
    );
}