/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default [
  {
    url: null,
    name: "History",
    slug: "history",
    icon: "",
    submenu: [
      {
        url: "/history/sales-order",
        name: "Sales Order",
        slug: "history_sales_order",
      },
      {
        url: "/history/sales-order-monthly",
        name: "Sales Order Monthly",
        slug: "history_sales_order_monthly",
      },
    ],
  },
  {
    url: null,
    name: "Forcasting",
    slug: "forcasting",
    icon: "",
    submenu: [
      {
        url: "/forcasting/generate",
        name: "Generate",
        slug: "forcasting_generate",
      },
      {
        url: "/forcasting/history",
        name: "History",
        slug: "forcasting_history",
      },
    ],
  },
];
