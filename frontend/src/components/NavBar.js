import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../InvestoFoxLogo.svg';
import './NavBar.css';

function NavBar(){

    //let s = "no probs B)";

    return(
        <div className="page">
            <div className="leftBar">
                <div className="topHalf">
                    <img src={logo} alt="InvestoFox logo" className="logo" />
                    <div className="navBarButtonsDiv">
                        <Link to="./portfolio">
                            <button className="navBarButton">Portfolio</button>
                        </Link>
                        <Link to="./addOrder">
                        <button className="navBarButton">Add order</button>
                        </Link>
                        <Link to="./order">
                        <button className="navBarButton">Order</button>
                        </Link>
                    </div>
                </div>
                <div className="bottomHalf">
                    <Link to="./settings">
                        <button className="settingsButton">Settings</button>
                    </Link>
                    <p className="message">Made with ♡ by the InvestoFox team</p>
                </div>
            </div>
            <div className="temp">
                <div className="topBar">
                </div>
                <div className="content">
                </div>
            </div>
        </div>
    )
}

export default NavBar;
