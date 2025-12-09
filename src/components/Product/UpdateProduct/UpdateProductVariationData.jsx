// UpdateProductVariationData.jsx

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { BASE_URL } from "../../../utils/baseURL";
import { LoaderOverlay } from "../../../common/loader/LoderOverley";
import { toast } from "react-toastify";

// Utility: Generate all combinations (Cartesian product)
const generateCombinations = (attributes) => {
  if (!attributes || attributes.length === 0) return [];

  return attributes.reduce((acc, attr) => {
    if (!attr.attribute_values || attr.attribute_values.length === 0)
      return acc;

    if (acc.length === 0) {
      return attr.attribute_values.map((v) => ({
        names: { [attr.attribute_name]: v.attribute_value_name },
        ids: { [attr.attribute_name]: v._id },
      }));
    }

    return acc.flatMap((combo) =>
      attr.attribute_values.map((v) => ({
        names: {
          ...combo.names,
          [attr.attribute_name]: v.attribute_value_name,
        },
        ids: {
          ...combo.ids,
          [attr.attribute_name]: v._id,
        },
      }))
    );
  }, []);
};

const UpdateProductVariationData = ({
  variationData,
  setProductInfoData,
  // attributeDataToSubmit,
  setAttributeDataToSubmit,
  productData,
}) => {
  const [bulkInput, setBulkInput] = useState({
    variation_price: "",
    variation_discount_price: "",
    variation_buying_price: "",
    variation_quantity: "",
    variation_reseller_price: "",
    variation_wholeseller_price: "",
    variation_wholeseller_min_quantity: "",
  });

  const { data: attributes = [], isLoading } = useQuery({
    queryKey: [`/api/v1/attribute`],
    enabled: !!productData,
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/attribute`, {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
  });

  // State for selected attributes and their values
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedAttributeValues, setSelectedAttributeValues] = useState([]);
  // const [isInitialized, setIsInitialized] = useState(false); // initial prefill done?
  const [isUserChangedAttributes, setIsUserChangedAttributes] = useState(false);

  // --------- INITIAL PREFILL FROM productData ----------
  useEffect(() => {
    if (
      isLoading ||
      // isInitialized ||
      !productData?.attributes_details ||
      !attributes?.data
    ) {
      return;
    }

    const initialAttrs = [];
    const initialValues = [];

    productData.attributes_details.forEach((att) => {
      // master attribute khoja
      const masterAttr = attributes.data.find(
        (a) => a.attribute_name === att.attribute_name
      );
      if (!masterAttr) return;

      initialAttrs.push(masterAttr);

      const valuesForAttr = [];
      att.attribute_values.forEach((val) => {
        const masterVal = masterAttr.attribute_values.find(
          (v) =>
            v.attribute_value_name === val.attribute_value_name ||
            (val.attribute_value_code &&
              v.attribute_value_code === val.attribute_value_code)
        );
        if (masterVal) valuesForAttr.push(masterVal);
      });

      initialValues.push(valuesForAttr);
    });

    setSelectedAttributes(initialAttrs);
    setSelectedAttributeValues(initialValues);
    // setIsInitialized(true); // ekbar hoile abar run hobe na
  }, [isLoading, productData, attributes?.data]);

  // --------- HANDLERS ----------

  const handleAttributeChange = (selectedOptions) => {
    const newSelected = selectedOptions || [];
    const newValues = newSelected.map((attr) => {
      const existingIndex = selectedAttributes.findIndex(
        (a) => a?._id === attr?._id
      );
      return existingIndex >= 0 ? selectedAttributeValues[existingIndex] : [];
    });

    setSelectedAttributes(newSelected);
    setSelectedAttributeValues(newValues);
    setIsUserChangedAttributes(true);
  };

  const handleAttributeValueChange = (index, selectedOptions) => {
    const newValues = [...selectedAttributeValues];
    newValues[index] = selectedOptions || [];
    setSelectedAttributeValues(newValues);
    setIsUserChangedAttributes(true);
  };

  // --------- GENERATE VARIATIONS BASED ON ATTRIBUTES ----------

  const generateVariations = () => {
    // User jodi kono attribute touch na kore → API theke asha variationData use korbo
    if (!isUserChangedAttributes) {
      return variationData || [];
    }

    if (!selectedAttributes.length) {
      return [];
    }

    // same variation_name thakle ager price/qty preserve korte Map banaya nilam
    const existingVariationMap = new Map(
      (variationData || []).map((v) => [v.variation_name, v])
    );

    const preparedAttributes = selectedAttributes
      .map((attr, idx) => ({
        _id: attr._id,
        attribute_name: attr.attribute_name,
        attribute_values: (selectedAttributeValues[idx] || []).map((v) => ({
          _id: v._id,
          attribute_value_name: v.attribute_value_name,
        })),
      }))
      .filter((attr) => attr.attribute_values.length > 0);

    const combos = generateCombinations(preparedAttributes);
    if (!combos.length) return [];

    return combos.map((combo) => {
      const variation_name = Object.values(combo.names).join("-");

      const existing = existingVariationMap.get(variation_name);
      if (existing) {
        // ager data thakle oitai use korbo
        return existing;
      }

      // notun variation hole blank fields
      return {
        _id: null,
        variation_name,
        variation_price: "",
        variation_discount_price: "",
        variation_buying_price: "",
        variation_quantity: "",
        variation_reseller_price: "",
        variation_wholeseller_price: "",
        variation_wholeseller_min_quantity: "",
      };
    });
  };

  // parent state update when attributes/values change
  useEffect(() => {
    const newVariations = generateVariations();
    setProductInfoData((prev) => ({
      ...prev,
      variationData: newVariations,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAttributes, selectedAttributeValues, isUserChangedAttributes]);

  // Handle individual input change in table
  const handleInputChange = (index, field, value) => {
    const updated = [...(variationData || [])];
    updated[index] = { ...updated[index], [field]: value };
    setProductInfoData((prev) => ({
      ...prev,
      variationData: updated,
    }));
  };

  // --------- BULK UPDATE ----------

  const handleBulkSubmit = (e) => {
    e.preventDefault();

    const updatedVariations = (variationData || []).map((row) => {
      const updatedRow = { ...row };

      if (bulkInput.variation_price !== "") {
        updatedRow.variation_price = bulkInput.variation_price;
      }
      if (bulkInput.variation_discount_price !== "") {
        updatedRow.variation_discount_price =
          bulkInput.variation_discount_price;
      }
      if (bulkInput.variation_buying_price !== "") {
        updatedRow.variation_buying_price = bulkInput.variation_buying_price;
      }
      if (bulkInput.variation_quantity !== "") {
        updatedRow.variation_quantity = bulkInput.variation_quantity;
      }
      if (bulkInput.variation_reseller_price !== "") {
        updatedRow.variation_reseller_price =
          bulkInput.variation_reseller_price;
      }
      if (bulkInput.variation_wholeseller_price !== "") {
        updatedRow.variation_wholeseller_price =
          bulkInput.variation_wholeseller_price;
      }
      if (bulkInput.variation_wholeseller_min_quantity !== "") {
        updatedRow.variation_wholeseller_min_quantity =
          bulkInput.variation_wholeseller_min_quantity;
      }

      return updatedRow;
    });

    setProductInfoData((prev) => ({
      ...prev,
      variationData: updatedVariations,
    }));

    toast.success("Bulk update applied successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handleBulkInputChange = (field, value) => {
    setBulkInput((prev) => ({ ...prev, [field]: value }));
  };

  // --------- PREPARE ATTRIBUTE DATA FOR SUBMIT ----------

  useEffect(() => {
    if (!setAttributeDataToSubmit) return;

    const preparedData = selectedAttributes.map((attr, idx) => ({
      _id: attr?._id,
      attribute_name: attr?.attribute_name,
      attribute_values: (selectedAttributeValues[idx] || []).map((val) => ({
        _id: val?._id,
        attribute_value_name: val?.attribute_value_name,
        attribute_value_code: val?.attribute_value_code || "",
      })),
    }));

    setAttributeDataToSubmit(preparedData);
  }, [selectedAttributes, selectedAttributeValues, setAttributeDataToSubmit]);

  if (isLoading || !attributes?.data) {
    return <LoaderOverlay />;
  }

  const handleVariationImageChange = (index, file) => {
    if (!file) return;

    const updated = [...(variationData || [])];

    updated[index] = {
      ...updated[index],
      variation_image: file, // new file
      variation_image_preview: URL.createObjectURL(file), // just for preview
    };

    setProductInfoData((prev) => ({
      ...prev,
      variationData: updated,
    }));
  };

  const removeVariationImage = (index) => {
    const updated = [...(variationData || [])];

    // optional: old preview url revoke korte chaile korte paro
    if (updated[index]?.variation_image_preview) {
      URL.revokeObjectURL(updated[index].variation_image_preview);
    }

    updated[index] = {
      ...updated[index],
      variation_image: null,
      variation_image_preview: null,
    };

    setProductInfoData((prev) => ({
      ...prev,
      variationData: updated,
    }));
  };

  return (
    <section className="mx-auto shadow-md bg-gray-50 px-2 py-4 sm:py-6 rounded-lg sm:px-6 mb-10 mt-4">
      <h1 className="sm:text-3xl text-xl mb-6 font-semibold text-textColor">
        Product Variants
      </h1>

      {/* Attribute Selection UI */}
      <div className="mb-6">
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <p className="font-semibold text-gray-700">Attribute</p>
          <div className="flex-1">
            <Select
              isMulti
              isLoading={isLoading}
              noOptionsMessage={() => (isLoading ? "Loading..." : "Not found")}
              options={attributes?.data || []} // 🔥 all attributes, no manual filter
              getOptionLabel={(x) => x?.attribute_name}
              getOptionValue={(x) => x?._id}
              value={selectedAttributes}
              onChange={handleAttributeChange}
              placeholder="Select attributes..."
            />
          </div>
        </div>

        {selectedAttributes?.map((attr, idx) => (
          <div
            key={attr?._id || idx}
            className="flex items-center gap-3 flex-wrap mb-3"
          >
            <p className="font-semibold text-gray-700 min-w-[120px]">
              {attr?.attribute_name}
            </p>
            <div className="flex-1">
              <Select
                isMulti
                isLoading={isLoading}
                noOptionsMessage={() =>
                  isLoading ? "Loading..." : "No values available"
                }
                options={attr?.attribute_values || []}
                getOptionLabel={(x) => x?.attribute_value_name}
                getOptionValue={(x) => x?._id}
                value={selectedAttributeValues[idx] || []}
                onChange={(vals) => handleAttributeValueChange(idx, vals)}
                placeholder={`Select ${attr?.attribute_name} values...`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bulk input form */}
      <div style={{ marginBottom: "20px" }}>
        <h3 className="font-semibold my-2">Bulk Update:</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="my-2 flex items-center">
            <label className="w-full text-right pr-4">Price:</label>
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              placeholder="Variant price"
              className="p-2 border rounded-md outline-primaryColor w-full"
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

          <div className="my-2 flex items-center">
            <label className="w-full text-right pr-4">Discount Price:</label>
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

          <div className="my-2 flex items-center">
            <label className="w-full text-right pr-4">Buying Price:</label>
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

          <div className="my-2 flex items-center">
            <label className="w-full text-right pr-4">Variant Quantity:</label>
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

          <div className="my-2 flex items-center">
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
          </div>

          <div className="my-2 flex items-center">
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
          </div>

          <div className="my-2 flex items-center">
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
          </div>

          <button
            type="button"
            className="btn py-3 px-3 my-4 bg-primaryColor text-white font-semibold hover:bg-btnHoverColor rounded-md cursor-pointer"
            onClick={handleBulkSubmit}
          >
            Apply to All
          </button>
        </div>
      </div>

      {/* Variation Table */}
      {variationData?.length > 0 && (
        <div className="rounded-lg border border-gray-200 mt-6">
          <div className="overflow-x-auto scrollbar-thin scrollbar-hide">
            <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="bg-[#fff9ee]">
                <tr className="divide-x divide-gray-300 font-semibold text-center">
                  <td className="whitespace-nowrap px-4 py-5">#SL No</td>
                  <td className="whitespace-nowrap px-4 py-5">Variant</td>
                  <td className="whitespace-nowrap px-4 py-5">Variant Price</td>
                  <td className="whitespace-nowrap px-4 py-5">
                    Discount Price
                  </td>
                  <td className="whitespace-nowrap px-4 py-5">Buying Price</td>
                  <td className="whitespace-nowrap px-4 py-5">
                    Variant Quantity
                  </td>
                  <td className="whitespace-nowrap px-4 py-5">
                    Reseller Price
                  </td>
                  <td className="whitespace-nowrap px-4 py-5">
                    Wholeseller Price
                  </td>
                  <td className="whitespace-nowrap px-4 py-5">
                    Wholeseller Min Quantity
                  </td>
                  <td className="whitespace-nowrap px-4 py-5">
                    Variation Image
                  </td>
                </tr>
              </thead>
              <tbody>
                {variationData?.map((item, index) => (
                  <tr
                    key={`${item.variation_name}-${index}`}
                    className={`divide-x divide-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                    }`}
                  >
                    <td className="whitespace-nowrap py-1.5 text-center">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap py-1.5 text-center">
                      {item.variation_name}
                    </td>
                    <td className="whitespace-nowrap py-1.5">
                      <input
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        className="p-2 border rounded-md mx-1.5 outline-primaryColor text-center"
                        value={item.variation_price}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "variation_price",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="whitespace-nowrap py-1.5">
                      <input
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        className="p-2 border rounded-md mx-1.5 outline-primaryColor text-center"
                        value={item.variation_discount_price}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "variation_discount_price",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="whitespace-nowrap py-1.5">
                      <input
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        className="p-2 border rounded-md mx-1.5 outline-primaryColor text-center"
                        value={item.variation_buying_price}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "variation_buying_price",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="whitespace-nowrap py-1.5">
                      <input
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        className="p-2 border rounded-md mx-1.5 outline-primaryColor text-center"
                        value={item.variation_quantity}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "variation_quantity",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="whitespace-nowrap py-1.5">
                      <input
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        className="p-2 border rounded-md mx-1.5 outline-primaryColor text-center"
                        value={item.variation_reseller_price}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "variation_reseller_price",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="whitespace-nowrap py-1.5">
                      <input
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        className="p-2 border rounded-md mx-1.5 outline-primaryColor text-center"
                        value={item.variation_wholeseller_price}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "variation_wholeseller_price",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="whitespace-nowrap py-1.5">
                      <input
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        className="p-2 border rounded-md mx-1.5 outline-primaryColor text-center"
                        value={item.variation_wholeseller_min_quantity}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "variation_wholeseller_min_quantity",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    {/* Image */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          id={`variation_image_${index}`}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            handleVariationImageChange(index, file);
                            e.target.value = "";
                          }}
                        />

                        {!item.variation_image_preview &&
                        !item.variation_image ? (
                          <>
                            <label
                              htmlFor={`variation_image_${index}`}
                              className="cursor-pointer inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100"
                            >
                              + Upload Image
                            </label>
                          </>
                        ) : (
                          <>
                            <img
                              src={
                                item.variation_image_preview
                                  ? item.variation_image_preview
                                  : item.variation_image // eta jodi string URL hoy (DB theke)
                              }
                              alt="preview"
                              className="w-16 h-16 object-cover rounded border"
                            />
                            <button
                              type="button"
                              onClick={() => removeVariationImage(index)}
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
      )}
    </section>
  );
};

export default UpdateProductVariationData;
