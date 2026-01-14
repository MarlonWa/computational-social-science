import Constants from '../constants/constants.js';
import React from 'react';
import { Header } from '../component/Header.jsx';
import { PhoneTutorial } from '../component/PhoneTutorial.jsx';
import { appInstallationTutorial, appUninstallTutorial, wifiConnectionTutorial, passwordTutorial } from '../data/tutorials.js';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings'; // 1. Betriebssystem
import UpdateIcon from '@mui/icons-material/Update'; // 2. Update
import LanguageIcon from '@mui/icons-material/Language'; // 3. Browser
import HomeIcon from '@mui/icons-material/Home'; // 4. Homepage
import CookieIcon from '@mui/icons-material/Cookie'; // 5. Cookies
import GetAppIcon from '@mui/icons-material/GetApp'; // 6. Downloads
import EmailIcon from '@mui/icons-material/Email'; // 7. E-Mail
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // 8. Account
import CategoryIcon from '@mui/icons-material/Category'; // 9. Icon
import RouterIcon from '@mui/icons-material/Router'; // 10. Hardware (Router/Gerät)
import SaveIcon from '@mui/icons-material/Save'; // 11. Externer Speicher
import UsbIcon from '@mui/icons-material/Usb'; // 12. USB Stick
import SdCardIcon from '@mui/icons-material/SdCard'; // 13. MB/GB
import LocationOnIcon from '@mui/icons-material/LocationOn'; // 14. GPS
import BluetoothIcon from '@mui/icons-material/Bluetooth'; // 15. Bluetooth
import SmartToyIcon from '@mui/icons-material/SmartToy'; // 16. KI
import CloudQueueIcon from '@mui/icons-material/CloudQueue'; // 17. Cloud
import LoginIcon from '@mui/icons-material/Login'; // 18. Login
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // 19. Registrieren
import AppsIcon from '@mui/icons-material/Apps'; // 20. App
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import WifiIcon from '@mui/icons-material/Wifi';
import DeleteIcon from '@mui/icons-material/Delete';

const fullQuizQuestions = [
    { q: "Was ist ein 'Browser'?", options: ["Ein Programm zum Surfen", "Ein spezielles Ladekabel", "Ein Teil des Bildschirms"], answer: 0, info: "Richtig! Chrome, Safari oder Firefox sind Browser." },
    { q: "Was macht man bei einem 'Download'?", options: ["Daten ins Internet hochladen", "Das Handy ausschalten", "Daten auf das eigene Gerät kopieren"], answer: 2, info: "Genau! Du holst dir eine Datei aus dem Netz auf dein Gerät." },
    { q: "Wofür steht 'GPS'?", options: ["Großer Post-Service", "Standortbestimmung per Satellit", "Geheimes Passwort-System"], answer: 1, info: "Richtig! GPS hilft dir bei der Navigation auf Karten." },
    { q: "Was bedeutet 'Cloud'?", options: ["Lokaler Speicher im Handy", "Online-Speicher im Internet", "Eine neue Handy-App"], answer: 1, info: "Cloud = Online-Speicher. Du kannst von überall darauf zugreifen." },
    { q: "Wozu dient ein 'Update'?", options: ["Zum Ausschalten des Geräts", "Zum Verbessern von Sicherheit und Funktionen", "Zum Löschen von Apps"], answer: 1, info: "Updates schließen Sicherheitslücken und bringen neue Features." }
];

