import React from 'react';
import PortfolioForm from '../components/PortfolioForm';
import logo from '../InvestoFoxLogo.svg';
import { Link } from 'react-router-dom';
import './Login.css';

export function Portfolio() {

    return (
        <div className="login-body">
            <div className="login-logoContainer">
                <Link to="/portfolio">
                    <img src={logo} alt="InvestoFox logo" className="logo" />
                </Link>
            </div>
            <div className="login-loginForm">
                <PortfolioForm />
            </div>
        </div>
    )
}

export default Portfolio
