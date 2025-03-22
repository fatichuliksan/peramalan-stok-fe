/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// import firebase from 'firebase/app'
// import 'firebase/auth'
import router from "@/router";
import api from "@/axios.js";
import Vue from "vue";

export default {
  loginAttempt({ dispatch }, payload) {
    // New payload for login action
    const newPayload = {
      userDetails: payload.userDetails,
      notify: payload.notify,
      closeAnimation: payload.closeAnimation,
    };
    dispatch("login", newPayload);
  },
  login({ state }, payload) {
    // If user is already logged in notify and exit
    if (state.isUserLoggedIn()) {
      // Close animation if passed as payload
      if (payload.closeAnimation) payload.closeAnimation();
      payload.notify({
        title: "Login Attempt",
        text: "You are already logged in!",
        iconPack: "feather",
        icon: "icon-alert-circle",
        color: "warning",
      });
      return false;
    }

    api
      .post("/api/account/v1/authentication", {
        authentication_id: payload.userDetails.email,
        authentication_type: "email",
        password: payload.userDetails.password,
      })
      .then(
        (result) => {
          if (payload.closeAnimation) {
            setTimeout(() => {
              payload.closeAnimation();
            }, 2000);
          }
          if (result.code == 200) {
            Vue.$cookies.config("7d", "/", "", false);
            Vue.$cookies.set("token", result.data.token);
            payload.notify({
              time: 3500,
              color: "success",
              title: "Login Berhasil",
              text: "",
              position: "top-right",
              iconPack: "feather",
              icon: "icon-check",
            });
            router.push("/");
          } else {
            payload.notify({
              time: 3500,
              title: "Error",
              text: result.message,
              position: "top-right",
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "danger",
            });
          }
          return false;
        },
        (error) => {
          // Close animation if passed as payload
          if (payload.closeAnimation) payload.closeAnimation();
          payload.notify({
            time: 2500,
            title: "Error",
            text: error.message,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
          return false;
        }
      );
    // Try to sigin
  },

  // registerUser({dispatch}, payload) {

  // },
  updateDataUser({ commit }, payload) {
    commit("UPDATE_USER", payload);
  },
  updateUsername({ commit }, payload) {
    payload.user
      .updateProfile({
        displayName: payload.displayName,
      })
      .then(() => {
        // If username update is success
        // update in localstorage
        let newUserData = Object.assign({}, payload.user.providerData[0]);
        newUserData.displayName = payload.displayName;
        commit("UPDATE_USER_INFO", newUserData, { root: true });

        // If reload is required to get fresh data after update
        // Reload current page
        if (payload.isReloadRequired) {
          router.push(router.currentRoute.query.to || "/");
        }
      })
      .catch((err) => {
        payload.notify({
          time: 8800,
          title: "Error",
          text: err.message,
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "danger",
        });
      });
  },
  // fetchAccessToken() {
  //   return new Promise((resolve) => {
  //     // jwt.refreshToken().then(response => { resolve(response) })
  //   })
  // }

  fetchCallback({ state }, { code, sourceAppId }) {
    api
      .post("/api/account/v1/auth/callback", {
        code: code,
        source_app_id: sourceAppId,
      })
      .then(
        (result) => {
          if (result.code == 200) {
            Vue.$cookies.config("7d", "/", "", false);
            Vue.$cookies.set("token", result.data.token);
            router.push("/");
          } else {
            // Vue.$cookies.set("token", null);
            // router.push("/");
          }
          return false;
        },
        (error) => {
          console.log(error);
          router.push("/");
          return false;
        }
      );
  },
};
