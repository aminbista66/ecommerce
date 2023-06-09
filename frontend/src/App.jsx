import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <Routes>
      <Route element={<Home/>} path="/" index />
      <Route element={<ProductDetail/>} path="/product/:product_id" />
    </Routes>
  )
}

export default App
