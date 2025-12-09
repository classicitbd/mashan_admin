import { useEffect, useRef, useState } from "react";

const AddProductVariationTable = ({
  attributeDataToSubmit,
  variationTableData,
  setVariationTableData,
  setValue,
  watch,
}) => {
  const getCombinations = (arrays) => {
    if (arrays.length === 0) return [[]];
    const first = arrays[0];
    const rest = getCombinations(arrays.slice(1));
    return first.flatMap((item) => rest.map((combo) => [item, ...combo]));
  };

  const attributes = attributeDataToSubmit?.map(
    (attr) => attr?.attribute_values
  );
  const combinations = getCombinations(attributes);

  const [prevSelectedAttributes, setPrevSelectedAttributes] = useState([]);

  useEffect(() => {
    if (
      combinations &&
      JSON.stringify(prevSelectedAttributes) !==
        JSON.stringify(attributeDataToSubmit)
    ) {
      const initialData = combinations?.map((combo) => ({
        variation_name: combo
          ?.map((item) => item?.attribute_value_name)
          .join("-"),
        variation_price: 1,
        variation_discount_price: 0,
        variation_buying_price: 0,
        variation_quantity: 1,
        // variation_reseller_price: 1,
        // variation_wholeseller_price: 1,
        // variation_wholeseller_min_quantity: 1,
      }));
      setVariationTableData(initialData);
      setPrevSelectedAttributes(attributeDataToSubmit);
    }
  }, [combinations, attributeDataToSubmit, prevSelectedAttributes]);

  // State for bulk inputs including the image
  const [bulkInput, setBulkInput] = useState({
    variation_price: 1,
    variation_discount_price: 0,
    variation_buying_price: 0,
    variation_quantity: 1,
    // variation_reseller_price: 1,
    // variation_wholeseller_price: 1,
    // variation_wholeseller_min_quantity: 1,
    variation_image: null,
  });

  // Handle bulk input changes
  const handleBulkInputChange = (field, value) => {
    setBulkInput({ ...bulkInput, [field]: value });
  };

  // Handle bulk form submission
  const handleBulkSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = variationTableData?.map((row) => ({
      ...row,
      variation_price: bulkInput?.variation_price || row?.variation_price,

      variation_discount_price:
        bulkInput?.variation_discount_price || row?.variation_discount_price,

      variation_buying_price:
        bulkInput?.variation_buying_price || row?.variation_buying_price,

      variation_quantity:
        bulkInput?.variation_quantity || row?.variation_quantity,

      // variation_reseller_price:
      //   bulkInput?.variation_reseller_price || row?.variation_reseller_price,
      // variation_wholeseller_price:
      //   bulkInput?.variation_wholeseller_price ||
      //   row?.variation_wholeseller_price,
      // variation_wholeseller_min_quantity:
      //   bulkInput?.variation_wholeseller_min_quantity ||
      //   row?.variation_wholeseller_min_quantity,
    }));
    setVariationTableData(updatedFormData);
  };

  // Handle individual row input changes
  const handleChange = (index, field, value) => {
    const updatedFormData = [...variationTableData];
    updatedFormData[index][field] = value;
    setVariationTableData(updatedFormData);
  };

  const lastVariationPreviewUrlsRef = useRef({});

  const setVariationImageFromFiles = (idx, files) => {
    if (!files?.length) return;
    const file = files[0];

    // 1. Clean up previous preview URL (optional but good practice)
    const prevUrl = lastVariationPreviewUrlsRef.current[idx];
    if (prevUrl) URL.revokeObjectURL(prevUrl);

    // 2. Create preview URL
    const url = URL.createObjectURL(file);
    lastVariationPreviewUrlsRef.current[idx] = url;

    // 3. Update variationTableData with the file (for submission)
    const updated = [...variationTableData];
    updated[idx].variation_image = file;
    setVariationTableData(updated);

    // 4. ✅ CRITICAL: Update react-hook-form with file AND preview URL
    setValue(`variations[${idx}].variation_image`, file, { shouldDirty: true });
    setValue(`variations[${idx}].variation_image_preview`, url, {
      shouldDirty: true,
    });
  };

  const removeVariationImage = (idx) => {
    const prevUrl = lastVariationPreviewUrlsRef.current[idx];
    if (prevUrl) URL.revokeObjectURL(prevUrl);
    delete lastVariationPreviewUrlsRef.current[idx];

    // Update form state
    setValue(`variations[${idx}].variation_image`, null, { shouldDirty: true });
    setValue(`variations[${idx}].variation_image_preview`, null, {
      shouldDirty: true,
    });

    // ✅ Also update variationTableData
    const updated = [...variationTableData];
    updated[idx].variation_image = null;
    setVariationTableData(updated);
  };

  return (
    <>
      {/* Bulk input form */}
      <div className="mb-5">
        <h3 className="font-semibold my-2">Bulk Update:</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="my-2 flex flex-col">
            <label className="w-full pr-4">Price:</label>
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              placeholder="Variant price"
              className="p-2 border rounded-md outline-primaryColor"
              value={bulkInput?.variation_price}
              min={1}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 1 || value === "") {
                  handleBulkInputChange("variation_price", value);
                }
              }}
            />
          </div>

          <div className="my-2 flex flex-col">
            <label className="w-full pr-4">Discount Price:</label>
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              placeholder="Variant Discount price"
              className="p-2 border rounded-md outline-primaryColor w-full"
              value={bulkInput?.variation_discount_price}
              min={0}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 || value === "") {
                  handleBulkInputChange("variation_discount_price", value);
                }
              }}
            />
          </div>

          <div className="my-2 flex flex-col">
            <label className="w-full pr-4">Buying Price:</label>
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              placeholder="Variant Buying price"
              className="p-2 border rounded-md outline-primaryColor w-full"
              value={bulkInput?.variation_buying_price}
              min={0}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 || value === "") {
                  handleBulkInputChange("variation_buying_price", value);
                }
              }}
            />
          </div>

          <div className="my-2 flex flex-col">
            <label className="w-full pr-4">Variant Quantity:</label>
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              placeholder="Variant Quantity"
              className="p-2 border rounded-md outline-primaryColor w-full"
              value={bulkInput?.variation_quantity}
              min={0}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 || value === "") {
                  handleBulkInputChange("variation_quantity", value);
                }
              }}
            />
          </div>
          {/* <div className="my-2 flex items-center">
            <label className="w-full text-right pr-4">Reseller Price:</label>
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              placeholder="Reseller Price"
              className="p-2 border rounded-md outline-primaryColor w-full"
              value={bulkInput?.variation_reseller_price}
              min={0}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 || value === "") {
                  handleBulkInputChange("variation_reseller_price", value);
                }
              }}
            />
          </div> */}
          {/* <div className="my-2 flex items-center">
            <label className="w-full text-right pr-4">Wholeseller Price:</label>
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              placeholder="Wholeseller Price"
              className="p-2 border rounded-md outline-primaryColor w-full"
              value={bulkInput?.variation_wholeseller_price}
              min={0}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 || value === "") {
                  handleBulkInputChange("variation_wholeseller_price", value);
                }
              }}
            />
          </div> */}
          {/* <div className="my-2 flex items-center">
            <label className="w-full text-right pr-4">
              Wholeseller Min Quantity:
            </label>
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              placeholder="Wholeseller Min Quantity"
              className="p-2 border rounded-md outline-primaryColor w-full"
              value={bulkInput?.variation_wholeseller_min_quantity}
              min={0}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 || value === "") {
                  handleBulkInputChange(
                    "variation_wholeseller_min_quantity",
                    value
                  );
                }
              }}
            />
          </div> */}

          <button
            type="button"
            className="btn py-3 px-3 mt-7 mb-2.5 bg-primaryColor text-white font-semibold hover:bg-btnHoverColor rounded-md cursor-pointer"
            onClick={handleBulkSubmit}
          >
            Apply to All
          </button>
        </div>
      </div>

      {/* Variation table */}
      <div className="rounded-lg border border-gray-200 mt-6">
        <div className="overflow-x-auto scrollbar-thin scrollbar-hide ">
          <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="bg-[#fff9ee]">
              <tr className="divide-x divide-gray-300 font-semibold text-center text-white">
                <td className="whitespace-nowrap px-4 py-5">#SL No</td>
                <td className="whitespace-nowrap px-4 py-5">Variant</td>
                <td className="whitespace-nowrap px-4 py-5">Variant Price</td>
                <td className="whitespace-nowrap px-4 py-5">Discount Price</td>
                <td className="whitespace-nowrap px-4 py-5">Buying Price</td>
                <td className="whitespace-nowrap px-4 py-5">
                  Variant Quantity
                </td>
                {/* <td className="whitespace-nowrap px-4 py-5">Reseller Price</td>
                <td className="whitespace-nowrap px-4 py-5">
                  Wholeseller Price
                </td>
                <td className="whitespace-nowrap px-4 py-5">
                  Wholeseller Min Quantity
                </td> */}
                <td className="whitespace-nowrap px-4 py-5">Variation Image</td>
              </tr>
            </thead>
            <tbody>
              {combinations?.map((combo, idx) => (
                <tr
                  key={idx}
                  className={`divide-x divide-gray-200 ${
                    idx % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                  }`}
                >
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 text-center">
                    {idx + 1}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 text-center">
                    {combo?.map((item) => item?.attribute_value_name).join("-")}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    <input
                      type="number"
                      onWheel={(e) => e.target.blur()}
                      placeholder="Variant price"
                      className="p-2 border rounded-md mx-1.5 outline-primaryColor text-center"
                      value={variationTableData[idx]?.variation_price}
                      min={1}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value >= 1 || value === "") {
                          handleChange(idx, "variation_price", value);
                        }
                      }}
                    />
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    <input
                      type="number"
                      onWheel={(e) => e.target.blur()}
                      placeholder="Variant Discount price"
                      className="p-2 border rounded-md mx-1.5 outline-primaryColor text-center"
                      value={variationTableData[idx]?.variation_discount_price}
                      min={0}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value >= 0 || value === "") {
                          handleChange(idx, "variation_discount_price", value);
                        }
                      }}
                    />
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    <input
                      type="number"
                      onWheel={(e) => e.target.blur()}
                      placeholder="Variant Buyian price"
                      className="p-2 border rounded-md mx-1.5 outline-primaryColor text-center"
                      value={variationTableData[idx]?.variation_buying_price}
                      min={0}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value >= 0 || value === "") {
                          handleChange(idx, "variation_buying_price", value);
                        }
                      }}
                    />
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    <input
                      type="number"
                      onWheel={(e) => e.target.blur()}
                      placeholder="Variant Quantity"
                      className="p-2 border rounded-md mx-1.5 outline-primaryColor text-center"
                      value={variationTableData[idx]?.variation_quantity}
                      min={0}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value >= 0 || value === "") {
                          handleChange(idx, "variation_quantity", value);
                        }
                      }}
                    />
                  </td>
                  {/* <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    <input
                      type="number"
                      onWheel={(e) => e.target.blur()}
                      placeholder="Reseller Price"
                      className="p-2 border rounded-md mx-1.5 outline-primaryColor text-center"
                      value={variationTableData[idx]?.variation_reseller_price}
                      min={0}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value >= 0 || value === "") {
                          handleChange(idx, "variation_reseller_price", value);
                        }
                      }}
                    />
                  </td> */}
                  {/* <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    <input
                      type="number"
                      onWheel={(e) => e.target.blur()}
                      placeholder="Wholeseller Price"
                      className="p-2 border rounded-md mx-1.5 outline-primaryColor text-center"
                      value={
                        variationTableData[idx]?.variation_wholeseller_price
                      }
                      min={0}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value >= 0 || value === "") {
                          handleChange(
                            idx,
                            "variation_wholeseller_price",
                            value
                          );
                        }
                      }}
                    />
                  </td> */}
                  {/* <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    <input
                      type="number"
                      onWheel={(e) => e.target.blur()}
                      placeholder="Wholeseller Min Quantity"
                      className="p-2 border rounded-md mx-1.5 outline-primaryColor text-center"
                      value={
                        variationTableData[idx]
                          ?.variation_wholeseller_min_quantity
                      }
                      min={0}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value >= 0 || value === "") {
                          handleChange(
                            idx,
                            "variation_wholeseller_min_quantity",
                            value
                          );
                        }
                      }}
                    />
                  </td> */}
                  {/* Image */}
                  <td className="px-4 py-3">
                    <div
                      onDrop={(e) => {
                        e.preventDefault();
                        const files = e.dataTransfer.files;
                        if (files?.length > 0) {
                          setVariationImageFromFiles(idx, files); // ✅ idx, not index
                        }
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={(e) => e.preventDefault()}
                      className={`flex items-center gap-2 p-2 border-2 border-dashed rounded ${
                        watch(`variations[${idx}].variation_image_preview`)
                          ? "border-transparent"
                          : "border-gray-300"
                      }`}
                    >
                      {!watch(`variations[${idx}].variation_image_preview`) ? (
                        <>
                          <input
                            id={`variation_image_${idx}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              setVariationImageFromFiles(idx, e.target.files);
                              e.target.value = "";
                            }}
                          />
                          <label
                            htmlFor={`variation_image_${idx}`}
                            className="cursor-pointer inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100"
                          >
                            + Upload Image
                          </label>
                          <span className="text-xs text-gray-500 ml-2">
                            or drag here
                          </span>
                        </>
                      ) : (
                        <>
                          <img
                            src={watch(
                              `variations[${idx}].variation_image_preview`
                            )}
                            alt="preview"
                            className="w-16 h-16 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => removeVariationImage(idx)}
                            className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                          >
                            X
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddProductVariationTable;
