import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { getAccessorType } from 'typed-vuex'

export const state = () => ({
    editable: true,
    fireUser: {} as any
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    //
}

export const mutations: MutationTree<RootState> = {
    ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claim }) {
        if (!authUser) {
            state.fireUser = null
        } else {
            const { uid, email } = authUser
            state.fireUser = { uid, email }
        }
    }
}

export const actions: ActionTree<RootState, RootState> = {
    //
    onAuthStateChangedAction() {

    }
}

export const accessorType = getAccessorType({
    state,
    getters,
    mutations,
    actions,
})