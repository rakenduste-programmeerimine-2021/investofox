import React from 'react';
import PortfolioForm from '../components/PortfolioForm';
import './Portfolio.css';

export function Portfolio() {

    return (
        <div className="portfolio-body">
            <div className="portfolio-portfolioForm">
                <PortfolioForm />
            </div>
        </div>
    )
}

export default Portfolio
