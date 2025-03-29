<template>
  <div class="flex justify-between">
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
          <a>Тренировки</a>
        </li>
        <li class="hover:text-lime-400 cursor-pointer">
          <a>Упражнения</a>
        </li>
        <li class="hover:text-lime-400 cursor-pointer">
          <a>Калькулятор калорий</a>
        </li>
        <div class="ml-24">
          <img src="/likes.svg" alt="Likes" />
        </div>
        <div class="border rounded-xl border-black flex relative">
          <input
            type="search"
            placeholder="Найти тренировку"
            class="rounded-xl w-64 ml-4 focus:outline-none text-[16px]"
          />
          <img src="/search.svg" alt="Search" class="absolute top-1.5 left-60" />
        </div>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
/* Скрыть крестик на некоторых браузерах */
input[type='search']::-webkit-search-cancel-button {
  -webkit-appearance: none;
  display: none;
}

/* Для Firefox (если он добавляет крестик) */
input[type='search']::-moz-search-clear-button {
  display: none;
}
</style>
