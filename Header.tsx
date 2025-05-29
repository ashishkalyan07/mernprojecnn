import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button} from 'antd';
import { Link} from 'react-router-dom';

const { Sider } = Layout;


const Headers = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={200} 
      style={{
        background: '#020212',  
        position: 'fixed', 
        height: '100vh',
        overflow: 'auto',
        left: 0,
      }}
      
    >
     <div >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
      > 
        <Menu.Item key="one">
          <Link to="/app/dashboard">Home</Link>
        </Menu.Item>
        <Menu.Item key="two">
          <Link to="/app/contact">Contact Us</Link>
        </Menu.Item>
        <Menu.Item key="three">
          <Link to="/app/product">Add Product</Link>
        </Menu.Item>
        <Menu.Item key="four">  
          <Link to="/app/cart">Cart</Link>
        </Menu.Item>
        <Menu.Item key="six">  
          <Link to="/app/orderHistory">My Orders</Link>
        </Menu.Item>
       <Menu.Item key="five">
          <Link to="/app/profile">My Profile</Link>
        </Menu.Item> 
        <Menu.Item key="seven">
          <Link to="/app/wallet">Wallet</Link>
        </Menu.Item>
        <Menu.Item key="eight">
          <Link to="/app/chat">Support/Help</Link>
        </Menu.Item>

       
      </Menu>
      </div>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          background:'white',
          width: 64,
          height: 64,
          position: 'absolute',
          bottom: 0,  
        }}
        
      />
    </Sider>
   
  );
};

export default Headers;
