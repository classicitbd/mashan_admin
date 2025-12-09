import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import WholeSellerRequestTable from "../../components/WholeSellers/WholeSellerRequestTable";
import { AuthContext } from "../../context/AuthProvider";
import useDebounced from "../../hooks/useDebounced";
import { BASE_URL } from "../../utils/baseURL";
const WholeSellerRejectPage = () => {
  //Add staff modal open state
  const [wholeSellerCreateModal, setWholeSellerCreateModal] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);
  const [wholeseller_request_status, setWholeseller_request_status] =
    useState("rejected");

  const {
    data: wholeSellerRequestData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/wholeseller/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}&wholeseller_request_status=${wholeseller_request_status}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/wholeseller/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}&wholeseller_request_status=${wholeseller_request_status}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      return data;
    },
  });
  // handle item search function....
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

  return (
    <div className="py-6 px-1">
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl text-primaryColor uppercase">
            {" "}
            Whole-Seller Rejected List
          </h1>
        </div>

        {/* <div>
          <button
            type="button"
            className="rounded-[8px] py-[10px] px-[14px] bg-btnBgColor hover:bg-btnHoverColor  transform hover:translate-y-[-2px] transition duration-200 text-btnTextColor text-sm cursor-pointer uppercase"
            onClick={() => setWholeSellerCreateModal(true)}
          >
            Add Whole-Seller
          </button>
        </div> */}
      </div>
      {/* search WholeSeller... */}
      <div className="mt-3">
        <input
          type="text"
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="SEARCH WHOLE-SELLER..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:textColor focus:border-transparent transition duration-200"
        />
      </div>
      {/* Whole Seller Data Show and update and delete operation file */}

      <WholeSellerRequestTable
        wholeSellerData={wholeSellerRequestData?.data}
        totalData={wholeSellerRequestData?.totalData}
        refetch={refetch}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
        user={user}
        isLoading={isLoading}
      />

      {/* Create Whole Seller modal */}
      {/* {wholeSellerCreateModal && (
        <AddWholeSeller
          refetch={refetch}
          setWholeSellerCreateModal={setWholeSellerCreateModal}
          user={user}
        />
      )} */}
    </div>
  );
};

export default WholeSellerRejectPage;
