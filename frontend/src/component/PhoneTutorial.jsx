import React, { useState } from 'react';
import { Box, Button, Typography, Stack, Paper, TextField, InputAdornment, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import WifiIcon from '@mui/icons-material/Wifi';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import GetAppIcon from '@mui/icons-material/GetApp';

export function PhoneTutorial({ tutorial }) {
    const [currentStep, setCurrentStep] = useState(0);
    const step = tutorial.steps[currentStep];

    const handleNext = () => {
        if (currentStep < tutorial.steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const renderScreen = () => {
        switch (step.screenType) {
            case 'home':
                return (
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, p: 2, mt: 4 }}>
                        {/* APP STORE ICON */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Box
                                component="img"
                                src={step.iconUrl}
                                alt="App Store"
                                sx={{
                                    width: 55,
                                    height: 55,
                                    borderRadius: '12px',
                                    boxShadow: '0 0 0 3px #9759d1, 0 4px 10px rgba(0,0,0,0.15)',
                                    animation: 'pulse 1.5s infinite',
                                    '@keyframes pulse': { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.05)' } }
                                }}
                            />
                            <Typography sx={{ fontSize: '10px', mt: 0.5, fontWeight: '500' }}>App Store</Typography>
                        </Box>
                        {/* Dummy Icons */}
                        {[...Array(11)].map((_, i) => (
                            <Box key={i} sx={{ textAlign: 'center' }}>
                                <Box sx={{ width: 55, height: 55, bgcolor: '#e0e0e0', borderRadius: '12px' }} />
                                <Typography sx={{ fontSize: '10px', color: '#888', mt: 0.5 }}>App</Typography>
                            </Box>
                        ))}
                    </Box>
                );

            case 'home_with_facebook':
                return (
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, p: 2, mt: 4 }}>
                        {/* APP STORE ICON */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Box
                                component="img"
                                src={step.iconUrl}
                                alt="App Store"
                                sx={{ width: 55, height: 55, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                            />
                            <Typography sx={{ fontSize: '10px', mt: 0.5, fontWeight: '500' }}>App Store</Typography>
                        </Box>
                        {/* FACEBOOK ICON - NEU INSTALLIERT! */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Box
                                component="img"
                                src={step.appIcon}
                                alt="Facebook"
                                sx={{
                                    width: 55,
                                    height: 55,
                                    borderRadius: '12px',
                                    boxShadow: '0 0 0 3px #9759d1, 0 4px 10px rgba(0,0,0,0.15)',
                                    animation: 'pulse 1.5s infinite',
                                    '@keyframes pulse': { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.05)' } }
                                }}
                            />
                            <Typography sx={{ fontSize: '10px', mt: 0.5, fontWeight: '500' }}>Facebook</Typography>
                        </Box>
                        {/* Dummy Icons */}
                        {[...Array(10)].map((_, i) => (
                            <Box key={i} sx={{ textAlign: 'center' }}>
                                <Box sx={{ width: 55, height: 55, bgcolor: '#e0e0e0', borderRadius: '12px' }} />
                                <Typography sx={{ fontSize: '10px', color: '#888', mt: 0.5 }}>App</Typography>
                            </Box>
                        ))}
                    </Box>
                );

            case 'search_tab':
            case 'search_input':
                return (
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, fontSize: '22px' }}>Suche</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Spiele, Apps, Storys und mehr"
                            value={step.screenType === 'search_input' ? 'Facebook' : ''}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: 'gray' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px',
                                    bgcolor: '#f1f1f2',
                                    '& fieldset': { border: 'none' }
                                }
                            }}
                        />
                    </Box>
                );

            case 'app_detail':
            case 'app_installing':
            case 'app_installed':
                const buttonText = step.screenType === 'app_installed' ? 'ÖFFNEN' : step.screenType === 'app_installing' ? 'LÄDT...' : 'LADEN';
                return (
                    <Box sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
                            {/* ECHTES FACEBOOK ICON */}
                            <Box
                                component="img"
                                src={step.appIcon}
                                alt={step.appName}
                                sx={{ width: 80, height: 80, borderRadius: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '19px', letterSpacing: '-0.5px' }}>
                                    {step.appName}
                                </Typography>
                                <Typography sx={{ color: 'gray', fontSize: '13px' }}>{step.appDev}</Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        mt: 1,
                                        borderRadius: '20px',
                                        px: 3,
                                        py: 0.5,
                                        bgcolor: '#007AFF',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        textTransform: 'uppercase',
                                        boxShadow: 'none',
                                        '&:hover': { bgcolor: '#0056b3' }
                                    }}
                                >
                                    {buttonText}
                                </Button>
                            </Box>
                        </Box>
                        <Divider />
                        <Typography sx={{ mt: 2, fontSize: '14px', color: '#444', lineHeight: 1.5 }}>
                            Vernetze dich mit Freunden, Familienmitgliedern und Personen, die deine Interessen teilen.
                        </Typography>
                    </Box>
                );

            default:
                return (
                    <Box sx={{ textAlign: 'center', mt: 10 }}>
                        <GetAppIcon sx={{ fontSize: 60, color: '#9759d1', mb: 2 }} />
                        <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                            {step.screenText}
                        </Typography>
                    </Box>
                );
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: { xs: 3, md: 6 }, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start', justifyContent: 'center', my: 4 }}>
            {/* IPHONE SIMULATOR */}
            <Paper elevation={24} sx={{
                width: '320px',
                height: '650px',
                backgroundColor: '#1a1a1a',
                borderRadius: '45px',
                padding: '12px',
                position: 'relative',
                border: '4px solid #333',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0
            }}>
                {/* Notch (Kamera-Aussparung) */}
                <Box sx={{
                    position: 'absolute',
                    top: 12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '120px',
                    height: '25px',
                    backgroundColor: '#1a1a1a',
                    borderBottomLeftRadius: '15px',
                    borderBottomRightRadius: '15px',
                    zIndex: 10
                }} />

                {/* Display Screen */}
                <Box sx={{
                    flex: 1,
                    backgroundColor: '#fff',
                    borderRadius: '35px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                }}>
                    {/* Status Bar */}
                    <Box sx={{
                        height: '40px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 3,
                        pt: 1,
                        backgroundColor: '#f5f5f5'
                    }}>
                        <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>9:41</Typography>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <SignalCellularAltIcon sx={{ fontSize: 14, color: '#333' }} />
                            <WifiIcon sx={{ fontSize: 14, color: '#333' }} />
                            <BatteryFullIcon sx={{ fontSize: 14, color: '#333' }} />
                        </Box>
                    </Box>

                    {/* Main Content Area - NOW DYNAMIC */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                        {renderScreen()}
                    </Box>

                    {/* Tab Bar - NUR WENN showTabBar nicht false ist */}
                    {step.showTabBar !== false && (
                        <Box sx={{
                            height: '60px',
                            borderTop: '1px solid #eee',
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            bgcolor: '#fff',
                            fontSize: '11px'
                        }}>
                            <Typography sx={{ color: '#888' }}>Heute</Typography>
                            <Typography sx={{ color: '#888' }}>Spiele</Typography>
                            <Typography sx={{ color: '#888' }}>Apps</Typography>
                            <Typography sx={{ color: '#9759d1', fontWeight: 'bold' }}>Suchen</Typography>
                        </Box>
                    )}
                </Box>
            </Paper>

            {/* Beschreibung & Navigation */}
            <Box sx={{ flex: 1, maxWidth: '400px' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#9759d1', fontSize: '18px' }}>
                    Schritt {currentStep + 1} von {tutorial.steps.length}
                </Typography>
                <Typography sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4, color: '#333' }}>
                    {step.description}
                </Typography>

                {/* Navigation Buttons */}
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        fullWidth
                        sx={{ borderColor: '#9759d1', color: '#9759d1' }}
                    >
                        Zurück
                    </Button>
                    <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        onClick={handleNext}
                        disabled={currentStep === tutorial.steps.length - 1}
                        fullWidth
                        sx={{ bgcolor: '#9759d1', '&:hover': { bgcolor: '#7f19d2' } }}
                    >
                        Weiter
                    </Button>
                </Stack>

                {/* Progress Bar */}
                <Box sx={{ width: '100%', height: '6px', bgcolor: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                    <Box sx={{
                        height: '100%',
                        bgcolor: '#9759d1',
                        width: `${((currentStep + 1) / tutorial.steps.length) * 100}%`,
                        transition: 'width 0.3s ease'
                    }} />
                </Box>
            </Box>
        </Box>
    );
}
