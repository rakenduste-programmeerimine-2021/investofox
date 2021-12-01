import React from 'react';
import {useState, useEffect} from 'react'
import '../components/RegisterForm.css';
import axios from "axios"

export function OrderList() {
    const [orders, setOrders] = useState('');

    const userId = "619aa016692c06db2976ea07"

    const getOrders = async() =>{
        axios.get(`http://localhost:8081/api/auth/user/${userId}`)
        .then(response => {
            if(response){
                console.log("Good fetch")
                setOrders(response.data)
                console.log(response.data)
            }


        }).catch(e =>{
            console.log(e)
        })
    }

    useEffect(() => {
        getOrders()
    }, [])

    const foo = orders.orders


    return (
        <div>
        <h1>Game of Thrones Books</h1>
        {orders && (
          <div className={"login-container"}>
            {foo.map((order, index) => (
              <div key={index}>
                <h2>Ticker: {order.ticker}</h2><h3>Price: {order.price}</h3><h3>Date: {order.date}</h3>

              </div>
            ))}
    
          </div>
        )}
      </div>
    )
}

export default OrderList;
