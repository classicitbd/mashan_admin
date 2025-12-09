import { useContext, useState } from "react";
import AddBanner from "../../components/Banner/AddBanner";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../utils/baseURL";
import BannerTable from "../../components/Banner/BannerTable";
import AddBusBannerSlider from "../../components/Banner/AddBusBannerSlider";
import { AuthContext } from "../../context/AuthProvider";
const BannerPage = () => {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [openBannerCreateModal, setOpenBannerCreateModal] = useState(false);

  // Fetch Banner data
  const {
    data: banners = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/banner/dashboard?page=${page}&limit=${limit}`],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/banner/dashboard?page=${page}&limit=${limit}`,
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
          <h1 className="text-2xl text-primaryColor uppercase">Banner</h1>
        </div>
        {user?.role_id?.banner_create === true && (
          <div>
            <button
              type="button"
              className="rounded-[8px] py-[10px] px-[14px] bg-btnBgColor hover:bg-btnHoverColor  transform hover:translate-y-[-2px] transition duration-200 text-btnTextColor text-sm cursor-pointer uppercase"
              onClick={() => setOpenBannerCreateModal(true)}
            >
              Create Banner
            </button>
          </div>
        )}
      </div>

      {/* Show banner like front end */}
      <div className="my-6 ">
        <AddBusBannerSlider banners={banners} />
      </div>

      {/* Banner Data Show and update and delete operation file */}
      <div className="  py-6 px-4 ">
        <BannerTable
          banners={banners}
          setPage={setPage}
          setLimit={setLimit}
          page={page}
          limit={limit}
          totalData={banners?.totalData}
          refetch={refetch}
          isLoading={isLoading}
          user={user}
        />
      </div>

      {/* Add Banner modal */}
      {openBannerCreateModal && (
        <AddBanner
          setOpenBannerCreateModal={setOpenBannerCreateModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default BannerPage;
