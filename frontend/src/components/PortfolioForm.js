import axios from "axios"
import React, { useEffect, useState } from 'react'

export function PortfolioForm() {

    const [symbol, setSymbol] = useState('')
    const [stockChartXValues, setStockChartXValues] = useState([])
    const [stockChartYValues, setStockChartYValues] = useState([])
    const [loading, setLoading]= useState(true)

    const handleSubmit = async(value) =>{
        value.preventDefault()
        const apikey= "M7DSRJECMBCEEWGF"
        const ticker = symbol

        try{
            axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apikey}`)
            .then(res =>{

                if(res.ok){
                    setLoading(false)
                }
                const data = res.data
                console.log(data, "this is Data")


                const getStocks = (date, price) =>{
                    return(
                        <div>
                            <li>
                                {data.map(post =>{
                                    return(
                                        <div key={ post.id}>
                                            <h4>{ stockChartXValues}</h4>
                                            <h4>{ stockChartYValues}</h4>
                                        </div>
                                    )
                                })}
                            </li>
                        </div>
                    )
                }

                for( var key in data['Time Series (Daily)']) {
                    

                    setStockChartXValues([...stockChartXValues, key[10]])

                    setStockChartYValues([data[`Time Series (Daily)`]
                    [key]['4. close']])
                    //console.log("Date: " + stockChartXValues)
                    //console.log("Close price: " + stockChartYValues)
                    //getStocks(stockChartXValues, stockChartYValues )
                }
                console.log(stockChartXValues, "key values")
                console.log(setStockChartXValues([]))

            }).catch(e =>{
                console.error(e)
            })
        }catch(error){
            console.log(error)
        }
        }

        return (
            <div className="login-container">
                <h1>Stock portfolio</h1>
                <form onSubmit={handleSubmit} className="login-content">
                    <label>Symbol</label>
                            <input 
                                type="text" 
                                name="stockSymbol"
                                placeholder="TSLA...." 
                                onChange={(e) => setSymbol(e.target.value)}
                                required
                            />
    
                    <button className="login-loginButton">Fetch</button>
                </form>
                <ul className="login-container">
                    <li>
                        <p>Ticker, price, date, etc</p>
                        {!loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div>
                                <h1>Date: {stockChartXValues}</h1>
                                <p>Price: {stockChartYValues}</p>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        )
    }
    
    export default PortfolioForm
