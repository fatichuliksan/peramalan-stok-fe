// import { personalUser } from './services/api/user'
import Vue from "vue";
import store from "../store/store.js";
import router from "../router.js";

export default (to, from, next) => {
  // if (to.name == "page-login") {
  //   if (store.state.user.currentUser != null) {
  //     return router.push("/");
  //   }
  // }

  // if (
  //   to.name != "page-login" &&
  //   to.name != "auth-callback" &&
  //   to.name != "page-privacy-police"
  // ) {
  //   const getInfoPersonal = store.dispatch("user/getInfoUserPersonal");
  //   getInfoPersonal
  //     .then(() => {
  //       Vue.prototype.$userLogin = store.state.user.currentUser;
  //       const hasMenu = store.dispatch("user/getMenuUser");
  //       hasMenu
  //         .then(() => {
  //           if (to.name == "dashboard") {
  //             return next();
  //           }
  //           if (to.name == "home") {
  //             return next();
  //           }
  //           if (to.name == "change-password") {
  //             return next();
  //           }
  //           if (to.name == "main") {
  //             return next({ path: "/home" });
  //           }
  //           if (to.meta.parent != "" && Object.keys(to.meta).length > 0) {
  //             const menu = store.state.user.hasMenu.filter(function (menu) {
  //               return menu.name == to.meta.parent;
  //             });
  //             if (menu.length < 1) {
  //               return next({ name: "page-error-404" });
  //             }
  //             const checkMenu = menu[0].submenu.filter(function (menu) {
  //               return menu.url == to.meta.url;
  //             });
  //             if (checkMenu.length < 1) {
  //               return next({ name: "page-error-404" });
  //             }
  //           } else {
  //             // var checkMenuParent = store.state.user.hasMenu.filter(function(menu) {
  //             //     return menu.url == to.meta.url;
  //             // });
  //             // if (checkMenuParent.length < 1 && to.meta.url != "/") {
  //             //     return next({name :"page-error-404"});
  //             // }
  //           }
  //           return next();
  //         })
  //         .catch(() => {
  //           return next({ path: "/pages/login" });
  //         });
  //     })
  //     .catch(() => {
  //       return next({ path: "/pages/login" });
  //     });
  // } else {
  //   return next();
  // }

  return next();
};
