import ResponsiveAppBar from '../component/Header.jsx'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightGreen } from '@mui/material/colors';
import Typography from '@mui/material/Typography'

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

function Request() {
  //breakpoints by screen size
  const isXs = useMediaQuery("(max-height: 600px)");      // smol
  const isSm = useMediaQuery("(min-height: 601px) and (max-height: 800px)");  // mid

  // main textfield row counts
  const minRows = isXs ? 6 : isSm ? 10 : 16;
  const maxRows = isXs ? 6 : isSm ? 15 : 20;

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="100%">
          <ResponsiveAppBar/>
        </Container>

        <Container maxWidth="lg">
          <Typography 
          variant="h5"
          noWrap
          sx={{ my: 3 }}
          >
            Stellen Sie hier eine neue Anfrage :)</Typography>

          <TextField
            id="outlined-multiline-static"
            label={"Beschreiben Sie hier Ihr Problem..."}
            fullWidth
            slotProps={{inputLabel: {
              sx: { color: '#292929ff', fontSize: "1.3rem"}
            }}}
            multiline
            minRows={minRows}
            maxRows={maxRows}
            />
          <Box mt={6}>
            <Button variant="contained" size='large' color='mygreen' sx={{
              fontSize: "1.3rem",
              textTransform: "none",
            }}>
              ABSENDEN
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Request
