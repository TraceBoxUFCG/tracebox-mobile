import { getLocalTimeZone } from '@internationalized/date'
import { CapacitorHttp } from '@capacitor/core'
import { default_api } from '@/api/http'
import { toast } from '@/components/ui/toast'

export const usePurchaseOrderStore = defineStore('purchase-order-store', {
  state: () => {
    return {
      purchaseOrder: [] as PurchaseOrder[],
      status: 'CONFIRMED' as string
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
      const response = await CapacitorHttp.post(options)

      if (response.status !== 200) {
        toast({
          title: 'Falha na tentativa de iniciar recebimento',
          description: `Não foi possivel iniciar o recebimento.`,
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Recebimento inicializado com sucesso'
        })
      }
      await this.fill()
    },
    async finishReceivement(id: number) {
      const api = default_api
      const options = {
        ...api,
        url: `${api.base_url}/receivement/purchase_order/${id}/finish/`
      }

      const response = await CapacitorHttp.post(options)

      if (response.status !== 200) {
        toast({
          title: 'Falha na tentativa de finalizar recebimento',
          description: `Não foi possivel finalizar o recebimento. Por favor, finalize o recebimento de todos os itens.`,
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Recebimento finalizado com sucesso'
        })
      }

      await this.fill()
    }
  },
  getters: {
    filteredPurchaseOrders(): PurchaseOrder[] {
      return this.purchaseOrder.filter((po: PurchaseOrder) => po.status === this.status)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePurchaseOrderStore, import.meta.hot))
}
