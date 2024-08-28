<script setup lang="ts">
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'

const df = new DateFormatter('en-US', {
  dateStyle: 'long'
})

const dateStore = useDateStore()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">
        <iconify-icon icon="lucide:calendar" class="mr-2 size-4" />
        {{ dateStore.date ? df.format(dateStore.date.toDate(getLocalTimeZone())) : 'Pick a date' }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar
        :default-value="dateStore.today"
        :min-value="dateStore.today"
        v-model="dateStore.date"
        initial-focus
      />
    </PopoverContent>
  </Popover>
</template>
