<script setup lang="ts">
interface DialogTriggerProp {
  title: string
  icon: string
}

defineProps<{
  dialogTrigger: DialogTriggerProp
  dialogTitle: string
  dialogDescription?: string
}>()
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="bg-primary" variant="outline">
        <iconify-icon :icon="dialogTrigger.icon"></iconify-icon>{{ dialogTrigger.title }}</Button
      >
    </DialogTrigger>
    <DialogContent class="max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] p-6 sm:max-w-[600px]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>{{ dialogTitle }}</DialogTitle>
        <DialogDescription v-if="dialogDescription">
          {{ dialogDescription }}
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 overflow-y-auto px-6 py-4">
        <slot class="flex h-[300dvh] flex-col justify-between" />
      </div>
    </DialogContent>
  </Dialog>
</template>
