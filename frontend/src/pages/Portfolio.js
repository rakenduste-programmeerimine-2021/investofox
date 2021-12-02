import React from 'react';
import PortfolioForm from '../components/PortfolioForm';
import logo from '../InvestoFoxLogo.svg';
import { Link } from 'react-router-dom';
import './Portfolio.css';

export function Portfolio() {

    return (
        <div className="portfolio-body">
            <div className="portfolio-logoContainer">
                <Link to="/portfolio">
                    <img src={logo} alt="InvestoFox logo" className="portfolio-logo" />
                </Link>
            </div>
            <div className="portfolio-portfolioForm">
                <PortfolioForm />
            </div>
        </div>
    )
}

export default Portfolio
