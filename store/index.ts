import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { getAccessorType } from 'typed-vuex'

export const state = () => ({
    editable: true,
    fireUser: null
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    //
}

export const mutations: MutationTree<RootState> = {
    setEdit(state, edit) {
        state.editable = edit
    },
    setFireUser(state, fireU) {
        state.fireUser = fireU
    }
}

export const actions: ActionTree<RootState, RootState> = {
    //
}

export const accessorType = getAccessorType({
    state,
    getters,
    mutations,
    actions,
})