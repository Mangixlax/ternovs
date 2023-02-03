import { GetterTree } from 'vuex/types'
import { RootState } from '~/store'
import { OurTeamState } from '~/store/employees/state'

interface OurTeamGetterContext extends GetterTree<OurTeamState, RootState> {}

const getters: OurTeamGetterContext = {
  getEmployeesList: (state: OurTeamState) => {
    return state.employees
  },
  getEmployeeById: (state) => (id: number) => {
    return state.employees[id]
  },
}
export default getters
