import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx';
import { Button } from "@mui/material";

export function DEV() {
    const default_helfer = 1;
    const default_hilfe = 3;
    const default_helfer_request = 1;
    const default_hilfe_request = 3;
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
            <Header />

            <Link to={`/`}> Home </Link>
            <br />

            <Link to={`/faq`}> FAQ</Link>
            <h6>    </h6>
            <p> HELFER </p>

            <Link to={`/helfer/login`}> Login</Link>
            <br />

            <Link to={`/helfer/signup`}> Signup</Link>
            <br />

            <Link to={`/helfer/${default_helfer}`}> Home </Link>
            <br />

            <Link to={`/helfer/${default_helfer}/scoreboard`}> Scoreboard</Link>
            <br />

            <Link to={`/helfer/${default_helfer}/myrequests`}> Requests in Arbeit </Link>
            <br />

            <Link to={`/helfer/${default_helfer}/request/${default_helfer_request}`}> Anfrageseite, nicht Bearbeitung </Link>
            <br />

             <Link to={`/helfer/${default_helfer}/myrequest/${default_helfer_request}`}> Anfrageseite, in Bearbeitung </Link>
            <br />

            <Link to={`/helfer/${default_helfer}/myrequest/${default_helfer_request}/chat`}> Chat</Link>
            <br />

            <Link to={`/helfer/${default_helfer}/requests`}> alle Requests</Link>
            <br />

            <Link to={`/helfer/${default_helfer}/chats`}> Chats</Link>
            <h6>    </h6>
            <p> HILFE </p>

            <Link to={`/hilfe/login`}> Login</Link>
            <br />

            <Link to={`/hilfe/signup`}> Signup</Link>
            <br />
            
            <Link to={`/hilfe/${default_hilfe}`}> Home</Link>
            <br />

            <Link to={`/hilfe/${default_hilfe}/request/${default_hilfe_request}`}> Detailansicht einer Anfrage</Link>
            <br />

            <Link to={`/hilfe/${default_hilfe}/new`}> Neue Anfrage</Link>
            <br />

            <Link to={`/hilfe/${default_hilfe}/chats`}> alle Chats</Link>
            <br />

            <Link to={`/hilfe/${default_hilfe}/chat/${default_chat}`}> Chat</Link>
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