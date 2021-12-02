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
        <div className={"login-content"}>
        <h1 className={"login-header"}>Your orders</h1>
        {orders && (
          <div className={"login-content"}>
            {foo.map((order, index) => (
              <div key={index} className={"login-"}>
                <h2>Ticker: {order.ticker}<button>X</button></h2>
                <h3>Price: {order.price}<button>Change</button></h3>
                <h3>Amount: {order.amount}<button>Change</button></h3>
                <h3>Date: {order.date}<button>Change</button></h3>
                <h3>Date: {order.comments}<button>Change</button></h3>
                <h3>Person: {orders.email}</h3>

              </div>
              
            ))}
    
          </div>
        )}
      </div>
    )
}

export default OrderList;
