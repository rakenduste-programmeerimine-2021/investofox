import React from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import logo from '../InvestoFoxLogo.svg';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

export function ForgotPassword() {
    return (
        <div className="forgot-body">
            <div className="forgot-logoContainer">
                <Link to="/">
                    <img src={logo} alt="InvestoFox logo" className="forgot-logo" />
                </Link>
            </div>
            <div className="forgot-form">
                <ForgotPasswordForm />
            </div>
        </div>
    )
}

export default ForgotPassword;