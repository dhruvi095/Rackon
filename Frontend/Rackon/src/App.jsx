import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home'
import Header from './Components/Header'
import Footer from './Components/Footer';
import DsOwner from './Components/DsOwner';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      {/* Header should be visible on all pages */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owner" element={<DsOwner/>} />
      </Routes>
      <Footer/>
    </Router>

    </>
  )
}

export default App




