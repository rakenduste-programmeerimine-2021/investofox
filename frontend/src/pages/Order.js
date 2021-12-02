import React from 'react';
import OrderForm from '../components/OrderForm';
import logo from '../InvestoFoxLogo.svg';
import { Link } from 'react-router-dom';
import './Login.css';

export function AddOrder() {

    return (
        <div className="login-body">
            <div className="login-logoContainer">
                <Link to="/orders">
                    <img src={logo} alt="InvestoFox logo" className="logo" />
                </Link>
            </div>
            <div className="login-loginForm">
                <OrderForm />
            </div>
        </div>
    )
}

export default AddOrder
