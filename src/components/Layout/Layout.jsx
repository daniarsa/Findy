import { Outlet } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";
 
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Outlet />
      </div>
      <NavigationBar />
    </div>
  );
};
 
export default Layout;