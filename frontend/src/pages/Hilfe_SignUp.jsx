import Constants from '../constants/constants.js';
import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'
import { Box, ButtonBase } from '@mui/material';

export function Hilfe_SignUp() {
    return (
        <>
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
        </>
    );
}