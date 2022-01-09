import React from 'react';
import './LoginForm.css';
import axios from "axios"
import {Redirect, Link } from 'react-router-dom';
import { useState, useContext, } from 'react';
import { Context } from "../store"
import { loginUser } from '../store/actions';


function LoginForm() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [redirect, setRedirect] = useState(false) 
    const [visible, setVisible] = useState("password")
    const [errorMsg, setErrorMsg] = useState('')
    const [state, dispatch] = useContext(Context)

    const handleSubmit = async(value) =>{
        value.preventDefault()
        //set states to their initial state
        setRedirect(false)
        setErrorMsg('')

        const user = {
            email: email,
            password: password,
        }

        //axios fetch
        try{
            axios.post('http://localhost:8081/api/auth/login', user)
            .then(res => {
                if(res){
                    setRedirect(true)
                    console.log("User sign-in successful!")
                    dispatch(loginUser(res.data))
                }else{
                    setErrorMsg("An user with this email does not exist!")
                }
            }).catch(error => {
                console.log(error)
                setErrorMsg("An user with this email does not exist")
            })

        } catch(error){
            console.error(error)
            setErrorMsg("An user with this email does not exist")
        }
    }

    if(redirect){
        return <Redirect to="/chart" />
    }
    
    return(
        <div className="login-container">
            <form className="login-content" onSubmit={handleSubmit}>
            <div className="login-header">
                <p className="login-title">Login</p>
                {<span style={{color: "red"}}>{errorMsg}</span>}
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
