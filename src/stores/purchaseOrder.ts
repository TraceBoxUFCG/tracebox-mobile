import { getLocalTimeZone } from '@internationalized/date'
import { CapacitorHttp } from '@capacitor/core'
import { default_api } from '@/api/http'

export const usePurchaseOrderStore = defineStore('purchase-order-store', {
  state: () => {
    return {
      purchaseOrder: [] as PurchaseOrder[]
    }
  },

  actions: {
    async getPurchaseOrders() {
      const dateStore = useDateStore()

      const api = default_api
      const options = {
        ...api,
        url: `${api.base_url}/receivement/purchase_order/`,
        params: {
          expected_arrival_date: String(
            dateStore.date.toDate(getLocalTimeZone())?.toISOString().split('T')[0]
          )
        }
      }
      const response: PaginatedResponse<PurchaseOrder> = (await CapacitorHttp.get(options)).data
      return response
    },
    async fill() {
      this.purchaseOrder = (await this.getPurchaseOrders()).items
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
