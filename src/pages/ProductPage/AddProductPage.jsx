import { useContext, useState } from "react";
import AddProductInfo from "../../components/Product/AddProduct/AddProductInfo";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import AddProductImageDes from "../../components/Product/AddProduct/AddProductImageDes";
import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";
import { BASE_URL } from "../../utils/baseURL";

const AddProductPage = () => {
  const { user, loading } = useContext(AuthContext);
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
  // State to store the data prepared for submission
  const [attributeDataToSubmit, setAttributeDataToSubmit] = useState([]);
  // Set product variation data
  const [variationTableData, setVariationTableData] = useState([]);
  const [sub_category_id, setSub_Category_id] = useState(
    productInfoData?.sub_category_id ? productInfoData?.sub_category_id : ""
  );
  const [brand_id, setBrand_id] = useState(
    productInfoData?.brand_id ? productInfoData?.brand_id : ""
  );
  // set show product variation status
  const [showProductVariation, setShowProductVariation] = useState(
    productInfoData?.showProductVariation
      ? productInfoData?.showProductVariation
      : false
  );
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [description, setDescription] = useState("");
  //   set keyword
  const [keywords, setKeywords] = useState([]);
  const [trending_product, settrendingProduct] = useState(false);

  // product Information and variation data end here

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

    // if (!item.variation_image) {
    //   toast.error(`Variation image required at serial ${index + 1}`);
    //   setLoading(false);
    //   return;
    // }

    if (!item.variation_name || item.variation_name.trim() === "") {
      toast.error(`Variation name missing at serial ${index + 1}`);
      setLoading(false);
      return;
    }

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
    let variationValidateError = false;

    if (showProductVariation == true) {
      // Validate each item in variationTableData
      variationTableData?.forEach((item, index) => {
        const validationError = validateVariationProductData(item, index);
        if (validationError !== null) {
          variationValidateError = true;
          return;
        }

        if (item.variation_buying_price < 0) {
          toast.error(
            `Variation Buying Price is required at serial no ${index + 1}`,
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
          setLoading(false);
          return;
        }
        if (item.variation_discount_price < 0) {
          toast.error(
            `Variation Discount Price is required at serial no ${index + 1}`,
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
          setLoading(false);
          return;
        }
        if (item.variation_price < 1) {
          toast.error(
            `Variation Price  is required at serial no ${index + 1}`,
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
          setLoading(false);
          return;
        }
        if (item.variation_quantity < 0) {
          toast.error(
            `Variation Quantity is required at serial no ${index + 1}`,
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
          setLoading(false);
          return;
        }
        // if (item.variation_reseller_price < 0) {
        //   toast.error(`Reseller Price is required at serial no ${index + 1}`, {
        //     position: "top-center",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
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
        //       hideProgressBar: false,
        //       closeOnClick: true,
        //       pauseOnHover: true,
        //       draggable: true,
        //       progress: undefined,
        //       theme: "light",
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
        //       hideProgressBar: false,
        //       closeOnClick: true,
        //       pauseOnHover: true,
        //       draggable: true,
        //       progress: undefined,
        //       theme: "light",
        //     }
        //   );
        //   setLoading(false);
        //   return;
        // }
      });

      if (variationValidateError) {
        setLoading(false);
        return;
      }
    }

    const variationAndFilterData = {
      filter_values: attributeDataToSubmit?.flatMap((item) =>
        item?.attribute_values?.map((v) => ({
          filter_value_id: v?._id,
        }))
      ),
    };

    if (showProductVariation == true) {
      (variationAndFilterData.variations = variationTableData?.map((item) => ({
        ...item,
      }))),
        (variationAndFilterData.attributes_details = attributeDataToSubmit?.map(
          (item) => ({
            attribute_name: item?.attribute_name,
            attribute_values: item?.attribute_values?.map((att_val) => ({
              attribute_value_name: att_val?.attribute_value_name,
              attribute_value_code: att_val?.attribute_value_code,
            })),
          })
        ));
    }
    if (showProductVariation == false) {
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
    if (data?.main_image) {
      formData.append("main_image", data?.main_image);
    }
    if (data?.size_chart) {
      formData.append("size_chart", data?.size_chart);
    }

    if (data?.other_images && data?.other_images.length > 0) {
      data.other_images.forEach((file, index) => {
        formData.append(`other_images[${index}]`, file);
      });
    }
    formData.append("meta_keywords", JSON.stringify(keywords));
    formData.append("description", description);
    formData.append("trending_product", trending_product);

    if (
      variationAndFilterData?.attributes_details &&
      variationAndFilterData?.attributes_details.length > 0
    ) {
      variationAndFilterData?.attributes_details?.forEach((att, index) => {
        // Append the main specification ID
        formData.append(
          `attributes_details[${index}][attribute_name]`,
          att?.attribute_name
        );

        // Append each specification value's ID
        att?.attribute_values.forEach((value, valueIndex) => {
          formData.append(
            `attributes_details[${index}][attribute_values][${valueIndex}][attribute_value_name]`,
            value?.attribute_value_name
          );
          formData.append(
            `attributes_details[${index}][attribute_values][${valueIndex}][attribute_value_code]`,
            value?.attribute_value_code
          );
        });
      });
    }

    if (
      variationAndFilterData?.variations &&
      variationAndFilterData?.variations.length > 0
    ) {
      Object.entries(variationAndFilterData?.variations).forEach(
        ([index, value]) => {
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
          // ✅ variation image
          if (value?.variation_image) {
            formData.append(
              `variations[${index}][variation_image]`,
              value.variation_image
            );
          }
        }
      );
    }

    if (
      variationAndFilterData?.filter_values &&
      variationAndFilterData?.filter_values.length > 0
    ) {
      variationAndFilterData?.filter_values?.forEach((att, index) => {
        // Append the main specification ID
        formData.append(
          `filter_values[${index}][filter_value_id]`,
          att?.filter_value_id
        );
      });
    }

    formData.append("is_variation", showProductVariation);
    formData.append("category_id", productInfoData?.category_id);
    formData.append("sub_category_id", sub_category_id);
    formData.append("brand_id", brand_id);
    formData.append("product_status", product_status);
    formData.append("product_publisher_id", user?._id);

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
    // return;

    const response = await fetch(`${BASE_URL}/product`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const result = await response.json();
    if (result?.statusCode === 200 && result?.success === true) {
      toast.success(
        result?.message ? result?.message : "Product created successfully",
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

  if (loading) {
    return <LoaderOverlay />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleDataPost)} className="mt-3 space-y-8">
        <AddProductInfo
          productInfoData={productInfoData}
          setProductInfoData={setProductInfoData}
          register={register}
          errors={errors}
          setSub_Category_id={setSub_Category_id}
          setBrand_id={setBrand_id}
          attributeDataToSubmit={attributeDataToSubmit}
          setAttributeDataToSubmit={setAttributeDataToSubmit}
          setShowProductVariation={setShowProductVariation}
          showProductVariation={showProductVariation}
          variationTableData={variationTableData}
          setVariationTableData={setVariationTableData}
          setValue={setValue}
          watch={watch}
        />

        <AddProductImageDes
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
          settrendingProduct={settrendingProduct}
        />

        <div className="grid place-content-end ">
          {buttonLoading ? (
            <MiniSpinner />
          ) : (
            <button
              type="submit"
              className=" bg-primaryColor text-white text-lg  py-2.5 px-6 font-semibold  rounded-lg  text-center cursor-pointer"
            >
              Publish
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
