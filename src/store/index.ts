import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex/types'

/**
 * States
 */
export const state = () => ({
  breadcrumbs: [] as Array<object>, // TODO Add normal type
  isMobileMenuOpen: false as boolean,
})

export type RootState = ReturnType<typeof state>

/**
 * Action context specific to settings top line module
 */
interface RootActionContext extends ActionContext<RootState, RootState> {}

/**
 * Getters
 */
export const getters: GetterTree<RootState, RootState> = {
  getBreadcrumbs(state: RootState) {
    return state.breadcrumbs || []
  },
}

/**
 * Mutations
 */
export const mutations: MutationTree<RootState> = {
  setBreadcrumbs(state, list = []) {
    state.breadcrumbs = list
  },
}

/**
 * Actions
 */
export const actions: ActionTree<RootState, RootState> = {
  nuxtServerInit({ state, dispatch }: RootActionContext, { req }) {},
}
