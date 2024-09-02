import { UnitEnum } from './common'

export type Packaging = {
  id?: number
  description: string
  quantity: string
  unit: UnitEnum
}

export type Product = {
  id?: number
  name: string
  average_unit_weight: string
  packaging: Packaging
}
