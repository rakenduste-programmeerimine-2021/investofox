import axios from "axios"
import React, { useEffect, useState } from 'react'

export function PortfolioForm() {

    const [symbol, setSymbol] = useState([])
    const [stockChartXValues, setStockChartXValues] = useState([])
    const [stockChartYValues, setStockChartYValues] = useState([])
    const [loading, setLoading]= useState(true)

    const handleSubmit = async(value) =>{
        value.preventDefault()
        const apikey= "M7DSRJECMBCEEWGF"
        const tickers = symbol

        let completed = 0
        const results = []
        console.log(tickers)
        for(let i = 0; i < tickers.length; i++) {
            const oneTicker = tickers[i]

            axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${tickers}&apikey=${apikey}`)
                .then((response) =>{
                    completed += 1

                    results.push(response.data['Meta Data'])
                    if(completed === tickers.length) {
                        //All tickers have finished their response
                        console.log('completed')
                    }

                    console.log(tickers)


                }).catch(e =>{
                    console.error(e)
                })

        }

       /* try{
            axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apikey}`)
            .then(res =>{
                const returnData = JSON.stringify(res)

                if(res.ok){
                    const data = res.data
                    console.log(data)
                    setLoading(false)
                }
                console.log(res.data)
                const data = res.data
                console.log(data)

                for( var key in data['Time Series (Daily)']) {
                    setStockChartXValues(key)
                    setStockChartYValues(data[`Time Series (Daily)`]
                    [key]['4. close'])
                    console.log("Date: " + stockChartXValues)
                    console.log("Price: " + stockChartYValues)
                }
            }).catch(e =>{
                console.error(e)
            })
        }catch(error){
            console.log(error)
        }*/
        } //end of handleSubmit



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
                                <ul>
                                {stockChartXValues.map(item =>{
                                            <li key={item.id}>{item.value}</li>
                                        })}
                                </ul>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        )
    }
    
    export default PortfolioForm
