import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaPrint, FaRegEye } from "react-icons/fa";
import TableLoadingSkeleton from "../../common/loadingSkeleton/TableLoadingSkeleton";
import { DateFormat } from "../../utils/DateFormate";
import Pagination from "../../common/pagination/Pagination";
import { toast } from "react-toastify";
import { SettingContext } from "../../context/SettingProvider";
import PrintableOfferInvoice from "../../common/printableInvoice/PrintableOfferInvoice";

const DeliveryCancelReturnTable = ({
  ordersData,
  limit,
  page,
  setPage,
  setLimit,
  isLoading,
  totalData,
  user,
  loading,
  refetch,
}) => {
  const [serialNumber, setSerialNumber] = useState();
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [selectedOrderProducts, setSelectedOrderProducts] = useState([]);

  const { settingData, loading: settingLoading } = useContext(SettingContext);

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);
  //handle View orderStatus Value Function

  const handlePrintClick = async (order) => {
    try {
      const response = await fetch(`${BASE_URL}/offer_order/${order?._id}`, {
        credentials: "include",
      });
      const result = await response.json();
      console.log(result);

      if (result?.statusCode === 200 && result?.success === true) {
        setSelectedOrder(result?.data);
        setSelectedOrderProducts(result?.data?.offer_products);
        setPrintModalOpen(true);
      }
    } catch (error) {
      toast.error("Failed to fetch order details for printing");
    }
  };

  if (loading) {
    return <TableLoadingSkeleton />;
  }

  return (
    <>
      {isLoading || loading ? (
        <TableLoadingSkeleton />
      ) : (
        <div className="">
          {/* Make the table wrapper horizontally scrollable */}
          <div className="mt-5 overflow-x-auto shadow-md">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="bg-[#fff9ee]">
                <tr className="divide-x divide-gray-300  font-semibold text-center text-white">
                  <td className="whitespace-nowrap p-4 ">SL No</td>
                  <td className="whitespace-nowrap p-4 ">Date</td>
                  <td className="whitespace-nowrap p-4 ">PRINT</td>
                  <td className="whitespace-nowrap p-4 ">CN_ID</td>
                  <td className="whitespace-nowrap p-4 ">Invoice No</td>
                  <td className="whitespace-nowrap p-4 ">Customer Name</td>
                  <td className="whitespace-nowrap p-4 ">Customer Phone</td>
                  <td className="whitespace-nowrap p-4 ">Order Status</td>
                  <td className="whitespace-nowrap p-4 ">Total Amount</td>
                  <td className="whitespace-nowrap p-4 ">Shipping Cost</td>
                  <td className="whitespace-nowrap p-4 ">Grand Total Amount</td>
                  <td className="whitespace-nowrap p-4 ">Shipping Location</td>
                  <td className="whitespace-nowrap p-4 ">Division</td>
                  <td className="whitespace-nowrap p-4 ">District</td>
                  <td className="whitespace-nowrap p-4 ">Area</td>
                  <td className="whitespace-nowrap p-4 ">Address</td>
                  <td className="whitespace-nowrap p-4 ">View Details</td>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center">
                {ordersData?.map((order, index) => (
                  <tr
                    key={order?._id}
                    className={`divide-x divide-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                    }`}
                  >
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {serialNumber + index + 1}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {DateFormat(order?.createdAt)}
                    </td>
                    <td className="whitespace-nowrap p-4 font-medium text-green-600">
                      {"#"}
                      {order?.consignment_id || "--"}
                    </td>

                    <td className="whitespace-nowrap p-4">
                      <button
                        onClick={() => handlePrintClick(order)}
                        className="flex items-center justify-center text-gray-800 hover:text-blue-700"
                      >
                        <FaPrint />
                        <span className="ml-2">Print</span>
                      </button>
                    </td>

                    <td className="whitespace-nowrap p-4">
                      <Link
                        to={`/all-offer-order-info/${order?._id}`}
                        className="underline font-medium text-blue-600"
                      >
                        {order?.invoice_id}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.customer_id?.user_name}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.customer_phone}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.order_status}
                    </td>

                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.sub_total_amount}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.shipping_cost}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.grand_total_amount}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.shipping_location}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.billing_division}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.billing_district}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.billing_area}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.billing_address}
                    </td>

                    <td className="whitespace-nowrap flex justify-center items-center p-4">
                      <div>
                        <Link
                          to={`/all-offer-order-info/${order?._id}`}
                          className=" text-gray-500 hover:text-gray-900"
                        >
                          <FaRegEye size={23} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* pagination */}
          {totalData > 10 && (
            <Pagination
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              totalData={totalData}
            />
          )}

          {printModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
                <PrintableOfferInvoice
                  order={selectedOrder}
                  orderProducts={selectedOrderProducts}
                  settingData={settingData}
                />
                <div className="p-4 flex justify-end">
                  <button
                    onClick={() => setPrintModalOpen(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DeliveryCancelReturnTable;
