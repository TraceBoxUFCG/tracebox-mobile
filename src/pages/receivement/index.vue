<script setup>
const dateStore = useDateStore()
const purchaseOrderStore = usePurchaseOrderStore()
purchaseOrderStore.fill()
const { date } = storeToRefs(dateStore)
const { filteredPurchaseOrders, status } = storeToRefs(purchaseOrderStore)

watch(date, async () => {
  await purchaseOrderStore.fill()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-5">
    <div class="flex justify-center gap-2">
      <FilterReceivement
        :options="[
          { label: 'Não Recebidos', value: 'CONFIRMED' },
          { label: 'Em Recebimento', value: 'RECEIVEMENT_STARTED' },
          { label: 'Recebidos', value: 'RECEIVED' }
        ]"
        v-model:selected-value="status"
      />
    </div>

    <div class="flex flex-col gap-5">
      <span v-if="filteredPurchaseOrders.length === 0">Sem ordens de compra</span>
      <PurchaseOrderToReviewCard
        :v-if="filteredPurchaseOrders"
        v-for="order in filteredPurchaseOrders"
        :key="order.id"
        :purchase-order="order"
      />
    </div>
  </div>
</template>
