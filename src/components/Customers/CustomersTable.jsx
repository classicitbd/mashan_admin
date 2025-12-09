import { useState } from "react";
import { BiShow } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import TableLoadingSkeleton from "../../common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "../../common/pagination/Pagination";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";
import CustomerStatusModal from "./CustomerStatusModal";
const CustomersTable = ({
  customers,
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  user,
  isLoading,
}) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [customerData, setCustomerData] = useState(false);
  // const [serialNumber, setSerialNumber] = useState();
  // useEffect(() => {
  //   const newSerialNumber = (page - 1) * limit;
  //   setSerialNumber(newSerialNumber);
  // }, [page, limit]);

  const handleInactiveStatus = (customer) => {
    setCustomerData(customer);
    setIsStatusModalOpen(true);
  };
  return (
    <>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {customers?.data.length > 0 ? (
            <div className="mt-6 shadow-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr className="divide-x divide-gray-300  font-semibold text-center">
                      <td className="whitespace-nowrap p-4 ">SL No</td>

                      <td className="whitespace-nowrap p-4 "> Name</td>
                      <td className="whitespace-nowrap p-4 "> phone</td>
                      {/* <td className="whitespace-nowrap p-4 "> Description</td> */}
                      {/* <td className="whitespace-nowrap p-4 "> Email</td> */}

                      <td className="whitespace-nowrap p-4 "> Status</td>
                      {user?.role_id?.customer_update === true && (
                        <td className="whitespace-nowrap p-4 ">Action</td>
                      )}
                    </tr>
                  </thead>

                  <tbody className="">
                    {customers?.data?.map((customer, i) => (
                      <tr
                        key={customer?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                          {i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 text-primaryColor ">
                          {customer?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                          {customer?.user_phone}
                        </td>

                        {/* <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                          <button
                            className="cursor-pointer"
                            // onClick={handleDescription}
                          >
                            <BiShow size={22} />
                          </button>
                        </td> */}
                        {/* <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                          01700000000
                        </td> */}
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor capitalize">
                          <p
                            className={`whitespace-nowrap py-1.5 font-medium ${
                              customer?.user_status === "active"
                                ? "text-green-600"
                                : customer?.user_status === "in-active"
                                ? "text-red-500"
                                : ""
                            }`}
                          >
                            {(customer?.user_status || "").replace("-", " ")}
                          </p>
                        </td>

                        {user?.role_id?.customer_update === true && (
                          <td className="whitespace-nowrap py-1.5 px-2 text-primaryColor">
                            {" "}
                            <button
                              onClick={() => handleInactiveStatus(customer)}
                            >
                              <FiEdit size={25} className="cursor-pointer " />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <NoDataFound />
          )}

          {/* pagination */}
          {totalData > 1 && (
            <Pagination
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              totalData={totalData}
            />
          )}
        </div>
      )}
      {/* status update modal */}
      {isStatusModalOpen && (
        <CustomerStatusModal
          customerData={customerData}
          setIsStatusModalOpen={setIsStatusModalOpen}
        />
      )}
    </>
  );
};

export default CustomersTable;
