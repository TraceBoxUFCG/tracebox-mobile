<script setup lang="ts">
import { defaultAPI } from '@/api/http'
import type { ReceivementItem } from '@/types/receivementItem'
import { CapacitorHttp } from '@capacitor/core'
import { toast } from './ui/toast'

const props = defineProps<{
  item: ReceivementItem
  onReceive: () => {}
}>()

const receivedQuantity = ref<number>(props.item.purchase_order_item.boxes_quantity)

const submitReview = async () => {
  const api = defaultAPI
  const expectedQuantity = props.item.purchase_order_item.boxes_quantity

  const options = {
    ...api,
    url: `${api.base_url}/receivement/${props.item.id}/receive`,
    data: {
      received_quantity: receivedQuantity.value,
      rejected_quantity: Math.abs(receivedQuantity.value - expectedQuantity)
    }
  }
  const response = await CapacitorHttp.post(options)

  if (response.status !== 200) {
    toast({
      title: 'Falha no recebimento do item.',
      variant: 'destructive'
    })
  } else {
    toast({
      title: `Item ${props.item.purchase_order_item.product_variety.product.name} recebido com sucesso`
    })

    await props.onReceive()
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>
        {{ props.item.purchase_order_item.product_variety.product.name }}
      </CardTitle>
      <span> Quantidade esperada: {{ props.item.purchase_order_item.boxes_quantity }} caixas </span>
    </CardHeader>
    <CardContent>
      <div v-if="item.status === 'PENDING'" class="flex items-end justify-between">
        <div class="flex flex-col gap-2">
          <Label>Quantidade Recebida</Label>
          <Input
            class="w-[100px] text-center"
            :max="props.item.purchase_order_item.boxes_quantity"
            type="number"
            v-model:model-value="receivedQuantity"
          ></Input>
        </div>
        <Button @click="submitReview"> Confirmar </Button>
      </div>
      <div v-if="item.status === 'RECEIVED'" class="flex flex-col">
        <span>{{ props.item.received_quantity }} Caixas recebidas</span>
      </div>
    </CardContent>
  </Card>
</template>
