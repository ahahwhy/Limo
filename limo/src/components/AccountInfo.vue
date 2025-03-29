<template>
  <div>
    <!-- Горизонтальная линия -->
    <div class="flex justify-center">
      <hr class="mt-16 h-px my-8 bg-gray-800 border-0 w-11/12" />
    </div>

    <!-- Контейнер для полей ввода -->
    <div class="flex justify-center">
      <!-- Первое поле ввода -->
      <div class="flex items-center ml-[-52px]">
        <label for="firstName" class="block text-black-900 px-1 text-[28px] mr-4">Имя</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          class="pl-4 border border-black rounded-md w-[400px] text-[18px] p-2"
          placeholder="Имя"
        />
      </div>

      <!-- Второе поле ввода -->
      <div class="flex ml-16">
        <label for="lastName" class="block text-black-900 px-1 text-[28px] mr-8">Фамилия</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          required
          class="pl-4 border border-black rounded-md w-[400px] text-[18px] p-2"
          placeholder="Фамилия"
        />
      </div>
    </div>

    <!-- Горизонтальная линия -->
    <div class="flex justify-center">
      <hr class="mt-8 h-px my-8 bg-gray-800 border-0 w-11/12" />
    </div>

    <!-- Контейнер для радиокнопок и календаря -->
    <div class="flex justify-center text-[24px]">
      <!-- Радиокнопки для выбора пола -->
      <div class="flex gap-16">
        <label>Пол</label>
        <div class="flex items-center ml-4">
          <input id="female" type="radio" value="female" name="gender" />
          <label for="female" class="ms-4 text-gray-600">Женский</label>
        </div>
        <div class="flex items-center">
          <input id="male" type="radio" value="male" name="gender" />
          <label for="male" class="ms-4 text-gray-600">Мужской</label>
        </div>
      </div>

      <!-- Поле ввода для даты рождения -->
      <div class="flex gap-12">
        <span class="ms-36">Дата рождения</span>
        <input
          type="text"
          id="calendar"
          name="calendar"
          required
          class="pl-4 border border-black rounded-md w-[400px] text-[18px] p-2"
          placeholder="calendar"
        />
      </div>
    </div>

    <div class="flex justify-center">
      <hr class="mt-8 h-px my-8 bg-gray-800 border-0 w-11/12" />
    </div>

    <div class="text-[24px] flex items-center">
    <div>
      <span class="ms-36">Вес</span>
    </div>
    <div class="ms-4 relative">
      <div
        @click="isOpen = !isOpen"
        class="border px-2 py-1 text-[24px] cursor-pointer text-gray-500  w-[50px]"
      >
        {{ selectedWeight || 'кг' }}
      </div>
      <div
  v-if="isOpen"
  class="absolute bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto z-10"
>
  <div
    v-for="i in weights"
    :key="i"
    @click="selectWeight(i)"
    class="px-4 py-2 hover:bg-gray-100 cursor-pointer "
  >
    {{ i }}
  </div>
</div>

    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Создаем массив значений от 1 до 200
const weights = Array.from({ length: 200 }, (_, i) => i + 1);

// Реактивное свойство для выбранного значения
const selectedWeight = ref(null);

// Состояние для открытия/закрытия списка
const isOpen = ref(false);

// Функция для выбора значения
const selectWeight = (weight) => {
  selectedWeight.value = weight;
  isOpen.value = false;
}
</script>
