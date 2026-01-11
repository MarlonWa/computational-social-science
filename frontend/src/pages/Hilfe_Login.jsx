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

export function Hilfe_Login() {
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (emailError || passwordError) {
            return;
        }
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const validateInputs = () => {
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

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    return (
        <Box sx={{
            height: "100vh",
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Header />
            <Box flex="1" display="flex" justifyContent="center" alignItems="flex-start" sx={{ px: 2, pt: 1 }}>
                <Card variant="outlined" sx={{ position: 'relative', p: 3, gap: 1 }}>
                    {/* DEV LINE - TODO */}

                    {/* <Link to="/hilfe/3"> DEV: Login als Hilfesuchender ID 3 </Link> */}
                    
                    {/* title */}
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: {xs: '1.9rem', sm: '2.2rem'}, fontWeight: 'bold' }}
                    >
                        Für Hilfe anmelden
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
                            <FormLabel htmlFor="email" sx={{ fontSize: '1rem', fontWeight: 500, pb: .2, pt: 2 }}>Email</FormLabel>
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
                            onClick={validateInputs}
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

                    </Box>


                    <Divider sx={{ py: 2, fontSize: '1.2rem' }}>oder</Divider>


                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='h6' sx={{ textAlign: 'center', fontSize: '1.1rem', fontWeight: '600', }}>

                            Noch nie registriert?
                        </Typography>

                        <Typography variant='h6' sx={{ textAlign: 'center', fontSize: '1.1rem', color: Constants.header_color }} component={Link} to="/hilfe/signup">
                            Dann stattdessen hier drücken zum Registrieren
                        </Typography>
                    </Box>

                    <Button
                        component={Link}
                        to="/"
                        variant="outlined"
                        size="large"

                        sx={{
                            alignSelf: 'center',
                            fontSize: '1rem',
                            fontWeight: '600',
                            marginTop: '25px',
                            color: Constants.secondary_color,
                            outlineColor: Constants.secondary_color_very_light,
                            borderColor: Constants.secondary_color_very_light,
                            backgroundColor: Constants.secondary_color_very_light,

                            ":hover": {
                                color: Constants.secondary_color,
                                outlineColor: Constants.secondary_color,
                                borderColor: Constants.secondary_color,
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


