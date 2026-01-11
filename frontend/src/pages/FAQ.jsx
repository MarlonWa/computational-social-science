import Constants from '../constants/constants.js';
import { Header } from '../component/Header.jsx';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function FAQ() {
    const faqData = [
        {
            question: "Ich habe mein Passwort vergessen. Was soll ich tun?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu est efficitur, ornare sem sit amet, tristique diam. Maecenas ut."
        },
        {
            question: "Mein Internet funktioniert nicht richtig. Wie kann ich das beheben?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id odio sed nunc ullamcorper tempus. Maecenas molestie nisl pretium sem."
        }
    ];
    return (
        <>
            <Header/>

            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 'bold', fontSize: { xs: '1.8rem', sm: '2.5rem' } }}>
                    Häufig gestellte Fragen
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {faqData.map((item, index) => (
                        <Box key={index} sx={{ 
                            p: 3, 
                            borderRadius: 2, 
                            bgcolor: Constants.neutral_light_darker,
                            boxShadow: '0 2px 8px ' + Constants.shadow_black,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: '0 4px 12px ' + Constants.shadow_black,
                            }
                        }}>
                            <Typography sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem' }, fontWeight: 600, mb: 1.5 }}>
                                {item.question}
                            </Typography>
                            <Typography sx={{ fontSize: { xs: '1.45rem', sm: '1.7rem' }, lineHeight: 1.6, color: Constants.text_color_dark_grey }}>
                                {item.answer}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </>
    );
}