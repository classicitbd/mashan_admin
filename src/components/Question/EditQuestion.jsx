import { RxCross1 } from "react-icons/rx";
import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/baseURL";

const EditQuestion = ({
  setQuestionUpdateModal,
  getUpdateAns,
  user,
  refetch,
}) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  const handleDataPost = async (data) => {
    setLoading(true);
    const sendData = {
      _id: getUpdateAns?._id,
      question_answer: data?.question_answer
        ? data?.question_answer
        : getUpdateAns?.question_answer,
      question_updated_by: user?._id,
    };
    const response = await fetch(
      `${BASE_URL}/question?role_type=question_update`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      }
    );
    const result = await response.json();
    if (result?.statusCode === 200 && result?.success === true) {
      toast.success(
        result?.message ? result?.message : "question update successfully",
        {
          autoClose: 1000,
        }
      );
      refetch();
      setLoading(false);
      setQuestionUpdateModal(false);
    } else {
      toast.error(result?.message || "Something went wrong", {
        autoClose: 1000,
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70  bg-opacity-50">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin">
          <div className="flex items-center justify-between mt-4">
            <h3
              className="text-[26px] font-bold text-gray-800 capitalize"
              id="modal-title "
            >
              Edit Question Ans
            </h3>
            <button
              type="button"
              className="btn bg-white   p-1 absolute right-3 rounded-full top-3 hover:bg-bgBtnInactive hover:text-btnInactiveColor"
              onClick={() => setQuestionUpdateModal(false)}
            >
              {" "}
              <RxCross1 size={20}></RxCross1>
            </button>
          </div>

          <hr className="mt-2 mb-3" />
          <form onSubmit={handleSubmit(handleDataPost)}>
            <div className="mt-2 mb-3">
              <div>
                <label
                  htmlFor="UserEmail"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Question Name
                </label>

                <input
                  type="text"
                  value={getUpdateAns?.question_name}
                  disabled
                  placeholder="Question Name"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div>
                <label
                  htmlFor="UserEmail"
                  className="block text-xs font-medium text-gray-700 mt-2 mb-1"
                >
                  Question Ans
                </label>

                <input
                  {...register("question_answer")}
                  type="text"
                  defaultValue={getUpdateAns?.question_answer}
                  placeholder="Question Ans"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
            </div>

            <div className="flex items-center justify-end mt-4">
              {loading ? (
                <button
                  type="button"
                  disabled
                  className="px-6 py-2 text-white transition-colors duration-300 transform bg-primaryColor rounded-xl hover:bg-primaryColor"
                >
                  <MiniSpinner />
                </button>
              ) : (
                <button
                  type="Submit"
                  className="px-6 py-2 text-white transition-colors duration-300 transform bg-primaryColor rounded-xl hover:bg-primaryColor"
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
