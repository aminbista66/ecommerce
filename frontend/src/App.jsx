import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'

function App() {
  return (
    <Routes>
      <Route element={<Home/>} path="/" index />
      <Route element={<ProductDetail/>} path="/product/:product_id" />
      <Route element={<Cart/>} path="/cart" />
    </Routes>
  )
}

export default App
