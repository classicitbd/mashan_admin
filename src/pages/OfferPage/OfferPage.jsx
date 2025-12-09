import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useDebounced from "../../hooks/useDebounced";
import AddOffer from "../../components/Offer/AddOffer";
import { BASE_URL } from "../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import OfferTable from "../../components/Offer/OfferTable";
const OfferPage = () => {
  const [offerCreateModal, setOfferCreateModal] = useState(false);
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  //Fetch Offer data
  const {
    data: offers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/offer/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/offer/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          const errorData = await res.text();
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          );
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
  });

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
          <h1 className="text-2xl text-primaryColor uppercase">Offer</h1>
        </div>
        {user?.role_id?.offer_create === true && (
          <div>
            <button
              type="button"
              className="rounded-[8px] py-[10px] px-[14px] bg-btnBgColor hover:bg-btnHoverColor  transform hover:translate-y-[-2px] transition duration-200 text-btnTextColor text-sm cursor-pointer uppercase"
              onClick={() => setOfferCreateModal(true)}
            >
              Create Offer
            </button>
          </div>
        )}
      </div>
      {/* search Offer... */}
      <div className="mt-3">
        <input
          type="text"
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="SEARCH OFFER DATE..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:textColor focus:border-transparent transition duration-200"
        />
      </div>
      {/* Offer Data Show and update and delete operation file */}

      <OfferTable
        offers={offers}
        setPage={setPage}
        setLimit={setLimit}
        page={page}
        limit={limit}
        totalData={offers?.totalData}
        refetch={refetch}
        user={user}
        isLoading={isLoading}
      />

      {/* Create Offer modal */}
      {offerCreateModal && (
        <AddOffer
          refetch={refetch}
          setOfferCreateModal={setOfferCreateModal}
          user={user}
        />
      )}
    </div>
  );
};

export default OfferPage;
