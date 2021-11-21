import React from 'react';
import LoginForm from '../components/LoginForm';
import logo from '../InvestoFoxLogo.svg';
import { Link } from 'react-router-dom';
import './Login.css';

export function Login() {
    return (
        <div className="login-body">
            <div className="login-logoContainer">
                <Link to="/">
                    <img src={logo} alt="InvestoFox logo" className="logo" />
                </Link>
            </div>
            <div className="login-loginForm">
                <LoginForm />
            </div>
        </div>
    )
}

export default Login;
