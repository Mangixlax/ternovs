import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex/types'
export type RootState = ReturnType<typeof state>

/**
 * Action context specific to settings top line module
 */
interface RootActionContext extends ActionContext<RootState, RootState> {}

export const state = () => ({})
/**
 * Getters
 */
export const getters: GetterTree<RootState, RootState> = {}

/**
 * Mutations
 */
export const mutations: MutationTree<RootState> = {}

/**
 * Actions
 */
export const actions: ActionTree<RootState, RootState> = {
  nuxtServerInit({ state, dispatch }: RootActionContext, { req }) {},
}
