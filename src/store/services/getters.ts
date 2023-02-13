import { ServicesState } from './state'
import { GetterTree } from 'vuex/types'
import { RootState } from '~/store'

interface OurTeamGetterContext extends GetterTree<ServicesState, RootState> {}

const getters: OurTeamGetterContext = {
  getServicesList: (state: ServicesState) => {
    return state.services
  },
  getServiceListByCategory: (state) => (category: string) => {
    return state.services.find((service) => service.category.value === category)
  },
  // getServiceByParams: (state) => (params: number) => {
  //   return state.employees.map
  // },
}
export default getters
