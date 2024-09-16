import type { Supplier } from './supplier'
import type { ProductVariety } from './productVariety'

export const receivementOrderStatusMap: { [key in PurchaseOrderStatusEnum]: string } = {
  CONFIRMED: 'A Receber',
  RECEIVEMENT_STARTED: 'Recebimento iniciado',
  RECEIVED: 'Recebimento finalizado',
  DRAFT: 'Em criação',
  LOTTED: 'Loteado',
  LOTTING_STARTED: 'Loteamento iniciado'
}

export const lottingOrderStatusMap: { [key in PurchaseOrderStatusEnum]: string } = {
  CONFIRMED: 'Confirmado',
  RECEIVEMENT_STARTED: 'Recebimento iniciado',
  RECEIVED: 'Não Loteado',
  DRAFT: 'Em criação',
  LOTTED: 'Loteado',
  LOTTING_STARTED: 'Loteamento iniciado'
}


export enum PurchaseOrderStatusEnum {
  DRAFT = 'DRAFT',
  CONFIRMED = 'CONFIRMED',
  RECEIVED = 'RECEIVED',
  LOTTED = 'LOTTED',
  RECEIVEMENT_STARTED = 'RECEIVEMENT_STARTED',
  LOTTING_STARTED = 'LOTTING_STARTED'
}
export interface PurchaseOrder {
  id: number
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
