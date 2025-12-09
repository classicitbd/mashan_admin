import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BASE_URL } from "../../utils/baseURL";

const CustomerStatusModal = ({ customerData, setIsStatusModalOpen }) => {
  const [status, setStatus] = useState("active");

  const queryClient = useQueryClient();

  const updateCustomerStatus = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(
        `${BASE_URL}/user
      `,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["customer"]);
      setIsStatusModalOpen(false);
    },
    onError: (error) => {
      console.error("Error updating Customer status:", error);
    },
  });

  const handleStatusSubmit = () => {
    const requestData = {
      _id: customerData?._id,
      user_status: status === "active" ? "active" : "in-active",
      user_phone: customerData?.user_phone,
      user_name: customerData?.user_name,
    };
    console.log(requestData);

    updateCustomerStatus.mutate(requestData);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Review Status</h2>
        <hr />
        {/* Status Dropdown */}
        <div className="my-4">
          <label className="block text-sm font-medium mb-1">
            Select Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-md px-3 py-2 cursor-pointer"
          >
            <option value="active">Active</option>
            <option value="in-active">Inactive</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsStatusModalOpen(false)}
            className="rounded-[8px] py-[10px] px-[14px] bg-red-600 hover:bg-red-400  cursor-pointer text-white transform hover:translate-y-[-2px] transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleStatusSubmit}
            disabled={updateCustomerStatus.isLoading}
            className={` rounded-[8px] py-[10px] px-[14px]   transform hover:translate-y-[-2px] transition duration-200 text-btnTextColor text-sm cursor-pointer ${
              updateCustomerStatus.isLoading
                ? "bg-btnHoverColor cursor-not-allowed"
                : "bg-btnBgColor hover:bg-btnHoverColor "
            }`}
          >
            {updateCustomerStatus.isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerStatusModal;
