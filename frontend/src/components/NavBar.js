import React from 'react';
import './NavBar.css';
import logo from '../InvestoFoxLogo.svg';

function NavBar(){
    return(
        <div>
            <div className="leftBar">
                <img src={logo} alt="InvestoFox logo" className="logo" />
                <p>I will be the navbar!</p>
            </div>
            <div className="topBar">
                <p>I will be the top navbar!</p>
            </div>
        </div>
    )
}

export default NavBar;
