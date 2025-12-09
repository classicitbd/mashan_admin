import { RxCross1 } from "react-icons/rx";

const VariationProduct = ({
  setOpenVariationDetailsModal,
  getVariationDetails,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 p-2">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[1400px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin uppercase">
        <div className="flex items-center justify-between mt-4">
          <h3
            className="sm:text-[26px] font-bold text-primaryColor"
            id="modal-title "
          >
            Variation Product
          </h3>
          <button
            type="button"
            className="btn text-crossBtnHoverColor  p-1 absolute right-3 rounded-full top-3 hover:bg-crossBtnHoverColor hover:text-crossBtnHovertextColor cursor-pointer transition-all duration-300"
            onClick={() => setOpenVariationDetailsModal(false)}
          >
            {" "}
            <RxCross1 size={20}></RxCross1>
          </button>
        </div>

        <hr className="mt-2 mb-6" />
        <div className=" shadow-xl mt-6">
          <div className="overflow-x-auto scrollbar-thin scrollbar-hide ">
            <table className="w-full divide-y-2 divide-gray-200  text-sm ">
              <thead className="">
                <tr className="divide-x divide-gray-300 font-semibold text-center ">
                  <td className="whitespace-nowrap px-4 py-5">SL No</td>
                  <td className="whitespace-nowrap px-4 py-5">Variant Name</td>

                  <td className="whitespace-nowrap px-4 py-5">Variant Price</td>
                  <td className="whitespace-nowrap px-4 py-5">
                    Discount Price
                  </td>
                  <td className="whitespace-nowrap px-4 py-5">Buying Price</td>
                  <td className="whitespace-nowrap px-4 py-5">
                    Variant Quantity
                  </td>

                  <td className="whitespace-nowrap px-4 py-5">
                    Reseller Price
                  </td>
                  <td className="whitespace-nowrap px-4 py-5">
                    Whole-Seller Price
                  </td>
                  <td className="whitespace-nowrap px-4 py-5">
                    Whole-Seller Min Quantity
                  </td>

                  {/* <td className="whitespace-nowrap px-4 py-5">Image</td> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center">
                {getVariationDetails?.map((item, index) => (
                  <tr
                    key={index}
                    className={`text-center text-sm ${
                      index % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                    } hover:bg-blue-100`}
                  >
                    <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor text-center">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor text-center">
                      {" "}
                      {item?.variation_name}
                    </td>

                    <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                      {item?.variation_price}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                      {item?.variation_discount_price}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                      {item?.variation_buying_price}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                      {item?.variation_quantity}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                      {" "}
                      {item?.variation_reseller_price}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                      {" "}
                      {item?.variation_wholeseller_price}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                      {" "}
                      {item?.variation_wholeseller_min_quantity}
                    </td>

                    {/* <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 flex justify-center">
                      <img
                        className="w-[24px] h-[24px] rounded-[8px]"
                        src={
                          item.variation_image ||
                          "https://via.placeholder.com/50"
                        }
                        alt={item.variation_sku}
                      />
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariationProduct;
