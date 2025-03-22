/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import moduleAuth from "./auth/moduleAuth.js";

// per module
import user from "./modules/user";
import master from "./modules/master";
import outbound from "./modules/outbound";
import inbound from "./modules/inbound";
import purchaseOrder from "./modules/purchase-order";
import purchase from "./modules/purchase";
import logImport from "./modules/import-log";
import log from "./modules/log";
import setting from "./modules/setting";
import pod from "./modules/pod";

Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    user: user,
    master: master,
    outbound: outbound,
    inbound: inbound,
    purchaseOrder: purchaseOrder,
    auth: moduleAuth,
    purchase: purchase,
    logImport: logImport,
    log: log,
    setting: setting,
    pod: pod,
    // eCommerce: moduleECommerce,
  },
  strict: process.env.NODE_ENV !== "production",
});
