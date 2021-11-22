import React from 'react';
import './LoginForm.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'

function LoginForm() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('') 

    const handleSubmit = async(value) =>{
        value.preventDefault()

        const user = {
            email: email,
            password: password
        }

        try{
            axios.post("http://localhost:8081/api/auth/login", user)
            .then(res => {
                const returnData = JSON.stringify(user)
                console.log(user)
                if(res){
                    console.log("Succesfuly logged in!")
                }
            }).catch(error => {
                console.log(error)
            })
        }catch(error){
            console.error(error)
        }
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
                        className="login-inputField"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        email 
                    />
                </div>
                <div className="login-row">
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        className="login-inputField" 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
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
