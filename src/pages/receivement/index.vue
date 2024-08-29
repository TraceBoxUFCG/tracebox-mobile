<script setup>
const purchaseOrderStore = usePurchaseOrderStore()
purchaseOrderStore.fill()
</script>

<template>
  <div class="flex flex-col gap-5">
    <PurchaseOrderToReviewCard />
    <PurchaseOrderToReviewCard />
    <PurchaseOrderToReviewCard />
    <PurchaseOrderToReviewCard />
    <PurchaseOrderToReviewCard />
    <PurchaseOrderToReviewCard />
    <PurchaseOrderToReviewCard />
    <PurchaseOrderToReviewCard />
    <PurchaseOrderToReviewCard />
  </div>
</template>
