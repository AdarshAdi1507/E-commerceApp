import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Public/Login.jsx";
import Home from "../Public/Home.jsx";
import Register from "../Public/Register.jsx";
import BecomeASeller from "../Private/Seller/BecomeASeller.jsx";
import Account from "../Private/Common/Account.jsx";
import Cart from "../Private/Customer/Cart.jsx";
import Order from "../Private/Customer/Order.jsx";
import App from "../App.jsx";
import VerifyOTP from "../Public/VerifyOtp.jsx";
import SellerDashboard from "../Private/Seller/SellerDashboard.jsx";

const AllRoutes = () => {
  const user = {
    userId: "123",
    username: "Harsh",
    role: "SELLER",
    authenticated: false ,
    accessExpiration: 3600,
    refreshExpirarion: 129600,
  };

  const { role, authenticated } = user;
  const routes = [];

  if (authenticated) {
    if (role === "CUSTOMER") {
      routes.push(
        <Route key="home" path="/home" element={<Home />} />,
        <Route key="account" path="/account" element={<Account />} />,
        <Route key="cart" path="/cart" element={<Cart />} />,
        <Route key="orders" path="/orders" element={<Order />} />
      );
    } else if (role === "SELLER") {
      routes.push(
        <Route key="sellerDashboard" path="/sellerDashboard" element={<SellerDashboard />} />
      );
    }
  } else {  
    routes.push(
      <Route key="login" path="/login" element={<Login />} />,
      <Route key="registercustomer" path="/register" element={<Register role={"CUSTOMER"}/>} />,
      <Route key="registerseller" path="seller/register" element={<Register role={"SELLER"} />} />,
      <Route key="verifyOTP" path="/verifyOTP" element={<VerifyOTP />} />
    );
  }

  return (
    <Routes>
      <Route path="/" element={<App />}>
        {routes}
      </Route>
    </Routes>
  );
};

export default AllRoutes;
