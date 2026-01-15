import Constants from '../constants/constants.js';
import { use, useState } from 'react';
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
import ForgotPassword from '../component/ForgotPassword.jsx';
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

export function Helfer_Login() {
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [alert, setAlert] = useState("");


    const handleSubmit = async () => {
        event.preventDefault();
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

        if (!isValid) return;

        const userId = await backendCheck(email.value, password.value);

        if (userId) {
            window.location.href = `/${Constants.PAGES_PREFIX}/#/helfer/${userId}`;
        }
    };

    const backendCheck = async (email, password) => {
        try {
            const res = await fetch(

                `${Constants.API_URL}/login?email=${encodeURIComponent(email)}&helper=true`, {
                method: 'POST',
            }
            );

            if (!res.ok) {
                if (res.status === 404) {
                    setAlert("Kein Benutzer mit dieser E-Mail gefunden. Musst du dich erst registrieren?");
                } else {
                    setAlert("Unbekannter Fehler beim Einloggen. Code: " + res.status);
                }
                return null;
            }

            const data = await res.json();

            if (data.password !== password) {
                setPasswordError(true);
                setPasswordErrorMessage('Falsches Passwort');
                setAlert("Falsches Passwort. Bitte versuche es erneut.");
                return null;
            }

            if (!data.helper) {
                setAlert("Dieser Account ist kein Helfer-Account.");
                return null;
            }

            setPasswordError(false);
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

                    {/* DEV LINE - TODO */}
                    <Link to="/helfer/3">
                        <Typography variant="p" color="red">

                            TRY IT OUT: Teste die Helferseite hier direkt als Benutzerin Anna
                        </Typography>
                    </Link>

                    {/* title */}
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Zum Helfen anmelden
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
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

                        {/* <ForgotPassword open={open} handleClose={handleClose} /> */}  {/* imported from component! - not working yet TODO*/}

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
                            Anmelden
                        </Button>


                        {/* <Link
                            component="button"
                            type="button"
                            onClick={handleClickOpen}
                            variant="body2"
                            sx={{ alignSelf: 'center' }}
                        >
                            Forgot your password?
                        </Link> - forgot your password text - see above TODO */}
                    </Box>


                    <Divider sx={{ py: 2 }}>oder</Divider>


                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography sx={{ textAlign: 'center' }}>
                            Noch keinen Account?{' '}
                            <Link to="/helfer/signup" variant="body2" sx={{ alignSelf: 'center' }}> {/* TODO set correct link */}
                                Registrieren
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
