import { getLocalTimeZone } from '@internationalized/date'

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
      const response: PaginatedResponse<PurchaseOrder> = (
        await this.axios.get('/purchases/purchase_order', {
          params: {
            q: q,
            page: page,
            expected_arrival_date: expected_arrival_date?.toISOString().split('T')[0],
            status: status
          }
        })
      ).data
      this.purchaseOrders = response.items
      this.purchaseOrdersResponse = response
    },
    async fill() {
      const dateStore = useDateStore()
      const response: PaginatedResponse<PurchaseOrder> = (
        await this.axios.get('/receivement/purchase_order', {
          params: {
            expected_arrival_date: dateStore.date
              .toDate(getLocalTimeZone())
              ?.toISOString()
              .split('T')[0]
          }
        })
      ).data
      this.purchaseOrders = response.items
      this.purchaseOrdersResponse = response
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePurchaseOrderStore, import.meta.hot))
}
