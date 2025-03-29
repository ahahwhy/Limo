import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userId = ref('asasaasa') // Без типа <string>
  return { userId }
})
