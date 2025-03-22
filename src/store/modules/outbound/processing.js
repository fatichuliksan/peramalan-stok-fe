
const state = {
    shipmentNumber: [{text: "All", value: 0}],
    handover: [{text: "All", value: 0, shipmentID: 0}],
    handoverDate: {
        startDate: Date.now(),
        endDate: Date.now(),
    },
    driver: "All"
}

const mutations = {
    setShipmentNumber(state, val) {
        state.shipmentNumber = val
    },
    setHandover(state, val) {
        state.handover = val
    },
    setHandoverDate(state, val) {
        state.handoverDate = val
    },
    setDriver(state, val) {
        state.driver = val
    },
}

const actions = {
    updateShipmentNumber({ commit }, val) {
        commit('setShipmentNumber', val)
    },
    updateHandover({ commit }, val) {
        commit('setHandover', val)
    },
    updateHandoverDate({ commit }, val) {
        commit('setHandoverDate', val)
    },
    updateDriver({ commit }, val) {
        commit('setDriver', val)
    },

}

const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
