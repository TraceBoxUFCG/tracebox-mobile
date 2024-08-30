<script setup lang="ts">
import { cn } from '@/lib/utils'

const isEnabled = ref(false)
</script>

<template>
  <Badge
    @click="
      () => {
        isEnabled = !isEnabled
      }
    "
    :class="
      cn(
        !isEnabled && 'bg-transparent border-primary text-primary',
        'h-[30px] flex justify-center items-center'
      )
    "
    ><slot />
  </Badge>
</template>
