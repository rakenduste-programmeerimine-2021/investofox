import React, {useState} from 'react'
import './LoginForm.css';
import axios from 'axios'


export default function OrderForm() {
    const [ticker, setTicker] = useState('')
    const [amount, setAmount] = useState('')
    const [price, setPrice] = useState('')
    const [date, setDate] = useState('')
    const [comments, setComments] = useState('')

    const getAuthUser = () =>{
        const userId = localStorage.getItem('user')
        const parsedID = JSON.parse(userId)
        const id = parsedID.auth.user
        //console.log(id)
        return id
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
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-content">
            <div>
                <div className="login-row">
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
                <div className="login-row">
                    <label>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="login-row">
                    <label>Price</label>
                    <input
                        type="float"
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="login-row">
                    <label>Date</label>
                    <input
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="login-row">
                    <label>Comments</label>
                    <input
                        type="text"
                        onChange={(e) => setComments(e.target.value)}
                    />
                </div>
                <button>Add order</button>
            </div>
            </form>
        </div>
    )
}
