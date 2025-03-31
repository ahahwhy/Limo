<template>
  <div class="flex justify-between mb-32">
    <div class="w-1/2 mt-32 ml-12 bg-gray-100 text-xl shadow-xl rounded-xl">
      <h1 class="text-3xl pt-16 text-center">Авторизация</h1>
      <form @submit.prevent="handleSubmit" class="ml-20 mt-16">
        <div class="mt-4">
          <label for="email" class="block text-medium text-gray-700 px-1">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="border rounded-md w-5/6 text-lg p-2 pr-4"
            placeholder="Введите адрес электронной почты"
            required
          />
        </div>

        <div class="mt-4">
          <label for="password" class="block text-medium text-gray-700 px-1">Пароль</label>
          <input
            type="password"
            id="password"
            v-model="password"
            minlength="8"
            class="border rounded-md w-5/6 text-lg p-2 pr-4"
            placeholder="Введите пароль"
            required
          />
        </div>

        <div class="flex justify-center pe-24 mt-8">
          <button
            type="submit"
            class="w-5/6 bg-gray-900 text-white rounded-md p-2 hover:bg-lime-300 hover:text-black transition mb-16"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Войти</span>
            <span v-else>Загрузка...</span>
          </button>
        </div>

        <div class="flex justify-center pe-24 mt-2 pb-2">
          <span class="text-gray-400">Нет аккаунта?</span>
          <router-link
            :to="{ name: 'Registration' }"
            class="text-lime-300 hover:text-lime-500 cursor-pointer ml-1"
          >
            Зарегистрируйтесь
          </router-link>
        </div>
      </form>
    </div>

    <div class="pt-16">
      <img src="/IllustrationTwo.svg" alt="illustration" class="w-[700px] h-[600px]" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  try {
    await signInWithEmailAndPassword(getAuth(), email.value, password.value)
    router.push({ name: 'Account' })
  } catch (error) {
    alert(error.message)
  } finally {
    isLoading.value = false
  }
}
</script>
