import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import TableLoadingSkeleton from "../../common/loadingSkeleton/TableLoadingSkeleton";
import UpdateSubCategory from "./UpdateSubCategory";
import Pagination from "../../common/pagination/Pagination";
import Swal from "sweetalert2-optimized";
import { BASE_URL } from "../../utils/baseURL";
import { toast } from "react-toastify";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";
const SubCategoryTable = ({
  subCategoryTypes,
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

  //update Sub Category.....state
  const [subCategoryUpdateModal, setSubCategoryUpdateModal] = useState(false);
  const [subCategoryUpdateData, setSubCategoryUpdateData] = useState({});

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  // Handle Delete Category Table Row function
  const handleDeleteSubCategoryTableRow = (subCategory) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${subCategory?.sub_category_name} Sub Category!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: subCategory?._id,
        };
        try {
          const response = await fetch(
            `
          ${BASE_URL}/sub_category`,
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
              text: `${subCategory?.sub_category_name} Sub Category has been deleted!`,
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

  // update feature category show
  const handleExploreToggle = async (id, sub_category_explore_show) => {
    try {
      const data = {
        _id: id,
        sub_category_explore_show,
      };
      const response = await fetch(`${BASE_URL}/sub_category`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message
            ? result?.message
            : " Sub Category Explore Show successfully",
          {
            autoClose: 1000,
          }
        );
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

  //Update category Status..
  const handleSubCategoryActiveStatus = async (id, sub_category_status) => {
    try {
      const data = {
        _id: id,
        sub_category_status,
      };
      const response = await fetch(`${BASE_URL}/sub_category/status_update`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success("sub category status Update successfully", {
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
  // Inactive sub category Status..
  const handleSubCategoryInActiveStatus = async (id, sub_category_status) => {
    try {
      const data = {
        _id: id,
        sub_category_status,
      };
      const response = await fetch(`${BASE_URL}/sub_category/status_update`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success("sub category status Update successfully", {
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

  //Update HandleFunction
  const handleSubCategoryUpdateModal = (category) => {
    setSubCategoryUpdateData(category);
    setSubCategoryUpdateModal(true);
  };

  return (
    <>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {subCategoryTypes?.data?.length > 0 ? (
            <div className="mt-6 shadow-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr className="divide-x divide-gray-300  font-semibold text-center">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">
                        Sub-Category Image
                      </td>
                      <td className="whitespace-nowrap p-4 ">
                        Sub-Category Name
                      </td>
                      <td className="whitespace-nowrap p-4 ">Category Name</td>
                      <td className="whitespace-nowrap p-4 ">
                        Sub-Category Serial No
                      </td>
                      <td className="whitespace-nowrap p-4 ">
                        Sub-Category Explore Show
                      </td>

                      <td className="whitespace-nowrap p-4 ">Status</td>

                      {(user?.role_id?.sub_category_delete === true ||
                        user?.role_id?.sub_category_update === true) && (
                        <td className="whitespace-nowrap p-4 ">Action</td>
                      )}
                    </tr>
                  </thead>

                  <tbody className="">
                    {subCategoryTypes?.data?.map((subCategory, i) => (
                      <tr
                        key={subCategory?._id}
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
                            src={subCategory?.sub_category_image}
                            alt=""
                          />
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          {subCategory?.sub_category_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          {subCategory?.category_id?.category_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          {subCategory?.sub_category_serial}
                        </td>

                        <td className="whitespace-nowrap py-1.5  text-gray-700">
                          <label
                            htmlFor={i}
                            className="inline-flex items-center space-x-4 cursor-pointer "
                          >
                            <span className="relative">
                              <input
                                id={i}
                                type="checkbox"
                                className="hidden peer"
                                checked={subCategory?.sub_category_explore_show} // Control the toggle state
                                onChange={() =>
                                  handleExploreToggle(
                                    subCategory?._id,
                                    subCategory?.sub_category_explore_show
                                      ? false
                                      : true
                                  )
                                } // Handle toggle
                              />
                              <div className="w-10 h-4 rounded-full shadow bg-slate-400  peer-checked:bg-btnHoverColor"></div>
                              <div className="absolute left-0 w-6 h-6 rounded-full -inset-y-1 peer-checked:right-0 peer-checked:left-auto peer-checked:bg-primaryColor bg-btnHoverColor ring-[1px] shadow-lg  ring-gray-300  "></div>
                            </span>
                          </label>
                        </td>
                        <td className="whitespace-nowrap py-1.5 ">
                          {subCategory?.sub_category_status === "active" ? (
                            <button
                              className="bg-green-500 text-white px-[10px] py-[4px] rounded-[8px] cursor-pointer"
                              onClick={() =>
                                handleSubCategoryActiveStatus(
                                  subCategory?._id,
                                  subCategory?.sub_category_status
                                    ? "in-active"
                                    : "active"
                                )
                              }
                            >
                              <span>Active</span>
                            </button>
                          ) : (
                            <button
                              className="bg-red-500 text-white font-semibold px-[10px] py-[4px] rounded-[8px] cursor-pointer"
                              onClick={() =>
                                handleSubCategoryInActiveStatus(
                                  subCategory?._id,
                                  subCategory?.sub_category_status
                                    ? "active"
                                    : "in-active"
                                )
                              }
                            >
                              <span>In-Active</span>
                            </button>
                          )}
                        </td>

                        {(user?.role_id?.sub_category_delete === true ||
                          user?.role_id?.sub_category_update === true) && (
                          <td className="whitespace-nowrap px-4 py-2  ">
                            <>
                              {user?.role_id?.sub_category_delete && (
                                <button
                                  onClick={() =>
                                    handleDeleteSubCategoryTableRow(subCategory)
                                  }
                                >
                                  <MdDeleteForever
                                    size={25}
                                    className="cursor-pointer text-deleteButtonColor"
                                  />
                                </button>
                              )}
                              {user?.role_id?.sub_category_update && (
                                <button
                                  className="ml-3"
                                  onClick={() =>
                                    handleSubCategoryUpdateModal(subCategory)
                                  }
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

          {/* Show Sub Category Update Modal */}
          {subCategoryUpdateModal && (
            <UpdateSubCategory
              setSubCategoryUpdateModal={setSubCategoryUpdateModal}
              subCategoryUpdateData={subCategoryUpdateData}
              refetch={refetch}
              user={user}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SubCategoryTable;
