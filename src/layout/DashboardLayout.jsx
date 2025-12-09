import { Outlet } from "react-router-dom";
import DashBoardNavbar from "../shared/DashboardNavbar/DashboardNavbar";
import {  useState } from "react";
import SideNavBar from "../shared/SideNavbar/SideNavBar";

//import { BASE_URL } from "@/utils/baseURL";

const DashboardLayout = () => {
  //   const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMinibarOpen, setMinibarOpen] = useState(false);
  // const { isSidebarOpen, setSidebarOpen } = useContext(AuthContext);
  //const [title, setTitle] = useState(""); // Add state for title
  //   useEffect(() => {
  //     fetch(`${BASE_URL}/setting`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setTitle(data?.data[0]?.title); // Set title from API response
  //       });
  //   }, []);
  //   useEffect(() => {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 3000);
  //   }, []);
  //   if (loading) return <LoaderOverlay />;
  return (
    <div className="flex h-screen bg-secondaryBackgroundColor">
      <title>Mashan Web Admin</title>

      {isSidebarOpen && (
        <div
          className={`hidden lg:block min-h-screen overflow-hidden overflow-y-auto scrollbar-thin transition-width duration-500 ease-in-out bg-backgroundColor ${
            isSidebarOpen ? "w-64" : "w-0"
          }`}
        >
          <SideNavBar />
        </div>
      )}
      {/* ------ mobile menu ------ start */}
      <div
        className={`h-screen w-10/12 sm:w-4/12 fixed inset-y-0 left-0 z-50  overflow-y-auto transition-transform duration-500 ease-in-out transform ${
          isMinibarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex min-h-screen flex-col justify-between bg-backgroundColor">
          <SideNavBar />
        </div>
      </div>
      {/* ------ mobile menu ------ end */}

      {/* Main content */}
      <div className="flex-1 flex flex-col sticky overflow-x-auto overflow-y-scroll">
        <header className="">
          <DashBoardNavbar
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
            isMinibarOpen={isMinibarOpen}
            setMinibarOpen={setMinibarOpen}
          />
        </header>

        {/* Main content area */}
        <div className="min-h-screen">
          {" "}
          <div className="py-4  md:px-6 px-2.5 ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
