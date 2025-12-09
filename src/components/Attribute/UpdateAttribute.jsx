import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/baseURL";
import { generateSlug } from "../../utils/generateSlug";

const UpdateAttribute = ({
  setOpenAttributeUpdateModal,
  attributeUpdateValue,

  refetch,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  //get Default Value of Attributes Values State
  const [defaultValues, setDefaultValues] = useState(
    attributeUpdateValue?.attribute_values
  );

  //AttributeValue State
  const [attributeValues, setAttributeValues] = useState([
    { attribute_value_name: "", attribute_value_code: "" },
  ]);

  //Attributes value handle Start....
  const handleAddAttributeValueField = () => {
    setAttributeValues([
      ...attributeValues,
      { attribute_value_name: "", attribute_value_code: "" },
    ]);
  };

  const handleRemoveAttributeValueField = () => {
    if (attributeValues.length > 1) {
      setAttributeValues(attributeValues.slice(0, -1));
    }
  };

  const handleAttributeValueChange = (index, event) => {
    const updatedLinks = attributeValues.map((value, i) =>
      i === index
        ? { ...value, [event.target.name]: event.target.value }
        : value
    );
    setAttributeValues(updatedLinks);
  };
  //Attributes value handle End....

  //handle Attribute Values Status State change
  const handleAttributeActiveStatus = (id) => {
    const updatedItems = defaultValues.map((item) =>
      item._id === id
        ? {
            ...item,
            attribute_value_status:
              item?.attribute_value_status === "in-active"
                ? "active"
                : "in-active",
          }
        : item
    );
    setDefaultValues(updatedItems);
  };
  const handleAttributeInActiveStatus = (id) => {
    const updatedItems = defaultValues.map((item) =>
      item._id === id
        ? {
            ...item,
            attribute_value_status:
              item?.attribute_value_status === "active"
                ? "in-active"
                : "active",
          }
        : item
    );
    setDefaultValues(updatedItems);
  };

  // Handle Update Attribute
  const handleDataPost = async (data) => {
    setLoading(true);
    const cleanedAttributeValues = attributeValues.filter(
      (item) => item.attribute_value_name.trim() !== ""
    );

    const cleanedData = {
      ...data,
      attribute_values: cleanedAttributeValues,
    };

    if (!cleanedData.attribute_value_name?.trim()) {
      delete cleanedData.attribute_value_name;
    }

    const combinedArray = defaultValues.concat(cleanedData?.attribute_values);

    const sendData = {
      _id: attributeUpdateValue?._id,
      attribute_updated_by: user?._id,
      attribute_slug: generateSlug(
        cleanedData?.attribute_name
          ? cleanedData?.attribute_name
          : attributeUpdateValue?.attribute_name
      ),
      attribute_name: cleanedData?.attribute_name
        ? cleanedData?.attribute_name
        : attributeUpdateValue?.attribute_name,

      attribute_status: cleanedData?.attribute_status
        ? cleanedData?.attribute_status
        : attributeUpdateValue?.attribute_status,

      attribute_values: combinedArray?.map((item) => ({
        _id: item?._id,
        attribute_value_name: item?.attribute_value_name,
        attribute_value_slug: generateSlug(item?.attribute_value_name),
        attribute_value_status: item?.attribute_value_status,
        attribute_value_code: item?.attribute_value_code,
      })),
    };
    const response = await fetch(`${BASE_URL}/attribute`, {
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
        result?.message ? result?.message : "Attribute update successfully",
        {
          autoClose: 1000,
        }
      );
      refetch();
      setLoading(false);
      setOpenAttributeUpdateModal(false);
    } else {
      toast.error(result?.message || "Something went wrong", {
        autoClose: 1000,
      });
      setLoading(false);
    }
  };
  return (
    <div>
      <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 p-2">
          <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin uppercase">
            <div className="flex items-center justify-between mt-4">
              <h3
                className="sm:text-[26px] font-bold text-primaryColor"
                id="modal-title "
              >
                Update Attribute
              </h3>
              <button
                type="button"
                className="btn text-crossBtnHoverColor  p-1 absolute right-3 rounded-full top-3 hover:bg-crossBtnHoverColor hover:text-crossBtnHovertextColor cursor-pointer transition-all duration-300"
                onClick={() => setOpenAttributeUpdateModal(false)}
              >
                {" "}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className="mt-2 mb-6" />

            <form onSubmit={handleSubmit(handleDataPost)} className="">
              <div>
                <label className="block text-xs font-medium text-primaryColor">
                  Attribute Name <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("attribute_name", {
                    required: "Attribute name is required",
                  })}
                  type="text"
                  defaultValue={attributeUpdateValue?.attribute_name}
                  placeholder="ATTRIBUTE NAME"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors?.attribute_name && (
                  <p className="text-red-600">
                    {errors?.attribute_name?.message}
                  </p>
                )}
              </div>

              <div className="mt-3">
                <label className="block text-xs font-medium text-primaryColor">
                  Attribute Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("attribute_status", {
                    required: "Attribute Status is required",
                  })}
                  defaultValue={attributeUpdateValue?.attribute_status}
                  className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
                >
                  <option value="active">Active</option>
                  <option value="in-active">In-Active</option>
                </select>
                {errors.attribute_status && (
                  <p className="text-red-600">
                    {errors.attribute_status.message}
                  </p>
                )}
              </div>
              <div className="mt-3">
                {attributeUpdateValue?.attribute_values && (
                  <>
                    <p className="ml-1 font-semibold py-1">Attribute Values:</p>
                    <table className="min-w-full text-sm  shadow-2xl">
                      <thead>
                        <tr>
                          <th className="whitespace-nowrap px-4 py-2 font-medium  text-left">
                            Attribute Value Name
                          </th>

                          <th className="px-4 py-2 text-center font-medium  whitespace-nowrap">
                            Attribute Value Status
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        {defaultValues?.map((value) => (
                          <tr key={value?._id}>
                            <td className="whitespace-nowrap  px-4 py-2 font-semibold text-justify">
                              {value?.attribute_value_name}
                            </td>

                            <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4 ">
                              {value?.attribute_value_status === "active" ? (
                                <button
                                  type="button"
                                  className="bg-green-600 text-white px-[10px] py-[4px] rounded-[8px] cursor-pointer"
                                  onClick={() =>
                                    handleAttributeActiveStatus(value?._id)
                                  }
                                >
                                  <span>Active</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="bg-[#ff0000] text-white px-[10px] py-[4px] rounded-[8px] cursor-pointer"
                                  onClick={() =>
                                    handleAttributeInActiveStatus(value?._id)
                                  }
                                >
                                  <span>In-Active</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
              <div className="mt-4">
                <div className="flex justify-end">
                  <button
                    onClick={handleAddAttributeValueField}
                    type="button"
                    className="cursor-pointer px-2 py-2 rounded mr-2 bg-primaryColor text-white"
                  >
                    <FaPlus size={18} />
                  </button>
                  <button
                    onClick={handleRemoveAttributeValueField}
                    type="button"
                    className="cursor-pointer px-2 py-2 rounded bg-red-600 text-white"
                  >
                    <RiDeleteBin6Line size={18} />
                  </button>
                </div>

                <div className="">
                  <label
                    htmlFor=""
                    className="block text-xs font-medium text-gray-700 mb-2"
                  >
                    Attributes Values
                  </label>
                  {attributeValues.map((attribute, index) => (
                    <div key={index} className="py-1 flex gap-2">
                      <input
                        name="attribute_value_name"
                       
                        type="text"
                        value={attribute?.attribute_value_name}
                        onChange={(e) => handleAttributeValueChange(index, e)}
                        placeholder="Attribute Value Name"
                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                      />
                      <input
                        name="attribute_value_code"
                        type="text"
                        value={attribute?.attribute_value_code}
                        onChange={(e) => handleAttributeValueChange(index, e)}
                        placeholder="Attribute Value Code"
                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                      />
                    </div>
                  ))}
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
                    Update Attribute
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAttribute;
