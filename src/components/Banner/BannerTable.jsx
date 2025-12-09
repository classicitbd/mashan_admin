import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

import Swal from "sweetalert2-optimized";

import { toast } from "react-toastify";
import UpdateBusBanner from "./UpdateBusBanner";
import { BASE_URL } from "../../utils/baseURL";
import TableLoadingSkeleton from "../../common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "../../common/pagination/Pagination";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";
const BannerTable = ({
  banners,
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  isLoading,
  user,
}) => {
  const [serialNumber, setSerialNumber] = useState();
  const [showBusBannerUpdateModal, setShowBusBannerUpdateModal] =
    useState(false);
  const [getBusBannerUpdateData, setGetBusBannerUpdateData] = useState({});

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  //banner Update data Function
  const handleBannerUpdateModal = (banner) => {
    setShowBusBannerUpdateModal(true);
    setGetBusBannerUpdateData(banner);
  };

  // Handle Delete Banner Table Row function
  const handleDeleteBannerTableRow = (banner) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${banner?.banner_serial} no banner!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      console.log(result);
      if (result.isConfirmed) {
        const sendData = {
          _id: banner?._id,
          banner_image_key: banner?.banner_image_key,
        };
        try {
          const response = await fetch(
            `
              ${BASE_URL}/banner`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(sendData),
            }
          );
          const result = await response.json();
          // console.log(result);
          if (result?.statusCode === 200 && result?.success === true) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${banner?.banner_serial} No Banner has been deleted!`,
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

  //Update Banner Status..
  const handleBannerActiveStatus = async (id, banner_status) => {
    try {
      const data = {
        _id: id,
        banner_status,
      };
      const response = await fetch(`${BASE_URL}/banner`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success("Banner status Update successfully", {
          autoClose: 1000,
        });
        refetch();
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      });
    } finally {
      ("");
    }
  };
  // Inactive Banner Status..
  const handleBannerInActiveStatus = async (id, banner_status) => {
    try {
      const data = {
        _id: id,
        banner_status,
      };
      const response = await fetch(`${BASE_URL}/banner`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success("Banner status  Update successfully", {
          autoClose: 1000,
        });
        refetch();
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      });
    } finally {
      ("");
    }
  };

  return (
    <>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {banners?.data?.length > 0 ? (
            <div className="mt-6 shadow-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr className="divide-x divide-gray-300  font-semibold text-center">
                      <td className="whitespace-nowrap p-4 ">SL No</td>

                      <td className="whitespace-nowrap p-4 ">Banner Image</td>
                      <td className="whitespace-nowrap p-4 ">Banner Path</td>
                      <td className="whitespace-nowrap p-4 ">
                        Banner Serial No
                      </td>

                      <td className="whitespace-nowrap p-4 ">Banner Status</td>

                      {(user?.role_id?.banner_delete === true ||
                        user?.role_id?.banner_update === true) && (
                        <td className="whitespace-nowrap p-4 ">Action</td>
                      )}
                    </tr>
                  </thead>

                  <tbody className="">
                    {banners?.data?.map((banner, i) => (
                      <tr
                        key={banner?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 text-primaryColor flex justify-center">
                          <img
                            className="w-[44px] h-[44px] rounded-[8px]"
                            src={banner?.banner_image}
                            alt=""
                          />
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                          {banner?.banner_path}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                          {banner?.banner_serial}
                        </td>

                        <td className="whitespace-nowrap py-1.5 ">
                          {banner?.banner_status === "active" ? (
                            <button
                              className="bg-green-500 text-white px-[10px] py-[4px] rounded-[8px] cursor-pointer"
                              onClick={() =>
                                handleBannerActiveStatus(
                                  banner?._id,
                                  banner?.banner_status ? "in-active" : "active"
                                )
                              }
                            >
                              <span>Active</span>
                            </button>
                          ) : (
                            <button
                              className="bg-red-500 text-white font-semibold px-[10px] py-[4px] rounded-[8px] cursor-pointer"
                              onClick={() =>
                                handleBannerInActiveStatus(
                                  banner?._id,
                                  banner?.banner_status ? "active" : "in-active"
                                )
                              }
                            >
                              <span>In-Active</span>
                            </button>
                          )}
                        </td>

                        {(user?.role_id?.banner_delete === true ||
                          user?.role_id?.banner_update === true) && (
                          <td className="whitespace-nowrap py-1.5 px-2 text-primaryColor">
                            <>
                              {user?.role_id?.banner_delete && (
                                <button
                                  onClick={() =>
                                    handleDeleteBannerTableRow(banner)
                                  }
                                >
                                  <MdDeleteForever
                                    size={25}
                                    className="cursor-pointer text-red-500"
                                  />
                                </button>
                              )}
                              {user?.role_id?.banner_update && (
                                <button
                                  className="ml-3"
                                  onClick={() =>
                                    handleBannerUpdateModal(banner)
                                  }
                                >
                                  <FiEdit
                                    size={25}
                                    className="cursor-pointer text-primaryColor "
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
          {/* Show Banner Update Modal */}
          {showBusBannerUpdateModal && (
            <UpdateBusBanner
              setShowBusBannerUpdateModal={setShowBusBannerUpdateModal}
              getBusBannerUpdateData={getBusBannerUpdateData}
              refetch={refetch}
            />
          )}
        </div>
      )}
    </>
  );
};

export default BannerTable;
