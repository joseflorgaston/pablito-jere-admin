import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
    isLoading: false as boolean,
    snackbar: false as boolean,
    message: "" as string,
    color: "success" as string,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    snackbar: state => state.snackbar,
    isLoading: state => state.isLoading,
    message: state => state.message,
    color: state => state.color,
}

export const mutations: MutationTree<RootState> = {
    setLoading: (state) => (state.isLoading = !state.isLoading),
    setSuccess: (state, message:string) => {
        state.snackbar = true;
        state.color = "success";
        state.message = message;
    },
    setError: (state, message:string) => {
        state.snackbar = true;
        state.color = "red";
        state.message = message;
    },
    closeSnackbar(state, value: boolean = false){
        state.snackbar = value
    }
}

export const actions: ActionTree<RootState, RootState> = {
    fetchThings({ commit }) {
        commit('CHANGE_NAME', 'New name')
    },
}