<script setup lang="ts">
import type { PurchaseOrder } from '@/types/purchaseOrder'
import { purchaseOrderStatusMap } from '@/types/purchaseOrder'

const props = defineProps<{
  purchaseOrder: PurchaseOrder
}>()

const receivementStore = useReceivementStore()
purchaseOrderStatusMap
</script>

<template>
  <Card class="w-[350px] hover:bg-muted/40">
    <RouterLink :to="`/receivement/purchaseOrder/${purchaseOrder.id}`">
      <CardHeader>
        <CardTitle>{{ props.purchaseOrder.supplier.business_name }}</CardTitle>
        <CardDescription class="flex flex-col">
          <span> Items: {{ props.purchaseOrder.items.length }} itens para receber </span>
          <span> Status: {{ purchaseOrderStatusMap[purchaseOrder.status] }} </span>
        </CardDescription>
      </CardHeader>
    </RouterLink>
    <CardFooter class="flex justify-center gap-3">
      <Button
        v-if="purchaseOrder.status === 'CONFIRMED'"
        @click="receivementStore.startReceivement(purchaseOrder.id)"
        class="w-full"
        >Iniciar</Button
      >
      <Button
        v-if="purchaseOrder.status === 'RECEIVEMENT_STARTED'"
        @click="receivementStore.finishReceivement(purchaseOrder.id)"
        class="w-full"
        >Finalizar</Button
      >
    </CardFooter>
  </Card>
</template>
