import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from './Components/Home'
import Header from './Components/Header'
import Footer from './Components/Footer';
<<<<<<< HEAD
import Sign from './Components/Sign'
import Login from './Components/Login'
import Reset from './Components/Reset'
import OTP from './Components/OTP'

function Layout({ children }) {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/Sign" || location.pathname === "/Login" || location.pathname === "/Reset" || location.pathname === "/OTP";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

=======
import DsOwner from './Components/DsOwner';
>>>>>>> f4ab6cd5d3cdbee350c0ad5ee91af6afb3da784d
function App() {
  const [count, setCount] = useState(0)

  return (
<<<<<<< HEAD
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Reset" element={<Reset />} />
          <Route path="/OTP" element={<OTP />} />
        </Routes>
      </Layout>
=======
    <>
      <Router>
      {/* Header should be visible on all pages */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owner" element={<DsOwner/>} />
      </Routes>
      <Footer/>
>>>>>>> f4ab6cd5d3cdbee350c0ad5ee91af6afb3da784d
    </Router>
  )
}

export default App
