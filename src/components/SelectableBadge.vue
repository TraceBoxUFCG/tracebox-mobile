<script setup lang="ts">
import { cn } from '@/lib/utils'
const active = defineModel<boolean>('active', { default: false })
</script>

<template>
  <Badge
    :class="
      cn(
        !active && 'bg-transparent border-primary text-primary',
        'h-[30px] flex justify-center items-center'
      )
    "
    ><slot />
  </Badge>
</template>
