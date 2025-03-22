
const state = {
    baseUrlPath: '/api/wms/v1/outbound/simple-sto-do',
    baseRouterName: 'outbound.simple-sto-do',
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
