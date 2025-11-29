import './App.css'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Request } from "./pages/Request"
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/request" element = {<Request />} />
        </Routes>
      </Router>
    </>
  )
}

export default App


