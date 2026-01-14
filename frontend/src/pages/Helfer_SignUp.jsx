import Constants from '../constants/constants.js';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import { Header } from '../component/Header.jsx'
import { Footer } from '../component/Footer.jsx';
import Alert from '@mui/material/Alert';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        Constants.shadow_login + ' 0px 5px 15px 0px, ' + Constants.shadow_login + ' 0px 15px 35px -5px',
}));

export function Helfer_SignUp() {
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
            setEmailErrorMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 4) {
            setPasswordError(true);
            setPasswordErrorMessage('Ihr Passwort muss mindestens 4 Zeichen lang sein.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Ihr Name ist erforderlich.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        if (!isValid) return;

        const userId = await backendCreate(email.value, password.value, name.value);

        if (userId) {
            window.location.href = `/${Constants.PAGES_PREFIX}/#/helfer/${userId}`;
        }
    };

    const backendCreate = async (email_p, password_p, name_p) => {
        const userPayload = {
            name: name_p,
            email: email_p,
            password: password_p,
            helper: true,
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
                <Card variant="outlined" sx={{ position: 'relative' }}>
                    <Button
                        component={Link}
                        to="/"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 10,
                            minWidth: 'auto',
                            padding: '4px 8px',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        ✕
                    </Button>

                    {/* title */}
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Zum Helfen registrieren
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
                            <FormLabel htmlFor="name">Name</FormLabel>
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
                            <FormLabel htmlFor="email">Email</FormLabel>
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
                            <FormLabel htmlFor="password">Passwort</FormLabel>
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


                    <Divider sx={{ py: 2 }}>oder</Divider>


                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography sx={{ textAlign: 'center' }}>
                            Schon einen Account?{' '}
                            <Link to="/helfer/login" variant="body2" sx={{ alignSelf: 'center' }}> {/* TODO set correct link */}
                                Anmelden
                            </Link>
                        </Typography>
                    </Box>

                    {/* <Button
                        component={Link}
                        to="/"
                        variant="outlined"
                        size="small"
                        
                        sx={{ alignSelf: 'center',
                            fontSize: '1rem',
                            marginTop: '20px',
                         }}
                    >
                        Zurück
                    </Button> */}
                </Card>
            </Box>
            <Footer />
        </Box>
    );
}
