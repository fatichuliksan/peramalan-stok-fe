const state = {
  tab: 0,
  warehouse: [],
  date: {
    startDate: null,
    endDate: null,
  },
  shipmentNumber: null,
  driver: null,
  statusDelivery: null,
};

const mutations = {
  setTab(state, val) {
    console.log("tab", val);
    state.tab = val;
  },
  setWarehouse(state, val) {
    state.warehouse = val;
  },
  setDate(state, val) {
    state.date = val;
  },
  setShipmentNumber(state, val) {
    state.shipmentNumber = val;
  },
  setDriver(state, val) {
    state.driver = val;
  },
  setStatusDelivery(state, val) {
    state.statusDelivery = val;
  },
};

const actions = {
  updateTab({ commit }, val) {
    commit("setTab", val);
  },
  updateWarehouse({ commit }, val) {
    console.log("warehouse", val);
    commit("setWarehouse", val);
  },
  updateDate({ commit }, val) {
    commit("setDate", val);
  },
  updateShipmentNumber({ commit }, val) {
    commit("setShipmentNumber", val);
  },
  updateDriver({ commit }, val) {
    commit("setDriver", val);
  },
  updateStatusDelivery({ commit }, val) {
    commit("setStatusDelivery", val);
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
