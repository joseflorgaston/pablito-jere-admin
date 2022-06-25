import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
    isLoading: false as Boolean,
    things: [] as string[],
    name: 'Me',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    name: state => state.name,
    isLoading: state => state.isLoading,
}

export const mutations: MutationTree<RootState> = {
    CHANGE_NAME: (state, newName: string) => (state.name = newName),
}

export const actions: ActionTree<RootState, RootState> = {
    fetchThings({ commit }) {
        commit('CHANGE_NAME', 'New name')
    },
}