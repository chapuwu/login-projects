import { Link } from 'react-router-dom'

export default function Root() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                    <li>
                        <Link to='/register'>Register</Link>
                    </li>
                </ul>
            </nav>
            <main>
                <h1>Home Page</h1>
            </main>
        </div>
    )
}
