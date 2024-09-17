import { getLocalTimeZone } from '@internationalized/date'
import { CapacitorHttp } from '@capacitor/core'
import { defaultAPI } from '@/api/http'
import { toast } from '@/components/ui/toast'

export const useLottingStore = defineStore('lotting-store', {
  state: () => {
    return {
      purchaseOrder: [] as PurchaseOrder[],
      status: 'RECEIVED' as string
    }
  },

  actions: {
    async getPurchaseOrders() {
      const dateStore = useDateStore()

      const api = defaultAPI
      const options = {
        ...api,
        url: `${api.base_url}/lotting/purchase_order`,
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
    async startLotting(id: number) {
      const api = defaultAPI
      const options = {
        ...api,
        url: `${api.base_url}/lotting/purchase_order/${id}/start`
      }
      const response = await CapacitorHttp.post(options)

      if (response.status !== 200) {
        toast({
          title: 'Falha na tentativa de iniciar loteamento',
          description: `Não foi possivel iniciar o loteamento.`,
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Loteamento inicializado com sucesso'
        })
      }
      await this.fill()
    },
    async finishLotting(id: number) {
      const api = defaultAPI
      const options = {
        ...api,
        url: `${api.base_url}/lotting/purchase_order/${id}/finish`
      }

      const response = await CapacitorHttp.post(options)

      if (response.status !== 200) {
        toast({
          title: 'Falha na tentativa de finalizar loteamento',
          description: `Não foi possivel finalizar o loteamento. Por favor, finalize o loteamento de todos os itens.`,
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Loteamento finalizado com sucesso'
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
  import.meta.hot.accept(acceptHMRUpdate(useLottingStore, import.meta.hot))
}
