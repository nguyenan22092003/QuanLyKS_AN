import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import STORAGE, { getStorage } from "src/lib/storage";

const isAuthenticated = () => {
  return getStorage(STORAGE.TOKEN);
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? (
    <div>
      <Header isAdmin={true} />
      <SideBar>{children}</SideBar>
    </div>
  ) : (
    <Navigate to="/403" />
  );
};

export default PrivateRoute;
