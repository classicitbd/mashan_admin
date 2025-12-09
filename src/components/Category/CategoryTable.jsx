import Swal from "sweetalert2-optimized";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import TableLoadingSkeleton from "../../common/loadingSkeleton/TableLoadingSkeleton";
import UpdateCategory from "./UpdateCategory";
import { BASE_URL } from "../../utils/baseURL";
import { toast } from "react-toastify";
import Pagination from "../../common/pagination/Pagination";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";

const CategoryTable = ({
  categoryTypes,
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
  const [categoryUpdateModal, setCategoryUpdateModal] = useState(false);
  const [categoryUpdateData, setCategoryUpdateData] = useState({});

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  // Handle Delete Category Table Row function
  const handleDeleteCategoryTableRow = (category) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${category?.category_name} Category!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: category?._id,
        };
        try {
          const response = await fetch(
            `
          ${BASE_URL}/category`,
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
              text: `${category?.category_name} Category has been deleted!`,
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
  const handleHeaderToggle = async (id, category_header_show) => {
    try {
      const data = {
        _id: id,
        category_header_show,
      };
      const response = await fetch(`${BASE_URL}/category`, {
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
            : " Category Header Show successfully",
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

  // update category Browser status
  const handleBrowserToggle = async (id, category_browse_show) => {
    try {
      const data = {
        _id: id,
        category_browse_show,
      };
      const response = await fetch(`${BASE_URL}/category`, {
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
            : "Category Browser show successfully",
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
  const handleCategoryActiveStatus = async (id, category_status) => {
    try {
      const data = {
        _id: id,
        category_status,
      };
      const response = await fetch(`${BASE_URL}/category/status_update`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success("category status Update successfully", {
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
  // Inactive category Status..
  const handleCategoryInActiveStatus = async (id, category_status) => {
    try {
      const data = {
        _id: id,
        category_status,
      };
      const response = await fetch(`${BASE_URL}/category/status_update`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success("category status  Update successfully", {
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
  const handleCategoryUpdateModal = (category) => {
    setCategoryUpdateData(category);
    setCategoryUpdateModal(true);
  };

  return (
    <>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {categoryTypes?.data?.length > 0 ? (
            <div className="mt-6 shadow-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr className="divide-x divide-gray-300  font-semibold text-center">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Category Image</td>
                      <td className="whitespace-nowrap p-4 ">Category Name</td>
                      <td className="whitespace-nowrap p-4 ">
                        Category Serial No
                      </td>
                      <td className="whitespace-nowrap p-4 ">
                        Category Browse Show
                      </td>
                      <td className="whitespace-nowrap p-4 ">
                        Category Header Show
                      </td>
                      <td className="whitespace-nowrap p-4 ">Status</td>

                      {(user?.role_id?.category_update === true ||
                        user?.role_id?.category_delete === true) && (
                        <td className="whitespace-nowrap p-4 ">Action</td>
                      )}
                    </tr>
                  </thead>

                  <tbody className="">
                    {categoryTypes?.data?.map((category, i) => (
                      <tr
                        key={category?._id}
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
                            src={category?.category_image}
                            alt=""
                          />
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          {category?.category_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          {category?.category_serial}
                        </td>

                        <td className="whitespace-nowrap py-1.5 ">
                          <label
                            htmlFor={category?._id}
                            className="inline-flex items-center  cursor-pointer "
                          >
                            <span className="relative">
                              <input
                                id={category?._id}
                                type="checkbox"
                                className="hidden peer"
                                checked={category?.category_browse_show} // Control the toggle state
                                onChange={() =>
                                  handleBrowserToggle(
                                    category?._id,
                                    category?.category_browse_show
                                      ? false
                                      : true
                                  )
                                } // Handle toggle
                              />
                              <div className="w-10 h-4 rounded-full shadow bg-slate-400 peer-checked:bg-btnHoverColor"></div>
                              <div className="absolute left-0 w-6 h-6 rounded-full bg-btnHoverColor ring-[1px] shadow-lg  ring-gray-300 -inset-y-1 peer-checked:right-0 peer-checked:left-auto peer-checked:bg-primaryColor "></div>
                            </span>
                          </label>
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
                                checked={category?.category_header_show} // Control the toggle state
                                onChange={() =>
                                  handleHeaderToggle(
                                    category?._id,
                                    category?.category_header_show
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
                          {category?.category_status === "active" ? (
                            <button
                              className="bg-green-500 text-white px-[10px] py-[4px] rounded-[8px] cursor-pointer"
                              onClick={() =>
                                handleCategoryActiveStatus(
                                  category?._id,
                                  category?.category_status
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
                                handleCategoryInActiveStatus(
                                  category?._id,
                                  category?.category_status
                                    ? "active"
                                    : "in-active"
                                )
                              }
                            >
                              <span>In-Active</span>
                            </button>
                          )}
                        </td>

                        {(user?.role_id?.category_delete === true ||
                          user?.role_id?.category_update === true) && (
                          <td className="whitespace-nowrap px-4 py-2 ">
                            <>
                              {user?.role_id?.category_delete && (
                                <button
                                  onClick={() =>
                                    handleDeleteCategoryTableRow(category)
                                  }
                                >
                                  <MdDeleteForever
                                    size={25}
                                    className="cursor-pointer text-deleteButtonColor"
                                  />
                                </button>
                              )}
                              {user?.role_id?.category_update && (
                                <button
                                  className="ml-3"
                                  onClick={() =>
                                    handleCategoryUpdateModal(category)
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

          {/* Show Category Update Modal */}
          {categoryUpdateModal && (
            <UpdateCategory
              setCategoryUpdateModal={setCategoryUpdateModal}
              categoryUpdateData={categoryUpdateData}
              refetch={refetch}
              user={user}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CategoryTable;
