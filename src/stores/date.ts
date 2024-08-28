import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'

export const useDateStore = defineStore('date-store', {
  state: () => {
    const todayDate = today(getLocalTimeZone())

    return {
      date: new CalendarDate(todayDate.year, todayDate.month, todayDate.day),
      today: new CalendarDate(todayDate.year, todayDate.month, todayDate.day)
    }
  },

  actions: {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDateStore, import.meta.hot))
}
