import { useRef, useState } from "react";
import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";
import { RiImageAddFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/baseURL";
import { generateSlug } from "../../utils/generateSlug";

const BrandUpdate = ({
  setBrandUpdateModal,
  brandUpdateData,
  refetch,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //Image preview....
  const [imagePreview, setImagePreview] = useState(
    brandUpdateData?.brand_image
  );
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("brand_image", file);
    }
  };
  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("brand_image", null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };
  //Image preview....

  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Append basic fields except image
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "brand_image") {
          formData.append(key, value);
          console.log(key, value, 222);
        }
      });

      // Append slug
      const brand_slug = generateSlug(
        data?.brand_name || brandUpdateData?.brand_name
      );
      formData.append("brand_slug", brand_slug);

      // Append image if provided
      if (data?.brand_image) {
        formData.append("brand_image", data?.brand_image);
        formData.append("brand_image_key", brandUpdateData?.brand_image_key);
      }

      // Always append ID and updater
      formData.append("_id", brandUpdateData?._id);
      formData.append("brand_updated_by", user?._id);

      // Make the PATCH request
      const response = await fetch(`${BASE_URL}/brand`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();

      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(result?.message || "Brand updated successfully", {
          autoClose: 1000,
        });
        refetch();
        setBrandUpdateModal(false);
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error(error?.message || "Request failed", {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 p-2">
          <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[650px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin uppercase">
            <div className="flex items-center justify-between mt-4">
              <h3
                className="sm:text-[26px] font-bold text-primaryColor"
                id="modal-title "
              >
                Update Brand
              </h3>
              <button
                type="button"
                className="btn text-crossBtnHoverColor  p-1 absolute right-3 rounded-full top-3 hover:bg-crossBtnHoverColor hover:text-crossBtnHovertextColor cursor-pointer transition-all duration-300"
                onClick={() => setBrandUpdateModal(false)}
              >
                {" "}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className="mt-2 mb-6" />

            <form onSubmit={handleSubmit(handleDataPost)} className="">
              <div>
                <label className="block text-xs font-medium text-primaryColor">
                  Brand Name <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("brand_name", {
                    required: "Brand name is required",
                  })}
                  type="text"
                  defaultValue={brandUpdateData?.brand_name}
                  placeholder="BRAND NAME"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors?.brand_name && (
                  <p className="text-red-600">{errors.brand_name?.message}</p>
                )}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-primaryColor">
                    Brand Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("brand_status", {
                      required: "Brand Status is required",
                    })}
                    defaultValue={brandUpdateData?.brand_status}
                    className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
                  >
                    <option value="active">Active</option>
                    <option value="in-active">In-Active</option>
                  </select>
                  {errors.brand_status && (
                    <p className="text-red-600">
                      {errors.brand_status.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-primaryColor">
                    Brand serial <span className="text-red-500">*</span>
                  </label>

                  <input
                    {...register("brand_serial", {
                      required: "Brand Serial is required",
                      validate: (value) => {
                        if (value < 1) {
                          return "serial must be greater than 0";
                        }
                        // else if (value > 100) {
                        //   return 'Serial must be less then 100'
                        // }
                      },
                    })}
                    defaultValue={brandUpdateData?.brand_serial}
                    type="number" onWheel={(e) => e.target.blur()}
                    placeholder="TYPE NUMBER"
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  {errors.brand_serial && (
                    <p className="text-red-600">
                      {errors.brand_serial?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-primaryColor">
                  Upload Brand Image
                </label>
                {imagePreview ? (
                  <div className="relative">
                    <button
                      type="button"
                      className="btn bg-white p-1 absolute right-1 rounded-full top-1 text-red-600 cursor-pointer"
                      onClick={() => handleRemoveImage()}
                    >
                      {" "}
                      <RxCross1 size={15}></RxCross1>
                    </button>

                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover my-2 rounded "
                    />
                  </div>
                ) : (
                  <label
                    className="mt-1 w-full h-[160px] bg-gray-100 border-dashed border flex justify-center items-center rounded cursor-pointer"
                    htmlFor="brand_image"
                    type="button"
                  >
                    <div className="flex flex-col items-center justify-center ">
                      <div>
                        <RiImageAddFill size={25} />
                      </div>
                      <p className="mt-2 text-[#C9CACA]" type="">
                        upload image
                      </p>
                    </div>
                  </label>
                )}
                <input
                  {...register("brand_image", {
                    valiDate: {
                      isImage: (value) =>
                        (value[0] && value[0].type.startsWith("image/")) ||
                        "Only image files are allowed",
                    },
                  })}
                  accept="image/*"
                  type="file"
                  ref={imageInputRef} // Attach ref to input
                  id="brand_image"
                  className="mt-2  sm:text-sm p-0.5 file:cursor-pointer file:bg-primaryColor file:text-white file:border-none file:rounded file:px-2 file:py-1.5"
                  onChange={handleImageChange}
                />
                <p className="text-xs text-[#C9CACA]  mt-1 text-end">
                  Upload 300x300 pixel images in PNG, JPG, or WebP format (max 1
                  MB).
                </p>
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
                    Update Brand
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandUpdate;
