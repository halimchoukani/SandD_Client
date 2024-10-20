import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Lenis from "lenis";
import Signup from "./components/signup";
import ProductPage from "./components/product";
import ProfileEdit from "./components/profileedit";
import ProtectedRoutes from "./components/utils/protectedroutes";
import NotFound from "./components/notfound";
import Dashboard from "./components/dashboard";
import Auctions from "./components/auctions";
import AddAuction from "./components/AddAuction";
import Profile from "./components/Profile";
import UsersList from "./components/UsersList";
import MyAuctions from "./components/MyAuctions";
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
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/auction/:id" element={<ProductPage />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/myauctions" element={<MyAuctions />} />
        <Route path="/userslist" element={<UsersList />} />
        <Route path="/sell" element={<AddAuction />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
