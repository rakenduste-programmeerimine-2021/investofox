import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2'


function Chart() {
    const [orderDate, setOrderDate] = useState([])
    const [totalBalanceHistory, setTotalBalancehistory] = useState([])
    const [positionValues, setPositionValues] = useState([])
    const [totalBalance, setTotalBalance] = useState('')
    const [stock, setStock] = useState([])

    //get the logged in user from local storage then get user ID
    const getAuthUser = () =>{
        try{
            const userId = localStorage.getItem('user')
            const foo = JSON.parse(userId)
            const id = foo.auth.user
            //console.log(id)
            return id
        }catch(e){
            console.log(e)
            console.log("No auth")
        }
    }


    //fetch user data
    const userData = (userAuth) =>{

        setTotalBalancehistory([])
        console.log(totalBalanceHistory)

        try{
            axios.get(`http://localhost:8081/api/auth/user/${userAuth}`)
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
                    console.log("stock " + JSON.stringify(stock))

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
                console.log("Total balance: " + totalBalance)
                console.log("Stocks: " + stock)
                console.log("Order dates: "  + orderDate)
                console.log("Total balance history: " + totalBalanceHistory)
            }).catch(e =>{
                console.log(e)
            })
        }catch(e){
            console.log(e)
        }
    }

    const ApiFetch = async () => {

        //TO-DO
        //loop through stock list
        console.log(stock)
    }



    useEffect(() => {
        userData(getAuthUser())
    }, [])
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
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
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

    return(
        <div>
            <Line data={data}
                width={1500}
                height={400}
                options={options}
            />
            <div className="chart-chart">
                <h4>Total: {totalBalance}€</h4>
            </div>
        </div>

    )
}

export default Chart
