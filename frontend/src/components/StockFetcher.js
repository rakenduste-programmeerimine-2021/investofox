import { STOCK_API, TOKEN } from './Utils/StockApi';
import axios from "axios"

//Function which fetches the current prices and updates our state with current prices and profit/loss
const StockFetcher = (orderList, setOrders) => {

    //should do 4 cycles
    for(var i in orderList){
        if(orderList.length !== 0){
            //filter through orderList
            const ticker = orderList[i]['ticker']
            const price = orderList[i]['price']
            const amount = orderList[i]['amount']
            const date = orderList[i]['date']

            //fetch current order data
            axios.get(`${STOCK_API}&symbol=${ticker}&apikey=${TOKEN}`)
            .then(response => {
                const foo = JSON.stringify(response)

                if(response){
                    console.log("Response data: " + response.data)
                    const data = response.data
                    //var time = new Date().toISOString().slice(0, 10)
                    //const time = 2021-12-07
                    const todayDate = data['Time Series (Daily)']['2021-12-05']['4. close']

                    if(todayDate){
                        const currentPrice = todayDate

                        console.log(ticker + " Current price: " + currentPrice)

                        const stockInfo = {
                            ticker,
                            price,
                            amount,
                            date,
                            currentPrice
                        }
                        setOrders(prev =>[...prev, stockInfo])

                    }


                
                }else{
                    console.log("This symbol does not exist in the api")
                }
            }).catch(e =>{
                console.log("Something went wrong with StockFetcher" + e)
            })
        } else{
            console.log("There are no orderList to fetch :/")
            break;
        }

    }

    
    /*const getorderList = async() =>{
        axios.get(`http://localhost:8081/api/auth/user/${getAuthUser()}`)
        .then(response => {
            if(response){
                setorderList(response.data)
                console.log(response.data)
            }else if(!response.data[orderList] < 1){
              console.log("No orderList to display")
            }
        }).catch(e =>{
            console.log(e)
        }).finally(() => {
            setLoading(false)
        })
    }*/
  
}

export default StockFetcher;