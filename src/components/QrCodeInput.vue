<script setup>
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint
} from '@capacitor/barcode-scanner'

const model = defineModel<number>('scannedValue', { required: true })
const scanBarcode = async () => {
  const result = await CapacitorBarcodeScanner.scanBarcode({
    hint: CapacitorBarcodeScannerTypeHint.QR_CODE,
    web: {
      showCameraSelection: true
    }
  })
  set(model, parseInt(result.ScanResult))
}
</script>

<template>
  <div class="flex gap-5">
    <Input v-model:model-value="model" class="border-border" />
    <Button class="flex items-center justify-center" @click="scanBarcode">
      <iconify-icon icon="lucide:scan-qr-code" />
    </Button>
  </div>
</template>
