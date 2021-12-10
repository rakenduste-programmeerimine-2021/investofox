import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useState, useEffect} from 'react'
import axios from "axios"
import { Checkbox } from '@mui/material';
import StockFetcher from '../components/StockFetcher';
import {STOCK_API, TOKEN} from '../components/Utils/StockApi'
import stockFetcher from '../components/StockFetcher';


export default function OrderList() {
  
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profit, setProfit] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fetchArray, setFetchArray] = useState([]);

  const orders = []
  
  const getAuthUser = () =>{
    const userId = localStorage.getItem('user')
    const parsedID = JSON.parse(userId)
    //console.log(parsedID)
    const id = parsedID.auth.user
    //console.log(id)
    return id
  }

  //Calculates the profit or loss for a single position
  const profitLossCalculator = (price, currentPrice, quantity) => {
    let profitLoss = 0;

    if (currentPrice) {
      profitLoss = (currentPrice - price) * quantity;
    }

    if(currentPrice > price){
      setProfit(true)
    }
    return profitLoss.toFixed(2)
  }

  useEffect (() =>{

    const getOrders = async() =>{
      setErrorMsg("")
      setFetchArray([])
      setUserInfo([])
  
      try{
        await axios.get(`http://localhost:8081/api/auth/user/${getAuthUser()}`)
        .then(response => {
            if(response){
              const result = response.data.orders
                setUserInfo(response.data)
  
            }else if(!response.data[orders] < 1){
              setErrorMsg("No orders to display. Add orders and try again")
            }
        }).catch(e =>{
            setErrorMsg("Something went wrong while trying to get your orders")
            console.log(errorMsg + e)
        }).finally(() => {
            setLoading(false)
        })
      }catch(e){
        console.log(e)
      }
    }
  
    const foo = userInfo.orders
    console.log(JSON.stringify(foo))
  
  

  
    /*useEffect(() => {
      getOrders()
  
      for(var i in foo){
        const fee = foo[i]
        setFetchArray(prev =>[...prev, fee])
      }
  
      StockFetcher(fetchArray, setFetchArray, profitLossCalculator)
    }, [])*/

    getOrders()

    for(var i in foo){
      const fee = foo[i]
      setFetchArray(prev =>[...prev, fee])
    }

    StockFetcher(fetchArray, setFetchArray, profitLossCalculator)

  }, [profit])
  





  console.log("This is fetched array: " + JSON.stringify(fetchArray))




  //if data is being fetched
  if(loading) {
    return (
      <>
      <p>Data is loading...</p>
      </>)
}
  
  return (
    <div style={{display: "flex", width: "150vh", minHeight: "100vh"}}>
      <div style={{display: "inline-block", width: "150vh"}}>
        <TableContainer component={Paper} sx={{maxWidth: 1200, padding: 6, margin: "auto", marginTop: 10, marginBottom: 10}}>
          <h1 style={{textAlign: "center"}}>Your orders, {userInfo.firstName}</h1>
          <Table sx={{padding: 20, minHeight: 350,}} aria-label="simple table">
            <TableHead>
              <TableRow sx={{maxHeight: 600}}>
                <TableCell></TableCell>
                <TableCell>Ticker</TableCell>
                <TableCell align="right">Price(€)</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Current price</TableCell>
                <TableCell align="right">Profit/Loss</TableCell>
                <TableCell align="right">Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchArray ? (fetchArray.map((row) => (
                <TableRow
                  key={row.ticker}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell padding= "checkbox">
                    <Checkbox color="primary" />
                </TableCell>
                  <TableCell component="th" scope="row">
                    {row.ticker}
                  </TableCell>
                  <TableCell align="right">{row.price}€</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.currentPrice}€</TableCell>
                  <TableCell align="right">{row.profitLoss}€</TableCell>
                  <TableCell align="right">{row.comments}</TableCell>
                </TableRow>
              ))) : (
                <span style={{color: "red"}}>Couldn't retrieve data</span>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <button onClick={console.log("heheh")}>Update table</button>
      </div>

    </div>
  )
}