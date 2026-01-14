import Constants from '../constants/constants.js';
//not needed yet

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

    const handleRestart = async () => {
        try {
            const response = await fetch(Constants.API_URL + '/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Restart successful');
            } else {
                console.error('Restart failed');
            }
        } catch (error) {
            console.error('Error calling restart API:', error);
        }
    };

    const handleClear = async () => {
        try {
            const response = await fetch(Constants.API_URL + '/cleanreset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Clear successful');
            } else {
                console.error('Clear failed');
            }
        } catch (error) {
            console.error('Error calling clear API:', error);
        }
    };

    return (
        <>
            <Box height="100vh" display="flex" flexDirection="column" >

                <Header header_title={"DEV PAGE"} />

                <Button onClick={handleRestart} style={{backgroundColor : Constants.error, color: Constants.neutral_light, fontSize : "2rem"}}>
                    Restart Database 
                </Button>
                <Button onClick={handleClear} style={{backgroundColor : Constants.error, color: Constants.neutral_light, fontSize : "2rem"}}>
                    Clear Database 
                </Button>
                <p> (be careful with clicking this, requests and users gone afterwards !) </p>

                <Box flex={1} display="grid" gridTemplateColumns="1fr 1fr" gap={2} justifyContent="center" width="100vw" alignItems="center">
                    <Box>
                        {/* <Link style={{fontSize:"25px"}}  to={`/`}> Home </Link>
                    <br /> */}

                        <p style={{ fontSize: "25px" }}>  HELFER </p>

                        <Link style={{ fontSize: "25px" }} to={`/helfer/login`}> Helfer_Login</Link>
                        <br />

                        <Link style={{ fontSize: "25px" }} to={`/helfer/signup`}> Helfer_SignUp</Link>
                        <br />

                        <Link style={{ fontSize: "25px" }} to={`/helfer/${default_helfer}`}> Helfer_Home </Link>
                        <br />

                        <Link style={{ fontSize: "25px" }} to={`/helfer/${default_helfer}/scoreboard`}> Helfer_Scoreboard</Link>
                        <br />

                        <Link style={{ fontSize: "25px" }} to={`/helfer/${default_helfer}/myrequests`}> Helfer_Requests_Assigned </Link>
                        <br />

                        <Link style={{ fontSize: "25px" }} to={`/helfer/${default_helfer}/request/${default_helfer_request}`}> Helfer_Request_Details </Link>
                        <br />

                        <Link style={{ fontSize: "25px" }} to={`/helfer/${default_helfer}/myrequest/${default_helfer_request}`}> Helfer_Request_Assigned_Details </Link>
                        <br />

                        <Link style={{ fontSize: "25px" }} to={`/helfer/${default_helfer}/myrequest/${default_helfer_request}/chat`}> Helfer_Chat</Link>
                        <br />

                        <Link style={{ fontSize: "25px" }} to={`/helfer/${default_helfer}/requests`}> Helfer_Requests_All</Link>
                        <br />

                        <Link style={{ fontSize: "25px" }} to={`/helfer/${default_helfer}/chats`}> Helfer_Chats_All</Link>
                    </Box>
                    <Box>
                        <h6>    </h6>
                        <p style={{ fontSize: "25px" }}> HILFE </p>

                        <Link style={{ fontSize: "25px" }} to={`/hilfe/login`}> Hilfe_Login</Link>
                        <br />

                        <Link style={{ fontSize: "25px" }} to={`/hilfe/signup`}> Hilfe_SignUp</Link>
                        <br />

                        <Link style={{ fontSize: "25px" }} to={`/hilfe/${default_hilfe}`}> Hilfe_Home</Link>
                        <br />

                        <Link style={{ fontSize: "25px" }} to={`/hilfe/${default_hilfe}/request/${default_hilfe_request}`}> Hilfe_Request_Details</Link>
                        <br />

                        <Link style={{ fontSize: "25px" }} to={`/hilfe/${default_hilfe}/new`}> Hilfe_Request_New</Link>
                        <br />

                        <Link style={{ fontSize: "25px" }} to={`/hilfe/${default_hilfe}/chats`}> Hilfe_Chats_All</Link>
                        <br />

                        <Link style={{ fontSize: "25px" }} to={`/hilfe/${default_hilfe}/request/${default_hilfe_request}/chat`}> Hilfe_Chat</Link>
                        <br />
                        <br />
                        <Link style={{ fontSize: "25px" }} to={`/faq`}> FAQ</Link>
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
                    </Box>
                </Box>
                <Footer />
            </Box>
        </>
    );
}