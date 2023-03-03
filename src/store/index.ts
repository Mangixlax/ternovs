import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex/types'
export type RootState = ReturnType<typeof state>

/**
 * Action context specific to settings top line module
 */
interface RootActionContext extends ActionContext<RootState, RootState> {}

export const state = () => ({
  categoriesList: [],
  isBot: false,
})
/**
 * Getters
 */
export const getters: GetterTree<RootState, RootState> = {
  getCategoriesList(state: RootState): any {
    return state.categoriesList
  },
}

/**
 * Mutations
 */
export const mutations: MutationTree<RootState> = {
  setCategoriesList(state: RootState, value: any) {
    state.categoriesList = value.data
  },
}

/**
 * Actions
 */
export const actions: ActionTree<RootState, RootState> = {
  nuxtServerInit({ state, dispatch }: RootActionContext, { req }) {
    if (!state.isBot) {
      return Promise.all([dispatch('fetchCategoriesList')])
    }
  },
  fetchCategoriesList({
    commit,
    dispatch,
  }: RootActionContext): Promise<any | null> {
    return new Promise((resolve) => {
      this.$repositories.services
        .getCategoriesList()
        .then(async (data: any) => {
          // @TODO TBD
          commit('setCategoriesList', data)
          resolve(data)
        })
        .catch(() => resolve(null))
    })
  },
}
