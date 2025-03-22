/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from "vue";
import Router from "vue-router";
// import axios from "./axios.js";
// import routerGuard from "./router/routerGuard";
import RouteViewComponent from "./router/routerView";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      component: () => import("./layouts/main/Main.vue"),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: "/",
          name: "main",
          meta: { url: "/", parent: "" },
          // redirect: "/pages/login"
          component: () => import("./views/pages/Main.vue"),
        },

        {
          path: "/home",
          name: "home",
          component: () => import("./views/pages/Main.vue"),
        },
        {
          path: "history",
          component: () => import("./views/history/index.vue"),
          children: [
            {
              path: "sales-order",
              component: () => import("./views/history/index.vue"),
              children: [
                {
                  path: "",
                  name: "history-sales-order",
                  component: () =>
                    import("./views/history/sales-order/index.vue"),
                },
              ],
            },
            {
              path: "sales-order-monthly",
              component: () => import("./views/history/index.vue"),
              children: [
                {
                  path: "",
                  name: "history-sales-order-monthly",
                  component: () =>
                    import("./views/history/sales-order-monthly/index.vue"),
                },
              ],
            },
          ],
        },
        {
          path: "forcasting",
          component: () => import("./views/forcasting/index.vue"),
          children: [
            {
              path: "generate",
              component: () => import("./views/forcasting/index.vue"),
              children: [
                {
                  path: "",
                  name: "forcasting-generate",
                  component: () =>
                    import("./views/forcasting/generate/index.vue"),
                },
              ],
            },
            {
              path: "history",
              component: () => import("./views/history/index.vue"),
              children: [
                {
                  path: "",
                  name: "forcasting-history",
                  component: () =>
                    import("./views/forcasting/history/index.vue"),
                },
              ],
            },
          ],
        },
      ],
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: "/pages/login",
          name: "page-login",
          component: () => import("@/views/pages/Login.vue"),
        },
        {
          path: "/pages/error-404",
          name: "page-error-404",
          component: () => import("@/views/pages/Error404.vue"),
        },
      ],
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/pages/error-404",
    },
  ],
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});
// router.beforeEach(routerGuard);
export default router;
