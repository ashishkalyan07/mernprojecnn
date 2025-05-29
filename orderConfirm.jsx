import React from 'react'
import conImg from '../../assets/OrderConfirm.png'

export const OrderConfirm = () => {
  return (
    <div className='text-center'>
    <img src={conImg} alt="logo" />
    <div className='text-center m-2 p-2 text-danger' >
 <h4>Your order and Payment is Successfully confirmed.Message will be send to your no and order has been shipped few days</h4>
    </div>

    <div>
        
    </div>
    </div>
  )
}
