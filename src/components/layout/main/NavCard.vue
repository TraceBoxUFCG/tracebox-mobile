<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  to: string
}>()
</script>

<template>
  <RouterLink :to="props.to">
    <Card class="w-[350px] hover:bg-muted/40">
      <CardHeader>
        <CardTitle>{{ props.title }}</CardTitle>
        <CardDescription>{{ props.description }}</CardDescription>
      </CardHeader>
    </Card>
  </RouterLink>
</template>
