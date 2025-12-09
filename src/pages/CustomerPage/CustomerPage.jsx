import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import CustomersTable from "../../components/Customers/CustomersTable";
import useDebounced from "../../hooks/useDebounced";
import { BASE_URL } from "../../utils/baseURL";
import { AuthContext } from "../../context/AuthProvider";

const CustomerPage = () => {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  // Fetch Review data
  const {
    data: customers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/user?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/user?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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
      <div>
        <div className="flex justify-between mt-6">
          <h1 className="text-2xl text-primaryColor uppercase">Customer</h1>
        </div>
        <div className="mt-3">
          <input
            type="text"
            defaultValue={searchTerm}
            onChange={(e) => handleSearchValue(e.target.value)}
            placeholder="SEARCH CUSTOMER..."
            className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:textColor focus:border-transparent transition duration-200"
          />
        </div>
      </div>

      {/* Customers Data Show and update and delete operation file */}
      <div className="  py-6 px-4 ">
        <CustomersTable
          customers={customers}
          setPage={setPage}
          setLimit={setLimit}
          page={page}
          limit={limit}
          totalData={customers?.totalData}
          refetch={refetch}
          isLoading={isLoading}
          user={user}
        />
      </div>
    </div>
  );
};

export default CustomerPage;
