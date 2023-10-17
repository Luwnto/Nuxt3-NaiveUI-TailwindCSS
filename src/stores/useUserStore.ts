import { defineStore } from 'pinia'

export const useUserStore = defineStore('userInfo', () => reactive({
  name: 'Fe',
  age: 1
}))
