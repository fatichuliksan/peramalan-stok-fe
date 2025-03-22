// axios
import axios from "axios";
import Vue from "vue";
import router from "@/router";

import moment from "moment-timezone";

const baseURL = process.env.VUE_APP_BASE_API;
const instance = axios.create({
  baseURL: baseURL,
});

// interceptors
instance.interceptors.request.use(
  (config) => {
    let token = Vue.$cookies.get("token");
    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers = Object.assign({}, headers, {
        Authorization: "Bearer " + token,
      });
    }

    config.timeout = 0;
    config.maxContentLength = -1;
    config.maxBodyLength = -1;
    config.headers = Object.assign({}, config.headers, headers);
    config.maxContentLength = Infinity;
    config.maxBodyLength = Infinity;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
instance.interceptors.response.use(
  function (response) {
    if (response.status == 200) {
      Vue.$cookies.set("hostname-api", response.data.hostname);
    }
    if (response.code == 500) {
      return router.push("/pages/error-500");
    }

    // if (response.data.status == 401) {
    //     alert(response.message)
    //     Vue.$cookies.remove("token");
    //     return router.push("/pages/login").catch(() => { })
    // }

    // if (response.data.status == 400) {
    //     Vue.$cookies.remove("token");
    //     return router.push("/pages/login").catch(() => { })
    // }
    return response.data;
  },
  function (error) {
    // if (typeof error.response == "undefined") {
    //   Vue.$cookies.remove("token");
    //   return router.push("/pages/login").catch(() => {});
    // }
    return error.response.data;
  }
);
export default instance;
