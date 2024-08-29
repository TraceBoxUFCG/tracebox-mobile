import type { Supplier } from './supplier'
import type { ProductVariety } from './productVariety'

export enum PurchaseOrderStatusEnum {
  DRAFT = 'DRAFT',
  CONFIRMED = 'CONFIRMED',
  RECEIVED = 'RECEIVED',
  LOTTED = 'LOTTED',
  RECEIVEMENT_STARTED = 'RECEIVEMENT_STARTED',
  LOTTING_STARTED = 'LOTTING_STARTED'
}
export interface PurchaseOrder {
  id?: number
  expected_arrival_date: string
  status: PurchaseOrderStatusEnum
  supplier: Supplier
  items: PurchaseOrderItem[]
}

export interface PurchaseOrderItem {
  id?: number
  boxes_quantity: number
  unit_price: number
  product_variety: ProductVariety
}

export interface PurchaseOrderItemCart {
  id?: number
  purchase_order_id?: number
  boxes_quantity: number
  unit_price: number
  product_variety_id: number
}

export interface PurchaseOrderCart {
  id?: number
  expected_arrival_date: Date
  supplier_id: number
  items: PurchaseOrderItemCart[]
}
