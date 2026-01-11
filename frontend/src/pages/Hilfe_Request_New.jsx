import Constants from '../constants/constants.js';
import { Header } from '../component/Header.jsx'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { Hilfe_Back_Home } from '../component/Hilfe_Back_Home.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useState } from 'react';

//TODO: add FAQ

export function Hilfe_Request_New() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [textError, setTextError] = useState(false);
  const [textErrorMessage, setTextErrorMessage] = useState('');

  //breakpoints by screen size
  const isXs = useMediaQuery("(max-height: 600px)");      // smol
  const isSm = useMediaQuery("(min-height: 601px) and (max-height: 800px)");  // mid

  // main textfield row counts
  //  const minRows = isXs ? 6 : isSm ? 10 : 16;
  //  const maxRows = isXs ? 6 : isSm ? 15 : 20;

  //adjusted row counts because of bigger font sizes
  const minRows = isXs ? 2 : isSm ? 4 : 7;
  const maxRows = isXs ? 3 : isSm ? 8 : 10; //who has this small screen anyway

  function validateInputs() {
    let valid = true;
    if (!title || title.trim() === '') {
      setTitleError(true);
      setTitleErrorMessage('Bitte geben Sie einen Titel ein.');
      valid = false;
    } else {
      setTitleError(false);
      setTitleErrorMessage('');
    }

    if (!text || text.trim() === '') {
      setTextError(true);
      setTextErrorMessage('Bitte beschreiben Sie Ihr Problem.');
      valid = false;
    } else {
      setTextError(false);
      setTextErrorMessage('');
    }

    return valid;
  }

  async function sendRequest() {
    if (!validateInputs()) return;

    try {
      const res = await fetch(`${Constants.API_URL}/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: Number(user_id), title: title.slice(0, 100), text })
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Request failed');
      }
      // on success redirect back to help overview
      //TODO: maybe show a success message?
      navigate(`/hilfe/${user_id}`);
    } catch (e) {
      console.error(e);
      alert('Fehler beim Erstellen der Anfrage');
    }
  }

  return (
    <>
        <Header header_title={"Anfrage erstellen"}/>

      <Container maxWidth="lg">
        <Typography
          variant="h3"
          noWrap
          sx={{ my: 3, fontSize: { xs: '2.0rem', sm: '2.5rem' }, fontWeight: '600' }}
        >
          Anfrage stellen: </Typography>

        <TextField
          id="request-title"
          label={"Titel der Anfrage"}
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={titleError}
          helperText={titleErrorMessage}
          slotProps={{
            inputLabel: {
              sx: { color: Constants.text_field_label, fontSize: { xs: '1.3rem', sm: '1.9rem' } }
            },
            input: {
              sx: { fontSize: { xs: '1.3rem', sm: '1.9rem' } },
              maxLength: 100
            }
          }}
          sx={{ my: 2 }}
        />

        <TextField
          id="outlined-multiline-static"
          label={"Beschreiben Sie hier Ihr Problem"}
          fullWidth
          slotProps={{
            inputLabel: {
              sx: { color: Constants.text_field_label, fontSize: { xs: '1.4rem', sm: '1.8rem' } }
            },
            input: {
              sx: { fontSize: { xs: '1.55rem', sm: '1.8rem' } }
            }
          }}
          multiline
          minRows={minRows}
          maxRows={maxRows}
          value={text}
          onChange={(e) => setText(e.target.value)}
          error={textError}
          helperText={textErrorMessage}
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
            onClick={sendRequest}
            variant="contained"
            sx={{
              flex: 1,
              p: 1,
              fontSize: { xs: '1.6rem', sm: '2.2rem', fontWeight: '600' },
              backgroundColor: Constants.primary_color,
              '&:hover': {
                backgroundColor: Constants.primary_color_dark,
                color: Constants.text_color_white
              }
            }}
          >
            absenden
          </Button>
        </Stack>
      </Container>
    </>
  )
}
