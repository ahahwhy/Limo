<script setup>
import router from '@/router'
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
        <li class="hover:text-lime-400 cursor-pointer">
          <router-link :to="{ name: 'GroupTrenings' }">Тренировки</router-link>
        </li>
        <li class="hover:text-lime-400 cursor-pointer">
          <a>Упражнения</a>
        </li>
        <li class="hover:text-lime-400 cursor-pointer">
          <RouterLink :to="{ name: 'Calculate' }">Калькулятор калорий</RouterLink>
        </li>

        <li
          class="flex items-center gap-1 border border-black rounded-lg p-1 hover:text-lime-400 cursor-pointer"
        >
          <router-link :to="{ name: 'Autorization' }"> Личный кабинет </router-link>
          <img src="/account.svg" alt="Account" class="w-6" />
        </li>
      </ul>
    </nav>
  </header>
</template>
