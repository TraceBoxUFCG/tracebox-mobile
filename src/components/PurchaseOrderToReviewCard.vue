<script setup lang="ts">
const props = defineProps<{
  purchaseOrder: PurchaseOrder
}>()
</script>

<template>
  <RouterLink to="/pedido">
    <Card class="w-[350px] hover:bg-muted/40">
      <CardHeader>
        <CardTitle>{{ props.purchaseOrder.supplier.business_name }}</CardTitle>
        <CardDescription
          >{{ props.purchaseOrder.items.length }} itens para receber
        </CardDescription>
      </CardHeader>
      <CardFooter class="flex justify-center gap-3">
        <Button class="w-full">Iniciar</Button>
        <Button class="w-full">Finalizar</Button>
      </CardFooter>
    </Card>
  </RouterLink>
</template>
