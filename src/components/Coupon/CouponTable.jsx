import { MdDeleteForever } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
const CouponTable = ({
  setPage,
  page,
  limit,
  getCoupons,
  totalData,
  refetch,
  user,
  isLoading,
  setLimit,
}) => {
  //Table Serial number
//   const [serialNumber, setSerialNumber] = useState();
//   useEffect(() => {
//     const newSerialNumber = (page - 1) * limit;
//     setSerialNumber(newSerialNumber);
//   }, [page, limit]);
  //End Table Serial number

  //coupon Type Show State
//   const [couponTypeDetailsShow, setCouponTypeDetailsShow] = useState(false);
//   const [couponTypeDetailsData, setCouponTypeDetailsData] = useState({});

  //Update Coupon Type Data State
  const [couponUpdate, setCouponUpdate] = useState(false);
  const [getCouponUpdateData, setGetCouponUpdateData] = useState({});

  //Coupon Type Product Type ,customer type ,Details show handle
//   const handleCouponDetailsShow = (coupon) => {
//     setCouponTypeDetailsShow(true);
//     setCouponTypeDetailsData(coupon);
//   };

  //Coupon Type Update handle
  const handleCouponUpdate = (coupon) => {
    setCouponUpdate(true);
    setGetCouponUpdateData(coupon);
  };

  //Delete Coupon Data
//   const handleDeleteCoupon = (coupon) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You won't be able to revert this ${coupon?.coupon_code}!`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const sendData = {
//           _id: coupon?._id,
//           coupon_image_key: coupon?.coupon_image_key,
//         };
//         try {
//           const response = await fetch(
//             `
//             ${BASE_URL}/bus_coupon`,
//             {
//               method: "DELETE",
//               headers: {
//                 "Content-Type": "application/json",
//                 credentials: "include",
//               },
//               body: JSON.stringify(sendData),
//             }
//           );
//           const result = await response.json();
//           // console.log(result);
//           if (result?.statusCode === 200 && result?.success === true) {
//             refetch();
//             Swal.fire({
//               title: "Deleted!",
//               text: `${coupon?.coupon_code} coupon has been deleted!`,
//               icon: "success",
//             });
//           } else {
//             toast.error(result?.message, {
//               autoClose: 1000,
//             });
//           }
//         } catch (error) {
//           toast.error("Network error or server is down", {
//             autoClose: 1000,
//           });
//           console.error(error);
//         }
//       }
//     });
//   };
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
                  <td className="whitespace-nowrap p-4 ">SL No</td>
                  <td className="whitespace-nowrap p-4 ">Coupon Img</td>
                  <td className="whitespace-nowrap p-4 ">Coupon Code</td>
                  <td className="whitespace-nowrap p-4 "> Start Date</td>
                  <td className="whitespace-nowrap p-4 ">End Date</td>
                  <td className="whitespace-nowrap p-4 ">Coupon Amount</td>
                  <td className="whitespace-nowrap p-4 ">
                    {" "}
                    Coupon Use Per Person
                  </td>
                  <td className="whitespace-nowrap p-4 ">
                    {" "}
                    Coupon Use Total Person
                  </td>
                  <td className="whitespace-nowrap p-4 ">View Details</td>

                  <td className="whitespace-nowrap p-4 ">Status</td>
                  <td className="whitespace-nowrap p-4 ">Action</td>
                </tr>
              </thead>

              <tbody className="">
                {/* {getCoupons?.map((coupon, i) => ( */}
                <tr
                // key={coupon?._id}
                // className={`text-center ${
                //   i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                // } hover:bg-blue-100`}
                >
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    {/* {serialNumber + i + 1} */} 1
                  </td>
                  <td className="whitespace-nowrap py-1.5 text-gray-700 flex justify-center">
                    <img
                      className="w-[44px] h-[44px] rounded-[8px]"
                      //src={coupon?.coupon_image}
                      alt="coupon image"
                    />
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    {/* {coupon?.coupon_code} */}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    {/* {coupon?.coupon_start_date} */}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    {/* {coupon?.coupon_end_date} */}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    {/* {coupon?.coupon_amount} */}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    {/* {coupon?.coupon_use_per_person} */}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    {/* {coupon?.coupon_use_total_person} */}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    <button
                    //onClick={() => handleCouponDetailsShow(coupon)}
                    >
                      <BiShow
                        size={25}
                        className="text-gray-500 hover:text-gray-900"
                      />
                    </button>
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    {/* {coupon?.coupon_status === "active" ? ( */}
                    <p className="text-green-600">
                      <span>Active</span>
                    </p>
                    {/* ) : ( */}
                    <p className="text-red-600">
                      <span>In-Active</span>
                    </p>
                    {/* )} */}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    <button
                    //onClick={() => handleDeleteCoupon(coupon)}
                    >
                      <MdDeleteForever
                        size={25}
                        className="cursor-pointer text-red-500 hover:text-red-300"
                      />
                    </button>
                    <button
                      className="ml-3"
                      onClick={() => handleCouponUpdate()}
                    >
                      <FiEdit
                        size={25}
                        className="cursor-pointer text-gray-500 hover:text-gray-900"
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

export default CouponTable;
