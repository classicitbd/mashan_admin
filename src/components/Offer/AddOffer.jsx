import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { GoEye } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";
import { MdAddToPhotos } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import { RxCross1, RxCrossCircled } from "react-icons/rx";
import ReactQuill from "react-quill-new";
import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";
import useDebounced from "../../hooks/useDebounced";
import { BASE_URL } from "../../utils/baseURL";
import TableLoadingSkeleton from "../../common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "../../common/pagination/Pagination";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";
import VariationProduct from "./VariationProduct";
import { toast } from "react-toastify";
const AddOffer = ({ refetch, setOfferCreateModal, user }) => {
  const [loading, setLoading] = useState(false);
  //.........for Product...............//
  const [addOfferProducts, setAddOfferProducts] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [openVariationDetailsModal, setOpenVariationDetailsModal] =
    useState(false);
  const [getVariationDetails, setGetVariationDetails] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  //Fetch Offer data
  const { data: offerProducts = [], isLoading } = useQuery({
    queryKey: [
      `/api/v1/offer/dashboard/add_offer_product?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/offer/dashboard/add_offer_product?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          const errorData = await res.text();
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          );
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
  });

  //Variation Details Function
  const showVariationDetails = (product) => {
    setOpenVariationDetailsModal(true);
    setGetVariationDetails(product);
  };

  //Add Product Function
  const handleAddProduct = (product) => {
    if (!addOfferProducts.some((item) => item?._id === product?._id)) {
      const newArray = [...addOfferProducts, product];
      setAddOfferProducts(newArray);
    }
  };

  //Delete Product
  const handleDeleteProduct = (oneProduct) => {
    const newProducts = addOfferProducts.filter(
      (p) => p?._id !== oneProduct?._id
    );
    setAddOfferProducts(newProducts);
  };

  //get product Offer Quantity
  const handleOfferProductQuantity = (id, value) => {
    const newValue = value;

    if (newValue < 0) {
      toast.warn("Quantity cannot be negative or 0.");
      return;
    }

    const updatedItems = addOfferProducts?.map((item) =>
      item?._id === id ? { ...item, offer_product_quantity: newValue } : item
    );
    setAddOfferProducts(updatedItems);
  };

  //get product Offer Price
  const handleOfferPriceChange = (id, value) => {
    const newValue = value;

    if (newValue < 0) {
      toast.warn("Price cannot be negative.");
      return;
    }
    const product = addOfferProducts?.find((item) => item?._id === id);

    if (product?.offer_discount_type === "percent" && newValue > 99) {
      toast.warn("Percentage price cannot exceed 100.");
      return;
    }

    const updatedItems = addOfferProducts?.map((item) =>
      item?._id === id ? { ...item, offer_discount_price: newValue } : item
    );
    setAddOfferProducts(updatedItems);
  };

  //offer type
  const handlePriceTypeChange = (id, value) => {
    setSelectedValue(value);
    const updatedItems = addOfferProducts?.map((item) =>
      item?._id === id ? { ...item, offer_discount_type: value } : item
    );
    setAddOfferProducts(updatedItems);
  };

  //.........for Product...............//

  const imageInputRef = useRef(null);
  const [description, setDescription] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //Image preview....
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("offer_image", file);
    }
  };
  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("offer_image", null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };
  //Image preview....

  //data post of campaign
  const handleDataPost = async (data) => {
    setLoading(true);
    const offer_products = addOfferProducts?.map((item) => ({
      offer_product_quantity: item?.offer_product_quantity,
      offer_discount_price: item?.offer_discount_price,
      offer_discount_type: item?.offer_discount_type,
      offer_product_id: item?._id,
    }));
    try {
      const startDate = new Date(data?.offer_start_date);
      const endDate = new Date(data?.offer_end_date);
      if (endDate < startDate) {
        return toast.warn("Invalid Date");
      }
      if (!selectedValue) {
        return toast.warn("Please Select the Offer Discount Type");
      }
      if (addOfferProducts?.length < 0) {
        return toast.warn("Please Add Some Product");
      } else {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          if (key === "offer_image") {
            formData.append(key, data?.offer_image);
          } else {
            formData.append(key, value);
          }
        });

        formData.append("offer_publisher_id", user?._id);

        formData.append("offer_description", description);
        formData.append("offer_products", JSON.stringify(offer_products));

        const response = await fetch(`${BASE_URL}/offer`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });
        const result = await response.json();
        if (result?.statusCode === 200 && result?.success === true) {
          toast.success(
            result?.message
              ? result?.message
              : "Offer Product  created successfully",
            {
              autoClose: 1000,
            }
          );
          refetch();
          setLoading(false);
          setOfferCreateModal(false);
        } else {
          toast.error(result?.message || "Something went wrong", {
            autoClose: 1000,
          });
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value);
    setLimit(10);
    setPage(1);
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[1200px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin ">
          <div className="flex items-center justify-between mt-4">
            <h3
              className="sm:text-[26px] font-bold text-primaryColor uppercase"
              id="modal-title "
            >
              Create Offer
            </h3>
            <button
              type="button"
              className="btn text-crossBtnHoverColor  p-1 absolute right-3 rounded-full top-3 hover:bg-crossBtnHoverColor hover:text-crossBtnHovertextColor cursor-pointer transition-all duration-300"
              onClick={() => setOfferCreateModal(false)}
            >
              {" "}
              <RxCross1 size={20}></RxCross1>
            </button>
          </div>

          <hr className="mt-2 mb-6" />

          <form onSubmit={handleSubmit(handleDataPost)} className="">
            {/* <div>
              <label className="block text-xs font-medium text-primaryColor">
                Offer Title <span className="text-red-500">*</span>
              </label>

              <input
                {...register("offer_title", {
                  required: "Offer title name is required",
                })}
                type="text"
                placeholder="Offer title name"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
              {errors.offer_title && (
                <p className="text-red-600">{errors.offer_title?.message}</p>
              )}
            </div> */}

            <div className="my-4">
              <label className="block text-xs font-medium text-primaryColor mb-2 uppercase">
                Offer Description
              </label>

              <ReactQuill
                id="offer_description"
                required
                theme="snow"
                value={description}
                onChange={setDescription}
                placeholder="Enter Offer Description"
                className="h-56 mb-28 sm:mb-16"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-medium text-primaryColor uppercase">
                  Offer Start Date <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("offer_start_date", {
                    required: "Start date  is required",
                  })}
                  min={new Date().toISOString().split("T")[0]}
                  type="date"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.offer_start_date && (
                  <p className="text-red-600">
                    {errors.offer_start_date?.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-primaryColor uppercase">
                  Offer End Date <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("offer_end_date", {
                    required: "End date Serial is required",
                  })}
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.offer_end_date && (
                  <p className="text-red-600">
                    {errors.offer_end_date?.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-primaryColor uppercase">
                  Offer Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("offer_status", {
                    required: "Offer Status is required",
                  })}
                  className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
                >
                  <option value="active">Active</option>
                  <option value="in-active">In-Active</option>
                </select>
                {errors.offer_status && (
                  <p className="text-red-600">{errors.offer_status.message}</p>
                )}
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-xs font-medium text-primaryColor uppercase">
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
                  htmlFor="offer_image"
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
                {...register("offer_image", {
                  required: "Image is Required",
                  valiDate: {
                    isImage: (value) =>
                      (value[0] && value[0].type.startsWith("image/")) ||
                      "Only image files are allowed",
                  },
                })}
                accept="image/*"
                type="file"
                ref={imageInputRef} // Attach ref to input
                id="offer_image"
                className="mt-2  sm:text-sm p-0.5 file:cursor-pointer file:bg-primaryColor file:text-white file:border-none file:rounded file:px-2 file:py-1.5"
                onChange={handleImageChange}
              />
              <p className="text-xs text-[#C9CACA]  mt-1 text-end">
                Upload 300x300 pixel images in PNG, JPG, or WebP format (max 1
                MB).
              </p>

              {errors.offer_image && (
                <p className="text-red-600">{errors.offer_image?.message}</p>
              )}
            </div>

            {/* ....Product table Start here.... */}
            {/* {addOfferProducts?.length > 0 && (
              <div>
                <label htmlFor="" className="block font-medium text-gray-700 ">
                  {" "}
                  Offer Price
                  <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("offer_price", {
                    required: "Offer price is required",
                    validate: (value) => {
                      if (value < 1) {
                        return "Offer Price must be greater than 0";
                      }
                      // else if (value > 100) {
                      //   return 'Serial must be less then 100'
                      // }
                    },
                  })}
                  type="number"
                  placeholder="Offer price"
                  className="mt-2 w-1/2 rounded-md border-gray-200 shadow-sm sm:text-sm p-3 border-2"
                />
                {errors.offer_price && (
                  <p className="text-red-600">{errors.offer_price?.message}</p>
                )}
              </div>
            )} */}

            {addOfferProducts?.length > 0 && (
              <div className="my-6 shadow-md  px-3 py-5 border rounded-lg">
                <p className="mb-1 font-medium uppercase">
                  You Add This Product :{" "}
                </p>
                <div className="overflow-x-auto shadow-lg ">
                  <table className="min-w-full divide-y-2 divide-gray-200  text-sm">
                    <thead className="ltr:text-left rtl:text-right scrollbar-thin">
                      <tr className="border divide-x text-center ">
                        <th className="whitespace-nowrap p-2 font-medium text-white">
                          Delete
                        </th>

                        <th className="whitespace-nowrap p-2 font-medium text-white">
                          Product Img
                        </th>

                        <th className="whitespace-nowrap p-2 font-medium text-white">
                          Product name
                        </th>

                        <th className="whitespace-nowrap p-2 font-medium text-white">
                          Offer Discount Type
                        </th>
                        <th className="whitespace-nowrap p-2 font-medium text-white">
                          Offer Discount{" "}
                          <span className="text-red-500">Per(qty)</span>
                        </th>
                        <th className="whitespace-nowrap p-2 font-medium text-white">
                          Product Quantity
                        </th>
                        <th className="whitespace-nowrap p-2 font-medium text-white">
                          Price
                        </th>
                        <th className="whitespace-nowrap p-2 font-medium text-white">
                          Discount Price
                        </th>
                        <th className="whitespace-nowrap p-2 font-medium text-white">
                          variation
                        </th>
                        <th className="whitespace-nowrap p-2 font-medium text-white">
                          Quantity
                        </th>

                        <th className="whitespace-nowrap p-2 font-medium text-white">
                          Status
                        </th>
                        <th className="whitespace-nowrap p-2 font-medium text-white">
                          Brand
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-center">
                      {addOfferProducts?.map((oneProduct, i) => (
                        <tr
                          key={oneProduct?._id}
                          className={`text-center text-sm ${
                            i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                          }`}
                        >
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(oneProduct)}
                              className="cursor-pointer"
                            >
                              <RxCrossCircled
                                size={25}
                                className="text-red-600 hover:text-red-400 "
                              />
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex justify-center">
                            <img
                              src={oneProduct?.main_image}
                              alt=""
                              className="w-[34px] h-[34px] rounded-[8px]"
                            />
                          </td>

                          <td className="whitespace-nowrap px-4 py-2 font-medium text-primaryColor">
                            {oneProduct?.product_name}
                          </td>
                          <td className="">
                            <div className="flex justify-center items-center">
                              <select
                                className="rounded-md border-gray-300 shadow-sm sm:text-sm p-2 border-2"
                                required
                                onChange={(e) =>
                                  handlePriceTypeChange(
                                    oneProduct?._id,
                                    e.target.value
                                  )
                                }
                              >
                                {" "}
                                <option selected disabled>
                                  Select Price Type
                                </option>
                                <option value="fixed">Fixed</option>
                                <option value="percent">Percent</option>
                              </select>
                            </div>
                          </td>
                          <td>
                            <input
                              type="number"
                              required
                              onWheel={(e) => e.target.blur()}
                              value={oneProduct?.offer_discount_price || ""}
                              onChange={(e) =>
                                handleOfferPriceChange(
                                  oneProduct?._id,
                                  e.target.value
                                )
                              }
                              className="m-1 rounded-md border-gray-300 shadow-sm sm:text-sm border p-2"
                            />
                          </td>
                          <td className="whitespace-nowrap py-2 font-medium text-gray-900">
                            <input
                              type="number"
                              required
                              onWheel={(e) => e.target.blur()}
                              value={oneProduct?.offer_product_quantity || ""}
                              onChange={(e) =>
                                handleOfferProductQuantity(
                                  oneProduct?._id,
                                  e.target.value
                                )
                              }
                              className="m-1 rounded-md border-gray-300 shadow-sm sm:text-sm border p-2"
                            />
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-primaryColor">
                            {oneProduct?.product_price || "--"}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-primaryColor">
                            {oneProduct?.product_discount_price
                              ? oneProduct?.product_discount_price
                              : 0}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-primaryColor">
                            <button
                              type="button"
                              onClick={() =>
                                showVariationDetails(oneProduct?.variations)
                              }
                              disabled={oneProduct?.is_variation === false}
                            >
                              <GoEye
                                size={22}
                                className={`${
                                  oneProduct?.is_variation === false
                                    ? "text-gray-300  cursor-default"
                                    : "text-gray-600 cursor-pointer"
                                }`}
                              />
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-primaryColor">
                            {oneProduct?.product_quantity
                              ? oneProduct?.product_quantity
                              : 0}
                          </td>

                          <td className="whitespace-nowrap px-4 py-2 ">
                            {oneProduct?.product_status === "active" ? (
                              <button
                                type="button"
                                className="bg-green-500 text-white px-[10px] py-[4px] rounded-[8px]"
                                // onClick={() =>
                                //   handleAttributeActiveStatus(
                                //     attribute?._id,
                                //     attribute?.attribute_status
                                //       ? 'in-active'
                                //       : 'active'
                                //   )
                                // }
                              >
                                <span>Active</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="bg-red-500 text-white px-[10px] py-[4px] rounded-[8px]"
                                // onClick={() =>
                                //   handleAttributeInActiveStatus(
                                //     attribute?._id,
                                //     attribute?.attribute_status
                                //       ? 'active'
                                //       : 'in-active'
                                //   )
                                // }
                              >
                                <span>In-Active</span>
                              </button>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-primaryColor">
                            {oneProduct?.brand_id?.brand_name
                              ? oneProduct?.brand_id?.brand_name
                              : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Review Product hare Review Product*/}

            <div className="mt-4 px-3 py-5 border rounded-lg">
              <div className="flex justify-between items-center ">
                {" "}
                <p className="mb-1 font-medium uppercase">
                  Review Product Info :{" "}
                </p>
                {/* search Product... */}
                <div className="my-6">
                  <input
                    type="text"
                    defaultValue={searchTerm}
                    onChange={(e) => handleSearchValue(e.target.value)}
                    placeholder="SEARCH OFFER PRODUCT..."
                    className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:textColor focus:border-transparent transition duration-200"
                  />
                </div>
              </div>

              {isLoading ? (
                <TableLoadingSkeleton />
              ) : (
                <div className="overflow-x-auto shadow-lg">
                  {offerProducts?.data?.length > 0 ? (
                    <table className="min-w-full divide-y-2 divide-gray-200">
                      <thead className="ltr:text-left rtl:text-right text-center">
                        <tr className="border divide-x text-center text-sm">
                          <th className="whitespace-nowrap py-4 font-medium text-white">
                            ADD
                          </th>

                          <th className="whitespace-nowrap py-4 font-medium text-white">
                            Product Img
                          </th>
                          <th className="whitespace-nowrap py-4 font-medium text-white">
                            Product name
                          </th>

                          <th className="whitespace-nowrap py-4 font-medium text-white">
                            Price
                          </th>

                          <th className="whitespace-nowrap py-4 font-medium text-white">
                            Discount Price
                          </th>
                          <th className="whitespace-nowrap py-4 font-medium text-white">
                            variation
                          </th>
                          <th className="whitespace-nowrap py-4 font-medium text-white">
                            Quantity
                          </th>

                          <th className="whitespace-nowrap py-4 font-medium text-white">
                            Status
                          </th>
                          <th className="whitespace-nowrap py-4 font-medium text-white">
                            Brand
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200 text-center">
                        {offerProducts?.data?.map((product, i) => (
                          <tr
                            key={product?._id}
                            className={`text-center text-sm ${
                              i % 2 === 0
                                ? "bg-secondary-50"
                                : "bg-secondary-100"
                            } hover:bg-blue-100`}
                          >
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-primaryColor">
                              <button
                                type="button"
                                onClick={() => handleAddProduct(product)}
                                disabled={addOfferProducts?.some((item) => {
                                  item?._id === product?._id;
                                })}
                              >
                                <MdAddToPhotos
                                  className={`${
                                    addOfferProducts?.some(
                                      (item) => item?._id === product?._id
                                    )
                                      ? "text-green-300 cursor-default"
                                      : "text-green-600 hover:text-green-500 cursor-pointer"
                                  }`}
                                  size={25}
                                />
                              </button>
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium  flex justify-center">
                              <img
                                src={product?.main_image}
                                alt=""
                                className="w-[34px] h-[34px] rounded-[8px]"
                              />
                            </td>

                            <td className="whitespace-nowrap px-4 py-2 font-medium text-primaryColor">
                              {product?.product_name}
                            </td>

                            <td className="whitespace-nowrap px-4 py-2 text-primaryColor">
                              {product?.product_price || "--"}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-primaryColor">
                              {product?.product_discount_price
                                ? product?.product_discount_price
                                : "--"}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-primaryColor">
                              <button
                                type="button"
                                onClick={() =>
                                  showVariationDetails(product?.variations)
                                }
                                disabled={product?.is_variation === false}
                              >
                                <GoEye
                                  size={22}
                                  className={`${
                                    product?.is_variation === false
                                      ? "text-gray-400  cursor-default"
                                      : "text-primaryColor cursor-pointer"
                                  }`}
                                />
                              </button>
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-primaryColor">
                              {product?.product_quantity
                                ? product?.product_quantity
                                : 0}{" "}
                              {product?.unit}
                            </td>

                            <td className="whitespace-nowrap px-4 py-2 ">
                              {product?.product_status === "active" ? (
                                <button
                                  type="button"
                                  className="bg-green-500 text-white px-[10px] py-[4px] rounded-[8px]"
                                  // onClick={() =>
                                  //   handleAttributeActiveStatus(
                                  //     attribute?._id,
                                  //     attribute?.attribute_status
                                  //       ? 'in-active'
                                  //       : 'active'
                                  //   )
                                  // }
                                >
                                  <span>Active</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="bg-red-500 text-white px-[10px] py-[4px] rounded-[8px]"
                                  // onClick={() =>
                                  //   handleAttributeInActiveStatus(
                                  //     attribute?._id,
                                  //     attribute?.attribute_status
                                  //       ? 'active'
                                  //       : 'in-active'
                                  //   )
                                  // }
                                >
                                  <span>In-Active</span>
                                </button>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-primaryColor">
                              {product?.brand_id?.brand_name
                                ? product?.brand_id?.brand_name
                                : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <NoDataFound />
                  )}
                </div>
              )}
            </div>
            {offerProducts?.totalData > 1 && (
              <Pagination
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
                totalData={offerProducts?.totalData}
              />
            )}

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
                  Create Offer
                </button>
              )}
            </div>
          </form>
        </div>
        {/* Show Variation DesCription */}
        {openVariationDetailsModal && (
          <VariationProduct
            setOpenVariationDetailsModal={setOpenVariationDetailsModal}
            getVariationDetails={getVariationDetails}
          />
        )}
      </div>
    </div>
  );
};

export default AddOffer;
