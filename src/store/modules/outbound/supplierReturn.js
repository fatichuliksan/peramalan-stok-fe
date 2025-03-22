
const state = {
    baseUrlPath: 'api/wms/v1/wms/outbound/supplier-return',
    baseRouterName: 'outbound.supplier-return',
    id: null,
    sr: null,
    supplier: null,
    date: {
        startDate: null,
        endDate: null,
    },
}

const mutations = {
    setId(state, val) {
        state.id = val
    },
    setSr(state, val) {
        state.sr = val
    },
    setSupplier(state, val) {
        state.supplier = val
    },
    setDate(state, val) {
        state.date = val
    },

}

const actions = {
    updateId({ commit }, val) {
        commit('setId', val)
    },
    updateSr({ commit }, val) {
        console.log("setSr", val)
        commit("setSr", val)
    },
    updateSupplier({ commit }, val) {
        console.log("setSupplier", val)
        commit("setSupplier", val)
    },
    updateDate({ commit }, val) {
        console.log("setDate", val)
        commit("setDate", val)
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
