<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'
import { Pagination, PaginationList, PaginationListItem } from '@/components/ui/pagination'
import { get, set } from '@vueuse/core'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: PaginatedResponse
  placeholder: string
}>()

const searchInput = defineModel<string>('searchInput', { required: true })
const pageIndex = defineModel<number>('pageIndex', { required: true })

const canGoNext = computed(() => props.data.items.length < pageIndex.value)
const canGoBack = computed(() => props.data.items.length > 1)

const goNext = () => {
  if (get(canGoNext)) {
    set(pageIndex, pageIndex.value + 1)
  }
}
const goBack = () => {
  if (get(canGoBack)) {
    set(pageIndex, pageIndex.value - 1)
  }
}
const setPage = (selectedPage: number) => {
  set(pageIndex, selectedPage)
}

const onInputChange = (input: string | number) => {
  set(searchInput, String(input))
}
</script>

<template>
  <div class="flex flex-col gap-5 px-5">
    <div class="flex items-center justify-between">
      <div class="flex flex-row gap-3">
        <Input
          v-on:update:model-value="onInputChange"
          :model-value="searchInput"
          class="w-[300px]"
          :placeholder="placeholder"
        />
        <slot name="search" />
      </div>
      <slot name="action" />
    </div>
    <div class="flex w-full flex-col items-center justify-center gap-5">
      <DataTable
        class="w-full"
        v-if="props.data.items"
        :columns="columns"
        :data="props.data.items"
      />
      <Pagination
        v-slot="{ page }"
        v-if="props.data.items"
        :total="props.data.total"
        :sibling-count="1"
        show-edges
        :default-page="1"
        class="flex w-full items-center justify-center"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationPrev :onclick="goBack" />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                :click="
                  () => {
                    setPage(item.value)
                  }
                "
                class="size-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext :onclick="goNext" />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
