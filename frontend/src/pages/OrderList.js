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
import stockFetcher from '../components/StockFetcher';
import "./OrderList.css"


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
    const id = parsedID.auth.user
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

  //Calculates the profit or loss for the whole portfolio
  const profitLossTotalCalculator = (fetchArray) => {
    let profitLossTotal = 0;

    fetchArray.forEach((stock) => {
        if (!isNaN(Number(stock.profitLoss))) {
            profitLossTotal += Number(stock.profitLoss);
        }
    });

    return profitLossTotal.toFixed(2);
  }

  const getOrders = async() =>{
    setErrorMsg("")
    setFetchArray([])

    try{
      await axios.get(`http://localhost:8081/api/auth/user/${getAuthUser()}`)
      .then(response => {
          if(response){
              setUserInfo(response.data)

              const foo = userInfo.orders
              for(var i in foo){
                const fee = foo[i]
                setFetchArray(prev =>[...prev, fee])
              }

              if(fetchArray.length > 0){
                stockFetcher(fetchArray, setFetchArray, profitLossCalculator)
              }
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

  console.log("This is fetched array: " + JSON.stringify(fetchArray))

  useEffect (() =>{
      getOrders()
  }, [])






  //if data is being fetched
  if(loading) {
    return (
      <>
      <p>Data is loading...</p>
      </>)
}
  
  return (
    <div>
      <div style={{display: "flex", width: "150vh", minHeight: "100vh"}}>
        <div style={{display: "inline-block", width: "150vh"}}>
          <TableContainer component={Paper} sx={{maxWidth: 1200, padding: 6, margin: "auto", marginTop: 10, marginBottom: 10}}>
            <h1 style={{textAlign: "center"}}>Your orders, {userInfo.firstName}</h1>
            <div>            <h4>Total Profit: <p style={{color: `${profitLossTotalCalculator(fetchArray) <= 0 ? "red" : "green"}`}}>{profitLossTotalCalculator(fetchArray)}</p>
            </h4></div>

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
                    <TableCell align="right" style={{color: `${row.profitLoss <= 0 ? "red" : "green"}`}}>
                    {row.profitLoss}€
                    </TableCell>
                    <TableCell align="right">{row.comments}</TableCell>
                  </TableRow>
                ))) : (
                  <span style={{color: "red"}}>Couldn't retrieve data</span>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <button onClick={getOrders}>Update table</button>
        </div>

      </div>

    </div>
    
  )
}