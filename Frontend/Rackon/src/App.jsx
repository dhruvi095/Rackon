import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from './Components/Home'
import Header from './Components/Header'
import Footer from './Components/Footer';
import Sign from './Components/Sign'
import Login from './Components/Login'
import Reset from './Components/Reset'
import OTP from './Components/OTP'
import DsOwner from './Components/DsOwner'
import History from './Components/History'
import Payment from './Components/Payment'
import DsBrand from './Components/DsBrand';
import Contact from './Components/Contact'
import TC from './Components/TC'
import PP from './Components/PP'
import FAQ from './Components/FAQ'
import Brandhistory from './Components/Brandhistory'
import Brandpayment from './Components/Brandpayment'
<<<<<<< HEAD
=======

>>>>>>> 9e84105f3300a8532a19ac40079648becba2bc60
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

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Reset" element={<Reset />} />
          <Route path="/OTP" element={<OTP />} />
          <Route path="/owner" element={<DsOwner />} />
          <Route path="/History" element={<History />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/owner" element={<DsOwner />} />
          <Route path="/brand" element={<DsBrand />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/TC" element={<TC />} />
          <Route path="/PP" element={<PP />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/Brandhistory" element={<Brandhistory />} />
          <Route path="/Brandpayment" element={<Brandpayment />} />
        </Routes>
      </Layout>
    </Router>
  )
}
export default App