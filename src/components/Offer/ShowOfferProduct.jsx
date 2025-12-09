import { useState } from "react";
import { GoEye } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import VariationProduct from "./VariationProduct";

const ShowOfferProduct = ({ setShowOfferProduct, offerProductData }) => {
  const [openVariationDetailsModal, setOpenVariationDetailsModal] =
    useState(false);
  const [getVariationDetails, setGetVariationDetails] = useState({});

  //Variation Details Function
  const showVariationDetails = (product) => {
    setOpenVariationDetailsModal(true);
    setGetVariationDetails(product);
  };
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[1400px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin ">
          <div className="flex items-center justify-between mt-4">
            <h3
              className="sm:text-[26px] font-bold text-primaryColor uppercase"
              id="modal-title "
            >
              Offer Product
            </h3>
            <button
              type="button"
              className="btn text-crossBtnHoverColor  p-1 absolute right-3 rounded-full top-3 hover:bg-crossBtnHoverColor hover:text-crossBtnHovertextColor cursor-pointer transition-all duration-300"
              onClick={() => setShowOfferProduct(false)}
            >
              {" "}
              <RxCross1 size={20}></RxCross1>
            </button>
          </div>

          <hr className="mt-2 mb-6" />
          {offerProductData?.length > 0 && (
            <div className="my-6 shadow-md  px-3 py-5 border rounded-lg">
              <p className="mb-1 font-medium uppercase">
                You Add This Product :{" "}
              </p>
              <div className="overflow-x-auto shadow-lg ">
                <table className="min-w-full divide-y-2 divide-gray-200  text-sm">
                  <thead className="ltr:text-left rtl:text-right scrollbar-thin">
                    <tr className="border divide-x text-center ">
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
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {offerProductData?.map((oneProduct, i) => (
                      <tr
                        key={oneProduct?._id}
                        className={`text-center text-sm ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        }`}
                      >
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex justify-center">
                          <img
                            src={oneProduct?.offer_product_id?.main_image}
                            alt=""
                            className="w-[34px] h-[34px] rounded-[8px]"
                          />
                        </td>

                        <td className="whitespace-nowrap px-4 py-2 font-medium text-primaryColor">
                          {oneProduct?.offer_product_id?.product_name}
                        </td>
                        <td className="">
                          <div className="flex justify-center items-center">
                            {/* <select
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
                            </select> */}
                            {oneProduct?.offer_discount_type}
                          </div>
                        </td>
                        <td>
                          {/* <input
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
                          /> */}
                          {oneProduct?.offer_discount_price}
                        </td>
                        <td className="whitespace-nowrap py-2 font-medium text-gray-900">
                          {/* <input
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
                          /> */}
                          {oneProduct?.offer_product_quantity}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-primaryColor">
                          {oneProduct?.offer_product_id?.product_price || "--"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-primaryColor">
                          {oneProduct?.offer_product_id?.product_discount_price
                            ? oneProduct?.offer_product_id
                                ?.product_discount_price
                            : 0}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-primaryColor">
                          <button
                            type="button"
                            onClick={() =>
                              showVariationDetails(
                                oneProduct?.offer_product_id?.variations
                              )
                            }
                            disabled={
                              oneProduct?.offer_product_id?.is_variation ===
                              false
                            }
                          >
                            <GoEye
                              size={22}
                              className={`${
                                oneProduct?.offer_product_id?.is_variation ===
                                false
                                  ? "text-gray-300  cursor-default"
                                  : "text-gray-600 cursor-pointer"
                              }`}
                            />
                          </button>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-primaryColor">
                          {oneProduct?.offer_product_id?.product_quantity
                            ? oneProduct?.offer_product_id?.product_quantity
                            : 0}
                        </td>

                        <td className="whitespace-nowrap px-4 py-2 ">
                          {oneProduct?.offer_product_id?.product_status ===
                          "active" ? (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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

export default ShowOfferProduct;
