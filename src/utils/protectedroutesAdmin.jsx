import { useContext } from "react";
import { Context } from "../App";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutesAdmin({ role }) {
  const isAdmin = role === "ADMIN";

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutesAdmin;
