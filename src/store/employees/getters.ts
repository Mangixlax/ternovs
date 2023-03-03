import { Employee } from './../../types/models/employee.d';
import { GetterTree } from 'vuex/types'
import { RootState } from '~/store'
import { OurTeamState } from '~/store/employees/state'

interface OurTeamGetterContext extends GetterTree<OurTeamState, RootState> {}

const getters: OurTeamGetterContext = {
  getEmployeesList: (state: OurTeamState) => {
    return state.employees
  },
  getEmployeeBySlug: (state) => (slug: string) => {
    return state.employees.find(employee => employee.slug == slug)
  },
}
export default getters
