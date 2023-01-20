import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex/types'
import { RootState } from '~/store'
import { IResponseDataPagination } from '~/types/Response'

const defaultPagination = {
  total: 0 as number,
  per_page: 25 as number,
  current_page: 1 as number,
  last_page: 1 as number,
} as IResponseDataPagination

/**
 * States
 */
export const state = () => ({
  pagination: defaultPagination,
  loading: false as boolean,
})

export type CatalogState = ReturnType<typeof state>

/**
 * Action context specific to navigation module
 */
interface CatalogActionContext extends ActionContext<CatalogState, RootState> {}

/**
 * Getters
 */
export const getters: GetterTree<CatalogState, RootState> = {
  getPagination: (state: CatalogState): IResponseDataPagination => {
    return state.pagination
  },
  getLoading: (state: CatalogState): boolean => {
    return state.loading
  },
}

/**
 * Mutations
 */
export const mutations: MutationTree<CatalogState> = {
  setLoading: (state: CatalogState, value: boolean) => {
    state.loading = value
  },
}

/**
 * Actions
 */
export const actions: ActionTree<CatalogState, RootState> = {}
