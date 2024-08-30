<script setup lang="ts">
import { defaultAPI } from '@/api/http'
import { CapacitorHttp } from '@capacitor/core'
import type { PurchaseOrder } from '@/types/purchaseOrder'
import { purchaseOrderStatusMap } from '@/types/purchaseOrder'

const { startReceivement, finishReceivement } = usePurchaseOrderStore()
const route = useRoute()
const params = route.params as { id: string }

const purchaseOrder = ref<PurchaseOrder | null>(null)
const items = ref()

const getItems = async () => {
  const api = defaultAPI

  const options = {
    ...api,
    url: `${api.base_url}/receivement/purchase_order/${params.id}/receivement_item/`
  }
  const response = (await CapacitorHttp.get(options)).data
  items.value = response
}

const getPurchaseOrder = async () => {
  const api = defaultAPI

  const options = {
    ...api,
    url: `${api.base_url}/purchases/purchase_order/${params.id}/`
  }
  const response: PurchaseOrder = (await CapacitorHttp.get(options)).data
  purchaseOrder.value = response
}

const start = async () => {
  await startReceivement(parseInt(params.id))
  await getPurchaseOrder()
  await getItems()
}

const finish = async () => {
  await finishReceivement(parseInt(params.id))
  await getPurchaseOrder()
  await getItems()
}

onMounted(async () => {
  await getItems()
  await getPurchaseOrder()
})
</script>

<template>
  <div class="w-full">
    <Card v-if="purchaseOrder" class="w-full">
      <CardHeader>
        <CardTitle class="flex justify-between">
          <span>
            {{ purchaseOrder?.supplier.business_name}}
          </span>
          <span>
            #{{ purchaseOrder?.id}}
          </span> 
        </CardTitle>
      </CardHeader>
      <CardContent>
        Status: {{ purchaseOrder && purchaseOrderStatusMap[purchaseOrder?.status]}}
      </CardContent>
      <CardFooter class="w-full">
        <Button @click="start" class="w-full" v-if="purchaseOrder?.status === 'CONFIRMED'">Iniciar Recebimento</Button>
        <Button @click="finish" class="w-full" v-if="purchaseOrder?.status === 'RECEIVEMENT_STARTED'">Finalizar Recebimento</Button>
      </CardFooter>
    </Card>
  </div>
</template>
