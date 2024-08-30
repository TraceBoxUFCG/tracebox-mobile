<script setup>
const dateStore = useDateStore()
const purchaseOrderStore = usePurchaseOrderStore()
purchaseOrderStore.fill()
const { date } = storeToRefs(dateStore)
const { purchaseOrder } = storeToRefs(purchaseOrderStore)

watch(date, async () => {
  await purchaseOrderStore.fill()
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <span v-if="purchaseOrder.length === 0">Sem ordens de compra</span>
    <PurchaseOrderToReviewCard
      :v-if="purchaseOrder"
      v-for="order in purchaseOrder"
      :key="order.id"
      :purchase-order="order"
    />
  </div>
</template>
