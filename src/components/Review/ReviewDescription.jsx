import { BiShow } from "react-icons/bi";

import { RxCross1 } from "react-icons/rx";

const ReviewDescription = ({ desCriptionDATA, setDesCription }) => {
 
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[1000px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin">
          <div className="flex items-center justify-between mt-4">
            <h3
              className="text-[26px] font-bold text-gray-800 capitalize"
              id="modal-title "
            >
              Reviewer Description
            </h3>
            <button
              type="button"
              className="btn text-crossBtnHoverColor  p-1 absolute right-3 rounded-full top-3 hover:bg-crossBtnHoverColor hover:text-crossBtnHovertextColor cursor-pointer transition-all duration-300"
              onClick={() => setDesCription(false)}
            >
              {" "}
              <RxCross1 size={20}></RxCross1>
            </button>
          </div>

          <hr className="mt-2 mb-4" />
          <div className="mt-2 ">
            <div className="">
              <p className="mb-1  font-medium">Reviewer Questions : </p>
              <p className="mt-1 text-xs text-primaryColor text-justify">
                {desCriptionDATA?.review_description}
              </p>
              <hr className="mt-1 mb-3" />

              <div className="mx-auto dark:text-gray-800 ">
                <div className="overflow-x-aut shadow-md">
                  <table className="w-full text-xs text-left whitespace-nowrap ">
                    <thead>
                      <tr className=" border text-center">
                        <th className="p-3 border">Image</th>
                        <th className="p-3 border">Name</th>
                        <th className="p-3 border">Phone</th>
                        <th className="p-3 border">District</th>
                        <th className="p-3 border">Address</th>
                      </tr>
                    </thead>
                    <tbody className="border-b dark:bg-gray-50 dark:border-gray-300 text-center">
                      <tr>
                        <td className="px-3 py-2  flex justify-center items-center">
                          <img
                            src={desCriptionDATA?.review_user_id?.user_image}
                            alt="user_image"
                            className="w-[50px] h-[50px] rounded-full"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <p>{desCriptionDATA?.review_user_id?.user_name}</p>
                        </td>

                        <td className="px-3 py-2 ">
                          <p>{desCriptionDATA?.review_user_id?.user_phone}</p>
                        </td>
                        <td className="px-3 py-2 ">
                          <p>
                            {desCriptionDATA?.review_user_id?.user_district}
                          </p>
                        </td>
                        <td className="px-3 py-2 ">
                          <p>{desCriptionDATA?.review_user_id?.user_address}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="mb-1 font-medium">Review Product Info : </p>
            <div className="overflow-x-auto  shadow-md">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right text-center">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white text-center">
                      Product Name
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white text-center">
                      Product Quantity
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-center">
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {" "}
                      <p>{desCriptionDATA?.review_product_id?.product_name}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                      {" "}
                      {desCriptionDATA?.review_product_id?.product_quantity}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDescription;
