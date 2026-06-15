import "./index.css";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import NotificationClearer from "./components/NotificationClearer";
import { NotificationProvider } from "./context/NotificationContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Order from "./pages/Order";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <NotificationProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#fcf8ff] text-[#1b1b21]">
          <NotificationClearer />
          <Toast />
          <Navbar />
          <CategoryBar />
          <main className="flex-1">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<Account />} />
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/success" element={<Success />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/category/:id" element={<CategoryPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;
