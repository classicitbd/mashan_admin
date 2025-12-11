const permissionsData = [
  {
    Name: "Dashboard Data Permission",
    Type: [
      {
        type_name: "Dashboard Show",
        type_value: "dashboard_show",
      },
    ],
  },
  {
    Name: "Category Data Permission",
    Type: [
      {
        type_name: "Category Show",
        type_value: "category_show",
      },
      {
        type_name: "Create Category",
        type_value: "category_post",
      },
      {
        type_name: "Update Category",
        type_value: "category_update",
      },
      {
        type_name: "Delete Category",
        type_value: "category_delete",
      },
    ],
  },
  {
    Name: "Sub Category Data Permission",
    Type: [
      {
        type_name: "Sub Category Create",
        type_value: "sub_category_post",
      },
      {
        type_name: "Sub Category Update",
        type_value: "sub_category_update",
      },
      {
        type_name: "Sub Category Show",
        type_value: "sub_category_show",
      },
      {
        type_name: "Sub Category Delete",
        type_value: "sub_category_delete",
      },
    ],
  },
  {
    Name: "Brand Category Data Permission",
    Type: [
      {
        type_name: "Brand Category Create",
        type_value: "brand_post",
      },
      {
        type_name: "Brand Category Update",
        type_value: "brand_update",
      },
      {
        type_name: "Brand Category Show",
        type_value: "brand_show",
      },
      {
        type_name: "Brand Category Delete",
        type_value: "brand_delete",
      },
    ],
  },

  {
    Name: "Attribute Data Permission",
    Type: [
      {
        type_name: "Attribute Create",
        type_value: "attribute_post",
      },
      {
        type_name: "Attribute Update",
        type_value: "attribute_update",
      },
      {
        type_name: "Attribute Show",
        type_value: "attribute_show",
      },
      {
        type_name: "Attribute Delete",
        type_value: "attribute_delete",
      },
    ],
  },

  {
    Name: "Product Data Permission",
    Type: [
      {
        type_name: "Product Create",
        type_value: "product_create",
      },
      {
        type_name: "Product Update",
        type_value: "product_update",
      },
      {
        type_name: "Product Show",
        type_value: "product_show",
      },
      {
        type_name: "Product Delete",
        type_value: "product_delete",
      },
    ],
  },
  {
    Name: "Banner Data Permission",
    Type: [
      {
        type_name: "Banner Create",
        type_value: "banner_create",
      },
      {
        type_name: "Banner Update",
        type_value: "banner_update",
      },
      {
        type_name: "Banner Show",
        type_value: "banner_show",
      },
      {
        type_name: "Banner Delete",
        type_value: "banner_delete",
      },
    ],
  },
  {
    Name: "Admin Data Permission",
    Type: [
      {
        type_name: "Admin Create",
        type_value: "admin_create",
      },
      {
        type_name: "Admin Update",
        type_value: "admin_update",
      },
      {
        type_name: "Admin Show",
        type_value: "admin_show",
      },
      {
        type_name: "Admin Delete",
        type_value: "admin_delete",
      },
    ],
  },

  {
    Name: "Role Data Permission",
    Type: [
      {
        type_name: "Role Create",
        type_value: "role_create",
      },
      {
        type_name: "Role Update",
        type_value: "role_update",
      },
      {
        type_name: "Role Show",
        type_value: "role_show",
      },
      {
        type_name: "Role Delete",
        type_value: "role_delete",
      },
    ],
  },

  {
    Name: "Offer Data Permission",
    Type: [
      {
        type_name: "Offer Create",
        type_value: "offer_create",
      },
      {
        type_name: "Offer Update",
        type_value: "offer_update",
      },
      {
        type_name: "Offer Show",
        type_value: "offer_show",
      },
      {
        type_name: "Offer Delete",
        type_value: "offer_delete",
      },
    ],
  },
  {
    Name: "Review Data Permission",
    Type: [
      {
        type_name: "Review Update",
        type_value: "review_update",
      },

      {
        type_name: "Review Show",
        type_value: "review_show",
      },
    ],
  },
  {
    Name: "Customer Data Permission",
    Type: [
      // {
      //   type_name: "Customer Create",
      //   type_value: "customer_create",
      // },
      {
        type_name: "Customer Update",
        type_value: "customer_update",
      },
      {
        type_name: "Customer Show",
        type_value: "customer_show",
      },
      // {
      //   type_name: "Customer Delete",
      //   type_value: "customer_delete",
      // },
    ],
  },
  {
    Name: "Site Setting Update",
    Type: [
      { type_name: " Update Site Setting", type_value: "site_setting_update" },
    ],
  },
  {
    Name: "Order Show And Update",
    Type: [
      {
        type_name: "Order Update",
        type_value: "order_update",
      },

      {
        type_name: "Order Show",
        type_value: "order_show",
      },
    ],
  },
  //   {
  //   Name: "Offer Order Show And Update",
  //   Type: [
  //     {
  //       type_name: "Offer Order Update",
  //       type_value: "offer_order_update",
  //     },

  //     {
  //       type_name: "Offer Order Show",
  //       type_value: "offer_order_show",
  //     },
  //   ],
  // },

  // {
  //   Name: "Campaign Create And Update",
  //   Type: [
  //     {
  //       type_name: "Campaign Create",
  //       type_value: "campaign_create",
  //     },
  //     {
  //       type_name: "Campaign Update",
  //       type_value: "campaign_update",
  //     },
  //     {
  //       type_name: "Campaign Show",
  //       type_value: "campaign_show",
  //     },
  //     {
  //       type_name: "Campaign Delete",
  //       type_value: "campaign_delete",
  //     },
  //   ],
  // },

  // {
  //   Name: "Question Show And Update",
  //   Type: [
  //     {
  //       type_name: "Question Update",
  //       type_value: "question_update",
  //     },

  //     {
  //       type_name: "Question Show",
  //       type_value: "question_show",
  //     },
  //   ],
  // },

  // {
  //   Name: "Coupon Create And Update",
  //   Type: [
  //     {
  //       type_name: "Coupon Create",
  //       type_value: "coupon_create",
  //     },
  //     {
  //       type_name: "Coupon Update",
  //       type_value: "coupon_update",
  //     },
  //     {
  //       type_name: "Coupon Show",
  //       type_value: "coupon_show",
  //     },
  //     {
  //       type_name: "Coupon Delete",
  //       type_value: "coupon_delete",
  //     },
  //   ],
  // },

  // {
  //   Name: "Slider Create And Update",
  //   Type: [
  //     {
  //       type_name: "Slider Create",
  //       type_value: "slider_create",
  //     },
  //     {
  //       type_name: "Slider Update",
  //       type_value: "slider_update",
  //     },
  //     {
  //       type_name: "Slider Show",
  //       type_value: "slider_show",
  //     },
  //     {
  //       type_name: "Slider Delete",
  //       type_value: "slider_delete",
  //     },
  //   ],
  // },
];

export default permissionsData;
