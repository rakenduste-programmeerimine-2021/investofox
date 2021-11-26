import React from 'react';
import RegisterForm from '../components/RegisterForm';
import logo from '../InvestoFoxLogo.svg';
import { Link } from 'react-router-dom';
import './Register.css';

export function Register() {
    return (
        <div className="register-body">
            <div className="register-logoContainer">
                <Link to="/">
                    <img src={logo} alt="InvestoFox logo" className="register-logo" />
                </Link>
            </div>
            <div className="register-registerForm">
                <RegisterForm />
            </div>
        </div>
    )
}

export default Register;