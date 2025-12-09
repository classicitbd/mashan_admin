import { useEffect, useState } from "react";
import { GoEye } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import TableLoadingSkeleton from "../../common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "../../common/pagination/Pagination";
import ViewAttributeValue from "./ViewAttributeValue";
import UpdateAttribute from "./UpdateAttribute";
import { toast } from "react-toastify";
import Swal from "sweetalert2-optimized";
import { BASE_URL } from "../../utils/baseURL";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";
const AttributeTable = ({
  attributeTypes,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  setPage,
}) => {
  //get Serial Number From..index....
  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  // Attribute View Value Modal...
  const [viewAttributeValueModal, setViewAttributeValueModal] = useState(false);
  const [attributesValue, setAttributesValue] = useState({});
  //handle View Attribute Value Function
  const handleAttributeValue = (attribute) => {
    setViewAttributeValueModal(true);
    setAttributesValue(attribute);
  };

  // Attribute Update Modal...
  const [openAttributeUpdateModal, setOpenAttributeUpdateModal] =
    useState(false);
  const [attributeUpdateValue, setAttributeUpdateValue] = useState({});
  // handle Attribute Update Function
  const handleAttributeUpdate = (attribute) => {
    setOpenAttributeUpdateModal(true);
    setAttributeUpdateValue(attribute);
  };

  //handle Delete Attribute Table row function
  const handleDeleteAttributeTableRow = (attribute) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${attribute?.attribute_name} Attribute!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: attribute?._id,
        };
        try {
          const response = await fetch(
            `
            ${BASE_URL}/attribute`,
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
          // console.log(result);
          if (result?.statusCode === 200 && result?.success === true) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${attribute?.attribute_name} Attribute has been deleted!`,
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

  return (
    <>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {attributeTypes?.data?.length > 0 ? (
            <div className="mt-6 shadow-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr className="divide-x divide-gray-300  font-semibold text-center">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">
                        {" "}
                        Attribute Name
                      </td>
                      <td className="whitespace-nowrap p-4 ">
                        {" "}
                        Attribute value
                      </td>

                      <td className="whitespace-nowrap p-4 ">Status</td>

                      {(user?.role_id?.attribute_delete === true ||
                        user?.role_id?.attribute_update === true) && (
                        <td className="whitespace-nowrap p-4 ">Action</td>
                      )}
                    </tr>
                  </thead>

                  <tbody className="">
                    {attributeTypes?.data?.map((attribute, i) => (
                      <tr
                        key={attribute?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          {serialNumber + i + 1}
                        </td>

                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          {attribute?.attribute_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          <button
                            onClick={() => handleAttributeValue(attribute)}
                          >
                            <GoEye
                              size={22}
                              className="cursor-pointer text-primaryColor"
                            />
                          </button>
                        </td>

                        <td className="whitespace-nowrap py-1.5 font-semibold">
                          {attribute?.attribute_status === "active" ? (
                            <p className=" text-activeTextColor ">
                              <span>Active</span>
                            </p>
                          ) : (
                            <p className="text-inActiveTextColor ">
                              <span>In-Active</span>
                            </p>
                          )}
                        </td>

                        {(user?.role_id?.attribute_delete === true ||
                          user?.role_id?.attribute_update === true) && (
                          <td className="whitespace-nowrap px-4 py-2">
                            <>
                              {user?.role_id?.attribute_delete && (
                                <button
                                  onClick={() =>
                                    handleDeleteAttributeTableRow(attribute)
                                  }
                                >
                                  <MdDeleteForever
                                    size={25}
                                    className="cursor-pointer text-deleteButtonColor"
                                  />
                                </button>
                              )}
                              {user?.role_id?.attribute_update && (
                                <button
                                  className="ml-3"
                                  onClick={() =>
                                    handleAttributeUpdate(attribute)
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

          {/* Show Attribute Update Modal */}
          {openAttributeUpdateModal && (
            <UpdateAttribute
              setOpenAttributeUpdateModal={setOpenAttributeUpdateModal}
              attributeUpdateValue={attributeUpdateValue}
              refetch={refetch}
              user={user}
            />
          )}

          {/* Show Attribute Value Modal */}

          {viewAttributeValueModal && (
            <ViewAttributeValue
              setViewAttributeValueModal={setViewAttributeValueModal}
              attributesValue={attributesValue}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AttributeTable;
