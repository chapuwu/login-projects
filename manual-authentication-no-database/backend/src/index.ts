import bcrypt from 'bcrypt'
import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use(
    cors({
        origin: 'http://localhost:3000',
    }),
)

interface User {
    username: string
    hashedPassword: string
}

interface Session {
    username: string
}

const users: User[] = []

const sessions = new Map<string, Session>()

app.post('/register', async (req, res) => {
    const { username, password } = req.body

    // user already rexist
    if (users.some((user) => user.username === username)) {
        res.status(409).json({ error: 'User already exists' })
        return
    }

    // register
    const hashedPassword = await bcrypt.hash(password, 10)
    users.push({ username, hashedPassword })
    res.status(201).json()
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = users.find((user) => user.username === username)

    // user does not exist
    if (!user) {
        res.status(404).json({ error: 'user does not exist' })
        return
    }

    // invalid password
    if (!(await bcrypt.compare(password, user.hashedPassword))) {
        res.status(401).json({ error: 'wrong password' })
        return
    }

    // login succesful
    const sessionId = crypto.randomBytes(32).toString('hex')
    sessions.set(sessionId, username)
    res.cookie('sessionId', sessionId)
    res.status(200).json()
})

app.get('/notes', (req, res) => {
    const session = sessions.get(req.cookies.sessionId)
    if (session) {
        res.send(`logged in as ${session.username}`)
    } else {
        res.send('not logged in')
    }
})

app.listen(3001, () => console.log('started at 3001'))
