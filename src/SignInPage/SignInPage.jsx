import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "react-phone-number-input/style.css";
import PhoneInput, {
  formatPhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../utils/baseURL";
import { toast } from "react-toastify";
import MiniSpinner from "../shared/MiniSpinner/MiniSpinner";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [admin_phone, setUserPhone] = useState();

  const location = useLocation();
  const form = location?.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const handleSignIn = async (data) => {
    setLoading(true);

    if (admin_phone) {
      const formatPhoneNumberValueCheck = formatPhoneNumber(admin_phone);
      const isPossiblePhoneNumberValueCheck =
        isPossiblePhoneNumber(admin_phone);
      const isValidPhoneNumberValueCheck = isValidPhoneNumber(admin_phone);
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

    if (!admin_phone) {
      toast.error(" Phone is required !", {
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
      admin_phone: admin_phone,
      admin_password: data?.admin_password,
    };
    try {
      const response = await fetch(`${BASE_URL}/admin_reg_log//login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Moved out of the headers
        body: JSON.stringify(sendData),
      });

      const result = await response.json();

      if (result?.statusCode == 200 && result?.success == true) {
        toast.success(
          result?.message ? result?.message : "Login successfully",
          {
            autoClose: 1000,
          }
        );
        navigate(form, { replace: true });
        window.location.reload();
        reset();

        setLoading(false);
      } else {
        console.log(result?.message);

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
    <div className="flex justify-center items-center md:min-h-screen py-7 px-2">
      <div className="w-full mx-3 md:w-[400px] px-3 md:px-10 pt-5 pb-14 border rounded bg-primaryColor shadow-md">
        <h2 className="text-2xl text-center text-white my-4 font-bold border-b border-green-300 pb-2">
          Login
        </h2>

        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <div className="form-control w-full border border-green-300  py-4 px-2 rounded-md">
            <div>
              <label htmlFor="admin_phone" className="text-white">
                Phone
              </label>
              <PhoneInput
                className="mt-2 w-full rounded-md border-white-light bg-white px-2 py-1.5  text-black ps-4 placeholder:text-white-dark text-xl custom-input"
                placeholder="Enter phone number"
                id="admin_phone"
                value={admin_phone}
                defaultCountry="BD"
                international
                countryCallingCodeEditable={false}
                onChange={setUserPhone}
                error={
                  admin_phone
                    ? !isValidPhoneNumber(admin_phone) && "Invalid phone number"
                    : "Phone number required"
                }
              />
            </div>

            <div className="relative">
              <label htmlFor="admin_password" className="block mt-2 text-white">
                Password
              </label>

              <input
                {...register("admin_password", {
                  required: "User Password is required",
                })}
                type={showPassword ? "text" : "password"} // Dynamic type based on state
                id="admin_password"
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 text-white"
              />
              {errors.admin_password && (
                <p className="text-red-600">{errors.admin_password?.message}</p>
              )}

              {/* Eye icon for toggling password visibility */}
              <div
                className="absolute top-[38px] right-3 cursor-pointer text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaRegEyeSlash size={20} />
                )}
              </div>
            </div>
          </div>

          <button
            className="px-10 py-2 text-primaryColor bg-green-300  w-full opacity-100 hover:opacity-80 transition-opacity duration-200 ease-in-out rounded-full cursor-pointer"
            type="submit"
          >
            {loading ? <MiniSpinner /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
