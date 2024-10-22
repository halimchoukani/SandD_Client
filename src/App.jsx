import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
function App() {
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/auction/:id" element={<Auction />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/myauctions" element={<MyAuctions />} />
        <Route path="/sell" element={<AddAuction />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
