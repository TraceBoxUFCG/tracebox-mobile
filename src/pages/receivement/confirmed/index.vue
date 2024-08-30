<script setup>
const dateStore = useDateStore()
const purchaseOrderStore = usePurchaseOrderStore()
purchaseOrderStore.fill()
const { date } = storeToRefs(dateStore)
const { confirmedPurchaseOrder } = storeToRefs(purchaseOrderStore)

watch(date, async () => {
  await purchaseOrderStore.fill()
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <span v-if="confirmedPurchaseOrder.length === 0">Sem ordens de compras não recebidas</span>
    <PurchaseOrderToReviewCard
      :v-if="confirmedPurchaseOrder"
      v-for="order in confirmedPurchaseOrder"
      :key="order.id"
      :purchase-order="order"
    />
  </div>
</template>
