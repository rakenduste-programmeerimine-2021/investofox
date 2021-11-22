import React from 'react';
import './RegisterForm.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import { signup } from "../../../backend-node/src/routes/auth"

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
        user.signup({firstName, lastName, email, password})

        console.log(user)

        //axios
        try{
            axios.post('http://localhost:8081/api/auth/signup', user)
            .then(res => {
                console.log(res.data)
                if(res){
                    const successMsg = "User registered successfully!"
                    return successMsg
                    
                }

            }).catch(error => {
                console.log(error)
            })

        } catch(error){
            console.error(error)
        }

        //post req to register user
        /*await fetch('http://localhost:8081/api/auth/signup', {
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
        })*/
    }



    return(
        <div className="register-container">
            <form className="register-content" onSubmit={handleSubmit}>
            <div className="register-header">
                <p className="register-title">Registration</p>
            </div>
                <div className="register-row">
                    <label>First name</label>
                    <input 
                        type="text" 
                        name="firstName"
                        placeholder="Example" 
                        className="register-inputField"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="register-row">
                    <label>Last name</label>
                    <input 
                        type="text" 
                        name="lastName"
                        placeholder="Account" 
                        className="register-inputField"
                        onChange={(e) => setLastName(e.target.value)}
                        required 
                    />
                </div>
                <div className="register-row">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="example@example.com" 
                        className="register-inputField" 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        email
                    />
                </div>
                <div className="register-row">
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        className="register-inputField" 
                        onChange={(e) => setPassword(e.target.value)}
                        minLength= "6"
                        required
                    />
                </div>
                <div className="register-row">
                    <label>Confirm password</label>
                    <input 
                        type="password" 
                        name="confirmpassword" 
                        placeholder="Confirm password" 
                        className="register-inputField"
                        required
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