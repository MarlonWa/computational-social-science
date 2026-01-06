import { Link } from 'react-router-dom'
import Header from '../component/Header.jsx';

export function Home() {
    return (
        <>
            <Header/>
            <h1>Homepage</h1>
            <Link to = "/dev"> ONLY FOR DEVELOPMENT - use with caution </Link>
            <h1> </h1>
            <Link to="/faq"> FAQ </Link>
        </>
    )
}