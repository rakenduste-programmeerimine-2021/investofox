import React from 'react';
import RegisterForm from '../components/RegisterForm';
import logo from '../InvestoFoxLogo.svg';
import './Register.css';

export function Register() {
    return (
        <div className="body">
            <div className="logoContainer">
                <img src={logo} alt="InvestoFox logo" className="logo" />
            </div>
            <div className="registerForm">
                <RegisterForm />
            </div>
        </div>
    )
}

export default Register