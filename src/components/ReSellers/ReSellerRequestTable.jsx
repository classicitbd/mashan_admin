// import React from 'react'

// const ReSellerRequestTable = () => {
//   return (
//     <div>ReSellerRequestTable</div>
//   )
// }

// export default ReSellerRequestTable

import { useContext, useState } from "react";
import { FiEdit } from "react-icons/fi";

import TableLoadingSkeleton from "../../common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "../../common/pagination/Pagination";
import { AuthContext } from "../../context/AuthProvider";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";
import ResellersUpdateModal from "./ResellersUpdateModal";

const ReSellerRequestTable = ({
  reSellerData,
  isLoading,
  limit,
  page,
  setPage,
  setLimit,
  totalData,
}) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [reSellaerUpdate, setReSellerUpdate] = useState("");
  const { user } = useContext(AuthContext);
  const handleReSellerUpdateModal = (reSeller) => {
    setReSellerUpdate(reSeller);
    setIsStatusModalOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {reSellerData?.length > 0 ? (
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
                    {reSellerData?.map((reSeller, i) => (
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
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                          <p className="text-red-500 capitalize ">
                            {reSeller?.reseller_request_status}
                          </p>
                        </td>

                        <td className="whitespace-nowrap py-1.5 px-2 text-primaryColor space-x-2">
                          <button
                            onClick={() => handleReSellerUpdateModal(reSeller)}
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
      {/* status update modal */}
      {isStatusModalOpen && (
        <ResellersUpdateModal
          isStatusModalOpen={isStatusModalOpen}
          reSellaerData={reSellaerUpdate}
          setIsStatusModalOpen={setIsStatusModalOpen}
          user={user}
        />
      )}
    </>
  );
};

export default ReSellerRequestTable;
