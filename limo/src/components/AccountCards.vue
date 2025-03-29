<script setup>
import HeaderAcc from '../components/HeaderAcc.vue';
import AccountInfo from '../components/AccountInfo.vue';

defineProps({
  imageUrl: String,
  name: String,
  trening: String,
  treningDone: String,
  activeStar: String,
  noActiveStar: String,
  complexity: String,
  progress: Number,
  dificult: Number,
});
</script>

<template>
  <div>
    <!-- HeaderAcc компонент -->
    <HeaderAcc />

    <!-- Основной контент -->
    <div class="name mt-28 border border-slate-200 rounded-xl shadow relative ">
      <div class="flex justify-between">
        <div class="m-12 flex">
          <img :src="imageUrl" alt="Photo" />
          <div class="flex flex-col">
            <h2 class="pt-6 pl-4 text-[20px]">{{ name }}</h2>
            <!-- Возможно инпут надо будет заменить на выпадающий список -->
            <input
              type="text"
              id="programm"
              name="programm"
              required
              class="ml-4 focus:outline-none pl-4 border rounded-md w-11/12 text-[20px]"
              placeholder="Программа"
            />
          </div>
        </div>
        <button
          class="absolute top-0 right-0 m-16 bg-lime-300 text-gray-900 rounded-xl transition w-24 h-12 text-[20px] hover:shadow"
        >
          Изменить
        </button>
      </div>

      <div class="flex justify-between w-full min-w-[800px]">
        <div class="flex mt-8 ml-24">
          <img
            :src="trening"
            alt="Trenings"
            class="hover:-translate-y-2 hover:shadow border border-slate-200 rounded-xl transition cursor-pointer"
          />
        </div>
        <div class="flex flex-col">
          <div class="flex mt-8">
            <div class="flex items-center justify-center h-full">
              <span class="text-[24px] text-center">
                Тренировок: {{ treningDone }}/10 <br />
              </span>
            </div>
          </div>

          <div class="flex">
            <span class="text-[22px] text-slate-800 mt-4">Сложность: {{ dificult }}/5 </span>
            <img :src="activeStar" alt="ActiveStar" class="pt-4 pl-4" />
          </div>
          <div
            class="relative w-[600px] h-4 rounded-full bg-white border border-black overflow-hidden mt-12 mr-16"
          >
            <div
              class="absolute top-0 left-0 h-full rounded-full bg-green-300 border border-black"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
        </div>
  </div>

      <!-- AccountInfo компонент -->
      <AccountInfo />
    </div>
  </div>
</template>
