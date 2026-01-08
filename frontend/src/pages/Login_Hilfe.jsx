import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'

export function Login_Hilfe() {
    return (
        <>
            <Header />
            <h1>Login für Hilfesuchende </h1>
            <Link to="/hilfe/3"> DEV: Login als Hilfesuchender ID 3 </Link>
            <br />
            <Link to="/hilfe/signup"> Zur Signup Seite </Link>
            <br />
            <p> Hier kommt man vom Home hin, Suchende sollen sich hier einloggen oder alternativ zur SignUp Seite weitergeleitet werden. </p>
        </>
    );
}