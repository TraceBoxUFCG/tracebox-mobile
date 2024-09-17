<script setup>
const dateStore = useDateStore()
const lottingStore = useLottingStore()
lottingStore.fill()
const { date } = storeToRefs(dateStore)
const { filteredPurchaseOrders, status } = storeToRefs(lottingStore)

watch(date, async () => {
  await lottingStore.fill()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-5">
    <div class="flex justify-center gap-2">
      <FilterLabel
        :options="[
          { label: 'Recebidos', value: 'RECEIVED' },
          { label: 'Em Loteamento', value: 'LOTTING_STARTED' },
          { label: 'Loteados', value: 'LOTTED' }
        ]"
        v-model:selected-value="status"
      />
    </div>

    <div class="flex flex-col gap-5">
      <span v-if="filteredPurchaseOrders.length === 0">Sem ordens de compra</span>
      <LottingPurchaseOrderCard
        :v-if="filteredPurchaseOrders"
        v-for="order in filteredPurchaseOrders"
        :key="order.id"
        :purchase-order="order"
      />
    </div>
  </div>
</template>
