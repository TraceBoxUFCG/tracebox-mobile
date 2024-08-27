<script setup>
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint
} from '@capacitor/barcode-scanner'

const scannedData = ref()
const scanBarcode = async () => {
  const result = await CapacitorBarcodeScanner.scanBarcode({
    hint: CapacitorBarcodeScannerTypeHint.QR_CODE
  })
  scannedData.value = result.ScanResult
}
</script>

<template>
  <div>
    <Button @click="scanBarcode">ScanAA QR Code</Button>
    <div v-if="scannedData">
      <p>Data: {{ scannedData }}</p>
    </div>
  </div>
</template>
