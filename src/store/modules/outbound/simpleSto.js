
const state = {
    baseUrlPath: '/api/wms/v1/outbound/simple-sto',
    baseRouterName: 'outbound.simple-sto',
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
