import './App.css'
import { Login } from './pages/Login_Hilfe'
import { Home } from './pages/Home'
import { Request } from "./pages/Neu_Hilfe"
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

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
        <Route path = "/helfer/:user_id/myrequests" element = {<aktive_Anfragen_Helfer />} />
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
      </Routes>
    </Router>
  )
}

export default App


