import React from 'react';
import './NavBar.css';
import logo from '../InvestoFoxLogo.svg';

function NavBar(){

    //let s = "no probs B)";

    return(
        <div>
            <div className="leftBar">
                <img src={logo} alt="InvestoFox logo" className="logo" />
            </div>
        </div>
    )
}

export default NavBar;
