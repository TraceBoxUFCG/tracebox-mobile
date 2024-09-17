<script setup lang="ts">
import { defaultAPI } from '@/api/http'
import { CapacitorHttp } from '@capacitor/core'
import type { PurchaseOrder } from '@/types/purchaseOrder'
import type { AssetLot } from '@/types/assetLot'
import { toast } from '@/components/ui/toast'

const { startLotting, finishLotting } = useLottingStore()
const route = useRoute()
const params = route.params as { id: string }

const purchaseOrder = ref<PurchaseOrder | null>(null)
const qrcode = ref<number | undefined>()
const items = ref<AssetLot[]>([])
const currentLot = ref<AssetLot>()

const getItems = async () => {
  const api = defaultAPI

  const options = {
    ...api,
    url: `${api.base_url}/lotting/purchase_order/${params.id}/asset_lot`
  }
  const response = (await CapacitorHttp.get(options)).data
  items.value = response
}

const getPurchaseOrder = async () => {
  const api = defaultAPI

  const options = {
    ...api,
    url: `${api.base_url}/purchases/purchase_order/${params.id}`
  }
  const response: PurchaseOrder = (await CapacitorHttp.get(options)).data
  purchaseOrder.value = response
}

const lot = async () => {
  console.log('update', qrcode.value)

  const api = defaultAPI
  const assetId = qrcode.value

  const options = {
    ...api,
    url: `${api.base_url}/lotting/${currentLot.value?.id}/lot`,
    data: {
      asset_id: assetId
    }
  }
  const response = await CapacitorHttp.post(options)

  if (response.status !== 200) {
    toast({
      title: 'Falha no loteamento da caixa.',
      description: `${response.data}`,
      variant: 'destructive'
    })
  } else {
    toast({
      title: `Caixa ${qrcode.value} loteada com sucesso`
    })

    qrcode.value = undefined
    await getItems()
    currentLot.value = getCurrentLot()
  }
}

const start = async () => {
  await startLotting(parseInt(params.id))
  await getPurchaseOrder()
  await getItems()
  currentLot.value = getCurrentLot()
}

const finish = async () => {
  await finishLotting(parseInt(params.id))
  await getPurchaseOrder()
  await getItems()
}

onMounted(async () => {
  await getItems()
  await getPurchaseOrder()
  currentLot.value = getCurrentLot()
})

const unlottedItems = computed(() => {
  return items.value.filter((elem: AssetLot) => !elem.asset_id)
})

const lottedItems = computed(() => {
  return items.value.filter((elem: AssetLot) => elem.asset_id)
})

const getCurrentLot = () => {
  if (unlottedItems.value.length) {
    return unlottedItems.value[0]
  }
  return undefined
}
</script>

<template>
  <div class="flex w-full flex-col gap-5">
    <Card v-if="purchaseOrder" class="w-full">
      <CardHeader>
        <CardTitle class="flex justify-between">
          <span>
            {{ purchaseOrder?.supplier.business_name }}
          </span>
          <span> #{{ purchaseOrder?.id }} </span>
        </CardTitle>
      </CardHeader>
      <CardFooter class="w-full">
        <Button @click="start" class="w-full" v-if="purchaseOrder?.status === 'RECEIVED'"
          >Iniciar Loteamento</Button
        >
        <Button @click="finish" class="w-full" v-if="purchaseOrder?.status === 'LOTTING_STARTED'"
          >Finalizar Loteamento</Button
        >
      </CardFooter>
    </Card>
    <Separator :label="`${lottedItems.length} / ${items.length} Assets Lotados`" />
    <div>
      <Card v-if="currentLot">
        <CardHeader>
          <span>
            {{ currentLot?.receivement_item.purchase_order_item.product_variety.product.name }}
          </span>
          <span>
            Empacotamento:
            {{
              currentLot?.receivement_item.purchase_order_item.product_variety.product.packaging
                .description
            }}
          </span>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col gap-5">
            <label>Escaneie o QR CODE da caixa</label>
            <QrCodeInput label="Lotear" v-model:qrcode="qrcode" />
            <Button class="flex items-center justify-center" @click="lot"> Lotear </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
