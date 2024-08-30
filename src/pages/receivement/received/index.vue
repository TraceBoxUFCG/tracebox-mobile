<script setup>
const dateStore = useDateStore()
const purchaseOrderStore = usePurchaseOrderStore()
purchaseOrderStore.fill()
const { date } = storeToRefs(dateStore)
const { receivedPurchaseOrders } = storeToRefs(purchaseOrderStore)

watch(date, async () => {
  await purchaseOrderStore.fill()
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <span v-if="receivedPurchaseOrders.length === 0">Sem ordens de compras recebidas</span>
    <PurchaseOrderToReviewCard
      :v-if="receivedPurchaseOrders"
      v-for="order in receivedPurchaseOrders"
      :key="order.id"
      :purchase-order="order"
    />
  </div>
</template>
