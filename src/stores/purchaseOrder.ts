import { getLocalTimeZone } from '@internationalized/date'
import { CapacitorHttp } from '@capacitor/core'
import { default_api } from '@/api/http'
import { PurchaseOrderStatusEnum } from '@/types/purchaseOrder'

export const usePurchaseOrderStore = defineStore('purchase-order-store', {
  state: () => {
    return {
      startedReceivementPurchaseOrder: [] as PurchaseOrder[],
      receivedPurchaseOrders: [] as PurchaseOrder[],
      confirmedPurchaseOrder: [] as PurchaseOrder[]
    }
  },

  actions: {
    async getPurchaseOrders(status: PurchaseOrderStatusEnum) {
      const dateStore = useDateStore()

      const api = default_api
      const options = {
        ...api,
        url: `${api.base_url}/receivement/purchase_order/`,
        params: {
          expected_arrival_date: String(
            dateStore.date.toDate(getLocalTimeZone())?.toISOString().split('T')[0]
          ),
          status: status
        }
      }
      const response: PaginatedResponse<PurchaseOrder> = (await CapacitorHttp.get(options)).data
      return response
    },
    async getStartedReceivementPurchaseOrders() {
      this.startedReceivementPurchaseOrder = (
        await this.getPurchaseOrders(PurchaseOrderStatusEnum.RECEIVEMENT_STARTED)
      ).items
    },
    async getReceivedPurchaseOrders() {
      this.receivedPurchaseOrders = (
        await this.getPurchaseOrders(PurchaseOrderStatusEnum.RECEIVED)
      ).items
    },
    async getConfirmedPurchaseOrders() {
      this.confirmedPurchaseOrder = (
        await this.getPurchaseOrders(PurchaseOrderStatusEnum.CONFIRMED)
      ).items
    },
    async fill() {
      await this.getConfirmedPurchaseOrders()
      await this.getReceivedPurchaseOrders()
      await this.getStartedReceivementPurchaseOrders()
    },
    async startReceivement(id: number) {
      const api = default_api
      const options = {
        ...api,
        url: `${api.base_url}/receivement/purchase_order/${id}/start/`
      }
      await CapacitorHttp.post(options)
      await this.fill()
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePurchaseOrderStore, import.meta.hot))
}
