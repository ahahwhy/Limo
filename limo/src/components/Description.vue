<template>
  <div class="flex">
    <div class="flex justify-between">
      <!-- Левая часть с текстом и кнопкой -->
      <div class="w-7/12 px-4">
        <h3 class="text-[48px] font-semibold mb-4 mt-28">Жизнь в движении</h3>
        <p class="text-[20px] leading-relaxed">
          Хочешь начать заниматься спортом?<br />Грамотный подбор упражнений позволяет проработать
          все мышцы нашего тела: привести их в тонус, сбросить лишние килограммы и набрать мышечную
          массу. LiMo помогает правильно построить план<br />
          питания и подобрать подходящие тренировки. Йога? Пилатес? Тренировки дома или в зале?<br />
          Все это LiMo!
        </p>

        <div class="mt-16">
          <router-link :to="{ name: 'Autorization' }">
            <button
              class="py-4 bg-gray-900 text-lime-300 rounded-xl hover:bg-lime-300 hover:text-black transition w-1/3 text-[24px]"
            >
              Начни прямо сейчас
            </button>
          </router-link>
        </div>
      </div>

      <!-- Правая часть с изображением -->
      <div>
        <img src="/Illustration.svg" alt="illustration" class="w-auto h-5/6 mt-6" />
      </div>
    </div>
  </div>
</template>
