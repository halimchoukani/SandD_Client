import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoutes from "./utils/protectedroutes";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Auction from "./pages/Auction";
import MyAuctions from "./pages/MyAuctions";
import SignUp from "./pages/signup";
import AddAuction from "./pages/AddAuction";
import NotFound from "./pages/NotFound";
import Auctions from "./pages/Auctions";
import Lenis from "lenis";
import Home from "./pages/home";
import { useState, useEffect, createContext } from "react";
import useGetUser from "./pages/hooks/useGetUser";
import MyBids from "./pages/MyBids";
import Transactions from "./pages/transactions";
import Payment from "./pages/Payment";
import PaymentHistory from "./pages/PaymentHistory";
import BoughtAuctions from "./pages/BoughtAuctions";
import SoldAuctions from "./pages/SoldAuctions";
import TransporterInterface from "./pages/TransporterInterface";
export const Context = createContext();

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});
  const { user: userData, loading, error: fetchError } = useGetUser();

  // Set the user data and loading state when userData changes
  useEffect(() => {
    if (userData) {
      setUser(userData);
      setIsSignedIn(true);
    }
  }, [userData, fetchError]);

  if (loading)
    return <div className="w-full h-full text-3xl text-white">Loading...</div>;
  if (fetchError) {
    localStorage.removeItem("token");
    setIsSignedIn(false);
    return <div>Error loading user data.</div>;
  }
  return (
    <Context.Provider value={{ isSignedIn, setIsSignedIn, user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/transporter" element={<TransporterInterface />} />
            <Route path="/sell" element={<AddAuction />} />
            <Route path="/myauctions" element={<MyAuctions />} />
            <Route path="/mybids" element={<MyBids />} />
            <Route path="/transaction" element={<Transactions />} />
            <Route path="/payment/history" element={<PaymentHistory />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/auctions/bought" element={<BoughtAuctions />} />
            <Route path="/auctions/sold" element={<SoldAuctions />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/auction/:id" element={<Auction />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
