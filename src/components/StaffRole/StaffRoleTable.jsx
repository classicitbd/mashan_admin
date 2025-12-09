// import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2-optimized";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BASE_URL } from "../../utils/baseURL";
import { LoaderOverlay } from "../../common/loader/LoderOverley";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";
import UpDateStaffRole from "./UpDateStaffRole";

const StaffRoleTable = ({ user }) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [updateModalValue, setUpdateModalValue] = useState({});
  //   console.log(roleData);
  const updateStaffModal = (item) => {
    setUpdateModal(true);
    setUpdateModalValue(item);
  };
  const {
    data: roleData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/role`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/role`, {
        credentials: "include",
      });

      const data = await res.json();
      return data?.data;
    },
  });

  // delete a Staff
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${item?.role_name} role!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: item?._id,
        };
        try {
          const response = await fetch(`${BASE_URL}/role`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(sendData),
          });
          const result = await response.json();
          // console.log(result);
          if (result?.statusCode === 200 && result?.success === true) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${item?.role_name} role has been deleted!`,
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
          console.log(error);
        }
      }
    });
  };
  if (isLoading) {
    return <LoaderOverlay />;
  }
  return (
    <div className=" ">
      {/* Table for showing data */}
      {roleData?.length > 0 ? (
        <div className="mt-5 overflow-x-auto shadow-md">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className=" bg-[#fff9ee]">
              <tr className="divide-x divide-gray-300  font-semibold text-center text-white">
                <th className="whitespace-nowrap p-4  text-white text-center">
                  Role Name
                </th>

                {(user?.role_id?.role_delete === true ||
                  user?.role_id?.role_update === true) && (
                  <th className="p-4 text-center text-white">Action</th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-center ">
              {roleData?.map((item, i) => (
                <tr
                  key={item?._id}
                  className={`divide-x divide-gray-200 ${
                    i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                  }`}
                >
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {item?.role_name}
                  </td>

                  {(user?.role_id?.role_delete === true ||
                    user?.role_id?.role_update === true) && (
                    <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                      <>
                        {user?.role_id?.role_delete && (
                          <MdDeleteForever
                            onClick={() => handleDelete(item)}
                            className="cursor-pointer text-red-500"
                            size={25}
                          />
                        )}
                        {user?.role_id?.role_update && (
                          <FiEdit
                            onClick={() => updateStaffModal(item)}
                            className="cursor-pointer text-primaryColor"
                            size={25}
                          />
                        )}
                      </>
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
      {updateModal && (
        <UpDateStaffRole
          setUpdateModal={setUpdateModal}
          updateModalValue={updateModalValue}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default StaffRoleTable;
