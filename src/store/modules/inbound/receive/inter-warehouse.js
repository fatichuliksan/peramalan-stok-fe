
const state = {
    baseUrlPath: '/api/wms/v1/wms/inbound/receive/inter-warehouse',
    baseRouterName: 'inbound.receive.inter-warehouse',
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
