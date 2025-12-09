import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import "react-phone-number-input/style.css";
import PhoneInput, {
  formatPhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";
const AddWholeSeller = ({ refetch, setWholeSellerCreateModal, user }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [user_phone, setUserPhone] = useState();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDataPost = async (data) => {
    setLoading(true);

    if (user_phone) {
      const formatPhoneNumberValueCheck = formatPhoneNumber(user_phone);
      const isPossiblePhoneNumberValueCheck = isPossiblePhoneNumber(user_phone);
      const isValidPhoneNumberValueCheck = isValidPhoneNumber(user_phone);
      if (formatPhoneNumberValueCheck == false) {
        toast.error("Mobile number not valid !", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
        return;
      }
      if (isPossiblePhoneNumberValueCheck == false) {
        toast.error("Mobile number not valid !", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
        return;
      }
      if (isValidPhoneNumberValueCheck == false) {
        toast.error("Mobile number not valid !", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
        return;
      }
    }
    if (!data?.user_email && !user_phone) {
      toast.error("Email Or Phone is required !", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      return;
    }

    const sendData = {
      login_credentials: data?.user_email ? data?.user_email : user_phone,
      user_name: data?.user_name,
      user_email: data?.user_email,
      user_status: data?.user_status,
      user_phone: user_phone,
      user_password: data?.user_password,
      role_id: data?.role_id,
      user_publisher_id: user?._id,
    };

    try {
      const response = await fetch(
        `${BASE_URL}/wholeseller/dashboard?role_type=reseller_create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify(sendData),
        }
      );
      const result = await response.json();
      if (result?.statusCode == 200 && result?.success == true) {
        toast.success(
          result?.message
            ? result?.message
            : "WholeSeller created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setWholeSellerCreateModal(false);
        reset();
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Network error or server is down", {
        autoClose: 1000,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 p-2">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[750px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin uppercase">
        <div className="flex items-center justify-between mt-4">
          <h3
            className="sm:text-[26px] font-bold text-primaryColor"
            id="modal-title "
          >
            Create WholeSeller
          </h3>
          <button
            type="button"
            className="btn text-crossBtnHoverColor  p-1 absolute right-3 rounded-full top-3 hover:bg-crossBtnHoverColor hover:text-crossBtnHovertextColor cursor-pointer transition-all duration-300"
            onClick={() => setWholeSellerCreateModal(false)}
          >
            {" "}
            <RxCross1 size={20}></RxCross1>
          </button>
        </div>

        <hr className="mt-2 mb-6" />
        <form onSubmit={handleSubmit(handleDataPost)} className="">
          <div>
            <label
              htmlFor="user_name"
              className="block text-xs font-medium text-gray-700"
            >
              User Name
            </label>

            <input
              {...register("user_name", {
                required: "User name is required",
              })}
              type="text"
              id="user_name"
              placeholder="Enter user name"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
            {errors.user_name && (
              <p className="text-red-600 text-sm">
                {errors.user_name?.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="user_email"
              className="block text-xs font-medium text-gray-700 mt-2"
            >
              User Email
            </label>

            <input
              {...register("user_email")}
              type="text"
              id="user_email"
              placeholder="Enter user email"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
            {errors.user_email && (
              <p className="text-red-600 text-sm">
                {errors.user_email?.message}
              </p>
            )}
          </div>
          <div className="mt-2">
            <label htmlFor="user_phone">Phone</label>
            <PhoneInput
              className="mt-2 w-full rounded-md border-white-light bg-white px-2 py-1  text-black ps-4 placeholder:text-white-dark text-xl custom-input border fo"
              placeholder="Enter phone number"
              id="user_phone"
              value={user_phone}
              defaultCountry="BD"
              international
              countryCallingCodeEditable={false}
              onChange={setUserPhone}
              error={
                user_phone
                  ? !isValidPhoneNumber(user_phone) && "Invalid phone number"
                  : "Phone number required"
              }
            />
          </div>

          <div className="relative">
            <label
              htmlFor="user_password"
              className="block text-sm font-medium text-gray-700 mt-2"
            >
              Password
            </label>

            <input
              {...register("user_password", {
                validate: {
                  isPassword: (value) =>
                    value.length >= 4 ||
                    " Password must be at least 4 characters",
                },
                required: "User Password is required",
              })}
              type={showPassword ? "text" : "password"} // Dynamic type based on state
              id="user_password"
              placeholder="Enter user password"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
            {errors.user_password && (
              <p className="text-red-600 text-sm">
                {errors.user_password?.message}
              </p>
            )}

            {/* Eye icon for toggling password visibility */}
            <div
              className="absolute top-9 right-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaRegEye size={20} />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="mt-4 flex-1">
              <label
                htmlFor="user_status"
                className="block text-xs font-medium text-gray-700"
              >
                Status <span className="text-red-500">*</span>
              </label>
              <select
                {...register("user_status", {
                  required: " Status is required",
                })}
                className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
              >
                <option value="active">Active</option>
                <option value="in-active">In-Active</option>
              </select>
              {errors.user_status && (
                <p className="text-red-600 text-sm">
                  {errors.user_status.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-8 mt-4 justify-end">
            {loading == true ? (
              <div className="px-10 py-2 flex items-center justify-center  bg-btnBgColor text-btnTextColor rounded">
                <MiniSpinner />
              </div>
            ) : (
              <button
                className="rounded-[8px] py-[10px] px-[18px] bg-btnBgColor hover:bg-btnHoverColor  transform hover:translate-y-[-2px] transition duration-200 text-btnTextColor text-sm cursor-pointer uppercase"
                type="submit"
              >
                Create Whole-Seller
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWholeSeller;
