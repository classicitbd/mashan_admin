
import { AuthContext } from "../../context/AuthProvider";
import QuestionTable from "../../components/Question/QuestionTable";


const QuestionPage = () => {
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  // const [searchValue, setSearchValue] = useState("");
  // const [searchTerm, setSearchTerm] = useState("");
  // const { user } = useContext(AuthContext);
  // // handle item search function....
  // const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  // useEffect(() => {
  //   setSearchTerm(searchText);
  // }, [searchText]);

  // // handle item search function....
  // const handleSearchValue = (value) => {
  //   setSearchValue(value);
  //   setLimit(10);
  //   setPage(1);
  // };

  // //data fetching of question by Tans Tack Query
  // const {
  //   data: questions = [],
  //   isLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: [
  //     `/api/v1/question/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
  //   ],
  //   queryFn: async () => {
  //     try {
  //       const res = await fetch(
  //         `${BASE_URL}/question/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
  //         {
  //           credentials: "include",
  //         }
  //       );

  //       if (!res.ok) {
  //         const errorData = await res.text(); // Get more info about the error
  //         throw new Error(
  //           `Error: ${res.status} ${res.statusText} - ${errorData}`
  //         );
  //       }

  //       const data = await res.json();
  //       return data;
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //       throw error; // Rethrow to propagate the error to react-query
  //     }
  //   },
  // });


  return (
    <div className="py-6 px-1">
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl text-primaryColor uppercase">All Question</h1>
        </div>
      </div>
      {/* search Question... */}
      <div className="mt-3">
        <input
          type="text"
          //defaultValue={searchTerm}
          //onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="SEARCH QUESTION..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:textColor focus:border-transparent transition duration-200"
        />
      </div>
      {/* Question Data Show and update and delete operation file */}

      <QuestionTable
        // questions={questions}
        // setPage={setPage}
        // setLimit={setLimit}
        // setSearchTerm={setSearchTerm}
        // refetch={refetch}
        // totalData={questions?.totalData}
        // page={page}
        // limit={limit}
        // user={user}
        // isLoading={isLoading}
      />
    </div>
  );
}

export default QuestionPage