import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./seemydata.css"

const SeeMyData = () => {
    let [data, setData] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:3000/data")
        .then((e)=>{
            setData(e.data)
        })
    }, [])
  return (
    <div>
    <div id='data'>
        {data.map((x)=>{
                return(
                    <div id='box'>
                        <table>
                            <th colSpan="2">{x.headingAccount}</th>
                            <tr>
                                <td>{x.UserName}</td>
                                <td>{x.userName}</td>
                            </tr>
                            <tr>
                                <td>{x.Email}</td>
                                <td>{x.email}</td>
                            </tr>
                            <tr>
                                <td>{x.Password}</td>
                                <td>{x.password}</td>
                            </tr>
                        </table>
                        <table>
                            <th colSpan="2">{x.headingPersonal}</th>
                            <tr>
                                <td>{x.FName}</td>
                                <td>{x.fName}</td>
                            </tr>
                            <tr>
                                <td>{x.LName}</td>
                                <td>{x.lName}</td>
                            </tr>
                            <tr>
                                <td>{x.Contact}</td>
                                <td>{x.contact}</td>
                            </tr>
                            <tr>
                                <td>{x.AlternativeContact}</td>
                                <td>{x.alternativeContact}</td>
                            </tr>
                        </table>
                        <table>
                            <th colSpan="2">{x.headingPayment}</th>
                            <tr>
                                <td>{x.nameS}</td>
                                <td>{x.name}</td>
                            </tr>
                            <tr>
                                <td>{x.cardNoS}</td>
                                <td>{x.cardNo}</td>
                            </tr>
                            <tr>
                                <td>{x.cvvS}</td>
                                <td>{x.cvv}</td>
                            </tr>
                            <tr>
                                <td>{x.monthS}</td>
                                <td>{x.month}</td>
                            </tr>
                            <tr>
                                <td>{x.yearS}</td>
                                <td>{x.year}</td>
                            </tr>
                        </table>
                    </div>
                )
            })}
    </div>
    <div style={{display:"flex", justifyContent:"center"}}>
        <Button variant='contained' size='large' color='warning'><Link to={`/`} style={{textDecoration:"none", color:"white"}}>Back to Home</Link></Button>
    </div>
    </div>
  )
}

export default SeeMyData