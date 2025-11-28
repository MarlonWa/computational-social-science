import { Link } from 'react-router-dom'

export function Home() {
    return (
        <>
            <h1>Home</h1>
            <Link to = "/login">login</Link>
            <p></p>
            <Link to = "/request">create request</Link>
        </>
    )
}