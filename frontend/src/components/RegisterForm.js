import React from 'react';
import './RegisterForm.css';
import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'

function RegisterForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [redirect, setRedirect] = useState(false) 
    const [visible, setVisible] = useState("password")
    const [errorMsg, setErrorMsg] = useState("")
    const [checkVisible, setCheckVisible] = useState("password")

    const handleSubmit = async (value) => {
        setErrorMsg("")

        //prevents it updating every frame
        value.preventDefault()

        //values from form assigned to user template
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        //user.signup({firstName, lastName, email, password})
        //axios
        try{
            axios.post('http://localhost:8081/api/auth/signup', user)
            .then(res => {
                if(res){
                    console.log("User registered successfully!")
                    setRedirect(true)
                }else{
                    /////setErrorMsg("An user with this email already exists")
                    console.log(res.data)
                }

            }).catch(error => {
                console.log(error)
                setErrorMsg("An user with this email already exists")
            })

        } catch(error){
            console.error(error)
        }
    }

    //redirects to portfolio page
    if(redirect){
        return <Redirect to="/login" />
    }



    return(
        <div className="register-container">
            <form className="register-content" onSubmit={handleSubmit}>
            <div className="register-header">
                <p className="register-title">Registration</p>
                { <span style={{color: "red"}}>
                    {errorMsg}
                </span> }
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
                        type={visible} 
                        name="password"
                        placeholder="Password" 
                        className="register-passwordInputField" 
                        onChange={(e) => setPassword(e.target.value)}
                        minLength= "6"
                        required
                    />
                    <button 
                        className="register-passwordToggler"
                        onClick={() => {visible === "text" ? setVisible("password") : setVisible("text")}}
                    >
                        {visible === "text" ? "Hide" : "Show"}
                    </button>
                </div>
                <div className="register-row">
                    <label>Confirm password</label>
                    <input 
                        type={checkVisible}
                        name="confirmpassword" 
                        placeholder="Confirm password" 
                        className="register-passwordInputField"
                        required
                    />
                    <button 
                        className="register-passwordToggler"
                        onClick={() => {checkVisible === "text" ? setCheckVisible("password") : setCheckVisible("text")}}
                    >
                        {checkVisible === "text" ? "Hide" : "Show"}
                    </button>
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