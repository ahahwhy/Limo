<template>
  <div class="flex justify-between mb-32">
    <div class="w-1/2 mt-32 ml-12 bg-gray-100 text-xl shadow-xl rounded-xl">
      <h1 class="text-3xl pt-12 text-center">Регистрация</h1>
      <form @submit.prevent="handleSubmit" class="ml-20 mt-4">
        <div class="mt-4">
          <label for="email" class="block text-medium text-gray-700 px-2">Email</label>
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
          <label for="password" class="block text-medium text-gray-700 px-2">Пароль</label>
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

        <div class="mt-4">
          <label for="confirmPassword" class="block text-medium text-gray-700 px-2"
            >Подтвердите пароль</label
          >
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            minlength="8"
            class="border rounded-md w-5/6 text-lg p-2 pr-4"
            placeholder="Повторите пароль"
            required
          />
        </div>

        <div class="flex justify-center pe-24 mt-16">
          <button
            type="submit"
            class="w-5/6 bg-gray-900 text-white rounded-md p-2 hover:bg-lime-300 hover:text-black transition mb-16"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Зарегистрироваться</span>
            <span v-else>Загрузка...</span>
          </button>
        </div>

        <div class="flex justify-center pe-24 pb-2">
          <span class="text-gray-400">Уже есть аккаунт?</span>
          <router-link
            :to="{ name: 'Autorization' }"
            class="text-lime-300 hover:text-lime-500 cursor-pointer ml-1"
          >
            Войти
          </router-link>
        </div>
      </form>
    </div>

    <div class="pt-28">
      <img src="/IllustrationTwo.svg" alt="illustration" class="w-[700px] h-[600px]" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Пароли не совпадают')
    return
  }

  isLoading.value = true
  try {
    await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    router.push({ name: 'Account' })
  } catch (error) {
    alert(error.message)
  } finally {
    isLoading.value = false
  }
}
</script>
