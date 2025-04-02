<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = useRouter()
const isAuthenticated = ref(false)

// Проверяем статус авторизации
onMounted(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user
  })
})

// Функция для проверки авторизации перед переходом
const navigateWithAuthCheck = (routeName) => {
  if (isAuthenticated.value) {
    router.push({ name: routeName })
  } else {
    router.push({ name: 'Autorization' })
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
          <router-link :to="{ name: 'Home' }"> Главная </router-link>
        </li>
        <li
          class="hover:text-lime-400 cursor-pointer"
          @click="navigateWithAuthCheck('GroupTrenings')"
        >
          <a>Тренировки</a>
        </li>
        <li class="hover:text-lime-400 cursor-pointer">
          <a>Упражнения</a>
        </li>
        <li class="hover:text-lime-400 cursor-pointer" @click="navigateWithAuthCheck('Calculate')">
          <a>Калькулятор калорий</a>
        </li>

        <li
          class="flex items-center gap-1 border border-black rounded-lg p-1 hover:text-lime-400 cursor-pointer"
          @click="navigateWithAuthCheck('Account')"
        >
          <a>Личный кабинет</a>
          <img src="/account.svg" alt="Account" class="w-6" />
        </li>
      </ul>
    </nav>
  </header>
</template>
