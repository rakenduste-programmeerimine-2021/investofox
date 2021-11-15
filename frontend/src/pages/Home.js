
import React from 'react'
import { Link } from 'react-router-dom'
import "../App.css"

function Home(){
    return(
        <div className="App">
            <h1> This is the landing page and it works!</h1>
            <Link to="./login">
                <button>Login</button>
            </Link>
            <Link to="./register">
                <button>Register</button>
            </Link>
        </div>
    )
}

export default Home