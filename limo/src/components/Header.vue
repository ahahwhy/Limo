<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getCurrentUser } from '../services/auth'

const router = useRouter()
const route = useRoute()
const auth = getAuth()
const user = ref(null)
const isAdmin = ref(false)

onMounted(async () => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      user.value = await getCurrentUser()
      isAdmin.value = user.value?.role === 'admin'
    } else {
      user.value = null
      isAdmin.value = false
    }
  })
})

const logout = async () => {
  try {
    await auth.signOut()
    router.push({ name: 'Home' })
  } catch (error) {
    console.error('Ошибка при выходе:', error)
  }
}
</script>

<template>
  <header class="flex justify-between">
    <div class="flex items-center gap-2">
      <img src="/logo.png" alt="Logo" class="w-10 h-auto" />
      <div>
        <h2 class="text-5xl"><b>LiMo</b></h2>
      </div>
    </div>
    <nav>
      <ul class="flex items-center gap-6 text-xl mt-4">
        <li class="hover:text-lime-400 cursor-pointer">
          <router-link :to="{ name: 'Home' }">Главная</router-link>
        </li>
        <li class="hover:text-lime-400 cursor-pointer">
          <router-link :to="{ name: 'GroupTrenings' }">Тренировки</router-link>
        </li>
        <li class="hover:text-lime-400 cursor-pointer">
          <router-link :to="{ name: 'Calculate' }">Калькулятор калорий</router-link>
        </li>

        <template v-if="user">
          <li
            v-if="!isAdmin"
            class="flex items-center gap-1 border border-black rounded-lg p-1 hover:text-lime-400 cursor-pointer"
          >
            <router-link :to="{ name: 'Account' }">Личный кабинет</router-link>
            <img src="/account.svg" alt="Account" class="w-6" />
          </li>
          <li class="hover:text-lime-400 cursor-pointer">
            <button @click="logout" class="flex items-center gap-1 p-1" title="Выйти">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span class="sr-only">Выйти</span>
            </button>
          </li>
          <li v-if="isAdmin" class="hover:text-lime-400 cursor-pointer">
            <router-link :to="{ name: 'AdminAccount' }">Админка</router-link>
          </li>
        </template>
        <template v-else>
          <li class="hover:text-lime-400 cursor-pointer">
            <router-link :to="{ name: 'Autorization' }">Вход</router-link>
          </li>
          <li class="hover:text-lime-400 cursor-pointer">
            <router-link :to="{ name: 'Registration' }">Регистрация</router-link>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>
