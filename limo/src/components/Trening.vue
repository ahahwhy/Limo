<script setup>
import TreningCards from './TreningCards.vue'
</script>

<template>
  <div>
    <div class="flex justify-center">
      <div class="w-full text-center">
        <div>
          <h3 class="text-[48px] font-semibold mb-4 mt-4">Эффективные программы тренировок</h3>
          <p class="text-[20px] leading-relaxed font-light">
            Похудеть, набрать массу или всегда оставаться в форме — выбирай то, что подходит именно
            тебе!
          </p>
        </div>
      </div>
    </div>

    <div class="flex justify-center gap-12 text-xl mt-16">
      <p
        class="flex items-center gap-1 border border-black rounded-lg p-1 px-4 hover:-translate-y-2 hover:shadow-xl transition cursor-pointer"
      >
        Йога
      </p>
      <p
        class="flex items-center gap-1 border border-black rounded-lg p-1 px-4 hover:-translate-y-2 hover:shadow-xl transition cursor-pointer"
      >
        Пилатес
      </p>
      <p
        class="flex items-center gap-1 border border-black rounded-lg p-1 px-4 hover:-translate-y-2 hover:shadow-xl transition cursor-pointer"
      >
        Кардио
      </p>
      <p
        class="flex items-center gap-1 border border-black rounded-lg p-1 px-4 hover:-translate-y-2 hover:shadow-xl transition cursor-pointer"
      >
        Силовые
      </p>
      <p
        class="flex items-center gap-1 border border-black rounded-lg p-1 px-4 hover:-translate-y-2 hover:shadow-xl transition cursor-pointer"
      >
        Танцевальные
      </p>
      <p
        class="flex items-center gap-1 border border-black rounded-lg p-1 px-4 hover:-translate-y-2 hover:shadow-xl transition cursor-pointer"
      >
        Для детей
      </p>
      <p
        class="flex items-center gap-1 border border-black rounded-lg p-1 px-4 hover:-translate-y-2 hover:shadow-xl transition cursor-pointer"
      >
        Тонус мышц
      </p>
      <p
        class="flex items-center gap-1 border border-black rounded-lg p-1 px-4 hover:-translate-y-2 hover:shadow-xl transition cursor-pointer"
      >
        Ноги и ягодицы
      </p>
      <p
        class="flex items-center gap-1 border border-black rounded-lg p-1 px-4 hover:-translate-y-2 hover:shadow-xl transition cursor-pointer"
      >
        Пресс
      </p>
    </div>
    <hr class="h-px my-8 bg-black border-0 dark:bg-black-700" />

    <div class="mx-8">
      <h3 class="text-[48px] font-semibold mb-4 my-8">Йога</h3>
      <div class="grid grid-cols-3 gap-16">
        <TreningCards title="Начинающий" image-url="/yogaStart.svg" />
        <TreningCards title="Любитель" image-url="/yogaMiddle.svg" />
        <TreningCards title="Профессионал" image-url="/yogaExpert.svg" />
      </div>
      <hr class="h-px my-8 bg-black border-0 dark:bg-black-700" />
    </div>

    <div class="mx-8">
      <h3 class="text-[48px] font-semibold mb-4 my-8">Домашние тренировки</h3>
      <div class="grid grid-cols-3 gap-16">
        <TreningCards title="Начинающий" image-url="/homeStart.svg" />
        <TreningCards title="Любитель" image-url="/homeMiddle.svg" />
        <TreningCards title="Профессионал" image-url="/homeExpert.svg" />
      </div>
      <hr class="h-px my-8 bg-black border-0 dark:bg-black-700" />
    </div>

    <div class="mx-8">
      <h3 class="text-[48px] font-semibold mb-4 my-8">Тренировки на все тело</h3>
      <div class="grid grid-cols-3 gap-16">
        <TreningCards title="Начинающий" image-url="/fullStart.svg" />
        <TreningCards title="Любитель" image-url="/fullMiddle.svg" />
        <TreningCards title="Профессионал" image-url="/fullExpert.svg" />
      </div>
      <hr class="h-px my-8 bg-black border-0 dark:bg-black-700" />
    </div>
  </div>
</template>
