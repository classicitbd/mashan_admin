import { useState, useRef } from "react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { MdCancel } from "react-icons/md";
import { RiImageAddLine, RiVideoAddLine } from "react-icons/ri";
import { PiImagesThin } from "react-icons/pi";
import Select from "react-select";

const AddProductImageDes = ({
  register,
  errors,
  watch,
  setValue,
  thumbnailPreview,
  setThumbnailPreview,
  description,
  setDescription,
  setKeywords,
  keywords,
  setProduct_status,
  product_status,
  settrendingProduct,
}) => {
  const productStatusOptions = [
    { value: "active", label: "Active" },
    { value: "in-active", label: "In-Active" },
  ];

  const fileInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  // const sizechartInputRef = useRef(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  // const [sizeChartPreview, setSizeChartPreview] = useState("");

  const watchImages = watch("other_images");

  // const handleSizeChartChange = (e) => {
  //   const file = e.target.files?.[0]; // Safe check for file existence
  //   if (file) {
  //     setSizeChartPreview(URL.createObjectURL(file));
  //     setValue("size_chart", file); // Update React Hook Form value
  //   }
  // };

  // const removeSizeChart = () => {
  //   setSizeChartPreview(null);
  //   setValue("size_chart", null); // Reset React Hook Form value
  //   if (sizechartInputRef.current) {
  //     sizechartInputRef.current.value = ""; // Reset input field
  //   }
  // };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0]; // Safe check for file existence
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
      setValue("main_image", file); // Update React Hook Form value
    }
  };

  const removeThumbnail = () => {
    setThumbnailPreview(null);
    setValue("main_image", null); // Reset React Hook Form value
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = ""; // Reset input field
    }
  };

  // Handle file input change to show image preview
  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files.length) {
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews([...imagePreviews, ...previews]);

      const currentFiles = watchImages ? Array.from(watchImages) : [];
      setValue("other_images", [...currentFiles, ...files]);
      event.target.value = null;
    }
  };

  // Remove selected image preview
  const removeImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1); // Remove the image preview

    setImagePreviews(updatedPreviews);

    const updatedFiles = Array.from(watchImages);
    updatedFiles.splice(index, 1); // Remove the file itself
    setValue("other_images", updatedFiles.length ? updatedFiles : null); // Update the input field or reset
  };

  const [inputKeyword, setInputKeyword] = useState("");

  //   add keyword
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newKeyword = inputKeyword.trim();
      if (newKeyword !== "") {
        setKeywords([...keywords, { keyword: newKeyword }]);
        setInputKeyword(""); // Clear the input field
      }
    }
  };
  // remove keyword
  const removeKeyword = (keywordToRemove) => {
    const updatedKeywords = keywords.filter(
      (keyword) => keyword?.keyword !== keywordToRemove
    );
    setKeywords(updatedKeywords);
  };
  //handle keyword
  const handleKeywordChange = (e) => {
    setInputKeyword(e.target.value);
  };

  return (
    <div>
      {/* Product Description Section */}
      <section className=" shadow-md bg-gray-50 rounded-lg p-4 sm:p-8 md:p-12">
        <h1 className="sm:text-3xl text-xl mb-6 font-semibold text-textColor">
          Product Other Information
        </h1>

        {/* Product Description */}
        <div className="mt-4">
          <label
            htmlFor="product_description"
            className="font-medium text-gray-800"
          >
            Product Description
          </label>
          <ReactQuill
            className="mt-2"
            id="product_description"
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder="Enter Product Description"
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="my-6">
          <h2 className="text-lg text-gray-700 font-semibold">
            Thumbnail Image
          </h2>
          <div className="border-dashed border my-3 bg-white border-blue-400 rounded-lg  text-center">
            {thumbnailPreview ? (
              <div className="relative inline-block my-2 ">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="w-48 h-48 object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full "
                  onClick={removeThumbnail}
                >
                  <MdCancel size={20} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer p-6">
                <RiImageAddLine className="text-7xl text-gray-400" />

                <span className="text-gray-500">Upload Thumbnail</span>
                <input
                  type="file"
                  accept="image/*"
                  ref={thumbnailInputRef}
                  className="hidden"
                  {...register("main_image")}
                  onChange={handleThumbnailChange}
                />
                <p className="text-gray-400 text-sm">
                  Upload Product Thumbnil Image (JPG, PNG, WEBP)
                </p>
              </label>
            )}
            {errors.main_image && (
              <p className="text-red-600 text-xs">
                {errors.main_image.message}
              </p>
            )}
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="my-10">
          <h2 className="text-lg text-gray-700 mb-4 font-semibold">
            Aditional Images
          </h2>
          {imagePreviews.length > 0 ? (
            <>
              <div className="border-dashed border-2 border-blue-400 rounded-lg p-4 text-center">
                <div className="flex flex-wrap gap-4 justify-center">
                  {/* Display Image Previews */}
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`preview-${index}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <MdCancel />
                      </button>
                    </div>
                  ))}

                  {/* Image Upload Box */}
                  <label
                    htmlFor="image_upload"
                    className="w-24 h-24 flex items-center justify-center cursor-pointer bg-white border-dashed border border-blue-400 text-gray-500 rounded-md"
                  >
                    <span className="text-2xl font-semibold">+</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="image_upload"
                      multiple
                      accept="image/*"
                      className="hidden"
                      {...register("other_images", {
                        validate: {
                          isImage: (files) =>
                            Array.from(files).every((file) =>
                              [
                                "image/jpg",
                                "image/jpeg",
                                "image/png",
                                "image/webp",
                                "image/gif",
                                "image/JPG",
                                "image/JPEG",
                                "image/PNG",
                                "image/WEBP",
                                "image/GIF",
                              ].includes(file.type)
                            ) || "Only image files are allowed",
                        },
                      })}
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  Upload 300×300 pixel images in PNG, JPG, or WebP format (max 1
                  MB)
                </p>
              </div>
            </>
          ) : (
            <>
              <div className=" text-center">
                <div className="flex flex-wrap gap-4 justify-center my-3">
                  {/* Display Image Previews */}
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative  border shadow">
                      <img
                        src={preview}
                        alt={`preview-${index}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <MdCancel />
                      </button>
                    </div>
                  ))}

                  {/* Image Upload Box */}
                  <label
                    htmlFor="image_upload"
                    className="w-full p-10 flex flex-col  items-center justify-center cursor-pointer bg-white border-dashed border border-blue-400 text-gray-500 rounded-md"
                  >
                    <PiImagesThin className="text-7xl" />

                    <input
                      ref={fileInputRef}
                      type="file"
                      id="image_upload"
                      multiple
                      accept="image/*"
                      className="hidden"
                      {...register("other_images", {
                        validate: {
                          isImage: (files) =>
                            Array.from(files).every((file) =>
                              [
                                "image/jpg",
                                "image/jpeg",
                                "image/png",
                                "image/webp",
                                "image/gif",
                                "image/JPG",
                                "image/JPEG",
                                "image/PNG",
                                "image/WEBP",
                                "image/GIF",
                              ].includes(file.type)
                            ) || "Only image files are allowed",
                        },
                      })}
                      onChange={handleImageChange}
                    />
                    <p className="text-gray-400 mt-2 text-sm">
                      Upload 300×300 pixel images in PNG, JPG, or WebP format
                    </p>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Thumbnail Upload */}
        {/* <div className="my-6">
          <h2 className="text-lg text-gray-700 font-semibold">Size Chart</h2>
          <div className="border-dashed border my-3 bg-white border-blue-400 rounded-lg  text-center">
            {sizeChartPreview ? (
              <div className="relative inline-block my-2 ">
                <img
                  src={sizeChartPreview}
                  alt="Size Chart Preview"
                  className="w-48 h-48 object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full "
                  onClick={removeSizeChart}
                >
                  <MdCancel size={20} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer p-6">
                <RiImageAddLine className="text-7xl text-gray-400" />

                <span className="text-gray-500">Upload Size Chart</span>
                <input
                  type="file"
                  accept="image/*"
                  ref={sizechartInputRef}
                  className="hidden"
                  {...register("size_chart")}
                  onChange={handleSizeChartChange}
                />
                <p className="text-gray-400 text-sm">
                  Upload Product Thumbnil Image (JPG, PNG, WEBP)
                </p>
              </label>
            )}
            {errors.size_chart && (
              <p className="text-red-600 text-xs">
                {errors.size_chart.message}
              </p>
            )}
          </div>
        </div> */}

        {/* Product Video */}
        <div className="">
          <label htmlFor="main_video_link" className="font-medium">
            Product Video URL
          </label>
          <input
            {...register("main_video_link")}
            id="main_video_link"
            type="text"
            placeholder="Enter Product Video URL"
            className="block w-full p-2.5 text-gray-800 outline-primaryColor bg-white border border-gray-300 rounded-lg mt-2"
          />
        </div>

        {/* Image section end */}
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mt-4">
          {/* Trending Product */}
          <div className=" space-y-2 mt-4">
            <label htmlFor="trending_product" className="font-medium">
              Trending Product
            </label>
            <Select
              id="trending_product"
              name="trending_product"
              placeholder="-Select Trending Product-"
              defaultValue={{ value: false, label: "No" }}
              options={[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
              aria-label="Select Trending Product"
              onChange={(selectedOption) =>
                settrendingProduct(selectedOption?.value)
              }
            ></Select>
          </div>
          {/* Product Warrenty */}
          <div className="">
            <label htmlFor="product_warrenty" className="font-medium">
              Product Warrenty
            </label>
            <input
              // defaultValue={stepOneDefaultdata?.product_warrenty}
              {...register("product_warrenty")}
              id="product_warrenty"
              type="text"
              placeholder="Enter Warrenty"
              className="block w-full p-2.5 outline-primaryColor text-gray-800 bg-white border border-gray-300 rounded-lg mt-2"
            />
          </div>
          {/* Product Return */}
          <div className="">
            <label htmlFor="product_return" className="font-medium">
              Product Return Policy
            </label>
            <input
              {...register("product_return")}
              id="product_return"
              type="text"
              placeholder="Enter Return Policy"
              className="block w-full p-2.5 outline-primaryColor text-gray-800 bg-white border border-gray-300 rounded-lg mt-2"
            />
          </div>
          {/* unit */}
          <div className="">
            <label htmlFor="unit" className="font-medium">
              Unit
            </label>
            <input
              {...register("unit")}
              id="unit"
              placeholder="Enter Unit Like Pc, Box, kg, Lit etc."
              type="text"
              className="block w-full p-2.5 outline-primaryColor text-gray-800 bg-white border border-gray-300 rounded-lg mt-2"
            />
          </div>
          {/* Supplier Name */}
          {/* <div className=" space-y-2">
              <label htmlFor="supplier_name" className="font-medium">
                Supplier Name
              </label>

              <Select
                id="supplier_id"
                name="supplier_id"
                isClearable
                aria-label="Select a Category"
                options={suppliers?.data}
                getOptionLabel={(x) => x?.supplier_name}
                getOptionValue={(x) => x?._id}
                onChange={(selectedOption) =>
                  setProduct_supplier_id(selectedOption?._id)
                }
              ></Select>
            </div> */}
        </div>

        {/* meta */}
        <div className="mt-8">
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="fname" className="text-base font-medium">
              Meta Keyword
            </label>
            {keywords?.length > 0 && (
              <div className="flex flex-wrap gap-1 bg-white mb-3 rounded-lg py-1 min-h-[50px] items-center">
                {keywords?.map((keyword, index) => (
                  <div
                    key={index}
                    className="bg-gray-300 text-black py-1 px-2 mx-1 rounded-full flex item-center justify-center h-auto"
                  >
                    <span>{keyword?.keyword}</span>
                    <div
                      className="ml-2 w-6 h-6 cursor-pointer bg-gray-400 rounded-full px-2 flex item-center justify-center"
                      onClick={() => removeKeyword(keyword?.keyword)}
                    >
                      X
                    </div>
                  </div>
                ))}
              </div>
            )}
            <input
              type="text"
              className="bg-bgray-50 border border-gray-300 p-4 rounded-lg h-14 focus:border focus:border-success-300 focus:ring-0"
              name="fname"
              value={inputKeyword}
              onChange={handleKeywordChange}
              onKeyDown={handleKeyPress}
              placeholder="After giving keyword press enter to add keyword"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="meta_title" className="font-medium">
              Meta Title
            </label>
            <input
              {...register("meta_title")}
              id="meta_title"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="meta_description" className="font-medium">
              Meta Description
            </label>
            <textarea
              cols={5}
              {...register("meta_description")}
              id="meta_description"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          {/* Product Status */}
          <div className=" space-y-2 mt-4">
            <label htmlFor="product_status" className="font-medium">
              Product Status
            </label>

            <Select
              id="product_status"
              name="product_status"
              isClearable
              isSearchable
              placeholder="-Select Product Status-"
              required
              aria-label="Select a Status"
              options={productStatusOptions}
              value={
                productStatusOptions.find(
                  (opt) => opt.value === product_status
                ) || null
              }
              getOptionLabel={(x) => x?.label}
              getOptionValue={(x) => x?.value}
              onChange={(selectedOption) => {
                setProduct_status(selectedOption?.value || "");
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddProductImageDes;
