import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import AttributePage from "../pages/AttributePage/AttributePage";
import BannerPage from "../pages/BannerPage/BannerPage";
import BrandPage from "../pages/BrandPage/BrandPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import CouponPage from "../pages/CouponPage/CouponPage";
import CustomerPage from "../pages/CustomerPage/CustomerPage";
import DashBoardPage from "../pages/DashBoardPage/DashBoardPage";
import OfferPage from "../pages/OfferPage/OfferPage";
import AddProductPage from "../pages/ProductPage/AddProductPage";
import ProductListTablePage from "../pages/ProductPage/ProductListTablePage";
import UpdateProductPage from "../pages/ProductPage/UpdateProductPage";
import QuestionPage from "../pages/QuestionPage/QuestionPage";
import AllReSellerPage from "../pages/ReSellerPage/AllReSellerPage";
import ReSellerRejectPage from "../pages/ReSellerPage/ReSellerRejectPage";
import ReSellerReqPage from "../pages/ReSellerPage/ReSellerReqPage";
import ReviewPage from "../pages/ReviewPage/ReviewPage";
import SettingPage from "../pages/SettingPage/SettingPage";
import SubCategoryPage from "../pages/SubCategoryPage/SubCategoryPage";
import AllWholeSellerPage from "../pages/WholeSellerPage/AllWholeSellerPage";
import WholeSellerRejectPage from "../pages/WholeSellerPage/WholeSellerRejectPage";
import WholeSellerReqPage from "../pages/WholeSellerPage/WholeSellerReqPage";
import NotFound from "../shared/NotFound/NotFound";
import SignInPage from "../SignInPage/SignInPage";
import PrivateRoute from "./privateRoute";
import OrderPage from "../pages/OrderPage/OrderPage";
import StadefastProcessingOrderPage from "../pages/StadefastProcessingOrderPage/StadefastProcessingOrderPage";
import SteadfastOrderPage from "../pages/SteadfastOrderPage/SteadfastOrderPage";
import CancelOrderPage from "../pages/CancelOrderPage/CancelOrderPage";
import ReturnOrderPage from "../pages/ReturnOrderPage/ReturnOrderPage";
import DeliveryOrderPage from "../pages/DeliveryOrderPage/DeliveryOrderPage";
import AllStaffPage from "../pages/StaffAndRolePage/AllStaffPage/AllStaffPage";
import AddStaffRolePage from "../pages/StaffAndRolePage/AddStaffRolePage/AddStaffRolePage";
import StaffRoleTablePage from "../pages/StaffAndRolePage/StaffRoleTablePage/StaffRoleTablePage";
import ProfilePage from "../pages/MyProfilePage/ProfilePage";
import ViewAllOfferOrderInfo from "../components/OfferOrderPage/ViewAllOfferOrderInfo";
import OfferOrderPage from "../pages/OfferOrderPage/OfferOrderPage";
import StadefastProcessingOfferOrderPage from "../pages/OfferOrderPage/StadefastProcessingOfferOrderPage";
import SteadfastOfferOrderPage from "../pages/OfferOrderPage/SteadfastOfferOrderPage";
import DeliveryOfferOrderPage from "../pages/OfferOrderPage/DeliveryOfferOrderPage";
import ReturnOfferOrderPage from "../pages/OfferOrderPage/ReturnOfferOrderPage";
import CancelOfferOrderPage from "../pages/OfferOrderPage/CancelOfferOrderPage";
import ViewAllOrderInfo from "../components/Order/ViewAllOrderInfo";

const route = createBrowserRouter([
  {
    path: "/",
    element: (
      // <DashboardLayout />
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <DashBoardPage />,
      },
      {
        path: "/category",
        element: <CategoryPage />,
      },
      {
        path: "/sub-category",
        element: <SubCategoryPage />,
      },
      {
        path: "/brand",
        element: <BrandPage />,
      },
      {
        path: "/attribute",
        element: <AttributePage />,
      },

      //....staff......... Start
      {
        path: "/all-staff",
        element: <AllStaffPage />,
      },
      {
        path: "/staff-role",
        element: <StaffRoleTablePage />,
      },
      {
        path: "/create-staff-role",
        element: <AddStaffRolePage />,
      },
      //....staff.........End
      {
        path: "/banner",
        element: <BannerPage />,
      },

      // ......Product Start.......
      {
        path: "/product-list",
        element: <ProductListTablePage />,
      },
      {
        path: "/product-create",
        element: <AddProductPage />,
      },
      {
        path: "/product-update/:id",
        element: <UpdateProductPage />,
      },
      // ......Product End.......

      // ......offer.......
      {
        path: "/offer",
        element: <OfferPage />,
      },
      // ......coupon.......
      {
        path: "/coupon",
        element: <CouponPage />,
      },
      // ......customer.......
      {
        path: "/customer",
        element: <CustomerPage />,
      },
      // ......review.......
      {
        path: "/review",
        element: <ReviewPage />,
      },
      // ......question.......
      {
        path: "/question",
        element: <QuestionPage />,
      },
      // ......Whole-Seller.......
      {
        path: "/all-whole-seller",
        element: <AllWholeSellerPage />,
      },
      {
        path: "/whole-seller-request",
        element: <WholeSellerReqPage />,
      },
      {
        path: "/whole-seller-rejected",
        element: <WholeSellerRejectPage />,
      },
      // ......... Re-Seller.........
      {
        path: "/all-re-seller",
        element: <AllReSellerPage />,
      },
      {
        path: "/re-seller-request",
        element: <ReSellerReqPage />,
      },
      {
        path: "/re-seller-rejected",
        element: <ReSellerRejectPage />,
      },
      {
        path: "/my-profile",
        element: <ProfilePage />,
      },
      //....Site Settings Page....//
      {
        path: "/settings",
        element: <SettingPage />,
      },

      // ......Order.......//
      {
        path: "/order",
        element: <OrderPage />,
      },
      {
        path: "/processing-order",
        element: <StadefastProcessingOrderPage />,
      },
      {
        path: "/steadfast-order",
        element: <SteadfastOrderPage />,
      },
      {
        path: "/cancel-order",
        element: <CancelOrderPage />,
      },
      {
        path: "/return-order",
        element: <ReturnOrderPage />,
      },
      {
        path: "/delivery-order",
        element: <DeliveryOrderPage />,
      },
      {
        path: "/all-order-info/:id",
        element: <ViewAllOrderInfo />,
      },
      // ......Offer Order.......//
      {
        path: "/pending-offer-order",
        element: <OfferOrderPage />,
      },
      {
        path: "/processing-offer-order",
        element: <StadefastProcessingOfferOrderPage />,
      },
      {
        path: "/all-offer-order-info/:id",
        element: <ViewAllOfferOrderInfo />,
      },
      {
        path: "/steadfast-offer-order",
        element: <SteadfastOfferOrderPage />,
      },
      {
        path: "/delivery-offer-order",
        element: <DeliveryOfferOrderPage />,
      },
      {
        path: "/return-offer-order",
        element: <ReturnOfferOrderPage />,
      },
      {
        path: "/cancel-offer-order",
        element: <CancelOfferOrderPage />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
]);

export default route;
