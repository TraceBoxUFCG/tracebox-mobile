<script setup lang="ts">
import type { PurchaseOrder } from '@/types/purchaseOrder'
import { receivementOrderStatusMap } from '@/types/purchaseOrder'

const props = defineProps<{
  purchaseOrder: PurchaseOrder
}>()

const receivementStore = useReceivementStore()
receivementOrderStatusMap
const router = useRouter()
const startReceivement = async () => {
  await receivementStore.startReceivement(props.purchaseOrder.id)
  router.push(`/receivement/${props.purchaseOrder.id}`)
}

const finishReceivement = async () => {
  await receivementStore.fill()
}
</script>

<template>
  <Card class="w-[350px] hover:bg-muted/40">
    <RouterLink :to="`/receivement/purchaseOrder/${purchaseOrder.id}`">
      <CardHeader>
        <CardTitle>{{ props.purchaseOrder.supplier.business_name }}</CardTitle>
        <CardDescription class="flex flex-col">
          <span> Items: {{ props.purchaseOrder.items.length }} itens para receber </span>
          <span> Status: {{ receivementOrderStatusMap[purchaseOrder.status] }} </span>
        </CardDescription>
      </CardHeader>
    </RouterLink>
    <CardFooter class="flex justify-center gap-3">
      <Button v-if="purchaseOrder.status === 'CONFIRMED'" @click="startReceivement" class="w-full"
        >Iniciar</Button
      >
      <Button
        v-if="purchaseOrder.status === 'RECEIVEMENT_STARTED'"
        @click="finishReceivement"
        class="w-full"
        >Finalizar</Button
      >
    </CardFooter>
  </Card>
</template>
