import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../InvestoFoxLogo.svg';
import profileIcon from '../IFicon.png';
import './NavBar.css';

const NavBar = ({title, children}) => {
    return(
        <div className="page">
            <div className="leftBar">
                <div className="topHalf">
                    <Link to="./portfolio">
                        <img src={logo} alt="InvestoFox logo" className="logo" />
                    </Link>
                    <div className="navBarButtonsDiv">
                        <Link to="./portfolio">
                            <button className="navBarButton">Portfolio</button>
                        </Link>
                        <Link to="./add-order">
                            <button className="navBarButton">Add order</button>
                        </Link>
                        <Link to="./orders">
                            <button className="navBarButton">Orders</button>
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
