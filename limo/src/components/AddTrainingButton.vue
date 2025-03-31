<template>
  <button
    @click="openAddTrainingModal"
    class="flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-lg bg-lime-400 text-white hover:bg-lime-500 transition-colors"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
    <span class="hidden sm:inline">Добавить</span>
  </button>
</template>

<script>
export default {
  methods: {
    openAddTrainingModal() {
      this.$emit('add-training')
      // Или можно сразу вызывать модальное окно здесь
      // this.$modal.show('add-training-modal');
    },
  },
}
</script>
