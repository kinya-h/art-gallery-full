import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <div className=" w-full overflow-hidden">
      <NavBar />
      <div>
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
