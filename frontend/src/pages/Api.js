import React from 'react';
import PortfolioForm from '../components/PortfolioForm';
import './Portfolio.css';
import { Link } from 'react-router-dom';
import logo from '../InvestoFoxLogo.svg';

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
