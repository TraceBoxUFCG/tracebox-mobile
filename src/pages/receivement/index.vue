<script setup>
const purchaseOrderStore = usePurchaseOrderStore()
purchaseOrderStore.fill()
const { purchaseOrders } = storeToRefs(purchaseOrderStore)
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
