import { IoMdClose, IoIosMenu } from "react-icons/io";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { LoaderOverlay } from "../../common/loader/LoderOverley";
import { BASE_URL } from "../../utils/baseURL";
import { toast } from "react-toastify";

//import { useTranslation } from "react-i18next";
//import { AuthContext } from "@/context/AuthProvider";

const DashBoardNavbar = ({
  setSidebarOpen,
  isSidebarOpen,
  setMinibarOpen,
  isMinibarOpen,
}) => {
  //const { t } = useTranslation();
  // Assuming you are using functional components with hooks
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [setIsFullscreen] = useState(false);
  const { user, loading } = useContext(AuthContext);

  // const options = [
  //   {
  //     value: "en",
  //     label: (
  //       <div className="flex items-center">
  //         <img
  //           src="https://img.icons8.com/?size=100&id=15534&format=png&color=000000"
  //           alt="English"
  //           className="w-5 h-6 mr-2"
  //         />
  //         English
  //       </div>
  //     ),
  //   },
  //   {
  //     value: "bn",
  //     label: (
  //       <div className="flex items-center">
  //         <img
  //           src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg"
  //           alt="বাংলা"
  //           className="w-5 h-6 mr-2"
  //         />
  //         বাংলা
  //       </div>
  //     ),
  //   },
  // ];

  const menuRef = useRef(null);
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // FullScreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  //Language Change

  return (
    <nav className="bg-[#092339]  shadow-sm">
      <div className="py-1 px-2 sm:px-10 md:pl-3 md:pr-16">
        <div className="flex h-16 items-center gap-1 justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="flex-shrink-0 mr-5 hidden lg:block"
            >
              {isSidebarOpen ? (
                <IoMdClose className="text-lg sm:text-2xl text-white" />
              ) : (
                <IoIosMenu className="text-lg sm:text-2xl text-white" />
              )}
            </button>
          </div>

          <div className="flex justify-between gap-2">
            {/* <div>
              <Select
                options={options}
                onChange={(selected) => changeLanguage(selected.value)}
                defaultValue={options.find((opt) => opt.value === locale)}
              />
            </div> */}
            {/* <Link className="" to="/pos">
              <button className="border border-primaryVariant-500 px-4 sm:px-8 py-1 hover:bg-primary font-medium text-primary hover:text-white text-lg rounded shadow-xl transition-all duration-300">
                POS
              </button>
            </Link> */}

            <div className="sm:shrink-0 ">
              <div className="flex items-center gap-3">
                <div className="group hidden lg:block">
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="relative px-2 py-2 text-gray-500 focus:outline-none flex flex-col items-center rounded-md group-hover:bg-purple/20 hover:text-white transition duration-200 ease-in-out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#ffff"
                    >
                      <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" />
                    </svg>
                  </button>
                </div>

                <div className="relative">
                  <div
                    className="flex items-center ml-4 gap-2 cursor-pointer"
                    onClick={() => {
                      toggleDropdown();
                    }}
                    ref={menuRef}
                  >
                    {loading ? (
                      <LoaderOverlay />
                    ) : user?.admin_logo ? (
                      <button
                        className=" relative  sm:flex items-center rounded  text-sm focus:outline-none cursor-pointer"
                        id="user-menu-button"
                      >
                        <img
                          src={user?.admin_logo}
                          alt="user"
                          className="rounded-full h-[35px] w-[35px]"
                        />
                      </button>
                    ) : (
                      <button
                        className=" relative  sm:flex items-center rounded  text-sm focus:outline-none cursor-pointer"
                        id="user-menu-button"
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt="user"
                          className="rounded-full h-[35px] w-[35px]"
                        />
                      </button>
                    )}
                  </div>

                  {isDropdownOpen && (
                    <div
                      className={`absolute  ${isDropdownOpen ? "right-0" : "hidden"
                        } z-10 mt-4 w-52 origin-top-right rounded bg-white shadow-2xl focus:outline-none`}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      <Link
                        to="/my-profile"
                        className="block py-4 px-4  text-sm  w-full rounded hover:bg-gray-100"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                      >
                        Your Profile
                      </Link>
                      {/* <Link
                      to="/setting"
                      className="block py-4 px-4  text-sm  w-full rounded hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      Settings
                    </Link> */}
                      <p
                        onClick={async () => {
                          // Cookies.remove("sm_auto_mobile_token");
                          const response = await fetch(`${BASE_URL}/get_me/dashboard_data`, {
                            method: "POST",
                            credentials: "include",
                            headers: {
                              "Content-Type": "application/json",
                            },
                          });
                          const result = await response.json();
                          if (
                            result?.statusCode === 200 &&
                            result?.success === true
                          ) {
                            // setDropdownOpen(!isDropdownOpen);
                          } else {
                            toast.error(
                              result?.message || "Something went wrong",
                              {
                                autoClose: 1000,
                              }
                            );
                          }
                          setTimeout(() => {
                            toggleDropdown();
                            window.location.reload();
                          }, 1000);
                        }}
                        className="block py-3 px-4 cursor-pointer text-sm w-full rounded hover:bg-gray-100"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                      >
                        Sign Out
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMinibarOpen(!isMinibarOpen)}
              className="relative inline-flex items-center justify-center rounded-md   text-white lg:hidden "
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {isMinibarOpen ? (
                <svg
                  className="block h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashBoardNavbar;
