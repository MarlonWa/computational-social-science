import { useState } from 'react'
import './App.css'
import ResponsiveAppBar from './Header.jsx'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function App() {
  return (
    <>
      <Container maxWidth="100%">
        <ResponsiveAppBar/>
      </Container>

      <Container>
          <TextField
            id="outlined-multiline-static"
            label="placeholder text"
            fullWidth
            multiline
            minRows={6}
            defaultValue="Default Value"
            slotProps={{
              textarea: {
                style: {
                  maxHeight: "40h%",
                  overflowY: "auto",
                },
              },
            }}
            />
      </Container>
<Container></Container>
    </>
  )
}

export default App
