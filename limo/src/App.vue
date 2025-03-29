<script setup>
import { useRoute } from 'vue-router' // Для получения текущего маршрута
import Header from './components/Header.vue'
import { useUserStore } from './stores/user'

const userStore = useUserStore()
const route = useRoute() // Получаем текущий маршрут
</script>

<template>
  <div class="w-full">
    <div class="w-11/12 mx-auto mt-8 px-4 lg:px-6">
      <!-- Условное отображение Header в зависимости от маршрута -->
      <Header v-if="route.meta.showHeader !== false" />
      <!-- Если meta.showHeader не false, Header отображается -->
      <!--<h1>{{ userStore.userId }}</h1>-->
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
