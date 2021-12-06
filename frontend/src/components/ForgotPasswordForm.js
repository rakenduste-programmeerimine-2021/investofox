import React from 'react';
import './ForgotPasswordForm.css';
import { Link } from 'react-router-dom';

function ForgotPasswordForm() {
    return(
        <div className="forgotform-container">
            <form className="forgotform-content">
            <div className="forgotform-header">
                <p className="forgotform-title">Forgot password</p>
            </div>
                <div className="forgotform-row">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="example@example.com" 
                        className="forgotform-emailInputField"
                        required
                        email 
                    />
                </div>
                <p className="forgotform-info">
                    If there is an account associated with the email you provided, 
                     a new password and further instructions will be sent to the address.
                </p>
                <div className="forgotform-footerDiv">
                    <div className="forgotform-buttonsDiv">
                        <Link to="/login">
                            <button className="forgotform-backButton">Back</button>
                        </Link>
                        <button className="forgotform-sendButton">Send email</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordForm;
