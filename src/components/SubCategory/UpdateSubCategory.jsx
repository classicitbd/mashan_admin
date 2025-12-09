import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RiImageAddFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import Select from "react-select";
import { toast } from "react-toastify";
import { LoaderOverlay } from "../../common/loader/LoderOverley";
import useGetCategory from "../../hooks/useGetCategory";
import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";
import { BASE_URL } from "../../utils/baseURL";
import { generateSlug } from "../../utils/generateSlug";
const UpdateSubCategory = ({
  setSubCategoryUpdateModal,
  subCategoryUpdateData,
  refetch,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategory_id] = useState(
    subCategoryUpdateData?.category_id?._id
  );
  const imageInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //Image preview....
  const [imagePreview, setImagePreview] = useState(
    subCategoryUpdateData?.sub_category_image
  );
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("sub_category_image", file);
    }
  };
  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("sub_category_image", null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };
  //Image preview....

  //get Category data
  const { data: categoryTypes, isLoading: categoryLoading } = useGetCategory();

  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Append basic fields except image
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "sub_category_image") {
          formData.append(key, value);
        }
      });

      // Append slug
      const sub_category_slug = generateSlug(
        data?.sub_category_name || subCategoryUpdateData?.sub_category_name
      );
      formData.append("sub_category_slug", sub_category_slug);

      // Append image if provided
      if (data?.sub_category_image) {
        formData.append("sub_category_image", data?.sub_category_image);
        formData.append(
          "sub_category_image_key",
          subCategoryUpdateData?.sub_category_image_key
        );
      }

      // Always append ID and updater
      formData.append("_id", subCategoryUpdateData?._id);
      formData.append("category_id", categoryId);
      formData.append("sub_category_updated_by", user?._id);

      // Make the PATCH request
      const response = await fetch(`${BASE_URL}/sub_category`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();

      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(result?.message || "Sub Category updated successfully", {
          autoClose: 1000,
        });
        refetch();
        setSubCategoryUpdateModal(false);
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

  if (categoryLoading) {
    return <LoaderOverlay />;
  }

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
                Update Sub-Category
              </h3>
              <button
                type="button"
                className="btn text-crossBtnHoverColor  p-1 absolute right-3 rounded-full top-3 hover:bg-crossBtnHoverColor hover:text-crossBtnHovertextColor cursor-pointer transition-all duration-300"
                onClick={() => setSubCategoryUpdateModal(false)}
              >
                {" "}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className="mt-2 mb-6" />

            <form onSubmit={handleSubmit(handleDataPost)} className="">
              <div>
                <label className="block text-xs font-medium text-primaryColor">
                  Sub Category Name
                </label>

                <input
                  {...register("sub_category_name", {
                    required: "Sub category name is required",
                  })}
                  type="text"
                  defaultValue={subCategoryUpdateData?.sub_category_name}
                  placeholder="SUB CATEGORY NAME"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors?.sub_category_name && (
                  <p className="text-red-600">
                    {errors.sub_category_name?.message}
                  </p>
                )}
              </div>

              <div className="mt-3">
                <label className="block text-xs font-medium  mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                {!categoryLoading && (
                  <Select
                    id="category_id"
                    name="category_id"
                    defaultValue={categoryTypes?.data?.find(
                      (option) =>
                        option?.category_name ===
                        subCategoryUpdateData?.category_id?.category_name
                    )}
                    aria-label="Category Type"
                    options={categoryTypes?.data}
                    getOptionLabel={(x) => x?.category_name}
                    getOptionValue={(x) => x?._id}
                    onChange={(selectedOption) => {
                      setCategory_id(selectedOption?._id);
                    }}
                  ></Select>
                )}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {/* <div>
                  <label className="block text-xs font-medium text-primaryColor">
                    Sub Category Status
                  </label>

                  <p className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full">
                    {subCategoryUpdateData?.sub_category_status}
                  </p>
                </div> */}
                <div>
                  <label className="block text-xs font-medium text-primaryColor">
                    Sub Category serial <span className="text-red-500">*</span>
                  </label>

                  <input
                    {...register("sub_category_serial", {
                      required: "Sub category Serial is required",
                      validate: (value) => {
                        if (value < 1) {
                          return "serial must be greater than 0";
                        }
                        // else if (value > 100) {
                        //   return 'Serial must be less then 100'
                        // }
                      },
                    })}
                    defaultValue={subCategoryUpdateData?.sub_category_serial}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder="TYPE NUMBER"
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  {errors.sub_category_serial && (
                    <p className="text-red-600">
                      {errors.sub_category_serial?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-primaryColor">
                    Sub Category Explore Show
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
                          className="hidden peer "
                          defaultChecked={
                            subCategoryUpdateData?.sub_category_explore_show
                          }
                          {...register("sub_category_explore_show")}
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
                  Upload Sub Category Image
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
                    htmlFor="sub_category_image"
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
                  {...register("sub_category_image", {
                    valiDate: {
                      isImage: (value) =>
                        (value[0] && value[0].type.startsWith("image/")) ||
                        "Only image files are allowed",
                    },
                  })}
                  accept="image/*"
                  type="file"
                  ref={imageInputRef} // Attach ref to input
                  id="sub_category_image"
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
                    Update Sub Category
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

export default UpdateSubCategory;
