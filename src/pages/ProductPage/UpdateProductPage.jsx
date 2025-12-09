import { PiHouseBold } from "react-icons/pi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../utils/baseURL";
import { LoaderOverlay } from "../../common/loader/LoderOverley";
import { AuthContext } from "../../context/AuthProvider";
import { useForm } from "react-hook-form";
import UpdateProductInfo from "../../components/Product/UpdateProduct/UpdateProductInfo";
import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";
import UpdateProductImageDes from "../../components/Product/UpdateProduct/UpdateProductImageDes";
import { toast } from "react-toastify";

const ProductUpdatePage = () => {
  const [attributeDataToSubmit, setAttributeDataToSubmit] = useState([]);

  const { id } = useParams();

  const {
    data: productData,
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: [`/api/v1/product/dashboard/${id}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/product/dashboard/${id}`);
      const data = await res.json();
      return data?.data;
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const { user, loading: userLoading } = useContext(AuthContext);
  const [buttonLoading, setLoading] = useState(false);
  const [product_status, setProduct_status] = useState("active");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // product Information and variation data start here
  const [productInfoData, setProductInfoData] = useState({});
  const [category_id, setCategory_id] = useState(
    productData?.category_id ? productData?.category_id?._id : ""
  );
  const [sub_category_id, setSub_Category_id] = useState(
    productData?.sub_category_id ? productData?.sub_category_id?._id : ""
  );
  const [brand_id, setBrand_id] = useState(
    productData?.brand_id ? productData?.brand_id?._id : ""
  );

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [sizeChartPreview, setSizeChartPreview] = useState(
    productData?.size_chart || null
  );
  const [imagePreviews, setImagePreviews] = useState(
    productData?.other_images || []
  );
  const [description, setDescription] = useState("");
  //   set keyword
  const [keywords, setKeywords] = useState([]);
  const [trending_product, settrendingProduct] = useState(
    productData?.trending_product !== undefined
      ? productData?.trending_product
      : false
  );

  useEffect(() => {
    if (productData) {
      setProductInfoData({
        _id: productData?._id || null,
        product_name: productData?.product_name || "",
        product_slug: productData?.product_slug || "",
        category_id: productData?.category_id?._id || null,
        category_name: productData?.category_id?.category_name || "",
        sub_category_id: productData?.sub_category_id?._id || null,
        sub_category_name:
          productData?.sub_category_id?.sub_category_name || "",
        brand_id: productData?.brand_id?._id || null,
        brand_name: productData?.brand_id?.brand_name || "",
        is_variation: productData?.is_variation || false,
        product_price: productData?.product_price || 0,
        product_discount_price: productData?.product_discount_price || 0,
        product_buying_price: productData?.product_buying_price || 0,
        product_quantity: productData?.product_quantity || 0,
        // product_reseller_price: productData?.product_reseller_price || 0,
        // product_wholeseller_price: productData?.product_wholeseller_price || 0,
        // product_wholeseller_min_quantity:
        //   productData?.product_wholeseller_min_quantity || 0,
        variationData: productData?.variations || [],
      });
      setCategory_id(productData?.category_id?._id || "");
      setSub_Category_id(productData?.sub_category_id?._id || "");
      setBrand_id(productData?.brand_id?._id || "");
      setProduct_status(productData?.product_status || "active");
      if (productData?.description) {
        setDescription(productData.description);
      }
      setKeywords(productData?.meta_keywords || []);
      if (productData?.main_image) {
        setThumbnailPreview(productData?.main_image);
      } else {
        setThumbnailPreview(null);
      }
      if (productData?.size_chart) {
        setSizeChartPreview(productData?.size_chart);
      } else {
        setSizeChartPreview(null);
      }
      if (productData?.other_images && productData?.other_images.length > 0) {
        setImagePreviews(productData?.other_images);
      } else {
        setImagePreviews([]);
      }
      settrendingProduct(
        productData?.trending_product !== undefined
          ? productData?.trending_product
          : true
      );
    }
  }, [productData]);

  function validateProductData(data) {
    const { product_price, product_discount_price } = data;

    // Convert string values to numbers for comparison
    const price = parseFloat(product_price);
    const discountPrice = parseFloat(product_discount_price);

    // Validation checks
    if (price <= discountPrice) {
      toast.error("Product price must be greater than the discount price.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    // If all validations pass
    return null;
  }

  function validateVariationProductData(item, index) {
    const { variation_price, variation_discount_price } = item;

    // Convert string values to numbers for comparison
    const price = parseFloat(variation_price);
    const discountPrice = parseFloat(variation_discount_price);

    // Validation checks
    if (price <= discountPrice) {
      toast.error(
        `Product price must be greater than the discount price at serial no ${
          index + 1
        }.`,
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      return;
    }
    // If all validations pass
    return null;
  }

  const handleDataPost = async (data) => {
    setLoading(true);

    if (productData?.is_variation === true) {
      for (
        let index = 0;
        index < productInfoData?.variationData?.length;
        index++
      ) {
        const item = productInfoData.variationData[index];

        // Custom validation
        const validationError = validateVariationProductData(item, index);
        if (validationError !== null) {
          setLoading(false);
          return;
        }

        if (item.variation_buying_price < 0) {
          toast.error(
            `Variation Buying Price is required at serial no ${index + 1}`,
            {
              position: "top-center",
              autoClose: 2000,
            }
          );
          setLoading(false);
          return;
        }

        if (item.variation_discount_price < 0) {
          toast.error(
            `Variation Discount Price is required at serial no ${index + 1}`,
            {
              position: "top-center",
              autoClose: 2000,
            }
          );
          setLoading(false);
          return;
        }

        if (item.variation_price < 1) {
          toast.error(`Variation Price is required at serial no ${index + 1}`, {
            position: "top-center",
            autoClose: 2000,
          });
          setLoading(false);
          return;
        }

        if (item.variation_quantity < 0) {
          toast.error(
            `Variation Quantity is required at serial no ${index + 1}`,
            {
              position: "top-center",
              autoClose: 2000,
            }
          );
          setLoading(false);
          return;
        }

        // if (item.variation_reseller_price < 0) {
        //   toast.error(`Reseller Price is required at serial no ${index + 1}`, {
        //     position: "top-center",
        //     autoClose: 2000,
        //   });
        //   setLoading(false);
        //   return;
        // }

        // if (item.variation_wholeseller_price < 0) {
        //   toast.error(
        //     `Wholeseller Price is required at serial no ${index + 1}`,
        //     {
        //       position: "top-center",
        //       autoClose: 2000,
        //     }
        //   );
        //   setLoading(false);
        //   return;
        // }

        // if (item.variation_wholeseller_min_quantity < 0) {
        //   toast.error(
        //     `Wholeseller Min Quantity is required at serial no ${index + 1}`,
        //     {
        //       position: "top-center",
        //       autoClose: 2000,
        //     }
        //   );
        //   setLoading(false);
        //   return;
        // }
      }
    }

    const variationAndFilterData = {
      variations: [],
    };

    if (productData?.is_variation == true) {
      variationAndFilterData.variations = productInfoData?.variationData?.map(
        (item) => ({
          ...item,
        })
      );
    }

    if (productData?.is_variation == false) {
      const validationError = validateProductData(data);
      if (validationError !== null) {
        setLoading(false);
        return;
      }
    }

    if (!thumbnailPreview) {
      toast.error("Main image is required", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      return;
    }

    if (!description) {
      toast.error("Description is required", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("_id", productData?._id);
    formData.append("product_updated_by", user?._id);
    formData.append("trending_product", trending_product);
    formData.append("is_variation", productData?.is_variation || false);

    Object.entries(data).forEach(([key, value]) => {
      if (
        key === "main_image" ||
        key === "other_images" ||
        key === "size_chart"
      ) {
        // Skip appending for main_image and other_images
        return; // Using `return` in `forEach` acts like `continue` in traditional loops
      }

      // Append other data normally
      formData.append(key, value);
    });

    // Separate logic for handling "main_image" and "other_images" if needed
    if (
      data?.main_image &&
      (data?.main_image instanceof File ||
        (data?.main_image instanceof FileList && data?.main_image.length > 0))
    ) {
      formData.append(
        "main_image",
        data?.main_image instanceof FileList
          ? data?.main_image[0]
          : data?.main_image
      );
    }

    if (
      data?.size_chart &&
      (data?.size_chart instanceof File ||
        (data?.size_chart instanceof FileList && data?.size_chart.length > 0))
    ) {
      formData.append(
        "size_chart",
        data?.size_chart instanceof FileList
          ? data?.size_chart[0]
          : data?.size_chart
      );
    }

    if (data?.other_images && data?.other_images.length > 0) {
      data?.other_images?.forEach((file, index) => {
        formData.append(`other_images[${index}]`, file);
      });
    }

    if (imagePreviews?.length > 0) {
      imagePreviews?.forEach((file, index) => {
        formData.append(
          `other_default_images[other_image][${index}]`,
          file?.other_image
        );
        formData.append(
          `other_default_images[other_image_key][${index}]`,
          file?.other_image_key
        );
      });
    }

    formData.append("meta_keywords", JSON.stringify(keywords));
    formData.append("description", description);
    if (
      variationAndFilterData?.variations &&
      variationAndFilterData?.variations.length > 0
    ) {
      Object.entries(variationAndFilterData?.variations).forEach(
        ([index, value]) => {
          formData.append(`variations[${index}][_id]`, value?._id);
          formData.append(
            `variations[${index}][variation_name]`,
            value?.variation_name
          );
          formData.append(
            `variations[${index}][variation_price]`,
            value?.variation_price
          );
          formData.append(
            `variations[${index}][variation_discount_price]`,
            value?.variation_discount_price
          );
          formData.append(
            `variations[${index}][variation_quantity]`,
            value?.variation_quantity
          );
          formData.append(
            `variations[${index}][variation_buying_price]`,
            value?.variation_buying_price
          );
          // formData.append(
          //   `variations[${index}][variation_reseller_price]`,
          //   value?.variation_reseller_price
          // );
          // formData.append(
          //   `variations[${index}][variation_wholeseller_price]`,
          //   value?.variation_wholeseller_price
          // );
          // formData.append(
          //   `variations[${index}][variation_wholeseller_min_quantity]`,
          //   value?.variation_wholeseller_min_quantity
          // );
          // 1) jodi notun File select kora hoye thake
          if (value.variation_image instanceof File) {
            formData.append(
              `variations[${index}][variation_image]`,
              value.variation_image
            );
          }

          // 2) jodi purono image thake (URL + key), oitao pathao
          if (
            typeof value.variation_image === "string" &&
            value.variation_image_key
          ) {
            formData.append(
              `variations[${index}][variation_image]`,
              value.variation_image
            );
            formData.append(
              `variations[${index}][variation_image_key]`,
              value.variation_image_key
            );
          }
        }
      );
    }

    // --- ADD THIS BLOCK BEFORE formData.append("category_id", ...) ---
    // ✅ Send updated attributeDataToSubmit (not old productData)
    if (attributeDataToSubmit.length > 0) {
      attributeDataToSubmit.forEach((att, index) => {
        formData.append(
          `attributes_details[${index}][attribute_name]`,
          att?.attribute_name
        );
        att?.attribute_values?.forEach((value, valueIndex) => {
          formData.append(
            `attributes_details[${index}][attribute_values][${valueIndex}][attribute_value_name]`,
            value?.attribute_value_name
          );
          formData.append(
            `attributes_details[${index}][attribute_values][${valueIndex}][attribute_value_code]`,
            value?.attribute_value_code || ""
          );
        });
      });

      // Also send filter_values (for filters)
      const filterValues = attributeDataToSubmit.flatMap((att) =>
        att.attribute_values.map((v) => ({ filter_value_id: v._id }))
      );
      filterValues.forEach((fv, idx) => {
        formData.append(
          `filter_values[${idx}][filter_value_id]`,
          fv.filter_value_id
        );
      });
    }
    // --- END OF NEW BLOCK ---

    formData.append("category_id", productInfoData?.category_id);
    formData.append("sub_category_id", sub_category_id);
    formData.append("brand_id", brand_id);
    formData.append("product_status", product_status);

    // Remove keys with undefined values
    for (const [key, value] of formData.entries()) {
      if (
        value === "undefined" ||
        value === undefined ||
        value === null ||
        value === "" ||
        value === "null"
      ) {
        formData.delete(key);
      }
    }

    // console.log(Object.fromEntries(formData.entries()));
    // setLoading(false);

    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }
    // return;

    const response = await fetch(`${BASE_URL}/product`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    });
    const result = await response.json();
    if (result?.statusCode === 200 && result?.success === true) {
      toast.success(
        result?.message ? result?.message : "Product update successfully",
        {
          autoClose: 1000,
        }
      );
      setLoading(false);
      navigate("/product-list");
    } else {
      toast.error(result?.message || "Something went wrong", {
        autoClose: 1000,
      });
      setLoading(false);
    }
  };

  if (isLoading || userLoading) {
    return <LoaderOverlay />;
  }

  // console.log(productData);

  return (
    <>
      <form onSubmit={handleSubmit(handleDataPost)} className="mt-3 space-y-8">
        {productData && productInfoData && (
          <>
            <UpdateProductInfo
              productInfoData={productInfoData}
              setProductInfoData={setProductInfoData}
              register={register}
              errors={errors}
              setSub_Category_id={setSub_Category_id}
              setBrand_id={setBrand_id}
              category_id={category_id}
              setCategory_id={setCategory_id}
              productData={productData}
              attributeDataToSubmit={attributeDataToSubmit}
              setAttributeDataToSubmit={setAttributeDataToSubmit}
              JCBASDNC
            />
            <UpdateProductImageDes
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              thumbnailPreview={thumbnailPreview}
              setThumbnailPreview={setThumbnailPreview}
              description={description}
              setDescription={setDescription}
              setKeywords={setKeywords}
              keywords={keywords}
              product_status={product_status}
              setProduct_status={setProduct_status}
              productData={productData}
              sizeChartPreview={sizeChartPreview}
              setSizeChartPreview={setSizeChartPreview}
              imagePreviews={imagePreviews}
              setImagePreviews={setImagePreviews}
              trending_product={trending_product}
              settrendingProduct={settrendingProduct}
            />

            <div className="grid place-content-end ">
              {buttonLoading ? (
                <MiniSpinner />
              ) : (
                <button
                  type="submit"
                  className="rounded-[8px] py-[10px] px-[14px] bg-btnBgColor hover:bg-btnHoverColor transform hover:translate-y-[2px] transition duration-200 text-btnTextColor text-sm cursor-pointer uppercase"
                >
                  Update
                </button>
              )}
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default ProductUpdatePage;
