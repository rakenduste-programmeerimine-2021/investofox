import axios from "axios"
import React, { useState } from 'react'
import { STOCK_API_GLOBAL, TOKEN, STOCK_API } from "./Utils/StockApi"
import './PortfolioForm.css';
import { Line } from 'react-chartjs-2'


export function PortfolioForm() {

    const [symbol, setSymbol] = useState('')
    const [stockChartXValues, setStockChartXValues] = useState([])
    const [stockChartYValues, setStockChartYValues] = useState([])
    const [stockChartZValues, setStockChartZValues] = useState([])
    const [change, setChange] = useState([])
    const [loading, setLoading]= useState(true)
    const [stockInfo, setStockInfo]= useState([])
    const [labels, setLabels]= useState([])
    const [values, setValues]= useState([])

    const handleSubmit = async(value) =>{
        value.preventDefault()
        const tickers = symbol
        setLabels([])
        setValues([])

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
                //console.log(time)
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


            axios.get(`${STOCK_API}&symbol=${tickers}&apikey=${TOKEN}`)
            .then(res =>{
                if(res){
                    console.log(res.data)
                }

                const data = res.data['Time Series (Daily)']
                setStockInfo(prev =>[...prev, data])
                for(var key in data){
                    const time = key
                    const price = data[key]['4. close']
                    console.log(time)
                    setLabels(prev =>[...prev, time])
                    setValues(prev =>[...prev, price])
                }

                setLoading(false)
            }).catch(e =>{
                console.error(e)
            })

        }catch(error){
            console.log(error)
        }
        } //end of get second api


    //data that is seen in the chart
    const data = {
        labels: labels,
        datasets: [{
            label: 'Portfolio performance',
            data: values,
            borderColor: "green",
            borderWidth: 2,
            backgroundColor: ["rgba(0, 255, 0, .1)"]
        }],
    }

    //visual options
    const options = {
        maintainAspectRation: true,
        responsive: true,
        responsiveAnimationDuration: 0,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize: 20,
                }
            }]
        },
        elements: {
            line: {
                tension: 0 // disables bezier curves
            }
        },
        legend: {
            labels: {
                fontSize: 20,
            
            }
        }


    }


        return (
            <div className="portfolioForm-page" data-testid="portfolioFormPage">
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
                                Change: {change}
                            </p>
                        </div>
                        <Line data={data}
                width={"1000vh"}
                height={"400vh"}
                options={options}
            />
                    </div>
                </div>
                <div>
            </div>
        </div>
        )
    }
    
    export default PortfolioForm
