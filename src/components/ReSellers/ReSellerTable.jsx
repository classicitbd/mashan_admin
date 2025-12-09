import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { ImInfo } from "react-icons/im";
import TableLoadingSkeleton from "../../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";
import ReSellerInactiveModal from "./ReSellerInactiveModal";
import ReSellerViewDetailsModal from "./ReSellerViewDetailsModal";
import Pagination from "../../common/pagination/Pagination";
const ReSellerTable = ({
  //refetch,
  reSellerApprovedData,

  isLoading,
  limit,
  page,
  setPage,
  setLimit,
  user,
  totalData,
}) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [reSellaerData, setReSellerData] = useState("");

  const handleInactiveStatus = (reSeller) => {
    setReSellerData(reSeller);
    setIsStatusModalOpen(true);
  };
  const handleViewDetails = (reSeller) => {
    setReSellerData(reSeller);
    setIsViewModalOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {reSellerApprovedData?.length > 0 ? (
            <div className="mt-6 shadow-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr className="divide-x divide-gray-300  font-semibold text-center">
                      <td className="whitespace-nowrap p-4 ">SL</td>
                      <td className="whitespace-nowrap p-4 ">User Name</td>
                      <td className="whitespace-nowrap p-4 ">User Phone</td>
                      <td className="whitespace-nowrap p-4 ">User Division</td>
                      <td className="whitespace-nowrap p-4 ">User District</td>
                      <td className="whitespace-nowrap p-4 ">User Address</td>
                      <td className="whitespace-nowrap p-4 ">Status</td>
                      <td className="px-4 py-2.5 text-center">Action</td>
                    </tr>
                  </thead>

                  <tbody className="">
                    {reSellerApprovedData?.map((reSeller, i) => (
                      <tr
                        key={reSeller?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                          {i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor capitalize ">
                          {reSeller?.reseller_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                          {reSeller?.reseller_phone}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor capitalize">
                          {reSeller?.reseller_division}
                        </td>

                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor capitalize">
                          {reSeller?.reseller_district}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor capitalize">
                          {reSeller?.reseller_address}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium capitalize text-primaryColor">
                          <p
                            className={`whitespace-nowrap py-1.5 font-medium ${
                              reSeller?.reseller_status === "active"
                                ? "text-green-600"
                                : reSeller?.reseller_status === "in-active"
                                ? "text-red-500"
                                : ""
                            }`}
                          >
                            {(reSeller?.reseller_status || "").replace(
                              "-",
                              " "
                            )}
                          </p>
                        </td>

                        <td className="whitespace-nowrap py-1.5 px-2 text-primaryColor space-x-2">
                          <button onClick={() => handleViewDetails(reSeller)}>
                            <ImInfo
                              className="cursor-pointer text-primaryColor"
                              size={25}
                            />
                          </button>
                          <button
                            onClick={() => handleInactiveStatus(reSeller)}
                          >
                            <FiEdit
                              className="cursor-pointer text-primaryColor"
                              size={25}
                            />
                          </button>
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
      {/* sttaus update modal */}
      {isStatusModalOpen && (
        <ReSellerInactiveModal
          reSellaerData={reSellaerData}
          setIsStatusModalOpen={setIsStatusModalOpen}
          user={user}
        />
      )}

      {/* view details modal */}
      {isViewModalOpen && (
        <ReSellerViewDetailsModal
          reSellaerData={reSellaerData}
          setIsViewModalOpen={setIsViewModalOpen}
        />
      )}
    </>
  );
};

export default ReSellerTable;
