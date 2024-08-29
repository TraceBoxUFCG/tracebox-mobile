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
        url: `${api.base_url}/purchases/purchase_order/`,
        headers: api.headers,
        params: {
          q: String(q),
          page: String(page),
          expected_arrival_date: String(expected_arrival_date?.toISOString().split('T')[0]),
          status: String(status)
        },
        disableRedirects: api.disableRedirects
      }
      const response: PaginatedResponse<PurchaseOrder> = (await CapacitorHttp.get(options)).data

      this.purchaseOrders = response.items
      this.purchaseOrdersResponse = response
    },
    async fill() {
      const dateStore = useDateStore()

      const api = default_api
      const options = {
        url: `${api.base_url}/purchases/purchase_order/`,
        headers: api.headers,
        disableRedirects: api.disableRedirects,
        params: {
          expected_arrival_date: String(
            dateStore.date.toDate(getLocalTimeZone())?.toISOString().split('T')[0]
          ),
          status: 'CONFIRMED'
        }
      }
      const response: PaginatedResponse<PurchaseOrder> = (await CapacitorHttp.get(options)).data

      this.purchaseOrders = response.items
      this.purchaseOrdersResponse = response
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePurchaseOrderStore, import.meta.hot))
}
