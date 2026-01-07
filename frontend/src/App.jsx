import './App.css'
import { Aktive_Anfragen_Helfer } from './pages/Aktive_Anfragen_Helfer.jsx'
import { Anfrage_Helfer } from './pages/Anfrage_Helfer.jsx'
import { Anfragen_Helfer } from './pages/Anfragen_Helfer.jsx'
import { Home } from './pages/Home.jsx'
import { Login_Helfer } from './pages/Login_Helfer.jsx'
import { Login_Hilfe } from './pages/Login_Hilfe.jsx'
import { FAQ } from './pages/FAQ.jsx'
import { Signup_Helfer } from './pages/Signup_Helfer.jsx'
import { Signup_Hilfe } from './pages/Signup_Hilfe.jsx'
import { Home_Helfer } from './pages/Home_Helfer.jsx'
import { Scoreboard_Helfer } from './pages/Scoreboard_Helfer.jsx'
import { Chat_Helfer } from './pages/Chat_Helfer.jsx'
import { Chats_Helfer } from './pages/Chats_Helfer.jsx'
import { Home_Hilfe } from './pages/Home_Hilfe.jsx'
import { Neu_Hilfe } from './pages/Neu_Hilfe.jsx'
import { Chats_Hilfe } from './pages/Chats_Hilfe.jsx'
import { Chat_Hilfe } from './pages/Chat_Hilfe.jsx'
import { Dev } from './pages/Dev.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home />} />

        <Route path = "/helfer/login" element = {<Login_Helfer />} />
        <Route path = "/hilfe/login" element = {<Login_Hilfe />} />
        <Route path = "/faq" element = {<FAQ />} />

        <Route path = "/helfer/signup" element = {<Signup_Helfer />} />
        <Route path = "/hilfe/signup" element = {<Signup_Hilfe />} />
        
        <Route path = "/helfer/:user_id" element = {<Home_Helfer />} />
        <Route path = "/helfer/:user_id/scoreboard" element = {<Scoreboard_Helfer />} />
        <Route path = "/helfer/:user_id/myrequests" element = {<Aktive_Anfragen_Helfer />} />
        <Route path = "/helfer/:user_id/myrequest/:request_id" element = {<Anfrage_Helfer />} />
        <Route path = "/helfer/:user_id/myrequest/:request_id/chat" element = {<Chat_Helfer />} />
        <Route path = "/helfer/:user_id/requests" element = {<Anfragen_Helfer />} />
        <Route path = "/helfer/:user_id/chats" element = {<Chats_Helfer />} />
        {/*<Route path = "/helfer/:user_id/chat/:chat_id" element = {<Chat_Helfer />} />
        We dont use this - clicking on a chat will let you get to the myrequest/requestid/chat url*/}

        <Route path = "/hilfe/:user_id" element = {<Home_Hilfe />} />
        <Route path = "/hilfe/:user_id/new" element = {<Neu_Hilfe />} />
        <Route path = "/hilfe/:user_id/chats" element = {<Chats_Hilfe />} />
        <Route path = "/hilfe/:user_id/chat/:chat_id" element = {<Chat_Hilfe />} />
        
        <Route path = "/dev" element = {<Dev />} />
      </Routes>
    </Router>
  )
}

export default App


