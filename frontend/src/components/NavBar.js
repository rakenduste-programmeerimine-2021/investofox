import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../InvestoFoxLogo.svg';
import profileIcon from '../IFicon.png';
import './NavBar.css';

const NavBar = ({title, children}) => {
    return(
        <div className="page" data-testid="navbar">
            <div className="leftBar">
                <div className="topHalf">
                    <Link to="./chart">
                        <img src={logo} alt="InvestoFox logo" className="logo" />
                    </Link>
                    <div className="navBarButtonsDiv">
                        <Link to="./stock-api">
                            <button className="navBarButton" data-testid="stock-fetch-test">Stock fetch</button>
                        </Link>
                        <Link to="./add-order">
                            <button className="navBarButton" data-testid="add-order-test">Add order</button>
                        </Link>
                        <Link to="./orders">
                            <button className="navBarButton" data-testid="orders-test">Orders</button>
                        </Link>
                        <Link to="./chart">
                            <button className="navBarButton" data-testid="chart-test">Chart</button>
                        </Link>
                    </div>
                </div>
                <div className="bottomHalf">
                    <Link to="./settings">
                        <button className="settingsButton" data-testid="settings-test">Settings</button>
                    </Link>
                    <p className="message">Made with ♡ by the InvestoFox team</p>
                </div>
            </div>
            <div className="temp">
                <div className="topBar">
                    <div className="titleContainer">
                        <p className="currentPageTitle">{title}</p>
                    </div>
                    <div className="userProfileContainer">
                        <img src={profileIcon} className="profileIcon" alt="user icon" />
                    </div>
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default NavBar;
