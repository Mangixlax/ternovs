import { AccordionItem } from '@/types/components/components'

export interface Employee {
  id: number
  name: string
  slug: string
  position: string
  expierence: string
  description: string
  accordion: EmployeeAccordion
  sertificates?: EmployeeSertificates
}

export interface EmployeeAccordion {
  text: string
  list: AccordionItem[]
}

export interface EmployeeSertificates {
  text: string
  list: string[]
}