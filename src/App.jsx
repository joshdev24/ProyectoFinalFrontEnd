
import React from "react"
import { Route, Routes } from "react-router-dom"
import Login from "./screens/login/Login"
import Register from "./screens/register/Register"
import ForgotPassword from "./screens/forgotPassword/ForgotPassword"
import ResetPassword from "./screens/ResetPassword/ResetPassword"
import Home from "./screens/HomeScreen/HomeScreen"
import CreateProductScreen from "./screens/CreateProductScreen/CreateProductScreen"
import UpdateProduct from "./screens/UpdateProductScreen/UpdateProduct"
import ProductDetails from "./screens/ProductDetailScreen/ProductDetail"
import ProtectedRoute from "./Components/ProtectedRoute"
import DeleteProduct from "./screens/DeleteProductScreen/DeleteProduct"
import VerifyMail from "./screens/EmailVerify.jsx"
import UserCard from "./screens/userDetail.jsx"








function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify" element={<VerifyMail/>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/user" element={<UserCard />} />
          <Route path="/product/new" element={<CreateProductScreen />} />
          <Route path="/product/:product_id" element={<ProductDetails />} />
          <Route path="/product/update/:product_id" element={<UpdateProduct />} />
          <Route path="/product/delete/:product_id" element={<DeleteProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
