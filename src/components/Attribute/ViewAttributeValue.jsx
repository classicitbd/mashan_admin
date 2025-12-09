import { RxCross1 } from "react-icons/rx";

const ViewAttributeValue = ({
  setViewAttributeValueModal,
  attributesValue,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 p-2">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[650px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin uppercase">
        <div className="flex items-center justify-between mt-4">
          <h3
            className="sm:text-[26px] font-bold text-primaryColor"
            id="modal-title "
          >
            View Attribute Value
          </h3>
          <button
            type="button"
            className="btn text-crossBtnHoverColor  p-1 absolute right-3 rounded-full top-3 hover:bg-crossBtnHoverColor hover:text-crossBtnHovertextColor cursor-pointer transition-all duration-300"
            onClick={() => setViewAttributeValueModal(false)}
          >
            {" "}
            <RxCross1 size={20}></RxCross1>
          </button>
        </div>
        <hr className="my-2" />
        <div className="">
          <div className="text-sm mt-10 grid grid-cols-2 gap-4">
            <div className="font-bold">
              Attribute Name :{" "}
              <span className="font-medium text-primaryColor">
                {attributesValue?.attribute_name}
              </span>
            </div>

            <div className="font-bold">
              Attribute Status :{" "}
              <span className="font-medium text-primaryColor">
                {attributesValue?.attribute_status}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <span className="font-medium">Attributes Values :</span>
            <div className="mx-auto text-primaryColor mt-3 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left whitespace-nowrap ">
                  <thead>
                    <tr className="text-center">
                      <th className="p-3 ">Attribute Value Name</th>
                      <th className="p-3 ">Attribute Value Code</th>
                      <th className="p-3 ">Attribute Value Status</th>
                    </tr>
                  </thead>
                  <tbody className=" text-center">
                    {attributesValue?.attribute_values?.map((values) => (
                      <tr key={values?._id} className="">
                        <td className="px-3 py-2 ">
                          <p>{values?.attribute_value_name}</p>
                        </td>
                        <td className="px-3 py-2 ">
                          <p>{values?.attribute_value_code}</p>
                        </td>

                        {values?.attribute_value_status == "active" ? (
                          <td className="px-3 py-2ck text-green-600 font-medium">
                            <p>{values?.attribute_value_status}</p>
                          </td>
                        ) : (
                          <td className="px-3 py-2 text-[#ff0000] font-medium">
                            <p>{values?.attribute_value_status}</p>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAttributeValue;
