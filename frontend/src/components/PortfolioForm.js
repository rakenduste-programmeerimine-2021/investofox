import axios from "axios"
import React, { useState } from 'react'
import { STOCK_API_GLOBAL, TOKEN } from "./Utils/StockApi"
import './PortfolioForm.css';


export function PortfolioForm() {

    const [symbol, setSymbol] = useState('')
    const [stockChartXValues, setStockChartXValues] = useState([])
    const [stockChartYValues, setStockChartYValues] = useState([])
    const [stockChartZValues, setStockChartZValues] = useState([])
    const [change, setChange] = useState([])
    const [loading, setLoading]= useState(true)

    const handleSubmit = async(value) =>{
        value.preventDefault()
        const tickers = symbol

        try{
            axios.get(`${STOCK_API_GLOBAL}&symbol=${tickers}&apikey=${TOKEN}`)
            .then(res =>{
                if(res){
                    console.log(res.data)
                }

                const data = res.data['Global Quote']
                const yesterday = new Date()
                yesterday.setDate(yesterday.getDate())
                const time = yesterday.toISOString().slice(0, 17).replace("T", " ").concat("00")
                console.log(time)
                const price = data['05. price']
                const symbol = data['01. symbol']
                const changePercent = data['10. change percent']
                setStockChartXValues(time)
                setStockChartYValues(price + "$")
                setStockChartZValues(symbol)
                setChange(changePercent + "%")
                setLoading(false)
            }).catch(e =>{
                console.error(e)
            }).finally(() =>{
                if(loading){
                    return(
                        <div className={"login-container"}>
                            Loading data...
                        </div>
                    )
                }
            })


        }catch(error){
            console.log(error)
        }
        } //end of handleSubmit


        return (
            <div className="portfolioForm-page">
                <h1>Stock info</h1>
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
                            <p className="portfolioForm-fetchedPrice">
                                Symbol: {stockChartZValues}
                            </p>
                            <p>
                                Date: {stockChartXValues}
                            </p>
                            <p >
                                Price: {stockChartYValues}
                            </p>
                            <p >
                                {change < 0 ?(<div style={{color: "red"}}>Change: {change}</div>) : (<div style={{color: "green"}}>Change: {change}</div>)}
                                Change: {change}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    export default PortfolioForm
