import React from 'react';
import './RegisterForm.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function RegisterForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('') 


    const handleSubmit = async (value) => {

        //prevents it updating every frame
        value.preventDefault()

        //values from form assigned to user template
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }

        console.log(user)

        //post req to register user
        await fetch('http://localhost:8081/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            //mode: no-cors resolves Cors issues
            mode: 'no-cors',
            body: JSON.stringify(user)
        }).then((res) => {
            if(res.ok)
                console.log("User registered successfully!")
                const successMsg = console.log("User registered successfully!")
            return successMsg
        }).catch((e) => {
            console.error(e)
        })

    }


    return(
        <div className="container">
            <form className="content" onSubmit={handleSubmit}>
            <div className="header">
                <p className="title">Registration</p>
            </div>
                <div className="row">
                    <label>First name</label>
                    <input 
                        type="text" 
                        name="firstName"
                        placeholder="Example" 
                        className="inputField"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="row">
                    <label>Last name</label>
                    <input 
                        type="text" 
                        name="lastName"
                        placeholder="Account" 
                        className="inputField"
                        onChange={(e) => setLastName(e.target.value)}
                        required 
                    />
                </div>
                <div className="row">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="example@example.com" 
                        className="inputField"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        email
                    />
                </div>
                <div className="row">
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        className="inputField"
                        onChange={(e) => setPassword(e.target.value)}
                        minLength= "6"
                        required
                    />
                </div>
                <div className="row">
                    <label>Confirm password</label>
                    <input 
                        type="password" 
                        name="confirmpassword" 
                        placeholder="Confirm password" 
                        className="inputField" 
                        required
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