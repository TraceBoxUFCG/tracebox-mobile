<script setup lang="ts">
interface Option {
  label: string
  value: string
}

const props = defineProps<{
  options: Option[]
  selectedValue: string
}>()

const emit = defineEmits(['update:selectedValue'])
const selectedValueAux = toRef(props.selectedValue)

const onSelect = (value: string) => {
  emit('update:selectedValue', value)
  selectedValueAux.value = value
}
</script>

<template>
  <SelectableBadge
    :active="selectedValueAux == option.value"
    @click="
      () => {
        onSelect(option.value)
      }
    "
    v-for="option in options"
    :key="option.value"
  >
    {{ option.label }}
  </SelectableBadge>
</template>
