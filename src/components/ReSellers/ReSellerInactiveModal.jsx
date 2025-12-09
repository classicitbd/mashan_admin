import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import ReactQuill from "react-quill-new";
import { BASE_URL } from "../../utils/baseURL";
const ReSellerInactiveModal = ({
  reSellaerData,
  setIsStatusModalOpen,
  user,
}) => {
  const [status, setStatus] = useState("active");
  const [comment, setComment] = useState(reSellaerData?.reseller_details);
  const queryClient = useQueryClient();
  console.log("wholeseller_details", comment);
  useEffect(() => {
    if (reSellaerData?.reseller_details) {
      setComment(reSellaerData.reseller_details);
    }
  }, [reSellaerData]);
  const updateResellerStatus = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(
        `${BASE_URL}/reseller/dashboard
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
      queryClient.invalidateQueries(["reseller"]);
      setIsStatusModalOpen(false);
      //   setComment("");
    },
    onError: (error) => {
      console.error("Error updating reseller status:", error);
    },
  });

  const handleStatusSubmit = () => {
    const requestData = {
      _id: reSellaerData?._id,
      reseller_phone: reSellaerData?.reseller_phone,
      reseller_request_status: "approved",
      reseller_status: status === "active" ? "active" : "in-active",
      reseller_request: false,
      reseller_details: comment,
      reseller_updated_by: user?._id,
    };
    console.log(requestData);

    updateResellerStatus.mutate(requestData);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Review Status</h2>

        {/* Status Dropdown */}
        <div className="mb-4">
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

        {/* React Quill Editor */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Comment</label>
          <ReactQuill
            theme="snow"
            value={comment}
            onChange={setComment}
            className="bg-white"
            style={{
              width: "1150px",
              maxWidth: "100%", // Prevents overflow issues on smaller screens
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsStatusModalOpen(false)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleStatusSubmit}
            disabled={updateResellerStatus.isLoading}
            className={` rounded-[8px] py-[10px] px-[14px]   transform hover:translate-y-[-2px] transition duration-200 text-btnTextColor text-sm cursor-pointer uppercasepy-2   ${
              updateResellerStatus.isLoading
                ? "bg-btnHoverColor cursor-not-allowed"
                : "bg-btnBgColor hover:bg-btnHoverColor "
            }`}
          >
            {updateResellerStatus.isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReSellerInactiveModal;
