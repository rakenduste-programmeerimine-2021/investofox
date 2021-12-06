import axios from "axios";
import React, { useEffect, useState } from 'react';
import './PortfolioForm.css';

export function PortfolioForm() {

    const [symbol, setSymbol] = useState('')
    const [stockChartXValues, setStockChartXValues] = useState([])
    const [stockChartYValues, setStockChartYValues] = useState([])
    const [stockChartZValues, setStockChartZValues] = useState([])
    const [loading, setLoading]= useState(true)

    const handleSubmit = async(value) =>{
        value.preventDefault()
        const apikey= "M7DSRJECMBCEEWGF"
        const tickers = symbol

        try{
            axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${tickers}&apikey=${apikey}`)
            .then(res =>{
                if(res){
                    console.log(res.data)
                    setLoading(false)
                }

                const data = res.data

                for( var key in data['Time Series (Daily)']) {
                    setStockChartXValues(key)
                    setStockChartYValues(data[`Time Series (Daily)`]
                    [key]['4. close'])
                    setStockChartZValues(data[`Meta Data`]['2. Symbol'])
                    console.log("Price: " + stockChartYValues)
                    console.log("symbol: " + stockChartZValues)
                }

                if(loading){
                    return(
                        <div className={"login-container"}>
                            Loading data...
                        </div>
                    )
                }
            }).catch(e =>{
                console.error(e)
            })


        }catch(error){
            console.log(error)
        }
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
