import React from 'react'
import { useState, useEffect } from 'react'

export default function NotesPage() {
    const [text, setText] = useState('')

    useEffect(() => {
        fetch('http://localhost:3001/notes')
            .then((res) => res.text())
            .then((data) => setText(data))
    }, [])

    return (
        <div>
            <h1>{text}</h1>
        </div>
    )
}
