<script setup lang="ts">
import type { PurchaseOrder } from '@/types/purchaseOrder'
import { lottingOrderStatusMap } from '@/types/purchaseOrder'

const props = defineProps<{
  purchaseOrder: PurchaseOrder
}>()

const lottingStore = useLottingStore()
receivementOrderStatusMap
</script>

<template>
  <Card class="w-[350px] hover:bg-muted/40">
    <RouterLink :to="`/receivement/purchaseOrder/${purchaseOrder.id}`">
      <CardHeader>
        <CardTitle>{{ props.purchaseOrder.supplier.business_name }}</CardTitle>
        <CardDescription class="flex flex-col">
          <span> Status: {{ lottingOrderStatusMap[purchaseOrder.status] }} </span>
        </CardDescription>
      </CardHeader>
    </RouterLink>
    <CardFooter class="flex justify-center gap-3">
      <Button
        v-if="purchaseOrder.status === 'RECEIVED'"
        @click="lottingStore.startLotting(purchaseOrder.id)"
        class="w-full"
        >Iniciar</Button
      >
      <Button
        v-if="purchaseOrder.status === 'LOTTING_STARTED'"
        @click="lottingStore.finishLotting(purchaseOrder.id)"
        class="w-full"
        >Finalizar</Button
      >
    </CardFooter>
  </Card>
</template>
