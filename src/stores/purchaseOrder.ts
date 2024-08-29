import { getLocalTimeZone } from '@internationalized/date'
import { CapacitorHttp } from '@capacitor/core'
import { default_api } from '@/api/http'

export const usePurchaseOrderStore = defineStore('purchase-order-store', {
  state: () => {
    return {
      purchaseOrders: [] as PurchaseOrder[],
      purchaseOrdersResponse: {} as PaginatedResponse<PurchaseOrder>
    }
  },

  actions: {
    async search(
      page: number,
      q?: string,
      expected_arrival_date?: Date,
      status?: PurchaseOrderStatusEnum
    ) {
      const api = default_api
      const options = {
        ...api,
        url: `${api.base_url}/receivement/purchase_order/`,
        params: {
          q: String(q),
          page: String(page),
          expected_arrival_date: String(expected_arrival_date?.toISOString().split('T')[0]),
          status: String(status)
        }
      }
      const response: PaginatedResponse<PurchaseOrder> = (await CapacitorHttp.get(options)).data

      this.purchaseOrders = response.items
      this.purchaseOrdersResponse = response
    },
    async fill() {
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

      this.purchaseOrders = response.items
      this.purchaseOrdersResponse = response
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
