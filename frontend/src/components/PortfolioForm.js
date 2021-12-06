import axios from "axios";
import React, { useEffect, useState } from 'react';
import './PortfolioForm.css';

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
            <div className="portfolioForm-page">
                <h1>Stock portfolio</h1>
                <div className="portfolioForm-contentContainer">
                    <div className="portfolioForm-content">
                        <form onSubmit={handleSubmit}>
                            <label className="portfolioForm-inputLabel">Symbol</label>
                                <input 
                                    className="portfolioForm-input"
                                    type="text" 
                                    name="stockSymbol"
                                    placeholder="TSLA" 
                                    onChange={(e) => setSymbol(e.target.value)}
                                    required
                                />
                            <button className="portfolioForm-fetchButton">Fetch</button>
                        </form>
                        <div className="portfolioForm-fetched">
                            <h4>
                                Symbol: {stockChartZValues}
                            </h4>
                            <p>
                                Date: 
                                <p className="portfolioForm-fetchedDate">
                                    {stockChartXValues}
                                </p>
                            </p>
                            <p>
                                Price: 
                                <p className="portfolioForm-fetchedPrice">
                                    {stockChartYValues}
                                </p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    export default PortfolioForm
