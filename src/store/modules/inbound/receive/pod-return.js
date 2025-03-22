
const state = {
    baseUrlPath: '/api/wms/v1/inbound/pod-return',
    baseRouterName: 'inbound.receive.pod-return',
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
