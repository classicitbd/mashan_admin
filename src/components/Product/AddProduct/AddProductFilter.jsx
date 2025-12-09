import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { BASE_URL } from "../../../utils/baseURL";
import { LoaderOverlay } from "../../../common/loader/LoderOverley";

const AddProductFilter = ({
  setAttributeDataToSubmit,
  attributeDataToSubmit,
}) => {
  const { data: attributes = [], isLoading } = useQuery({
    queryKey: [`/api/v1/attribute`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/attribute`, {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
  }); // get all attribute for select

  // Function to handle selecting a single value
  const handleSelectChange = (specId, specName, selectedOption) => {
    const selectedValue = {
      _id: selectedOption?._id,
      attribute_value_name: selectedOption?.attribute_value_name,
    };

    setAttributeDataToSubmit((prevState) => {
      const specIndex = prevState?.findIndex((spec) => spec?._id === specId);

      if (specIndex > -1) {
        // Specification exists, update the value
        const updatedSpec = {
          ...prevState[specIndex],
          attribute_values: [selectedValue], // Only one value allowed
        };
        return [
          ...prevState.slice(0, specIndex),
          updatedSpec,
          ...prevState.slice(specIndex + 1),
        ];
      } else {
        // Specification doesn't exist, add it with the selected value
        return [
          ...prevState,
          {
            _id: specId,
            attribute_name: specName,
            attribute_values: [selectedValue], // Only one value allowed
          },
        ];
      }
    });
  };

  // loading set
  if (isLoading) {
    return <LoaderOverlay />;
  }

  return (
    <section className=" shadow-md bg-gray-50 rounded-lg p-4 sm:p-8 md:p-12 mt-4">
      <h1 className="sm:text-3xl text-xl mb-6 font-semibold text-textColor">
        Product Filter Information
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {attributes?.data?.length > 0 &&
          attributes?.data?.map((spec) => {
            // Find the selected specification for the current spec
            const selectedSpec = attributeDataToSubmit?.find(
              (s) => s._id === spec._id
            );
            return (
              <div key={spec?._id}>
                <h3>{spec?.attribute_name}</h3>
                <Select
                  options={spec?.attribute_values}
                  getOptionLabel={(option) => option?.attribute_value_name}
                  getOptionValue={(option) => option?._id}
                  isClearable
                  onChange={(selectedOption) =>
                    handleSelectChange(
                      spec?._id,
                      spec?.attribute_name,
                      selectedOption
                    )
                  }
                  placeholder={`Select ${spec?.attribute_name}`}
                  className="mb-3"
                  value={
                    selectedSpec?.attribute_values?.length
                      ? {
                          _id: selectedSpec?.attribute_values[0]?._id,
                          attribute_value_name:
                            selectedSpec?.attribute_values[0]
                              ?.attribute_value_name,
                        }
                      : null
                  } // Set default value from selectedSpecifications
                />
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default AddProductFilter;
