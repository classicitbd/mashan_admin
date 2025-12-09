import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import ReactQuill from "react-quill-new";
import { BASE_URL } from "../../utils/baseURL";
const WholeSellerUpdate = ({
  isStatusModalOpen,
  wholeSellaerData,
  setIsStatusModalOpen,
  user,
}) => {
  const [status, setStatus] = useState("approved");
  const [comment, setComment] = useState(wholeSellaerData?.wholeseller_details);
  const queryClient = useQueryClient();

  const updateWholesellerStatus = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(
        `${BASE_URL}/wholeseller/dashboard
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
      queryClient.invalidateQueries(["wholesellers"]);
      setIsStatusModalOpen(false);
      setComment("");
    },
    onError: (error) => {
      console.error("Error updating wholeseller status:", error);
    },
  });

  const handleStatusSubmit = () => {
    const requestData = {
      _id: wholeSellaerData?._id,
      wholeseller_phone: wholeSellaerData?.wholeseller_phone,
      wholeseller_request_status: status,
      wholeseller_status: status === "approved" ? "active" : "in-active",
      wholeseller_request: false,
      wholeseller_details: comment,
      wholeseller_updated_by: user?._id,
    };
    console.log(requestData);

    updateWholesellerStatus.mutate(requestData);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm p-4">
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
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
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
            disabled={updateWholesellerStatus.isLoading}
            className={` rounded-[8px] py-[10px] px-[14px]   transform hover:translate-y-[-2px] transition duration-200 text-btnTextColor text-sm cursor-pointer uppercasepy-2   ${
              updateWholesellerStatus.isLoading
                ? "bg-btnHoverColor cursor-not-allowed"
                : "bg-btnBgColor hover:bg-btnHoverColor "
            }`}
          >
            {updateWholesellerStatus.isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WholeSellerUpdate;
