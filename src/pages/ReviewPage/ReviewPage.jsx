import { useContext, useState } from "react";
import ReviewTable from "../../components/Review/ReviewTable";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../utils/baseURL";
import { AuthContext } from "../../context/AuthProvider";

const ReviewPage = () => {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Fetch Review data
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/review/dashboard?page=${page}&limit=${limit}`],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/review/dashboard?page=${page}&limit=${limit}`,
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
  return (
    <div className="py-6 px-1">
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl text-primaryColor uppercase">
            Customer Reviews
          </h1>
        </div>
      </div>

      {/* Review Data Show and update and delete operation file */}
      <div className="py-6">
        <ReviewTable
          reviews={reviews}
          setPage={setPage}
          setLimit={setLimit}
          page={page}
          limit={limit}
          totalData={reviews?.totalData}
          refetch={refetch}
          isLoading={isLoading}
          user={user}
        />
      </div>
    </div>
  );
};

export default ReviewPage;
