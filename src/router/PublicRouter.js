import React from "react";
import Header from "./../components/Header/index";
import Footer from "../components/Footer";

const PublicRouter = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default PublicRouter;
