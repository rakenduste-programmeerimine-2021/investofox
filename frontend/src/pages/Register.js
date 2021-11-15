import React from 'react'
import { Link } from 'react-router-dom'


export function Register() {
    return (
        <div>
            <h1>This is the register page</h1>
            <Link to="/">
                <button>Home</button>
            </Link>
        </div>
    )
}

export default Register