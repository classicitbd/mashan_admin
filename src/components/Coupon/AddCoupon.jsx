import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { RiImageAddFill } from "react-icons/ri";
const AddCoupon = ({ setCouponCreateModal, refetch, user }) => {

  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef(null);
  //Initialize the state for coupon Amount type
  const [couponAmountType, setCouponAmountType] = useState("fixed");
  const [busOperatorType, setBusOperatorType] = useState("all");
  //const [addBusOperator, setAddBusOperator] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  // const [searchValue, setSearchValue] = useState("");
  // const [searchTerm, setSearchTerm] = useState("");

  // const { data: vendorData = [], isLoading } = useGetVendor(
  //   page,
  //   limit,
  //   searchTerm
  // );

  // // handle item search function....
  // const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  // useEffect(() => {
  //   setSearchTerm(searchText);
  // }, [searchText]);

  // // handle item search function....
  // const handleSearchValue = (value) => {
  //   setSearchValue(value);
  //   setLimit(10);
  //   setPage(1);
  // };

  // // Handle adding a Vendor
  // const handleAddVendor = (vendor) => {
  //   setAddBusOperator((addVendor) => [...addVendor, vendor]);
  // };

  // // Handle removing a Vendor
  // const handleDeleteVendor = (vendor) => {
  //   const newVendor = addBusOperator.filter((u) => u?._id !== vendor?._id);
  //   setAddBusOperator(newVendor);
  // };

  //...................Image Preview..................//

  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("coupon_image", file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("coupon_image", null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  //...................Image Preview..................//

  const handleDataPost = async (data) => {
    // setLoading(true);
    // // Check if start date is after end date
    // const startDate = new Date(data.coupon_start_date);
    // const endDate = new Date(data.coupon_end_date);

    // if (startDate > endDate) {
    //   toast.warn("Coupon start Date cannot be greater than End Date");
    //   setLoading(false);
    //   return;
    // }

    // if (data?.coupon_use_per_person > data?.coupon_use_total_person) {
    //   toast.warn(
    //     "Coupon Use Total Person is greater than Coupon Use Per Person"
    //   );
    //   setLoading(false);
    //   return;
    // }
    // if (data?.coupon_amount_type === "percent" && data?.coupon_amount >= 100) {
    //   toast.warn("Coupon Amount cannot be greater than 100 for percent type");
    //   setLoading(false);
    //   return;
    // }
    // if (busOperatorType === "specific" && addBusOperator?.length <= 0) {
    //   toast.warn("Please Add Some Vendors");
    //   setLoading(false);
    //   return;
    // }

    // try {
    //   const formData = new FormData();

    //   Object.entries(data).forEach(([key, value]) => {
    //     if (
    //       key === "coupon_max_amount" &&
    //       data.coupon_amount_type === "fixed"
    //     ) {
    //       return;
    //     }
    //     if (key === "coupon_image") {
    //       formData.append(key, data?.coupon_image);
    //     } else {
    //       formData.append(key, value);
    //     }
    //   });

    //   const operatorIds = addBusOperator?.map((operator) => ({
    //     bus_operator_id: operator?._id,
    //   }));

    //   formData.append(
    //     "coupon_specific_bus_operator",
    //     JSON.stringify(operatorIds)
    //   );
    //   formData.append("coupon_publisher_id", user?._id);

    //   const response = await fetch(`${BASE_URL}/bus_coupon`, {
    //     method: "POST",
    //     credentials: "include",
    //     body: formData,
    //   });
    //   const result = await response.json();
    //   if (result?.statusCode === 200 && result?.success === true) {
    //     toast.success(
    //       result?.message ? result?.message : "Coupon Create successfully",
    //       {
    //         autoClose: 1000,
    //       }
    //     );
    //     refetch();
    //     setLoading(false);
    //     setCouponCreateModal(false);
    //   } else {
    //     toast.error(result?.message || "Something went wrong", {
    //       autoClose: 1000,
    //     });
    //     setLoading(false);
    //   }
    // } catch (error) {
    //   toast.error(error?.message, {
    //     autoClose: 1000,
    //   });
    //   setLoading(false);
    // } finally {
    //   setLoading(false);
    // }
  };
  return (
    <div>
      <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 p-2">
          <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[950px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin uppercase">
            <div className="flex items-center justify-between mt-4">
              <h3
                className="sm:text-[26px] font-bold text-primaryColor"
                id="modal-title "
              >
                Create Coupon
              </h3>
              <button
                type="button"
                className="btn text-crossBtnHoverColor  p-1 absolute right-3 rounded-full top-3 hover:bg-crossBtnHoverColor hover:text-crossBtnHovertextColor cursor-pointer transition-all duration-300"
                onClick={() => {
                  setCouponCreateModal(false);
                }}
              >
                {" "}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className="mt-2 mb-6" />
            <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
              <div className="mt-4 w-full  grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Coupon Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("coupon_title", {
                      required: "Coupon Title is required",
                    })}
                    type="text"
                    placeholder="Coupon Title"
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  {errors.coupon_title && (
                    <p className="text-red-600">
                      {errors.coupon_title?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Coupon Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("coupon_code", {
                      required: "Coupon code is required",
                    })}
                    type="text"
                    placeholder="Coupon code"
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  {errors.coupon_code && (
                    <p className="text-red-600">
                      {errors.coupon_code?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Coupon Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("coupon_status", {
                      required: "Status is required",
                    })}
                    className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
                  >
                    <option value="active">Active</option>
                    <option value="in-active">In-Active</option>
                  </select>
                  {errors.coupon_status && (
                    <p className="text-red-600">
                      {errors.coupon_status.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Coupon Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("coupon_start_date", {
                      required: "Coupon Start Date is required",
                    })}
                    type="date"
                    min={new Date().toISOString().split("T")[0]} // 👈 This sets today as the minimum
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  {errors.coupon_start_date && (
                    <p className="text-red-600">
                      {errors.coupon_start_date?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Coupon End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("coupon_end_date", {
                      required: "Coupon end Date is required",
                    })}
                    type="date"
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  {errors.coupon_end_date && (
                    <p className="text-red-600">
                      {errors.coupon_end_date?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Coupon Use total Person{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("coupon_use_total_person", {
                      required: "Coupon Total Person is required",
                      validate: (value) => {
                        if (value < 1) {
                          return "Person must be greater than 0";
                        }
                      },
                    })}
                    type="number" onWheel={(e) => e.target.blur()}
                    placeholder="Coupon use total person"
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  {errors.coupon_use_total_person && (
                    <p className="text-red-600">
                      {errors.coupon_use_total_person?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Coupon Use Per Person{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("coupon_use_per_person", {
                      required: "Coupon use Person required",
                      validate: (value) => {
                        if (value < 1) {
                          return "Person must be greater than 0";
                        }
                      },
                    })}
                    type="number" onWheel={(e) => e.target.blur()}
                    placeholder="Coupon use per person"
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  {errors.coupon_use_per_person && (
                    <p className="text-red-600">
                      {errors.coupon_use_per_person?.message}
                    </p>
                  )}
                </div>
                {/* <div>
              {" "}
              <label className="block text-xs font-medium text-gray-700">
                Coupon Available
              </label>
              <input
                {...register("coupon_available", {
                  validate: (value) => {
                    if (value < 1) {
                      return "Coupon Number must be greater than 0";
                    }
                  },
                })}
                type="number" onWheel={(e) => e.target.blur()}
                placeholder="Coupon Available"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
              {errors.coupon_available && (
                <p className="text-red-600">
                  {errors.coupon_available?.message}
                </p>
              )}
            </div> */}
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Coupon Amount Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("coupon_amount_type", {
                      required: "Status is required",
                    })}
                    value={couponAmountType}
                    onChange={(e) => setCouponAmountType(e.target.value)}
                    className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
                  >
                    <option value="fixed">Fixed</option>
                    <option value="percent">Percent</option>
                  </select>
                  {errors.coupon_amount_type && (
                    <p className="text-red-600">
                      {errors.coupon_amount_type.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Coupon Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("coupon_amount", {
                      required: "Coupon Amount is required",
                      validate: (value) => {
                        if (value < 1) {
                          return "Amount must be greater than 0";
                        }
                      },
                    })}
                    type="number" onWheel={(e) => e.target.blur()}
                    placeholder="Coupon Amount"
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  {errors.coupon_amount && (
                    <p className="text-red-600">
                      {errors.coupon_amount?.message}
                    </p>
                  )}
                </div>
                {couponAmountType === "percent" && (
                  <div>
                    {" "}
                    <label className="block text-xs font-medium text-gray-700">
                      Coupon Max Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("coupon_max_amount", {
                        validate: (value) => {
                          if (value < 1) {
                            return "Max Amount must be greater than 0";
                          }
                        },
                      })}
                      type="number" onWheel={(e) => e.target.blur()}
                      placeholder="Coupon Max Amount"
                      className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                    />
                    {errors.coupon_max_amount && (
                      <p className="text-red-600">
                        {errors.coupon_max_amount?.message}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Coupon Description
                  </label>
                  <textarea
                    {...register("coupon_description")}
                    type="text"
                    placeholder="Coupon Description"
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                </div>

                {/* ........IMAGE......... */}
                <div className="">
                  <label className="block text-xs font-medium ">
                    Upload Image
                  </label>
                  {imagePreview ? (
                    <div className="relative">
                      <button
                        type="button"
                        className="btn bg-white p-1 absolute right-1 rounded-full top-1 text-red-600 "
                        onClick={() => handleRemoveImage()}
                      >
                        {" "}
                        <RxCross1 size={15}></RxCross1>
                      </button>

                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-[120px] object-cover my-2 rounded "
                      />
                    </div>
                  ) : (
                    <label
                      className="mt-1 w-full h-[120px] bg-gray-100 border-dashed border flex justify-center items-center rounded cursor-pointer"
                      htmlFor="coupon_image"
                      type="button"
                    >
                      <div className="flex flex-col items-center justify-center ">
                        <div>
                          <RiImageAddFill size={25} />
                        </div>
                        <p className="mt-2 text-[#C9CACA]" type="">
                          upload Image
                        </p>
                      </div>
                    </label>
                  )}
                  <input
                    {...register("coupon_image", {
                      required: "Coupon image is required",
                    })}
                    accept="image/*"
                    ref={imageInputRef}
                    type="file"
                    id="coupon_image"
                    className="mt-2 sm:text-sm p-0.5 file:cursor-pointer file:bg-primary file:text-white file:border-none file:rounded file:px-2 file:py-1.5"
                    onChange={handleImageChange}
                  />
                  {errors.coupon_image && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.coupon_image.message}
                    </p>
                  )}
                  <p className="text-xs text-[#696e6e]  mt-1 text-end">
                    Upload 300x300 pixel images in PNG, JPG, or WebP format (max
                    1 MB).
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Coupon Bus Operator Type{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("coupon_bus_operator_type", {
                      required: "Status is required",
                    })}
                    value={busOperatorType}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      setBusOperatorType(selectedValue);
                      if (selectedValue === "all") {
                        setAddBusOperator([]);
                      }
                    }}
                    className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
                  >
                    <option value="all">All</option>
                    <option value="specific">Specific</option>
                  </select>
                  {errors.coupon_bus_operator_type && (
                    <p className="text-red-600">
                      {errors.coupon_bus_operator_type.message}
                    </p>
                  )}
                </div>
              </div>

              {/* all vendor Add */}
              {/* <div className="my-6 ">
                {busOperatorType === "specific" && (
                  <div>
                    <div className="flex justify-between items-center ">
                      {" "}
                      <p className="mb-1 font-medium">Vendor Info : </p>
                   
                      <div className="my-6">
                        <input
                          type="text"
                          defaultValue={searchTerm}
                          onChange={(e) => handleSearchValue(e.target.value)}
                          placeholder="Search Vendors..."
                          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                      </div>
                    </div>
                    <>
                      {isLoading ? (
                        <TableLoadingSkeleton />
                      ) : (
                        <div>
                          {vendorData?.data?.length > 0 ? (
                            <div className=" border border-gray-200 mt-2 shadow-lg">
                              <div className="overflow-x-auto ">
                                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                  <thead className="ltr:text-left rtl:text-right  ">
                                    <tr className="divide-x divide-gray-300  font-semibold text-center text-white">
                                      <td className="whitespace-nowrap p-4 ">
                                        Add
                                      </td>

                                      <td className="whitespace-nowrap p-4 ">
                                        Vendor Name
                                      </td>
                                      <td className="whitespace-nowrap p-4 ">
                                        Vendor Phone
                                      </td>
                                      <td className="whitespace-nowrap p-4 ">
                                        Vendor Email
                                      </td>

                                      <td className="whitespace-nowrap p-4 ">
                                        Status
                                      </td>
                                    </tr>
                                  </thead>

                                  <tbody className="divide-y divide-gray-200 text-center">
                                    {vendorData?.data?.map((vendor, i) => (
                                      <tr
                                        key={vendor?._id}
                                        className={`text-center ${
                                          i % 2 === 0
                                            ? "bg-secondary-50"
                                            : "bg-secondary-100"
                                        } hover:bg-blue-100`}
                                      >
                                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                                          {addBusOperator.includes(vendor) ? (
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleDeleteVendor(vendor)
                                              }
                                              className="text-red-600 hover:text-red-400"
                                            >
                                              <RxCrossCircled size={25} />
                                            </button>
                                          ) : (
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleAddVendor(vendor)
                                              }
                                            >
                                              <MdAddToPhotos
                                                size={25}
                                                className="text-green-600 hover:text-green-500"
                                              />
                                            </button>
                                          )}
                                        </td>

                                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                                          {vendor?.vendor_name}
                                        </td>
                                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                                          {vendor?.vendor_phone ||
                                            vendor?.vendor_aditional_phone}
                                        </td>

                                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                                          {vendor?.vendor_email}
                                        </td>

                                        <td className="whitespace-nowrap py-1.5 ">
                                          {vendor?.vendor_status ===
                                          "active" ? (
                                            <p className="text-green-600">
                                              <span>Active</span>
                                            </p>
                                          ) : (
                                            <p className="text-red-600 ">
                                              <span>In-Active</span>
                                            </p>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ) : (
                            <NoDataFound />
                          )}
                        </div>
                      )}
                    </>
                    {vendorData?.totalData > 1 && (
                      <Pagination
                        page={page}
                        setPage={setPage}
                        limit={limit}
                        setLimit={setLimit}
                        totalData={vendorData?.totalData}
                      />
                    )}
                  </div>
                )}
              </div> */}

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
                    Create Coupon
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

export default AddCoupon;
