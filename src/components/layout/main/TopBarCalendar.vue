<script setup lang="ts">
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'

const df = new DateFormatter('en-US', {
  dateStyle: 'long'
})
const dateStore = useDateStore()
const { date, today } = storeToRefs(dateStore)

const endpointsToEnableCalendar = ['/receivement', '/lotting']
const route = useRoute()
const isDisabled = computed(() => !endpointsToEnableCalendar.includes(route.path))
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button :disabled="isDisabled" variant="outline">
        <iconify-icon icon="lucide:calendar" class="mr-2 size-4" />
        {{ date ? df.format(date.toDate(getLocalTimeZone())) : 'Pick a date' }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar :min-value="today" :default-value="today" v-model="date" initial-focus />
    </PopoverContent>
  </Popover>
</template>
