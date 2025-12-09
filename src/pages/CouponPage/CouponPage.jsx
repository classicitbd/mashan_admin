import { useContext, useEffect, useState } from "react";
import useDebounced from "../../hooks/useDebounced";
import { AuthContext } from "../../context/AuthProvider";
import AddCoupon from "../../components/Coupon/AddCoupon";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../utils/baseURL";
import CouponTable from "../../components/Coupon/CouponTable";
const CouponPage = () => {
  const [couponCreateModal, setCouponCreateModal] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { user } = useContext(AuthContext);
  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  // handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value);
    setLimit(10);
    setPage(1);
  };

  const {
    data: getCoupons,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/bus_coupon/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/bus_coupon/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          const errorData = await res.text(); // Get more info about the error
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          );
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error; // Rethrow to propagate the error to react-query
      }
    },
  });
  return (
    <div className="py-6 px-1">
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl text-primaryColor uppercase">Coupon</h1>
        </div>

        <div>
          <button
            type="button"
            className="rounded-[8px] py-[10px] px-[14px] bg-btnBgColor hover:bg-btnHoverColor  transform hover:translate-y-[-2px] transition duration-200 text-btnTextColor text-sm cursor-pointer uppercase"
            onClick={() => setCouponCreateModal(true)}
          >
            Create Coupon
          </button>
        </div>
      </div>
      {/* search Coupon... */}
      <div className="mt-3">
        <input
          type="text"
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="SEARCH COUPON ID..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:textColor focus:border-transparent transition duration-200"
        />
      </div>
      {/* Coupon Data Show and update and delete operation file */}

      {/* Show Coupon table data */}
      <CouponTable
        setPage={setPage}
        setLimit={setLimit}
        page={page}
        limit={limit}
        refetch={refetch}
        getCoupons={getCoupons?.data}
        totalData={getCoupons?.totalData}
        user={user}
        isLoading={isLoading}
      />
      {/* Create Coupon modal */}
      {couponCreateModal && (
        <AddCoupon
          setCouponCreateModal={setCouponCreateModal}
          refetch={refetch}
          user={user}
        />
      )}
    </div>
  );
};

export default CouponPage;
