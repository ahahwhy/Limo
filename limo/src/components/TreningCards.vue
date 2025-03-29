<script setup>
defineProps({
  imageUrl: String,
  title: String,
})
</script>

<template>
  <div
    class="flex border border-slate-200 rounded-2xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition bg-gray-100"
  >
    <div class="flex flex-col">
      <img :src="imageUrl" alt="Trenings" />
      <p class="text-center mt-6 text-2xl">{{ title }}</p>
    </div>
  </div>
</template>
