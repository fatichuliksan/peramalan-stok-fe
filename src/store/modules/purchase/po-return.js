
const state = {
    baseUrlPath: '/api/wms/v1/wms/purchase/po-return',
    baseRouterName: 'purchase.po-return',
    id: null,
    supplier: null,
    type: null,
    date: {
        startDate: null,
        endDate: null,
    },
    warehouse: null,
}

const mutations = {
    setId(state, val) {
        state.id = val
    },
    setSupplier(state, val) {
        state.supplier = val
    },
    setType(state, val) {
        state.type = val
    },
    setDate(state, val) {
        state.date = val
    },
    setWarehouse(state, val) {
        state.warehouse = val
    },
}

const actions = {
    updateId({ commit }, val) {
        commit('setId', val)
    },
    updateSupplier({ commit }, val) {
        commit("setSupplier", val)
    },
    updateType({ commit }, val) {
        commit("setType", val)
    },
    updateDate({ commit }, val) {
        commit("setDate", val)
    },
    updateWarehouse({ commit }, val) {
        commit("setWarehouse", val)
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
