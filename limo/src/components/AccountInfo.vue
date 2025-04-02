<template>
  <div>
    <!-- Ваш существующий контент -->
    huihuihui

    <!-- Кнопка выхода -->
    <button
      @click="signOut"
      class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      Выйти из аккаунта
    </button>
  </div>
</template>

<script setup>
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const signOut = async () => {
  try {
    const auth = getAuth()
    await firebaseSignOut(auth)
    router.push({ name: 'Autorization' }) // Перенаправляем на страницу авторизации
  } catch (error) {
    console.error('Ошибка при выходе:', error)
    alert('Не удалось выйти из аккаунта')
  }
}
</script>
