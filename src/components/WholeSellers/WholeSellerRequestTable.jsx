import { useContext, useState } from "react";
import { FiEdit } from "react-icons/fi";

import TableLoadingSkeleton from "../../common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "../../common/pagination/Pagination";
import { AuthContext } from "../../context/AuthProvider";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";
import WholeSellerUpdate from "./WholeSellerStatusUpdate";

const WholeSellerRequestTable = ({
  wholeSellerData,
  isLoading,
  limit,
  page,
  setPage,
  setLimit,
  totalData,
}) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [wholeSellaerUpdate, setWholeSellerUpdate] = useState("");
  const { user } = useContext(AuthContext);
  const handleWholeSellerUpdateModal = (wholeseller) => {
    setWholeSellerUpdate(wholeseller);
    setIsStatusModalOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {wholeSellerData?.length > 0 ? (
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
                    {wholeSellerData?.map((wholeSeller, i) => (
                      <tr
                        key={wholeSeller?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                          {i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor capitalize ">
                          {wholeSeller?.wholeseller_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                          {wholeSeller?.wholeseller_phone}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor capitalize">
                          {wholeSeller?.wholeseller_division}
                        </td>

                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor capitalize">
                          {wholeSeller?.wholeseller_district}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor capitalize">
                          {wholeSeller?.wholeseller_address}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                          <p className="text-red-500 capitalize ">
                            
                            {wholeSeller?.wholeseller_request_status}
                          </p>
                        </td>

                        <td className="whitespace-nowrap py-1.5 px-2 text-primaryColor space-x-2">
                          <button
                            onClick={() =>
                              handleWholeSellerUpdateModal(wholeSeller)
                            }
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
        <WholeSellerUpdate
          isStatusModalOpen={isStatusModalOpen}
          wholeSellaerData={wholeSellaerUpdate}
          setIsStatusModalOpen={setIsStatusModalOpen}
          user={user}
        />
      )}
    </>
  );
};

export default WholeSellerRequestTable;
