import { authorization, personalUserMenu } from "../../services/api/account.js";

const state = {
  currentUser: null,
  hasMenu: [],
  sessionToken: "",
  apps: [],
};

const mutations = {
  setCurrentUser(state, payload) {
    state.currentUser = payload;
  },
  setUserMenu(state, payload) {
    state.hasMenu = payload;
  },
  setSessionToken(state, payload) {
    state.sessionToken = payload;
  },
  setApps(state, payload) {
    state.apps = payload;
  },
};

const actions = {
  getInfoUserPersonal({ state, commit }) {
    return new Promise((resolve, reject) => {
      if (state.currentUser == null) {
        var checkPersonalUser = authorization();
        checkPersonalUser.then((r) => {
          if (r.data != undefined) {
            commit("setCurrentUser", r.data);
            commit("setSessionToken", r.data.user_session_token);
            commit("setApps", r.data.apps);
            resolve(true);
          } else {
            commit("setCurrentUser", null);
            commit("setUserMenu", []);
            commit("setSessionToken", "");
            commit("setApps", []);
            reject(true);
          }
        });
      } else {
        resolve(true);
      }
    });
  },

  destroyUserPersonal({ commit }) {
    commit("setCurrentUser", null);
    commit("setUserMenu", []);
    commit("setSessionToken", "");
    commit("setApps", []);
  },

  getMenuUser({ state, commit }) {
    return new Promise((resolve) => {
      if (state.hasMenu.length == 0) {
        var checkPersonalUser = personalUserMenu();
        checkPersonalUser.then((r) => {
          commit("setUserMenu", r.data);
          resolve(true);
        });
      } else {
        resolve(true);
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
