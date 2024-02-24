
import { defineStore } from 'pinia'

export const userStore = defineStore('username', () => {
  const username = ref('')
  return { username}
})
export const typeStore = defineStore('type', () => {
  const type = ref('')
  return { type}
})
