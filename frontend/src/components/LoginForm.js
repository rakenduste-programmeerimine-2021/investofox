import React, { createContext } from 'react';
import './LoginForm.css';
import {Redirect, Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { Context } from "../store"
import { loginUser } from '../store/actions';


function LoginForm() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [redirect, setRedirect] = useState(false) 
    const [visible, setVisible] = useState("password")
    const [state, dispatch] = useContext(Context)

    const handleSubmit = async(value) =>{
        value.preventDefault()

        const user = {
            email: email,
            password: password,
        }

        await fetch('http://localhost:8081/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then(response => response.json())

        .then(response => {
            if(response){
                setRedirect(true)
                console.log("User sign-in successful!")
                dispatch(loginUser(response))
                console.log(state)
                localStorage.push(state)
            }else{
                console.log("Something went wrong")
            }
        
        })


        
        .catch((e) => {
            console.error(e)
        })
    }

    /*useEffect(() => {
        localStorage.setItem("logged-in-user", JSON.stringify(state))
    })*/

    if(redirect){
        return <Redirect to="/chart" />
    }



    return(
        <div className="login-container">
            <form className="login-content" onSubmit={handleSubmit}>
            <div className="login-header">
                <p className="login-title">Login</p>
            </div>
                <div className="login-row">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="example@example.com" 
                        className="login-emailInputField"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        email 
                    />
                </div>
                <div className="login-row">
                    <label>Password</label>
                    <input 
                        type={visible} 
                        name="password" 
                        placeholder="Password" 
                        className="login-passwordInputField" 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button 
                        className="login-passwordToggler"
                        onClick={() => {visible === "text" ? setVisible("password") : setVisible("text")}}
                    >
                        {visible === "text" ? "Hide" : "Show"}
                    </button>
                </div>
                <div className="login-footerDiv">
                    <div className="login-extrasDiv">
                        <div className="login-rememberBoxDiv">
                            <input name="rememberme" type="checkbox" />
                            <label>Remember me</label>
                        </div>
                        <Link to="./forgot-password">
                            <p className="login-forgotPassword">Forgot password?</p>
                        </Link>
                    </div>
                    <div className="login-buttonsDiv">
                        <Link to="./register">
                            <button className="login-registerButton">Register</button>
                        </Link>
                        <button className="login-loginButton">Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;
