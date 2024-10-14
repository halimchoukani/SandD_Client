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
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/addauction" element={<AddAuction />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
