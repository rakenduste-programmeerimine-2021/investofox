
import axios from "axios"
import React, { useEffect } from 'react'


export function Portfolio() {

    useEffect(() => {
        axios.post("http://localhost:8081/api/auth/user",{withCredentials: true})
    })


    return (
        <div>
            <h1>This is the home/portfolio page</h1>
        </div>
    )
}

export default Portfolio
