<script setup lang="ts"></script>

<template>
  <nav class="flex h-16 w-full flex-row items-center justify-between border-b bg-muted/40">
    <RouterLink
      exact-active-class="text-primary bg-muted"
      class="flex size-full items-center justify-center border-r-4"
      to="/receivement/confirmed"
    >
      <span>Não recebidos</span>
    </RouterLink>

    <RouterLink
      exact-active-class="text-primary bg-muted"
      class="flex size-full items-center justify-center"
      to="/receivement/startedReceivement"
    >
      <span>Em Recebimento</span>
    </RouterLink>

    <RouterLink
      exact-active-class="text-primary bg-muted"
      class="flex size-full items-center justify-center border-r-4"
      to="/receivement/received"
    >
      <span>Recebidos</span>
    </RouterLink>
  </nav>
</template>
