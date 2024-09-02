import { StatesEnum } from './common'

export type Supplier = {
  id?: number
  document: string
  business_name: string
  address: Address
}

export type Address = {
  id?: number
  city: string
  state: StatesEnum
  street: string
  zipcode: string
  number: string
  complement: string
}
