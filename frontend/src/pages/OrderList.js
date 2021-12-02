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

/*function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];*/
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const userId = "619aa016692c06db2976ea07"
  
  const getOrders = async() =>{
      axios.get(`http://localhost:8081/api/auth/user/${userId}`)
      .then(response => {
          if(response){
              console.log("Good fetch")
              setOrders(response.data)
              console.log(response.data)
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
    <>
    <h1 style={{ textAlign: "center"}}>Your orders, {orders.firstName}</h1>
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 1000 , margin: "auto", marginTop: 10, minHeight: 350}} aria-label="simple table">
        <TableHead>
          <TableRow sx={{maxHeight: 200}}>
            <TableCell>Ticker</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Price(€)</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Comments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.ticker}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell padding= "checkbox">
                <Checkbox
                    color="primary"
                />
            </TableCell>
              <TableCell component="th" scope="row">
                {row.ticker}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.comments}</TableCell>

            </TableRow>
        

          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}