export function FAQ() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [fontSizeMultiplier, setFontSizeMultiplier] = React.useState(1);
    const [expandedIndex, setExpandedIndex] = React.useState(null);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [showScore, setShowScore] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [selectedAnswer, setSelectedAnswer] = React.useState(null);
    const [isCorrect, setIsCorrect] = React.useState(null);

    const [quizSet, setQuizSet] = React.useState([]);
    const [activeTutorial, setActiveTutorial] = React.useState(null);

    const pickRandomQuiz = React.useCallback(() => {
        const shuffled = [...fullQuizQuestions].sort(() => Math.random() - 0.5);
        setQuizSet(shuffled.slice(0, 3));
        setCurrentQuestion(0);
        setShowScore(false);
        setScore(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
    }, []);

    React.useEffect(() => {
        pickRandomQuiz();
    }, [pickRandomQuiz]);

    const handleAnswerOptionClick = (index) => {
        setSelectedAnswer(index);
        const correct = index === quizSet[currentQuestion].answer;
        setIsCorrect(correct);
        if (correct) setScore((prev) => prev + 1);

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < quizSet.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedAnswer(null);
                setIsCorrect(null);
            } else {
                setShowScore(true);
            }
        }, 3500);
    };

    // Funktionen zum Ändern der Schriftgröße
    const increaseFontSize = () => setFontSizeMultiplier(prev => Math.min(prev + 0.1, 1.5)); // Max 150%
    const decreaseFontSize = () => setFontSizeMultiplier(prev => Math.max(prev - 0.1, 0.8)); // Min 80%

    const wissenData = [
    {
        id: 1,
        topic: "Betriebssystem",
        icon: <SettingsIcon sx={{ color: '#1976d2' }} />,
        question: "Was ist eigentlich ein Betriebssystem?",
        answer: "Das Betriebssystem ist das Hauptprogramm deines Geräts. Es verwaltet alle anderen Apps und sorgt dafür, dass Hardware und Software zusammenarbeiten. Beispiele für Betriebssysteme sind Windows, macOS oder auch Android und iOS bei Smartphones."
    },
    {
        id: 2,
        topic: "Update",
        icon: <UpdateIcon sx={{ color: '#2e7d32' }} />,
        question: "Warum muss ich ständig Updates machen?",
        answer: "Updates verbessern die Sicherheit, fügen oft neue Funktionen hinzu oder beheben Fehler im Programm. So läuft dein Gerät immer optimal und sicher und geben Menschen, die Schaden anrichten wollen keine Chance. "
    },
    {
        id: 3,
        topic: "Browser",
        icon: <LanguageIcon sx={{ color: '#0288d1' }} />,
        question: "Wozu brauche ich einen Browser?",
        answer: "Ein Browser (wie Chrome, Safari oder Firefox) ist dein Zugang zum Internet. Mit ihm kannst du Webseiten aufrufen und im Netz surfen um Inhalte wie Nachrichten zu lesen oder online einzukaufen. Manche Dinge wie WhatsApp oder andere Apps funktioneren auch ohne Browser da sie das Internet im Hintergrund benutzen."
    },
    {
        id: 4,
        topic: "Homepage",
        icon: <HomeIcon sx={{ color: '#5d4037' }} />,
        question: "Was genau ist eine Homepage?",
        answer: "Das ist die Startseite eines Internetauftritts. Oft wird der Begriff auch für die gesamte Webseite eines Unternehmens oder einer Person verwendet."
    },
    {
        id: 5,
        topic: "Cookies",
        icon: <CookieIcon sx={{ color: '#ed6c02' }} />,
        question: "Was sind diese Cookies, die ich überall bestätigen muss?",
        answer: "Cookies sind kleine Textdateien, die Webseiten auf deinem Gerät speichern. Sie merken sich z.B. deine Spracheinstellungen oder was du im Warenkorb hast."
    },
    {
        id: 6,
        topic: "Downloads",
        icon: <GetAppIcon sx={{ color: '#455a64' }} />,
        question: "Was passiert bei einem Download?",
        answer: "Beim Download (Herunterladen) kopierst du eine Datei (z.B. ein Foto oder ein Dokument) aus dem Internet direkt auf dein eigenes Gerät, um sie dort zu speichern."
    },
    {
        id: 7,
        topic: "E-Mail",
        icon: <EmailIcon sx={{ color: '#d32f2f' }} />,
        question: "Wie funktioniert eine E-Mail?",
        answer: "Eine E-Mail ist ein digitaler Brief. Du brauchst eine eigene Adresse und ein Postfach bei einem Anbieter, um Nachrichten weltweit in Sekunden zu verschicken."
    },
    {
        id: 8,
        topic: "Account",
        icon: <AccountCircleIcon sx={{ color: '#1565c0' }} />,
        question: "Was ist ein Account oder Konto?",
        answer: "Ein Account ist dein persönlicher Zugang zu einem Dienst. Er schützt deine Daten und sorgt dafür, dass nur du Zugriff hast – meistens mit Nutzername und Passwort."
    },
    {
        id: 9,
        topic: "Icon",
        icon: <CategoryIcon sx={{ color: '#7b1fa2' }} />,
        question: "Was sind diese kleinen Bildchen (Icons)?",
        answer: "Icons sind Symbole, die als Schaltflächen dienen. Ein Mülleimer-Icon steht zum Beispiel fast immer für 'Löschen', eine Lupe für 'Suchen'."
    },
    {
        id: 10,
        topic: "Hardware",
        icon: <RouterIcon sx={{ color: '#fbc02d' }} />,
        question: "Was versteht man unter Hardware?",
        answer: "Hardware ist alles an deinem Gerät, was du anfassen kannst: Der Bildschirm, das Gehäuse, die Festplatte, der Akku oder auch Kabel und Stecker."
    },
    {
        id: 11,
        topic: "Externer Speicher",
        icon: <SaveIcon sx={{ color: '#795548' }} />,
        question: "Was ist externer Speicher?",
        answer: "Das ist Speicherplatz, der sich nicht fest im Gerät befindet, sondern zusätzlich angeschlossen wird (z.B. SD-Karten oder externe Festplatten), um mehr Platz für Fotos oder Backups zu haben."
    },
    {
        id: 12,
        topic: "USB Stick",
        icon: <UsbIcon sx={{ color: '#607d8b' }} />,
        question: "Wofür brauche ich einen USB-Stick?",
        answer: "Ein kleiner, tragbarer Speicher, den man in den Computer steckt. Ideal, um Dokumente oder Bilder von einem Gerät auf ein anderes zu übertragen, ohne das Internet zu nutzen."
    },
    {
        id: 13,
        topic: "Megabyte & Gigabyte",
        icon: <SdCardIcon sx={{ color: '#fbc02d' }} />,
        question: "Was bedeuten MB und GB?",
        answer: "Das sind Maßeinheiten für digitalen Speicherplatz und die Größe von Daten. 1.000 Megabyte (MB) sind etwa 1 Gigabyte (GB). Je mehr GB dein Handy oder dein Computer hat, desto mehr Fotos, Videos und Apps kannst du speichern."
    },
    {
        id: 14,
        topic: "GPS",
        icon: <LocationOnIcon sx={{ color: '#e91e63' }} />,
        question: "Wie weiß mein Handy, wo ich bin?",
        answer: "Dein Handy nutzt das Satelliten-basierte GPS. GPS steht für Global Positioning System. Satelliten im Weltraum senden Signale an dein Handy, damit Apps wie Google Maps deinen Standort punktgenau auf der Karte anzeigen können."
    },
    {
        id: 15,
        topic: "Bluetooth",
        icon: <BluetoothIcon sx={{ color: '#303f9f' }} />,
        question: "Wofür nutzt man Bluetooth?",
        answer: "Das ist eine Funkverbindung für kurze Strecken. Damit verbindest du dein Handy kabellos mit Kopfhörern, Lautsprechern oder der Freisprecheinrichtung im Auto."
    },
    {
        id: 16,
        topic: "Künstliche Intelligenz",
        icon: <SmartToyIcon sx={{ color: '#9c27b0' }} />,
        question: "Was genau ist KI?",
        answer: "KI (Künstliche Intelligenz) sind Computerprogramme, die Probleme lösen können, für die man früher menschliche Intelligenz brauchte. KI kann mitdenken und dazulernen so können sie Menschen bei Ihrer Arbeit helfen, z.B Texte verfassen, Fragen beantworten oder auch Sprachen übersetzen."
    },
    {
        id: 17,
        topic: "Cloud",
        icon: <CloudQueueIcon sx={{ color: '#03a9f4' }} />,
        question: "Was ist eigentlich 'die Cloud'?",
        answer: "Die Cloud ist ein Speicherplatz im Internet. Deine Daten liegen auf sicheren Computern von Anbietern. So kannst du von jedem Gerät aus auf deine Fotos zugreifen, solange du Internet hast. Ein anderer Vorteil ist, dass Daten nicht so leicht verloren gehen."
    },
    {
        id: 18,
        topic: "Login",
        icon: <LoginIcon sx={{ color: '#2e7d32' }} />,
        question: "Was passiert beim Login?",
        answer: "Beim Login (Anmelden) gibst du deine Zugangsdaten ein, um zu beweisen, dass du der Besitzer des Kontos bist und Zugriff auf deine persönlichen Daten haben darfst."
    },
    {
        id: 19,
        topic: "Registrieren",
        icon: <PersonAddIcon sx={{ color: '#00796b' }} />,
        question: "Was bedeutet registrieren?",
        answer: "Das ist der Vorgang, wenn du dich zum ersten Mal bei einem Dienst (z.B. Facebook oder Amazon) anmeldest und ein neues Konto mit deinen Daten erstellst."
    },
    {
        id: 20,
        topic: "App",
        icon: <AppsIcon sx={{ color: '#3f51b5' }} />,
        question: "Was ist eine App?",
        answer: "Kurz für 'Application' (Anwendung). Das sind Programme auf deinem Smartphone, die für einen bestimmten Zweck gemacht sind – zum Beispiel zum Chatten, Wetter schauen oder Spiele spielen."
    },
    
];

    // Die Filter-Logik: Er sucht im topic, question und answer
    const filteredData = wissenData.filter((item) => 
        item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const praxisThemen = [
        {
            id: 'app-installation',
            title: 'Apps installieren',
            description: 'Schritt für Schritt neue Programme finden.',
            icon: <GetAppIcon sx={{ fontSize: 40, color: '#9759d1' }} />,
            data: appInstallationTutorial
        },
        {
            id: 'password-security',
            title: 'Sicheres Passwort',
            description: 'Lerne, wie du deine Konten schützt.',
            icon: <LockIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
            data: passwordTutorial  // NEU: Eigenes Tutorial
        },
        {
            id: 'wlan',
            title: 'WLAN verbinden',
            description: 'So kommst du sicher ins Internet.',
            icon: <WifiIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
            data: wifiConnectionTutorial  // NEU: Eigenes Tutorial!
        },
        {
            id: 'app-delete',
            title: 'App deinstallieren',
            description: 'So löschst du Programme von deinem Gerät.',
            icon: <DeleteIcon sx={{ fontSize: 40, color: '#d32f2f' }} />,
            data: appUninstallTutorial  // NEU: Eigenes Tutorial!
        }
    ];

    return (
        <>
            <Header/>
            <Container maxWidth="md" sx={{ py: 4 }}>
                {/* HEADER MIT SCHRIFTGRÖSSEN-REGLER */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#1976d2', fontSize: `${2.5 * fontSizeMultiplier}rem` }}>
                            Digital-Wissen
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontSize: `${1 * fontSizeMultiplier}rem` }}>
                            Die wichtigsten Begriffe einfach erklärt.
                        </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f0f4f8', borderRadius: 2, p: 0.5 }}>
                        <ZoomInIcon sx={{ ml: 1, color: 'text.secondary' }} />
                        <IconButton onClick={decreaseFontSize} title="Schrift verkleinern">
                            <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ fontWeight: 'bold', minWidth: '40px', textAlign: 'center' }}>
                            {Math.round(fontSizeMultiplier * 100)}%
                        </Typography>
                        <IconButton onClick={increaseFontSize} title="Schrift vergrößern">
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Box>
                
                {/* SUCHLEISTE */}
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Nach Begriffen suchen... (z.B. Cloud, Passwort, Internet)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mb: 4, bgcolor: '#fff', borderRadius: 1 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="primary" />
                            </InputAdornment>
                        ),
                        style: { fontSize: `${1 * fontSizeMultiplier}rem` }
                    }}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <Accordion 
                                key={index} 
                                expanded={expandedIndex === index}
                                onChange={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                sx={{
                                    borderRadius: '8px !important', 
                                    mb: 1,
                                    '&:before': { display: 'none' },
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                    border: '1px solid #e0e0e0'
                                }}
                            >
                                <AccordionSummary 
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                        {item.icon}
                                        <Box sx={{ flex: 1 }}>
                                            <Typography sx={{ fontSize: `${0.75 * fontSizeMultiplier}rem`, fontWeight: 'bold', color: '#1976d2', textTransform: 'uppercase' }}>
                                                {item.id}. {item.topic}
                                            </Typography>
                                            <Typography sx={{ fontSize: `${1.1 * fontSizeMultiplier}rem`, fontWeight: 600 }}>
                                                {item.question}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ fontSize: `${0.75 * fontSizeMultiplier}rem`, color: '#666', fontWeight: '500', mr: 1 }}>
                                            {expandedIndex === index ? "zuklappen" : "aufklappen"}
                                        </Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails sx={{ bgcolor: '#fafafa', borderTop: '1px solid #eee' }}>
                                    <Typography sx={{ 
                                        lineHeight: 1.7, 
                                        color: '#444',
                                        fontSize: `${1.1 * fontSizeMultiplier}rem`
                                    }}>
                                        {item.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    ) : (
                        <Typography sx={{ textAlign: 'center', mt: 4, color: 'text.secondary', fontSize: `${1.1 * fontSizeMultiplier}rem` }}>
                            Keine Ergebnisse für "{searchTerm}" gefunden.
                        </Typography>
                    )}
                </Box>

                {/* QUIZ SECTION */}
                <Box
                    sx={{
                        mt: 8,
                        p: { xs: 3, sm: 4 },
                        bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
                        borderRadius: 4,
                        textAlign: 'center',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(151,89,209,0.18)'
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 2,
                            fontWeight: 'bold',
                            fontSize: `${1.8 * fontSizeMultiplier}rem`,
                            color: '#2c2c2c'
                        }}
                    >
                        🧠 Kleiner Wissens-Check
                    </Typography>

                    {showScore ? (
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{ mb: 2, fontSize: `${1.5 * fontSizeMultiplier}rem`, color: '#2e7d32' }}
                            >
                                Super! Du hast {score} von {quizSet.length} Punkten erreicht.
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={pickRandomQuiz}
                                sx={{
                                    px: 3,
                                    py: 1.2,
                                    backgroundColor: '#9759d1',
                                    '&:hover': { backgroundColor: '#7f19d2' }
                                }}
                            >
                                Nochmal versuchen
                            </Button>
                        </Box>
                    ) : (
                        quizSet.length > 0 && (
                            <Box
                                sx={{
                                    p: { xs: 2, sm: 3 },
                                    bgcolor: '#ffffff',
                                    borderRadius: 3,
                                    boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                                    border: '1px solid #e0e0e0',
                                    backgroundImage: 'radial-gradient(circle at 10% 10%, rgba(151,89,209,0.08), transparent 40%)'
                                }}
                            >
                                <Typography
                                    sx={{
                                        mb: 3,
                                        fontWeight: 700,
                                        fontSize: `${1.3 * fontSizeMultiplier}rem`,
                                        color: '#1f1f1f'
                                    }}
                                >
                                    {quizSet[currentQuestion].q}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                    {quizSet[currentQuestion].options.map((option, index) => {
                                        const isSelected = selectedAnswer === index;
                                        const isRight = isSelected && isCorrect;
                                        const isWrong = isSelected && !isCorrect;
                                        const bg = isRight ? '#e8f5e9' : isWrong ? '#ffebee' : '#f9f9fb';
                                        const border = isRight ? '#2e7d32' : isWrong ? '#c62828' : '#b8b8c2';
                                        const color = isRight ? '#1b5e20' : isWrong ? '#b71c1c' : '#2d2d2d';
                                        return (
                                            <Button
                                                key={index}
                                                variant="outlined"
                                                onClick={() => handleAnswerOptionClick(index)}
                                                sx={{
                                                    justifyContent: 'flex-start',
                                                    p: 2,
                                                    fontSize: `${1.05 * fontSizeMultiplier}rem`,
                                                    fontWeight: 700,
                                                    bgcolor: bg,
                                                    borderColor: border,
                                                    color,
                                                    textTransform: 'none',
                                                    borderWidth: 2,
                                                    '&:hover': { borderColor: '#9759d1', backgroundColor: '#f5f0fb' }
                                                }}
                                                disabled={selectedAnswer !== null}
                                            >
                                                {option}
                                            </Button>
                                        );
                                    })}
                                </Box>
                                {selectedAnswer !== null && (
                                    <Typography
                                        sx={{
                                            mt: 2,
                                            color: isCorrect ? '#2e7d32' : '#c62828',
                                            fontWeight: 'bold',
                                            fontSize: `${1 * fontSizeMultiplier}rem`
                                        }}
                                    >
                                        {quizSet[currentQuestion].info}
                                    </Typography>
                                )}
                            </Box>
                        )
                    )}
                </Box>

                {/* TUTORIALS SECTION */}
                <Divider sx={{ my: 8 }} />
                
                <Typography variant="h3" component="h2" sx={{ mb: 4, fontWeight: 'bold', fontSize: `${2 * fontSizeMultiplier}rem` }}>
                    Digitale Hilfe: Können
                </Typography>

                {!activeTutorial ? (
                    <Grid container spacing={3}>
                        {praxisThemen.map((thema) => (
                            <Grid item xs={12} sm={6} md={4} key={thema.id}>
                                <Card sx={{
                                    borderRadius: 3,
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                                        backgroundColor: '#f9f9ff'
                                    },
                                    border: '1px solid #e0e0e0'
                                }}>
                                    <CardActionArea onClick={() => setActiveTutorial(thema)} sx={{ p: 3 }}>
                                        <CardContent sx={{ textAlign: 'center' }}>
                                            {thema.icon}
                                            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold', fontSize: `${1.3 * fontSizeMultiplier}rem`, color: '#333' }}>
                                                {thema.title}
                                            </Typography>
                                            <Typography sx={{ color: 'text.secondary', mt: 1, fontSize: `${1 * fontSizeMultiplier}rem` }}>
                                                {thema.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => setActiveTutorial(null)}
                            sx={{ mb: 3, color: '#9759d1', fontWeight: '600' }}
                        >
                            Zurück zur Übersicht
                        </Button>

                        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', fontSize: `${1.8 * fontSizeMultiplier}rem` }}>
                            Übung: {activeTutorial.title}
                        </Typography>

                        <PhoneTutorial tutorial={activeTutorial.data} />
                    </Box>
                )}
            </Container>
        </>
    );
}