import { Link } from 'react-router-dom'
import Header from '../component/Header.jsx';
import { Button } from "@mui/material";

export function Dev() {
    const default_user = 1;
    const default_request = 1;
    const default_chat = 1;
    const toggleBackground = () => {
        const body = document.body;
        const gradient = 'linear-gradient(90deg, rgba(155, 42, 42, 1) 0%, rgba(199, 152, 87, 1) 17%, rgba(200, 198, 92, 1) 33%, rgba(96, 200, 108, 1) 57%, rgba(103, 191, 201, 1) 76%, rgba(155, 156, 203, 1) 89%, rgba(216, 83, 237, 1) 100%)';
        const current = body.style.backgroundImage;
        // If an inline background image is set (and not 'none'), clear it; otherwise set the gradient
        if (current && current !== 'none') {
            body.style.backgroundImage = '';
        } else {
            body.style.backgroundImage = gradient;
        }
    };

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
            <h1>    </h1>

            <Button
                variant="contained"
                sx={{
                flex: 1,
                borderRadius: 0,
                //fontSize: { xs: "2rem", md: "5rem" },
                opacity: 0.9,
                
                backgroundImage: 'linear-gradient(90deg, rgba(155, 42, 42, 1) 0%, rgba(199, 152, 87, 1) 17%, rgba(200, 198, 92, 1) 33%, rgba(96, 200, 108, 1) 57%, rgba(103, 191, 201, 1) 76%, rgba(155, 156, 203, 1) 89%, rgba(216, 83, 237, 1) 100%)',

                "&:hover": {
                color: "white", // keep same bg
                opacity: 1,
                },
                }}
                onClick={toggleBackground}
            >
                {"rainbow :)"}
            </Button>

        </>
    );
}