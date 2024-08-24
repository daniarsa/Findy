import { Outlet } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";
 
const Layout = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};
 
export default Layout;