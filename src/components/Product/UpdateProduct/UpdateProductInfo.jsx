import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { BASE_URL } from "../../../utils/baseURL";
import { LoaderOverlay } from "../../../common/loader/LoderOverley";
import UpdateProductInfoPrice from "./UpdateProductInfoPrice";
import UpdateProductVariationData from "./UpdateProductVariationData";

const UpdateProductInfo = ({
  productInfoData,
  setProductInfoData,
  register,
  errors,
  setSub_Category_id,
  setBrand_id,
  category_id,
  setCategory_id,
  productData,
  attributeDataToSubmit,
  setAttributeDataToSubmit,
}) => {
  const [isSub_CategoryOpen, setIsSub_CategoryOpen] = useState(true);
  const [subCategoryData, setSubCategoryData] = useState([]);

  // set  change value state
  const [isChangeCategory, setIsChangeCategory] = useState(false);

  // set default value
  const categoryNameValue = productData?.category_id
    ? productData?.category_id?.category_name
    : "";
  const categoryNameId = productData?.category_id
    ? productData?.category_id?._id
    : "";

  const sub_categoryNameValue = productData?.sub_category_id
    ? productData?.sub_category_id?.sub_category_name
    : "";
  const sub_categoryNameId = productData?.sub_category_id
    ? productData?.sub_category_id?._id
    : "";

  const brandNameValue = productData?.brand_id
    ? productData?.brand_id?.brand_name
    : "";
  const brandNameId = productData?.brand_id ? productData?.brand_id?._id : "";

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
              defaultValue={productData?.product_name}
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
              defaultValue={{
                _id: categoryNameId,
                category_name: categoryNameValue,
              }}
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
            />
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
                  defaultValue={{
                    _id: sub_categoryNameId,
                    sub_category_name: sub_categoryNameValue,
                  }}
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
              defaultValue={{
                _id: brandNameId,
                brand_name: brandNameValue,
              }}
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

      {/* Product Price and variation */}
      {productInfoData?.is_variation === true ? (
        <UpdateProductVariationData
          variationData={productInfoData?.variationData}
          setProductInfoData={setProductInfoData}
          attributeDataToSubmit={attributeDataToSubmit}
          setAttributeDataToSubmit={setAttributeDataToSubmit}
          productData={productData}
        />
      ) : (
        <div>
          <UpdateProductInfoPrice
            productData={productData}
            register={register}
            errors={errors}
          />
        </div>
      )}
    </div>
  );
};

export default UpdateProductInfo;
