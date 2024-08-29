<script setup>
const purchaseOrderStore = usePurchaseOrderStore()
purchaseOrderStore.fill()
const { date } = storeToRefs(useDateStore)
const { purchaseOrders } = storeToRefs(purchaseOrderStore)

watch(date, async () => {
  console.log('MUDEI')

  await purchaseOrderStore.fill()
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <PurchaseOrderToReviewCard
      :v-if="purchaseOrders"
      v-for="order in purchaseOrders"
      :key="order.id"
      :purchase-order="order"
    />
  </div>
</template>
