import { Link } from 'react-router-dom'

export function Home() {
    return (
        <>
            <h1>Homepage</h1>
            <Link to = "/login">login</Link>
            <h1> </h1>
            <Link to = "/request">create request</Link>
            <h1> </h1>
            <Link to = "/helfer/:user_id/scoreboard"> scoreboard </Link>
        </>
    )
}