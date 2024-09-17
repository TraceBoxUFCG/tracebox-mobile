<script setup lang="ts">
import type { PurchaseOrder } from '@/types/purchaseOrder'
import { lottingOrderStatusMap } from '@/types/purchaseOrder'

const props = defineProps<{
  purchaseOrder: PurchaseOrder
}>()

const router = useRouter()

const lottingStore = useLottingStore()
receivementOrderStatusMap

const startLotting = async () => {
  await lottingStore.startLotting(props.purchaseOrder.id)
  router.push(`/lotting/purchaseOrder/${props.purchaseOrder.id}`)
}

const finishLotting = async () => {
  await lottingStore.finishLotting(props.purchaseOrder.id)
  await lottingStore.fill()
}
</script>

<template>
  <Card class="w-[350px] hover:bg-muted/40">
    <RouterLink :to="`/lotting/purchaseOrder/${purchaseOrder.id}`">
      <CardHeader>
        <CardTitle>{{ props.purchaseOrder.supplier.business_name }}</CardTitle>
        <CardDescription class="flex flex-col">
          <span> Status: {{ lottingOrderStatusMap[purchaseOrder.status] }} </span>
        </CardDescription>
      </CardHeader>
    </RouterLink>
    <CardFooter class="flex justify-center gap-3">
      <Button v-if="purchaseOrder.status === 'RECEIVED'" @click="startLotting" class="w-full"
        >Iniciar</Button
      >
      <Button
        v-if="purchaseOrder.status === 'LOTTING_STARTED'"
        @click="finishLotting"
        class="w-full"
        >Finalizar</Button
      >
    </CardFooter>
  </Card>
</template>
