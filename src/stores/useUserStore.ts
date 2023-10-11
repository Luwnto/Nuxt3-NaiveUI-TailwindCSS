import { defineStore } from 'pinia'

export const useUserStore = defineStore('userInfo', () => {
  return reactive({
    name: 'Fe',
    age: 1
  })
})
