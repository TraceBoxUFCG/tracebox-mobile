<script setup lang="ts">
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint
} from '@capacitor/barcode-scanner'
import { set } from '@vueuse/core'

const qrcode = defineModel<number | undefined>('qrcode', { required: true })

const scanBarcode = async () => {
  const result = await CapacitorBarcodeScanner.scanBarcode({
    hint: CapacitorBarcodeScannerTypeHint.QR_CODE,
    web: {
      showCameraSelection: true,
      scannerFPS: 30
    },
    scanButton: true
  })
  set(qrcode, parseInt(result.ScanResult))
}
</script>
<template>
  <div class="flex flex-row gap-2">
    <Input v-model:model-value="qrcode" class="disabled:opacity-100" />
    <Button class="flex items-center justify-center" @click="scanBarcode">
      <iconify-icon icon="lucide:scan-qr-code" />
    </Button>
  </div>
</template>
