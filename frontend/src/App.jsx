import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route element={<Home/>} path="/" index />
    </Routes>
  )
}

export default App
