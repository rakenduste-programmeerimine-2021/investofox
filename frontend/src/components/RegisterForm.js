import React from 'react';
import './RegisterForm.css';
import { Link } from 'react-router-dom';

function RegisterForm() {
    return(
        <div className="container">
            <form className="content">
            <div className="header">
                <p className="title">Registration</p>
            </div>
                <div className="row">
                    <label>First name</label>
                    <input 
                        type="text" 
                        name="firstname" 
                        placeholder="Example" 
                        className="inputField"
                    />
                </div>
                <div className="row">
                    <label>Last name</label>
                    <input 
                        type="text" 
                        name="lastname" 
                        placeholder="Account" 
                        className="inputField" 
                    />
                </div>
                <div className="row">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="example@example.com" 
                        className="inputField" 
                    />
                </div>
                <div className="row">
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        className="inputField" 
                    />
                </div>
                <div className="row">
                    <label>Confirm password</label>
                    <input 
                        type="password" 
                        name="confirmpassword" 
                        placeholder="Confirm password" 
                        className="inputField" 
                    />
                </div>
                <div className="footerDiv">
                    <div className="buttonsDiv">
                        <Link to="./login">
                            <button className="backButton">Back</button>
                        </Link>
                        <input 
                            type="submit" 
                            value="Register" 
                            className="registerButton" 
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm;