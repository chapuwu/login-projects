import { useState, MouseEvent, KeyboardEvent } from 'react'
import { redirect } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e?: MouseEvent<HTMLButtonElement>) {
        if (e) {
            e.preventDefault()
        }

        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        // authentication failed
        if (response.status !== 200) {
            const data = await response.json()
            alert(data.error)
            return
        }

        // authenticated
        redirect('/notes')
    }

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    return (
        <div>
            <form>
                <label>Username</label>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <label>Password</label>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}
