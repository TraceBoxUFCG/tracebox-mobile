<script setup lang="ts">
const props = defineProps<{
  purchaseOrder: PurchaseOrder
}>()

const purchaseOrderStore = usePurchaseOrderStore()
purchaseOrderStatusMap
</script>

<template>
  <Card class="w-[350px] hover:bg-muted/40">
    <RouterLink to="/pedido">
      <CardHeader>
        <CardTitle>{{ props.purchaseOrder.supplier.business_name }}</CardTitle>
        <CardDescription class="flex flex-col">
          <span> Items: {{ props.purchaseOrder.items.length }} itens para receber </span>
          <span> Status: {{ purchaseOrder.status }} </span>
        </CardDescription>
      </CardHeader>
    </RouterLink>
    <CardFooter class="flex justify-center gap-3">
      <Button
        @click="purchaseOrderStore.startReceivement(purchaseOrder.id)"
        :disabled="purchaseOrder.status !== 'CONFIRMED'"
        class="w-full"
        >Iniciar</Button
      >
    </CardFooter>
  </Card>
</template>
