<script setup lang="ts">
import { defaultAPI } from '@/api/http'
import { CapacitorHttp } from '@capacitor/core'
import type { PurchaseOrder } from '@/types/purchaseOrder'
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

onMounted(async () => {
  await getItems()
  await getPurchaseOrder()
})
</script>

<template>
  <div>
    <h1>{{ items }}</h1>
  </div>
</template>
