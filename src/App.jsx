
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



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password/:reset_token" element={<ResetPassword />}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/product/new' element={<CreateProductScreen/>}/>
        <Route path="/product/:product_id" element={<ProductDetails />} />
        <Route path='/product/update/:product_id' element={<UpdateProduct/>}/>
      </Routes>
    </>
  )
}

export default App
