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


export default function OrderList() {
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const getAuthUser = () =>{
    const userId = localStorage.getItem('user')
    const parsedID = JSON.parse(userId)
    console.log(parsedID)
    const id = parsedID.auth.user
    console.log(id)
    return id
}
  
  const getOrders = async() =>{
      axios.get(`http://localhost:8081/api/auth/user/${getAuthUser()}`)
      .then(response => {
          if(response){
              setOrders(response.data)
              console.log(response.data)
          }else if(!response.data[orders] < 1){
            console.log("No orders to display")
          }
      }).catch(e =>{
          console.log(e)
      }).finally(() => {
          setLoading(false)
      })
  }
  
  useEffect(() => {
      getOrders()
  }, [])


  const data = orders.orders

  //if data is being fetched
  if(loading) {
    return <p>Data is loading...</p>;
}
  
  return (
    <div style={{display: "flex", width: "150vh", minHeight: "100vh"}}>
      <div style={{display: "inline-block", width: "150vh"}}>
        <TableContainer component={Paper} sx={{maxWidth: 1200, padding: 6, margin: "auto", marginTop: 10, marginBottom: 10}}>
          <h1 style={{textAlign: "center"}}>Your orders, {orders.firstName}</h1>
          <Table sx={{padding: 20, minHeight: 350,}} aria-label="simple table">
            <TableHead>
              <TableRow sx={{maxHeight: 600}}>
                <TableCell></TableCell>
                <TableCell>Ticker</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Price(€)</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data ? (data.map((row) => (
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
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.comments}</TableCell>
                </TableRow>
              ))) : (
                <span style={{color: "red"}}>Couldn't retrieve data</span>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}