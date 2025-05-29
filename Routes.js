import React, { useEffect, useState } from 'react'
import { Route, Routes} from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import { Dashboard } from '../Views/Dashboard';
import { Product } from '../pages/Products/product.tsx';
import Headers from '../components/Header.tsx';
import Cart from '../pages/Cart/Cart.jsx';
import Summary from '../pages/Summary/summary.jsx';
import Contact from '../pages/Contact/contact.js';
import Profile from '../pages/Profile/profile.jsx';
import { OrderConfirm } from '../pages/OrderConfirm/orderConfirm.jsx';
import OrderHistory from '../pages/OrderConfirm/orderHistory.jsx';
import Wallet from '../pages/Wallet/Wallet.jsx';
import Payment from '../pages/Payment/Payment.jsx';
import PrivateRoute from './PrivateRoute.js';
import Chat from '../pages/Chat/Chat.jsx';

function ROUTES() {
  const [userDetails, setUserDetails] = useState('')
  useEffect(() => {
    const userDetails = localStorage.getItem('userData')
    setUserDetails(userDetails)
  })
  return (
    <div>
      {userDetails && (
        <Headers />
      )}
      <Routes>
        {/* Private Routes */}
        <Route path='/app' element={<PrivateRoute />}>
          <Route path='/app/profile' element={<Profile />} />
          <Route path='/app/contact' element={<Contact />} />
          <Route path='/app/dashboard' element={<Dashboard />} />
          <Route path='/app/product' element={<Product />} />
          <Route path='/app/cart' element={<Cart />} />
          <Route path='/app/summary' element={<Summary />} />
          <Route path='/app/orderConfirm' element={<OrderConfirm />} />
          <Route path='/app/orderHistory' element={<OrderHistory />} />
          <Route path='/app/wallet' element={<Wallet />} />
          <Route path='/app/payment' element={<Payment />} />
        <Route path='/app/chat' element={<Chat />} />
        </Route>
        {/* PublicRoutes */}
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </div>
  )
}
export default ROUTES;