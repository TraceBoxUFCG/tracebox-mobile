<script setup>
const dateStore = useDateStore()
const purchaseOrderStore = usePurchaseOrderStore()
purchaseOrderStore.fill()
const { date } = storeToRefs(dateStore)
const { purchaseOrders } = storeToRefs(purchaseOrderStore)

watch(date, async () => {
  await purchaseOrderStore.fill()
})
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <div class="flex flex-col gap-5">
      <PurchaseOrderToReviewCard
        :v-if="purchaseOrders"
        v-for="order in purchaseOrders"
        :key="order.id"
        :purchase-order="order"
      />
    </div>
  </div>
</template>
