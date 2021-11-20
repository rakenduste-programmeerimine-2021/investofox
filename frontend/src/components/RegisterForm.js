import React from 'react';
import './RegisterForm.css';
import { Link } from 'react-router-dom';

function RegisterForm() {
    return(
        <div className="register-container">
            <form className="register-content">
            <div className="register-header">
                <p className="register-title">Registration</p>
            </div>
                <div className="register-row">
                    <label>First name</label>
                    <input 
                        type="text" 
                        name="firstname" 
                        placeholder="Example" 
                        className="register-inputField"
                    />
                </div>
                <div className="register-row">
                    <label>Last name</label>
                    <input 
                        type="text" 
                        name="lastname" 
                        placeholder="Account" 
                        className="register-inputField" 
                    />
                </div>
                <div className="register-row">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="example@example.com" 
                        className="register-inputField" 
                    />
                </div>
                <div className="register-row">
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        className="register-inputField" 
                    />
                </div>
                <div className="register-row">
                    <label>Confirm password</label>
                    <input 
                        type="password" 
                        name="confirmpassword" 
                        placeholder="Confirm password" 
                        className="register-inputField" 
                    />
                </div>
                <div className="register-footerDiv">
                    <div className="register-buttonsDiv">
                        <Link to="./login">
                            <button className="register-backButton">Back</button>
                        </Link>
                        <input 
                            type="submit" 
                            value="Register" 
                            className="register-registerButton" 
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm;