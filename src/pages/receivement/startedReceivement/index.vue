<script setup>
const dateStore = useDateStore()
const purchaseOrderStore = usePurchaseOrderStore()
purchaseOrderStore.fill()
const { date } = storeToRefs(dateStore)
const { startedReceivementPurchaseOrder } = storeToRefs(purchaseOrderStore)

watch(date, async () => {
  await purchaseOrderStore.fill()
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <span v-if="startedReceivementPurchaseOrder.length === 0"
      >Sem ordens de compras em recebimento</span
    >
    <PurchaseOrderToReviewCard
      :v-if="startedReceivementPurchaseOrder"
      v-for="order in startedReceivementPurchaseOrder"
      :key="order.id"
      :purchase-order="order"
    />
  </div>
</template>
