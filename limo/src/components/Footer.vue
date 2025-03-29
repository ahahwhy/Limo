<template>
  <div class="w-full shadow-xl mt-44" style="box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1)">
    <div class="flex justify-between px-4">
      <div class="flex items-center gap-2 m-12">
        <img src="/logo.png" alt="Logo" class="w-10 h-auto" />
        <div>
          <h2 class="text-5xl"><b>LiMo</b></h2>
        </div>
      </div>
      <nav class="mt-10 mx-24">
        <ul class="flex items-center gap-6 text-xl mt-4">
          <li class="hover:text-lime-400 cursor-pointer">
            <span>Оставить отзыв</span>
          </li>
          <li class="hover:text-lime-400 cursor-pointer">
            <span>Связаться с нами</span>
          </li>
          <li
            class="cursor-pointer hover:-translate-y-2 hover:shadow-xl border border-slate-200 rounded-xl transitio"
          >
            <img src="/vk.svg" alt="Vk" />
          </li>
          <li
            class="cursor-pointer hover:-translate-y-2 hover:shadow-xl border border-slate-200 rounded-xl transitio"
          >
            <img src="/telegram.svg" alt="Vk" />
          </li>
          <li
            class="cursor-pointer hover:-translate-y-2 hover:shadow-xl border border-slate-200 rounded-xl transitio"
          >
            <img src="/github.svg" alt="Vk" />
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
