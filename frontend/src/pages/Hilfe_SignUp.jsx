import Constants from '../constants/constants.js';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Header } from '../component/Header.jsx'
import { Footer } from '../component/Footer.jsx';
import Alert from '@mui/material/Alert';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    margin: 'auto',
    borderRadius: '12px',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '500px',
    },
    boxShadow:
        Constants.shadow_login + ' 0px 5px 15px 0px, ' + Constants.shadow_login + ' 0px 15px 35px -5px',
}));

export function Hilfe_SignUp() {
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [alert, setAlert] = useState("");

    const handleSubmit = async () => {
        event.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 4) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 4 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        if (!isValid) return;

        const userId = await backendCreate(email.value, password.value, name.value);

        if (userId) {
            window.location.href = `/${Constants.PAGES_PREFIX}/#/hilfe/${userId}`;
        }
    };

    const backendCreate = async (email_p, password_p, name_p) => {
        const userPayload = {
            name: name_p,
            email: email_p,
            password: password_p,
            address: "",
            helper: false,
        };
        try {
            const res = await fetch(
                `${Constants.API_URL}/user`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userPayload),
                }
            );

            if (res.status !== 201) {
                if (res.status === 409) {
                    setEmailError(true);
                    setAlert("Diese E-Mail wird bereits verwendet. Bitte gehe zur Anmeldeseite.");
                } else {
                    setAlert("Unbekannter Fehler beim Einloggen. Code: " + res.status);
                }
                return null;
            }

            const data = await res.json();

            return data.user_id;
        } catch (err) {
            setAlert(err.message);
            return null;
        }
    };

    return (
        <Box sx={{
            height: "100vh",
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Header />
            <Alert severity="error" sx={{ display: alert == '' ? 'none' : 'flex' }}>
                {alert}
            </Alert>
            <Box flex="1" display="flex" justifyContent="center" alignItems="flex-start" sx={{ px: 2, pt: 1 }}>
                <Card variant="outlined" sx={{ position: 'relative', p: 3, gap: 1 }}>
                    {/* title */}
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            width: '100%',
                            fontSize: { xs: '2rem', sm: '2.2rem' },
                            fontWeight: 'bold',
                            py: 2
                        }}
                    >
                        Für Hilfe neu registrieren
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="name" sx={{ fontSize: '1rem', fontWeight: 500, pb: .2 }}>Ihr Name</FormLabel>
                            <TextField
                                autoComplete="name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                placeholder="Max Mustermann"
                                error={nameError}
                                helperText={nameErrorMessage}
                                color={nameError ? Constants.error : Constants.neutral_medium}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="email" sx={{ fontSize: '1rem', fontWeight: 500, pb: .2 }}>Email</FormLabel>
                            <TextField
                                error={emailError}
                                helperText={emailErrorMessage}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="name@email.com"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={emailError ? Constants.error : Constants.neutral_medium}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password" sx={{ fontSize: '1rem', fontWeight: 500, pb: .2 }}>Passwort</FormLabel>
                            <TextField
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                required
                                fullWidth
                                variant="outlined"
                                color={passwordError ? Constants.error : Constants.neutral_medium}
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 1,
                                fontSize: '1rem',
                                fontWeight: "600",
                                color: Constants.primary_color,
                                outlineColor: Constants.primary_color_very_light,
                                borderColor: Constants.primary_color_very_light,
                                backgroundColor: Constants.primary_color_very_light,

                                ":hover": {
                                    color: Constants.primary_color,
                                    outlineColor: Constants.primary_color,
                                    borderColor: Constants.primary_color,
                                }

                            }}
                        >
                            Registrieren
                        </Button>

                    </Box>


                    <Divider sx={{ py: 1, fontSize: '1.2rem' }}>oder</Divider>


                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='h6' sx={{ textAlign: 'center', fontSize: '1.1rem', fontWeight: '600', }}>

                            Schonmal registriert?
                        </Typography>

                        <Typography variant='h6' sx={{ textAlign: 'center', fontSize: '1.1rem', color: Constants.header_color }} component={Link} to="/hilfe/login">
                            Dann stattdessen hier drücken
                        </Typography>
                    </Box>

                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        size="large"

                        sx={{
                            alignSelf: 'center',
                            fontSize: '1rem',
                            fontWeight: '600',
                            marginTop: '25px',
                            color: Constants.primary_color,
                            outlineColor: Constants.primary_color_very_light,
                            borderColor: Constants.primary_color_very_light,
                            backgroundColor: Constants.primary_color_very_light,

                            ":hover": {
                                color: Constants.primary_color,
                                outlineColor: Constants.primary_color,
                                borderColor: Constants.primary_color,
                            }
                        }}
                    >
                        Zurück
                    </Button>
                </Card>
            </Box>
            <Footer />
        </Box>
    );
}



/* <>
    <Header />
    <h1> Signup für Hilfesuchende </h1>
    <Link to="/hilfe/login"> Zurück zum Login </Link>
    <br />
    <br />
    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: "center" }}>
    <ButtonBase
        component={Link}
        to={`/`}
        sx={{
            p: 1,     
            backgroundColor: Constants.neutral_light,
            borderRadius: 1,
            color: Constants.primary_color,
            fontWeight: '600',
            '&:hover': {
                backgroundColor: Constants.neutral_light_darker,
                //transform: 'translateX(-4px)',
                color: Constants.primary_color,
            },
            transition: 'all 0.2s ease',
            width: 'auto'
        }}
    >
        ← Zurück zum Home
    </ButtonBase>
</Box>
    <br />
    <p> Hier können Suchende ein Konto erstellen. Da müssen sie halt alles eingeben was in die Datenbank soll, Passwort und mail und idk</p>
</> */