import React from 'react'
import { Link } from 'react-router-dom'


export default function Login() {
    return (
        <div>
            <h1>This is the login page</h1>
            <Link to="../">
                <button>Home</button>
            </Link>
        </div>
    )
}
