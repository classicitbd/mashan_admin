import { useEffect, useState } from "react";
import TableLoadingSkeleton from "../../common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "../../common/pagination/Pagination";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";
import Swal from "sweetalert2-optimized";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { DateFormat } from "../../utils/DateFormate";
import ShowOfferDescription from "./ShowOfferDescription";
import ShowOfferProduct from "./ShowOfferProduct";
import { BASE_URL } from "../../utils/baseURL";
import { toast } from "react-toastify";
import UpdateOffer from "./UpdateOffer";

const OfferTable = ({
  offers,
  setLimit,
  setPage,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
}) => {
  const [serialNumber, setSerialNumber] = useState();
  //Show offer DesCription  Modal State
  const [showDesCription, setShowDesCription] = useState(false);
  const [desCriptionData, setDesCriptionData] = useState();

  //Show offer Product Modal State
  const [showOfferProduct, setShowOfferProduct] = useState(false);
  const [offerProductData, setOfferProductData] = useState();

  //Show offer Update Product Modal State
  const [showOfferUpdateProduct, setShowOfferUpdateProduct] = useState(false);
  const [offerUpdateProductData, setOfferUpdateProductData] = useState();

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  //Offer Description Show Function
  const handleShowOfferDesCription = (descriptionData) => {
    setShowDesCription(true);
    setDesCriptionData(descriptionData);
  };

  //Offer Product Show Function
  const handleShowOfferProduct = (product) => {
    setShowOfferProduct(true);
    setOfferProductData(product);
  };
  //Offer Update Product Show Function
  const handleOfferUpdateModal = (product) => {
    setShowOfferUpdateProduct(true);
    setOfferUpdateProductData(product);
  };

  // Handle Delete Offer Table Row function
  const handleDeleteOfferTableRow = (offer) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${DateFormat(
        offer?.offer_start_date
      )} to  ${DateFormat(offer?.offer_end_date)} offer !`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: offer?._id,
          offer_image_key: offer?.offer_image_key,
        };
        try {
          const response = await fetch(
            `
          ${BASE_URL}/offer`,
            {
              method: "DELETE",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(sendData),
            }
          );
          const result = await response.json();
          if (result?.statusCode === 200 && result?.success === true) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${DateFormat(offer?.offer_start_date)} to  ${DateFormat(
                offer?.offer_end_date
              )} Offer has been deleted!`,
              icon: "success",
            });
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
      }
    });
  };

  //Active Offer Status..
  const handleOfferActiveStatus = async (id, offer_status) => {
    try {
      const data = {
        _id: id,
        offer_status,
      };
      const response = await fetch(`${BASE_URL}/offer`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success("Offer status Update successfully", {
          autoClose: 1000,
        });
        refetch();
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      });
    } finally {
      ("");
    }
  };
  // In-Active Offer Status..
  const handleOfferInActiveStatus = async (id, offer_status) => {
    try {
      const data = {
        _id: id,
        offer_status,
      };
      const response = await fetch(`${BASE_URL}/offer`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success("Offer status  Update successfully", {
          autoClose: 1000,
        });
        refetch();
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      });
    } finally {
      ("");
    }
  };

  return (
    <>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {offers?.data?.length > 0 ? (
            <div className="mt-6 shadow-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr className="divide-x divide-gray-300  font-semibold text-center">
                      <th className="whitespace-nowrap p-4 font-medium">SL</th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Offer Image
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Offer Description
                      </th>

                      <th className="whitespace-nowrap p-4 font-medium">
                        Start Date
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        End Date
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Show Offer Product
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Status
                      </th>

                      {(user?.role_id?.offer_delete === true ||
                        user?.role_id?.offer_update === true) && (
                        <th className="whitespace-nowrap p-4 font-medium">
                          Action
                        </th>
                      )}
                    </tr>
                  </thead>

                  <tbody className="">
                    {offers?.data?.map((offer, i) => (
                      <tr
                        key={offer?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5  flex justify-center">
                          <img
                            className="w-[44px] h-[44px] rounded-[8px]"
                            src={offer?.offer_image}
                            alt=""
                          />
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          <button
                            type="button"
                            onClick={() =>
                              handleShowOfferDesCription(
                                offer?.offer_description
                              )
                            }
                          >
                            <GoEye size={22} className="cursor-pointer" />
                          </button>
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          {offer?.offer_start_date}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          {offer?.offer_end_date}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          <button
                            onClick={() =>
                              handleShowOfferProduct(offer?.offer_products)
                            }
                          >
                            <GoEye size={22} className="cursor-pointer" />
                          </button>
                        </td>

                        <td className="whitespace-nowrap py-1.5 ">
                          {offer?.offer_status === "active" ? (
                            <button
                              className="bg-green-500 text-white px-[10px] py-[4px] rounded-[8px] cursor-pointer"
                              onClick={() =>
                                handleOfferActiveStatus(
                                  offer?._id,
                                  offer?.offer_status ? "in-active" : "active"
                                )
                              }
                            >
                              <span>Active</span>
                            </button>
                          ) : (
                            <button
                              className="bg-red-500 text-white font-semibold px-[10px] py-[4px] rounded-[8px] cursor-pointer"
                              onClick={() =>
                                handleOfferInActiveStatus(
                                  offer?._id,
                                  offer?.offer_status ? "active" : "in-active"
                                )
                              }
                            >
                              <span>In-Active</span>
                            </button>
                          )}
                        </td>

                        {(user?.role_id?.offer_delete === true ||
                          user?.role_id?.offer_update === true) && (
                          <td className="whitespace-nowrap py-1.5 px-2 text-gray-700">
                            <>
                              {user?.role_id?.offer_delete && (
                                <button
                                  onClick={() =>
                                    handleDeleteOfferTableRow(offer)
                                  }
                                >
                                  <MdDeleteForever
                                    size={25}
                                    className="cursor-pointer text-deleteButtonColor"
                                  />
                                </button>
                              )}
                              {user?.role_id?.offer_update && (
                                <button
                                  className="ml-3"
                                  onClick={() => handleOfferUpdateModal(offer)}
                                >
                                  <FiEdit
                                    size={25}
                                    className="cursor-pointer text-updateBtnColor"
                                  />
                                </button>
                              )}
                            </>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <NoDataFound />
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

          {/* Offer Description */}
          {showDesCription && (
            <ShowOfferDescription
              setShowDesCription={setShowDesCription}
              desCriptionData={desCriptionData}
            />
          )}
          {/*Offer Product */}
          {showOfferProduct && (
            <ShowOfferProduct
              setShowOfferProduct={setShowOfferProduct}
              offerProductData={offerProductData}
            />
          )}
          {/*Offer Update Product */}
          {showOfferUpdateProduct && (
            <UpdateOffer
              setShowOfferUpdateProduct={setShowOfferUpdateProduct}
              offerUpdateProductData={offerUpdateProductData}
              user={user}
              refetch={refetch}
            />
          )}
        </div>
      )}
    </>
  );
};

export default OfferTable;
