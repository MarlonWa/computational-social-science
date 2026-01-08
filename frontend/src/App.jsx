import './App.css'
import {Home} from './pages/Home.jsx'
import {FAQ} from './pages/FAQ.jsx'
import {DEV} from './pages/DEV.jsx'

import {Helfer_Login} from './pages/Helfer_Login.jsx'
import {Helfer_SignUp} from './pages/Helfer_SignUp.jsx'
import {Helfer_Home} from './pages/Helfer_Home.jsx'
import {Helfer_Scoreboard} from './pages/Helfer_Scoreboard.jsx'
import {Helfer_Requests_Assigned} from './pages/Helfer_Requests_Assigned.jsx'
import {Helfer_Request_Assigned_Details} from './pages/Helfer_Request_Assigned_Details.jsx'
import {Helfer_Requests_All} from './pages/Helfer_Requests_All.jsx'
import {Helfer_Request_Details} from './pages/Helfer_Request_Details.jsx'
import {Helfer_Chat} from './pages/Helfer_Chat.jsx'
import {Helfer_Chats_All} from './pages/Helfer_Chats_All.jsx'

import {Hilfe_Login} from './pages/Hilfe_Login.jsx'
import {Hilfe_SignUp} from './pages/Hilfe_SignUp.jsx'
import {Hilfe_Home} from './pages/Hilfe_Home.jsx'
import {Hilfe_Request_New} from './pages/Hilfe_Request_New.jsx'
import {Hilfe_Request_Details} from './pages/Hilfe_Request_Details.jsx'
import {Hilfe_Chat} from './pages/Hilfe_Chat.jsx'
import {Hilfe_Chats_All} from './pages/Hilfe_Chats_All.jsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/helfer/login" element={<Helfer_Login />} />
        <Route path="/hilfe/login" element={<Hilfe_Login />} />
        <Route path="/faq" element={<FAQ />} />

        <Route path="/helfer/signup" element={<Helfer_SignUp />} />
        <Route path="/hilfe/signup" element={<Hilfe_SignUp />} />

        <Route path="/helfer/:user_id" element={<Helfer_Home />} />
        <Route path="/helfer/:user_id/scoreboard" element={<Helfer_Scoreboard />} />
        <Route path="/helfer/:user_id/myrequests" element={<Helfer_Requests_Assigned />} />
        <Route path="/helfer/:user_id/myrequest/:request_id" element={<Helfer_Request_Assigned_Details />} />
        <Route path="/helfer/:user_id/myrequest/:request_id/chat" element={<Helfer_Chat />} />
        <Route path="/helfer/:user_id/requests" element={<Helfer_Requests_All />} />
        <Route path="/helfer/:user_id/request/:request_id" element={<Helfer_Request_Details />} />
        <Route path="/helfer/:user_id/chats" element={<Helfer_Chats_All />} />

        <Route path="/hilfe/:user_id" element={<Hilfe_Home />} />
        <Route path="/hilfe/:user_id/request/:request_id" element={<Hilfe_Request_Details />} />
        <Route path="/hilfe/:user_id/new" element={<Hilfe_Request_New />} />
        <Route path="/hilfe/:user_id/chats" element={<Hilfe_Chats_All />} />
        <Route path="/hilfe/:user_id/chat/:chat_id" element={<Hilfe_Chat />} />

        <Route path="/dev" element={<DEV />} />
      </Routes>
    </Router>
  )
}

export default App
