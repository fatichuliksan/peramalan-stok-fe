
const state = {
    baseUrlPath: '/api/wms/v1/wms/purchase/supplier-return',
    itemStockPath: '/api/wms/v1/wms/item-stock',
    baseRouterName: 'purchase.supplier-return',
    id: null,
}

const mutations = {
    setId(state, val) {
        state.id = val
    }
}

const actions = {
    updateId({ commit }, val) {
        commit('setId', val)
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
