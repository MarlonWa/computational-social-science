import { Header } from '../component/Header.jsx'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightGreen } from '@mui/material/colors';
import Typography from '@mui/material/Typography'
import { Hilfe_Back_Home } from '../component/Hilfe_Back_Home.jsx';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { Stack } from '@mui/material';
const accentColor = '#9759d1ff';

//TODO: add FAQ
const theme = createTheme({
palette: {
  mygreen: {
    light: lightGreen[300],
    main: lightGreen[500],
    dark: lightGreen[700],
    contrastText: "white",
  },
},
});

export function Hilfe_Request_New() {
  const { user_id } = useParams();

  //breakpoints by screen size
  const isXs = useMediaQuery("(max-height: 600px)");      // smol
  const isSm = useMediaQuery("(min-height: 601px) and (max-height: 800px)");  // mid

  // main textfield row counts
/*   const minRows = isXs ? 6 : isSm ? 10 : 16;
  const maxRows = isXs ? 6 : isSm ? 15 : 20; */

//adjusted row counts because of bigger font sizes
  const minRows = isXs ? 4 : isSm ? 6 : 9;
  const maxRows = isXs ? 4 : isSm ? 9 : 11;

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header header_title={"Anfrage erstellen"}/>

        <Container maxWidth="lg">
          <Typography 
          variant="h3"
          noWrap
          sx={{ my: 3, fontSize: { xs: '2.3rem', sm: '2.8rem' }, fontWeight: '600' }}
          >
            Anfrage stellen: </Typography>

          <TextField
            id="outlined-multiline-static"
            label={"Beschreiben Sie hier Ihr Problem"}
            fullWidth
            slotProps={{
              inputLabel: {
                sx: { color: '#292929ff', fontSize: { xs: '1.7rem', sm: '2.2rem' }}
              },
              input: {
                sx: { fontSize: { xs: '1.6rem', sm: '2.1rem' } }
              }
            }}
            multiline
            minRows={minRows}
            maxRows={maxRows}
            />

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            sx={{ 
              my: 2,
              alignItems: { xs: 'center', sm: 'flex-start' }
            }}
          >
            <Hilfe_Back_Home user_id={user_id} />

            <Button
              component={Link}
              to={`/hilfe/${user_id}`} //TODO: this button should send the stuff and then redirect
              variant="contained"
                /* startIcon={<ChatIcon />} */
                sx={{
                    flex: 1,
                    p: 1,
                    fontSize: { xs: '1.6rem', sm: '2.2rem', fontWeight: '600' },
                    backgroundColor: accentColor,
                    '&:hover': {
                        backgroundColor: '#7f19d2',
                        color: 'white'
                    }
                }}
            >
                absenden
            </Button>
        </Stack>
        </Container>
      </ThemeProvider>
    </>
  )
}
