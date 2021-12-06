import React from 'react';
import PortfolioForm from '../components/PortfolioForm';
import './Api.css';

export function Portfolio() {

    return (
        <div className="api-body">
            <div>
                <PortfolioForm />
            </div>
        </div>
    )
}

export default Portfolio

//1st div -> className="api-body"
//2nd div -> className="api-form"