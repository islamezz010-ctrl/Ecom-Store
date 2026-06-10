import "./index.css";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Login from "./pages/Login";
import Account from "./pages/Account";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#fcf8ff] text-[#1b1b21]">
        <Navbar />
        <CategoryBar />
        <main className="flex-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
