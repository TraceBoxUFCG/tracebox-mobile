<script setup lang="ts"></script>

<template>
  <AuthLayout>
    <Toaster />
    <RouterView v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route" />
        <template #fallback> <span>Loading...</span> </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
