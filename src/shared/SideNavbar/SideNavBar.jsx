import { useContext, useEffect, useState } from "react";
import { BiSolidCategoryAlt, BiSolidOffer, BiTask } from "react-icons/bi";
import { BsShieldPlus } from "react-icons/bs";
import {
  FaBorderAll,
  FaCheckCircle,
  FaClipboardList,
  FaShopware,
  FaSyncAlt,
  FaTimesCircle,
  FaTruck,
  FaUndoAlt,
  FaUsers,
} from "react-icons/fa";
import { FaUsersRays } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { IoGitPullRequestOutline } from "react-icons/io5";
import {
  MdDeleteForever,
  MdOutlineReviews,
  MdOutlineSettings,
} from "react-icons/md";
import { PiFlagBannerFill, PiUsersThree } from "react-icons/pi";
import { RiCoupon2Line } from "react-icons/ri";
import { SiGoogletasks } from "react-icons/si";
import { TbCategoryPlus } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { LoaderOverlay } from "../../common/loader/LoderOverley";
import { AuthContext } from "../../context/AuthProvider";
import { SettingContext } from "../../context/SettingProvider";
import { ChildMenuItem, DropdownMenu, MenuItem } from "./DropdownAndMenuItem";
const SideNavBar = () => {
  const { pathname } = useLocation();
  const { settingData, loading: settingLoading } = useContext(SettingContext);
  const { user, loading } = useContext(AuthContext);
  const [activeDropdown, setActiveDropdown] = useState(null); // Centralized state to track open dropdown
  //const [activeChildDropdown, setActiveChildDropdown] = useState(null); // Centralized state to track open dropdown
  //const { t } = useTranslation();

  useEffect(() => {
    // Retrieve active dropdown from localStorage when the component mounts
    const saveDropDown = localStorage.getItem("activeDropdown");
    if (saveDropDown) {
      setActiveDropdown(saveDropDown);
    }
    const saveChildDropDown = localStorage.getItem("activeChildDropdown");
    if (saveChildDropDown) {
      setActiveDropdown(saveChildDropDown);
    }
  }, []);

  // ............................................//..........................//

  // Toggle dropdowns, collapse others when one is opened
  const toggleDropdown = (dropdown) => {
    const newActiveDropdown = activeDropdown === dropdown ? null : dropdown;
    setActiveDropdown(newActiveDropdown);

    localStorage.setItem("activeDropdown", newActiveDropdown);
  };
  // Toggle dropdowns, collapse others when one is opened
  // const toggleChildDropdown = (dropdown) => {
  //   const newActiveChildDropdown =
  //     activeChildDropdown === dropdown ? null : dropdown;
  //   setActiveChildDropdown(newActiveChildDropdown);

  //   localStorage.setItem("activeChildDropdown", newActiveChildDropdown);
  // };

  // Collapse all dropdowns when a menu item is clicked
  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    localStorage.removeItem("activeDropdown");
  };

  // const closeAllChildDropdowns = () => {
  //   setActiveChildDropdown(null);
  //   localStorage.removeItem("activeChildDropdown");
  // };
  const isActive = (route) =>
    pathname === route ? "border-red-50 font-semibold border-blue-100" : "";

  if (settingLoading || loading) {
    return <LoaderOverlay />;
  }

  // ............................................//..........................//
  return (
    <div className="flex flex-col">
      <div className="flex-grow ">
        {/* Logo */}
        <div className="flex items-center justify-center border-b border-white  mt-1 pb-3">
          <Link to="/">
            <img
              src={settingData?.logo}
              alt="Logo"
              className="bg-white w-[210px] h-[55px]"
            />
          </Link>
        </div>
        {/* Menu */}
        <ul className="flex flex-col pb-4 space-y-[2px]">
          <MenuItem
            to="/"
            icon={GoHome}
            label="Dashboard"
            isActive={isActive("/")}
            onClick={closeAllDropdowns}
          />

          {/* ......Task Start....... */}

          {(user?.role_id?.category_show === true ||
            user?.role_id?.sub_category_show === true ||
            user?.role_id?.brand_show === true ||
            user?.role_id?.attribute_show === true) && (
            <DropdownMenu
              label="Task"
              icon={SiGoogletasks}
              isOpen={activeDropdown === "task"}
              onClick={() => toggleDropdown("task")}
            >
              {user?.role_id?.category_show === true && (
                <ChildMenuItem
                  to="/category"
                  icon={BiSolidCategoryAlt}
                  label="Category"
                  isActive={isActive("/category")}
                />
              )}

              {user?.role_id?.sub_category_show === true && (
                <ChildMenuItem
                  to="/sub-category"
                  icon={BiSolidCategoryAlt}
                  label="Sub-Category"
                  isActive={isActive("/sub-category")}
                />
              )}

              {user?.role_id?.brand_show === true && (
                <ChildMenuItem
                  to="/brand"
                  icon={BiSolidCategoryAlt}
                  label="Brand"
                  isActive={isActive("/brand")}
                />
              )}

              {user?.role_id?.attribute_show === true && (
                <ChildMenuItem
                  to="/attribute"
                  icon={BiSolidCategoryAlt}
                  label="Attribute"
                  isActive={isActive("/attribute")}
                />
              )}
            </DropdownMenu>
          )}

          {/* ......Task End....... */}

          {/* .........Product Start...... */}

          {user?.role_id?.product_show === true && (
            <DropdownMenu
              label="Products"
              icon={BiTask}
              isOpen={activeDropdown === "products"}
              onClick={() => toggleDropdown("products")}
            >
              {user?.role_id?.product_show === true && (
                <ChildMenuItem
                  to="/product-list"
                  icon={TbCategoryPlus}
                  label="Product List"
                  isActive={isActive("/product-list")}
                />
              )}
              {user?.role_id?.product_create === true && (
                <ChildMenuItem
                  to="/product-create"
                  icon={TbCategoryPlus}
                  label="Add Product"
                  isActive={isActive("/product-create")}
                />
              )}
            </DropdownMenu>
          )}

          {/* .........Product End...... */}

          {/* ......Banner Start....... */}

          {user?.role_id?.banner_show === true && (
            <MenuItem
              to="/banner"
              icon={PiFlagBannerFill}
              label="Banner"
              isActive={isActive("/banner")}
              onClick={closeAllDropdowns}
            />
          )}

          {/* ......Banner End....... */}

          {/* staff......... Start */}
          {(user?.role_id?.admin_show === true ||
            user?.role_id?.role_show === true) && (
            <DropdownMenu
              label="Staff"
              icon={FiUsers}
              isOpen={activeDropdown === "staff"}
              onClick={() => toggleDropdown("staff")}
            >
              {user?.role_id?.admin_show && (
                <ChildMenuItem
                  to="/all-staff"
                  icon={PiUsersThree}
                  label="All Staff"
                  isActive={isActive("/all-staff")}
                />
              )}
              {user?.role_id?.role_show && (
                <ChildMenuItem
                  to="/create-staff-role"
                  icon={BsShieldPlus}
                  label="Add Staff Role"
                  isActive={isActive("/create-staff-role")}
                />
              )}
              {user?.role_id?.role_show && (
                <ChildMenuItem
                  to="/staff-role"
                  icon={BsShieldPlus}
                  label="Staff Role"
                  isActive={isActive("/staff-role")}
                />
              )}
            </DropdownMenu>
          )}
          {/* staff......... End */}

          {/* ......Offer Start....... */}

          {/* {user?.role_id?.offer_show === true && (
            <MenuItem
              to="/offer"
              icon={BiSolidOffer}
              label="Offer"
              isActive={isActive("/offer")}
              onClick={closeAllDropdowns}
            />
          )} */}
          {/* ......Offer End....... */}

          {/* ......Coupon Start....... */}
          {/* <MenuItem
            to="/coupon"
            icon={RiCoupon2Line}
            label="Coupon"
            isActive={isActive("/coupon")}
            onClick={closeAllDropdowns}
          /> */}
          {/* ......Coupon End....... */}
          {/* ......Review Start....... */}

          {user?.role_id?.review_show === true && (
            <MenuItem
              to="/review"
              icon={MdOutlineReviews}
              label="Review"
              isActive={isActive("/review")}
              onClick={closeAllDropdowns}
            />
          )}

          {/* ......Customer Start....... */}

          {user?.role_id?.customer_show === true && (
            <MenuItem
              to="/customer"
              icon={FaUsers}
              label="Customer"
              isActive={isActive("/customer")}
              onClick={closeAllDropdowns}
            />
          )}

          {/* ......Customer End....... */}
          {/* ......Review End....... */}
          {/* ......question Start....... */}
          {/* <MenuItem
            to="/question"
            icon={FaQuestion}
            label="Question"
            isActive={isActive("/question")}
            onClick={closeAllDropdowns}
          /> */}
          {/* ......question End....... */}
          {/* ......WholeSeller Start....... */}

          {/* <DropdownMenu
            label="Whole-Seller"
            icon={FaShopware}
            isOpen={activeDropdown === "whole_seller"}
            onClick={() => toggleDropdown("whole_seller")}
          >
            <ChildMenuItem
              to="/all-whole-seller"
              icon={FaUsersRays}
              label="All Whole-Seller"
              isActive={isActive("/all-whole-seller")}
            />
            <ChildMenuItem
              to="/whole-seller-request"
              icon={IoGitPullRequestOutline}
              label="Whole-Seller Request"
              isActive={isActive("/whole-seller-request")}
            />
            <ChildMenuItem
              to="/whole-seller-rejected"
              icon={MdDeleteForever}
              label="Whole-Seller Rejected"
              isActive={isActive("/whole-seller-rejected")}
            />
          </DropdownMenu> */}

          {/* ......ReSeller Start....... */}
          {/* <DropdownMenu
            label="Re-Seller"
            icon={FaShopware}
            isOpen={activeDropdown === "re_seller"}
            onClick={() => toggleDropdown("re_seller")}
          >
            <ChildMenuItem
              to="/all-re-seller"
              icon={FaUsersRays}
              label="All Re-Seller"
              isActive={isActive("/all-re-seller")}
            />
            <ChildMenuItem
              to="/re-seller-request"
              icon={IoGitPullRequestOutline}
              label="Re-Seller Request"
              isActive={isActive("/re-seller-request")}
            />
            <ChildMenuItem
              to="/re-seller-rejected"
              icon={MdDeleteForever}
              label="Re-Seller Rejected"
              isActive={isActive("/re-seller-rejected")}
            />
          </DropdownMenu> */}
          {/* ......ReSeller End....... */}
          {/* ......Site Setting....... */}
          {user?.role_id?.site_setting_update === true && (
            <MenuItem
              to="/settings"
              icon={MdOutlineSettings}
              label="Setting"
              isActive={isActive("/settings")}
            />
          )}

          {user?.role_id?.order_show === true && (
            <>
              <MenuItem
                to="/order"
                icon={FaClipboardList}
                label="Order List"
                isActive={isActive("/order")}
                onClick={closeAllDropdowns}
              />
              <MenuItem
                to="/processing-order"
                icon={FaSyncAlt}
                label="Processing Order"
                isActive={isActive("/processing-order")}
                onClick={closeAllDropdowns}
              />
              <MenuItem
                to="/steadfast-order"
                icon={FaCheckCircle}
                label="SteadFast Order"
                isActive={isActive("/steadfast-order")}
                onClick={closeAllDropdowns}
              />
              <MenuItem
                to="/delivery-order"
                icon={FaTruck}
                label="Delivery Order"
                isActive={isActive("/delivery-order")}
                onClick={closeAllDropdowns}
              />
              <MenuItem
                to="/return-order"
                icon={FaUndoAlt}
                label="Return Order"
                isActive={isActive("/return-order")}
                onClick={closeAllDropdowns}
              />
              <MenuItem
                to="/cancel-order"
                icon={FaTimesCircle}
                label="Cancel Order"
                isActive={isActive("/cancel-order")}
                onClick={closeAllDropdowns}
              />
            </>
          )}

          {/* ......Offer Order Start....... */}
          {/* {user?.role_id?.offer_order_show === true && (
          <DropdownMenu
            label="Offer Order"
            icon={FaShopware}
            isOpen={activeDropdown === "offer-order"}
            onClick={() => toggleDropdown("offer-order")}
          >
            <ChildMenuItem
              to="/pending-offer-order"
              icon={IoGitPullRequestOutline}
              label="Pendng Offer"
              isActive={isActive("/pending-offer-order")}
            />
            <ChildMenuItem
              to="/processing-offer-order"
              icon={IoGitPullRequestOutline}
              label="Processing Offer"
              isActive={isActive("/processing-offer-order")}
            />
            <ChildMenuItem
              to="/steadfast-offer-order"
              icon={IoGitPullRequestOutline}
              label="Steadfast Offer"
              isActive={isActive("/steadfast-offer-order")}
            />
            <ChildMenuItem
              to="/delivery-offer-order"
              icon={IoGitPullRequestOutline}
              label="Delivery Offer"
              isActive={isActive("/delivery-offer-order")}
            />
            <ChildMenuItem
              to="/return-offer-order"
              icon={IoGitPullRequestOutline}
              label="Return Offer"
              isActive={isActive("/return-offer-order")}
            />
            <ChildMenuItem
              to="/cancel-offer-order"
              icon={IoGitPullRequestOutline}
              label="Cancel Offer"
              isActive={isActive("/cancel-offer-order")}
            />
          </DropdownMenu>
          )} */}
          {/* ......Offer Order End....... */}

          {/* ......WholeSeller end.......  */}

          {/* <DropdownMenu
            label="Accounts"
            icon={MdAccountBalanceWallet}
            isOpen={activeDropdown === "accounts"}
            onClick={() => toggleDropdown("accounts")}
          >
            <ChildMenuItem
              to="/profit"
              icon={FaProductHunt}
              label="Profit"
              isActive={isActive("/profit")}
              onClick={closeAllChildDropdowns}
            />

            <ChildDropdownMenu
              label="Account Receivable"
              icon={RiFolderReceivedFill}
              isOpen={activeChildDropdown === "ar"}
              onClick={() => toggleChildDropdown("ar")}
            >
              <SubChildMenuItem
                to="/ar-list"
                icon={GiReceiveMoney}
                label="A/R List"
                isActive={isActive("/ar-list")}
              />
            </ChildDropdownMenu>
          </DropdownMenu> */}
        </ul>
      </div>
    </div>
  );
};

export default SideNavBar;
