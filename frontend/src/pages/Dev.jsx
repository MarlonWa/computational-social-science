import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx';
import { Footer } from '../component/Footer.jsx';
import { Box, Button } from "@mui/material";

export function Dev() {
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
            <Box>
                    
                <Header header_title={"DEV PAGE"}/>

                <Link to={`/`}> Home </Link>
                <br />

                <Link to={`/faq`}> FAQ</Link>
                <h6>    </h6>
                <p> HELFER </p>

                <Link to={`/helfer/login`}> Helfer_Login</Link>
                <br />

                <Link to={`/helfer/signup`}> Helfer_SignUp</Link>
                <br />

                <Link to={`/helfer/${default_helfer}`}> Helfer_Home </Link>
                <br />

                <Link to={`/helfer/${default_helfer}/scoreboard`}> Helfer_Scoreboard</Link>
                <br />

                <Link to={`/helfer/${default_helfer}/myrequests`}> Helfer_Requests_Assigned </Link>
                <br />

                <Link to={`/helfer/${default_helfer}/request/${default_helfer_request}`}> Helfer_Request_Details </Link>
                <br />

                <Link to={`/helfer/${default_helfer}/myrequest/${default_helfer_request}`}> Helfer_Request_Assigned_Details </Link>
                <br />

                <Link to={`/helfer/${default_helfer}/myrequest/${default_helfer_request}/chat`}> Helfer_Chat</Link>
                <br />

                <Link to={`/helfer/${default_helfer}/requests`}> Helfer_Requests_All</Link>
                <br />

                <Link to={`/helfer/${default_helfer}/chats`}> Helfer_Chats_All</Link>
                <h6>    </h6>
                <p> HILFE </p>

                <Link to={`/hilfe/login`}> Hilfe_Login</Link>
                <br />

                <Link to={`/hilfe/signup`}> Hilfe_SignUp</Link>
                <br />
                
                <Link to={`/hilfe/${default_hilfe}`}> Hilfe_Home</Link>
                <br />

                <Link to={`/hilfe/${default_hilfe}/request/${default_hilfe_request}`}> Hilfe_Request_Details</Link>
                <br />

                <Link to={`/hilfe/${default_hilfe}/new`}> Hilfe_Request_New</Link>
                <br />

                <Link to={`/hilfe/${default_hilfe}/chats`}> Hilfe_Chats_All</Link>
                <br />

                <Link to={`/hilfe/${default_hilfe}/chat/${default_chat}`}> Hilfe_Chat</Link>
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
                    {"rainbow :) - dark mode but better"}
                </Button>
                <Footer />
            </Box>
        </>
    );
}