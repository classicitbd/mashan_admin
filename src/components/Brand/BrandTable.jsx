import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import TableLoadingSkeleton from "../../common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "../../common/pagination/Pagination";
import BrandUpdate from "./BrandUpdate";
import Swal from "sweetalert2-optimized";
import { BASE_URL } from "../../utils/baseURL";
import { toast } from "react-toastify";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";
const BrandTable = ({
  brandTypes,
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
}) => {
  const [serialNumber, setSerialNumber] = useState();

  //update Category.....state
  const [brandUpdateModal, setBrandUpdateModal] = useState(false);
  const [brandUpdateData, setBrandUpdateData] = useState({});
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  // Handle Delete Brand Table Row function
  const handleDeleteBrandTableRow = (brand) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${brand?.brand_name} Brand!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: brand?._id,
        };
        try {
          const response = await fetch(
            `
          ${BASE_URL}/brand`,
            {
              method: "DELETE",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(sendData),
            }
          );
          const result = await response.json();
          if (result?.statusCode === 200 && result?.success === true) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${brand?.brand_name} Brand has been deleted!`,
              icon: "success",
            });
          } else {
            toast.error(result?.message, {
              autoClose: 1000,
            });
          }
        } catch (error) {
          toast.error("Network error or server is down", {
            autoClose: 1000,
          });
          console.error(error);
        }
      }
    });
  };

  //Update HandleFunction
  const handleBrandUpdateModal = (brand) => {
    setBrandUpdateData(brand);
    setBrandUpdateModal(true);
  };

  return (
    <>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {brandTypes?.data?.length > 0 ? (
            <div className="mt-6 shadow-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr className="divide-x divide-gray-300  font-semibold text-center">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Brand Image</td>
                      <td className="whitespace-nowrap p-4 ">Brand Name</td>
                      <td className="whitespace-nowrap p-4 ">
                        Brand Serial No
                      </td>

                      <td className="whitespace-nowrap p-4 ">Status</td>

                      {(user?.role_id?.brand_delete === true ||
                        user?.role_id?.brand_update === true) && (
                        <td className="whitespace-nowrap p-4 ">Action</td>
                      )}
                    </tr>
                  </thead>

                  <tbody className="">
                    {brandTypes?.data?.map((brand, i) => (
                      <tr
                        key={brand?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5  flex justify-center">
                          <img
                            className="w-[44px] h-[44px] rounded-[8px]"
                            src={brand?.brand_image}
                            alt=""
                          />
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          {brand?.brand_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          {brand?.brand_serial}
                        </td>

                        <td className="whitespace-nowrap py-1.5 font-semibold">
                          {brand?.brand_status === "active" ? (
                            <p className=" text-activeTextColor ">
                              <span>Active</span>
                            </p>
                          ) : (
                            <p className="text-inActiveTextColor ">
                              <span>In-Active</span>
                            </p>
                          )}
                        </td>

                        {(user?.role_id?.brand_delete === true ||
                          user?.role_id?.brand_update === true) && (
                          <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                            <>
                              {user?.role_id?.brand_delete && (
                                <button
                                  onClick={() =>
                                    handleDeleteBrandTableRow(brand)
                                  }
                                >
                                  <MdDeleteForever
                                    size={25}
                                    className="cursor-pointer text-deleteButtonColor"
                                  />
                                </button>
                              )}
                              {user?.role_id?.brand_update && (
                                <button
                                  className="ml-3"
                                  onClick={() => handleBrandUpdateModal(brand)}
                                >
                                  <FiEdit
                                    size={25}
                                    className="cursor-pointer text-updateBtnColor"
                                  />
                                </button>
                              )}
                            </>
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

          {/* Show Brand Update Modal */}
          {brandUpdateModal && (
            <BrandUpdate
              setBrandUpdateModal={setBrandUpdateModal}
              brandUpdateData={brandUpdateData}
              refetch={refetch}
              user={user}
            />
          )}
        </div>
      )}
    </>
  );
};

export default BrandTable;
