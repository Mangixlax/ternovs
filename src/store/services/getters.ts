import { ServicesState } from './state'
import { GetterTree } from 'vuex/types'
import { RootState } from '~/store'

interface OurTeamGetterContext extends GetterTree<ServicesState, RootState> {}

const getters: OurTeamGetterContext = {
  getServicesList: (state: ServicesState) => {
    return state.services
  },
  getServiceListByCategory: (state) => (category: string) => {
    return state.services.find(
      (serviceList) => serviceList.category.value === category
    )
  },
  getServiceByParams: (state) => (params: any) => {
    const serviceList: any = state.services.find(
      (serviceList) => serviceList.category.value === params.category
    )

    let service = serviceList.list.find(
      (service: any) =>
        JSON.stringify(service.route.params) === JSON.stringify(params)
    )

    return service
  },
}
export default getters
