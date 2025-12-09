import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/baseURL";
import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";

const ReviewUpdate = ({
  setOpenQuestionAnsModal,
  openQuestionAnsModalData,
  refetch,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

  const handleDataPost = async (data) => {
    setLoading(true);

    const sendData = {
      _id: openQuestionAnsModalData?._id,
      review_answer: data?.review_answer,
      review_status: data?.review_status,
      review_show: data?.review_show === "true" ? true : false,
    };
    const response = await fetch(`${BASE_URL}/review`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    const result = await response.json();
    if (result?.statusCode === 200 && result?.success === true) {
      toast.success(
        result?.message ? result?.message : "Review update successfully",
        {
          autoClose: 1000,
        }
      );
      refetch();
      setLoading(false);
      setOpenQuestionAnsModal(false);
    } else {
      toast.error(result?.message || "Something went wrong", {
        autoClose: 1000,
      });
      setLoading(false);
    }
  };
  return (
    <div>
      <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[850px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between mt-4">
              <h3
                className="text-[26px] font-bold text-gray-800 capitalize"
                id="modal-title"
              >
                Review Update
              </h3>
              <button
                type="button"
                className="btn text-crossBtnHoverColor  p-1 absolute right-3 rounded-full top-3 hover:bg-crossBtnHoverColor hover:text-crossBtnHovertextColor cursor-pointer transition-all duration-300"
                onClick={() => setOpenQuestionAnsModal(false)}
              >
                {" "}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className="mt-2 mb-6" />

            <form onSubmit={handleSubmit(handleDataPost)} className="">
              <div className="my-4">
                <label
                  htmlFor="UserEmail"
                  className="block text-xs font-medium text-gray-700"
                >
                  Reply To Review <span className="text-red-600">*</span>
                </label>

                <textarea
                  {...register("review_answer")}
                  type="text"
                  defaultValue={openQuestionAnsModalData?.review_answer}
                  placeholder="Reply To Review"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700">
                  Review Status
                </label>
                <select
                  {...register("review_status")}
                  defaultValue={openQuestionAnsModalData?.review_status}
                  className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
                >
                  <option value="active">Active</option>
                  <option value="in-active">In-Active</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700">
                  Home Page Show
                </label>
                <select
                  {...register("review_show")}
                  defaultValue={
                    openQuestionAnsModalData?.review_show === true
                      ? "true"
                      : "false"
                  }
                  className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
                >
                  <option value="true">Show</option>
                  <option value="false">Hide</option>
                </select>
              </div>
              <div className="flex justify-end">
                {loading == true ? (
                  <div className="px-10 py-2 flex items-center justify-center  bg-btnBgColor text-btnTextColor rounded">
                    <MiniSpinner />
                  </div>
                ) : (
                  <button
                    className="rounded-[8px] py-[10px] px-[18px] bg-btnBgColor hover:bg-btnHoverColor  transform hover:translate-y-[-2px] transition duration-200 text-btnTextColor text-sm cursor-pointer uppercase"
                    type="submit"
                  >
                    Update Review
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewUpdate;
