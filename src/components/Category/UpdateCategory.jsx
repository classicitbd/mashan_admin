import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";
import { RxCross1 } from "react-icons/rx";
import { generateSlug } from "../../utils/generateSlug";
import { BASE_URL } from "../../utils/baseURL";
import { toast } from "react-toastify";
import { RiImageAddFill } from "react-icons/ri";

const UpdateCategory = ({
  setCategoryUpdateModal,
  categoryUpdateData,
  refetch,
  user,
}) => {
  const imageInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //Image preview....
  const [imagePreview, setImagePreview] = useState(
    categoryUpdateData?.category_image
  );
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("category_image", file);
    }
  };
  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("category_image", null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };
  //Image preview...

  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Append basic fields except image
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "category_image") {
          formData.append(key, value);
        }
      });

      // Append slug
      const category_slug = generateSlug(
        data?.category_name || categoryUpdateData?.category_name
      );
      formData.append("category_slug", category_slug);

      // Append image if provided
      if (data?.category_image) {
        formData.append("category_image", data?.category_image);
        formData.append(
          "category_image_key",
          categoryUpdateData?.category_image_key
        );
      }

      // Always append ID and updater
      formData.append("_id", categoryUpdateData?._id);
      formData.append("category_updated_by", user?._id);

      // Make the PATCH request
      const response = await fetch(`${BASE_URL}/category`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();

      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(result?.message || "Category updated successfully", {
          autoClose: 1000,
        });
        refetch();
        setCategoryUpdateModal(false);
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
                Update Category
              </h3>
              <button
                type="button"
                className="btn text-crossBtnHoverColor  p-1 absolute right-3 rounded-full top-3 hover:bg-crossBtnHoverColor hover:text-crossBtnHovertextColor cursor-pointer transition-all duration-300"
                onClick={() => setCategoryUpdateModal(false)}
              >
                {" "}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className="mt-2 mb-6" />

            <form onSubmit={handleSubmit(handleDataPost)} className="">
              <div>
                <label className="block text-xs font-medium text-primaryColor">
                  Category Name <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("category_name", {
                    required: "category name is required",
                  })}
                  type="text"
                  defaultValue={categoryUpdateData?.category_name}
                  placeholder="CATEGORY NAME"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors?.category_name && (
                  <p className="text-red-600">
                    {errors.category_name?.message}
                  </p>
                )}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {/* <div>
                  <label className="block text-xs font-medium text-primaryColor">
                    Category Status
                  </label>
                  
                  <p className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full">
                    {categoryUpdateData?.category_status}
                  </p>
                </div> */}
                <div>
                  <label className="block text-xs font-medium text-primaryColor">
                    Category serial <span className="text-red-500">*</span>
                  </label>

                  <input
                    {...register("category_serial", {
                      required: "category Serial is required",
                      validate: (value) => {
                        if (value < 1) {
                          return "serial must be greater than 0";
                        }
                        // else if (value > 100) {
                        //   return 'Serial must be less then 100'
                        // }
                      },
                    })}
                    defaultValue={categoryUpdateData?.category_serial}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder="TYPE NUMBER"
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  {errors.category_serial && (
                    <p className="text-red-600">
                      {errors.category_serial?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-primaryColor">
                    Category Header Show
                  </label>
                  <div className="whitespace-nowrap px-4 py-2">
                    <label
                      htmlFor="Toggle3"
                      className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-800"
                    >
                      <span className="relative mt-2">
                        <input
                          id="Toggle3"
                          type="checkbox"
                          defaultChecked={
                            categoryUpdateData?.category_header_show
                          }
                          className="hidden peer "
                          {...register("category_header_show")}
                        />
                        <div className="w-10 h-4 rounded-full shadow bg-slate-400 peer-checked:bg-btnHoverColor "></div>
                        <div className="absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto peer-checked:bg-primaryColor bg-btnHoverColor"></div>
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-primaryColor">
                    Category Browse Show
                  </label>
                  <div className="whitespace-nowrap px-4 py-2 ">
                    <label
                      htmlFor="Toggle4"
                      className="inline-flex items-center space-x-4 cursor-pointer"
                    >
                      <span className="relative mt-2">
                        <input
                          id="Toggle4"
                          type="checkbox"
                          className="hidden peer"
                          defaultChecked={
                            categoryUpdateData?.category_browse_show
                          }
                          {...register("category_browse_show")}
                        />
                        <div className="w-10 h-4 rounded-full shadow bg-slate-400 peer-checked:bg-btnHoverColor "></div>
                        <div className="absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto peer-checked:bg-primaryColor bg-btnHoverColor"></div>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-primaryColor">
                  Upload Category Image
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
                    htmlFor="category_image"
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
                  {...register("category_image", {
                    valiDate: {
                      isImage: (value) =>
                        (value[0] && value[0].type.startsWith("image/")) ||
                        "Only image files are allowed",
                    },
                  })}
                  accept="image/*"
                  type="file"
                  ref={imageInputRef} // Attach ref to input
                  id="category_image"
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
                    Update Category
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

export default UpdateCategory;
