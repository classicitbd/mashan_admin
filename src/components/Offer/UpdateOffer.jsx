import { useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../utils/baseURL";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";

const UpdateOffer = ({
  setShowOfferUpdateProduct,
  offerUpdateProductData,
  user,
  refetch,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle Update Attribute
  const handleDataPost = async (data) => {
    setLoading(true);

    const startDate = new Date(data?.offer_start_date);
    const endDate = new Date(data?.offer_end_date);
    if (endDate < startDate) {
      setLoading(false)
      return toast.warn("Invalid Date");
    }

    const sendData = {
      _id: offerUpdateProductData?._id,
      offer_status: data?.offer_status,
      offer_start_date: data?.offer_start_date,
      offer_end_date: data?.offer_end_date,
      offer_updated_by: user?._id,
    };
    const response = await fetch(`${BASE_URL}/offer`, {
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
        result?.message ? result?.message : "Offer update successfully",
        {
          autoClose: 1000,
        }
      );
      refetch();
      setLoading(false);
      setShowOfferUpdateProduct(false);
    } else {
      toast.error(result?.message || "Something went wrong", {
        autoClose: 1000,
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[900px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin ">
          <div className="flex items-center justify-between mt-4">
            <h3
              className="sm:text-[26px] font-bold text-primaryColor uppercase"
              id="modal-title "
            >
              Update Offer
            </h3>
            <button
              type="button"
              className="btn text-crossBtnHoverColor  p-1 absolute right-3 rounded-full top-3 hover:bg-crossBtnHoverColor hover:text-crossBtnHovertextColor cursor-pointer transition-all duration-300"
              onClick={() => setShowOfferUpdateProduct(false)}
            >
              {" "}
              <RxCross1 size={20}></RxCross1>
            </button>
          </div>

          <hr className="mt-2 mb-6" />

          <form onSubmit={handleSubmit(handleDataPost)} className="">
            <div className="grid grid-cols-1  gap-4 mt-4">
              <div>
                <label className="block text-xs font-medium text-primaryColor uppercase">
                  Offer Start Date <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("offer_start_date", {
                    required: "Start date  is required",
                  })}
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  defaultValue={offerUpdateProductData?.offer_start_date}
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.offer_start_date && (
                  <p className="text-red-600">
                    {errors.offer_start_date?.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-primaryColor uppercase">
                  Offer End Date <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("offer_end_date", {
                    required: "End date Serial is required",
                  })}
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  defaultValue={offerUpdateProductData?.offer_end_date}
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.offer_end_date && (
                  <p className="text-red-600">
                    {errors.offer_end_date?.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-primaryColor uppercase">
                  Offer Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("offer_status", {
                    required: "Offer Status is required",
                  })}
                  defaultValue={offerUpdateProductData?.offer_status}
                  className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
                >
                  <option value="active">Active</option>
                  <option value="in-active">In-Active</option>
                </select>
                {errors.offer_status && (
                  <p className="text-red-600">{errors.offer_status.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-8 mt-4 justify-end">
              {loading == true ? (
                <div className="px-10 py-2 flex items-center justify-center  bg-btnBgColor text-btnTextColor rounded">
                  <MiniSpinner />
                </div>
              ) : (
                <button
                  className="rounded-[8px] py-[10px] px-[18px] bg-btnBgColor hover:bg-btnHoverColor  transform hover:translate-y-[-2px] transition duration-200 text-btnTextColor text-sm cursor-pointer uppercase"
                  type="submit"
                >
                  Update Offer
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateOffer;
