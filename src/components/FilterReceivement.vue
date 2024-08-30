<script setup lang="ts">
interface Option {
  label: string
  value: string
}

const props = defineProps<{
  options: Option[]
}>()
</script>

<template>
  <SelectableBadge v-for="option in options" :key="option.value">
    {{ option.label }}
  </SelectableBadge>
</template>
