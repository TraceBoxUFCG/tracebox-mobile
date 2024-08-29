<script setup lang="ts"></script>

<template>
  <RouterLink to="/pedido">
    <Card class="w-[350px] hover:bg-muted/40">
      <CardHeader>
        <CardTitle>Fornecedor 1</CardTitle>
        <CardDescription>10 items</CardDescription>
      </CardHeader>
      <CardFooter class="flex flex-col justify-center gap-3">
        <Button class="w-full">Iniciar Recebimento</Button>
        <Button class="w-full">Finalizar Recebimento</Button>
      </CardFooter>
    </Card>
  </RouterLink>
</template>
