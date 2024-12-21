import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Lenis from "lenis";
import useGetUser from "./pages/hooks/useGetUser";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ProtectedRoutesAdmin from "./utils/ProtectedRoutesAdmin";
import ProtectedRoutesTransporter from "./utils/ProtectedRoutesTransporter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import AddAuction from "./pages/AddAuction";
import MyAuctions from "./pages/MyAuctions";
import MyBids from "./pages/MyBids";
import Transactions from "./pages/Transactions";
import Payment from "./pages/Payment";
import PaymentHistory from "./pages/PaymentHistory";
import BoughtAuctions from "./pages/BoughtAuctions";
import SoldAuctions from "./pages/SoldAuctions";
import UsersManager from "./pages/UsersManager";
import AddTransporter from "./pages/AddTransporter";
import AdminTransactions from "./pages/AdminTransactions";
import TransporterInterface from "./pages/TransporterInterface";
import TransporterInterfaceMyTransactions from "./pages/TransporterInterfaceMyTransactions";
import Auction from "./pages/Auction";
import Auctions from "./pages/Auctions";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";

export const Context = createContext();

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { user, loading, fetchError } = useGetUser();

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (user) {
      console.log("User Data:", user);
      setIsSignedIn(true);
    }
  }, [user]);

  if (loading) {
    return <div className="w-full h-full text-3xl text-white">Loading...</div>;
  }

  if (fetchError) {
    localStorage.removeItem("token");
    setIsSignedIn(false);
    return <div>Error loading user data.</div>;
  }

  return (
    <Context.Provider value={{ isSignedIn, setIsSignedIn, user }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:code" element={<ResetPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/auction/:id" element={<Auction />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sell" element={<AddAuction />} />
            <Route path="/myauctions" element={<MyAuctions />} />
            <Route path="/mybids" element={<MyBids />} />
            <Route path="/transaction" element={<Transactions />} />
            <Route path="/payment/history" element={<PaymentHistory />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/auctions/bought" element={<BoughtAuctions />} />
            <Route path="/auctions/sold" element={<SoldAuctions />} />
            <Route element={<ProtectedRoutesAdmin role={user?.role} />}>
              <Route path="/admin" element={<UsersManager />} />
              <Route
                path="/admin/transporter/add"
                element={<AddTransporter />}
              />
              <Route
                path="/admin/transactions"
                element={<AdminTransactions />}
              />
            </Route>
            <Route element={<ProtectedRoutesTransporter role={user?.role} />}>
              <Route
                path="/transporter/all"
                element={<TransporterInterface />}
              />
              <Route
                path="/transporter"
                element={<TransporterInterfaceMyTransactions />}
              />
            </Route>
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
