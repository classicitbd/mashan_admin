import { BiShow } from "react-icons/bi";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import TableLoadingSkeleton from "../../common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "../../common/pagination/Pagination";
import ReviewDescription from "./ReviewDescription";
import ReviewUpdate from "./ReviewUpdate";

const ReviewTable = ({
  reviews,
  limit,
  page,
  setPage,
  setLimit,
  isLoading,
  totalData,
  refetch,
  user,
}) => {
  const [serialNumber, setSerialNumber] = useState();
  //review DesCription State
  const [desCription, setDesCription] = useState(false);
  const [desCriptionDATA, setDesCriptionDATA] = useState({});
  const [openQuestionAnsModal, setOpenQuestionAnsModal] = useState(false);
  const [openQuestionAnsModalData, setOpenQuestionAnsModalData] = useState({});

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  const handleReviewAns = (reviews) => {
    setOpenQuestionAnsModalData(reviews);
    setOpenQuestionAnsModal(true);
  };
  const handleDescription = (data) => {
    setDesCriptionDATA(data);
    setDesCription(true);
  };
  return (
    <>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div className="">
          {/* Make the table wrapper horizontally scrollable */}
          <div className="mt-5 overflow-x-auto shadow-md ">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="bg-[#fff9ee]">
                <tr className="divide-x divide-gray-300  font-semibold text-center text-white">
                  <td className="whitespace-nowrap p-2 ">SL No</td>
                  <td className="whitespace-nowrap p-2 ">Reviewer Name</td>
                  <td className="whitespace-nowrap p-2 ">Reviewer Phone</td>
                  <td className="whitespace-nowrap p-2 ">Reviewer Product</td>
                  <td className="whitespace-nowrap p-2 ">Review Ratting</td>
                  <td className="whitespace-nowrap p-2 ">Reviewer Question</td>
                  <td className="whitespace-nowrap p-2 ">Review Answer</td>
                  <td className="whitespace-nowrap p-2 ">Review Status</td>
                  <td className="whitespace-nowrap p-2 ">Home Page Show</td>
                  {user?.role_id?.review_update === true && (
                    <td className="whitespace-nowrap p-2 ">Action</td>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center">
                {reviews?.data?.map((reviews, index) => (
                  <tr
                    key={reviews?._id}
                    className={`divide-x divide-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                    }`}
                  >
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {serialNumber + index + 1}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {reviews?.review_user_id?.user_name}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {reviews?.review_user_id?.user_phone}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {reviews?.review_product_id?.product_name}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {reviews?.review_ratting}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 ">
                      <button
                        onClick={() => handleDescription(reviews)}
                        type="button"
                        className="cursor-pointer"
                      >
                        <BiShow size={22} />
                      </button>
                    </td>
                    <td className="p-2">
                      <div className="overflow-y-auto scrollbar-thin px-2">
                        <p className="h-10 w-full">
                          {reviews?.review_answer || "No Answer"}
                        </p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {reviews?.review_status == "active"
                        ? "Active"
                        : "In-active"}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {reviews?.review_show == true ? "Show" : "Hide"}
                    </td>
                    {user?.role_id?.review_update === true && (
                      <td className="whitespace-nowrap p-2">
                        <button
                          className="ml-[8px]"
                          onClick={() => handleReviewAns(reviews)}
                        >
                          <FiEdit
                            size={25}
                            className="cursor-pointer text-primaryColor"
                          />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* pagination */}
          {totalData > 2 && (
            <Pagination
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              totalData={totalData}
            />
          )}
        </div>
      )}
      {desCription && (
        <ReviewDescription
          desCriptionDATA={desCriptionDATA}
          setDesCription={setDesCription}
        />
      )}
      {openQuestionAnsModal && (
        <ReviewUpdate
          setOpenQuestionAnsModal={setOpenQuestionAnsModal}
          openQuestionAnsModalData={openQuestionAnsModalData}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default ReviewTable;
