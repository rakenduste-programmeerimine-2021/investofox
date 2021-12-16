import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from "@mui/icons-material/Delete"
import { Button } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { Context } from "../store"
import axios from "axios"
import stockFetcher from '../components/StockFetcher';
import "./OrderList.css"
import { removeOrder } from '../store/actions';


export default function OrderList() {
  
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [fetchArray, setFetchArray] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [state, dispatch] = useContext(Context)

  const orders = []

  const getAuthUser = () =>{
    const userId = localStorage.getItem('user')
    const parsedID = JSON.parse(userId)
    const id = parsedID.auth.user
    return id
  }

  const deleteOrder = async(row) =>{

    const order = {
      ticker: row.ticker,
      amount: row.amount,
      price: row.price,
      date: row.date,
      comments: row.comments
    }

    console.log("Deleted order " + JSON.stringify(order))

    /*try{
      await axios.delete(`http://localhost:8081/api/auth/delete-order/${getAuthUser()}`, order)
      .then((res) =>{
        console.log("deleted " + JSON.stringify(res))
        setIsDelete(true)
      }).catch(e =>{
        console.log(e)
      })
    }catch(e){
      console.log("inside deleteORder: " + e)
    }*/

  }

  //Calculates the profit or loss for a single position
  const profitLossCalculator = (price, currentPrice, quantity) => {
    let profitLoss = 0;

    if (currentPrice) {
      profitLoss = (currentPrice - price) * quantity;
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

  const getOrders = async()=>{

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
            }else if(!response.data[orders] < 1){
              setErrorMsg("No orders to display. Add orders and try again")
            }
        }).then((() =>{
          if(fetchArray.length > 0){
            console.log("jeje")
            Promise.all([stockFetcher(fetchArray, setFetchArray, profitLossCalculator)])
            .then(function (results) {
              const acc = results[0]
              console.log("im here")
            });
          }
        }))
        .catch(e =>{
            setErrorMsg("Something went wrong while trying to get your orders")
            console.log(errorMsg + e)
        }).finally(() => {
            setLoading(false)
        })
      }catch(e){
        console.log(e)
      }
    }



  useEffect(() =>{
    getOrders()
  }, [])


  useEffect(async() =>{
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
            <div> 
              <h4>
                Total profit: <p style={{color: `${profitLossTotalCalculator(fetchArray) <= 0 ? "red" : "green"}`}}>{profitLossTotalCalculator(fetchArray)}€</p>
              </h4>
            </div>
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
                  <TableCell>
                    <Button onClick={() => deleteOrder(row)}>
                      <DeleteIcon />
                    </Button>
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
          <button onClick={() => getOrders()}>Update table</button>
        </div>
      </div>
    </div>
    
  )
}