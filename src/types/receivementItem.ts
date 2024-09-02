import type { PurchaseOrderItem } from './purchaseOrder'

export enum ReceivementItemStatus {
    PENDING = 'PENDING',
    RECEIVED = 'RECEIVED',
  }

export interface ReceivementItem {
    id: number
    received_quantity: number
    rejected_quantity: number
    status: ReceivementItemStatus
    purchase_order_item: PurchaseOrderItem
  }