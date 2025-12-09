import { useEffect, useState } from "react";
import QuestionsAns from "./QuestionsAns";
import EditQuestion from "./EditQuestion";
import { BiShow } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
const QuestionTable = ({
  questions,
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
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  //question ans modal state
  const [questionDescriptionModal, setQuestionDescriptionModal] =
    useState(false);
  const [getQuestion, setGetQuestion] = useState("");
  const handleShowQuestionAns = (data) => {
    setQuestionDescriptionModal(true);
    setGetQuestion(data);
  };

  //Update Question And Question Ans State
  const [questionUpdateModal, setQuestionUpdateModal] = useState(false);
  const [getUpdateAns, setGetUpdateAns] = useState("");
  const handleUpdateQuestionAns = (data) => {
    setQuestionUpdateModal(true);
    setGetUpdateAns(data);
  };

  // handle status change
  const handleStatusChange = async (_id, question_status) => {
    const sendData = {
      _id: _id,
      question_status: question_status,
    };
    try {
      const response = await fetch(
        `
      ${BASE_URL}/question?role_type=question_update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify(sendData),
        }
      );
      const result = await response.json();
      // console.log(result);
      if (result?.statusCode === 200 && result?.success === true) {
        refetch();
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
  };

  return (
    <>
      {/* {isLoading ? (
    <TableLoadingSkeleton />
  ) : ( */}
      <div>
        {/* {reviews?.data?.length > 0 ? ( */}
        <div className="mt-6 shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="divide-x divide-gray-300  font-semibold text-center">
                  <td className="whitespace-nowrap p-4">SL</td>
                  <td className="whitespace-nowrap p-4">Name</td>
                  <td className="whitespace-nowrap p-4">Email</td>
                  <td className="whitespace-nowrap p-4">Phone</td>
                  <td className="whitespace-nowrap p-4">Product Name</td>
                  <td className="whitespace-nowrap p-4">Product Owner Name</td>
                  <td className="whitespace-nowrap p-4">Product Owner Email</td>
                  <td className="whitespace-nowrap p-4">Product Owner Phone</td>

                  <td className="whitespace-nowrap p-4">Description</td>
                  <td className="whitespace-nowrap p-4">Status</td>

                  <td className="whitespace-nowrap p-4">Action</td>
                </tr>
              </thead>

              <tbody className="">
                {/* {banners?.data?.map((banner, i) => ( */}
                <tr
                // key={banner?._id}
                // className={`text-center ${
                //   i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                // } hover:bg-blue-100`}
                >
                  <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                    {/* {serialNumber + i + 1} */}1
                  </td>
                  <td className="whitespace-nowrap py-1.5 text-primaryColor ">
                    {/* {question?.question_user_id?.user_name} */}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                    {/* {question?.question_user_id?.user_email} */}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                    {/* {question?.question_user_id?.user_phone} */}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                    {/* {question?.question_product_id?.product_name} */}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                    {/* {question?.question_product_publisher_id?.user_name} */}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                    {/* {question?.question_product_publisher_id?.user_email} */}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                    {/* {question?.question_product_publisher_id?.user_phone} */}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                    <button onClick={() => handleShowQuestionAns()}>
                      <BiShow size={22} />
                    </button>
                  </td>

                  <td className="whitespace-nowrap py-1.5 font-medium text-primaryColor">
                    {/* {question?.question_status == "active" ? ( */}
                    <button
                      className="bg-green-600 text-white px-[10px] py-[4px] rounded-[8px]"
                      // onClick={() =>
                      //   handleStatusChange(question?._id, "in-active")
                      // }
                    >
                      <span>Active</span>
                    </button>
                    {/* ) : (
                      <button
                        className="bg-red-600 text-white px-[10px] py-[4px] rounded-[8px]"
                        onClick={() =>
                         // handleStatusChange(question?._id, "active")
                        }
                      >
                        <span>In Active</span>
                      </button>
                    )} */}
                  </td>

                  <td className="whitespace-nowrap py-1.5 px-2 text-primaryColor">
                    <button className="ml-1">
                      <MdDeleteForever
                        size={22}
                        className="cursor-pointer text-red-500"
                      />
                    </button>
                    <button
                      className="ml-1"
                      onClick={() => handleUpdateQuestionAns()}
                    >
                      <FiEdit
                        size={22}
                        className="cursor-pointer text-primaryColor"
                      />
                    </button>
                  </td>
                </tr>
                {/* ))} */}
              </tbody>
            </table>
          </div>
        </div>
        {/* ) : ( */}
        {/* <NoDataFound /> */}
        {/* )} */}
        {/* Question Description */}
        {questionDescriptionModal && (
          <QuestionsAns
            setQuestionDescriptionModal={setQuestionDescriptionModal}
            getQuestion={getQuestion}
          />
        )}

        {/* Edit Question */}
        {questionUpdateModal && (
          <EditQuestion
            setQuestionUpdateModal={setQuestionUpdateModal}
            getUpdateAns={getUpdateAns}
            refetch={refetch}
            user={user}
          />
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
      </div>
      {/* )} */}
    </>
  );
};

export default QuestionTable;
