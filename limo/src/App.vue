<script setup>
import { useRoute } from 'vue-router' // Для получения текущего маршрута
import Header from './components/Header.vue'

const route = useRoute() // Получаем текущий маршрут
</script>

<template>
  <div class="w-full">
    <div class="w-11/12 mx-auto mt-8 px-4 lg:px-6">
      <!-- Условное отображение Header в зависимости от маршрута -->
      <Header />

      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
