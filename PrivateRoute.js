import React, { useEffect } from 'react';
import {Route,Navigate, useNavigate, Outlet} from "react-router-dom";

function PrivateRoute() {
    const navigate=useNavigate()
    useEffect(()=>{
        const userDetails=localStorage.getItem('userData')
        if(!userDetails){
          navigate('/login')
        }
    })
  
  return(
    <Outlet/>
  )
}

export default PrivateRoute
