import { useEffect } from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import AddProductVariationTable from "./AddProductVariationTable";
import { LoaderOverlay } from "../../../common/loader/LoderOverley";

const AddProductVariation = ({
  variationTableData,
  setVariationTableData,
  selectedAttributes,
  setSelectedAttributes,
  selectedAttributeValues,
  setSelectedAttributeValues,
  attributeDataToSubmit,
  setAttributeDataToSubmit,
  setValue,
  watch,
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

  // Handler for selection change for attributes
  const handleAttributeChange = (selectedOptions) => {
    // Preserve the previous values while updating attributes
    const newSelectedAttributes = selectedOptions || [];

    // Create a new array for selected values based on new attributes
    const newSelectedValues = newSelectedAttributes?.map((attr) => {
      const existingValues = selectedAttributes?.find(
        (selectedAttr) => selectedAttr?._id === attr?._id
      );
      return existingValues
        ? selectedAttributeValues[selectedAttributes.indexOf(existingValues)]
        : [];
    });

    setSelectedAttributes(newSelectedAttributes);
    setSelectedAttributeValues(newSelectedValues);
  };

  // Handler for selection change for attribute values
  const handleAttributeValueChange = (index, selectedOptions) => {
    const newSelectedValues = [...selectedAttributeValues];
    newSelectedValues[index] = selectedOptions; // Update the specific attribute values
    setSelectedAttributeValues(newSelectedValues); // Update state
  };

  // Function to filter available options for each Select
  const getAvailableOptions = () => {
    const selectedIds = selectedAttributes?.map((attr) => attr?._id); // Assuming 'id' is the key for filtering
    return attributes?.data?.filter((attr) => !selectedIds.includes(attr?._id));
  };

  // Prepare data for submission
  const prepareDataForSubmission = () => {
    return selectedAttributes.map((attr, index) => ({
      _id: attr?._id,
      attribute_name: attr?.attribute_name,
      attribute_values: selectedAttributeValues[index] || [], // Use selected values for this attribute
    }));
  };

  // Effect to update dataToSubmit whenever selectedAttributes or selectedAttributeValues change
  useEffect(() => {
    const preparedData = prepareDataForSubmission();
    setAttributeDataToSubmit(preparedData);
  }, [selectedAttributes, selectedAttributeValues]);

  // loading set
  if (isLoading) {
    return <LoaderOverlay />;
  }

  return (
    <div>
      <section className="max-w-4xl mx-auto shadow-md bg-gray-50  px-2 py-4 sm:py-6 rounded-lg  sm:px-6  mb-10 mt-4">
        <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
          Variation
        </p>
        {/* Variation select field */}
        <div className="flex items-center gap-3 flex-wrap ">
          <p className="font-semibold text-gray-700">Attribute</p>
          <div className="flex-1">
            <Select
              id="attribute_id"
              name="attribute_id"
              required
              aria-label="Category Type"
              options={getAvailableOptions()} // Get available options dynamically
              getOptionLabel={(x) => x?.attribute_name}
              isClearable
              isMulti
              getOptionValue={(x) => x?._id} // Assuming 'id' is the unique identifier
              onChange={handleAttributeChange}
              // Set the default selected values
              value={selectedAttributes}
            />
          </div>
        </div>

        <div className="space-y-6 ">
          <p className="text-gray-700 mt-4">
            Choose the attributes of this product and then input values of each
            attribute
          </p>

          {selectedAttributes?.length > 0 &&
            selectedAttributes?.map((data, index) => {
              return (
                <div key={index} className="flex items-center gap-3 flex-wrap">
                  <p className="font-semibold text-gray-700">
                    {data?.attribute_name}
                  </p>
                  <div className="flex-1">
                    <Select
                      id="attribute_values"
                      name="attribute_values"
                      required
                      aria-label="Category Type"
                      options={data?.attribute_values}
                      getOptionLabel={(x) => x?.attribute_value_name}
                      isClearable
                      isMulti
                      getOptionValue={(x) => x?._id}
                      onChange={(selectedOptions) =>
                        handleAttributeValueChange(index, selectedOptions)
                      }
                      // Set the default selected values
                      value={selectedAttributeValues[index]}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* Variation Table start here */}
      {attributeDataToSubmit?.length > 0 && (
        <div>
          <AddProductVariationTable
            attributeDataToSubmit={attributeDataToSubmit}
            variationTableData={variationTableData}
            setVariationTableData={setVariationTableData}
            setValue={setValue}
            watch={watch}
          />
        </div>
      )}
      {/* Variation Table end here */}
    </div>
  );
};

export default AddProductVariation;
