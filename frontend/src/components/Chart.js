import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import { Line } from 'react-chartjs-2'
import { Context } from "../store";
import { loginUser } from '../store/actions';
import { LoginContext } from './LoginForm';

function Chart() {
    const [orderDate, setOrderDate] = useState([])
    const [TotalBalanceHistory, setTotalBalancehistory] = useState([])
    const [positionValues, setPositionValues] = useState([])
    const [totalBalance, setTotalBalance] = useState('')
    const [userState, setUserState] = useContext(Context)

    //fetch user data
    const userData = () =>{
        const userEmail = "gasparl@tlu.ee"

        try{
            axios.get(`http://localhost:8081/api/auth/user/${userEmail}`)
            .then(res =>{
                const result = res.data
                const orders = result.orders
                //console.log(orders)

                var balanceSum = 0;
                //iterate through response and get total portfolio value
                for( var i in orders){
                    const price = orders[i]['price']
                    const amount = orders[i]['amount']
                    const date = orders[i]['date']

                    // calculate the value of a position
                    const totalValue = price * amount

                    //get the dates of orders for the chart label section
                    setOrderDate(prev => [...prev, date])

                    //set each orders total position value
                    setPositionValues(prev => [...prev, totalValue])
                    balanceSum += totalValue
                    setTotalBalancehistory(prev => [...prev, balanceSum])
                    setTotalBalance(balanceSum)
                }

                //console.log("Pos values: " + positionValues)
                //console.log("Total money: " + TotalBalanceHistory)


            }).catch(e =>{
                console.log(e)
            })
        }catch(e){
            console.log(e)
        }
    }
    useEffect(() => {
       /* const data = localStorage.getItem("logged-in-user")
        if(data){
            setUserState(data)
        }*/
        userData()
    }, [])

    //get user state
    /*useEffect(() => {
        localStorage.setItem("logged-in-user", JSON.stringify(userState))
    })*/

    //chart variables
    const labels = orderDate
    const values = TotalBalanceHistory

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
