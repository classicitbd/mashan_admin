import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { LoaderOverlay } from "../../common/loader/LoderOverley";
import { BASE_URL } from "../../utils/baseURL";
import { DateFormat } from "../../utils/DateFormate";

const ViewAllOrderInfo = () => {
  const { id } = useParams();

  const { data: orders, isLoading } = useQuery({
    queryKey: [`/api/v1/order/${id}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/order/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <LoaderOverlay />;
  }

  return (
    <section className="max-w-7xl mx-auto">
      {/* Order Product */}

      <div className="">
        <div className="flex justify-between bg-[#fff9ee] p-2.5 shadow-md rounded ">
          <p className="text-xl">Order Information</p>
        </div>
        <div className="bg-[#fff9ee] p-2.5 shadow-md rounded grid grid-cols-4 divide-x-2 divide-gray-300 mt-3 gap-4">
          <div className=" px-4">
            <p className=" font-medium uppercase">Billing To</p>
            <p className="font-medium text-xl">
              Name:{" "}
              <span className="font-normal">
                {orders?.data?.order?.customer_id?.user_name}
              </span>
            </p>
            <p className="">
              <span className="font-medium">Phone:</span>{" "}
              {orders?.data?.order?.customer_id?.user_phone}
            </p>
            <p className="">
              <span className="font-medium">Division:</span>{" "}
              {orders?.data?.order?.billing_division},{" "}
              {orders?.data?.order?.billing_district}
            </p>
            <p className="">
              <span className="font-medium">Area:</span>{" "}
              {orders?.data?.order?.billing_area}
            </p>
            <p className="">
              <span className="font-medium">Address:
                
                
              </span>{" "}
              {orders?.data?.order?.billing_address}
            </p>
          </div>

          <div className=" px-4">
            {" "}
            <p className=" font-medium uppercase">Invoice Number</p>
            <p className="font-medium text-xl">
              {orders?.data?.order?.invoice_id}
            </p>
          </div>
          <div className="  px-4">
            {" "}
            <p className=" font-medium uppercase">Date Issue</p>
            <p className="font-medium text-xl">
              {DateFormat(orders?.data?.order?.customer_id?.createdAt)}
            </p>
          </div>
          <div className=" px-4">
            {" "}
            <p className=" font-medium uppercase">Total Amount</p>
            <p className="font-medium text-xl">
              ৳ {orders?.data?.order?.grand_total_amount}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="mb-4 overflow-x-auto bg-[#fff9ee] p-4 shadow-md rounded">
            <table className="min-w-full text-sm ">
              <thead className="border-b">
                <tr className="text-white">
                  <th className="whitespace-nowrap p-4">SL</th>
                  <th className="whitespace-nowrap p-4">Image</th>
                  <th className="whitespace-nowrap p-4">Product Info</th>
                  <th className="whitespace-nowrap p-4">Unit Price</th>
                  <th className="whitespace-nowrap p-4">Quantity</th>
                  <th className="whitespace-nowrap p-4">Total Price</th>
                </tr>
              </thead>
              <tbody className="divide-gray-200">
                {orders?.data?.order?.order_products?.map((product, idx) => (
                  <tr
                    key={idx}
                    className={`divide-y divide-gray-100 space-y-2 py-2 text-center ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="whitespace-nowrap p-4">{idx + 1}</td>
                    <td className="py-2 flex justify-center">
                      <img
                        src={product?.order_product_id?.main_image}
                        className="w-28 h-[80px] rounded-md border"
                        alt=""
                      />
                    </td>
                    <td className="min-w-[260px] py-2.5 text-gray-700 px-4">
                      <div className="mt-1">
                        <p className="mb-1 flex items-center text-center justify-center">
                          {product?.order_product_id?.product_name}{" "}
                          {product?.is_variation && (
                            <p className="ml-1"> | {product?.variation_name}</p>
                          )}
                        </p>
                      </div>
                    </td>

                    <td className="whitespace-nowrap py-2.5 font-medium text-gray-700 px-4">
                      ৳ {product?.order_product_price}
                    </td>
                    <td className="whitespace-nowrap py-2.5 font-medium text-gray-700 px-4">
                      {product?.order_product_quantity}
                    </td>
                    <td className="whitespace-nowrap py-2.5 font-medium text-gray-700 px-4">
                      ৳
                      {product?.order_product_price *
                        product?.order_product_quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-[#fff9ee] p-2.5 shadow-md rounded  mt-3 gap-4 flex justify-end">
          <div className="px-4 grid grid-cols-2 gap-x-10 gap-y-2">
            <p className=" font-medium uppercase">Shipping Location</p>
            <p className=" font-medium uppercase">
              {orders?.data?.order?.shipping_location}
            </p>
            <p className=" font-medium uppercase">Sub Total Amount</p>
            <p className=" font-medium">
              {" "}
              ৳ {orders?.data?.order?.sub_total_amount}
            </p>
            <p className=" font-medium uppercase">Discount</p>
            <p className=" font-medium">
              {" "}
              ৳ {orders?.data?.order?.discount_amount}
            </p>
            <p className=" font-medium uppercase">Shipping Cost</p>
            <p className=" font-medium">
              {" "}
              ৳ {orders?.data?.order?.shipping_cost}
            </p>

            <p className=" font-medium uppercase">Grand Total Amount</p>
            <p className=" font-medium">
              {" "}
              ৳ {orders?.data?.order?.grand_total_amount}
            </p>
          </div>
        </div>
      </div>

      {/* Order Product */}
    </section>
  );
};

export default ViewAllOrderInfo;
