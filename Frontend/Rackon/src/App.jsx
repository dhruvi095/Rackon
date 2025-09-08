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
import DsBrand from './Components/DsBrand';
>>>>>>> 56a67200ae735717ba40782043d30e05955305b4
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
        <Route path="/brand" element={<DsBrand/>} />
      </Routes>
      <Footer/>
>>>>>>> 56a67200ae735717ba40782043d30e05955305b4
    </Router>
  )
}

export default App
