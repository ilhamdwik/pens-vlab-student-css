import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

export const Layout: React.FC<{}> = ({ children }) => {
  const { pathname } = useLocation();
  const dark = useSelector((state: RootState) => state.app.dark);

  return (
    <div className={`${dark ? "dark" : ""} overflow-x-hidden`}>
      <Navbar />
      <div className="pt-16 dark:bg-blueGray-800">{children}</div>
      {pathname !== "/playground" && <Footer /> 
        && 
      pathname !== "/playground_full" && <Footer />}
    </div>
  );
};

export default Layout;
