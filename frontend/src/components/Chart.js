import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2'
import './Chart.css';


function Chart() {
    const [orderDate, setOrderDate] = useState([])
    const [totalBalanceHistory, setTotalBalancehistory] = useState([])
    const [positionValues, setPositionValues] = useState([])
    const [totalBalance, setTotalBalance] = useState('')
    const [stock, setStock] = useState([])
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


    //fetch user data
    const userData = async(userAuth) =>{

        setTotalBalancehistory([])

        try{
            await axios.get(`http://localhost:8081/api/auth/user/${userAuth}`)
            .then(res =>{
                const result = res.data
                const orders = result.orders
                //console.log(orders)

                var balanceSum = 0;
                //iterate through response and get total portfolio value
                for( var i in orders){
                    const ticker = orders[i]['ticker']
                    const price = orders[i]['price']
                    const amount = orders[i]['amount']
                    const date = orders[i]['date']

                    const stockInfo = {
                        ticker,
                        price,
                        amount,
                        date
                    }
                    setStock(prev =>[...prev, stockInfo])

                    // calculate the value of a position
                    const totalValue = price * amount

                    //get the dates of orders for the chart label section
                    setOrderDate(prev => [...prev, date])

                    //set each orders total position value, needed for future comparison between real time data
                    setPositionValues(prev => [...prev, totalValue])

                    balanceSum += totalValue
                    setTotalBalancehistory(prev => [...prev, balanceSum])
                    setTotalBalance(balanceSum)
                }
            }).catch(e =>{
                console.log(e)
            })
        }catch(e){
            console.log(e)
        }
    }

    const ApiFetch = async (stocks) => {

        //TO-DO
        //loop through stock list
        for(var j in stocks){

        }
    }



    useEffect(async() => {
        await userData(getAuthUser())
    }, [])

    /*console.log("Total balance: " + JSON.stringify(totalBalance))
    console.log("Stocks: " + stock)
    console.log("Order dates: "  + orderDate)
    console.log("Total balance history: " + totalBalanceHistory)*/


    //chart variables
    const labels = orderDate
    const values = totalBalanceHistory

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

    var time = new Date().toISOString().slice(0, 10)



    return(
        <div className="chart-page">
        {authenticatedUser ? (
        <div>
            <Line data={data}
                width={"1000vh"}
                height={"400vh"}
                options={options}
            />
            <div className="chart-chart">
                <h4>Total: {totalBalance}€</h4>
                <h4>Time: {time}</h4>
            </div>
        </div>) : (
            <block>
            <h1>You are not logged in!</h1>
            <a href="/login">Go back</a>
            </block>
        )}
        </div>


    )
}

export default Chart
