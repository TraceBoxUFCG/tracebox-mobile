<script setup lang="ts">
const pageStore = usePageStore()
const route = useRoute()
</script>

<template>
  <div class="flex flex-col transition-[margin]">
    <TopNavbar />
    <ReceivementNavBar v-if="route.path.includes('/receivement')" />
    <main class="flex size-full justify-center p-6">
      <div v-if="pageStore.title" class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">
          {{ pageStore.title }}
        </h1>
      </div>
      <slot />
    </main>
  </div>
</template>
