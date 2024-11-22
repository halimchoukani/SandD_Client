import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Context } from "../App";

function ProtectedRoutesTransporter({ role }) {
  const isTransporter = role === "TRANSPORTER";
  return isTransporter ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutesTransporter;
