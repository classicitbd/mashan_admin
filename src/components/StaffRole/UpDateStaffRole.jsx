import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import { RxCross1 } from "react-icons/rx";
import { AuthContext } from "../../context/AuthProvider";
import permissionsData from "../../data/permissionData";
import { BASE_URL } from "../../utils/baseURL";
import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";

const UpDateStaffRole = ({ setUpdateModal, updateModalValue, refetch }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: updateModalValue, // Set default values here
  });

  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const watchAllFields = watch();

  useEffect(() => {
    reset(updateModalValue); // Reset the form with default values on mount
  }, [reset, updateModalValue]);

  // Add role permission
  const handleDataPost = async (data) => {
    setLoading(true);
    const sendData = {
      role_updated_by: user?._id,
      _id: updateModalValue?._id,
      role_name: data.role_name,
    };

    permissionsData?.forEach((section) => {
      section?.Type?.forEach((permission) => {
        sendData[permission?.type_value] =
          data[permission?.type_value] || false;
      });
    });

    try {
      const response = await fetch(`${BASE_URL}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(sendData),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(result?.message || "Role Update successfully", {
          autoClose: 1000,
        });
        refetch();
        setLoading(false);
        setUpdateModal(false);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative overflow-hidden text-left bg-white shadow-xl xl:w-[1150px] lg:w-[950px] md:w-[760px] sm:w-[600px] w-[550px] p-6 max-h-[100vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3
            className="text-[26px] font-bold text-gray-800 capitalize"
            id="modal-title"
          >
            Update Role Information
          </h3>
          <button
            type="button"
            onClick={() => setUpdateModal(false)}
            className="btn text-crossBtnHoverColor  p-1 absolute right-3 rounded-full top-3 hover:bg-crossBtnHoverColor hover:text-crossBtnHovertextColor cursor-pointer transition-all duration-300"
          >
            <RxCross1 size={20} />
          </button>
        </div>

        <hr className="mt-2 mb-4" />

        <form onSubmit={handleSubmit(handleDataPost)}>
          <div className="mt-4 max-w-lg">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Role Name
            </p>
            <input
              placeholder="Role Name"
              {...register("role_name", { required: "Role Name is required" })}
              id="role_name"
              type="text"
              defaultValue={updateModalValue?.role_name}
              className="block w-full px-2 py-1.5 text-gray-700 bg-white border border-gray-200 rounded"
            />
            {errors.role_name && (
              <p className="text-red-600">{errors.role_name.message}</p>
            )}
          </div>

          {/* Permissions */}
          <div className="mt-4">
            <h4 className="text-md font-semibold mb-2">Permissions</h4>
            <div>
              {permissionsData?.map((section) => (
                <div key={section?.Name} className="border rounded p-2 mb-4">
                  <p className="ml-1 font-semibold py-1 text-gray-700">
                    {section?.Name}
                  </p>
                  <hr className="mb-2" />
                  <div className="flex flex-wrap md:flex-nowrap md:justify-between items-center gap-3 py-2">
                    {section?.Type?.map((permission) => {
                      const isChecked = watchAllFields[permission?.type_value];
                      return (
                        <label
                          key={permission?.type_value}
                          htmlFor={permission?.type_value}
                          className={`flex items-center max-w-lg cursor-pointer w-full p-2 rounded ${
                            isChecked
                              ? "bg-green-500 text-white"
                              : "bg-gray-100"
                          }`}
                        >
                          <input
                            type="checkbox"
                            id={permission?.type_value}
                            {...register(permission?.type_value)}
                            className="mr-2"
                            defaultChecked={
                              updateModalValue?.[permission?.type_value] ||
                              false
                            } // Set default checked
                          />
                          <span
                            className={`text-sm ${
                              isChecked ? "text-white" : "text-gray-700"
                            }`}
                          >
                            {permission?.type_name}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-8 mt-6 justify-end">
            {loading == true ? (
              <div className="px-10 py-2 flex items-center justify-center  bg-btnBgColor text-btnTextColor rounded">
                <MiniSpinner />
              </div>
            ) : (
              <button
                className="rounded-[8px] py-[10px] px-[18px] bg-btnBgColor hover:bg-btnHoverColor  transform hover:translate-y-[-2px] transition duration-200 text-btnTextColor text-sm cursor-pointer uppercase"
                type="submit"
              >
                Update Role
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpDateStaffRole;
