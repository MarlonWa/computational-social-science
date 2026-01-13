import React, { useState } from 'react';
import { Box, Button, Typography, Stack, Paper, TextField, InputAdornment, Divider, Switch } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import WifiIcon from '@mui/icons-material/Wifi';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import GetAppIcon from '@mui/icons-material/GetApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export function PhoneTutorial({ tutorial }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [testPassword, setTestPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const step = tutorial.steps[currentStep];

    const handleNext = () => {
        if (currentStep < tutorial.steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    // Passwort-Stärke berechnen
    const calculatePasswordStrength = (pwd) => {
        if (!pwd) return { level: 'none', percent: 0, color: '#e0e0e0' };
        let strength = 0;
        if (pwd.length >= 8) strength += 25;
        if (pwd.length >= 12) strength += 15;
        if (/[a-z]/.test(pwd)) strength += 15;
        if (/[A-Z]/.test(pwd)) strength += 15;
        if (/[0-9]/.test(pwd)) strength += 15;
        if (/[!@#$%^&*]/.test(pwd)) strength += 15;
        
        if (strength < 25) return { level: 'weak', percent: 20, color: '#d32f2f' };
        if (strength < 50) return { level: 'medium', percent: 50, color: '#f57c00' };
        if (strength < 75) return { level: 'good', percent: 75, color: '#fbc02d' };
        return { level: 'strong', percent: 100, color: '#2e7d32' };
    };

    // Passwort-Anforderungen prüfen
    const checkPasswordRequirements = (pwd) => {
        return {
            length: pwd.length >= 8,
            hasNumber: /[0-9]/.test(pwd),
            hasSpecial: /[!@#$%^&*]/.test(pwd),
            hasUpper: /[A-Z]/.test(pwd),
            hasLower: /[a-z]/.test(pwd),
        };
    };

    // Crack-Zeit berechnen basierend auf Passwort-Stärke
    const calculateCrackTime = (strength) => {
        if (strength.level === 'weak') return { time: '0,1 Sekunden', message: '⚠️ Viel zu unsicher! Wähle ein stärkeres Passwort.' };
        if (strength.level === 'medium') return { time: '2 Stunden', message: '⚠️ Noch nicht sicher genug. Füge mehr Zeichen oder Sonderzeichen hinzu.' };
        if (strength.level === 'good') return { time: '3 Monate', message: '👍 Ziemlich gut! Du kannst noch ein Sonderzeichen hinzufügen.' };
        return { time: '3+ Jahre', message: '✅ Ausgezeichnet! Dieses Passwort ist sehr sicher.' };
    };

    // Berechne isGoodPassword für aktuelle password_tester
    const getIsGoodPassword = () => {
        if (step.screenType !== 'password_tester') return false;
        const strength = calculatePasswordStrength(testPassword);
        return strength.level === 'good' || strength.level === 'strong';
    };

    const isGoodPassword = getIsGoodPassword();

    const renderScreen = () => {
        switch (step.screenType) {
            case 'home':
                const isSettings = step.highlightedElement === 'Einstellungen';
                return (
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, p: 2, mt: 4 }}>
                        {/* HIGHLIGHTED ICON (App Store oder Einstellungen) */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Box
                                component="img"
                                src={step.iconUrl}
                                alt={isSettings ? 'Einstellungen' : 'App Store'}
                                sx={{
                                    width: 55,
                                    height: 55,
                                    borderRadius: '12px',
                                    boxShadow: '0 0 0 3px #9759d1, 0 4px 10px rgba(0,0,0,0.15)',
                                    animation: 'pulse 1.5s infinite',
                                    '@keyframes pulse': { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.05)' } }
                                }}
                            />
                            <Typography sx={{ fontSize: '10px', mt: 0.5, fontWeight: '500' }}>
                                {isSettings ? 'Einstellungen' : 'App Store'}
                            </Typography>
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

            case 'long_press':
                return (
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, p: 2, mt: 4 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Box component="img" src={step.iconUrl} alt="App Store" sx={{ width: 55, height: 55, borderRadius: '12px' }} />
                            <Typography sx={{ fontSize: '10px', mt: 0.5, fontWeight: '500' }}>App Store</Typography>
                        </Box>
                        {/* FACEBOOK - mit Finger-Animation */}
                        <Box sx={{ textAlign: 'center', position: 'relative' }}>
                            <Box
                                component="img"
                                src={step.appIcon}
                                alt="Facebook"
                                sx={{
                                    width: 55,
                                    height: 55,
                                    borderRadius: '12px',
                                    boxShadow: '0 0 0 3px #9759d1, 0 4px 10px rgba(0,0,0,0.15)',
                                    animation: 'wiggle 0.5s infinite',
                                    '@keyframes wiggle': {
                                        '0%, 100%': { transform: 'rotate(-3deg)' },
                                        '50%': { transform: 'rotate(3deg)' }
                                    }
                                }}
                            />
                            <Typography sx={{ fontSize: '10px', mt: 0.5, fontWeight: '500' }}>Facebook</Typography>
                            {/* Finger Emoji */}
                            <Typography sx={{ position: 'absolute', top: -10, right: -5, fontSize: '30px' }}>👆</Typography>
                        </Box>
                        {[...Array(10)].map((_, i) => (
                            <Box key={i} sx={{ textAlign: 'center' }}>
                                <Box sx={{ width: 55, height: 55, bgcolor: '#e0e0e0', borderRadius: '12px' }} />
                                <Typography sx={{ fontSize: '10px', color: '#888', mt: 0.5 }}>App</Typography>
                            </Box>
                        ))}
                    </Box>
                );

            case 'context_menu':
                return (
                    <Box sx={{ position: 'relative', p: 2, mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* App Icon */}
                        <Box sx={{ textAlign: 'center', opacity: 0.7 }}>
                            <Box component="img" src={step.appIcon} alt="Facebook" sx={{ width: 60, height: 60, borderRadius: '12px' }} />
                            <Typography sx={{ fontSize: '10px', mt: 0.5, fontWeight: '500' }}>Facebook</Typography>
                        </Box>
                        {/* Context Menu */}
                        <Box sx={{
                            position: 'absolute',
                            top: 100,
                            bgcolor: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: 3,
                            p: 0.5,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                            minWidth: '200px'
                        }}>
                            <Button fullWidth sx={{ justifyContent: 'flex-start', color: '#333', textTransform: 'none', py: 1.5 }}>
                                App teilen
                            </Button>
                            <Button
                                fullWidth
                                sx={{
                                    justifyContent: 'flex-start',
                                    color: '#d32f2f',
                                    textTransform: 'none',
                                    py: 1.5,
                                    fontWeight: 'bold',
                                    bgcolor: '#ffebee',
                                    '&:hover': { bgcolor: '#ffcdd2' }
                                }}
                            >
                                App entfernen
                            </Button>
                        </Box>
                    </Box>
                );

            case 'confirm_delete':
                return (
                    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 10 }}>
                        <Box component="img" src={step.appIcon} alt={step.appName} sx={{ width: 80, height: 80, borderRadius: '18px', mb: 2 }} />
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px', mb: 1, textAlign: 'center' }}>
                            "{step.appName}" löschen?
                        </Typography>
                        <Typography sx={{ fontSize: '14px', color: '#666', mb: 3, textAlign: 'center' }}>
                            Alle Daten dieser App werden entfernt.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                width: '100%',
                                py: 1.5,
                                bgcolor: '#d32f2f',
                                color: 'white',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                borderRadius: 2,
                                mb: 1,
                                '&:hover': { bgcolor: '#c62828' }
                            }}
                        >
                            App löschen
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                width: '100%',
                                py: 1.5,
                                borderColor: '#999',
                                color: '#333',
                                textTransform: 'none',
                                borderRadius: 2
                            }}
                        >
                            Abbrechen
                        </Button>
                    </Box>
                );

            case 'deleting':
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 15 }}>
                        <Box
                            component="img"
                            src={step.appIcon}
                            alt="Facebook"
                            sx={{
                                width: 70,
                                height: 70,
                                borderRadius: '16px',
                                opacity: 0.5,
                                animation: 'fadeOut 1s infinite',
                                '@keyframes fadeOut': {
                                    '0%': { opacity: 0.5 },
                                    '50%': { opacity: 0.1 },
                                    '100%': { opacity: 0.5 }
                                }
                            }}
                        />
                        <Typography sx={{ mt: 2, fontWeight: 'bold', fontSize: '16px', color: '#666' }}>
                            Wird gelöscht...
                        </Typography>
                    </Box>
                );

            case 'settings':
                return (
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, fontSize: '28px' }}>Einstellungen</Typography>
                        <Stack spacing={0}>
                            <Button
                                fullWidth
                                sx={{
                                    justifyContent: 'flex-start',
                                    py: 2,
                                    px: 2,
                                    color: '#333',
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    borderRadius: 0,
                                    bgcolor: '#fff',
                                    borderBottom: '1px solid #e0e0e0',
                                    boxShadow: '0 0 0 3px #9759d1',
                                    '&:hover': { bgcolor: '#f5f5f5' }
                                }}
                            >
                                <WifiIcon sx={{ mr: 2, color: '#007AFF' }} />
                                WLAN
                            </Button>
                            <Button fullWidth sx={{ justifyContent: 'flex-start', py: 2, px: 2, color: '#333', textTransform: 'none', fontSize: '16px', borderBottom: '1px solid #e0e0e0' }}>
                                <BluetoothIcon sx={{ mr: 2, color: '#007AFF' }} />
                                Bluetooth
                            </Button>
                            <Button fullWidth sx={{ justifyContent: 'flex-start', py: 2, px: 2, color: '#333', textTransform: 'none', fontSize: '16px', borderBottom: '1px solid #e0e0e0' }}>
                                <SignalCellularAltIcon sx={{ mr: 2, color: '#007AFF' }} />
                                Mobilfunk
                            </Button>
                        </Stack>
                    </Box>
                );

            case 'wifi_off':
                return (
                    <Box sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '28px' }}>WLAN</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2,
                            bgcolor: '#f5f5f5',
                            borderRadius: 2,
                            boxShadow: '0 0 0 3px #9759d1'
                        }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>WLAN</Typography>
                            <Switch />
                        </Box>
                        <Typography sx={{ mt: 2, fontSize: '13px', color: '#666', px: 1 }}>
                            Aktivieren Sie WLAN, um verfügbare Netzwerke zu sehen.
                        </Typography>
                    </Box>
                );

            case 'wifi_list':
                return (
                    <Box sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '28px' }}>WLAN</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: 2, mb: 3 }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>WLAN</Typography>
                            <Switch checked />
                        </Box>
                        <Typography sx={{ fontSize: '13px', color: '#666', mb: 2, px: 1, fontWeight: '600' }}>MEINE NETZWERKE</Typography>
                        <Stack spacing={0}>
                            {step.wifiNetworks?.map((network, idx) => (
                                <Button
                                    key={idx}
                                    fullWidth
                                    sx={{
                                        justifyContent: 'space-between',
                                        py: 2,
                                        px: 2,
                                        color: '#333',
                                        textTransform: 'none',
                                        fontSize: '16px',
                                        borderRadius: 0,
                                        bgcolor: network === step.highlightedElement ? '#e3f2fd' : '#fff',
                                        borderBottom: '1px solid #e0e0e0',
                                        boxShadow: network === step.highlightedElement ? '0 0 0 3px #9759d1' : 'none',
                                        '&:hover': { bgcolor: '#f5f5f5' }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <WifiIcon sx={{ mr: 2, fontSize: 20 }} />
                                        {network}
                                    </Box>
                                    <Typography sx={{ fontSize: '12px', color: '#666' }}>🔒</Typography>
                                </Button>
                            ))}
                        </Stack>
                    </Box>
                );

            case 'wifi_password':
                return (
                    <Box sx={{ p: 2, mt: 8 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                            Passwort eingeben
                        </Typography>
                        <Typography sx={{ fontSize: '14px', color: '#666', mb: 2, textAlign: 'center' }}>
                            Geben Sie das Passwort für "{step.networkName || 'MeinWLAN'}" ein
                        </Typography>
                        <TextField
                            fullWidth
                            type="password"
                            placeholder="Passwort"
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px',
                                    boxShadow: '0 0 0 3px #9759d1'
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                py: 1.5,
                                bgcolor: '#007AFF',
                                color: 'white',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                borderRadius: 2,
                                '&:hover': { bgcolor: '#0056b3' }
                            }}
                        >
                            Verbinden
                        </Button>
                    </Box>
                );

            case 'wifi_connecting':
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 15 }}>
                        <WifiIcon sx={{
                            fontSize: 70,
                            color: '#9759d1',
                            mb: 2,
                            animation: 'pulse 1.5s infinite',
                            '@keyframes pulse': {
                                '0%, 100%': { opacity: 1 },
                                '50%': { opacity: 0.4 }
                            }
                        }} />
                        <Typography sx={{ mt: 2, fontWeight: 'bold', fontSize: '16px', color: '#666' }}>
                            Verbinde mit {step.networkName}...
                        </Typography>
                    </Box>
                );

            case 'wifi_connected':
                return (
                    <Box sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '28px' }}>WLAN</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: 2, mb: 3 }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>WLAN</Typography>
                            <Switch checked />
                        </Box>
                        <Typography sx={{ fontSize: '13px', color: '#666', mb: 2, px: 1, fontWeight: '600' }}>MEINE NETZWERKE</Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2,
                            bgcolor: '#e8f5e9',
                            borderRadius: 2,
                            boxShadow: '0 0 0 3px #9759d1'
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <WifiIcon sx={{ mr: 2, color: '#2e7d32', fontSize: 20 }} />
                                <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>{step.networkName}</Typography>
                            </Box>
                            <CheckCircleIcon sx={{ color: '#2e7d32', fontSize: 24 }} />
                        </Box>
                        <Typography sx={{ mt: 2, fontSize: '13px', color: '#2e7d32', px: 1, fontWeight: '600' }}>
                            ✓ Verbunden
                        </Typography>
                    </Box>
                );

            case 'password_rules':
                return (
                    <Box sx={{ p: 2, mt: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                            Was macht ein Passwort sicher?
                        </Typography>
                        <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#e8f5e9', borderRadius: 2, boxShadow: '0 0 0 3px #9759d1' }}>
                                <Typography sx={{ fontSize: '24px', mr: 2 }}>🔤</Typography>
                                <Typography sx={{ fontSize: '14px' }}>Großbuchstaben (A-Z)</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                                <Typography sx={{ fontSize: '24px', mr: 2 }}>📝</Typography>
                                <Typography sx={{ fontSize: '14px' }}>Kleinbuchstaben (a-z)</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#fff3e0', borderRadius: 2 }}>
                                <Typography sx={{ fontSize: '24px', mr: 2 }}>🔢</Typography>
                                <Typography sx={{ fontSize: '14px' }}>Zahlen (0-9)</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#fce4ec', borderRadius: 2 }}>
                                <Typography sx={{ fontSize: '24px', mr: 2 }}>🔣</Typography>
                                <Typography sx={{ fontSize: '14px' }}>Sonderzeichen (!@#$%)</Typography>
                            </Box>
                        </Stack>
                    </Box>
                );

            case 'password_input':
                return (
                    <Box sx={{ p: 2, mt: 6 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                            Neues Passwort
                        </Typography>
                        <TextField
                            fullWidth
                            type="password"
                            placeholder="••••••••••••"
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px',
                                    boxShadow: '0 0 0 3px #9759d1'
                                }
                            }}
                        />
                        <Typography sx={{ fontSize: '13px', color: '#666', textAlign: 'center' }}>
                            Mindestens 12 Zeichen lang
                        </Typography>
                    </Box>
                );

            case 'password_confirm':
                return (
                    <Box sx={{ p: 2, mt: 6 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                            Passwort wiederholen
                        </Typography>
                        <TextField
                            fullWidth
                            type="password"
                            placeholder="••••••••••••"
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px',
                                    boxShadow: '0 0 0 3px #9759d1'
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                py: 1.5,
                                bgcolor: '#007AFF',
                                color: 'white',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                borderRadius: 2,
                                '&:hover': { bgcolor: '#0056b3' }
                            }}
                        >
                            Speichern
                        </Button>
                    </Box>
                );

            case 'password_strength':
                return (
                    <Box sx={{ p: 2, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '14px', color: '#666', mb: 2 }}>Passwort-Stärke:</Typography>
                        <Box sx={{
                            width: '100%',
                            height: '8px',
                            bgcolor: '#e0e0e0',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            mb: 3
                        }}>
                            <Box sx={{
                                height: '100%',
                                width: '100%',
                                bgcolor: step.strengthLevel === 'strong' ? '#2e7d32' : step.strengthLevel === 'medium' ? '#f57c00' : '#d32f2f',
                                transition: 'width 0.3s ease'
                            }} />
                        </Box>
                        <Typography sx={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: step.strengthLevel === 'strong' ? '#2e7d32' : step.strengthLevel === 'medium' ? '#f57c00' : '#d32f2f'
                        }}>
                            {step.strengthLevel === 'strong' ? '✓ Sehr sicher!' : step.strengthLevel === 'medium' ? '⚠ Mittel' : '✗ Schwach'}
                        </Typography>
                    </Box>
                );

            case 'password_saved':
                return (
                    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 12 }}>
                        <Typography sx={{ fontSize: '60px', mb: 2 }}>✓</Typography>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '20px', mb: 2, textAlign: 'center', color: '#2e7d32' }}>
                            Passwort gespeichert!
                        </Typography>
                        <Typography sx={{ fontSize: '14px', color: '#666', textAlign: 'center', lineHeight: 1.6 }}>
                            Dein Konto ist jetzt besser geschützt. Vergiss dein Passwort nicht oder schreib es an einem sicheren Ort auf!
                        </Typography>
                    </Box>
                );

            case 'password_login_mask':
                return (
                    <Box sx={{ p: 2, mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center', color: '#333' }}>
                            {step.isRegistration ? 'Registrieren' : 'Anmelden'}
                        </Typography>
                        <TextField
                            fullWidth
                            label="E-Mail"
                            placeholder="dein@beispiel.de"
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px'
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="Passwort"
                            placeholder="••••••••"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px'
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 3,
                                py: 1.5,
                                bgcolor: '#007AFF',
                                textTransform: 'none',
                                borderRadius: '8px'
                            }}
                        >
                            {step.isRegistration ? 'Registrieren' : 'Anmelden'}
                        </Button>
                    </Box>
                );

            case 'password_tester':
                const passwordStrength = calculatePasswordStrength(testPassword);
                const passwordReqs = checkPasswordRequirements(testPassword);
                
                return (
                    <Box sx={{ p: 2, mt: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center', fontSize: '18px', color: '#333' }}>
                            Passwort-Tester
                        </Typography>

                        {/* Input Feld mit Auge */}
                        <TextField
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Tippe hier ein..."
                            value={testPassword}
                            onChange={(e) => setTestPassword(e.target.value)}
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    fontSize: '16px'
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            onClick={() => setShowPassword(!showPassword)}
                                            sx={{ minWidth: 'auto', p: 0.5, color: '#9759d1' }}
                                            title="Passwort zeigen/verstecken"
                                        >
                                            {showPassword ? <VisibilityOffIcon sx={{ fontSize: 24 }} /> : <VisibilityIcon sx={{ fontSize: 24 }} />}
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Stärke-Balken */}
                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666' }}>
                                    Passwort-Stärke
                                </Typography>
                                <Typography sx={{ 
                                    fontSize: '14px', 
                                    fontWeight: 'bold',
                                    color: passwordStrength.color 
                                }}>
                                    {passwordStrength.level === 'none' ? '—' : passwordStrength.level === 'weak' ? '❌ Schwach' : passwordStrength.level === 'medium' ? '⚠️ Mittel' : passwordStrength.level === 'good' ? '👍 Gut' : '✓ Sehr sicher!'}
                                </Typography>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                height: '12px',
                                bgcolor: '#e0e0e0',
                                borderRadius: '5px',
                                overflow: 'hidden'
                            }}>
                                <Box sx={{
                                    height: '100%',
                                    width: `${passwordStrength.percent}%`,
                                    bgcolor: passwordStrength.color,
                                    transition: 'width 0.2s ease'
                                }} />
                            </Box>
                        </Box>

                        {/* Crack-Zeit mit Empfehlung */}
                        {testPassword && (
                            <Box sx={{ p: 2, bgcolor: passwordStrength.level === 'strong' ? '#e8f5e9' : '#fff3e0', borderRadius: 1.5, mb: 3, borderLeft: `4px solid ${passwordStrength.color}` }}>
                                <Typography sx={{ fontSize: '14px', color: '#666', mb: 1 }}>
                                    Ein Computer braucht: <strong>{calculateCrackTime(passwordStrength).time}</strong> zum lösen.
                                </Typography>
                            </Box>
                        )}

                        {/* Anforderungen */}
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', mb: 2, color: '#333' }}>
                            Anforderungen:
                        </Typography>
                        <Stack spacing={1.5}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Typography sx={{ fontSize: '18px' }}>
                                    {testPassword.length >= 8 ? '✓' : '❌'}
                                </Typography>
                                <Typography sx={{ fontSize: '14px', color: testPassword.length >= 8 ? '#2e7d32' : '#d32f2f' }}>
                                    Mindestens 8 Zeichen
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Typography sx={{ fontSize: '18px' }}>
                                    {passwordReqs.hasNumber ? '✓' : '❌'}
                                </Typography>
                                <Typography sx={{ fontSize: '14px', color: passwordReqs.hasNumber ? '#2e7d32' : '#d32f2f' }}>
                                    Eine Zahl (0-9)
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Typography sx={{ fontSize: '18px' }}>
                                    {passwordReqs.hasSpecial ? '✓' : '❌'}
                                </Typography>
                                <Typography sx={{ fontSize: '14px', color: passwordReqs.hasSpecial ? '#2e7d32' : '#d32f2f' }}>
                                    Ein Sonderzeichen (!@#$%)
                                </Typography>
                            </Box>
                        </Stack>

                        {/* Tipp */}
                        <Box sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 1.5, mt: 3 }}>
                            <Typography sx={{ fontSize: '13px', color: '#1565c0', lineHeight: 1.6 }}>
                                💡 Tipp: Versuche "Sonne!99" oder "Katze2024!"
                            </Typography>
                        </Box>
                    </Box>
                );

            case 'password_eye_symbol':
                return (
                    <Box sx={{ p: 2, mt: 4 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                            Das Auge-Symbol
                        </Typography>
                        <TextField
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            defaultValue="Sonne!99"
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px',
                                    boxShadow: '0 0 0 3px #9759d1'
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            onClick={() => setShowPassword(!showPassword)}
                                            sx={{ minWidth: 'auto', p: 0 }}
                                        >
                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                            <Typography sx={{ fontSize: '13px', color: '#1565c0', lineHeight: 1.6 }}>
                                👁️ Klick auf das Auge, um dein Passwort zu sehen oder zu verstecken. Das hilft gegen Tippfehler!
                            </Typography>
                        </Box>
                    </Box>
                );

            case 'password_final_success':
                return (
                    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 12 }}>
                        <Typography sx={{ fontSize: '60px', mb: 2 }}>✓</Typography>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '20px', mb: 2, textAlign: 'center', color: '#2e7d32' }}>
                            Du bist ein Passwort-Profi!
                        </Typography>
                        <Typography sx={{ fontSize: '13px', color: '#666', textAlign: 'center', lineHeight: 1.6 }}>
                            Du weißt jetzt, wie sichere Passwörter funktionieren. Mindestens 8 Zeichen mit Großbuchstaben, Zahlen und Sonderzeichen!
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
                        disabled={currentStep === tutorial.steps.length - 1 || (step.screenType === 'password_tester' && !isGoodPassword)}
                        fullWidth
                        sx={{ bgcolor: '#9759d1', '&:hover': { bgcolor: '#7f19d2' }, '&:disabled': { bgcolor: '#ccc' } }}
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
