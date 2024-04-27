import { Outlet } from "react-router-dom";
import { SideBar } from "../components/SideBar";

export const Layout = () => {
   return (
      <div className="app">
         <SideBar />
         <Outlet />
      </div>
   );
};
