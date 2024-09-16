import type { Product } from './product'

export enum AssetStatusEnum {
  EMPTY = 'EMPTY',
  OCCUPIED = 'OCCUPIED',
  DISABLED = 'DISABLED'
}

export type Asset = {
  id?: number
  status: AssetStatusEnum
  product?: Product
}

export type GenerateAssetTagPayload = {
  quantity: number
}