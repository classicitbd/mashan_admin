import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import AddProductInfoPrice from "./AddProductInfoPrice";
import AddProductVariation from "./AddProductVariation";
import { LoaderOverlay } from "../../../common/loader/LoderOverley";
import Select from "react-select";
import AddProductFilter from "./AddProductFilter";

const AddProductInfo = ({
  productInfoData,
  setProductInfoData,
  register,
  errors,
  setSub_Category_id,
  setBrand_id,
  attributeDataToSubmit,
  setAttributeDataToSubmit,
  setShowProductVariation,
  showProductVariation,
  variationTableData,
  setVariationTableData,
  setValue,
  watch,
}) => {
  // State to manage selected attributes
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  // State to manage selected attribute values
  const [selectedAttributeValues, setSelectedAttributeValues] = useState([]);

  useEffect(() => {
    if (productInfoData?.variation_details) {
      setVariationTableData(productInfoData?.variation_details);
    }
  }, [productInfoData?.variation_details]);

  const [category_id, setCategory_id] = useState(
    productInfoData?.category_id ? productInfoData?.category_id : ""
  );
  const [isSub_CategoryOpen, setIsSub_CategoryOpen] = useState(true);
  const [subCategoryData, setSubCategoryData] = useState([]);

  // set  change value state
  const [isChangeCategory, setIsChangeCategory] = useState(false);

  const { data: categories = [], isLoading: categoryLoading } = useQuery({
    queryKey: [`/api/v1/category`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/category`, {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
  }); // get all category for select

  const { data: sub_categories = [], isLoading: subCategoryLoading } = useQuery(
    {
      queryKey: [`/api/v1/sub_category`],
      queryFn: async () => {
        const res = await fetch(`${BASE_URL}/sub_category`, {
          credentials: "include",
        });
        const data = await res.json();
        return data;
      },
    }
  ); // get all Sub category for select

  const { data: brands = [], isLoading: brandLoading } = useQuery({
    queryKey: [`/api/v1/brand`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/brand`, {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
  }); // get all Brand for select

  //   set sub category
  useEffect(() => {
    const getSubCategoryData = sub_categories?.data?.filter(
      (sub_category) => sub_category?.category_id?._id === category_id
    );
    setSubCategoryData(getSubCategoryData);
  }, [sub_categories?.data, category_id]);

  // loading set
  if (categoryLoading || subCategoryLoading || brandLoading) {
    return <LoaderOverlay />;
  }

  return (
    <div>
      {/* Product Information */}
      <section className=" shadow-md bg-gray-50 rounded-lg p-4 sm:p-8 md:p-12">
        <h1 className="sm:text-3xl text-xl mb-6 font-semibold text-textColor">
          Product Information
        </h1>
        {/* Product all field  */}
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
          {/* Product Name */}
          <div className="">
            <label htmlFor="product_name" className="font-medium">
              Product Name<span className="text-red-500">*</span>
            </label>
            <input
              defaultValue={productInfoData?.product_name}
              {...register("product_name", {
                required: "Product Name is required",
              })}
              id="product_name"
              type="text"
              placeholder="Enter Product Name"
              className="block w-full p-2.5 text-gray-800 outline-primaryColor bg-white border border-gray-300 rounded-lg mt-2"
            />
            {errors.product_name && (
              <p className="text-red-600">{errors.product_name?.message}</p>
            )}
          </div>
          {/* Category Name */}
          <div className=" space-y-2">
            <label htmlFor="category_name" className="font-medium">
              Category Name<span className="text-red-500">*</span>
            </label>

            <Select
              id="category_id"
              name="category_id"
              required
              isClearable
              aria-label="Select a Category"
              options={categories?.data}
              getOptionLabel={(x) => x?.category_name}
              getOptionValue={(x) => x?._id}
              onChange={(selectedOption) => {
                setIsChangeCategory(true);
                setIsSub_CategoryOpen(false);
                setCategory_id(selectedOption?._id);
                setProductInfoData({
                  ...productInfoData,
                  category_id: selectedOption?._id,
                });
                setSub_Category_id("");
                setTimeout(() => {
                  setIsSub_CategoryOpen(true);
                }, 100);
              }}
            ></Select>
          </div>
          {/* Sub Category Name */}
          {isSub_CategoryOpen && (
            <div className=" space-y-2 ">
              <label htmlFor="sub_category_name" className="font-medium">
                Sub Category Name
              </label>
              {isChangeCategory == true ? (
                <Select
                  id="sub_category_id"
                  name="sub_category_id"
                  aria-label="Select a Sub Category"
                  isClearable
                  options={subCategoryData}
                  getOptionLabel={(x) => x?.sub_category_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setSub_Category_id(selectedOption?._id);
                    setProductInfoData({
                      ...productInfoData,
                      sub_category_id: selectedOption?._id,
                    });
                  }}
                ></Select>
              ) : (
                <Select
                  id="sub_category_id"
                  name="sub_category_id"
                  isClearable
                  aria-label="Select a Sub Category"
                  options={subCategoryData}
                  getOptionLabel={(x) => x?.sub_category_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setSub_Category_id(selectedOption?._id);
                    setProductInfoData({
                      ...productInfoData,
                      sub_category_id: selectedOption?._id,
                    });
                  }}
                ></Select>
              )}
            </div>
          )}

          {/* Brand Name */}
          <div className="space-y-2">
            <label htmlFor="brand_name" className="font-medium">
              Brand Name
            </label>
            <Select
              id="brand_id"
              name="brand_id"
              aria-label="Select a Brand"
              isClearable
              options={brands?.data}
              getOptionLabel={(x) => x?.brand_name}
              getOptionValue={(x) => x?._id}
              onChange={(selectedOption) => {
                setBrand_id(selectedOption?._id);
              }}
            ></Select>
          </div>
        </div>
      </section>
      {/* Product Variation */}
      <section className=" shadow-md bg-gray-50 rounded-lg p-4 sm:p-8 md:p-12 py-6 flex justify-between  gap-2 items-center mt-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-textColor whitespace-nowrap">
          Product Variation
        </h1>
        <div className="whitespace-nowrap py-1.5  text-gray-700">
          <label
            htmlFor="product-variation"
            className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-800"
          >
            <span className="relative">
              <input
                id="product-variation"
                type="checkbox"
                className="hidden peer"
                checked={showProductVariation}
                onChange={() => {
                  setAttributeDataToSubmit([]);
                  setShowProductVariation(!showProductVariation);
                }}
              />
              <div className="w-8 sm:w-12 h-2 sm:h-4 rounded-full shadow bg-slate-300  peer-checked:bg-bgBtnActive"></div>
              <div className="absolute left-0 sm:w-6 sm:h-6 w-4 h-4 rounded-full -inset-y-1 peer-checked:right-0 peer-checked:left-auto peer-checked:bg-primaryColor bg-white ring-[1px] shadow-lg  ring-gray-300  "></div>
            </span>
          </label>
        </div>
      </section>

      {/* Product Price and variation */}
      {showProductVariation === true ? (
        <AddProductVariation
          variationTableData={variationTableData}
          setVariationTableData={setVariationTableData}
          selectedAttributes={selectedAttributes}
          selectedAttributeValues={selectedAttributeValues}
          setSelectedAttributes={setSelectedAttributes}
          setSelectedAttributeValues={setSelectedAttributeValues}
          attributeDataToSubmit={attributeDataToSubmit}
          setAttributeDataToSubmit={setAttributeDataToSubmit}
          setValue={setValue}
          watch={watch}
        />
      ) : (
        <div>
          <AddProductInfoPrice
            productInfoData={productInfoData}
            register={register}
            errors={errors}
          />
          <AddProductFilter
            setAttributeDataToSubmit={setAttributeDataToSubmit}
            attributeDataToSubmit={attributeDataToSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default AddProductInfo;
