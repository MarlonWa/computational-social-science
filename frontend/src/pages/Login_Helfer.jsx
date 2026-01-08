import { Link } from 'react-router-dom'
import { Header } from '../component/Header.jsx'

export function Login_Helfer() {
    return (
        <>
            <Header />
            <h3>Login für smarte Helfer</h3>
            <Link to="/helfer/1"> DEV: Login als HelferID 1 </Link>
            <br />
            <Link to="/helfer/signup"> Zur Signup Seite </Link>
            <br />
            <p> Hier kommt man vom Home hin, Helfer sollen sich hier einloggen oder alternativ zur SignUp Seite weitergeleitet werden. </p>
        </>
    );
}