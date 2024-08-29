<script setup lang="ts">
const props = defineProps<{
  purchaseOrder: PurchaseOrder
}>()
</script>

<template>
  <Card class="w-[350px] hover:bg-muted/40">
    <RouterLink to="/pedido">
      <CardHeader>
        <CardTitle>{{ props.purchaseOrder.supplier.business_name }}</CardTitle>
        <CardDescription
          >{{ props.purchaseOrder.items.length }} itens para receber
        </CardDescription>
      </CardHeader>
    </RouterLink>
    <CardFooter class="flex justify-center gap-3">
      <Button :disabled="purchaseOrder.status === 'RECEIVEMENT_STARTED'" class="w-full"
        >Iniciar</Button
      >
      <Button :disabled="purchaseOrder.status === 'CONFIRMED'" class="w-full">Finalizar</Button>
    </CardFooter>
  </Card>
</template>
