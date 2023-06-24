import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'

function App() {
  return (
    <Routes>
      <Route element={<Home/>} path="/" index />
      <Route element={<ProductDetail/>} path="/product/:slug" />
      <Route element={<Cart/>} path="/cart" />
      <Route element={<Login/>} path="/login"/>
      <Route element={<Register/>} path="/register"/>
      <Route element={<Checkout/>} path="/checkout"/>
    </Routes>
  )
}

export default App
