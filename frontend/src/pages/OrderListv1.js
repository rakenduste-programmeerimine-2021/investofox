import React from 'react';
import {useState, useEffect, useMemo} from 'react'
import '../components/RegisterForm.css';
import axios from "axios"
import {useTable} from 'react-table'
import COLUMNS from '../components/Columns'

export function OrderList() {
    const [orders, setOrders] = useState('');
    const columns = useMemo(() => COLUMNS, [])
 

   

    const tableInstance = useTable({
      columns,
      data 
    })

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
        })
    }

    useEffect(() => {
        getOrders()
    }, [])

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,

    } = tableInstance
    const foo = orders.orders
    const data = useMemo(() => foo, [])

 


    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) =>(
            <tr {...headerGroup.getHeaderGroupProps()}>
            {
              headerGroup.headers.map(column => (
                <th {...columns.getHeaderProps()}>{columns.render('Header')}</th>
                ))}

            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return(
            <tr {...row.getRowProps()}>
            {row.cells.map( (cell) => {
              return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            })}
          </tr>
          )
        })}
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    )
}

export default OrderList;
