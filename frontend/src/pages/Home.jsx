import { Link } from 'react-router-dom'

export function Home() {
    return (
        <>
            <h1>Homepage</h1>
            <Link to = "/login">login</Link>
            <p></p>
            <Link to = "/request">create request</Link>
        </>
    )
}