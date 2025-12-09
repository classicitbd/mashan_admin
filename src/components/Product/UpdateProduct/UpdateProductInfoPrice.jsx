const UpdateProductInfoPrice = ({ productData, register, errors }) => {
  return (
    <section className=" shadow-md bg-gray-50 rounded-lg p-4 sm:p-8 md:p-12 mt-4">
      <h1 className=" text-xl sm:text-2xl md:text-3xl mb-6 font-semibold text-textColor">
        Product Price
      </h1>
      {/* Product all field  */}
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
        {/* Product Price */}
        <div className="">
          <label htmlFor="product_price" className="font-medium">
            Product Price<span className="text-red-500">*</span>
          </label>
          <input
            defaultValue={productData?.product_price}
            {...register("product_price", {
              required: "Product Price is required",
            })}
            id="product_price"
            type="number"
            onWheel={(e) => e.target.blur()}
            placeholder="Enter Product Price"
            className="block w-full p-2.5 text-gray-800 outline-primaryColor bg-white border border-gray-300 rounded-lg mt-2"
            min={1}
          />
          {errors.product_price && (
            <p className="text-red-600">{errors.product_price?.message}</p>
          )}
        </div>

        {/* Product Discount Price */}
        <div className="">
          <label htmlFor="product_discount_price" className="font-medium">
            After Discount Price <small>(Leave blank if not available.)</small>
          </label>
          <input
            defaultValue={productData?.product_discount_price}
            {...register("product_discount_price")}
            id="product_discount_price"
            type="number"
            onWheel={(e) => e.target.blur()}
            placeholder="Enter Product Discount Price"
            className="block w-full p-2.5 outline-primaryColor text-gray-800 bg-white border border-gray-300 rounded-lg mt-2"
            min={0}
          />
        </div>

        {/* Product Buying Price */}
        <div className="">
          <label htmlFor="product_buying_price" className="font-medium">
            Product Buying Price<span className="text-red-500">*</span>
          </label>
          <input
            defaultValue={productData?.product_buying_price}
            {...register("product_buying_price", {
              required: "Product Buying Price is required",
            })}
            id="product_buying_price"
            type="number"
            onWheel={(e) => e.target.blur()}
            placeholder="Enter Product Buying Price"
            className="block w-full p-2.5 text-gray-800 outline-primaryColor bg-white border border-gray-300 rounded-lg mt-2"
            min={0}
          />
          {errors.product_buying_price && (
            <p className="text-red-600">
              {errors.product_buying_price?.message}
            </p>
          )}
        </div>

        {/* Product Quantity */}
        <div className="">
          <label htmlFor="product_quantity" className="font-medium">
            Product Quantity<span className="text-red-500">*</span>
          </label>
          <input
            defaultValue={productData?.product_quantity}
            {...register("product_quantity", {
              required: "Product Quantity is required",
            })}
            id="product_quantity"
            type="number"
            onWheel={(e) => e.target.blur()}
            placeholder="Enter Product Quantity"
            className="block w-full p-2.5 text-gray-800 outline-primaryColor bg-white border border-gray-300 rounded-lg mt-2"
            min={0}
          />
          {errors.product_quantity && (
            <p className="text-red-600">{errors.product_quantity?.message}</p>
          )}
        </div>

        {/* Reseller Price */}
        {/* <div className="">
          <label htmlFor="product_reseller_price" className="font-medium">
            Reseller Price<span className="text-red-500">*</span>
          </label>
          <input
            defaultValue={productData?.product_reseller_price}
            {...register("product_reseller_price", {
              required: "Reseller Price is required",
            })}
            id="product_reseller_price"
            type="number" onWheel={(e) => e.target.blur()}
            placeholder="Enter Reseller Price"
            className="block w-full p-2.5 text-gray-800 outline-primaryColor bg-white border border-gray-300 rounded-lg mt-2"
            min={0}
          />
          {errors.product_reseller_price && (
            <p className="text-red-600">{errors.product_reseller_price?.message}</p>
          )}
        </div> */}

        {/* Wholeseller Price */}
        {/* <div className="">
          <label htmlFor="product_wholeseller_price" className="font-medium">
            Wholeseller Price<span className="text-red-500">*</span>
          </label>
          <input
            defaultValue={productData?.product_wholeseller_price}
            {...register("product_wholeseller_price", {
              required: "Wholeseller Price is required",
            })}
            id="product_wholeseller_price"
            type="number" onWheel={(e) => e.target.blur()}
            placeholder="Enter Wholeseller Price"
            className="block w-full p-2.5 text-gray-800 outline-primaryColor bg-white border border-gray-300 rounded-lg mt-2"
            min={0}
          />
          {errors.product_wholeseller_price && (
            <p className="text-red-600">{errors.product_wholeseller_price?.message}</p>
          )}
        </div> */}

        {/* Wholeseller Min Quantity */}
        {/* <div className="">
          <label
            htmlFor="product_wholeseller_min_quantity"
            className="font-medium"
          >
            Wholeseller Min Quantity<span className="text-red-500">*</span>
          </label>
          <input
            defaultValue={productData?.product_wholeseller_min_quantity}
            {...register("product_wholeseller_min_quantity", {
              required: "Wholeseller Min Quantity is required",
            })}
            id="product_wholeseller_min_quantity"
            type="number" onWheel={(e) => e.target.blur()}
            placeholder="Enter Wholeseller Min Quantity"
            className="block w-full p-2.5 text-gray-800 outline-primaryColor bg-white border border-gray-300 rounded-lg mt-2"
            min={1}
          />
          {errors.product_wholeseller_min_quantity && (
            <p className="text-red-600">
              {errors.product_wholeseller_min_quantity?.message}
            </p>
          )}
        </div> */}
      </div>
    </section>
  );
};

export default UpdateProductInfoPrice;
