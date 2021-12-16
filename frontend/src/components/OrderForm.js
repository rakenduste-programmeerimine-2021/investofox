import React, {useState} from 'react'
import './OrderForm.css';
import axios from 'axios'


export default function OrderForm() {
    const [ticker, setTicker] = useState('')
    const [amount, setAmount] = useState('')
    const [price, setPrice] = useState('')
    const [date, setDate] = useState('')
    const [comments, setComments] = useState('')
    const [authenticatedUser, setAuthenticatedUser] = useState(true)

    //get the logged in user from local storage then get user ID
    const getAuthUser = () =>{
        try{
            const userId = localStorage.getItem('user')
            const foo = JSON.parse(userId)
            const id = foo.auth.user
            //console.log(id)
            if(id == null || !id){
                setAuthenticatedUser(false)
            }else{
                return id
            }

        }catch(e){
            console.log(e)
            console.log("No auth")
        }
    }

    const handleSubmit = async(value) =>{
        value.preventDefault()

        const orders = {
            ticker: ticker.toUpperCase(),
            amount: amount,
            price: price,
            date: date,
            comments: comments
        }

        console.log(orders)

        try{
            axios.put(`http://localhost:8081/api/auth/add-order/${getAuthUser()}`, orders)
            .then((res) => {
                if(res){
                    console.log(res.data)
                    console.log(`Order: ${res} saved to ${getAuthUser()}'s account`)

                }
            }).catch(e =>{
                console.log(e)
            })

        }catch(error){
            console.error(error)
        }
    }



    return (

        <div className="orderForm-page">
            <h1 className="orderForm-title">Add order</h1>
            <div className="orderForm-contentContainer">
            {authenticatedUser ? (                
            <form onSubmit={handleSubmit} className="orderForm-content">
                <div>
                    <div className="orderForm-row">
                        <label>Ticker</label>
                        <input
                            type="text"
                            name="ticker"
                            placeholder="Ticker symbol"
                            onChange={(e) => setTicker(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="orderForm-row">
                        <label>Amount</label>
                        <input
                            type="number"
                            name="amount"
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="orderForm-row">
                        <label>Price</label>
                        <input
                            type="float"
                            name="price"
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="orderForm-row">
                        <label>Date</label>
                        <input
                            className="dateInput"
                            type="date"
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="orderForm-row">
                        <label>Comments</label>
                        <input
                            type="text"
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </div>
                    <button className="orderForm-addOrderButton">Add order</button>
                </div>
            </form>) : (
                <block>
                    <h1>You are not logged in!</h1>
                    <a href="/login">Go back</a>
                </block>
                )}
            
            </div>
        </div>
    )
}
