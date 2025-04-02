<template>
  <div>
    <div v-if="trainings.length > 0" class="grid gap-4">
      <div
        v-for="training in trainings"
        :key="training.id"
        class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
      >
        <h3 class="text-xl font-semibold mb-2">{{ training.name }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <p class="text-gray-600">
            <span class="font-medium">Уровень сложности:</span> {{ training.difficulty }}
          </p>
          <!-- Остальные поля тренировки -->
        </div>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12 mx-auto text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900">Тренировки не найдены</h3>
      <p class="mt-1 text-gray-500">Попробуйте изменить параметры поиска или фильтры</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trainings: {
      type: Array,
      required: true,
    },
    searchQuery: {
      type: String,
      default: '',
    },
  },
}
</script>
