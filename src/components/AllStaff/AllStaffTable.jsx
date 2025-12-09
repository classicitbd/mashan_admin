// import { toast } from "react-toastify";

import { useState } from "react";
import { FiEdit } from "react-icons/fi";

import UpdateStaff from "./UpdateStaff";
import TableLoadingSkeleton from "../../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";
import Pagination from "../../common/pagination/Pagination";

const AllStaffTable = ({
  refetch,
  staffData,
  roleData,
  isLoading,
  user,
  isLoadingStaff,
  limit,
  page,
  setPage,
  setLimit,
  totalData,
}) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [updateModalValue, setUpdateModalValue] = useState(false);
  //   console.log(staffData);
  const updateStaffModal = (item) => {
    setUpdateModal(true);
    setUpdateModalValue(item);
  };

  return (
    <>
      {isLoadingStaff ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {/* Table for showing data */}
          {staffData?.length > 0 ? (
            <div className="mt-5 overflow-x-auto shadow-md">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm ">
                {" "}
                <thead className=" bg-[#fff9ee] ">
                  <tr className="divide-x divide-gray-300  font-semibold text-center text-white">
                    <th className="whitespace-nowrap px-4 py-2.5">User Name</th>

                    <th className="whitespace-nowrap px-4 py-2.5">
                      User Phone
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5">User Role</th>
                    <th className="whitespace-nowrap px-4 py-2.5">Status</th>

                    {user?.role_id?.admin_update === true && (
                      <th className="px-4 py-2.5 text-center">Action</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-center ">
                  {staffData?.map((item, i) => (
                    <tr
                      key={item?._id}
                      className={`divide-x divide-gray-200 ${
                        i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                      }`}
                    >
                      <td className="whitespace-nowrap px-4 py-2 font-semibold">
                        {item?.admin_name}
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                        {item?.admin_phone ? item?.admin_phone : "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                        {item?.role_id?.role_name
                          ? item?.role_id?.role_name
                          : "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                        {item?.admin_status}
                      </td>

                      {user?.role_id?.admin_update === true && (
                        <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                          <FiEdit
                            onClick={() => updateStaffModal(item)}
                            className="cursor-pointer text-primaryColor"
                            size={25}
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <NoDataFound />
          )}
          {totalData > 10 && (
            <Pagination
              limit={limit}
              page={page}
              setPage={setPage}
              setLimit={setLimit}
              totalData={totalData}
            />
          )}

          {/* Update Sub Category */}
          {updateModal && (
            <UpdateStaff
              setUpdateModal={setUpdateModal}
              updateModalValue={updateModalValue}
              refetch={refetch}
              roleData={roleData}
              isLoading={isLoading}
              user={user}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AllStaffTable;
