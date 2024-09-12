<script setup>
const dateStore = useDateStore()
const receivementStore = useReceivementStore()
receivementStore.fill()
const { date } = storeToRefs(dateStore)
const { filteredPurchaseOrders, status } = storeToRefs(receivementStore)

watch(date, async () => {
  await receivementStore.fill()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-5">
    <div class="flex justify-center gap-2">
      <FilterLabel
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
      <ReceivementPurchaseOrderCard
        :v-if="filteredPurchaseOrders"
        v-for="order in filteredPurchaseOrders"
        :key="order.id"
        :purchase-order="order"
      />
    </div>
  </div>
</template>
